import { useState } from "react";
import HomePage from './pages/HomePage';
import TicketModal from "./components/TicketModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenCreate = () => {
    setSelectedTicket(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <HomePage
        onEditTicket={handleOpenEdit}
        onNewTicket={handleOpenCreate}
        refreshKey={refreshKey}
      />
      {isModalOpen && (
        <TicketModal
          ticket={selectedTicket}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

export default App;
