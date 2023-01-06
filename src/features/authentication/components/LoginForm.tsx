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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Email is invalid' }
      )
      .required('Email address is empty')
  });

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/user/dashboard');
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
      {({ errors, touched }) => (
        <Form>
          <Card>
            <div className="mb-11 flex flex-col items-center justify-center gap-[15px]">
              <CardTitle>Log In</CardTitle>
              <CardSubtitle>Log In to continue to suforia</CardSubtitle>
            </div>
            {/* inputs */}
            <div className="grid gap-x-4">
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
                      {touched?.email && errors?.email ? <ErrorMessage text={errors?.email} /> : ''}
                    </>
                  );
                }}
              </Field>
            </div>

            <Button
              classes="mt-2"
              btnState={isLoading ? 'loading' : 'normal'}
              size="lg"
              type="submit"
            >
              Log In
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
}
