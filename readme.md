# Mc Book Publisher
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/jarekt/mc-book-publisher)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hy/jarekt/mc-book-publisher)
[![GitHub license](https://img.shields.io/github/license/jarekt/mc-book-publisher)](https://github.com/jarekt/mc-book-publisher/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/jarekt/mc-book-publisher)](https://github.com/jarekt/mc-book-publisher/issues)
[![Join discord](https://img.shields.io/badge/chat-on%20discord-%237289da)](https://discord.gg/2uYF7qG)

Mc Book Publisher creates an interactive visualisation of minecraft books on the web using javascript. 

## Usage
1. Extract the books from your minecraft world using [Neurochitin's minecraft data miner](https://gitlab.com/Neurochitin/mc-world-miner)
2. Include JS & CSS (put this in the head of your html file)
```html
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/jarekt/mc-book-publisher@latest/src/bookPublisher.min.css">
    <script src="https://cdn.jsdelivr.net/gh/jarekt/mc-book-publisher@latest/src/bookPublisher.min.js"></script>
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

### Demo page
<https://jarekt.github.io/mc-book-publisher/>

### Desktop vid
https://user-images.githubusercontent.com/42780718/171999483-d6e2274d-a0ab-414c-ad32-ac823c0ded7b.mp4

### Mobile vid
https://user-images.githubusercontent.com/42780718/171999489-46fa97a1-a851-4795-9958-35fb69a5ec21.mp4

## License
This work is licensed under the MIT license with the exception of the graphical assets - i.e. mainly the contents of the `imgs` and `fonts` folders.

## 2DO
- [ ] add & display book locations
- [x] add demo
- [x] add a parser for Neurochitin's mc-world-miner

## Known Issues
- bad line wrapping that occours from time to time (is this even possible to fix? this arises directly from how fonts are rendered differently in the web browser than in minecraft)
- ~~font appearing blurry when `margin: auto` is used at certain resolutions (this cannot be fixed unless we use some sort of crazy js hack that would center the div less precisely than css does) + it's not even particularly noticable~~ (fixed in [1.0.3](https://github.com/jarekt/mc-book-publisher/releases/tag/1.0.3))
