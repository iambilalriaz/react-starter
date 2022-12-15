/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import Input from '../../../components/Input';
import CardSubtitle from './CardSubtitle';
import CardTitle from './CardTitle';
import { AuthServiceClient } from '../../../api/authpb/v1/auth.client';
import { RequestEmailLinkRequest_AppType } from '../../../api/authpb/v1/auth';

const ErrorMessage = ({ text }: { text: string }): JSX.Element => (
  <span className="text-xs text-error mt-1">{text}</span>
);

type FormValues = {
  email: string;
  phoneNumber: string;
};
const initialValues = {
  email: '',
  phoneNumber: ''
};

export default function LoginForm() {
  const [inputType, setInputType] = useState('email');
  const navigate = useNavigate();

  const FormSchema = Yup.object().shape(
    inputType === 'email'
      ? {
          email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email address is empty')
        }
      : {
          phoneNumber: Yup.string()
            .matches(/^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/, {
              message: 'Please enter a valid phone number'
            })
            .required('Phone number is empty')
        }
  );

  const changeInputType = () => {
    setInputType((prevInputType) => (prevInputType === 'email' ? 'phone' : 'email'));
  };
  const onFormSubmit = (values: FormValues) => {
    const transport = new GrpcWebFetchTransport({
      baseUrl: 'http://192.168.0.117:8089'
    });
    const authService = new AuthServiceClient(transport);
    authService
      .requestEmailLink({
        email: values?.email,
        appType: RequestEmailLinkRequest_AppType.USERS_APP
      })
      .then((response) => console.log(response));
    navigate('/code');
  };
  return (
    <Formik initialValues={initialValues} validationSchema={FormSchema} onSubmit={onFormSubmit}>
      {({ setFieldValue, setFieldTouched, errors, touched }) => (
        <Form>
          <Card>
            <div className="flex flex-col mb-11 gap-[15px] items-center justify-center">
              <CardTitle>Log In</CardTitle>
              <CardSubtitle>Log In to continue to suforia</CardSubtitle>
            </div>
            {/* inputs */}
            <div className="grid gap-x-4">
              {inputType === 'email' ? (
                <Field name="email">
                  {({ field }: any) => (
                    <>
                      <Input
                        label="Email"
                        type=""
                        id="email"
                        placeholder="bill.sanders@example.com"
                        field={field}
                      />
                      {touched?.email && errors?.email ? <ErrorMessage text={errors?.email} /> : ''}
                    </>
                  )}
                </Field>
              ) : (
                <Field name="phoneNumber">
                  {({ field }: any) => (
                    <>
                      <Input
                        label="Phone Number"
                        type="text"
                        id="phoneNumber"
                        placeholder="(480) 555-0103"
                        field={field}
                      />
                      {touched?.phoneNumber && errors?.phoneNumber ? (
                        <ErrorMessage text={errors?.phoneNumber} />
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </Field>
              )}
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => {
                  changeInputType();
                  setFieldValue(inputType === 'email' ? 'email' : 'phoneNumber', '');
                  setFieldTouched('email', false);
                  setFieldTouched('phoneNumber', false);
                }}
                className="underline font-medium text-sm text-black mb-8"
              >
                use {inputType === 'email' ? 'phone number' : 'email'} instead
              </button>
            </div>

            <Button size="lg" type="submit">
              Log In
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
