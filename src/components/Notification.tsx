import { useCallback, useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { removeNotification } from "../store/features/notification/notificationSlice";
import type { Notification } from "../types/Notification";

export default function Toast({
  id,
  message,
  type,
  duration = 3000,
}: Notification) {
  const dispatch = useAppDispatch();
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);

    setTimeout(() => {
      dispatch(removeNotification(id));
    }, 300);
  }, [dispatch, id]);

  useEffect(() => {
    const timer = setTimeout(handleDismiss, duration);
    return () => clearTimeout(timer);
  }, [handleDismiss, duration]);

  // Icons
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  // FULLY OPAQUE BACKGROUNDS
  const bgColors = {
    success:
      "bg-green-100 border-green-300 dark:bg-green-950 dark:border-green-800",
    error: "bg-red-100 border-red-300 dark:bg-red-950 dark:border-red-800",
    warning:
      "bg-orange-100 border-orange-300 dark:bg-orange-950 dark:border-orange-800",
    info: "bg-blue-100 border-blue-300 dark:bg-blue-950 dark:border-blue-800",
  };

  return (
    <div
      role="alert"
      className={`
        relative z-50
        flex items-center gap-3 px-4 py-3
        rounded-xl border shadow-lg
        transition-all duration-300 transform
        ${bgColors[type]}
        ${isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}
      `}
    >
      {icons[type]}

      <p className="text-sm font-medium text-text">{message}</p>

      <button
        onClick={handleDismiss}
        className="ml-2 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-text-muted" />
      </button>
    </div>
  );
}
