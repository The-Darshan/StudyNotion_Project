import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

export const PrivateRoute = ({children}) => {

    const {token} = useSelector((state)=>state.auth);

    if(token!==null){
        return children
    }
    else{
        return <Navigate to='/login'/>;
    }
}
