import { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
// import { useAppContext } from '../context/appContext'
import Logo from './Logo.js'
import decode from 'jwt-decode'

const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false)
    //   const { toggleSidebar, logoutUser, user } = useAppContext()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const logOut = () => {
        dispatch({ type: 'LOGOUT' })
        history('/landing')
        setUser(null)
    }
    useEffect(() => {
        const token = user?.token

        // console.log(token)
        //JSONWebToken check 
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    return (
        <Wrapper>
            <div className='nav-center'>
                <div>
                    <Logo />
                </div>
                <div>
                    <h3 className='logo-text'>
                        dashboard
                    </h3>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {user.result.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn' onClick={logOut}>
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar