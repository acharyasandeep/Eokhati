import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    const foundUser = JSON.parse(localStorage.getItem('userData')) || null

    useEffect(() => {
        if (foundUser) {
            setUserData(foundUser)
        }
    }, [])


    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData
            }}
        >
            {children}
        </UserContext.Provider>
    )

}