import { useContext } from "react";
import { useAuthContext } from "./useAuthContext";
// import { useWorkoutsContext } from "./UseWorkoutsContext";

export const useLogout=()=>{
    const {dispatch}=useAuthContext();
    // const {dispatch:dispatchW}=useWorkoutsContext();
    const logout=()=>{


        localStorage.removeItem('user');


        dispatch({type:'LOGOUT'});
        // dispatchW({type:'SET_WORKOUTS', payload:null})
    }


    return {logout};
}