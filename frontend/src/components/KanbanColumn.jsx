import TicketCard from './TicketCard';

const STATUS_LABELS = {
    pending:  'Pending',
    accepted: 'Accepted',
    resolved: 'Resolved',
    rejected: 'Rejected',
};

const STATUS_COLORS = {
    pending:  '#f59e0b',
    accepted: '#3b82f6',
    resolved: '#22c55e',
    rejected: '#ef4444',
};

function KanbanColumn({ status, tickets, onEditTicket }) {
    return (
        <div style={{
            flex: 1,
            minWidth: '220px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            padding: '12px',
        }}>
            {/* Column Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: STATUS_COLORS[status],
                    }}/>
                    <h3 style={{ margin: 0 }}>{STATUS_LABELS[status]}</h3>
                </div>
                <span style={{
                    backgroundColor: STATUS_COLORS[status],
                    color: 'white',
                    borderRadius: '999px',
                    padding: '2px 8px',
                    fontSize: '12px',
                }}>
                    {tickets.length}
                </span>
            </div>

            {/* Ticket Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tickets.length === 0 ? (
                    <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: '14px' }}>
                        No tickets
                    </p>
                ) : (
                    tickets.map(ticket => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            onEdit={onEditTicket}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default KanbanColumn;