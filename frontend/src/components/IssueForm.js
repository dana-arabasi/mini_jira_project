import { useState, useEffect } from "react";
import API from "../api";

function IssueForm({ existingIssue, onSuccess }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("low");

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

    const data = {
      title,
      description,
      status,
      priority
    };

    if (existingIssue) {

      await API.put(`/issues/${existingIssue.id}`, data);

    } else {

      await API.post("/issues", data);

    }

    onSuccess();
  };

  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <h2 className="text-xl font-semibold mb-2">
        {existingIssue ? "Update Issue" : "Add Issue"}
      </h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Issue title"
        className="bg-gray-700 p-2 rounded"
        required
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="bg-gray-700 p-2 rounded"
      />

      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="bg-gray-700 p-2 rounded"
      >
        <option value="open">Open</option>
        <option value="in progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        className="bg-gray-700 p-2 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded mt-2"
      >
        {existingIssue ? "Update Issue" : "Add Issue"}
      </button>

    </form>

  );
}

export default IssueForm;