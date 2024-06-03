import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg';

const LoginRegistrationHeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #553800;
    padding: 10px 40px;
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

const LoginRegistrationHeader = () => {
    return (
        <LoginRegistrationHeaderWrapper>
            <Logo>
                <StyledLink to="/"
                            style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white'}}>
                    <img src={logo} alt="Logo"/>
                    <LogoText>Tykholoz Agro Platform</LogoText>
                </StyledLink>
            </Logo>
            <NavLinks>
                <StyledLink to="/registration">Реєстрація</StyledLink>
                <StyledLink to="/login">Вхід</StyledLink>
            </NavLinks>
        </LoginRegistrationHeaderWrapper>
    );
};

export default LoginRegistrationHeader;
