# prismloader-js
Dynamic [Prism.js](https://prismjs.com/) language files loader on web browser.

This library needs [sters/scriptloader-js](https://github.com/sters/scriptloader-js).
Language files must put on `${baseURL}/componens/prism-${language}.js`.

For example...

```javascript
const loader = new PrismLoader('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0', new ScriptLoader);
document.querySelector('pre code', block => loader.loadFromCodeBlock(block));
await loader.wait();
document.querySelector('pre code', block => Prism.highlightElement(block));
```
