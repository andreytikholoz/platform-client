import React from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.svg';
import axios from "axios";

const AuthHeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #553800;
    padding: 10px 40px;
    border-bottom: 2px solid white;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
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

const AuthHeader = () => {
    const navigateToProfile = useNavigate();

    const handleProfileClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigateToProfile('/profile', {state: {user: response.data}});
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <AuthHeaderWrapper>
            <Logo>
                <StyledLink to="/auth_first_page"
                            style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white'}}>
                    <img src={logo} alt="Logo"/>
                    <LogoText>Tykholoz Agro Platform</LogoText>
                </StyledLink>
            </Logo>
            <NavLinks>
                <StyledLink onClick={handleProfileClick}>Кабінет</StyledLink>
            </NavLinks>
        </AuthHeaderWrapper>
    );
};

export default AuthHeader;
