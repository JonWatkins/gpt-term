# GPT-Term

Work in progress simple cli application for interacting with ChatGPT.

### Usage

The first time you use the chat function it will prompt you for your key if one was not found. The key
will be encrypted and stored in a text file on your machine.

```bash
npm i -g gpt-term
gpt-term chat --model gpt-3.5-turbo --temperature 0.5
```

### Removing your API Key

```bash
gpt-term removekey
```

### Using with npx

```bash
npx gpt-term chat --model gpt-3.5-turbo --temperature 0.5
```
