import { useState } from 'react';

import locationIcon from '../../../../assets/location.svg';

export function LocationCard() {
  const [autoBooking, setAutoBooking] = useState(false);
  const handleBooking = () => {
    setAutoBooking((prev) => !prev);
  };
  return (
    <div className="rounded-md shadow-5xl mb-12 overflow-hidden">
      {/* card header (map) */}
      <div className="w-[557px] h-[147px] bg-gray-200 ">map</div>
      {/* card body */}
      <div className="flex px-5 pt-[18px] pb-5 flex-col">
        <div className="flex text-sm gap-[5px]">
          <span className="text-secondary">Managed By: </span>
          <span className="font-medium">Hotel Test</span>
        </div>
        <h3 className="font-medium text-xl mt-3">Marriot Houston</h3>
        <div className="flex text-sm justify-between mt-[18px] mb-[9px]">
          <div className="flex flex-col gap-2">
            <span className="text-secondary">Availability:</span>
            <span>9 am to 9 pm</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-secondary">Rooms:</span>
            <span>34 Rooms</span>
          </div>
          <label className="cursor-pointer flex flex-col gap-2" htmlFor="booking">
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
