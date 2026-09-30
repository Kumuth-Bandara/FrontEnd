export default function ErrorState({ message, onRetry }) {
  return (
    <div className="border border-red-200 bg-red-50 text-red-700 rounded p-4">
      <p className="mb-2">Something went wrong: {message}</p>
      <button
        onClick={onRetry}
        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
}