import styled from 'styled-components';
import backgroundImage from '../assets/background.png';

export const PageWrapper = styled.div`
    background-color: #553800;
`;

export const AboutWrapper = styled.section`
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AboutTextContainer = styled.div`
    background-color: #553800;
    border-radius: 20px;
    max-width: 950px;
    margin-top: -50px;
`;

export const AboutText = styled.h1`
    color: white;
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    margin: 25px;
`;

export const ListingsWrapper = styled.section`
    padding: 20px 40px;
    background-color: #553800;
    margin: 0 0 30px;
`;

export const ListingsTitle = styled.h2`
    color: white;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
`;

export const ListingsTable = styled.table`
    width: 60%;
    margin: 20px auto;
    border-collapse: collapse;
`;

export const TableRow = styled.tr`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 20px;
    border: 2px solid white;
    border-radius: 40px;
    background-color: #553800;
    color: white;
    font-size: 18px;
`;

export const TableCell = styled.td`
    flex: 1;
    text-align: center;
`;

export const AdvertisementLink = styled.a`
    color: white;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        text-decoration: none;
    }
`;

export const LeafImage = styled.img`
    position: absolute;
    z-index: 0;
    opacity: 0.8;
`;

export const TopLeftLeafImage = styled(LeafImage)`
    top: 820px;
    left: 0;
    width: 200px;
    height: auto;
`;

export const BottomRightLeafImage = styled(LeafImage)`
    bottom: -600px;
    right: 0;
    width: 200px;
    height: auto;
    transform: scaleX(-1);
`;

export const ContactsWrapper = styled.footer`
    padding: 20px 40px;
    background-color: #3D2800;
    color: white;
    text-align: center;
`;

export const ContactInfo = styled.p`
    margin: 10px 0;
    font-size: 20px;
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const Modal = styled.div`
    background: white;
    padding: 40px;
    border-radius: 20px;
    position: relative;
    text-align: center;
    max-width: 400px;
    width: 90%;
    font-size: 20px;
`;

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background: transparent;
    border: none;
    font-size: 26px;
    cursor: pointer;
`;
