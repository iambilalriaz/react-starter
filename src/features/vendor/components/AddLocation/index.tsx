/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import Input from '../../../../components/Input';
import { locationDetails } from '../../../../data/locationDetails';
import { VendorService } from '../../../../services/VendorService';
import { FormikField } from '../../../../types';
import { getVendorId } from '../../../../utils';

import { getAllLocationsData } from '../../vendorSlices/locationSlice';
import { ILocationInterface } from '../../../../lib/types';
import { getSelectedLocationSelector } from '../../../../lib/stateSelectors';
import { toggleForm } from '../../vendorSlices/formHandleSlice';

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

export function AddLocation() {
  const dispatch = useDispatch();

  const selectedLocation = useSelector(getSelectedLocationSelector);

  const addLocation = (values: ILocationInterface) => {
    const vendorService = new VendorService();
    vendorService
      .addLocation({
        location: { ...values, id: uuidv4(), vendorId: getVendorId(), hoursOfOperation: [''] }
      })
      .then(() => {
        vendorService.listLocations(getVendorId()).then(({ response }) => {
          dispatch(getAllLocationsData(response?.locations));
        });
        dispatch(toggleForm(false));
      })
      .catch(() => {});
  };

  const editLocation = (values: ILocationInterface) => {
    const vendorService = new VendorService();

    vendorService
      .updateLocation({
        location: { ...values, vendorId: getVendorId() }
      })
      .then(() => {
        vendorService.listLocations(getVendorId()).then(({ response }) => {
          dispatch(getAllLocationsData(response?.locations));
          dispatch(toggleForm(false));
        });
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
            <Button onClick={() => dispatch(toggleForm(false))}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
