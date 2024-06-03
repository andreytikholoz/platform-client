import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/background.png';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const EditProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;

const EditProfileForm = styled.form`
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
`;

const Title = styled.h1`
    margin: 0 0 25px;
    font-size: 32px;
`;

const InputWrapper = styled.div`
    margin: 10px 0;
    text-align: left;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #5e3b09;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        background-color: #4c3008;
    }
`;

const EditProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user || null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        username: '',
        companyName: '',
        okpoCode: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        passwordHash: ''
    });

    const [error, setError] = useState('');

    // Заполнение полей формы значениями из advertisement при первом рендере
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                companyName: user.companyName,
                okpoCode: user.okpoCode,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                passwordHash: user.passwordHash
            });
        }
    }, [user]);

    if (!user) {
        return <div>No user data available</div>;
    }

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Проверка на заполнение всех полей
        for (const key in formData) {
            if (formData[key] === '') {
                setError('Заповніть всі поля');
                return;
            }
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await axios.put(
                'http://localhost:8080/user',
                {
                    id: user.id,
                    ...formData
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Response:', response.data);
            navigate('/auth_first_page');
        } catch (error) {
            console.error('There was an error!', error.response ? error.response.data : error.message);
        }
    };

    return (
        <EditProfileWrapper>
            <EditProfileForm onSubmit={handleSubmit}>
                <Title>Змінити профіль</Title>
                <InputWrapper>
                    <Label htmlFor="username">Ім’я користувача</Label>
                    <Input type="text" id="username" value={formData.username} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="companyName">Назва компанії</Label>
                    <Input type="text" id="companyName" value={formData.companyName} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="okpoCode">Код ЄДРПОУ (ЗКПО)</Label>
                    <Input type="text" id="okpoCode" value={formData.okpoCode} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="firstName">Ім’я</Label>
                    <Input type="text" id="firstName" value={formData.firstName} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input type="text" id="lastName" value={formData.lastName} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" value={formData.email} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="phoneNumber">Номер телефону</Label>
                    <Input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="address">Адреса підприємства</Label>
                    <Input type="text" id="address" value={formData.address} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="password">Пароль</Label>
                    <Input type="password" id="password" placeholder="Може містити латинські літери та цифри"
                           onChange={handleChange}/>
                </InputWrapper>
                {/*<InputWrapper>*/}
                {/*    <Label htmlFor="logo">Лого компанії</Label>*/}
                {/*    <Input type="file" id="logo" />*/}
                {/*</InputWrapper>*/}
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Button type="submit">Зберегти зміни</Button>
            </EditProfileForm>
        </EditProfileWrapper>
    );
};

export default EditProfile;
