import React, {createContext, useReducer, useEffect} from 'react'
import axios from 'axios'
import { AuthReducer } from '../reducers/AuthReducer'
import { apiUrl ,LOCAL_STORAGE_TOKEN} from './const'
import setAuthToken from '../util/setAuthToken'

export const AuthContext  = createContext()

const AuthContextProvider = ({children}) => {

    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // Check authenticate user
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success) {
                dispatch({type: 'SET_AUTH',payload:{isAuthenticated:true, user: response.data.user }})
            }
        }catch(error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN)
            setAuthToken(null)
            dispatch({type: 'SET_AUTH',payload: {isAuthenticated:false, user:null}})
        }
    } 

    useEffect(() => loadUser(), [])

    // Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`,userForm)
            if (response.data.success) 
                localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken)
            await loadUser()
            return response.data 
        }
        catch (error) { 
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        } 
    }

      // register
      const registerUser = async userForm =>    {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`,userForm)
            if (response.data.success) 
                localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken)
            await loadUser()
            return response.data 
        }
        catch (error) { 
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        } 
    }

    // logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN)
        dispatch({type:'SET_AUTH',payload: {isAuthenticated:false, user:null}})
    }



    // context data
    const AuthContextData = {loginUser,registerUser,authState,logoutUser}

    // return provider
    return (
        <AuthContext.Provider value={AuthContextData} >
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContextProvider