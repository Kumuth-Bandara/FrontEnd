import { Link } from "react-router-dom";
import interns from "../data/interns";

export default function InternsList() {
  return (
    <ul className="space-y-2">
      {interns.map((i) => (
        <li key={i.id}>
          <Link to={`/interns/${i.id}`} className="text-indigo-600 hover:underline">
            {i.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}