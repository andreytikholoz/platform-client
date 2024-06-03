import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import backgroundImage from '../assets/background.png';

const RegistrationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;

const RegistrationForm = styled.form`
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

const Registration = () => {
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
        password: ''
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const key in formData) {
            if (formData[key] === '') {
                setError('Заповніть всі поля');
                return; // Остановить отправку запроса
            }
        }
        axios.post('http://localhost:8080/registration', {
            username: formData.username,
            companyName: formData.companyName,
            okpoCode: formData.okpoCode,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            passwordHash: formData.password,
            phoneNumber: formData.phoneNumber,
            address: formData.address
        })
            .then(response => {
                console.log('Response:', response.data);
                window.location.href = '/login' // Перенаправляем пользователя на /login после успешной отправки формы
            })
            .catch(error => {
                console.error('There was an error!', error.toString());
                setError('Щось пішло не так! Мабуть, таке Ім\'я користувача вже зайняте. Будь ласка, виберіть інше.');
            });
    };

    return (
        <RegistrationWrapper>
            <RegistrationForm onSubmit={handleSubmit}>
                <Title>Реєстрація</Title>
                <InputWrapper>
                    <Label htmlFor="username">Ім’я користувача</Label>
                    <Input type="text" id="username" value={formData.username} onChange={handleChange}
                           placeholder="Taras2024"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="companyName">Назва компанії</Label>
                    <Input type="text" id="companyName" value={formData.companyName} onChange={handleChange}
                           placeholder="AgroDNIPRO"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="okpoCode">Код ЄДРПОУ (ЗКПО)</Label>
                    <Input type="text" id="okpoCode" value={formData.okpoCode} onChange={handleChange}
                           placeholder="39097463"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="firstName">Ім’я</Label>
                    <Input type="text" id="firstName" value={formData.firstName} onChange={handleChange}
                           placeholder="Тарас"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input type="text" id="lastName" value={formData.lastName} onChange={handleChange}
                           placeholder="Коваленко"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" value={formData.email} onChange={handleChange}
                           placeholder="taras2024@gmail.com"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="phoneNumber">Номер телефону</Label>
                    <Input type="tel" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                           placeholder="+38 096 890 89 89"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="address">Адреса підприємства</Label>
                    <Input type="text" id="address" value={formData.address} onChange={handleChange}
                           placeholder="Дніпро, вул. Калинова, 18"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="password">Пароль</Label>
                    <Input type="password" id="password" value={formData.password} onChange={handleChange}
                           placeholder="Може містити латинські літери та цифри"/>
                </InputWrapper>
                {/*<InputWrapper>*/}
                {/*    <Label htmlFor="logo">Лого компанії</Label>*/}
                {/*    <Input type="file" id="logo"/>*/}
                {/*</InputWrapper>*/}
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Button type="submit">Зареєструватись</Button>
            </RegistrationForm>
        </RegistrationWrapper>);
};

export default Registration;
