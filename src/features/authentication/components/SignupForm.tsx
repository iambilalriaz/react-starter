/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Input';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';

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
        onSubmit={() => {
          localStorage.setItem('countDown', '59');
          navigate('/code?inputType=phone', { replace: true });
        }}
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
