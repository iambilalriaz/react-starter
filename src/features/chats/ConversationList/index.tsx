import { Card } from '../../../components/Card';
import Conversation from '../../../components/Conversation';

type ConversationsListType = {
  conversations: number[];
  // eslint-disable-next-line no-unused-vars
  onSelection: (convo: number) => void;
  selectedConversation: number;
};
const ConversationsList = ({
  conversations,
  onSelection,
  selectedConversation
}: ConversationsListType) => {
  return (
    <Card classes="px-8 py-7 h-[42rem] overflow-auto break-all">
      {conversations?.map((convo) => (
        <button
          className="w-full"
          type="button"
          onClick={() => onSelection(convo)}
          key={crypto.randomUUID()}
        >
          <Conversation
            selected={convo === selectedConversation}
            name="Bilal Riaz"
            lastMessage="Good Morning!"
            date="Today"
          />
        </button>
      ))}
    </Card>
  );
};

export default ConversationsList;
