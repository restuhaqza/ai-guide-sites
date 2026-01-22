---
title: Prompt Engineering Standards
description: Comprehensive guide to standardized patterns for effective model interaction, including structure, reasoning, and validation.
---

Effective interaction with Large Language Models (LLMs) requires a structured approach to prompting. This guide outlines the standards for formatting, reasoning, and validation to ensure consistent and high-quality outputs.

## 1. Structure & Clarity

The way a prompt is structured significantly impacts the model's ability to understand and execute instructions.

### Markdown Prompting
Using Markdown within your prompts helps demarcate different sections (instructions, context, data) clearly.

**Example Structure:**
```markdown
# Role
You are an expert data scientist.

# Context
We are analyzing customer churn data from Q3 2023.

# Instructions
1. Clean the dataset provided in <data>.
2. Perform a logistic regression analysis.
3. Output the top 3 factors contributing to churn.
```

### XML Tagging Standards (Anthropic Style)
XML tags are highly effective for separating different types of content, reducing "leakage" between instructions and data.

**Key Tags:**
- `<instruction>`: The core task.
- `<context>`: Background information.
- `<example>`: Few-shot examples.
- `<input>`: The data to operate on.
- `<thinking>`: Designated area for the model to reason before answering.

**Example:**
```xml
<system>
You are an extracting agent.
</system>

<instruction>
Extract email addresses from the text in the <text> tags. Return them as a JSON list.
</instruction>

<text>
Contact us at support@example.com or sales@example.org.
</text>
```

## 2. Core Strategies

### Zero-shot vs Few-shot Prompting
*   **Zero-shot**: Asking the model to perform a task without examples. Best for simple, common tasks.
*   **Few-shot**: Providing 1-3 examples usage to guide the model's output format and reasoning style. This significantly improves reliability for complex or domain-specific tasks.

**Few-shot Example:**
```markdown
# Instructions
Convert the natural language date to ISO 8601 format.

# Examples
Input: March 1st, 2023
Output: 2023-03-01

Input: 20 Jan 22
Output: 2022-01-20

Input: The first friday of this year
Output: 2024-01-05
```

### Persona Adoption
Assigning a specific role helps condition the model's latent knowledge space.
*   **Specific is better**: Instead of "You are a coder", use "You are a Senior Systems Architect specialized in distributed systems."
*   **Contextualize**: Add details about the persona's constraints and priorities (e.g., "You prioritize security over performance").

## 3. Reasoning Patterns

Encouraging the model to "think" before it "speaks" improves performance on complex logic tasks.

### Chain of Thought (CoT)
Explicitly asking the model to think step-by-step.
> **Prompt:** "Think step by step before providing your final answer."

### ReAct (Reason + Act)
A pattern where the model iteratively reasons about a task and performs actions (or simulates them).
1.  **Thought**: Analyze the request.
2.  **Action**: Check specific data or run a tool.
3.  **Observation**: Review the output.
4.  **Repeat**.

### Tree of Thoughts (ToT)
Asking the model to generate multiple possible branches of reasoning, evaluate them, and select the best path.

### Skeleton-of-Thought
Generating a skeleton or outline of the answer first, then filling in the details. Useful for reducing latency in parallel generation contexts and structuring long-form answers.

## 4. Iterative Refinement

For high-stakes outputs, do not rely on the first draft.

1.  **Generate**: Produce an initial output.
2.  **Critique**: Ask the model (or a separate agent) to critique the output against specific criteria (e.g., "Check for security vulnerabilities", "Check for tone consistency").
3.  **Refine**: Rewrite the output based on the critique.

## 5. Validation & Defense

Ensuring the output is safe, correct, and structured.

### Prompt Injection Defense
- **Delimiters**: Use rigid delimiters like `"""` or XML tags to separate user input from system instructions.
- **Sandwich Defense**: Place instructions both before and after the user input ("Instruction -> User Data -> Instruction Reminder").

### Output Validation (JSON Enforcement)
When integrating with code, JSON is often the required output format.
- Use **Pydantic** or **Zod** definitions in the prompt to define the expected schema.
- Explicitly instruct: "Return ONLY JSON. No markdown formatting."

## 6. Optimization

### Context Distillation
Refining a long prompt or context into a shorter, more efficient version without losing performance. useful for lowering token costs on repetitive tasks.

### Prompt Caching
Structuring prompts to maximize cache hits. Put static content (instructions, examples, reference docs) at the **beginning** of the prompt, and dynamic content (user query) at the **end**.

### Model-Specific Optimizations
- **Claude**: Prefers XML tags, very strong at following long, complex instructions with high context.
- **GPT-4**: Responds well to very clear, imperative instructions and structured markdown.
- **Small Models**: Require more few-shot examples and very simple, broken-down instructions.
