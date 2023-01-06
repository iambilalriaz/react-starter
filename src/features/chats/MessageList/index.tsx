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
import { getVendorId } from '../../../utils';
import { messagesSelector, selectedConversationSelector } from '../../../lib/stateSelectors';
import { setConversations } from '../../vendor/vendorSlices/conversationsSlice';
import { setMessages } from '../../vendor/vendorSlices/messagesSlice';
import { setSelectedConversation } from '../../vendor/vendorSlices/selectedConversationSlice';

const MessageList = () => {
  const messages = useSelector(messagesSelector);
  const selectedConversation = useSelector(selectedConversationSelector);

  const dispatch = useDispatch();

  const getMessages = useCallback(() => {
    const vendorService = new VendorService();
    vendorService
      .getVendorMessages({
        vendorId: getVendorId(),
        influencerId: selectedConversation?.influencerId
      })
      .then(({ response }) => {
        dispatch(
          setMessages(
            response?.messages?.map((msg) => ({
              ...msg,
              timestamp: msg?.timestamp?.toString()
            }))
          )
        );
      });
  }, [dispatch, selectedConversation?.influencerId]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);
  return (
    <Card classes="col-span-2">
      <div className="sticky top-0 z-10 rounded-tl rounded-tr bg-primary px-6 py-4 text-white">
        <div className="flex items-center">
          <div className="online avatar">
            <div className="w-10 rounded-full">
              <img src={profileImg} alt="contact" loading="lazy" width={40} />
            </div>
          </div>
          <p className="ml-4 text-xl">Bilal Riaz</p>
        </div>
      </div>
      <div className="flex h-[35rem] w-full flex-col-reverse overflow-auto p-4">
        {messages?.map(({ messageId, text, sentByVendor }) => (
          <div className={`chat ${sentByVendor ? 'chat-end' : 'chat-start'}`} key={messageId}>
            <div className="chat-image avatar">
              <div className="w-7 rounded-full">
                <img src={profileImg} alt="contact" loading="lazy" width={28} />
              </div>
            </div>
            <div
              className={`chat-bubble ${
                sentByVendor ? 'bg-white text-primary shadow-bottom' : 'bg-primary'
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
            const vendorService = new VendorService();
            vendorService
              .sendMessage({
                messasgeId: crypto.randomUUID(),
                vendorId: getVendorId(),
                influencerId: 'EUykEaNlgTutFqzAI4WQ',
                message: values?.message
              })
              .then(() => {
                vendorService.getVendorConversations(getVendorId()).then(({ response }) => {
                  const allConvos = response?.messagePreviews?.map((convo) => ({
                    ...convo,
                    lastMessageTimestamp: convo?.lastMessageTimestamp?.toString()
                  }));
                  dispatch(setConversations(allConvos));
                  dispatch(setSelectedConversation(allConvos?.[0]));
                });
                getMessages();
                actions.resetForm();
                vendorService.getVendorConversations(getVendorId()).then(({ response }) => {
                  dispatch(
                    setConversations(
                      response?.messagePreviews?.map((convo) => ({
                        ...convo,
                        lastMessageTimestamp: convo?.lastMessageTimestamp?.toString()
                      }))
                    )
                  );
                });
              });
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
    </Card>
  );
};

export default MessageList;
