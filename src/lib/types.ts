export interface ILocationInterface {
  id: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  hoursOfOperation: string[];
}

export type ConversationType = {
  influencerId: string;
  userName: string;
  lastMessageTimestamp: string;
  lastMessageText: string;
  sentByVendor: boolean;
};
export type MessageType = {
  messageId: string;
  influencerId: string;
  timestamp: string;
  text: string;
  sentByVendor: boolean;
};
