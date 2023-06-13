import { Children, createContext, useContext, useState } from "react";

const userSession = createContext();
const userTogglerSession = createContext();

export const useUserSession = () => {
    return useContext(userSession);
}

export const useUserTogglerSession = () => {
    return useContext(userTogglerSession);
}

export default function ContextProvider(props) {
    const [user, setUser] = useState(null);
    return (
        <userSession.Provider value={user}>
            <userTogglerSession.Provider value={setUser}>{props.children}</userTogglerSession.Provider>
        </userSession.Provider>
    );
};









