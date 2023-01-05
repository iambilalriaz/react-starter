import { useCallback, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import { getVendorPermissions } from '../utils';
import ConversationsList from '../features/chats/ConversationList';
import MessageList from '../features/chats/MessageList';

const conversations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const VendorChats = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations?.[0]);
  const onSelection = useCallback((convo: number) => {
    setSelectedConversation(convo);
  }, []);
  return (
    <UserLayout navText="Chats" vendorPermissions={getVendorPermissions()}>
      <div className="mt-20 mb-4 grid w-full grid-cols-3 gap-4 px-4">
        <MessageList />
        <ConversationsList
          conversations={conversations}
          onSelection={onSelection}
          selectedConversation={selectedConversation}
        />
      </div>
    </UserLayout>
  );
};

export default VendorChats;
