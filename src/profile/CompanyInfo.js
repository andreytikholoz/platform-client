import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import leafImage from '../assets/leaf.svg';

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
    margin-right: 120px;
    flex: 1;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-left: 10px;
    font-size: 20px;
`;

const InfoColumn = styled.div`
    flex: 1;
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

const CompanyInfo = () => {
    window.scrollTo(0, 0);
    const location = useLocation();
    const user = location.state?.user || null;

    if (!user) {
        return <div>No advertisement data available</div>;
    }

    return (
        <ProfileWrapper>
            <ProfileContainer>
                <Title>Інформація про компанію, яка надає пропозицію</Title>
                <TopLeftLeafImage src={leafImage} alt="Leaf"/>
                <BottomRightLeafImage src={leafImage} alt="Leaf"/>
                <InfoLogoContainer>
                    <InfoSection>
                        <InfoRow>
                            <InfoColumn>Назва компанії:</InfoColumn>
                            <InfoColumn>{user.companyName}</InfoColumn>
                        </InfoRow>
                        <InfoRow>
                            <InfoColumn>Контактна особа:</InfoColumn>
                            <InfoColumn>{user.firstName} {user.lastName}</InfoColumn>
                        </InfoRow>
                        <InfoRow>
                            <InfoColumn>Номер телефону:</InfoColumn>
                            <InfoColumn>{user.phoneNumber}</InfoColumn>
                        </InfoRow>
                        <InfoRow>
                            <InfoColumn>Email:</InfoColumn>
                            <InfoColumn>{user.email}</InfoColumn>
                        </InfoRow>
                    </InfoSection>
                    <Logo>Лого</Logo>
                </InfoLogoContainer>
            </ProfileContainer>
        </ProfileWrapper>
    );
};

export default CompanyInfo;
