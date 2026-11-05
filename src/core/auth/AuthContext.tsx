import React, { createContext, useContext } from 'react';

interface AuthContextValue {
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
    signIn: async () => {},
    signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);