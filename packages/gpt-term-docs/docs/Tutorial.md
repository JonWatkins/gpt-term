---
sidebar_position: 1
---

### What you'll need

You will need to have your own [OpenAI](https://platform.openai.com) apikey in order to use GPT-Term.

## Installation

To install GPT-Term you can use your favorite package manager.

### PNPM

```bash
pnpm i -g gpt-term
```

### NPM

```bash
npm i -g gpt-term
```

### Yarn

```bash
yarn i -g gpt-term
```

## Starting a new chat

The first time you use the chat function it will prompt you for your key if one was not found. The key
will be encrypted and stored in a text file on your machine.

```bash
gpt-term chat --engine gpt-3.5-turbo --temperature 0.5 --max-tokens 2048
```

## Manually adding your apiKey

```bash
gpt-term addkey --key YOUR_KEY_HERE
```

## Removing your apiKey

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
