/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import Input from '../../../../components/Input';
import { getOptions, getVendorServiceClient } from '../../../../constants';
import { locationDetails } from '../../../../data/locationDetails';
import { FormikField } from '../../../../types';
import { ILocationProps } from '../ViewLocations';

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

interface IAddLocationProps {
  vendorId: string;
  selectedLocation: ILocationProps;
  allLocationsData: ILocationProps[];
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  setAllLocationsData: React.Dispatch<React.SetStateAction<ILocationProps[]>>;
}

export function AddLocation({
  vendorId,
  setAllLocationsData,
  allLocationsData,
  setToggleForm,
  selectedLocation
}: IAddLocationProps) {
  const addLocation = async (values: ILocationProps) => {
    const options = await getOptions();

    getVendorServiceClient()
      .addLocation(
        {
          location: { ...values, id: uuidv4(), vendorId, hoursOfOperation: [''] }
        },
        options
      )
      .then(() => {
        getVendorServiceClient()
          .listLocations({ vendorId }, options)
          .then(({ response }) => {
            setAllLocationsData(response?.locations);
          });
        setToggleForm(false);
      })
      .catch(() => {});
  };
  const editLocation = async (values: ILocationProps) => {
    const options = await getOptions();
    getVendorServiceClient()
      .updateLocation(
        {
          location: { ...values, vendorId }
        },
        options
      )
      .then(() => {
        const updatedLocationsData = allLocationsData?.filter(
          (loc) => loc?.id !== selectedLocation?.id
        );
        setAllLocationsData([...updatedLocationsData, { ...values }]);
        setToggleForm(false);
      })
      .catch(() => {});
  };
  return (
    <Card>
      <h2 className="mb-4 text-center text-2xl">Location Details</h2>
      <Formik
        initialValues={selectedLocation || initialValues}
        onSubmit={(values) => {
          if (Object.keys(selectedLocation)?.length) {
            editLocation(values);
          } else addLocation(values);
        }}
        enableReinitialize
      >
        <Form>
          <div className="grid grid-cols-2 gap-2">
            {locationDetails.map((location) => (
              <Field name={location?.name} key={location?.fid}>
                {({ field }: { field: FormikField }) => (
                  <Input
                    id={location?.id}
                    label={location?.label}
                    name={location?.name}
                    type={location?.type}
                    placeholder={location?.placeholder}
                    field={field}
                  />
                )}
              </Field>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <Button onClick={() => setToggleForm(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </Card>
  );
}
