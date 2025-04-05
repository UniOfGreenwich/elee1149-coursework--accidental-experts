import React from 'react';
import "./Styles/ResponseModal.scss";

interface ResponseModalProps {
    status: 'success' | 'error';
    message: string;
    onClose: () => void;
}

const ResponseModal: React.FC<ResponseModalProps> = ({ status, message, onClose }) => {
    const modalClass = status === 'success' ? "success" : "error";

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className={`modalContent ${modalClass}`} onClick={(e) => e.stopPropagation()}>
                <p className="message">{message}</p>
                <button onClick={onClose} className="closeButton">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ResponseModal;