import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) setUser(storedUser);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matched = users.find(
            (u) => u.email === email && u.password === password
        );

        if (matched) {
            setUser(matched);
            localStorage.setItem("loggedInUser", JSON.stringify(matched));
            return true;
        } else {
            return false;
        }
    };

    const register = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find((u) => u.email === email);
        if (exists) return false;

        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        setUser(newUser);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("loggedInUser");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

