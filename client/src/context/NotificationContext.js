import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        const newNotification = {
            id: Date.now(),
            message,
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);