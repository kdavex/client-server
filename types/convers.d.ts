import { IMessage } from "../server/types";

export interface IConverseMessagePayload extends IMessage {
  unreadCount: {};
}

export interface IReadMessagePayload {
  converse_id: string;
  user_id: string;
}
