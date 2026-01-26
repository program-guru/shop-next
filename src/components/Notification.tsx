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

		// Delay removal to allow exit animation
		setTimeout(() => {
			dispatch(removeNotification(id));
		}, 300);
	}, [dispatch, id]);

	useEffect(() => {
		// Start Timer on Mount
		const timer = setTimeout(() => {
			handleDismiss();
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [handleDismiss, duration]);

	// Icon Logic
	const icons = {
		success: <CheckCircle className="w-5 h-5 text-green-500" />,
		error: <AlertCircle className="w-5 h-5 text-red-500" />,
		warning: <AlertTriangle className="w-5 h-5 text-orange-500" />,
		info: <Info className="w-5 h-5 text-blue-500" />,
	};

	const bgColors = {
		success: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
		error: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
		warning: "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800",
		info: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
	};

	return (
		<div
			role="alert"
			className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg 
        bg-surface transition-all duration-300 transform
        ${bgColors[type]}
        ${isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}
      `}
		>
			{icons[type]}
			<p className="text-sm font-medium text-text">{message}</p>
			<button
				onClick={handleDismiss}
				className="ml-2 p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
			>
				<X className="w-4 h-4 text-text-muted" />
			</button>
		</div>
	);
}
