import React, { createContext, useState, ReactNode, useEffect } from "react";
import { get_user_role } from "../actions";

interface User {
    role: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
    user: null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          get_user_role(token).then((role) => {
            setIsAuthenticated(true);
            setUser({ role });
          }).catch((error) => {
            console.error("Error al obtener el rol del usuario", error);
            logout();
          });
        }
    }, []);


    const login = async (token: string) => {
       try{
            localStorage.setItem("token", token);
            const role = await get_user_role(token);
            setIsAuthenticated(true);
            setUser({ role });
       }catch(error){
            console.error("Error al obtener el rol del usuario", error);
            logout();
       }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
          {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;