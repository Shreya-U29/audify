import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// const Protected Route = ({ children }) =>{
// const { user } = UserAuth();
//     if (!user) {
//         return <Navigate to='/' />;
//     }
//     return children;
// };
// import React from 'react'

export default function ProtectedRoutes({children}) {
    const { user } = UserAuth();
    if(!user){
    return <Navigate to='/'/>
    }
   return children;
}

// export default ProtectedRoutes;