import { useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { getVendorServiceClient } from '../../../../constants';

export function ViewLocation() {
  useEffect(() => {
    getVendorServiceClient()
      .listLocations({ vendorId: '1242357813578' })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteLcation = () => {
    getVendorServiceClient()
      .deleteLocation({ locationId: '111111111111111', vendorId: '222222222' })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex gap-5 border border-red-400">
      {/* map */}
      <div className="h-[335.29px] w-[458px] bg-gray-300">map</div>
      {/* location info */}
      <div>
        <div className="flex">
          <p className="text-2xl font-semibold">Discounted Hotel Rates</p>
          <Button onClick={handleDeleteLcation}>Delete Location</Button>
        </div>
        <div className="mb-8 mt-6 flex gap-3">
          <span className="rounded-3xl border px-3 py-2 text-sm text-accent">#hashtag</span>
          <span className="rounded-3xl border px-3 py-2 text-sm text-accent">#hashtag</span>
          <span className="rounded-3xl border px-3 py-2 text-sm text-accent">#hashtag</span>
        </div>
        <h2 className="text-xl font-medium">Johern Marekes Hotel</h2>
        {/* rating */}
        <div className="my-4">rating here</div>
        <div>
          <div className="flex">
            <div className="flex flex-col gap-1">
              <span className="max-w-[30ch] text-accent">Location:</span>
              <p className="max-w-[30ch] text-sm">
                Marriott Marquis Houstan walker streetm houston, TX, USA
              </p>
            </div>
            <div className="flex flex-col gap-1">
              {/* <span className="text-accent">Managed By:</span>
              <p className="text-sm">David Warner</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
