import { makeStyles } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axios_ } from '../axios/base_url';
import { 
    Container, 
    LoginDialog, 
    Title, 
    Label, 
    Input, 
    InputGroup,
    SubGroup,
    InputWrapper,
    ButtonWrapper, 
    Button,
    ImageWrapper, 
    Image,
    Error
} from './Login.styled';

const useStyles = makeStyles(theme => ({
    visible: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translate(0, -50%)',
        color: '#CCCCCC'
    }
}));

const Login = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({ emailError: '', passwordError: '', defaultError: ''});
    const [visible, setVisible] = useState('inline');
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);
    

    const handleChange = e => {
        const { name, value } = e.target; // 'name' represents the name attribute of the element

        if (name === 'email') {
            if (!value) {
                setFormErrors({...formErrors, emailError: 'Email field required!' });
            } else {
                setFormErrors({...formErrors, emailError: '' });
            }
        } else if (name === 'password') {
            if (!value) {
                setFormErrors({...formErrors, passwordError: 'Password field required!' });
            } else {
                setFormErrors({...formErrors, passwordError: '' });
            }
        }

        setFormValues({...formValues, [name]: value}); // '[name]' can be for example 'username' OR 'password'
    };

    const validate = () => {
        const { email, password } = formValues;

        if (email && password) {
            if (buttonRef.current) {
                buttonRef.current.removeAttribute('disabled');
            }
        } else {
            if (buttonRef.current) {
                buttonRef.current.setAttribute('disabled', '');
            }
        }
    }

    const postFormData = async () => {
        //console.log(JSON.stringify(formValues));
        try {
            const response = await axios_.post('/api/login', JSON.stringify(formValues));
            console.log(response.data);
            return response.data;
        } catch (err) {
            const errors = err.response.data;
            if (errors) {
                setFormErrors({
                    emailError: errors.emailErr,
                    passwordError: errors.passErr,
                    defaultError: errors.defaultErr
                });
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postFormData()
        .then(results => {
            if (results) {
                setFormErrors({
                    emailError: '',
                    passwordError: '',
                    defaultError: ''
                });
                sessionStorage.setItem('role', results.role);
                sessionStorage.setItem('id', results.id);
                if (results.role === 'admin') {
                    navigate('/users/admin/dashboard');
                } else {
                    navigate('/products/categories/Fiction');
                }
                console.log(JSON.stringify(results));
            } else {
                sessionStorage.clear();
            }
        })
        .catch(reject => console.log(`Reject: ${reject}`));
    }

    const togglePassword = () => {
        if (inputRef.current) {
            const type = inputRef.current.getAttribute('type');
            if (type === 'password') {
                inputRef.current.setAttribute('type', 'text');
                setVisible('none');
            } else {
                inputRef.current.setAttribute('type', 'password');
                setVisible('inline');
            }
        }
    }

    return (
        <>
        <Container>
            <LoginDialog>
                <Title>Welcome back!</Title>
                <InputWrapper>
                    <InputGroup>
                        <Error className='generalErr' visible={formErrors.defaultError ? true : false}>{formErrors.defaultError}</Error>  
                        <Label htmlFor='email'>Email</Label>
                        <Input onChange={handleChange} name='email' id='email' type='text' required></Input>
                        <Error>{formErrors.emailError}</Error>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor='password'>Password</Label>
                        <SubGroup visible={visible}>
                            <Visibility className={classes.visible} onClick={togglePassword} /><span onClick={togglePassword}></span>
                            <Input onChange={handleChange} name='password' id='password' type='password' ref={inputRef} required></Input>
                        </SubGroup>
                        <Error>{formErrors.passwordError}</Error>
                    </InputGroup>
                </InputWrapper>
                <ButtonWrapper>
                    <Button type='submit' onClick={handleSubmit} ref={buttonRef}>Log In</Button>
                    <Link to='/register'>Don't have an account?</Link>
                </ButtonWrapper>
                <ImageWrapper position={{top: '-16%', left: '-30%', right: 'auto', bottom: 'auto'}} height={'300px'}>
                    <Image 
                        src={require('../images/3d-pink-book-in-air-1.png')} 
                        height={'350px'}
                    />
                </ImageWrapper>
                <ImageWrapper position={{top: 'auto', left: 'auto', right: '-80%', bottom: '-25%'}} height={'280px'}>
                    <Image 
                        src={require('../images/3d-orange-book-in-air.png')} 
                        height={'320px'}
                    />
                </ImageWrapper>
            </LoginDialog>
        </Container>
        </>
    )
};

export default Login;
