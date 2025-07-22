import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: "", type: "success" });
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);
  const handleClose = () => setToast({ message: "", type: "success" });
  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast message={toast.message} type={toast.type} onClose={handleClose} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
} 