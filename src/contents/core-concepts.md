---
title: Core Concepts (Foundations)
description: The theoretical underpinnings of Large Language Models, including tokenization, inference patterns, and embeddings.
---

Before diving into complex agentic architectures, it is crucial to understand the fundamental mechanics of Large Language Models (LLMs).

## 1. LLM Fundamentals

### Tokenization
LLMs do not read text like humans do. Instead, they process discrete units called **tokens**.
*   **What is it?** Converting raw text into numerical integers.
*   **Scale:** Roughly, 1000 tokens ≈ 750 words.
*   **Impact:** Tokenization affects how models "see" words. For example, complex words might be split into multiple sub-tokens.

### Context Window
The **Context Window** is the working memory of the model. It defines the maximum amount of text (prompt + generation) the model can consider at once.
*   **Constraint:** If your input exceeds the context window, the model "forgets" the beginning.

### Temperature & Top-P
These parameters control the randomness of the output.
*   **Temperature:** Controls the probability distribution. Lower (0.2) is more deterministic/focused; Higher (0.8) is more creative/random.
*   **Top-P (Nucleus Sampling):** Limits the choice to the top *P* percent of probability mass. It cuts off the long tail of unlikely low-probability words.

## 2. Inference Patterns

### Zero-Shot
Asking the model to perform a task without any examples.
> "Translate this sentence to Spanish."

### Few-Shot
providing a few examples (shots) in the prompt to guide the model's behavior.
> "Convert these colors to hex. 
> Red: #FF0000
> Blue: #0000FF
> Green: "

### Chain-of-Thought (CoT)
Encouraging the model to explain its reasoning step-by-step before giving an answer. This significantly improves performance on logic and math tasks.

## 3. Embeddings & Vector Search

**Embeddings** are vector representations of text. They convert text into a list of numbers (a vector) where similar meanings are mathematically close to each other.

### RAG (Retrieval-Augmented Generation)
RAG is the pattern of injecting relevant data into the context window to ground the model.
1.  **Retrieve:** Find relevant text chunks using Vector Search (Embeddings).
2.  **Augment:** Paste those chunks into the prompt.
3.  **Generate:** Ask the LLM to answer using only that context.

## 4. Fine-tuning vs. Context

How do you teach a model new things?

| Approach | Mechanism | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **In-Context Learning (RAG)** | putting info in the prompt | Immediate, dynamic, cites sources | Consumes context window, slower inference |
| **Fine-tuning** | Training on new data | Permanent behavior change, faster (shorter prompts) | Hard to update (static), expensive, requires data prep |

**Rule of Thumb:**
*   Use **RAG** for knowledge (facts, docs).
*   Use **Fine-tuning** for behavior (style, tone, specific format).
