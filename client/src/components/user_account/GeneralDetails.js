import React, { useEffect, useRef, useState } from 'react';
import { axios_ } from '../../axios/base_url';
import { Error } from '../../pages/Publish.styled';
import { 
    Wrapper, 
    WrappingBox, 
    Title, 
    Container, 
    Label, 
    Input, 
    Button
} from './GeneralDetails.styled';

const GeneralDetails = ({ visible, details, handleChange, errors, setErrors }) => {
    const [message, setMessage] = useState('');
    const buttonRef = useRef(null);

    useEffect(() => {
        validate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const formData = new FormData();
        formData.append('last_name', details.last_name);
        formData.append('first_name', details.first_name);
        formData.append('email', details.email);

        try {
            const response = await axios_.post(`/account/details/${sessionStorage.getItem('id')}`, formData);
            if (response) {
                setMessage(response.data.message);
            }
        } catch (err) {
            const errors = err.response.data;
            if (errors) {
                for (const errorName of Object.keys(errors)) {
                    if (errors[errorName] !== '') {
                        setErrors({ ...errors, [errorName]: errors[errorName] });
                    }
                }
            }
        }
    }

    const validate = () => {
        const { last_name, first_name, email } = details;

        if (email && last_name && first_name) {
            if (buttonRef.current) {
                buttonRef.current.removeAttribute('disabled');
            }
        } else {
            if (buttonRef.current) {
                buttonRef.current.setAttribute('disabled', '');
            }
        }
    }

    return (
        <Wrapper visible={visible}>
            <WrappingBox>
                <Title>General Account Details</Title>
                <Container>
                    <Label htmlFor="lastname">Lastname</Label>
                    <Input onChange={handleChange} type="text" data-error="lNameErr" name="last_name" id="lastname" value={details.last_name}></Input>
                    <Error>{errors.lNameErr}</Error>
                    <Label htmlFor="firstname">Firstname</Label>
                    <Input onChange={handleChange} type="text" data-error="fNameErr" name="first_name" id="firstname" value={details.first_name}></Input>
                    <Error>{errors.fNameErr}</Error>
                    <Label htmlFor="email">Email address</Label>
                    <Input onChange={handleChange} type="email" data-error="emailErr" name="email" id="email" value={details.email}></Input>
                    <Error>{errors.emailErr}</Error>
                    <Button onClick={handleSubmit} type="submit" ref={buttonRef}>Save Changes</Button>
                    <p>{message}</p>
                </Container>
            </WrappingBox>
            <WrappingBox>
                <Title>Publisher Wallet</Title>
                <p>You have no books published.</p>
            </WrappingBox>
        </Wrapper>
    )
};

export default GeneralDetails;
