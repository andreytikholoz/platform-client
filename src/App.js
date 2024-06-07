import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import FirstPageHeader from './header/FirstPageHeader';
import FirstPage from './firstPage/FirstPage'; // Импорт компонента About
import Login from './profile/Login';
import Registration from './profile/Registration';
import NewAdvertisement from "./advertisement/NewAdvertisement";
import ConfirmDeleteProfile from "./profile/ConfirmDeleteProfile";
import MyAdvertisements from "./advertisement/MyAdvertisements";
import SimilarAdvertisements from "./advertisement/SimilarAdvertisements";
import MyAdvertisement from "./advertisement/MyAdvertisement";
import Advertisement from "./advertisement/Advertisement";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import AuthHeader from "./header/AuthHeader";
import LoginRegistrationHeader from "./header/LoginRegistrationHeader";
import FirstPageProfileHeader from "./header/AuthFirstPageHeader";
import EditAdvertisement from "./advertisement/EditAdvertisement";
import AuthFirstPage from "./firstPage/AuthFirstPage";
import CompanyInfo from "./profile/CompanyInfo";

const App = () => {
    const location = useLocation();

    const renderHeader = () => {
        const loginRegistrationHeaderPaths = [
            "/login",
            "/registration"
        ];

        const authHeaderPaths = [
            "/profile",
            "/my_advertisements",
            "/new_advertisement",
            "/edit_profile",
            "/confirm_delete",
            "/similar_advertisements",
            "/my_advertisement",
            "/edit_advertisement",
            "/advertisement",
            "/company_info"
        ];

        const authFirstPageHeaderPaths = [
            "/auth_first_page"
        ];

        if (loginRegistrationHeaderPaths.includes(location.pathname)) {
            return <LoginRegistrationHeader/>;
        } else if (authHeaderPaths.includes(location.pathname)) {
            return <AuthHeader/>;
        } else if (authFirstPageHeaderPaths.includes(location.pathname)) {
            return <FirstPageProfileHeader/>;
        } else {
            return <FirstPageHeader/>;
        }
    };

    return (
        <>
            {renderHeader()}
            <Routes>
                <Route path="/" element={<FirstPage/>}/>
                <Route path="/auth_first_page" element={<AuthFirstPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/new_advertisement" element={<NewAdvertisement/>}/>
                <Route path="/confirm_delete" element={<ConfirmDeleteProfile/>}/>
                <Route path="/my_advertisements" element={<MyAdvertisements/>}/>
                <Route path="/similar_advertisements" element={<SimilarAdvertisements/>}/>
                <Route path="/my_advertisement" element={<MyAdvertisement/>}/>
                <Route path="/advertisement" element={<Advertisement/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit_profile" element={<EditProfile/>}/>
                <Route path="/edit_advertisement" element={<EditAdvertisement/>}/>
                <Route path="/company_info" element={<CompanyInfo/>}/>
            </Routes>
        </>
    );
};

const AppWrapper = () => (
    <Router>
        <App/>
    </Router>
);

export default AppWrapper;
