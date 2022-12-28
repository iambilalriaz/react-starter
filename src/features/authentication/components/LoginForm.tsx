/* eslint-disable camelcase */
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import Input from '../../../components/Input';
import CardSubtitle from './CardSubtitle';
import CardTitle from './CardTitle';
import { RequestEmailLinkRequest_AppType } from '../../../api/authpb/v1/auth';
import { isLoggedIn } from '../../../router/routes';
import { AuthService } from '../../../services/AuthService';
import { FormikField } from '../../../types';

const ErrorMessage = ({ text }: { text: string }): JSX.Element => (
  <span className="mt-1 text-xs text-error">{text}</span>
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
  const [
    inputType
    //  setInputType
  ] = useState('email');
  const [isLoading, setIsLoading] = useState(false);
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
            .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, {
              message: 'Please enter a valid phone number'
            })
            .required('Phone number is empty')
        }
  );

  // const changeInputType = () => {
  //   setInputType((prevInputType) => (prevInputType === 'email' ? 'phone' : 'email'));
  // };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFormSubmit = (values: FormValues) => {
    const authService = new AuthService();
    setIsLoading(true);
    authService
      .requestEmailLink({
        email: values?.email,
        appType: RequestEmailLinkRequest_AppType.USERS_APP
      })
      .then(() => {
        localStorage.setItem('countDown', '59');
        navigate('/auth/email', { replace: true });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        localStorage.setItem('countDown', '59');
        navigate('/auth/email?isError=true', { replace: true });
      });
  };
  return (
    <Formik initialValues={initialValues} validationSchema={FormSchema} onSubmit={onFormSubmit}>
      {({
        // setFieldValue, setFieldTouched,
        errors,
        touched
      }) => (
        <Form>
          <Card>
            <div className="mb-11 flex flex-col items-center justify-center gap-[15px]">
              <CardTitle>Log In</CardTitle>
              <CardSubtitle>Log In to continue to suforia</CardSubtitle>
            </div>
            {/* inputs */}
            <div className="grid gap-x-4">
              {inputType === 'email' ? (
                <Field name="email">
                  {({ field }: { field: FormikField }) => {
                    return (
                      <>
                        <Input
                          label="Email"
                          type=""
                          id="email"
                          placeholder="bill.sanders@example.com"
                          field={field}
                        />
                        {touched?.email && errors?.email ? (
                          <ErrorMessage text={errors?.email} />
                        ) : (
                          ''
                        )}
                      </>
                    );
                  }}
                </Field>
              ) : (
                <Field name="phoneNumber">
                  {({ field }: { field: FormikField }) => (
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
            <div className="mt-2 flex justify-end">
              {/* <button
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
              </button> */}
            </div>

            <Button btnState={isLoading ? 'loading' : 'normal'} size="lg" type="submit">
              Log In
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
