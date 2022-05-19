import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    const foundUser = JSON.parse(localStorage.getItem('userData')) || null

    useEffect(() => {
        if (foundUser) {
            setUserData(foundUser)
        }
        else {
            toast.error('You must login first')
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