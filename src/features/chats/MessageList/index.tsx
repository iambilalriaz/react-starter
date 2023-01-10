/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import { IoMdSend } from 'react-icons/io';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../../../components/Card';
import profileImg from '../../../assets/profile.png';
import Input from '../../../components/Input';
import { FormikField } from '../../../types';
import { VendorService } from '../../../services/VendorService';
import { getInfluencerId, getQueryParam, getVendorId } from '../../../utils';
import {
  isInfluencerSelector,
  messagesSelector,
  selectedConversationSelector
} from '../../../lib/stateSelectors';
import { setConversations } from '../../vendor/vendorSlices/conversationsSlice';
import { setMessages } from '../../vendor/vendorSlices/messagesSlice';
import { setSelectedConversation } from '../../vendor/vendorSlices/selectedConversationSlice';
import { InfluencerService } from '../../../services/InfluencerService';
import { EmptyState } from '../../vendor/components/EmptState';

const MessageList = () => {
  const messages = useSelector(messagesSelector);
  const selectedConversation = useSelector(selectedConversationSelector);
  const isInfluencer = useSelector(isInfluencerSelector);
  const dispatch = useDispatch();

  const getMessages = useCallback(() => {
    if (getInfluencerId()) {
      const influencerService = new InfluencerService();
      influencerService.getInfluencerMessages(selectedConversation?.id).then(({ response }) => {
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
          influencerId: selectedConversation?.id || ''
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInfluencer, selectedConversation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [getMessages]);
  useEffect(() => {
    getMessages();
  }, [getMessages]);
  return (
    <Card classes="col-span-2 overflow-hidden">
      {messages?.length || selectedConversation?.id ? (
        <>
          <div className="sticky top-0 z-10 rounded-tl rounded-tr bg-primary px-6 py-4 text-white">
            <div className="flex items-center">
              <div className="online avatar">
                <div className="w-10 rounded-full">
                  <img src={profileImg} alt="contact" loading="lazy" width={40} />
                </div>
              </div>
              <p className="ml-4 text-xl">{selectedConversation?.name}</p>
            </div>
          </div>
          <div className="flex h-[35rem] w-full flex-col-reverse overflow-auto p-4">
            {messages?.map(({ messageId, text, sentByVendor }) => (
              <div
                className={`chat ${
                  isInfluencer
                    ? sentByVendor
                      ? 'chat-start'
                      : 'chat-end'
                    : sentByVendor
                    ? 'chat-end'
                    : 'chat-start'
                }`}
                key={messageId}
              >
                <div className="chat-image avatar">
                  <div className="w-7 rounded-full">
                    <img src={profileImg} alt="contact" loading="lazy" width={28} />
                  </div>
                </div>
                <div
                  className={`chat-bubble ${
                    isInfluencer
                      ? sentByVendor
                        ? 'bg-white text-primary shadow-bottom'
                        : 'bg-primary'
                      : sentByVendor
                      ? 'bg-primary'
                      : 'bg-white text-primary shadow-bottom'
                  }`}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
          <div className="sticky bottom-0">
            <Formik
              initialValues={{
                message: ''
              }}
              onSubmit={(values, actions) => {
                if (getInfluencerId()) {
                  const influencerService = new InfluencerService();

                  influencerService
                    .sendMessage({
                      messageId: crypto.randomUUID(),
                      vendorId: selectedConversation?.id || getQueryParam('chatId'),
                      message: values?.message
                    })
                    .then(() => {
                      influencerService.getInfluencerConversations().then(({ response }) => {
                        const allConvos = response?.messagePreviews?.map((convo) => ({
                          ...convo,
                          lastMessageTimestamp: convo?.lastMessageTimestamp?.toString()
                        }));
                        dispatch(setConversations(allConvos));
                        dispatch(
                          setSelectedConversation({
                            id: allConvos?.[0]?.vendorId,
                            name: allConvos?.[0]?.vendorName
                          })
                        );
                      });
                      getMessages();
                      actions.resetForm();
                    });
                } else {
                  const vendorService = new VendorService();
                  vendorService
                    .sendMessage({
                      messageId: crypto.randomUUID(),
                      vendorId: getVendorId(),
                      influencerId: selectedConversation?.id || getQueryParam('chatId'),
                      message: values?.message
                    })
                    .then(() => {
                      vendorService.getVendorConversations(getVendorId()).then(({ response }) => {
                        const allConvos = response?.messagePreviews?.map((convo) => ({
                          ...convo,
                          lastMessageTimestamp: convo?.lastMessageTimestamp?.toString()
                        }));
                        dispatch(setConversations(allConvos));
                        dispatch(
                          setSelectedConversation({
                            id: allConvos?.[0]?.influencerId,
                            name: allConvos?.[0]?.userName
                          })
                        );
                      });
                      getMessages();
                      actions.resetForm();
                    });
                }
              }}
            >
              <Form>
                <Field name="message">
                  {({ field }: { field: FormikField }) => (
                    <Card classes="relative rounded-t-none flex items-center">
                      <div className="w-full py-1 px-2">
                        <Input
                          field={field}
                          id="message"
                          label=""
                          placeholder="Write your message..."
                          classes="border-none focus:outline-0"
                          absoluteIcon={
                            <button type="submit" className="absolute right-3">
                              <IoMdSend width="45" />
                            </button>
                          }
                        />
                      </div>
                    </Card>
                  )}
                </Field>
              </Form>
            </Formik>
          </div>
        </>
      ) : (
        <p className="grid h-[40rem] place-items-center">
          <EmptyState message="No messages found." />
        </p>
      )}
    </Card>
  );
};

export default MessageList;
