/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Input';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
// import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
// import { AuthServiceClient } from '../../../api/authpb/v1/auth.client';
// import { useState } from 'react';
// import { getQueryParam } from '../../../constants';

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
  // const [isLoading, setIsLoading] = useState(false);

  const onPhoneSubmit = (values: FormValues) => {
    localStorage.setItem('countDown', '59');
    console.log(values.phoneNumber);
    navigate(`/code?inputType=phone&phoneNumber=${values.phoneNumber}`, { replace: true });
    // const transport = new GrpcWebFetchTransport({
    //   baseUrl: 'http://192.168.0.109:8089'
    // });
    // const authService = new AuthServiceClient(transport);
    // authService
    //   .requestSMSCode({ phoneNumber: values.phoneNumber })
    // .then(({ response }) => {
    // if (getQueryParam('inputType') === 'phone') {
    //   if (response?.maskedPhoneNumber) {
    //     navigate('/home', { replace: true });
    //   } else {
    //     navigate('/signup');
    //   }
    //   } else if (getQueryParam('inputType') === 'phone') {
    //     authService.requestSMSCode({
    //       phoneNumber: getQueryParam('phoneNumber') || ''
    //     });
    //     navigate('/home', {
    //       replace: true
    //     });
    //   }
    // console.log('phone :', response);
    // })
    // .catch((err) => {
    //   setIsLoading(false);
    //   console.log(err);
    // });
  };

  return (
    <Card>
      <div className="flex flex-col mb-11 items-center justify-center">
        <h2 className="md:text-2xl text-lg">Create Account</h2>
        <p className="text-accent md:text-base text-lg">Get started with Suforia</p>
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
                <span className="text-error text-xs pt-2">
                  {errors?.phoneNumber && touched?.phoneNumber ? (
                    <div>{errors?.phoneNumber}</div>
                  ) : null}
                </span>
              </div>
            )}
          </Field>

          <Button type="submit" size="lg">
            Continue
          </Button>
        </Form>
      </Formik>
    </Card>
  );
}
