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
  }, [sortBy, refreshKey]); // re-fetch เมื่อ sortBy หรือ refreshKey เปลี่ยน

  const getTicketsByStatus = (status) =>
    tickets.filter((ticket) => ticket.status === status);

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <h1>Helpdesk Support</h1>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="updated_at">Sort by Latest Update</option>
            <option value="created_at">Sort by Created</option>
            <option value="status">Sort by Status</option>
          </select>
          <button onClick={onNewTicket}>+ New Ticket</button>
        </div>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red", padding: "0 16px" }}>{error}</p>}

      {/* Kanban Board */}
      {loading ? (
        <p style={{ padding: "16px" }}>Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
          {STATUSES.map((status) => (
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
