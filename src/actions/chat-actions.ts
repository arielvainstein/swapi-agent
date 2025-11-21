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
 * Learning notes: 
 * - system role: app or system notifications.
 * - user role: messages sent by the user like questions or commands.
 * - assistant role: Responses from the AI agent.
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

  // Validate AI configuration before proceeding
  const configValidation = await validateAIConfig();
  if (!configValidation.isValid) {
    return {
      output: null,
      success: false,
      error: configValidation.error || "AI configuration is invalid. Please check your API key.",
    };
  }

  try {
    // Create a streamable value for the response
    const stream = createStreamableValue("");

    /**
     * Learning notes: If no page context is provided, the AI agent
     * will use the default system prompt.
     * Sharing context between the AI agent and the user is important
     * for the AI agent to understand the user's intent and provide 
     * relevant information.
     */
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

