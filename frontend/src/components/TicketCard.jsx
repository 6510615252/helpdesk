const STATUS_COLORS = {
    pending:  '#f59e0b',
    accepted: '#3b82f6',
    resolved: '#22c55e',
    rejected: '#ef4444',
};

function TicketCard({ ticket, onEdit }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('th-TH', {
            year:   'numeric',
            month:  'short',
            day:    'numeric',
            hour:   '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div
            onClick={() => onEdit(ticket)}
            style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '12px',
                cursor: 'pointer',
                borderLeft: `4px solid ${STATUS_COLORS[ticket.status]}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
        >
            {/* Title */}
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                {ticket.title}
            </h4>

            {/* Description */}
            <p style={{
                margin: '0 0 8px 0',
                fontSize: '12px',
                color: '#6b7280',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical',
            }}>
                {ticket.description}
            </p>

            {/* Contact */}
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#6b7280' }}>
                📧 {ticket.contact}
            </p>

            {/* Footer */}
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                <div>Created: {formatDate(ticket.created_at)}</div>
                <div>Updated: {formatDate(ticket.updated_at)}</div>
            </div>
        </div>
    );
}

export default TicketCard;