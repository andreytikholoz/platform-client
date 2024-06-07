import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    AboutText,
    AboutTextContainer,
    AboutWrapper,
    AdvertisementLink,
    BottomRightLeafImage,
    ContactInfo,
    ContactsWrapper,
    ListingsTable,
    ListingsTitle,
    ListingsWrapper,
    PageWrapper,
    TableCell,
    TableRow,
    TopLeftLeafImage
} from './FirstPageSharedComponents';
import leafImage from '../assets/leaf.svg';
import {useNavigate} from "react-router-dom";

const AuthFirstPage = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();

    const [ads, setAds] = useState([]);

    useEffect(() => {
        // Функция для загрузки списка объявлений с сервера
        const fetchAds = async () => {
            try {
                const response = await axios.get('http://localhost:8080/advertisement/list/full'); // Замените 'URL_вашего_API' на адрес вашего API
                setAds(response.data.advertisements); // Обновляем состояние списка объявлений данными с сервера
            } catch (error) {
                console.error('Ошибка при загрузке объявлений:', error);
            }
        };

        fetchAds(); // Вызываем функцию загрузки объявлений при монтировании компонента
    }, []); // Пустой массив зависимостей означает, что эффект будет вызван только один раз при монтировании компонента

    const handleAdvertisementClick = (advertisement) => {
        navigate('/advertisement', {state: {advertisement}});
    };

    return (
        <PageWrapper>
            <AboutWrapper>
                <AboutTextContainer>
                    <AboutText>Інтернет-платформа купівлі/продажу сільськогосподарської продукції</AboutText>
                </AboutTextContainer>
            </AboutWrapper>
            <ListingsWrapper id="listings">
                <ListingsTitle>Всі оголошення</ListingsTitle>
                <ListingsTable>
                    <thead>
                    <TableRow>
                        <TableCell>Назва</TableCell>
                        <TableCell>Об’єм (т.)</TableCell>
                        <TableCell>Ціна (грн.)</TableCell>
                        <TableCell>Умова доствки</TableCell>
                    </TableRow>
                    </thead>
                    <tbody>
                    {Array.isArray(ads) && ads.map(advertisement => (
                        <TableRow key={advertisement.id}>
                            <TableCell>
                                <AdvertisementLink onClick={() => handleAdvertisementClick(advertisement)}>
                                    {advertisement.title}
                                </AdvertisementLink>
                            </TableCell>
                            <TableCell>{advertisement.quantity}</TableCell>
                            <TableCell>{advertisement.price}</TableCell>
                            <TableCell>{advertisement.term}</TableCell>
                        </TableRow>
                    ))}
                    </tbody>
                </ListingsTable>
            </ListingsWrapper>
            <ContactsWrapper id="contacts">
                <ListingsTitle>Контакти</ListingsTitle>
                <ContactInfo>Керівник проекту: Тихолоз Андрій Андрійович</ContactInfo>
                <ContactInfo>Контактний номер для зв’язку: +380 (98) 706 28 18</ContactInfo>
                <ContactInfo>Email: tikholoz01@gmail.com</ContactInfo>
            </ContactsWrapper>
            <TopLeftLeafImage src={leafImage} alt="Leaf"/>
            <BottomRightLeafImage src={leafImage} alt="Leaf"/>
        </PageWrapper>
    );
};

export default AuthFirstPage;
