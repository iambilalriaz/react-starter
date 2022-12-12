/* eslint-disable react/no-unescaped-entities */
import { Field, Form, Formik } from 'formik';
import Button from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import Input from '../../../../components/Input';
import ForgotPasswordLayout from '../../../../layouts/ForgotPasswordLayout';
import CardSubtitle from '../CardSubtitle';
import CardTitle from '../CardTitle';

function ForgotPasswordCard() {
  return (
    <ForgotPasswordLayout>
      <Card>
        <CardTitle>Forget Password</CardTitle>
        <CardSubtitle>
          Enter the email or phone and we'll send OTP Code to reset your password.
        </CardSubtitle>
        <Formik
          initialValues={{ emailOrPhone: '' }}
          // validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
          }}
        >
          <Form>
            <Field name="emailOrPhone">
              {({ field, form: { touched, errors } }: any) => (
                <>
                  <Input
                    id="emailOrPhone"
                    type="text"
                    placeholder="Email or phone"
                    label="Email or Phone"
                    field={field}
                  />
                  <span className="text-error text-xs pt-2">
                    {errors.emailOrPhone && touched.emailOrPhone ? (
                      <div>{errors.emailOrPhone}</div>
                    ) : null}
                  </span>
                </>
              )}
            </Field>
            <div className="mt-[23.77px]">
              <Button type="submit" size="lg">
                Send Instructions
              </Button>
            </div>
          </Form>
        </Formik>
      </Card>
    </ForgotPasswordLayout>
  );
}

export default ForgotPasswordCard;
