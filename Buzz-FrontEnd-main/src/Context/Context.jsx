import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from "axios";

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [friends, setfriends] = useState([]);
    useEffect(() => {
        const getUser = async () => {
            try {
                let res = await axios.get('/feeds');
                setUser(res.data.message)
            } catch (err) {
                console.log(err.message);
            }
        }
        getUser();
    }, [user._id])

    useEffect(() => {
        const getFriends = async () => {
            try {
                let res = await axios.get('/user/friends');
                setfriends(res.data)
            } catch (err) {
                console.log(err.message);
            }
        }
        getFriends();
    }, [])

    const store = {
        user,
        loading,
        setLoading,
        friends
    }
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
}
