import { Invite } from '../../api/vendorpb/v1/vendor';

type CoulmnType = {
  id: string;
  label: string;
  accessor: string;
};

type TableProps = {
  hasCheckbox: boolean;
  columns: CoulmnType[];
  response: Invite[] | [];
};

const Table = ({ hasCheckbox, columns, response }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {hasCheckbox ? (
              <>
                <th className="rounded-none">
                  <input type="checkbox" className="checkbox" />
                </th>
                {columns?.map((column) => (
                  <th className="rounded-none" key={column?.id}>
                    {column?.label}
                  </th>
                ))}
              </>
            ) : (
              columns?.map((column) => (
                <th className="rounded-none" key={column?.id}>
                  {column?.label}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {hasCheckbox
            ? response?.map((item) => (
                <tr key={item?.id}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  {columns?.map((column) => (
                    <td key={`${item?.id}-${column?.id}`}>
                      {item?.[`${column?.accessor}`] || '-'}
                    </td>
                  ))}
                </tr>
              ))
            : response?.map((item) => (
                <tr key={item?.id}>
                  {columns?.map((column) => (
                    <td key={`${item?.id}-${column?.id}`}>{item?.[`${column?.accessor}`] || ''}</td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
