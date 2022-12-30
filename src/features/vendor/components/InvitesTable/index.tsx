import { useCallback, useEffect, useState } from 'react';
import { Invite } from '../../../../api/vendorpb/v1/vendor';
import { Button } from '../../../../components/Button';
import Table from '../../../../components/Table';
import { VendorService } from '../../../../services/VendorService';
import { getVendorId } from '../../../../utils';
import { EmptyState } from '../EmptState';
import { columns } from './columns';

type InviteTableProps = {
  // eslint-disable-next-line no-unused-vars
  setInvitingUser: (invitingUser: boolean) => void;
};

const InvitesTable = ({ setInvitingUser }: InviteTableProps) => {
  const [pendingInvites, setPendingInvites] = useState<Invite[]>([]);
  const getAllPendingInvites = useCallback(() => {
    const vendorService = new VendorService();
    vendorService
      .listPendingInvites(getVendorId())
      .then(({ response }) => setPendingInvites(response?.invites));
  }, []);
  useEffect(() => {
    getAllPendingInvites();
  }, [getAllPendingInvites]);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-primary">Pending Invites</p>
        <Button onClick={() => setInvitingUser(true)}>Invite</Button>
      </div>
      {pendingInvites?.length ? (
        <Table hasCheckbox columns={columns} response={pendingInvites} />
      ) : (
        <div className="pb-16">
          <EmptyState />
        </div>
      )}
    </>
  );
};

export default InvitesTable;
