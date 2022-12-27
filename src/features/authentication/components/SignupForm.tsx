/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../../components/Input';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { getQueryParam } from '../../../constants';
import { AuthService } from '../../../services/AuthService';

type FormValues = {
  phoneNumber: string;
};
const initialValues = {
  phoneNumber: ''
};
const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+[1-9]\d{1,14}$/, {
      message: 'Please enter a valid phone number'
    })
    .required('Phone number is empty!')
});

export default function SignupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService();
  const onPhoneSubmit = (values: FormValues) => {
    localStorage.setItem('countDown', '59');
    navigate(
      `/auth/otp?phone=${JSON.stringify(values.phoneNumber)}&${
        getQueryParam('newUser') ? 'newUser=true' : ''
      }`,
      {
        replace: true
      }
    );
    authService
      .requestSMSCode({ phoneNumber: values.phoneNumber })
      .then(() => {
        navigate('/home', {
          replace: true
        });
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
                  placeholder="+923112345678"
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
