import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const MIN_LENGTH = 10;

function validate(value) {
  if (!value.trim()) return "Feedback is required.";
  if (value.trim().length < MIN_LENGTH) {
    return `Feedback must be at least ${MIN_LENGTH} characters.`;
  }
  return "";
}

function FeedbackForm({ projectId }) {
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");

  const error = validate(message);
  const showError = touched && error;

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (error) return;

    setStatus("submitting");
    setSubmitError("");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: Number(projectId), body: message.trim() }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      setMessage("");
      setTouched(false);
    } catch (err) {
      setSubmitError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-md mx-auto text-left">
      <h2 className="font-semibold mb-2">Leave feedback</h2>

      <textarea
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (status === "success") setStatus("idle");
        }}
        onBlur={() => setTouched(true)}
        rows={4}
        placeholder="What did you think?"
        aria-invalid={Boolean(showError)}
        className={`w-full border rounded p-2 ${showError ? "border-red-500" : ""}`}
      />
      {showError && <p className="text-sm text-red-600 mt-1">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-3 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send feedback"}
      </button>

      {status === "success" && (
        <p className="mt-3 text-green-700">Thanks! Your feedback was sent.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-red-600">Couldn't send feedback: {submitError}</p>
      )}
    </form>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-xl font-bold">Project #{id}</h1>
      <Link to="/projects" className="text-indigo-600 hover:underline">
        ← Back to projects
      </Link>
      {/* key resets the form when navigating between projects */}
      <FeedbackForm key={id} projectId={id} />
    </div>
  );
}