import { Field, Form, Formik } from 'formik';
import { VendorServiceClient } from '../../../../api/vendorpb/v1/vendor.client';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import Input from '../../../../components/Input';
import { getTransport } from '../../../../constants';

import { locationDetails } from '../../../../data/locationDetails';

const initialValues = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  id: '12321413',
  hoursOfOperation: ['3', '2'],
  vendorId: '3333'
};

const handleAddress = (values) => {
  console.log('submited', values);
  const vendorService = new VendorServiceClient(getTransport());
  vendorService
    .addLocation({
      location: initialValues
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
