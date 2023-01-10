import UserLayout from '../layouts/UserLayout';
import { getVendorPermissions } from '../utils';
import ConversationsList from '../features/chats/ConversationList';
import MessageList from '../features/chats/MessageList';

const VendorChats = () => {
  return (
    <UserLayout navText="Chats" vendorPermissions={getVendorPermissions()}>
      <div className="mt-20 mb-4 grid w-full grid-cols-3 gap-4 px-4">
        <MessageList />
        <ConversationsList />
      </div>
    </UserLayout>
  );
};

export default VendorChats;
