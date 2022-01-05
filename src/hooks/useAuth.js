import React, { useContext } from 'react';
import { ContextApi } from '../contexts/ContextProvider';

const useAuth = () => {
    const auth = useContext(ContextApi);
    return auth;
};

export default useAuth;