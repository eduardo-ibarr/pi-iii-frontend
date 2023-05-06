export interface ICreateMessage {
  ticket_id: string;
  conversation_id: string;
  sender: string;
  content: string;
  read_status: boolean;
}
