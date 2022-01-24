import { React, useState } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { displayAlert, showUserSignUpSuccess, displaySignInSuccess } from '../actions/alert'
import { signIn, signUp } from '../actions/auth'


const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}


function Register() {

    const [values, setValues] = useState(initialState)
    const alerts = useSelector((state) => state.alerts)
    const dispatch = useDispatch()
    const history = useNavigate()

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    //to handle form input

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    //To handle on submit
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            dispatch(displayAlert())
            return;
        }

        if (isMember) {

            dispatch(signIn(values, history))
            dispatch(displaySignInSuccess())
        }
        else {
            dispatch(signUp(values, history))
            dispatch(showUserSignUpSuccess());
        }

    }
    return (
        <Wrapper className='full-page bg'>
            <form method='POST' className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {alerts.showAlert && <Alert />}
                {/* name input */}
                {!values.isMember &&
                    <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />
                }
                {/* email input */}
                <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
                {/* name password */}
                <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />

                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
                <p>
                    {!values.isMember ? 'Already Registered?' : 'Not a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {!values.isMember ? 'Login' : 'Register'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
