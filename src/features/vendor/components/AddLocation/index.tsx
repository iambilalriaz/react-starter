/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import { Field, Form, Formik } from 'formik';
// import { useState } from 'react';
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

export function AddLocation({
  vendorId,
  setAllLocationsData,
  allLocationsData,
  setToggleForm,
  selectedLocation
}) {
  console.log('selectedlocation', selectedLocation);
  const addLocation = (values: any) => {
    getVendorServiceClient()
      .addLocation(
        {
          location: { ...values, id: uuidv4(), vendorId }
        },
        getOptions()
      )
      .then(() => {
        getVendorServiceClient()
          .listLocations({ vendorId }, getOptions())
          .then(({ response }) => {
            // setAllLocationsData(response?.locations);
            console.log('all locations inside the add', response.locations);
            setAllLocationsData([...response.locations, { ...values, id: uuidv4(), vendorId }]);
          });
        setToggleForm(false);
        console.log('inside add location: ', [
          ...allLocationsData,
          { ...values, id: uuidv4(), vendorId }
        ]);
      })
      .catch(() => {});
  };
  const editlocation = (values) => {
    getVendorServiceClient()
      .updateLocation(
        {
          location: { ...values, vendorId }
        },
        getOptions()
      )
      .then(() => {
        const updatedLocationsData = allLocationsData?.filter(
          (loc) => loc?.id !== selectedLocation?.id
        );
        setAllLocationsData([...updatedLocationsData, { ...values }]);
        setToggleForm(false);
        console.log('inside update location: ', [
          ...allLocationsData,
          { ...values, id: uuidv4(), vendorId }
        ]);
      })
      .catch(() => {});
  };
  return (
    <Card>
      <h2 className="mb-4 text-4xl">location details</h2>
      <Formik
        initialValues={selectedLocation || initialValues}
        onSubmit={(values) => {
          if (selectedLocation) {
            editlocation(values);
          } else addLocation(values);
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
