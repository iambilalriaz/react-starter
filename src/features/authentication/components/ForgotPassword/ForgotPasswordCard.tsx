/* eslint-disable react/no-unescaped-entities */
import { Field, Form, Formik } from 'formik';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ForgotPasswordLayout from '../../../../layouts/ForgotPasswordLayout';

function ForgotPasswordCard() {
  return (
    <ForgotPasswordLayout>
      <>
        <p className="text-[24px] bold-[500] text-center text-primary leading-[36px]">
          Forget Password
        </p>
        <p className="text-[16px] bold-[400] text-center text-accent leading-[24px]">
          Enter the email or phone and we'll send OTP Code to reset your password.
        </p>
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
      </>
    </ForgotPasswordLayout>
  );
}

export default ForgotPasswordCard;
