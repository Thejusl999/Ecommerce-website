import React,{useState} from 'react';
import AuthContext from './auth-context';
const ContextProvider=props=>{
    const [token,setToken]=useState(null);
    const loggedInHandler=!!token;
    const loginHandler=(token)=>{
        setToken(token);
        if(localStorage.length>0){
            setTimeout(()=>{
                setToken('');
                localStorage.clear();
            },600000);
        }
    }
    const logoutHandler=()=>{
        setToken('');
    }
    const baseUrl='https://crudcrud.com/api/3e5cc66e91e24d34a5a71d3fb6c1eaae';
    let extension;
    if(localStorage.length>0){
        Object.entries(localStorage).forEach((key)=>{
            extension=`${key[0]}`.replace(/[@.]/g,'');
        })
    }
    const authContext={
        token:token,
        isLoggedIn:loggedInHandler,
        login:loginHandler,
        logout:logoutHandler,
        baseUrl:baseUrl,
        userEmail:extension
    }
    return <AuthContext.Provider value={authContext}>
        {props.children}
    </AuthContext.Provider>
}
export default ContextProvider;