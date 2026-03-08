import API from "../api";

function IssueCard({ issue, onDeleted, onEdit }) {

  const statusColors = {
    open: "bg-green-500/20 text-green-400",
    "in progress": "bg-yellow-500/20 text-yellow-400",
    closed: "bg-red-500/20 text-red-400",
  };

  const priorityColors = {
    low: "bg-blue-500/20 text-blue-400",
    medium: "bg-purple-500/20 text-purple-400",
    high: "bg-red-500/20 text-red-400",
  };

  const handleDelete = async () => {

    await API.delete(`/issues/${issue.id}`);

    onDeleted();
  };

  return (

    <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-2xl hover:scale-[1.02] transition duration-200">

      <h3 className="text-lg font-semibold mb-2">
        {issue.title}
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        {issue.description}
      </p>

      <div className="flex gap-2 mb-4">

        <span className={`px-2 py-1 text-xs rounded ${statusColors[issue.status]}`}>
          {issue.status}
        </span>

        <span className={`px-2 py-1 text-xs rounded ${priorityColors[issue.priority]}`}>
          {issue.priority}
        </span>

      </div>

      <div className="flex gap-2">

        <button
          onClick={() => onEdit(issue)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default IssueCard;