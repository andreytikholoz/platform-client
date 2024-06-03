import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/background.png';
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom";

const EditAdvertisementWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 125vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;

const EditAdvertisementForm = styled.form`
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

const EditAdvertisement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const advertisement = location.state?.advertisement || null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const [error, setError] = useState('');

    // Заполнение полей формы значениями из advertisement при первом рендере
    useEffect(() => {
        if (advertisement) {
            setFormData({
                title: advertisement.title,
                offerType: advertisement.offerType,
                crop: advertisement.crop,
                moistureLevel: advertisement.moistureLevel,
                impurityLevel: advertisement.impurityLevel,
                quantity: advertisement.quantity,
                price: advertisement.price,
                term: advertisement.term
            });
        }
    }, [advertisement]);

    if (!advertisement) {
        return <div>No advertisement data available</div>;
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
                'http://localhost:8080/advertisement',
                {
                    id: advertisement.id,
                    ...formData,
                    date: advertisement.date,
                    userId: advertisement.userId
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
        <EditAdvertisementWrapper>
            <EditAdvertisementForm onSubmit={handleSubmit}>
                <Title>Змінити оголошення</Title>
                <InputWrapper>
                    <Label htmlFor="title">Назва</Label>
                    <Input type="text" id="title" value={formData.title} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="offerType">Тип</Label>
                    <Select id="offerType" value={formData.offerType} onChange={handleChange}>
                        <option value="">Виберіть тип</option>
                        <option value="Продаж">Продаж</option>
                        <option value="Купівля">Купівля</option>
                    </Select>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="crop">Культура</Label>
                    <Select id="crop" value={formData.crop} onChange={handleChange}>
                        <option value="">Виберіть культуру</option>
                        <option value="Пшениця фуражна">Пшениця фуражна</option>
                        <option value="Пшениця продовольча">Пшениця продовольча</option>
                        <option value="Соняшник">Соняшник</option>
                        <option value="Кукурудза">Кукурудза</option>
                        <option value="Ріпак">Ріпак</option>
                        <option value="Ячмінь">Ячмінь</option>
                        <option value="Овес">Овес</option>
                        <option value="Жито">Жито</option>
                        <option value="Просо">Просо</option>
                        <option value="Сорго">Сорго</option>
                    </Select>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="moistureLevel">Рівень вологи (%)</Label>
                    <Input type="text" id="moistureLevel" value={formData.moistureLevel} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="impurityLevel">Рівень сорних домішок (%)</Label>
                    <Input type="text" id="impurityLevel" value={formData.impurityLevel} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="quantity">Кількість (об’єм в тонах)</Label>
                    <Input type="text" id="quantity" value={formData.quantity} onChange={handleChange}/>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="price">Ціна (в грн.)</Label>
                    <Input type="text" id="price" value={formData.price} onChange={handleChange}
                           placeholder={advertisement.price}/>
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
                <Button type="submit">Зберегти оголошення</Button>
            </EditAdvertisementForm>
        </EditAdvertisementWrapper>
    );
};

export default EditAdvertisement;
