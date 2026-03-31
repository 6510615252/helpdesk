import { useState, useEffect } from "react";
import { getAllTickets } from "../services/ticketService";
import KanbanColumn from "../components/KanbanColumn";

const STATUSES = ["pending", "accepted", "resolved", "rejected"];

function HomePage({ onEditTicket, onNewTicket, refreshKey }) {
  const [tickets, setTickets] = useState([]);
  const [sortBy, setSortBy] = useState("updated_at");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllTickets({ sortBy });
        setTickets(data);
      } catch (err) {
        setError("Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [sortBy, refreshKey]);
  const [visibleStatuses, setVisibleStatuses] = useState([
    "pending",
    "accepted",
    "resolved",
    "rejected",
  ]);

  const getTicketsByStatus = (status) =>
    tickets.filter((ticket) => ticket.status === status);

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "20px", color: "black" }}>Helpdesk Support</h1>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              cursor: "pointer",
            }}
          >
            <option value="updated_at">Latest Update</option>
            <option value="created_at">Created</option>
          </select>

          {/* Filter */}
          <div style={{ display: "flex", gap: "6px" }}>
            {STATUSES.map((status) => {
              const active = visibleStatuses.includes(status);

              return (
                <button
                  key={status}
                  onClick={() => {
                    setVisibleStatuses((prev) =>
                      prev.includes(status)
                        ? prev.filter((s) => s !== status)
                        : [...prev, status],
                    );
                  }}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: active ? "none" : "1px solid #d1d5db",
                    backgroundColor: active ? "#3b82f6" : "#f9fafb",
                    color: active ? "white" : "#374151",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {/* Button */}
          <button
            onClick={onNewTicket}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#22c55e",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            + New Ticket
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red", padding: "0 16px" }}>{error}</p>}

      {/* Kanban Board */}
      {loading ? (
        <p style={{ padding: "16px" }}>Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
          {STATUSES.filter((s) => visibleStatuses.includes(s)).map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tickets={getTicketsByStatus(status)}
              onEditTicket={onEditTicket}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
