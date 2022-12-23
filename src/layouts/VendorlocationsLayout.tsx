/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '../components/Button';
import { AddLocation } from '../features/vendor/components/AddLocation';
import { ViewLocations } from '../features/vendor/components/ViewLocations';

export function VendorlocationsLayout({ vendorId }: { vendorId: string }) {
  return (
    <div>
      <Button>Add New location</Button>
      <h2>Vendor locations</h2>
      <ViewLocations vendorId={vendorId} />
      <AddLocation vendorId={vendorId} />
    </div>
  );
}
