export default function Contact() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Contact</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input placeholder="Name" className="border rounded p-2" />
        <input placeholder="Email" className="border rounded p-2" />
        <textarea
          placeholder="Message"
          className="border rounded p-2 sm:col-span-2"
          rows={4}
        />
      </div>
    </div>
  );
}