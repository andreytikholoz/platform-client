import React from 'react';
import styled from 'styled-components';
import leafImage from '../assets/leaf.svg';
import {useLocation, useNavigate} from "react-router-dom";

const SimilarAdvertisementsWrapper = styled.div`
    background-color: #553800;
    min-height: 100vh;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.h1`
    color: white;
    text-align: center;
    margin-bottom: 50px;
`;

const AdvertisementRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 40px;
    border: 2px solid white;
    border-radius: 40px;
    background-color: #553800;
    color: white;
    font-size: 18px;
    width: 50%;

    &:last-child {
        margin-bottom: 0;
    }
`;

const AdvertisementColumn = styled.div`
    flex: 1;
    text-align: center;
`;

const AdvertisementLink = styled.a`
    color: white;
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
        text-decoration: none;
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

const SimilarAdvertisements = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const location = useLocation();
    const {advertisementList} = location.state;

    const handleAdvertisementClick = (advertisement) => {
        navigate('/advertisement', {state: {advertisement}});
    };

    return (
        <SimilarAdvertisementsWrapper>
            <Header>Зустрічні оголошення</Header>
            <TopLeftLeafImage src={leafImage} alt="Leaf"/>
            <BottomRightLeafImage src={leafImage} alt="Leaf"/>
            <AdvertisementRow>
                <AdvertisementColumn>Назва</AdvertisementColumn>
                <AdvertisementColumn>Об’єм (т.)</AdvertisementColumn>
                <AdvertisementColumn>Ціна (грн.)</AdvertisementColumn>
                <AdvertisementColumn>Умова доставки</AdvertisementColumn>
            </AdvertisementRow>
            {Array.isArray(advertisementList) && advertisementList.map(advertisement => (
                <AdvertisementRow key={advertisement.id}>
                    <AdvertisementColumn>
                        <AdvertisementLink onClick={() => handleAdvertisementClick(advertisement)}>
                            {advertisement.title}
                        </AdvertisementLink>
                    </AdvertisementColumn>
                    <AdvertisementColumn>{advertisement.quantity}</AdvertisementColumn>
                    <AdvertisementColumn>{advertisement.price}</AdvertisementColumn>
                    <AdvertisementColumn>{advertisement.term}</AdvertisementColumn>
                </AdvertisementRow>
            ))}
        </SimilarAdvertisementsWrapper>
    );
};

export default SimilarAdvertisements;
