import { useParams, Link } from "react-router-dom";
import { useAnnouncement } from "../hooks/useAnnouncements";
import useAnnouncementForm from "../hooks/useAnnouncementForm";
import ErrorState from "../components/common/ErrorState";

function Field({ label, error, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-sm font-medium mb-1">{label}</span>
      {children}
      {error && <span className="block text-sm text-red-600 mt-1">{error}</span>}
    </label>
  );
}

function CommentForm({ announcementId }) {
  const { values, errors, status, submitError, handleChange, handleBlur, handleSubmit } =
    useAnnouncementForm(announcementId);

  const inputClass = (field) =>
    `w-full border rounded p-2 ${errors[field] ? "border-red-500" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-md mx-auto text-left">
      <h2 className="font-semibold mb-3">Post a comment</h2>

      <Field label="Email" error={errors.email}>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.email)}
          className={inputClass("email")}
        />
      </Field>

      <Field label="Comment" error={errors.body}>
        <textarea
          name="body"
          rows={4}
          value={values.body}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.body)}
          className={inputClass("body")}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Posting…" : "Post comment"}
      </button>

      {status === "success" && <p className="mt-3 text-green-700">Comment posted. Thanks!</p>}
      {status === "error" && (
        <p className="mt-3 text-red-600">Couldn't post comment: {submitError}</p>
      )}
    </form>
  );
}

export default function AnnouncementDetail() {
  const { id } = useParams();
  const { announcement, loading, error, retry } = useAnnouncement(id);

  return (
    <div>
      <Link to="/announcements" className="text-indigo-600 hover:underline">
        ← Back to announcements
      </Link>

      {loading && (
        <div className="mt-4 animate-pulse max-w-xl mx-auto">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      )}

      {error && !loading && (
        <div className="mt-4">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}

      {!loading && !error && announcement && (
        <>
          <article className="mt-4 max-w-xl mx-auto text-left">
            <h1 className="text-xl font-bold mb-2 capitalize">{announcement.title}</h1>
            <p>{announcement.body}</p>
          </article>
          {/* key resets the form when navigating between announcements */}
          <CommentForm key={id} announcementId={id} />
        </>
      )}
    </div>
  );
}