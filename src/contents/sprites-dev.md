---
title: "Sprites.dev: Persistent Stateful Sandboxes"
description: "A comprehensive guide to Sprites.dev - hardware-isolated, persistent Linux environments with checkpoint & restore capabilities for AI agents and code execution."
date: "2024-03-28"
author: "AI Guide"
---

# Sprites.dev: Persistent Stateful Sandboxes

**Sprites.dev** is a platform offering hardware-isolated, persistent Linux environments designed for running arbitrary code. Built on Firecracker microVMs by Fly.io, Sprites function as **persistent Linux computers** that maintain state between executions, making them ideal for AI agents, development environments, and running untrusted code.

## What is a Sprite?

A Sprite is a **hardware-isolated execution environment** with these key characteristics:

- **Persistent**: Full ext4 filesystem that retains all changes between runs
- **Stateful**: Unlike serverless functions, Sprites remember everything
- **Hardware-isolated**: Each Sprite runs in its own Firecracker microVM
- **Scale-to-zero**: Automatically hibernates when idle, only bills for active compute
- **HTTP-accessible**: Each Sprite gets a unique URL for web access

Think of it as a **small, stateful computer in the cloud** that wakes up when needed and goes to sleep when idle, but never forgets.

---

## Why Sprites?

### The Problem with Traditional Sandboxes

Most code execution platforms fall into two categories:
1. **Serverless Functions** (AWS Lambda): Fast but stateless. No persistence between invocations.
2. **Traditional VMs**: Persistent but expensive. You pay 24/7 even when idle.

### The Sprites Solution

Sprites combine the best of both worlds:
- ✅ **Fast startup** (1-12 seconds from cold, instant from hibernation)
- ✅ **Persistent storage** (data survives between executions)
- ✅ **Pay-per-use** (only charged for active compute time)
- ✅ **Hardware isolation** (secure Firecracker microVMs)

---

## Core Features

### 1. Persistence

Unlike ephemeral containers, Sprites maintain their entire filesystem between runs:

```bash
# First execution - install dependencies
sprite exec "pip install pandas numpy"
sprite exec "touch mydata.csv"

# Hours later... Everything is still there!
sprite exec "python analyze.py"  # pandas still installed
```

Data is stored on:
- **NVMe storage** during active execution (fast)
- **Object storage** when hibernating (durable)

### 2. Checkpoint & Restore

Save the entire state of your environment and roll back when needed:

```bash
# Make changes to your environment
sprite exec "npm install express"
sprite exec "echo 'console.log(1)' > app.js"

# Create a checkpoint
sprite checkpoint create backup-v1

# Continue working...
sprite exec "rm app.js"  # Oops!

# Restore to the checkpoint
sprite checkpoint restore backup-v1
# app.js is back!
```

**Use Cases:**
- Experiment with AI-generated code, rollback if it breaks
- Create stable snapshots before risky operations
- Reset to clean state for testing

### 3. Granular Billing

You only pay for what you actually use:

| Resource | Billing Model |
| :--- | :--- |
| **CPU** | Cumulative CPU cycles (cpu.stat) |
| **Memory** | Actual RAM usage |
| **Hot Storage** | NVMe cache sampled every few seconds |
| **Cold Storage** | Object storage measured hourly |

**Example Costs:**
- **4-hour AI coding session**: ~$1.20 (8 CPUs, 8GB RAM, averaging 30% utilization)
- **Web app (30 hours/month)**: ~$0.89 (10% of 2 CPUs, 1GB RAM)

### 4. HTTP Access

Each Sprite has a unique URL for web access:

```bash
# Make your Sprite publicly accessible
sprite url update --auth public

# Now accessible at:
# https://my-sprite.sprites.dev
```

Configure authentication levels:
- `public`: Open to the internet
- `authenticated`: Requires Fly.io account
- `private`: Only via API

---

## Use Cases

### 1. AI Agent Execution

Sprites are perfect for AI agents that need persistent, stateful environments:

```javascript
import { SpritesClient } from '@fly/sprites';

const client = new SpritesClient(process.env.SPRITES_TOKEN);
const agent = client.sprite('claude-workspace');

// Install tools once
await agent.exec('pip install requests beautifulsoup4');

// Agent can use them across multiple sessions
const result = await agent.exec('python scrape_data.py');
```

**Why it works:**
- Agent doesn't need to reinstall dependencies every time
- Can build up a working directory over days
- Checkpoints allow safe experimentation

### 2. Running Untrusted Code

Execute user-submitted code in isolated, disposable environments:

```go
client := sprites.New("your-auth-token")

// Create a fresh sprite for this user
sprite := client.Sprite("user-sandbox-123")

// Run their code securely
cmd := sprite.Command("python", "user_script.py")
output, err := cmd.Output()

// Rollback to clean state after
sprite.Checkpoint.Restore("clean-slate")
```

### 3. Persistent Dev Environments

Cloud development environments that pause when you're not coding:

- Code for 2 hours → charged for 2 hours
- Leave for lunch → Sprite hibernates (no compute cost)
- Come back → Wakes up instantly with everything intact

### 4. Long-Running Services

Host lightweight APIs or background jobs:

```bash
# Start a simple web service
sprite exec "node server.js &"

# Sprite will:
# - Wake up on HTTP requests
# - Process the request
# - Go back to sleep after idle period
```

---

## Getting Started

### 1. Sign Up & Get API Token

```bash
# Sign up at https://sprites.dev
# Get your token from the dashboard
export SPRITES_TOKEN="your_token_here"
```

