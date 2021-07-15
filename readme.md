# Mc Book Publisher
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/jarekt/mc-book-publisher)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hy/jarekt/mc-book-publisher)
[![GitHub license](https://img.shields.io/github/license/jarekt/mc-book-publisher)](https://github.com/jarekt/mc-book-publisher/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/jarekt/mc-book-publisher)](https://github.com/jarekt/mc-book-publisher/issues)
[![Join discord](https://img.shields.io/badge/chat-on%20discord-%237289da)](https://discord.gg/2uYF7qG)

Mc Book Publisher creates an interactive visulisation of minecraft books on the web using javascript. 

## Usage
1. Extract the books from your minecraft world using [Neurochitin's minecraft data miner](https://gitlab.com/Neurochitin/mc-world-miner)
2. Include JS & CSS (put his in the head of your html file)
```html
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/jarekt/mc-book-publisher@1.0/src/bookPublisher.min.css">
    <script src="https://cdn.jsdelivr.net/gh/jarekt/mc-book-publisher@1.0/src/bookPublisher.min.js"></script>
```

3. Initialize the script
```html
<script>
    new McBookPublisher({
        id: "BookView1", //each instance must have a unique id
        source: "booksFinal.txt", //point to the file you generated with mc-world-miner
    }).init();
</script>
```
## Demo

You can see the script in action for example [here](http://lanreee.wz.cz/#books)

## License
This work is licensed under the MIT license with the exception of the contents of the `imgs` and `fonts` folders.

## 2DO
- [ ] make error handling more consistent
- [ ] possibly fix bad line wrapping that occours from time to time (not sure how)
- [ ] add & display book locations
- [x] add demo
- [x] add a parser for Neurochitin's mc-world-miner
