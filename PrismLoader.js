export class PrismLoader {
    constructor(baseURL, scriptLoader) {
        this.baseURL = baseURL;
        this.scriptLoader = scriptLoader;
        this.promises = [];

        this.promises.push(this.scriptLoader.load(`${this.baseURL}/prism.min.js`))
    }

    loadFromCodeBlock(block) {
        // language guess
        const lang = this.languageGuess(block);
        if (lang === '') {
            return;
        }

        if (lang === "php") {
            // lang == php is need markup syntax
            this.promises.push(
                this.scriptLoader.load(`${this.baseURL}/components/prism-markup-templating.min.js`)
            );
        }

        block.classList.add('language-' + lang);
        this.promises.push(
            this.scriptLoader.load(`${this.baseURL}/components/prism-${lang}.min.js`)
        );
    }

    languageGuess(block) {
        if (block.classList.toString().length !== 0) {
            const lang = block.classList.item(0).replace('language-', '');
            switch (lang) {
                case 'shell': return 'bash';
                default: return lang;
            }
        }

        const guessList = {
            '<\\/': 'markup',
            '<\\?php': 'php',
            'FROM.+?as.+': 'docker',
            ':=': 'go',
            'func': 'go',
            'interface': 'go',
            'struct': 'go',
            'document\\.': 'javascript',
            'const\\.': 'javascript',
            'let\\.': 'javascript',
            '\\$\s': 'bash',
            '[a-zA-Z0-9]+:\\s[a-zA-Z0-9"\\[\\{}]': 'yaml',
            '': 'clike',
        };
        for (const g of Object.keys(guessList)) {
            if (block.innerText.match(new RegExp(g))) {
                return guessList[g];
            }
        }

        return '';
    }

    async wait() {
        await Promise.all(this.promises);
    }
}
