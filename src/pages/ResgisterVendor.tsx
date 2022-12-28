/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import Select from '../components/Select';
import AuthLayout from '../layouts/AuthLayout';
import { AuthService } from '../services/AuthService';
import { VendorService } from '../services/VendorService';

type FormValues = {
  vendorName: string;
  vendorCategory: string;
  vendorDesc: string;
};
type UserProps = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const initialValues = {
  vendorName: '',
  vendorCategory: '',
  vendorDesc: ''
};
const RegisterSchema = Yup.object().shape({
  vendorName: Yup.string().required('Name is empty'),
  vendorCategory: Yup.string().required('Category is empty'),
  vendorDesc: Yup.string().required('Description is empty')
});

export default function RegisterVendor() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const authService = new AuthService();

  const onRegister = (values: FormValues) => {
    setIsLoading(true);
    const vendorService = new VendorService();
    vendorService
      .registerVendor({
        id: user?.userId,
        name: values?.vendorName,
        description: values?.vendorDesc,
        category: values?.vendorCategory,
        subCategory: '',
        imageUrl: '',
        locations: []
      })
      .then(() => {
        setIsLoading(false);
        navigate('/home');
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    authService.getUser().then(({ response }: { response: UserProps }) => setUser(response));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/auth/token');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout>
      <Card>
        <div className="mb-11 flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-2xl">Register Your Business</h2>
          <p className="text-lg text-accent md:text-base">Get started with Suforia</p>
        </div>
        {/* inputs */}
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onRegister}
        >
          <Form>
            <Field name="vendorName">
              {({ field, form: { touched, errors } }: any) => (
                <div className="mb-4">
                  <Input
                    label="Name"
                    type="text"
                    id="vendorName"
                    placeholder="Datum Brain"
                    field={field}
                  />
                  <span className="pt-2 text-xs text-error">
                    {errors?.vendorName && touched?.vendorName ? (
                      <div>{errors?.vendorName}</div>
                    ) : null}
                  </span>
                </div>
              )}
            </Field>
            <Field name="vendorCategory">
              {({ field, form: { touched, errors } }: any) => (
                <div className="mb-4">
                  <Select
                    label="Category"
                    id="vendorCategory"
                    placeholder="Select Category"
                    field={field}
                    options={['Hotels', 'Restaurants', 'SPA', 'Fitness']}
                  />
                  <span className="pt-2 text-xs text-error">
                    {errors?.vendorCategory && touched?.vendorCategory ? (
                      <div>{errors?.vendorCategory}</div>
                    ) : null}
                  </span>
                </div>
              )}
            </Field>
            <Field name="vendorDesc" as="textarea">
              {({ field, form: { touched, errors } }: any) => (
                <div className="mb-4">
                  <Input
                    label="Description"
                    type="textarea"
                    id="vendorDesc"
                    placeholder="Type your message"
                    field={field}
                    classes="min-h-[10rem] py-[1rem]"
                  />
                  <span className="pt-2 text-xs text-error">
                    {errors?.vendorDesc && touched?.vendorDesc ? (
                      <div>{errors?.vendorDesc}</div>
                    ) : null}
                  </span>
                </div>
              )}
            </Field>
            <Button btnState={isLoading ? 'loading' : 'normal'} type="submit" size="lg">
              Register
            </Button>
          </Form>
        </Formik>
      </Card>
    </AuthLayout>
  );
}
