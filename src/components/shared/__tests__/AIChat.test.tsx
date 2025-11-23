/**
 * AIChat Component Tests
 * Tests for AI chat opening and rendering
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AIChat } from "../AIChat";
import { Message } from "@/actions/chat-actions";

jest.mock("ai/rsc"); // uses __mocks__/ai/rsc.js

// Mock the chat child components
jest.mock("@/components/chat", () => ({
  ChatBubble: ({
    isOpen,
    onToggle,
  }: {
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <button
      data-testid="chat-bubble"
      onClick={onToggle}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? "Close" : "Open"}
    </button>
  ),
  ChatContainer: ({
    isOpen,
    onClose,
    messages,
    pageContext,
  }: {
    isOpen: boolean;
    onClose: () => void;
    messages: Message[];
    pageContext?: string;
  }) => {
    if (!isOpen) return null;

    return (
      <div data-testid="chat-container">
        <div data-testid="chat-header">
          {pageContext
            ? `AI Assistant - ${pageContext}`
            : "Star Wars AI Assistant"}
        </div>
        <div data-testid="messages-container">
          {messages.length === 0 ? (
            <div data-testid="welcome-screen">Welcome to Star Wars AI!</div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} data-testid={`message-${idx}`}>
                {msg.content}
              </div>
            ))
          )}
        </div>
        <button data-testid="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  },
}));

describe("AIChat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Chat opens and renders correctly", () => {
    it("should render the chat bubble initially", () => {
      render(<AIChat />);

      const chatBubble = screen.getByTestId("chat-bubble");
      expect(chatBubble).toBeInTheDocument();
      expect(chatBubble).toHaveTextContent("Open");
    });

    it("should not render chat container when closed", () => {
      render(<AIChat />);

      const chatContainer = screen.queryByTestId("chat-container");
      expect(chatContainer).not.toBeInTheDocument();
    });

    it("should open chat when bubble is clicked", async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      // Chat should be closed initially
      expect(screen.queryByTestId("chat-container")).not.toBeInTheDocument();

      // Click the chat bubble to open
      const bubble = screen.getByTestId("chat-bubble");
      await user.click(bubble);

      // Chat container should appear
      await waitFor(() => {
        expect(screen.getByTestId("chat-container")).toBeInTheDocument();
      });
    });

    it("should show welcome screen when chat opens with no messages", async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      const bubble = screen.getByTestId("chat-bubble");
      await user.click(bubble);

      await waitFor(() => {
        expect(screen.getByTestId("chat-container")).toBeInTheDocument();
        expect(screen.getByTestId("welcome-screen")).toBeInTheDocument();
        expect(screen.getByTestId("welcome-screen")).toHaveTextContent(
          "Welcome to Star Wars AI!"
        );
      });
    });

    it("should display correct page context in header", async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      const bubble = screen.getByTestId("chat-bubble");
      await user.click(bubble);

      await waitFor(() => {
        const header = screen.getByTestId("chat-header");
        // Since usePathname is mocked to return '/', it should show "Dashboard"
        expect(header).toHaveTextContent("AI Assistant - Dashboard");
      });
    });

    it("should update bubble state when chat is open", async () => {
      const user = userEvent.setup();
      render(<AIChat />);

      const bubble = screen.getByTestId("chat-bubble");

      // Initially closed
      expect(bubble).toHaveTextContent("Open");

      // Open chat
      await user.click(bubble);

      await waitFor(() => {
        // Bubble should show "Close" when chat is open
        expect(bubble).toHaveTextContent("Close");
      });
    });
  });
});
