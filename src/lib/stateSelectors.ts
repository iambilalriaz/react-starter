import { RootState } from '../app/store';

export const selectedLocationSelector = (state: RootState) => state?.selectedLocation;
export const isFormOpenSelector = (state: RootState) => state?.toggleForm;
export const allLocationsDataSelector = (state: RootState) => state?.allLocationsData;
export const selectedConversationSelector = (state: RootState) => state?.selectedConversation;
export const conversationsSelector = (state: RootState) => state?.conversations;
export const messagesSelector = (state: RootState) => state?.messages;
export const selectedSidebarItemSelector = (state: RootState) => state?.selectedSidebarItem;
export const isInfluencerSelector = (state: RootState) => state?.isInfluencer;
export const checkingInfluencerSelector = (state: RootState) => state?.checkingInfluence;
