export interface IMessage {
  id: string;
  ticket_id: string;
  conversation_id: string;
  sender: string;
  content: string;
  read_status: boolean;
  updated_at: Date;
  created_at: Date;
}
