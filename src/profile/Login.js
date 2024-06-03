import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import backgroundImage from '../assets/background.png';

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;

const LoginForm = styled.form`
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
    margin-bottom: 70px;
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
    background-color: #5e3b09; /* Цвет кнопки */
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        background-color: #4c3008; /* Цвет при наведении */
    }
`;

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const key in formData) {
            if (formData[key] === '') {
                setError('Заповніть всі поля');
                return;
            }
        }
        try {
            const response = await axios.post('http://localhost:8080/auth', {
                username: formData.username,
                passwordHash: formData.password
            });
            // Получаем токен из ответа сервера
            const token = response.data.token;
            // Сохраняем токен в локальном хранилище
            localStorage.setItem('token', token);
            // Перенаправляем пользователя на другую страницу (например, домашнюю страницу)
            window.location.href = '/auth_first_page';
        } catch (error) {
            console.error('Помилка аутентификації:', error);
            setError('Щось пішло не так! Невірне Ім’я користувача або пароль');
            // Обработка ошибки аутентификации (например, отображение сообщения об ошибке пользователю)
        }
    };

    return (
        <LoginWrapper>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Вхід</Title>
                <InputWrapper>
                    <Label htmlFor="username">Ім’я користувача</Label>
                    <Input type="text" id="username" value={formData.username} onChange={handleChange}
                           placeholder="Taras2024"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="password">Пароль</Label>
                    <Input type="password" id="password" value={formData.password} onChange={handleChange}
                           placeholder="Введіть пароль"/>
                </InputWrapper>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Button type="submit">Увійти</Button>
            </LoginForm>
        </LoginWrapper>
    );
};

export default Login;
