import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {

    const { user } = useContext(AuthContext)
    return !user ? children : <Navigate to="/" />;
}

export default AuthRoute