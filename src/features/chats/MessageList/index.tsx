/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import { IoMdSend } from 'react-icons/io';
import { Card } from '../../../components/Card';
import profileImg from '../../../assets/profile.png';
import Input from '../../../components/Input';
import { FormikField } from '../../../types';

const messages = [
  { id: 1, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 2, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 3, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 4, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 4, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 5, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 6, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 7, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 8, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 9, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 10, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 11, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 12, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 13, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 14, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 15, message: 'Aoa kese ho?', message_by_vendor: false },
  { id: 16, message: 'Aoa kese ho?', message_by_vendor: true },
  { id: 17, message: 'Aoa kese ho?', message_by_vendor: false }
];
const MessageList = () => {
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
      <div className="h-[35rem] w-full overflow-auto p-4">
        {messages?.map(({ id, message, message_by_vendor }) => (
          <div className={`chat ${message_by_vendor ? 'chat-end' : 'chat-start'}`} key={id}>
            <div className="chat-image avatar">
              <div className="w-7 rounded-full">
                <img src={profileImg} alt="contact" loading="lazy" width={28} />
              </div>
            </div>
            <div
              className={`chat-bubble ${
                message_by_vendor ? 'bg-white text-primary shadow-bottom' : 'bg-primary'
              }`}
            >
              {message}
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0">
        <Formik
          initialValues={{
            message: ''
          }}
          onSubmit={() => {}}
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
                        <div className="absolute right-3">
                          <IoMdSend width="45" />
                        </div>
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
