import AuthContext from "../context/authContext";
import { useContext } from "react";

export default function useAuth() {
    const authContext = useContext(AuthContext);

    const auth = authContext.isAuthenticated;
    const setAuth = (isAuthenticated, tokenData = null) => {
        if(isAuthenticated){
            authContext.login();
            if (tokenData){
                window.localStorage.setItem('token-data', JSON.stringify(tokenData));
            }
        }else{
            authContext.logout();
            window.localStorage.removeItem('token-data');
        }
    }

    return [auth, setAuth];
}