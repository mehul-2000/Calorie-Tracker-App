
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('profile'))


    if (user) {
        return children;
    }
    else {
        return <Navigate to='/landing' />
    }

}

export default ProtectedRoute
