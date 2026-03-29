import { useState } from "react";
import API from "../api";

function IssueCard({ issue, onDeleted, onEdit }) {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const statusColors = {
    open: "bg-green-500/20 text-green-400",
    in_progress: "bg-yellow-500/20 text-yellow-400",
    closed: "bg-red-500/20 text-red-400",
  };

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-400",
    medium: "bg-purple-500/20 text-purple-400",
    high: "bg-red-500/20 text-red-400",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await API.delete(`/issues/${issue.id}`);
      onDeleted();
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (

    <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-2xl hover:scale-[1.02] transition duration-200 w-full max-w-sm">

      <h3 className="text-lg font-semibold mb-2">
        {issue.title}
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        {issue.description}
      </p>

      <div className="flex gap-2 mb-4">

        <span className={`px-2 py-1 text-xs rounded ${statusColors[issue.status]}`}>
          {issue.status.replace("_", " ")}
        </span>

        <span className={`px-2 py-1 text-xs rounded ${priorityColors[issue.priority]}`}>
          {issue.priority}
        </span>

      </div>

      <div className="text-xs text-gray-500 mb-4 space-y-1">
        <div>Created: {formatDate(issue.created_at)}</div>
        {issue.updated_at && (
          <div>Updated: {formatDate(issue.updated_at)}</div>
        )}
      </div>

      <div className="flex gap-2">

        <button
          onClick={() => onEdit(issue)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded text-sm font-medium transition"
        >
          Edit
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm font-medium transition"
        >
          Delete
        </button>

      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Delete Task?</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-medium transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded font-medium transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}


export default IssueCard;