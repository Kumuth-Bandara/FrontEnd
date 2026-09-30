import { Link } from "react-router-dom";
import interns from "../data/interns";

export default function InternsByTrack() {
  const tracks = [...new Set(interns.map((i) => i.track))];

  return (
    <div className="space-y-4">
      {tracks.map((track) => (
        <div key={track}>
          <h2 className="font-semibold">{track}</h2>
          <ul className="ml-4 list-disc">
            {interns.filter((i) => i.track === track).map((i) => (
              <li key={i.id}>
                <Link to={`/interns/${i.id}`} className="text-indigo-600 hover:underline">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}