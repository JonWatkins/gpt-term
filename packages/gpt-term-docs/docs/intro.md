---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

```bash
npm i -g gpt-term
```

### What you'll need

You will need to have your own [OpenAI](https://platform.openai.com) apikey in order to use GPT-Term.

### Starting a new chat

The first time you use the chat function it will prompt you for your key if one was not found. The key
will be encrypted and stored in a text file on your machine.

```bash
gpt-term chat --model gpt-3.5-turbo --temperature 0.5
```

### Manually adding your apiKey

```bash
gpt-term addkey --key YOUR_KEY_HERE
```

### Removing your apiKey

```bash
gpt-term removekey
```

### Using with npx

```bash
npx gpt-term chat --model gpt-3.5-turbo --temperature 0.5
```
