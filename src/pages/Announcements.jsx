import { Link } from "react-router-dom";
import { useAnnouncements } from "../hooks/useAnnouncements";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorState from "../components/common/ErrorState";

export default function Announcements() {
  const { announcements, loading, error, retry } = useAnnouncements();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Announcements</h1>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && !loading && <ErrorState message={error} onRetry={retry} />}

      {!loading && !error && (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {announcements.map((a) => (
            <li key={a.id}>
              <Link
                to={`/announcements/${a.id}`}
                className="block h-full border rounded p-4 text-left hover:bg-gray-50"
              >
                <h2 className="font-semibold text-indigo-600 mb-1 capitalize">{a.title}</h2>
                <p className="text-sm line-clamp-3">{a.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}