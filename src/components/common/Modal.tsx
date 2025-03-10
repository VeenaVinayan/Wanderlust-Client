import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children, title }) => {
  if (!isOpen) return null; 

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
           <div className="flex justify-between items-center p-4 border-b">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              &times;
            </button>
          </div>
          <div className="px-6 py-4">
            {children} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
