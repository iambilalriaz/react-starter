/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import Input from '../../../../components/Input';
import { locationDetails } from '../../../../data/locationDetails';
import { VendorService } from '../../../../services/VendorService';
import { FormikField } from '../../../../types';
import { getVendorId } from '../../../../utils';
import { ILocationProps } from '../ViewLocations';

import { getAllLocationsData } from '../../vendorSlices/locationSlice';
import { RootState } from '../../../../app/store';

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
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddLocation({ setToggleForm }: IAddLocationProps) {
  const dispatch = useDispatch();

  const selectedLocation = useSelector((state: RootState) => state.selectedLocation);
  const allLocationsData = useSelector((state: RootState) => state.allLocationsData);

  const addLocation = (values: ILocationProps) => {
    const vendorService = new VendorService();
    vendorService
      .addLocation({
        location: { ...values, id: uuidv4(), vendorId: getVendorId(), hoursOfOperation: [''] }
      })
      .then(() => {
        vendorService.listLocations(getVendorId()).then(({ response }) => {
          dispatch(getAllLocationsData(response?.locations));
        });
        setToggleForm(false);
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
        const updatedLocationsData = allLocationsData?.filter(
          (loc) => loc?.id !== selectedLocation?.id
        );
        dispatch(getAllLocationsData([...updatedLocationsData, { ...values }]));
        setToggleForm(false);
      })
      .catch(() => {});
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
    <Card>
      <h2 className="mb-4 text-center text-2xl">Location Details</h2>
      <Formik
        initialValues={selectedLocation || initialValues}
        onSubmit={(values) => {
          if (isSelectedLocationEmpty()) {
            addLocation(values);
          } else editLocation(values);
        }}
        enableReinitialize
      >
        <Form>
          <div className="grid grid-cols-2 gap-2">
            {locationDetails?.map((location) => (
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
