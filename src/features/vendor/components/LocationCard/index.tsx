import { useState } from 'react';

import locationIcon from '../../../../assets/location.svg';
import { Button } from '../../../../components/Button';

export function LocationCard() {
  const [autoBooking, setAutoBooking] = useState(false);
  const handleBooking = () => {
    setAutoBooking((prev) => !prev);
  };

  const mangeLocation = () => {
    console.log('clicked');
  };

  return (
    <div className="mb-12 max-w-[458px] overflow-hidden rounded-md shadow-5xl">
      {/* card header (map) */}
      <div className="h-[147px] w-[557px] bg-gray-200 ">map</div>
      {/* card body */}
      <div className="flex flex-col px-5 pt-[18px] pb-5">
        <div className="flex justify-between">
          <div className="flex gap-[5px] text-sm">
            <span className="text-secondary">Managed By: </span>
            <span className="font-medium">Hotel Test</span>
          </div>
          <div className="-mt-9">
            <Button onClick={mangeLocation}>Manage</Button>
          </div>
        </div>
        <h3 className="mt-3 text-xl font-medium">Marriot Houston</h3>
        <div className="mt-[18px] mb-[9px] flex justify-between text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-secondary">Availability:</span>
            <span>9 am to 9 pm</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-secondary">Rooms:</span>
            <span>34 Rooms</span>
          </div>
          <label className="flex cursor-pointer flex-col gap-2" htmlFor="booking">
            <span className="text-secondary">Auto Booking: </span>
            <input
              type="checkbox"
              className="toggle"
              id="booking"
              checked={autoBooking}
              onChange={handleBooking}
            />
          </label>
        </div>
        <div className="flex gap-3">
          <div>
            <img src={locationIcon} alt="location" />
          </div>
          <p>Marriot Marquis Houston Walker Street, Houston, TX, USA</p>
        </div>
      </div>
    </div>
  );
}
