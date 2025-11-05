import { create } from 'zustand';
import { Message, AgentPersona, ChatConversation } from '@/types/chat';
import { agentPersonas, dummyConversations, dummyMessages } from '@/lib/dummy-data';

interface ChatState {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  currentMessages: Message[];
  selectedPersona: AgentPersona;
  isAgentThinking: boolean;
  thinkingSteps: string[];
  
  // Actions
  setSelectedPersona: (persona: AgentPersona) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  startAgentThinking: (steps: string[]) => void;
  stopAgentThinking: () => void;
  createNewConversation: () => void;
  loadConversation: (conversationId: string) => void;
  clearCurrentChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: dummyConversations,
  currentConversationId: 'conv-1',
  currentMessages: dummyMessages,
  selectedPersona: agentPersonas[0],
  isAgentThinking: false,
  thinkingSteps: [],

  setSelectedPersona: (persona) => set({ selectedPersona: persona }),

  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      currentMessages: [...state.currentMessages, newMessage],
    }));
  },

  startAgentThinking: (steps) => set({ isAgentThinking: true, thinkingSteps: steps }),
  
  stopAgentThinking: () => set({ isAgentThinking: false, thinkingSteps: [] }),

  createNewConversation: () => {
    const newConv: ChatConversation = {
      id: `conv-${Date.now()}`,
      title: 'New Conversation',
      personaId: get().selectedPersona.id,
      messages: [],
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      conversations: [newConv, ...state.conversations],
      currentConversationId: newConv.id,
      currentMessages: [],
    }));
  },

  loadConversation: (conversationId) => {
    const conversation = get().conversations.find((c) => c.id === conversationId);
    if (conversation) {
      const persona = agentPersonas.find((p) => p.id === conversation.personaId) || agentPersonas[0];
      set({
        currentConversationId: conversationId,
        currentMessages: conversation.messages,
        selectedPersona: persona,
      });
    }
  },

  clearCurrentChat: () => set({ currentMessages: [] }),
}));
