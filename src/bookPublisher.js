class McBook
{
    constructor(name, author)
    {
        this.name = name;
        this.author = author;
        this.pagePointer = 0;
        this.pages = [];
    }

    appendPage(pageText)
    {
        this.pages.push(pageText);
    }
}

class McBookPublisher
{
    constructor(options)
    {
        if (!!document.getElementById(options.id)) {
            console.error("ID in use already, choose a different one");
            return;
        }
        if (! options.source.endsWith('.txt'))
        {
            console.error("Unsupported filetype");
            return;
        }
    
        this.id = options.id;
        this.src = options.source;
        this.bLocations = options.displayLocations; // TODO: implment
        this.books = [];
        this.thisScript = document.currentScript // reference to the current script for building the html
    }


    async init()
    {
        fetch(this.src)
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error("Unable to fetch book source file: " + this.src)
            }
            else
            {
                return response.text()
            }
        })
        .then(text =>
        {
            this.mcWorldMinerParse(text);
            this.buildHtml();
        })
        .catch(error => console.error(error));
    }

    /**
     * Parses text files generated by Neurochitin's mc-world-miner
     * Extremely crude, but hey, it works
     * @param {string} text to be parsed
     */
    mcWorldMinerParse(text)
    {
        text = text.replaceAll('\r', ''); // remove CR
        let p = 0; // parsing pointer
        const keydict =
        {
            book1: '=====================================\nBook "',
            book2: '" by ',
            book3: '\n',
            page1: '\n--- Page ',
            page2: ' ---\n',
        };
        const pStates =
        {
            base: 0,
            book: 1,
            afterBook: 2,
            page: 3,
            exit: 4,
        }
        /**
         * @param {string} keyword 
         */
        var parseKeyword = function (keyword)
        {
            for (let i = 0; i < keyword.length; i++)
            {
                if (text.charAt(p + i) != keyword.charAt(i))
                {
                    return false;
                }
            }
            p += keyword.length;
            return true;
        }
        /**
         * Checks parsing pointer for overflow
         */
        var pOverflow = function()
        {
            if (p >= text.length)
            {
                throw new Error("Syntax error while parsing");
            }
        }

        let state = pStates['base'];
        while (p < text.length)
        {
            if (state == pStates['base'])
            {
                if (parseKeyword(keydict['book1']))
                {
                    state = pStates['book'];
                }
                else
                {
                    console.error(this.src + " is not an mc-world-miner output file");
                }
            }
            else if (state == pStates['book'])
            {
                let name = '';
                let author = '';
    
                while (!parseKeyword(keydict['book2']))
                {
                    name += text.charAt(p);
                    p++;
                    pOverflow();
                }
                while (!parseKeyword(keydict['book3']))
                {
                    author += text.charAt(p);
                    p++;
                    pOverflow();
                }
                this.books.push(new McBook(name, author));
                state = pStates['afterBook'];
            }
            else if (state == pStates['afterBook'])
            {
                while (!parseKeyword(keydict['page1']))
                {
                    p++;
                    pOverflow();
                }
                state = pStates['page'];
            }
            else if (state == pStates['page'])
            {
                while (!parseKeyword(keydict['page2']))
                {
                    p++;
                    pOverflow();
                }
                let pageText = '';
                while(true)
                {
                    if (parseKeyword(keydict['book1']))
                    {
                        this.books[this.books.length -1].appendPage(pageText);
                        state = pStates['book'];
                        break;
                    }
                    if (parseKeyword(keydict['page1']))
                    {
                        this.books[this.books.length -1].appendPage(pageText);
                        state = pStates['page'];
                        break;
                    }
                    if (p >= text.length)
                    {
                        this.books[this.books.length -1].appendPage(pageText);
                        state = pStates['exit'];
                        break;
                    }
                    pageText += text.charAt(p);
                    p++;
                }
            }
        }
    }

    /**
     * Builds html for all of the books
     */
    buildHtml()
    {
        var thisInstance = this;
        let publisherArea = document.createElement('span');
        publisherArea.id = this.id;

        for (let i = 0; i < this.books.length; i++)
        {
            let bookHtml = document.createElement('div');
            bookHtml.className = "mcBook";

            let header = document.createElement('span');
            header.className = "mcBookHeader";
            bookHtml.appendChild(header);

            let text = document.createElement('span');
            text.className = "mcBookText";
            bookHtml.appendChild(text);

            let footer = document.createElement('div');
            footer.className = "mcBookFooter";
            {
                let btnBack = document.createElement('span');
                btnBack.className = "mcBookBack";
                btnBack.onclick = function ()
                {
                    thisInstance.books[i].pagePointer--;
                    thisInstance.updatePage(i);
                };
                footer.appendChild(btnBack);
                let btnNext = document.createElement('span');
                btnNext.className = "mcBookNext";
                btnNext.onclick = function ()
                {
                    thisInstance.books[i].pagePointer++;
                    thisInstance.updatePage(i);
                };
                footer.appendChild(btnNext);
            }
            bookHtml.appendChild(footer);
            publisherArea.appendChild(bookHtml);
        }
        this.thisScript.parentElement.appendChild(publisherArea);

        // update pages
        for (let i = 0; i < this.books.length; i++)
        {
            this.updatePage(i);    
        }
        console.log("book html injected");
    }

    /**
     * Updates the displayed page of a book in the books array
     * @param {number} bookNum 
     */
    updatePage(bookNum)
    {
        let book = this.books[bookNum];
        let publisherArea = document.getElementById(this.id);

        // set header
        let headerHtml = publisherArea.getElementsByClassName('mcBookHeader')[bookNum];
        headerHtml.innerHTML = "Page " + book.pagePointer + " of " + book.pages.length;
        headerHtml.style['color'] = book.pagePointer == 0
                                  ? '#ffffff00' : '';

        // set text
        let textHtml = publisherArea.getElementsByClassName('mcBookText')[bookNum];
        let text;
        if (book.pagePointer == 0)
        {
            text = '<span class="mcBookCentering">\n\n' + book.name + "\n\n" + '<span class="mcBookAuthor">' + 'by ' + book.author + '</span></span>';
        }
        else
        {
            text = book.pages[book.pagePointer -1];
        }

        textHtml.innerHTML = text;

        // show/hide buttons
        let btnBack = publisherArea.getElementsByClassName('mcBookBack')[bookNum];
        let btnNext = publisherArea.getElementsByClassName('mcBookNext')[bookNum];
        
        btnBack.style['display'] = book.pagePointer == 0
                                 ? 'none' : 'block';

        btnNext.style['display'] = book.pagePointer == book.pages.length
                                 ? 'none' : 'block';
    }
}