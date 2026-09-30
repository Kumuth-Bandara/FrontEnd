import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";

function SkeletonCard() {
  return (
    <div className="border rounded p-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export default function Projects() {
  const { projects, loading, error, retry } = useProjects();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Projects</h1>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="border border-red-200 bg-red-50 text-red-700 rounded p-4">
          <p className="mb-2">Couldn't load projects: {error}</p>
          <button
            onClick={retry}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                to={`/projects/${p.id}`}
                className="block h-full border rounded p-4 text-left text-indigo-600 hover:bg-gray-50"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}