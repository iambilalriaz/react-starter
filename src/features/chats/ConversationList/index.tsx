/* eslint-disable camelcase */
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineMessage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/Card';
import Conversation from '../../../components/Conversation';
import { conversationsSelector, selectedConversationSelector } from '../../../lib/stateSelectors';
import { ConversationType, Influencer, Vendor } from '../../../lib/types';
import { InfluencerService } from '../../../services/InfluencerService';
import { VendorService } from '../../../services/VendorService';
import { isInfluencer, getVendorId } from '../../../utils';
import { EmptyState } from '../../vendor/components/EmptState';
import { setConversations } from '../../vendor/vendorSlices/conversationsSlice';
import { setSelectedConversation } from '../../vendor/vendorSlices/selectedConversationSlice';
import ContactsList from './ContactsList';
import { INTERVAL_TIME } from '../../../constants';

const ConversationsList = () => {
  const conversations = useSelector(conversationsSelector);
  const selectedConversation = useSelector(selectedConversationSelector);
  const [contactsList, setContactsList] = useState<Vendor[] | Influencer[]>([]);
  const [newChat, setNewChat] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSelection = useCallback((convo: ConversationType) => {
    navigate(`?chatId=${convo?.influencerId || convo?.vendorId}`);
    dispatch(
      setSelectedConversation({
        id: convo?.influencerId || convo?.vendorId || '',
        name: convo?.userName || convo?.vendorName || ''
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getConversations = useCallback(() => {
    if (isInfluencer()) {
      const influencerService = new InfluencerService();
      influencerService.getInfluencerConversations().then(({ response }) => {
        const allConversations = response?.messagePreviews?.map((convo) => ({
          ...convo,
          lastMessageTimestamp: convo?.lastMessageTimestamp?.toString()
        }));
        dispatch(setConversations(allConversations));
        if (allConversations?.length) {
          dispatch(
            setSelectedConversation({
              id: allConversations?.[0]?.vendorId,
              name: allConversations?.[0]?.vendorName
            })
          );
          navigate(`?chatId=${allConversations?.[0]?.vendorId}`);
        }
      });
    } else {
      const vendorService = new VendorService();
      vendorService.getVendorConversations(getVendorId()).then(({ response }) => {
        const allConversations = response?.messagePreviews?.map((convo) => ({
          ...convo,
          lastMessageTimestamp: convo?.lastMessageTimestamp?.toString()
        }));
        dispatch(setConversations(allConversations));
        if (allConversations?.length) {
          dispatch(
            setSelectedConversation({
              id: allConversations?.[0]?.influencerId,
              name: allConversations?.[0]?.userName
            })
          );
          navigate(`?chatId=${allConversations?.[0]?.influencerId}`);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      getConversations();
    }, INTERVAL_TIME);
    return () => clearInterval(intervalId);
  }, [getConversations]);
  useEffect(() => {
    getConversations();
  }, [getConversations]);
  const newChatHandler = () => {
    setNewChat(true);
    if (isInfluencer()) {
      const influencerService = new InfluencerService();
      influencerService.searchVendors().then(({ response }) => {
        setContactsList(response?.vendors);
      });
    } else {
      const vendorService = new VendorService();
      vendorService.searchInfluencers().then(({ response }) => {
        setContactsList(response?.influencers);
      });
    }
  };
  return (
    <Card classes="px-8 py-7 h-full overflow-auto break-all relative">
      {newChat ? (
        <ContactsList contacts={contactsList} setNewChat={setNewChat} />
      ) : (
        <>
          {conversations?.length ? (
            conversations?.map((convo) => (
              <button
                className="w-full"
                type="button"
                onClick={() => onSelection(convo)}
                key={crypto.randomUUID()}
              >
                <Conversation
                  selected={
                    convo?.influencerId === selectedConversation?.id ||
                    convo?.vendorId === selectedConversation?.id
                  }
                  name={
                    convo?.userName?.split(' ')?.[0] || convo?.vendorName?.split(' ')?.[0] || ''
                  }
                  lastMessage={convo?.lastMessageText}
                  date={moment(convo?.lastMessageTimestamp, 'X').format('hh:mm A')}
                />
              </button>
            ))
          ) : (
            <div className="grid h-full place-items-center">
              <EmptyState message="No conversations found." />
            </div>
          )}
          <button
            type="button"
            className="absolute bottom-12 right-12 grid h-16 w-16 place-items-center rounded-[50%] bg-primary text-2xl text-white"
            onClick={newChatHandler}
          >
            <MdOutlineMessage />
          </button>
        </>
      )}
    </Card>
  );
};

export default ConversationsList;
