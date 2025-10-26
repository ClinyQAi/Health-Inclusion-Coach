
export enum Author {
  USER = 'user',
  AI = 'ai',
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  author: Author;
  content: string;
  sources?: GroundingSource[];
  feedback?: 'up' | 'down' | null;
}
