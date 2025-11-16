/**
 * Server Actions for AI Chat
 * Handles AI agent interactions with SWAPI tools
 */

"use server";

import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { AI_CONFIG, SYSTEM_PROMPT, getContextAwarePrompt } from "@/lib/ai/config";
import { swapiTools } from "@/lib/ai/tools";

/**
 * Message type for chat
 */
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Ask Agent Server Action
 * Handles user queries and streams AI responses with SWAPI tool access
 */
export async function askAgent(
  messages: Message[],
  pageContext?: string
) {
  "use server";

  try {
    // Create a streamable value for the response
    const stream = createStreamableValue("");

    // Get context-aware system prompt
    const systemPrompt = pageContext
      ? getContextAwarePrompt(pageContext)
      : SYSTEM_PROMPT;

    // Start streaming response in background
    (async () => {
      try {
        const { textStream } = await streamText({
          model: AI_CONFIG.model,
          temperature: AI_CONFIG.temperature,
          maxTokens: AI_CONFIG.maxTokens,
          system: systemPrompt,
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          tools: swapiTools,
          maxSteps: 5, // Allow up to 5 tool calls in sequence
        });

        // Stream the text response
        for await (const delta of textStream) {
          stream.update(delta);
        }

        // Mark stream as done
        stream.done();
      } catch (error) {
        console.error("Error in streaming:", error);
        stream.error(error);
      }
    })();

    return {
      output: stream.value,
      success: true,
    };
  } catch (error) {
    console.error("Error in askAgent:", error);
    return {
      output: null,
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Generate a simple non-streaming response
 * Useful for non-interactive queries
 */
export async function askAgentSimple(
  query: string,
  pageContext?: string
): Promise<{ response: string; success: boolean; error?: string }> {
  "use server";

  try { 
    const systemPrompt = pageContext
      ? getContextAwarePrompt(pageContext)
      : SYSTEM_PROMPT;

    const result = await streamText({
      model: AI_CONFIG.model,
      temperature: AI_CONFIG.temperature,
      maxTokens: AI_CONFIG.maxTokens,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      tools: swapiTools,
      maxSteps: 5,
    });

    // Collect all text from stream
    let fullText = "";
    for await (const delta of result.textStream) {
      fullText += delta;
    }

    return {
      response: fullText,
      success: true,
    };
  } catch (error) {
    console.error("Error in askAgentSimple:", error);
    return {
      response: "",
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Validate AI configuration
 * Checks if API keys are configured
 */
export async function validateAIConfig(): Promise<{
  isValid: boolean;
  error?: string;
}> {
  "use server";

  try {
    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      return {
        isValid: false,
        error: "OPENAI_API_KEY is not configured. Please add it to your .env.local file.",
      };
    }

    return {
      isValid: true,
    };
  } catch {
    return {
      isValid: false,
      error: "Failed to validate AI configuration.",
    };
  }
}

