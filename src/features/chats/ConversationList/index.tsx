/* eslint-disable camelcase */
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../../components/Card';
import Conversation from '../../../components/Conversation';
import { conversationsSelector } from '../../../lib/stateSelectors';
import { ConversationType } from '../../../lib/types';
import { VendorService } from '../../../services/VendorService';
import { getVendorId } from '../../../utils';
import { EmptyState } from '../../vendor/components/EmptState';
import { setConversations } from '../../vendor/vendorSlices/conversationsSlice';
import { setSelectedConversation } from '../../vendor/vendorSlices/selectedConversationSlice';
// eslint-disable-next-line @typescript-eslint/no-redeclare

const ConversationsList = () => {
  const conversations = useSelector(conversationsSelector);
  const dispatch = useDispatch();

  const onSelection = useCallback((convo: ConversationType) => {
    dispatch(setSelectedConversation(convo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const vendorService = new VendorService();
    vendorService.getVendorConversations(getVendorId()).then(({ response }) => {
      const allConversations = response?.messagePreviews?.map((convo) => ({
        ...convo,
        lastMessageTimestamp: convo?.lastMessageTimestamp?.toString()
      }));
      dispatch(setConversations(allConversations));
      if (allConversations?.length) {
        dispatch(setSelectedConversation(allConversations?.[0]));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card classes="px-8 py-7 h-full overflow-auto break-all">
      {conversations?.length ? (
        conversations?.map((convo) => (
          <button
            className="w-full"
            type="button"
            onClick={() => onSelection(convo)}
            key={crypto.randomUUID()}
          >
            <Conversation
              selected={convo?.influencerId === 'EUykEaNlgTutFqzAI4WQ'}
              name={convo?.userName?.split(' ')?.[0]}
              lastMessage={convo?.lastMessageText}
              date={moment(convo?.lastMessageTimestamp, 'X').format('hh:mm A')}
            />
          </button>
        ))
      ) : (
        <div className="grid h-full place-items-center">
          <EmptyState />
        </div>
      )}
    </Card>
  );
};

export default ConversationsList;
