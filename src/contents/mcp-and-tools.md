---
title: Protocols & Interchange (MCP & Tools)
description: Standards for connecting agents to the world, including Tool Use and the Model Context Protocol.
---

For agents to be truly useful, they must interact with the outside world—databases, APIs, and file systems. This requires standardized protocols for "Tool Use" and context exchange.

## 1. Tool Use (Function Calling)

Tool Use, often called Function Calling in the OpenAI ecosystem, is the mechanism by which an LLM requests the execution of external code.

### The Mechanism
The LLM does NOT execute code itself. Instead:
1.  You provide the model with a list of function definitions (schemas).
2.  The model parses a user prompt and decides to "call" a function by outputting a specific JSON structure.
3.  Your runtime executes the actual function.
4.  You feed the result back to the model.

### Standard Schemas
Most providers adhere to a JSON Schema format for defining tools.
```json
{
  "name": "get_weather",
  "description": "Get current weather",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {"type": "string"},
      "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
    },
    "required": ["location"]
  }
}
```

## 2. Model Context Protocol (MCP)

As the number of tools and data sources grows, managing them individually becomes unscalable. The **Model Context Protocol (MCP)** is an open standard that standardizes how AI assistants connect to systems.

### Core Components
*   **MCP Hosts:** The AI application (e.g., Claude Desktop, IDEs) that wants to access data.
*   **MCP Servers:** Lightweight programs that expose data/tools via the standard protocol.
*   **Clients:** The bridge between Host and Server.

### Why MCP?
*   **Universal Connectivity:** Build a connector (Server) once, use it in any MCP-compliant Host.
*   **Security:** standardized authorization flow.
*   **Context:** Beyond just tools, MCP allows servers to provide "Resources" (file-like data) and "Prompts" (templates).

## 3. Structured Outputs

Reliable automation depends on reliable data. "Structured Outputs" refers to techniques ensuring LLMs return data exactly matching a schema (usually Pydantic or Zod), eliminating parsing errors.
