import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("/api/token/refresh/", {refresh: refreshToken}); //pass the refresh token to the server
            // 200 means when it is success
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access) //set the access token to new res.data.access data that have been refreshed re4cently
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        }
        catch (error){
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp // decode the token in expression
        const now = Date.now() / 1000  // to convert date in second instead of milisecond

        if (tokenExpiration < now) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    
    return isAuthorized ? children : <Navigate to="/login" /> //if and else loop
    
}

export default ProtectedRoute