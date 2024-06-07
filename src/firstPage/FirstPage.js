import React, { useState, useEffect } from 'react';
import axios from 'axios'; // импорт библиотеки Axios для выполнения HTTP-запросов
import {
    PageWrapper,
    AboutWrapper,
    AboutTextContainer,
    AboutText,
    ListingsWrapper,
    ListingsTitle,
    ListingsTable,
    TableRow,
    TableCell,
    AdvertisementLink,
    TopLeftLeafImage,
    BottomRightLeafImage,
    ContactsWrapper,
    ContactInfo,
    ModalBackground,
    Modal,
    ModalCloseButton
} from './FirstPageSharedComponents';
import leafImage from '../assets/leaf.svg';

const FirstPage = () => {
    window.scrollTo(0, 0);
    const [ads, setAds] = useState([]); // Создаем состояние для хранения списка объявлений
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleLinkClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                            <TableCell><AdvertisementLink href="#" onClick={handleLinkClick}>{advertisement.title}</AdvertisementLink></TableCell>
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
            <TopLeftLeafImage src={leafImage} alt="Leaf" />
            <BottomRightLeafImage src={leafImage} alt="Leaf" />
            {isModalOpen && (
                <ModalBackground>
                    <Modal>
                        <ModalCloseButton onClick={closeModal}>&times;</ModalCloseButton>
                        <p>Для перегляду оголошення, будь ласка, увійдіть у систему або зареєструйтесь.</p>
                    </Modal>
                </ModalBackground>
            )}
        </PageWrapper>
    );
};

export default FirstPage;
