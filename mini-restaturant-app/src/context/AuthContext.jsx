import { createContext,useState } from "react";
export const AuthContext=createContext();
export function AuthProvider({children}){
    const[user,setUser]=useState(
        JSON.parse(localStorage.getItem("user"))||null

    );
    const login=(email,password)=>{
        if (email==="admin@gmail.com"&& password==="admin1234"){
            const adminUser={role:"admin",email};
            setUser(adminUser);
            localStorage.setItem("user",JSON.seringify(adminUser));
            return "admin";
        }
        if (email==="customer@gmail.com"&& password==="customer1234"){
            const customerUser={role:"customer",email};
            setUser(customerUser);
            localStorage.setItem("user",JSON.seringify(customerUser));
            return "customer";
        }
        return null;
    };
    const logout=()=>{
        setUser(null);
        localStorage.removeItem("user");
    };
    return(
        <AuthContext.Provider value={{user, login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}