import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { fields } from '../../../data/fields';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Facebook from '../../../components/SVGS/Facebook';
import Linkedin from '../../../components/SVGS/Linkedin';

const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: ''
};
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is empty!'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name is empty!'),
  phoneNumber: Yup.string().required('Phone number is empty!'),
  email: Yup.string().email('Invalid email address').required('Email is empty!'),
  password: Yup.string().min(6, 'Password is too short').required('Password is empty!')
});

export default function SignupForm() {
  return (
    <div>
      <div className="flex flex-col mb-11 items-center justify-center">
        <h2 className="md:text-2xl text-lg">Create Account</h2>
        <p className="text-accent md:text-base text-lg">Get started with Suforia</p>
      </div>
      {/* inputs */}
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
        }}
      >
        <Form>
          <div className="grid md:grid-cols-2 gap-x-4">
            {fields.map((item) => (
              <div key={item?.id}>
                <Field name={item?.name}>
                  {({ field, form: { touched, errors } }: any) => (
                    <>
                      <Input
                        label={item.label}
                        type={item.type}
                        id={item.id}
                        placeholder={item.placeholder}
                        field={field}
                      />
                      <span className="text-error text-xs pt-2">
                        {errors[item?.name] && touched[item?.name] ? (
                          <div>{errors[item?.name]}</div>
                        ) : null}
                      </span>
                    </>
                  )}
                </Field>
              </div>
            ))}
          </div>
          <div className="form-control mt-8 mb-7">
            <label htmlFor="agree" className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox" id="agree" />
              <span className="text-base text-accent">
                By signing up you are agree to suforia terms of services
              </span>
            </label>
          </div>
          <Button type="submit" size="lg">
            Sign Up
          </Button>
        </Form>
      </Formik>

      {/* footer */}
      <div className="mt-8 mb-[42px]">
        <p className="text-accent font-medium  text-center text-sm">
          Already have an account!{' '}
          <a href="/" className="text-primary">
            Log In
          </a>
        </p>
      </div>
      {/* social */}
      <p className="text-center mb-5">Or continue with</p>
      <div className="flex justify-center gap-6">
        <a href="/">
          <div className="rounded-full w-[50px] border-[#c6c9cf] grid place-content-center h-[50px] border">
            <Facebook />
          </div>
        </a>
        <a href="/">
          <div className="rounded-full w-[50px] border-[#c6c9cf] grid place-content-center h-[50px] border">
            <Linkedin />
          </div>
        </a>
      </div>
    </div>
  );
}
