import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/background.png';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const ConfirmDeleteWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
`;

const ConfirmDeleteForm = styled.div`
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
    margin: 0 0 5px;
    font-size: 32px;
`;

const UnderTitle = styled.h1`
    margin: 0 0 25px;
    font-size: 20px;
    font-weight: 400;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ButtonStyles = `
    padding: 10px 30px; /* Общий padding для обоих кнопок */
    font-size: 18px;
    cursor: pointer;
    border-radius: 40px; /* Приводим к одинаковому радиусу */
`;

const DeleteButton = styled.button`
    ${ButtonStyles};
    background-color: white;
    color: black;
    border: 2px solid black;
    margin-right: 20px;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const ReturnButton = styled(Link)`
    ${ButtonStyles};
    background-color: #553800;
    color: white;
    border: none;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #442e00;
    }
`;

const ConfirmDeleteProfile = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId || null;

    const handleConfirmDeleteButton = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: userId
                }
            });
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Error fetching advertisements:', error);
        }
    };

    return (
        <ConfirmDeleteWrapper>
            <ConfirmDeleteForm>
                <Title>Ви впевнені, що бажаєте видалити профіль?</Title>
                <UnderTitle>Нам буде сумно без вас :(</UnderTitle>
                <ButtonContainer>
                    <DeleteButton onClick={handleConfirmDeleteButton}>Видалити</DeleteButton>
                    <ReturnButton to="/auth_first_page">Повернутись в головне меню</ReturnButton>
                </ButtonContainer>
            </ConfirmDeleteForm>
        </ConfirmDeleteWrapper>
    );
};

export default ConfirmDeleteProfile;
