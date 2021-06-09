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
        // TODO: add option for different parsers?
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
     * Parses this.source into books
     * @param {string} text to be parsed
     */
    mcWorldMinerParse(text)
    {
        let pp = 0; // parsing pointer

        
        console.log(text);
        console.log('nic');

        this.books.push(new McBook("Reebook", "Firetrash42"));
        this.books[this.books.length -1].appendPage("life is so much pain");
        this.books.push(new McBook("History of pain", "Prokeš"));
        this.books[this.books.length -1].appendPage("cocking reee\nfuken Špak");
        this.books[this.books.length -1].appendPage("I hate everything");
        this.books[this.books.length -1].appendPage(`#269 #265 #260 #255
#274 #367 #101 #106
#278 #371 #376 #025
#282 #195 #048 #019
#287 #217 #087 #093
#291 #223 #186 #180
#295 #240 #236 #231`);
        this.books[this.books.length -1].appendPage(` GIANT FUCKING HOLE
===================
a community slave labour project

What? - Let's build i big fucking chunk sized hole all the way down to bedrock.

Why? - Just for the fuck of it.

        Turn the page`);

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
            text = '<span class="mcBookCentering">\n\n' + book.name + "\n\n" + '<span class="mcBookAuthor">' + book.author + '</span></span>';
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