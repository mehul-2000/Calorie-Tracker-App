import { React, useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}


function Register() {

    const [values, setValues] = useState(initialState)
    const { isLoading, showAlert, displayAlert } = useAppContext()
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
            displayAlert()
            return;
        }
        console.log(values)
    }
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
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
