import { makeStyles } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Error } from './Login.styled';
import { RoleDropdown } from './Register.styled';

const useStyles = makeStyles(theme => ({
    visible: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translate(0, -50%)',
        color: '#CCCCCC'
    }
}));

const Register = () => {
    const [formValues, setFormValues] = useState({ 
        firstName: '',
        lastName: '',
        email: '', 
        role: 'individual',
        password: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({ 
        firstNameError: '',
        lastNameError: '',
        emailError: '', 
        passwordError: '', 
        confirmPasswordError: ''
    });
    const [visible, setVisible] = useState('inline');
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const classes = useStyles();


    useEffect(() => {
        validate();
        console.log(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues]);


    const handleChange = e => {
        const { name, value } = e.target; // 'name' represents the name attribute of the element

        switch (name) {
            case 'firstName':
                if (!value) {
                    setFormErrors({...formErrors, firstNameError: 'First name field required!' });
                } else {
                    setFormErrors({...formErrors, firstNameError: '' });
                }
                break;
            case 'lastName':
                if (!value) {
                    setFormErrors({...formErrors, lastNameError: 'Last name field required!' });
                } else {
                    setFormErrors({...formErrors, lastNameError: '' });
                }
                break;
            case 'email':
                if (!value) {
                    setFormErrors({...formErrors, emailError: 'Email field required!' });
                } else {
                    setFormErrors({...formErrors, emailError: '' });
                }
                break;  
            case 'password':
                if (!value) {
                    setFormErrors({...formErrors, passwordError: 'Password field required!' });
                } else {
                    setFormErrors({...formErrors, passwordError: '' });
                }
                break 
            case 'confirmPassword':
                if (!value) {
                    setFormErrors({...formErrors, confirmPasswordError: 'Confirm password field required!' });
                } else {
                    setFormErrors({...formErrors, confirmPasswordError: '' });
                }
                break   
            default:
                console.log('Debugging');
        }

        setFormValues({...formValues, [name]: value}); // '[name]' can be for example 'username' OR 'password'
    };

    const validate = () => {       
        let isEmpty = 0;
        for (const key of Object.keys(formValues)) {
            if (!formValues[key]) {
                isEmpty += 1;
            }
        }

        if (isEmpty) {
            if (buttonRef.current) {
                buttonRef.current.setAttribute('disabled', '');
            }
        } else {
            if (buttonRef.current) {
                buttonRef.current.removeAttribute('disabled');
            }
        }
    }

    const postFormData = async () => {
        console.log(JSON.stringify(formValues));
        try {
            const response = await axios_.post('/api/register', JSON.stringify(formValues));
            console.log(response.data);
            return response.data;
        } catch (err) {
            const errors = err.response.data;
            if (errors) {
                setFormErrors({
                    firstNameError: errors.firstErr,
                    lastNameError: errors.lastErr,
                    emailError: errors.emailErr,
                    passwordError: errors.passErr,
                    confirmPasswordError: errors.passErr2
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
                navigate('/products/categories/Fiction');
                console.log(JSON.stringify(results));
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
                    <Title>Sign Up</Title>
                    <InputWrapper>
                        <InputGroup>
                            <Label htmlFor='firstName'>Firstname</Label>
                            <Input onChange={handleChange} name='firstName' id='firstName' type='text' required></Input>
                            <Error>{formErrors.firstNameError}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='lastName'>Lastname</Label>
                            <Input onChange={handleChange} name='lastName' id='lastName' type='text' required></Input>
                            <Error>{formErrors.lastNameError}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='email'>Email</Label>
                            <Input onChange={handleChange} name='email' id='email' type='email' autoComplete='off' required></Input>
                            <Error>{formErrors.emailError}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='role'>Role</Label>
                            <RoleDropdown onChange={handleChange} name='role' required>
                                <option value="individual">Individual</option>
                                <option value="professor">Professor</option>
                                <option value="student">Student</option>
                            </RoleDropdown>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='password'>Password</Label>
                            <SubGroup visible={visible}>
                                <Visibility className={classes.visible} onClick={togglePassword} /><span onClick={togglePassword}></span>
                                <Input onChange={handleChange} name='password' id='password' type='password' ref={inputRef} required></Input>
                            </SubGroup>
                            <Error>{formErrors.passwordError}</Error>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='confirmPassword'>Confirm Password</Label>
                            <Input onChange={handleChange} name='confirmPassword' id='confirmPassword' type='password' required></Input>
                            <Error>{formErrors.confirmPasswordError}</Error>
                        </InputGroup>
                    </InputWrapper>
                    <ButtonWrapper>
                        <Button type="submit" onClick={handleSubmit} ref={buttonRef}>Sign Up</Button>
                    </ButtonWrapper>
                    <ImageWrapper position={{top: '0%', left: '-55%', right: 'auto', bottom: 'auto'}} 
                                  height={'300px'}
                                  style={{transform: 'rotate(90deg)', transformOrigin: 'center'}}>
                        <Image 
                            src={require('../images/3d-orange-book-in-air.png')} 
                            height={'350px'}
                        />
                    </ImageWrapper>
                    <ImageWrapper position={{top: '20%', left: 'auto', right: '-40%', bottom: 'auto'}} 
                                  height={'280px'} 
                                  style={{transform: 'rotate(125deg)', transformOrigin: 'center'}}>
                        <Image 
                            src={require('../images/3d-green-book-in-air.png')} 
                            height={'320px'}
                        />
                    </ImageWrapper>
                    <ImageWrapper position={{top: 'auto', left: '-25%', right: 'auto', bottom: '-25%'}} height={'290px'}>
                        <Image 
                            src={require('../images/3d-pink-book-in-air.png')} 
                            height={'320px'}
                        />
                    </ImageWrapper>
                </LoginDialog>
            </Container>
        </>
    )
};

export default Register;