### 2. Create Your First Sprite

**Using cURL:**
```bash
# Create a sprite
curl -X PUT https://api.sprites.dev/v1/sprites/my-first-sprite \
  -H "Authorization: Bearer $SPRITES_TOKEN"

# Execute a command
curl -X POST https://api.sprites.dev/v1/sprites/my-first-sprite/exec \
  -H "Authorization: Bearer $SPRITES_TOKEN" \
  -d '{"command": "echo Hello, Sprites!"}'
```

**Using TypeScript SDK:**
```typescript
import { SpritesClient } from '@fly/sprites';

const client = new SpritesClient(process.env.SPRITES_TOKEN!);

// Get or create a sprite
const sprite = client.sprite('my-first-sprite');

// Execute commands
const { stdout } = await sprite.exec('echo Hello, Sprites!');
console.log(stdout); // "Hello, Sprites!"
```

**Using Go SDK:**
```go
import "github.com/fly-apps/sprites-go"

client := sprites.New("your-auth-token")
sprite := client.Sprite("my-first-sprite")

cmd := sprite.Command("echo", "Hello, Sprites!")
output, err := cmd.Output()
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(output))
```

### 3. Install Dependencies

```bash
# Install Node.js packages
sprite exec "npm install express axios"

# Install Python libraries
sprite exec "pip install pandas scikit-learn"

# Install system packages
sprite exec "apt-get update && apt-get install -y ffmpeg"
```

Dependencies persist across all future executions!

---

## Sprites.dev vs Alternatives

### Sprites vs E2B

| Feature | Sprites.dev | E2B |
| :--- | :--- | :--- |
| **Isolation** | Firecracker MicroVMs | Firecracker MicroVMs |
| **Persistence** | Native filesystem persistence | Session-based persistence |
| **Checkpoints** | Unlimited, transactional | Limited |
| **Billing** | Granular (CPU/RAM/Storage) | Per-sandbox pricing |
| **Open Source** | Closed (managed by Fly.io) | Yes (self-hostable) |
| **Best For** | Long-running, stateful agents | AI code execution & analysis |

### Sprites vs Docker Containers

| Feature | Sprites | Docker |
| :--- | :--- | :--- |
| **Isolation** | Hardware-level (VM) | OS-level (namespaces) |
| **Persistence** | Automatic with hibernation | Requires volumes |
| **Scaling** | Auto scale-to-zero | Manual management |
| **Security** | Stronger (VM boundary) | Good (container boundary) |
| **Best For** | Untrusted code, AI agents | Microservices, apps |

---

## Best Practices

### 1. Use Checkpoints Strategically

```bash
# Create a clean baseline
sprite checkpoint create clean-install

# Before risky operations
sprite checkpoint create before-experiment

# Restore if needed
sprite checkpoint restore clean-install
```

### 2. Organize by Use Case

Create different Sprites for different purposes:
- `agent-workspace-{user_id}` for persistent AI agent sessions
- `sandbox-{session_id}` for ephemeral user code execution
- `dev-{project}` for personal development environments

### 3. Monitor Resource Usage

- **Set resource quotas** to prevent runaway costs
- **Use checkpoints** to avoid reinstalling dependencies
- **Clean up unused Sprites** regularly

### 4. Security Considerations

Even with hardware isolation, follow best practices:
- Don't store secrets in Sprite filesystems (use environment variables)
- Use separate Sprites for different trust levels
- Implement API rate limiting on your side
- Consider private networking for sensitive workloads

---

## Limitations & Considerations

### Current Limitations

- **Linux only**: No Windows environments (yet)
- **SDKs**: TypeScript and Go available; Python and Elixir coming soon
- **Cold start**: 1-12 seconds (slower than hot containers)
- **Regional**: Limited regions compared to major cloud providers

### When NOT to Use Sprites

- **High-frequency, low-latency APIs**: Cold starts may be too slow
- **Massive parallel batch jobs**: Traditional batch systems may be cheaper
- **Windows-specific development**: Linux only
- **Compliance requirements**: If you need data locality guarantees

---

## Real-World Example: AI Coding Agent

Here's how an AI agent like Claude Code might use Sprites:

```typescript
class AIAgent {
  private sprite: Sprite;
  
  async initialize(userId: string) {
    this.sprite = client.sprite(`agent-${userId}`);
    
    // Create checkpoint of clean environment
    await this.sprite.checkpoint.create('baseline');
  }
  
  async executeUserRequest(code: string) {
    try {
      // Run the AI-generated code
      const result = await this.sprite.exec(code);
      
      // If successful, create checkpoint
      if (result.exitCode === 0) {
        await this.sprite.checkpoint.create(`success-${Date.now()}`);
      }
      
      return result;
    } catch (error) {
      // If failed, rollback to last known good state
      await this.sprite.checkpoint.restore('baseline');
      throw error;
    }
  }
}
```

---

## Further Resources

- [Official Documentation](https://docs.sprites.dev)
- [API Reference](https://sprites.dev/api)
- [Sprites.dev Blog](https://sprites.dev/blog)
- [Fly.io Community](https://community.fly.io)
- [TypeScript SDK](https://github.com/fly-apps/sprites-js)
- [Go SDK](https://github.com/fly-apps/sprites-go)

---

*Related: [Sandbox Environments](./sandbox-environments) | [Code Execution Skills](./code-execution-skills) | [Moltbot Guide](./moltbot-guide)*
