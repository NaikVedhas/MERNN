import { createContext,useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);


export const AuthProvider = (props) =>{
    
    const [user,setUser] = useState(null);

    //we have only 2 types of operation ie saving the user when he logins and remove the user when he logouts
    const login = (userData) =>{
        // save the user to localstorage ie if user login and then closes the website and opens again he is logged in
        localStorage.setItem('user',JSON.stringify(userData));   //first arg is the name by which we want to store and second mein hume json format mein store kanra padta hai
        setUser(userData);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        setUser(null);
    }
    
    //So when we reload na after logged in the context is cleared and so we froned think that we have logoute but we are still logged in asa the token is in localstorage so everytime the website refresh we need to check if there is token in localstorage or not and update the context accrodingly

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));   //so in localstorage it is stored as json so we converted to object using JSON.parse. Now if item is not found then user is null
        
        if(user){
            login(user);
        }

    },[])

    
    console.log("Context start");
    console.log(user);
    console.log("Context end");
    
    return <AuthContext.Provider value={{user,login,logout}}>
        {props.children}
    </AuthContext.Provider>
}