import { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
    const { notifications, markAsRead } = useNotification();

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                markAsRead(notifications[0].id);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notifications]);

    if (notifications.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {notifications.map(notification => (
                <div
                    key={notification.id}
                    className={`bg-white shadow-lg rounded-lg p-4 mb-2 transition-opacity duration-500
            ${notification.read ? 'opacity-0' : 'opacity-100'}`}
                >
                    <p className="text-gray-800">{notification.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Notification;