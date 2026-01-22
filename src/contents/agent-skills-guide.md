---
title: "Agent Skills Guide: The Complete A to Z"
description: "A comprehensive guide to understanding, creating, and integrating Agent Skills - the open standard for extending AI agent capabilities."
date: "2024-03-20"
author: "AI Guide"
---

# Agent Skills Guide: The Complete A to Z

Agent Skills (AgentSkills.io) is an open standard designed to practice "skills" regarding AI agents: a lightweight, portable way to give agents new capabilities, domain expertise, and repeatable workflows. This guide covers everything from the basic concepts to detailed specifications and integration strategies.

## What Are Agent Skills?

At their core, Agent Skills are **packages of expertise**. They are simple directory structures that contain instructions (prompts) and optional executable code that teach an AI agent how to perform specific tasks.

Think of plugins for agents, but simpler. Instead of complex binaries, they are primarily text-based instructions that agents read to understand *how* to do something.

### Key Benefits
- **Interoperability**: Write a skill once, run it on any compatible agent (e.g., Claude Code).
- **Portability**: Skills are just files. Easy to Git version, share, and edit.
- **Progressive Meaning**: Agents only load the "metadata" (name/description) initially to save context. They only load the full instructions (the "body") when the skill is actually needed.

---

## Anatomy of a Skill

A skill is defined by a directory containing a `SKILL.md` file.

### Directory Structure
The simplest skill is a single folder with one file:
```text
my-skill/
└── SKILL.md      # The heart of the skill
```

For more complex skills, the standard supports additional folders:
```text
my-skill/
├── SKILL.md      # Required: Instructions & Metadata
├── scripts/      # Optional: Python/Bash scripts for automation
├── references/   # Optional: Documentation/Knowledge base
└── assets/       # Optional: Templates, images, data files
```

### The `SKILL.md` File
This file is a Markdown file with YAML frontmatter. It has two parts:
1.  **Frontmatter**: Metadata for the agent to "discover" the skill.
2.  **Body**: The actual prompt/instructions the agent reads when it decides to use the skill.

## Detailed Specification

### 1. Frontmatter (Metadata)
The top of your `SKILL.md` must contain valid YAML.

```yaml
---
name: pdf-processing           # Unique identifier (kebab-case)
description: Extract text from PDFs and fill forms. Use when user asks about PDF manipulation.
license: Apache-2.0            # License for the skill
metadata:                      # Custom extra data
  version: "1.0"
  author: "My Team"
compatibility: "Requires python3 and pdfplumber" # Optional environment reqs
allowed-tools: Bash(git:*)     # Experimental: Pre-approved tools
---
```

*   **`name`**: 1-64 chars, lowercase `a-z`, `0-9`, `-`. Must match folder name.
*   **`description`**: Up to 1024 chars. Critical! This is what the agent sees to decide *if* it needs this skill. optimized for semantic search/matching.

### 2. Body (Instructions)
The rest of the file is standard Markdown. This is the "system prompt" extension that gets injected into the agent's context.

```markdown
# PDF Processing Instructions

## When to use this skill
Use this skill to capabilities related to PDF files...

## How to extract text
1. Check if `pdfplumber` is installed.
2. Run the script `python3 scripts/extract.py`...
```

### 3. Progressive Disclosure
This provides efficiency:
1.  **Discovery**: Agent sees only `name` and `description`. (~100 tokens)
2.  **Activation**: Agent decides "I need this". It then reads the `SKILL.md` body. (~1000s tokens)
3.  **Execution**: Agent follows instructions, potentially running `scripts/` or reading `references/`.

---

## Creating Your First Skill

Let's build a simple skill: **`release-manager`**.

1.  **Create Directory**:
    ```bash
    mkdir release-manager
    cd release-manager
    ```

2.  **Create `SKILL.md`**:
    ```markdown
    ---
    name: release-manager
    description: Coordinate software releases, generate changelogs, and tag git versions.
    ---
    
    # Release Manager Guide
    
    ## Steps to Create a Release
    1.  **Verify Branch**: Ensure you are on `main`.
    2.  **Generate Changelog**: Run `git log` to summarize recent changes.
    3.  **Update Version**: Update the version file in the project root.
    4.  **Tag**: Create a git tag `git tag -a v1.0.0`.
    ```

3.  **Use It**: Point your agent to the parent directory of `release-manager`.

---

## Integration: For Agent Builders

If you are building an agent and want to support skills, here is the flow:

1.  **Discovery**: Scan the `skills/` directory. Parse the YAML frontmatter of every `SKILL.md`.
2.  **Context Injection**:
    Inject the list of available skills into the system prompt:
    ```xml
    <available_skills>
      <skill>
        <name>release-manager</name>
        <description>Coordinate software releases...</description>
      </skill>
    </available_skills>
    ```
3.  **Activation**:
    When the LLM outputs "I want to use release-manager", you read the full content of `release-manager/SKILL.md` and append it to the conversation context.
4.  **Execution**: The LLM will then generate the next steps based on those new instructions.

## Best Practices

*   **Descriptive Descriptions**: The description is the *only* thing the agent sees initially. Make it count. Include "When to use" keywords.
*   **Self-Contained Scripts**: If you include `scripts/`, make sure they handle errors gracefully and don't rely on obscure global dependencies if possible.
*   **Validation**: Use the official `skills-ref` tool to validate your directory structure and YAML syntax.

## Security Considerations

*   **Sandboxing**: Agent Skills can contain arbitrary code in `scripts/`. Always run agents in a sandboxed environment if you are downloading untrusted skills.
*   **Approval**: Agents should ask for user permission before executing scripts found in skills.

---
*Reference: [AgentSkills.io](https://agentskills.io)*
