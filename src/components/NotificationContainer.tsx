import { useAppSelector } from "../store/hooks";
import Toast from "./Notification";

export default function ToastContainer() {
  const notifications = useAppSelector((state) => state.notification.items);

  return (
    <div className="fixed top-20 right-5 z-50 flex flex-col gap-3 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <Toast {...notification} />
        </div>
      ))}
    </div>
  );
}