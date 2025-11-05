export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  thinking?: string[];
  isStreaming?: boolean;
}

export interface AgentPersona {
  id: string;
  name: string;
  icon: string;
  description: string;
  gradient: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  personaId: string;
  messages: Message[];
  timestamp: string;
}

export interface RepositoryContext {
  repository: string;
  language: string;
  fileCount: number;
  filesInContext: string[];
  currentTask?: string;
}
