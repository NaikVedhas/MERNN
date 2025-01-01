import { createContext,useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);


export const AuthProvider = (props) =>{
    
    const [user,setUser] = useState(null);

    //we have only 2 types of operation ie saving the user when he logins and remove the user when he logouts
    const login = (userData) =>{
        // save the user to localstorage ie if user login and then closes the website and opens again he is logged in
        localStorage.setItem('user',JSON.stringify({userData}));   //first arg is the name by which we want to store and second mein hume json format mein store kanra padta hai
        setUser(userData);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        setUser(null);
    }
    
    console.log("Context start");
    console.log(user);
    console.log("Context end");
    
    return <AuthContext.Provider value={{user,login,logout}}>
        {props.children}
    </AuthContext.Provider>
}