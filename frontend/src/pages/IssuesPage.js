import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import IssueForm from "../components/IssueForm";
import IssueCard from "../components/IssueCard";
import FilterBar from "../components/FilterBar";

function IssuesPage() {

  const [issues, setIssues] = useState([]);
  const [editingIssue, setEditingIssue] = useState(null);
  const [filters, setFilters] = useState({ 
    search: "", 
    status: "", 
    priority: "",
    sort_by: "created_at",
    order: "desc"
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      params.append("sort_by", filters.sort_by);
      params.append("order", filters.order);
      params.append("limit", 20);
      params.append("offset", 0);

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const res = await API.get(`/issues${queryString}`);
      setIssues(res.data.data.items);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };


    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

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

            {currentUser?.role === "admin" && (
              <button
                onClick={() => navigate("/admin/users")}
                className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-lg font-medium transition shadow"
              >
                Admin Panel
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg font-medium transition shadow"
            >
              Logout
            </button>

          </div>

        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <FilterBar filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <p className="text-gray-400 text-lg mb-4">No tasks yet.</p>
            <button
              onClick={() => {
                setEditingIssue(null);
                setShowModal(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition"
            >
              Create one!
            </button>
          </div>
        ) : (
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
        )}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center" onClick={() => setShowModal(false)}>

          <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-xl relative" onClick={e => e.stopPropagation()}>

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
