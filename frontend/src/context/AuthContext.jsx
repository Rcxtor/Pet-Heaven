import { createContext, useContext, useEffect, useState } from "react";
import { loginUser,getCurrentUser,logoutUser, } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (!token) {
            setLoading(false);
            return;
        }

        getCurrentUser(token)
            .then((data) => {
                setUser(data.user);
            })
            .catch(() => {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [token]);


    const login = async (email, password) => {
    const data = await loginUser({
        email,
        password,
    });

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);

    return data;
    };


    const logout = async () => {

        if (token) {
            await logoutUser(token);
        }

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}