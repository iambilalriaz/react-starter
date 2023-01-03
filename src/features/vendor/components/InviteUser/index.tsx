import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
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
  userPhoneNumber: string;
  permissions: {
    billing_manager: string;
    admin: string;
    manage_campaigns: string;
    manage_users: string;
    message_users: string;
  };
};
const initialValues = {
  userEmail: '',
  userPhoneNumber: '',
  permissions: {
    billing_manager: 'disabled',
    admin: 'disabled',
    manage_campaigns: 'disabled',
    manage_users: 'disabled',
    message_users: 'disabled'
  }
};

const FormValidations = Yup.object().shape({
  userEmail: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: 'Email is invalid' }
    )
    .required('Email address is empty'),
  userPhoneNumber: Yup.string()
    .matches(/^\+[1-9]\d{1,14}$/, {
      message: 'Please enter a valid phone number'
    })
    .required('Phone number is empty!')
});
const InviteUser = ({ setInvitingUser }: InviteUserProps) => {
  const onUserInvite = (values: FormValues) => {
    const permissions = ['view'];
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
        phoneNumber: values?.userPhoneNumber,
        permissions
      })
      .then(() => {
        toast.success('Invition sent.');
        setInvitingUser(false);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={FormValidations}
        onSubmit={onUserInvite}
      >
        {() => (
          <Form>
            <p className="mb-10 rounded border-l-8 border-accent pl-4 text-lg font-medium text-primary">
              Invite New Employee
            </p>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
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
                      <div className="mt-1 text-xs text-error">
                        {errors?.userEmail && touched.userEmail ? (
                          <div>{errors?.userEmail}</div>
                        ) : null}
                      </div>
                    </>
                  )}
                </Field>
              </div>
              <div>
                <Field name="userPhoneNumber">
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
                      <Input
                        id="userPhoneNumber"
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        field={field}
                      />
                      <div className="mt-1 text-xs text-error">
                        {errors?.userPhoneNumber && touched.userPhoneNumber ? (
                          <div>{errors?.userPhoneNumber}</div>
                        ) : null}
                      </div>
                    </>
                  )}
                </Field>
              </div>
            </div>
            <p className="my-10 rounded border-l-8 border-accent pl-4 text-lg font-medium text-primary">
              Permissions
            </p>
            <div className="grid grid-cols-2 gap-x-4">
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
              <Field name="permissions.billing_manager">
                {({ field }: { field: FormikField }) => (
                  <div className="mb-4">
                    <Select
                      label="Manage Billing"
                      id="billing_manager"
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
