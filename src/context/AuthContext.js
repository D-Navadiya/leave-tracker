import { createContext } from 'react';
import { authContextValue } from 'src/constants/Authentication';

const AuthContext = createContext(authContextValue);

export default AuthContext;
