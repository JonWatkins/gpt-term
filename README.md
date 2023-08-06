# GPT-Term

CLI application for interacting with ChatGPT. Checkout the [documentation](https://jonwatkins.github.io/gpt-term/) for more information.

### Usage

You will need to have your own [OpenAI](https://platform.openai.com) apikey.

The first time you use the chat function it will prompt you for your key if one was not found. The key
will be encrypted and stored in a text file on your machine.

```bash
npm i -g gpt-term
gpt-term chat --engine gpt-3.5-turbo --temperature 0.5 --max-tokens 2048
```

### Removing your API Key

```bash
gpt-term removekey
```

## Using with npx

```bash
npx gpt-term chat --engine gpt-3.5-turbo --temperature 0.5 --max-tokens 2048
```

`npx` downloads `gpt-term` to it's cache, to remove it run

```bash
rm -r ~/.npm/_npx/*/node_modules/gpt-term
```
