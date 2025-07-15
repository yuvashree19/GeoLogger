import { type } from "@testing-library/user-event/dist/type";
import { createContext, useContext, useReducer } from "react";

const fakeAuthContext=createContext()
const initialState={
    user:null,
    isAuthenticated:false
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function reducer(state,action){
    switch(action.type){
        case "login":
            return{...state,user:action.payload,isAuthenticated:true}
        case "logout":
            return {...state,user:null,isAuthenticated:false}
        default:
            throw new Error("Undefined case found!")
    }
}
function FakeAuthProvider({children}){
    const [{user,isAuthenticated},dispatch]=useReducer(reducer , initialState)
    
    function login(email,password){
        if(email===FAKE_USER["email"] && password === FAKE_USER["password"]){
            dispatch({type:"login",payload:FAKE_USER})
        }
    }
    function logout(){
        dispatch({type:"logout"})
    }
    return <fakeAuthContext.Provider value={{login,user,isAuthenticated,logout}}>
        {children}
    </fakeAuthContext.Provider>
}

function useAuth(){
    const context=useContext(fakeAuthContext);
    if(context===undefined) throw new Error("Context is used in a wrong place");
    return context;
}
export {FakeAuthProvider,useAuth}

