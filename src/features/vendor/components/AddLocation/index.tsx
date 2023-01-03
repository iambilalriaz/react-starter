/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../../../components/Button';
import Input from '../../../../components/Input';
import { locationDetails } from '../../../../data/locationDetails';
import { VendorService } from '../../../../services/VendorService';
import { FormikField } from '../../../../types';
import { getVendorId } from '../../../../utils';
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
  selectedLocation: ILocationProps;
  setAllLocationsData: React.Dispatch<React.SetStateAction<ILocationProps[]>>;
  setIsAddingLocation: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddLocation({
  setAllLocationsData,
  selectedLocation,
  setIsAddingLocation
}: IAddLocationProps) {
  const addLocation = (values: ILocationProps) => {
    const vendorService = new VendorService();
    vendorService
      .addLocation({
        location: { ...values, id: uuidv4(), vendorId: getVendorId(), hoursOfOperation: [''] }
      })
      .then(() => {
        vendorService.listLocations(getVendorId()).then(({ response }) => {
          setAllLocationsData(response?.locations);
        });
        setIsAddingLocation(false);
      })
      .catch(() => {});
  };
  const editLocation = (values: ILocationProps) => {
    const vendorService = new VendorService();

    vendorService
      .updateLocation({
        location: { ...values, vendorId: getVendorId() }
      })
      .then(() => {
        vendorService.listLocations(getVendorId()).then(({ response }) => {
          setAllLocationsData(response?.locations);
        });
        setIsAddingLocation(false);
      });
  };
  const isSelectedLocationEmpty = () => {
    let flag = true;
    Object.values(selectedLocation)?.forEach((value) => {
      if (!!value && typeof value !== 'object') {
        flag = false;
      }
    });
    return flag;
  };
  return (
    <div className="p-6">
      <Formik
        initialValues={selectedLocation || initialValues}
        onSubmit={(values) => {
          if (isSelectedLocationEmpty()) {
            addLocation(values);
          } else editLocation(values);
        }}
        enableReinitialize
      >
        {() => (
          <Form>
            <p className="mb-10 rounded border-l-8 border-accent pl-4 text-lg font-medium text-primary">
              Location Details
            </p>
            {/* <div className="grid w-full grid-cols-2 gap-x-4"> */}
            <div className="grid grid-cols-2 gap-2">
              {locationDetails?.map((location) => (
                <div key={location?.fid}>
                  <Field name={location?.name}>
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
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="secondary" onClick={() => setIsAddingLocation(false)}>
                Cancel
              </Button>
              <Button classes="ml-4" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
