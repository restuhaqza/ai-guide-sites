---
title: "OpenCode Guide: The Open Source AI Coding Agent"
description: "A comprehensive guide to OpenCode, an open-source AI coding agent for terminal, desktop, and IDE with 70K+ GitHub stars."
date: "2024-03-21"
author: "AI Guide"
---

# OpenCode Guide: The Open Source AI Coding Agent

[OpenCode](https://opencode.ai/) is an open-source AI coding agent with over **70,000 GitHub stars** and 650,000+ monthly users. It brings the power of large language models directly to your terminal, desktop, or IDE.

## What is OpenCode?

OpenCode is an agent that helps you write, debug, and refactor code. Unlike simple chatbots, it can:
- Read and understand your codebase
- Make changes to files directly
- Execute shell commands with your permission
- Work across terminal, desktop app, and IDE extensions

### Key Philosophy
- **Privacy First**: OpenCode does not store any of your code or context data.
- **Model Agnostic**: Use Claude, GPT, Gemini, GitHub Copilot, or 75+ providers including local models.
- **Open Source**: Fully open source with 500+ contributors.

---

## Key Features

### 1. Multi-Model Support
OpenCode supports 75+ LLM providers through Models.dev:
- **Claude** (Anthropic)
- **GPT-4o / ChatGPT Plus/Pro** (OpenAI)
- **Gemini** (Google)
- **GitHub Copilot** (Login with GitHub)
- **Local Models** (Ollama, LM Studio, etc.)

### 2. LSP Integration
OpenCode automatically loads the right Language Server Protocol (LSP) for the LLM, providing better code understanding and suggestions.

### 3. Multi-Session
Start multiple agents in parallel on the same project—useful for working on different features simultaneously.

### 4. Share Links
Share a link to any session for reference or debugging with teammates.

### 5. Multiple Interfaces
- **Terminal**: Native CLI experience
- **Desktop App**: GUI for those who prefer it
- **IDE Extension**: Integrate into your existing editor

---

## Getting Started

### Installation

**Quick Install (Recommended):**
```bash
curl -fsSL https://opencode.ai/install | bash
```

**Homebrew (macOS/Linux):**
```bash
brew install opencode
```

**Go Install:**
```bash
go install github.com/anomalyco/opencode@latest
```

### Configuration
After installation, OpenCode will guide you through setup. You can configure:
- Your preferred AI provider
- API keys (or login with GitHub for Copilot)
- Model preferences

---

## How to Use OpenCode

### Launch the Agent
```bash
opencode
```

This opens the OpenCode interface where you can start chatting with the AI agent.

### Common Workflows

**1. Ask Questions About Your Code**
```
> Explain what src/utils/helper.ts does
```

**2. Refactoring**
```
> Refactor the login function in auth.ts to use async/await
```

**3. Debugging**
```
> Why is this test failing? Fix it.
```

**4. Code Generation**
```
> Create a REST API endpoint for user registration
```

**5. Git Operations**
```
> Write a commit message for my staged changes
```

---

## Pricing

| Tier | Price | What You Get |
| :--- | :--- | :--- |
| **Free** | $0 | Use with your own API keys |
| **Zen** | Subscription | Pre-configured, benchmarked models optimized for coding |
| **Enterprise** | Contact Sales | Privacy-focused deployment for teams |

> **Note**: OpenCode is free to use. You only pay for the AI provider you choose (or use free tiers from providers).

---

## Comparison with Other Tools

| Feature | OpenCode | Claude Code | GitHub Copilot | Cursor |
| :--- | :--- | :--- | :--- | :--- |
| **Interface** | Terminal + Desktop + IDE | Terminal | IDE Extension | Fork of VS Code |
| **Open Source** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Model Choice** | 75+ providers | Claude only | GPT (mainly) | Claude & GPT |
| **Privacy** | High (no data stored) | Medium | Medium | Medium |
| **Cost** | Free (BYOK) | Usage-based | Subscription | Subscription |
| **GitHub Stars** | 70K+ | N/A | N/A | N/A |

---

## Best Practices

1. **Start with Context**: OpenCode works best when it understands your project. Let it read relevant files first.
2. **Be Specific**: Instead of "fix this", say "the login function returns undefined when the user doesn't exist".
3. **Review Changes**: Always review proposed file changes before accepting.
4. **Use Sessions**: For complex tasks, use the session feature to maintain context.

---

## Conclusion

OpenCode represents the future of AI-assisted development—open source, privacy-respecting, and model-agnostic. Whether you prefer the terminal, a desktop app, or IDE integration, OpenCode adapts to your workflow.

---
*Reference: [OpenCode Documentation](https://opencode.ai/docs) | [GitHub Repository](https://github.com/anomalyco/opencode)*
