import React from 'react';
import styled from 'styled-components';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import leafImage from '../assets/leaf.svg';
import axios from "axios";

const ProfileWrapper = styled.div`
    background-color: #553800;
    min-height: 100vh;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileContainer = styled.div`
    border: 2px solid white;
    border-radius: 20px;
    padding: 20px;
    background-color: #553800;
    color: white;
    margin-top: 20px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 25px;
`;

const InfoLogoContainer = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    margin-bottom: 20px;
`;

const InfoSection = styled.div`
    text-align: left;
    margin-right: 10px;
    flex: 1;
`;

const InfoText = styled.p`
    font-size: 23px;
    margin: 0 0 10px 0;
`;

const Logo = styled.div`
    width: 100px;
    height: 100px;
    background-color: white;
    color: #553800;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 18px;
    margin-left: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled(Link)`
    padding: 15px 25px;
    background-color: white;
    color: #553800;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 18px;
    margin: 10px 0;
    width: 80%;
    text-align: center;
    text-decoration: none;


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

const Profile = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user || null;


    const handleMyAdvertisementsButton = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const userId = user.id; // assuming `user.id` is available in the user object
            const response = await axios.get(`http://localhost:8080/advertisement/list`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    userId: userId
                }
            });
            const advertisementList = response.data.advertisements;
            navigate('/my_advertisements', {state: {advertisementList}});
        } catch (error) {
            console.error('Error fetching advertisements:', error);
        }
    };

    const handleNewAdvertisementButton = (e) => {
        e.preventDefault();
        const userId = user.id;
        console.log(userId);
        navigate('/new_advertisement', {state: {userId}});
    }

    const handleEditProfileButton = async (e) => {
        e.preventDefault();
        console.log(user);
        navigate('/edit_profile', {state: {user}});
    };

    const handleConfirmDeleteButton = (e) => {
        e.preventDefault();
        const userId = user.id;
        console.log(userId);
        navigate('/confirm_delete', {state: {userId}});
    }

    return (
        <ProfileWrapper>
            <ProfileContainer>
                <Title>Мій кабінет</Title>
                <TopLeftLeafImage src={leafImage} alt="Leaf"/>
                <BottomRightLeafImage src={leafImage} alt="Leaf"/>
                <InfoLogoContainer>
                    <InfoSection>
                        <InfoText>{user.firstName} {user.lastName}</InfoText>
                        <InfoText>{user.companyName}</InfoText>
                    </InfoSection>
                    <Logo>Лого</Logo>
                </InfoLogoContainer>
                <ButtonContainer>
                    <Button onClick={handleMyAdvertisementsButton}>Мої оголошення</Button>
                    <Button onClick={handleNewAdvertisementButton}>Створити оголошення</Button>
                    <Button onClick={handleEditProfileButton}>Змінити профіль</Button>
                    <Button onClick={handleConfirmDeleteButton}>Видалити профіль</Button>
                </ButtonContainer>
            </ProfileContainer>
        </ProfileWrapper>
    );
};

export default Profile;
