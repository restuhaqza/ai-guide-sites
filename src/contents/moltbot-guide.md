---
title: "Moltbot: The Self-Hosted AI Operator"
description: "A complete guide to setting up and configuring Moltbot (formerly Clawdbot), a persistent, self-hosted AI agent for automation."
date: "2024-03-27"
author: "AI Guide"
---

# Moltbot: The Self-Hosted AI Operator

**Moltbot** (formerly Clawdbot) is an advanced, open-source AI agent designed to run autonomously on your local infrastructure. Unlike stateless chatbots, Moltbot is a **persistent operator** that maintains context, memory, and identity over days and weeks.

## Why Moltbot?

- **Local & Private**: Runs on your hardware (Mac/Linux/Windows). Your data stays with you.
- **Persistent Memory**: Remembers past conversations and tasks.
- **Multi-Channel**: Talk to it via WhatsApp, Discord, Telegram, or Terminal.
- **Tool Use**: Can browse the web, read files, and execute terminal commands.
- **Model Agnostic**: Use Anthropic Claude, OpenAI GPT-4, or even local models via Ollama.

---

## Installation

### Prerequisites
- **Node.js**: v18 or later.
- **Git**: Installed and configured.
- **API Key**: Anthropic (recommended) or OpenAI.

### 1. Install via Command Line

**MacOS / Linux:**
```bash
curl -fsSL https://clawd.bot/install.sh | bash
```

**Windows (PowerShell):**
```powershell
iwr -useb https://molt.bot/install.ps1 | iex
```

### 2. Initial Setup
Once installed, run the onboarding wizard to create your first agent profile:

```bash
moltbot onboard --install-daemon
```

This command will:
1. Create a workspace directory (default: `~/moltbot`).
2. Ask for your preferred LLM provider and API key.
3. Install the background daemon to keep Moltbot alive.

---

## Configuration

Moltbot uses a simple file-based configuration system. All configs live in your workspace root.

### Identity & Behavior
Edit `IDENTITY.md` to define who your agent is.

```markdown
# Identity
You are Moltbot, a senior DevOps engineer helper.
You are concise, helpful, and prefer using command-line tools.
```

### Enabling Skills
Moltbot uses a registry called **ClawdHub**. To install a skill (e.g., for browsing):

```bash
# Search for skills
moltbot skill search browser

# Install a skill
moltbot skill install browser-use
```

### Connecting Messaging Channels

To chat with Moltbot from your phone, you need to configure a channel.

**WhatsApp Integration:**
1. Run configuration command:
   ```bash
   moltbot channel configure whatsapp
   ```
2. Scan the QR code that appears in your terminal using WhatsApp on your phone.

**Discord Integration:**
1. Create a bot in the [Discord Developer Portal](https://discord.com/developers/applications).
2. Get your **Bot Token**.
3. Configure:
   ```bash
   moltbot channel configure discord --token YOUR_TOKEN
   ```

---

## Security Best Practices

Running an agent with shell access is powerful but risky. Secure your Moltbot setup:

1.  **Use a Dedicated User**: Don't run Moltbot as root. Create a restricted system user.
    ```bash
    sudo adduser moltbot_user
    ```
2.  **Sandboxing**: Ideally, run Moltbot inside a **Docker container** or a VM (like those discussed in [Sandbox Environments](./sandbox-environments)) to limit the blast radius if the agent makes a mistake.
3.  **Approval Mode**: By default, configure Moltbot to ask for permission before executing destructive shell commands (like `rm` or `dd`).
4.  **Network Isolation**: Use tools like **Tailscale** to securely access your Moltbot remotely without exposing ports to the public internet.

---

## Troubleshooting

If Moltbot isn't responding:

1.  **Check Status**:
    ```bash
    moltbot status
    ```
2.  **View Logs**:
    ```bash
    moltbot logs -f
    ```
3.  **Run Doctor**:
    ```bash
    moltbot doctor
    ```

---

## Further Resources

- [Official Website](https://molt.bot)
- [GitHub Repository](https://github.com/moltbot/clawdbot)
- [Discord Community](https://discord.com/invite/clawd)

---

*Related: [Agent Protocol](./agent-protocol) | [Sandbox Environments](./sandbox-environments)*
