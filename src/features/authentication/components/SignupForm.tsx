/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../../components/Input';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { AuthServiceClient } from '../../../api/authpb/v1/auth.client';
import { getQueryParam, getTransport } from '../../../constants';

type FormValues = {
  phoneNumber: string;
};
const initialValues = {
  phoneNumber: ''
};
const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, {
      message: 'Please enter a valid phone number'
    })
    .required('Phone number is empty!')
});

export default function SignupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthServiceClient(getTransport());
  const onPhoneSubmit = (values: FormValues) => {
    localStorage.setItem('countDown', '59');
    navigate(`/code?inputType=phone&phoneNumber=${values.phoneNumber}`, { replace: true });
    authService
      .requestSMSCode({ phoneNumber: values.phoneNumber })
      .then(({ response }) => {
        if (getQueryParam('inputType') === 'email') {
          if (response?.maskedPhoneNumber) {
            navigate('/home', { replace: true });
          } else {
            navigate('/signup');
          }
        } else if (getQueryParam('inputType') === 'phone') {
          authService.requestSMSCode({
            phoneNumber: getQueryParam('phoneNumber') || ''
          });
          navigate('/home', {
            replace: true
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Card>
      <div className="mb-11 flex flex-col items-center justify-center">
        <h2 className="text-lg md:text-2xl">Create Account</h2>
        <p className="text-lg text-accent md:text-base">Get started with Suforia</p>
      </div>
      {/* inputs */}
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onPhoneSubmit}
      >
        <Form>
          <Field name="phoneNumber">
            {({ field, form: { touched, errors } }: any) => (
              <div className="mb-4">
                <Input
                  label="Phone Number"
                  type="text"
                  id="phoneNumber"
                  placeholder="(480) 555-0103"
                  field={field}
                />
                <span className="pt-2 text-xs text-error">
                  {errors?.phoneNumber && touched?.phoneNumber ? (
                    <div>{errors?.phoneNumber}</div>
                  ) : null}
                </span>
              </div>
            )}
          </Field>

          <Button btnState={isLoading ? 'loading' : 'normal'} type="submit" size="lg">
            Continue
          </Button>
        </Form>
      </Formik>
    </Card>
  );
}
