import {createContext} from 'react'
import { useState , useEffect} from 'react'
import axios from "axios"
export const UserContext = createContext({})



export function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    useEffect(()=> {
        if(!user){
            axios.get('/profile')
        }
    }, [ ])
    return (
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
    )
}
