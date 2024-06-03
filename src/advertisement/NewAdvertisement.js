import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/background.png';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const NewAdvertisementWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 125vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;

const NewAdvertisementForm = styled.form`
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

const Select = styled.select`
    width: 521px;
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

const NewAdvertisement = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId || null;

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        offerType: '',
        crop: '',
        moistureLevel: '',
        impurityLevel: '',
        quantity: '',
        price: '',
        term: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
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

            const response = await axios.post(
                'http://localhost:8080/advertisement',
                {
                    ...formData,
                    userId
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
        <NewAdvertisementWrapper>
            <NewAdvertisementForm onSubmit={handleSubmit}>
                <Title>Нове оголошення</Title>
                <InputWrapper>
                    <Label htmlFor="title">Назва</Label>
                    <Input type="text" id="title" value={formData.title} onChange={handleChange}
                           placeholder="Продам пшеницю"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="offerType">Тип</Label>
                    <Select id="offerType" value={formData.offerType} onChange={handleChange}>
                        <option value="">Виберіть тип</option>
                        <option value="sell">Продаж</option>
                        <option value="buy">Купівля</option>
                    </Select>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="crop">Культура</Label>
                    <Select id="crop" value={formData.crop} onChange={handleChange}>
                        <option value="">Виберіть культуру</option>
                        <option value="feedWheat">Пшениця фуражна</option>
                        <option value="foodWheat">Пшениця продовольча</option>
                        <option value="sunflower">Соняшник</option>
                        <option value="corn">Кукурудза</option>
                        <option value="rapeseed">Ріпак</option>
                        <option value="barley">Ячмінь</option>
                        <option value="oats">Овес</option>
                        <option value="rye">Жито</option>
                        <option value="millet">Просо</option>
                        <option value="sorghum">Сорго</option>
                    </Select>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="moistureLevel">Рівень вологи (%)</Label>
                    <Input type="text" id="moistureLevel" value={formData.moistureLevel} onChange={handleChange}
                           placeholder="14"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="impurityLevel">Рівень сорних домішок (%)</Label>
                    <Input type="text" id="impurityLevel" value={formData.impurityLevel} onChange={handleChange}
                           placeholder="2"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="quantity">Кількість (об’єм в тонах)</Label>
                    <Input type="text" id="quantity" value={formData.quantity} onChange={handleChange}
                           placeholder="750"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="price">Ціна (в грн.)</Label>
                    <Input type="text" id="price" value={formData.price} onChange={handleChange} placeholder="7500"/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="term">Умови доставки</Label>
                    <Select id="term" value={formData.term} onChange={handleChange}>
                        <option value="">Виберіть умову доствки</option>
                        <option value="FCA">FCA</option>
                        <option value="CPT">CPT</option>
                        <option value="EXW">EXW</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="DDP">DDP</option>
                        <option value="DAP">DAP</option>
                    </Select>
                </InputWrapper>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <Button type="submit">Створити оголошення</Button>
            </NewAdvertisementForm>
        </NewAdvertisementWrapper>
    );
};

export default NewAdvertisement;