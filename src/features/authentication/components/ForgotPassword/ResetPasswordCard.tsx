import { Field, Form, Formik } from 'formik';
import Button from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import Input from '../../../../components/Input';
import ForgotPasswordLayout from '../../../../layouts/ForgotPasswordLayout';
import CardSubtitle from '../CardSubtitle';
import CardTitle from '../CardTitle';

function ResetPasswordCard() {
  return (
    <ForgotPasswordLayout>
      <Card>
        <CardTitle>Set New Password</CardTitle>
        <CardSubtitle>Your new password must be different from the old password</CardSubtitle>
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
      </Card>
    </ForgotPasswordLayout>
  );
}

export default ResetPasswordCard;
