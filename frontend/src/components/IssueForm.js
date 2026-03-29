import { useState, useEffect } from "react";
import API from "../api";


function IssueForm(props) {
  const { existingIssue, onSuccess } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (existingIssue) {

      setTitle(existingIssue.title);
      setDescription(existingIssue.description);
      setStatus(existingIssue.status);
      setPriority(existingIssue.priority);

    }

  }, [existingIssue]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      title,
      description,
      status,
      priority
    };

    try {
      if (existingIssue) {

        await API.put(`/issues/${existingIssue.id}`, data);

      } else {

        await API.post("/issues", data);

      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save issue");
    } finally {
      setLoading(false);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <h2 className="text-xl font-semibold mb-2">
        {existingIssue ? "Update Issue" : "Add Issue"}
      </h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Issue title"
        className="bg-gray-700 p-2 rounded focus:outline-none focus:border-indigo-500"
        required
        disabled={loading}
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="bg-gray-700 p-2 rounded focus:outline-none focus:border-indigo-500"
        disabled={loading}
      />

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="bg-gray-700 p-2 rounded focus:outline-none focus:border-indigo-500"
        disabled={loading}
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        className="bg-gray-700 p-2 rounded focus:outline-none focus:border-indigo-500"
        disabled={loading}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed py-2 rounded mt-2 font-medium transition"
      >
        {loading ? "Saving..." : (existingIssue ? "Update Issue" : "Add Issue")}
      </button>

    </form>

  );
}

export default IssueForm;