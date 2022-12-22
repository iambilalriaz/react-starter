import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import Input from '../../../../components/Input';
import { getVendorServiceClient } from '../../../../constants';

import { locationDetails } from '../../../../data/locationDetails';

const initialValues = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  hoursOfOperation: ['3', '2'],
  vendorId: '3333'
};

const handleAddress = (values) => {
  console.log('submited', { ...values, id: uuidv4() });
  getVendorServiceClient()
    .addLocation({
      location: { ...values, id: uuidv4() }
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export function AddLocation() {
  return (
    <Card>
      <h2 className="mb-4 text-4xl">location details</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleAddress(values);
        }}
      >
        <Form>
          <div className="flex flex-col gap-2">
            {locationDetails.map((location) => (
              <Field name={location.name} key={location.fid}>
                {({ field }) => (
                  <Input
                    id={location.id}
                    label={location.label}
                    name={location.name}
                    type={location.type}
                    placeholder={location.placeholder}
                    field={field}
                  />
                )}
              </Field>
            ))}
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </Card>
  );
}
