/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import Input from '../../../../components/Input';
import { getOptions, getVendorServiceClient } from '../../../../constants';

import { locationDetails } from '../../../../data/locationDetails';

const initialValues = {
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  hoursOfOperation: ['9', '5'],
  vendorId: ''
};
// const savedValues = {
//   address1: 'acx',
//   address2: 'xxx',
//   city: 'aa',
//   state: 'ww',
//   zip: '32523',
//   country: 'xyt',
//   hoursOfOperation: ['9', '5'],
//   vendorId: '2wrhruedsrtg'
// };

export function AddLocation({
  vendorId,
  setAllLocationsData,
  allLocationsData,
  setToggleForm,
  selectedLocation,
  addButtonClicked,
  setAddButtonClicked
}) {
  const addLocation = (values: any) => {
    getVendorServiceClient()
      .addLocation(
        {
          location: { ...values, id: uuidv4(), vendorId }
        },
        getOptions()
      )
      .then(() => {
        setAllLocationsData([...allLocationsData, { ...values, id: uuidv4(), vendorId }]);
        setToggleForm(false);
        console.log({ ...values, id: uuidv4(), vendorId });
        setAddButtonClicked(false);
      })
      .catch((err) => {
        console.log(vendorId);
        console.log(err);
      });
  };

  return (
    <Card>
      <h2 className="mb-4 text-4xl">location details</h2>
      <Formik
        initialValues={!addButtonClicked ? selectedLocation : initialValues}
        // initialValues={initialValues}
        onSubmit={(values, actions) => {
          addLocation(values, vendorId, actions);
        }}
        enableReinitialize
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
