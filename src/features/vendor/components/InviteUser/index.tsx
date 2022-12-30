import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../../../components/Button';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import { FormikField } from '../../../../types';
import { getVendorId } from '../../../../utils';
import { VendorService } from '../../../../services/VendorService';

type InviteUserProps = {
  // eslint-disable-next-line no-unused-vars
  setInvitingUser: (invitingUser: boolean) => void;
};
type FormValues = {
  userEmail: string;
  permissions: {
    billing_manager: string;
    admin: string;
    view: string;
    manage_campaigns: string;
    manage_users: string;
    message_users: string;
  };
};
const initialValues = {
  userEmail: '',
  permissions: {
    billing_manager: 'disabled',
    admin: 'disabled',
    view: 'disabled',
    manage_campaigns: 'disabled',
    manage_users: 'disabled',
    message_users: 'disabled'
  }
};

const FormValidations = Yup.object().shape({
  userEmail: Yup.string().required('Email address is empty')
});
const InviteUser = ({ setInvitingUser }: InviteUserProps) => {
  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={FormValidations}
        onSubmit={(values: FormValues) => {
          const permissions = [];
          for (const key in values?.permissions) {
            if (values?.permissions?.[key] === 'Enabled') {
              permissions.push(key);
            }
          }
          const vendorService = new VendorService();

          vendorService
            .inviteUser({
              id: uuidv4(),
              vendorId: getVendorId(),
              email: values?.userEmail,
              phoneNumber: '',
              permissions
            })
            .then(() => setInvitingUser(false));
        }}
      >
        {() => (
          <Form>
            <p className="mb-10 rounded border-l-8 border-accent pl-4 text-lg font-medium text-primary">
              Invite New Employee
            </p>
            <Field name="userEmail">
              {({
                field,
                form: { touched, errors }
              }: {
                field: FormikField;
                form: {
                  touched: FormValues;
                  errors: FormValues;
                };
              }) => (
                <>
                  <Input id="userEmail" label="Email" placeholder="Enter Email" field={field} />
                  <span className="pt-2 text-xs text-error">
                    {errors?.userEmail && touched.userEmail ? <div>{errors.userEmail}</div> : null}
                  </span>
                </>
              )}
            </Field>

            <p className="my-10 rounded border-l-8 border-accent pl-4 text-lg font-medium text-primary">
              Permissions
            </p>
            <div className="grid grid-cols-2 gap-x-4">
              <Field name="permissions.billing_manager">
                {({ field }: { field: FormikField }) => (
                  <div className="mb-4">
                    <Select
                      label="Billing Manager"
                      id="billing_manager"
                      field={field}
                      options={['Disabled', 'Enabled']}
                    />
                  </div>
                )}
              </Field>

              <Field name="permissions.admin">
                {({ field }: { field: FormikField }) => (
                  <div className="mb-4">
                    <Select
                      label="Admin"
                      id="admin"
                      field={field}
                      options={['Disabled', 'Enabled']}
                    />
                  </div>
                )}
              </Field>
              <Field name="permissions.view">
                {({ field }: { field: FormikField }) => (
                  <div className="mb-4">
                    <Select
                      label="View"
                      id="view"
                      field={field}
                      options={['Disabled', 'Enabled']}
                    />
                  </div>
                )}
              </Field>
              <Field name="permissions.manage_campaigns">
                {({ field }: { field: FormikField }) => (
                  <div className="mb-4">
                    <Select
                      label="Manage Campaigns"
                      id="manage_campaigns"
                      field={field}
                      options={['Disabled', 'Enabled']}
                    />
                  </div>
                )}
              </Field>
              <Field name="permissions.manage_users">
                {({ field }: { field: FormikField }) => (
                  <div className="mb-4">
                    <Select
                      label="Manage Users"
                      id="manage_users"
                      field={field}
                      options={['Disabled', 'Enabled']}
                    />
                  </div>
                )}
              </Field>
              <Field name="permissions.message_users">
                {({ field }: { field: FormikField }) => (
                  <div className="mb-4">
                    <Select
                      label="Message Users"
                      id="message_users"
                      field={field}
                      options={['Disabled', 'Enabled']}
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="secondary" onClick={() => setInvitingUser(false)}>
                Close
              </Button>
              <Button classes="ml-4" type="submit">
                Invite
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InviteUser;
