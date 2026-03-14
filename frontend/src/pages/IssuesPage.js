import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import IssueForm from "../components/IssueForm";
import IssueCard from "../components/IssueCard";
import FilterBar from "../components/FilterBar";

function IssuesPage() {

  const [issues, setIssues] = useState([]);
  const [editingIssue, setEditingIssue] = useState(null);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchIssues = async () => {

    const query = [];

    if (filters.search) query.push(`search=${filters.search}`);
    if (filters.status) query.push(`status=${filters.status}`);

    const queryString = query.length ? `?${query.join("&")}` : "";

    const res = await API.get(`/issues${queryString}`);

    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  return (

    <div className="min-h-screen bg-gray-900 text-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold tracking-wide">
            Issue Tracker
          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => {
                setEditingIssue(null);
                setShowModal(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg font-medium transition shadow"
            >
              Add Issue
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg font-medium transition shadow"
            >
              Logout
            </button>

          </div>

        </div>

        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 justify-items-center">

          {issues.map(issue => (

            <IssueCard
              key={issue.id}
              issue={issue}
              onDeleted={fetchIssues}
              onEdit={(issue) => {
                setEditingIssue(issue);
                setShowModal(true);
              }}
            />

          ))}

        </div>

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">

          <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-xl relative">

            <button
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <IssueForm
              existingIssue={editingIssue}
              onSuccess={() => {
                fetchIssues();
                setShowModal(false);
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}

export default IssuesPage;
