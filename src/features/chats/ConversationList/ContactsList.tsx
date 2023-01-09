import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../../assets/profile.png';
import Input from '../../../components/Input';
import { Influencer, Vendor } from '../../../lib/types';
import { InfluencerService } from '../../../services/InfluencerService';
import { VendorService } from '../../../services/VendorService';
import { getInfluencerId, getVendorId } from '../../../utils';
import { EmptyState } from '../../vendor/components/EmptState';
import { setMessages } from '../../vendor/vendorSlices/messagesSlice';
import { setSelectedConversation } from '../../vendor/vendorSlices/selectedConversationSlice';

const ContactsList = ({
  contacts,
  setNewChat
}: {
  contacts: Vendor[] | Influencer[];
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <button type="button" className="text-xl" onClick={() => setNewChat(false)}>
          <IoMdArrowRoundBack />
        </button>

        <div className="w-full">
          <Input classes="w-full" placeholder="Search here..." id="searchedValue" />
        </div>
      </div>
      {contacts?.length ? (
        contacts?.map((contact) => (
          <button
            key={contact?.id}
            type="button"
            onClick={() => {
              if (getInfluencerId()) {
                const influencerService = new InfluencerService();
                influencerService.getInfluencerMessages(contact?.id).then(({ response }) => {
                  dispatch(
                    setMessages(
                      response?.messages
                        ?.filter((msg) => msg?.messageId)
                        ?.map((msg) => ({
                          ...msg,
                          timestamp: msg?.timestamp?.toString()
                        }))
                    )
                  );
                });
              } else {
                const vendorService = new VendorService();
                vendorService
                  .getVendorMessages({
                    vendorId: getVendorId(),
                    influencerId: contact?.id
                  })
                  .then(({ response }) => {
                    dispatch(
                      setMessages(
                        response?.messages
                          ?.filter((msg) => msg?.messageId)
                          ?.map((msg) => ({
                            ...msg,
                            timestamp: msg?.timestamp?.toString()
                          }))
                      )
                    );
                  });
              }
              dispatch(setSelectedConversation(contact));
              navigate(`?chatId:${contact?.id}`);
              setNewChat(false);
            }}
            className="my-2 flex w-full items-center justify-between rounded-2xl p-4"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center ">
                <img src={profileImg} alt="contact" loading="lazy" width={45} />
                <div className="ml-2 w-full">
                  <p className="text-left font-medium">{contact?.name}</p>
                </div>
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="grid h-[32rem] place-items-center">
          <EmptyState message="No contacts found." />
        </div>
      )}
    </div>
  );
};

export default ContactsList;
