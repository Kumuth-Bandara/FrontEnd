import { useParams, Link } from "react-router-dom";
import interns from "../data/interns";
import { formatDate } from "../utils/formatDate";

const trackColors = {
  Frontend: "bg-indigo-100 text-indigo-800",
  Backend: "bg-green-100 text-green-800",
  "Full-stack": "bg-purple-100 text-purple-800",
};

export default function InternDetail() {
  const { id } = useParams();
  const intern = interns.find((i) => i.id === id);

  if (!intern) return <p>Intern not found. <Link to="/interns">Back</Link></p>;

  const badgeClass = trackColors[intern.track] || "bg-gray-100 text-gray-800";

  return (
    <div>
      <h1 className="text-xl font-bold">{intern.name}</h1>
      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${badgeClass}`}>
        {intern.track}
      </span>
      <p className="mt-4">{intern.bio}</p>
      <p className="mt-2 text-sm text-gray-500">Joined {formatDate(intern.joined)}</p>
    </div>
  );
}