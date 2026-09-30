import { useState } from "react";
import { postComment } from "../services/announcementService";

const validators = {
  email: (v) => {
    if (!v.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(v.trim())) return "Enter a valid email address.";
    return "";
  },
  body: (v) => {
    if (!v.trim()) return "Comment is required.";
    if (v.trim().length < 10) return "Comment must be at least 10 characters.";
    return "";
  },
};

const initialValues = { email: "", body: "" };

export default function useAnnouncementForm(announcementId) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");

  const allErrors = {};
  for (const field of Object.keys(validators)) {
    allErrors[field] = validators[field](values[field]);
  }
  const hasErrors = Object.values(allErrors).some(Boolean);

  // Only expose errors for fields the user has touched
  const errors = {};
  for (const field of Object.keys(validators)) {
    errors[field] = touched[field] ? allErrors[field] : "";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status === "success") setStatus("idle");
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, body: true });
    if (hasErrors) return;

    setStatus("submitting");
    setSubmitError("");
    try {
      await postComment(announcementId, {
        email: values.email.trim(),
        body: values.body.trim(),
      });
      setStatus("success");
      setValues(initialValues);
      setTouched({});
    } catch (err) {
      setSubmitError(err.message);
      setStatus("error");
    }
  }

  return { values, errors, status, submitError, handleChange, handleBlur, handleSubmit };
}