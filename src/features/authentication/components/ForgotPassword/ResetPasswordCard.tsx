import { Field, Form, Formik } from 'formik';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ForgotPasswordLayout from '../../../../layouts/ForgotPasswordLayout';

function ResetPasswordCard() {
  return (
    <ForgotPasswordLayout>
      <>
        <p className="text-[24px] bold-[500] text-center text-primary leading-[36px]">
          Set New Password
        </p>
        <p className="text-[16px] bold-[400] text-center text-accent leading-[24px]">
          Your new password must be different from the old password
        </p>
        <Formik
          initialValues={{ emailOrPhone: '' }}
          // validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
          }}
        >
          <Form>
            <Field name="password">
              {({ field, form: { touched, errors } }: any) => (
                <>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    label="Password"
                    field={field}
                  />
                  <span className="text-error text-xs pt-2">
                    {errors.password && touched.password ? <div>{errors.password}</div> : null}
                  </span>
                </>
              )}
            </Field>
            <Field name="setPassword">
              {({ field, form: { touched, errors } }: any) => (
                <>
                  <Input
                    id="setPassword"
                    type="password"
                    placeholder="******"
                    label="Set Password"
                    field={field}
                  />
                  <span className="text-error text-xs pt-2">
                    {errors.setPassword && touched.setPassword ? (
                      <div>{errors.setPassword}</div>
                    ) : null}
                  </span>
                </>
              )}
            </Field>
            <div className="mt-[23.77px]">
              <Button type="submit" size="lg">
                Set Password
              </Button>
            </div>
          </Form>
        </Formik>
      </>
    </ForgotPasswordLayout>
  );
}

export default ResetPasswordCard;
