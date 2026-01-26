import { useAppSelector } from "../store/hooks";
import Toast from "./Notification";

export default function ToastContainer() {
  const notifications = useAppSelector((state) => state.notification.items);

  return (
    <div
      className="
        fixed z-40 flex flex-col gap-3 pointer-events-none
        bottom-5 left-1/2 -translate-x-1/2
        w-[92vw] max-w-md
        sm:left-auto sm:translate-x-0 sm:right-5
        sm:w-auto sm:max-w-none
      "
    >
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <Toast {...notification} />
        </div>
      ))}
    </div>
  );
}
