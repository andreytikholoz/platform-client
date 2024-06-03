import React from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
import axios from 'axios';
import logo from '../assets/logo.svg';

const ProfileHeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #553800;
    padding: 10px 40px;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    color: white;
`;

const LogoText = styled.span`
    margin-left: 30px;
    font-size: 30px;
    font-weight: 500;
`;

const NavLinks = styled.nav`
    display: flex;
    gap: 40px;
    font-size: 20px;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    position: relative;

    &:hover {
        text-decoration: underline;
    }
`;

const StyledScrollLink = styled(ScrollLink)`
    color: white;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const ProfileHeader = () => {
    const navigate = useNavigate();

    const handleProfileClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/profile', {state: {user: response.data}});
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <ProfileHeaderWrapper>
            <LogoContainer>
                <img src={logo} alt="Logo"/>
                <LogoText>Tykholoz Agro Platform</LogoText>
            </LogoContainer>
            <NavLinks>
                <StyledScrollLink to="listings" smooth={true} duration={500}>Всі оголошення</StyledScrollLink>
                <StyledScrollLink to="contacts" smooth={true} duration={500}>Контакти</StyledScrollLink>
                <StyledLink onClick={handleProfileClick}>Кабінет</StyledLink>
            </NavLinks>
        </ProfileHeaderWrapper>
    );
};

export default ProfileHeader;
