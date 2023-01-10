/* eslint-disable camelcase */
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineMessage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../../../components/Card';
import Conversation from '../../../components/Conversation';
import { conversationsSelector, selectedConversationSelector } from '../../../lib/stateSelectors';
import { ConversationType, Influencer, Vendor } from '../../../lib/types';
import { InfluencerService } from '../../../services/InfluencerService';
import { VendorService } from '../../../services/VendorService';
import { isInfluencer, getVendorId, getQueryParam } from '../../../utils';
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
          const conversation = allConversations?.find(
            (convo) => convo?.vendorId === getQueryParam('chatId')
          );
          dispatch(
            setSelectedConversation({
              id: conversation?.vendorId || '',
              name: conversation?.vendorName || ''
            })
          );
          if (conversation?.vendorId) {
            navigate(`?chatId=${conversation?.vendorId}`);
          }
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
          const conversation = allConversations?.find(
            (convo) => convo?.influencerId === getQueryParam('chatId')
          );
          dispatch(
            setSelectedConversation({
              id: conversation?.influencerId || '',
              name: conversation?.userName || ''
            })
          );

          if (conversation?.influencerId) {
            navigate(`?chatId=${conversation?.influencerId}`);
          }
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
                key={uuidv4()}
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
