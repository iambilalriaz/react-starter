import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import Input from '../../components/Input';
import { InfluencerService } from '../../services/InfluencerService';
import { FormikField } from '../../types';

type FormValues = {
  name: string;
};
type FieldType = {
  field: FormikField;
  form: {
    touched: FormValues;
    errors: FormValues;
  };
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is empty')
});
const ProfilePage = ({ moveToNextPage }: { moveToNextPage: () => void }) => {
  const naviagte = useNavigate();
  return (
    <Formik
      initialValues={{
        name: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {
        const influencerService = new InfluencerService();
        influencerService
          .registerInfluencer(values?.name)
          .then(() => {
            moveToNextPage();
          })
          .catch(() => {
            toast.error('Failed to become an influencer.');
          });
      }}
    >
      <>
        <p className="border-l-4 border-accent pl-2">Influencer Details</p>
        <Form>
          <Card classes="p-5 mt-5">
            <Field name="name">
              {({ field, form: { touched, errors } }: FieldType) => (
                <>
                  <Input id="influName" label="Name" placeholder="Enter Name" field={field} />
                  <div className="mt-1 text-xs text-error">
                    {errors?.name && touched?.name ? <div>{errors?.name}</div> : null}
                  </div>
                </>
              )}
            </Field>
          </Card>
          <div className="mt-10 flex justify-end">
            <Button variant="secondary" type="button" classes="w-24" onClick={() => naviagte(-1)}>
              Back
            </Button>
            <Button type="submit" classes="w-24 ml-4">
              Submit
            </Button>
          </div>
        </Form>
      </>
    </Formik>
  );
};

export default ProfilePage;
