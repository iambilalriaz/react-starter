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
  influencerId?: string;
  vendorId?: string;
  userName?: string;
  lastMessageTimestamp: string;
  lastMessageText: string;
  sentByVendor: boolean;
  vendorName?: string;
};
export type MessageType = {
  messageId: string;
  influencerId?: string;
  timestamp: string;
  text: string;
  sentByVendor: boolean;
};

export type SidebarItemType = {
  label: string;
  // eslint-disable-next-line no-unused-vars
  Icon: (props: { color: string }) => JSX.Element;
  path: string;
};
