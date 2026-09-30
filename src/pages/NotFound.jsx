import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-xl font-bold">Page not found</h1>
      <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
    </div>
  );
}