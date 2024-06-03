import React from 'react';
import styled from 'styled-components';
import leafImage from '../assets/leaf.svg';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const AdvertisementWrapper = styled.div`
    background-color: #553800;
    min-height: 100vh;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AdvertisementContainer = styled.div`
    border: 2px solid white;
    border-radius: 50px;
    padding: 20px;
    background-color: #553800;
    color: white;
    margin-top: 20px;
    width: 50%;
`;

const Title = styled.h1`
    text-align: center;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-left: 150px;
    font-size: 20px;
`;

const InfoColumn = styled.div`
    flex: 1;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
`;

const Button = styled.button`
    padding: 15px 25px;
    background-color: white;
    color: #553800;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 18px;

    &:hover {
        background-color: #ffffffcc;
    }
`;

const LeafImage = styled.img`
    position: absolute;
    z-index: 0;
    opacity: 0.8;
`;

const TopLeftLeafImage = styled(LeafImage)`
    top: 40px;
    left: 0;
    width: 200px;
    height: auto;
`;

const BottomRightLeafImage = styled(LeafImage)`
    bottom: 150px;
    right: 0;
    width: 200px;
    height: auto;
    transform: scaleX(-1);
`;

const Advertisement = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const location = useLocation();
    const advertisement = location.state?.advertisement || null;


    const handleCompanyInfoButton = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user/byId', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: advertisement.userId
                }
            });
            navigate('/company_info', {state: {user: response.data}});
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <AdvertisementWrapper>
            <AdvertisementContainer>
                <TopLeftLeafImage src={leafImage} alt="Leaf"/>
                <BottomRightLeafImage src={leafImage} alt="Leaf"/>
                <Title>Оголошення</Title>
                <InfoRow>
                    <InfoColumn>Назва:</InfoColumn>
                    <InfoColumn>{advertisement.title}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Тип:</InfoColumn>
                    <InfoColumn>{advertisement.offerType}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Культура:</InfoColumn>
                    <InfoColumn>{advertisement.crop}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Рівень вологи:</InfoColumn>
                    <InfoColumn>{advertisement.moistureLevel}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Рівень сорних домішок:</InfoColumn>
                    <InfoColumn>{advertisement.impurityLevel}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Дата публікації:</InfoColumn>
                    <InfoColumn>{advertisement.date}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Кількість (об’єм):</InfoColumn>
                    <InfoColumn>{advertisement.quantity}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Ціна (грн.):</InfoColumn>
                    <InfoColumn>{advertisement.price}</InfoColumn>
                </InfoRow>
                <InfoRow>
                    <InfoColumn>Умови доставки:</InfoColumn>
                    <InfoColumn>{advertisement.term}</InfoColumn>
                </InfoRow>
                <ButtonContainer>
                    <Button onClick={handleCompanyInfoButton}>Контакти компанії</Button>
                </ButtonContainer>
            </AdvertisementContainer>
        </AdvertisementWrapper>
    );
};

export default Advertisement;
