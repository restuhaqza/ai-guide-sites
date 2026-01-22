---
title: Single-Agent Patterns
description: Blueprints for autonomous systems, covering ReAct, Plan-and-Solve, and Reflection patterns.
---

Single-Agent Patterns

Moving beyond simple request-response interactions, Single-Agent Patterns allow models to act autonomously to solve multi-step problems. These architectures define how an agent reasons, plans, and executes.

## 1. ReAct (Reasoning + Acting)

The ReAct pattern attempts to combine reasoning traces with action execution. It bridges the gap between high-level reasoning and low-level action.

### The Loop
1.  **Thought:** The agent reasons about the current state and what needs to be done.
2.  **Action:** The agent selects a tool to call.
3.  **Observation:** The agent receives the output of the tool.
4.  **Repeat:** The cycle continues until the task is complete.

**Why it works:** It prevents hallucinations by grounding the model's reasoning in external observations.

## 2. Plan-and-Solve

For complex goals, "winging it" with a simple ReAct loop can lead to getting stuck or going in circles. The Plan-and-Solve pattern separates high-level planning from low-level execution.

### Phases
1.  **Planner:** Decomposes the user's request into a list of step-by-step subtasks.
2.  **Executor:** Takes the first subtask, executes it (potentially using ReAct), and reports the result.
3.  **Updater:** (Optional) Refines the remaining plan based on new information.

## 3. Reflection (Self-Correction)

Agents, like humans, make mistakes. Reflection architectures explicitly include a step for the agent to critique its own outputs before showing them to the user.

### Self-Refine Pattern
1.  **Generate:** The agent produces an initial draft or solution.
2.  **Critique:** The agent (or a separate "Critic" prompt) evaluates the draft against requirements.
3.  **Refine:** The agent uses the critique to generate an improved version.

**Application:** Very effective for code generation (reflecting on errors) and content writing (reflecting on style/tone).
