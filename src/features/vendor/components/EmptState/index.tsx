import empty from '../../../../assets/empty.svg';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-center text-xl">Nothing to show here</h2>
      <img src={empty} alt="empty state" width={150} />
    </div>
  );
}
