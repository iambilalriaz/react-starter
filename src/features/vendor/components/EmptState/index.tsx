import empty from '../../../../assets/empty.svg';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src={empty} alt="empty state" width={100} />
      <p className="text-md w-48 text-center font-thin italic text-accent">Nothing to show here</p>
    </div>
  );
}
