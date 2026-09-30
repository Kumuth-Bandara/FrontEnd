const BASE_URL = "https://jsonplaceholder.typicode.com";

// fetch() doesn't reject on 404/500, so check res.ok ourselves
async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export function getAnnouncements(signal) {
  return request("/posts?_limit=12", { signal });
}

export function getAnnouncement(id, signal) {
  return request(`/posts/${id}`, { signal });
}

export function postComment(announcementId, { email, body }) {
  return request("/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId: Number(announcementId), email, body }),
  });
}