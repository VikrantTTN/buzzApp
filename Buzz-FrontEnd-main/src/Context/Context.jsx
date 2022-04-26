import React, { useState , useEffect } from 'react';
import { createContext } from 'react';
import axios from "axios";

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            let res = await axios.get('/feeds');
            console.log(res);
            setUser(res.data.message)
        }
        getUser();
    }, [])

    const store = {
        user,
        loading,
        setLoading
    }
    return (
   <Context.Provider value={store}>
       {children}
   </Context.Provider>
  )
}
