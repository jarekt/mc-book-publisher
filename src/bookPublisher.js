class McBook
{
    constructor(name, author)
    {
        this.name = name;
        this.author = author;
        this.pagePointer = 0;
        this.pages = [];
    }
    
    /**
     * Used for adding pages
     * @param {string} pageText 
     */
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
        // TODO: add option for different parsers?
        this.books = [];
    }


    init()
    {
        this.mcWorldMinerParse()
        this.buildHtml();
    }
    // parse -> create multiple books
    // foreach book build their html & attach callbacks

    /**
     * Parses this.source into books
     */
    mcWorldMinerParse()
    {
        console.log("pain");
        this.books.push(new McBook("Reebook", "Firetrash42"));
        this.books[this.books.length -1].appendPage("cocking reee\nfuken Špak");
        console.log(this.books);
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
        let curScript = document.currentScript;
        curScript.parentElement.appendChild(publisherArea);

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
        if (book.pagePointer == 0)
        {
            headerHtml.style['color'] = '#ffffff00';
        }
        else
        {
            headerHtml.style['color'] = '';
        }

        // set text
        let text;
        if (book.pagePointer == 0)
        {
            text = '<span class="mcBookCentering">\n\n' + book.name + "\n\n" + '<span class="mcBookAuthor">' + book.author + '</span></span>';
        }
        else
        {
            text = book.pages[book.pagePointer -1];
        }

        let textHtml = publisherArea.getElementsByClassName('mcBookText')[bookNum];
        textHtml.innerHTML = text;

        let btnBack = publisherArea.getElementsByClassName('mcBookBack')[bookNum];
        let btnNext = publisherArea.getElementsByClassName('mcBookNext')[bookNum];
        if (book.pagePointer == 0)
        {
            btnBack.style['display'] = "none";
        }
        else
        {
            btnBack.style['display'] = "block";
        }

        if (book.pagePointer == book.pages.length)
        {
            btnNext.style['display'] = "none";
        }
        else
        {
            btnNext.style['display'] = "block";
        }

        // display/hide header & buttons
        // if page 0 -> dont display header or left arrow
        // if page max dont display right arrow
    }
}