---
title: The AGENTS.md Standard
description: A simple, open format for guiding coding agents (AI). Think of it as a README for agents.
---

The **AGENTS.md** standard is an open format designed to serve as a guide for AI coding agents. Just as `README.md` is for human developers, `AGENTS.md` provides accurate, context-rich instructions specifically optimized for AI consumption.

## Why AGENTS.md?

### 1. Separation of Concerns
*   **README.md** remains concise and focused on human contributors (quick starts, screenshots, high-level architecture).
*   **AGENTS.md** contains the gritty details agents need: specific build steps, testing commands, linter rules, and project-specific conventions that might clutter user-facing docs.

### 2. Predictability
By standardizing on a filename, AI agents (like GitHub Copilot, Cursor, or CLI tools) know exactly where to look for "ground truth" instructions.

## Anatomy of AGENTS.md

While flexible, a standard `AGENTS.md` often includes:

### Setup Commands
Exact commands to install dependencies, start the dev server, and run tests.
```bash
## Setup commands
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm test`
```

### Code Style & Conventions
Explicit rules preventing common mistakes.
- "Use TypeScript strict mode."
- "Prefer functional components over class components."
- "Use Tailwind CSS utility classes."

### Project Overview
High-level context that helps the agent understand the "what" and "why" of the application before diving into the code.

## Ecosystem Support

The format is supported by a growing list of tools and leaders in the AI space, including:
*   **OpenAI:** Codex
*   **Google:** Jules, Gemini CLI
*   **Cursor:** AI Code Editor
*   **Platform:** Factory.ai, OpenCode

It is efficiently stewarded by the **Agentic AI Foundation** under the Linux Foundation.

## How to Adopt
Simply create an `AGENTS.md` file in the root of your repository. Start small with build commands and basic style rules, and evolve it as you refine how agents interact with your codebase.
