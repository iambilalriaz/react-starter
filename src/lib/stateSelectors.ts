import { RootState } from '../app/store';

export const getSelectedLocationSelector = (state: RootState) => state?.selectedLocation;
export const getIsFormOpenSelector = (state: RootState) => state?.toggleForm;
export const getAllLocationsDataSelector = (state: RootState) => state.allLocationsData;
