export function Toast({ message }: { message: string }) {
  return (
    <div className="toast toast-end">
      <div className="alert text-white alert-error">
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
