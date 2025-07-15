import { createContext, useContext, useEffect, useReducer, useState } from "react";

const citiesContext=createContext();
const BASE_URL="http://localhost:8000";

const initialState={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:""
}

function reducer(state,action){
  switch(action.type){
    case "loading":
      return {...state,isLoading:true}
    case "cities/loaded":
      return {...state,isLoading:false,cities:action.payload}
    case "city/loaded":
      return {...state,isLoading:false,currentCity:action.payload}
    case "city/created":
      return{
        ...state,
        isLoading:false,
        cities:[...state.cities,action.payload],
        currentCity:action.payload
      }
    case "city/deleted":
      return {
        ...state,
        isLoading:false,
        cities:state.cities.filter(city=>city.id !== action.payload)
      }
    case "rejected":
      return {
        ...state,
        error:action.payload
      }
    default:
      throw new Error("Undefined Action Found")
  }
}


function CitiesProvider({children}){
  const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialState)
  useEffect(function(){
    async function fetchCities(){
      try{
        dispatch({type:"loading"})
      const res=await fetch(`${BASE_URL}/cities`);
      const data=await res.json();
      dispatch({type:"cities/loaded",payload:data})
      }
      catch(error){
         dispatch({type:"rejected",payload:"There was an error loading data"})
          
         
      }
     
      
    }
    fetchCities()
  },[]);

  async function getCity(id){
    console.log(`id : ${id}`)
      try{
        dispatch({type:"loading"})
      const res=await fetch(`${BASE_URL}/cities/${id}`);
      const data=await res.json();
     dispatch({type:"city/loaded",payload:data})
      }
      catch(error){
          throw new Error("There was an error loading data ...")
      }
      
    }

    async function createCity(newCity){
      try{
        dispatch({type:"loading"})
      const res=await fetch(`${BASE_URL}/cities`,{
        method:"POST",
        body:JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data=await res.json();
      console.log(data)
      dispatch({type:"city/created",payload:data})
      }
      catch(error){
        dispatch({type:"rejected",payload:"There was an error adding data ..."})
       
          
      }
      
    }

    async function deleteCity(id){
      try{
        dispatch({type:"loading"})
      await fetch(`${BASE_URL}/cities/${id}`,{
        method:"DELETE",
      });
      
     dispatch({type:"city/deleted",payload:id})
      
      }
      catch(error){
        dispatch({type:"rejected",payload:"There was an error while deleting the data"})
          
      }
      
    }
    



  return <citiesContext.Provider value={{cities,isLoading,getCity,currentCity,createCity,deleteCity}}>
    {children}
  </citiesContext.Provider>
}

function useCities(){
    const context=useContext(citiesContext);
    if(context===undefined)
        throw new Error("Context is called somewhere it shouldn't be called");
    return context;
}

export {CitiesProvider,useCities};