// import logo from "./logo.svg";
import "../App.css";
import React, { Suspense } from "react";  // React를 import 추가
import {     
    Routes,
    Route,    
} from "react-router-dom"
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar"
import Footer from "./views/Footer/Footer";
import Auth from '../hoc/auth'
import MovieDetail from "./views/MovieDetail/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";

function App() {
    const LandingPageWithAuth = Auth(LandingPage, null);
    const LoginPageWithAuth = Auth(LoginPage, false);
    const RegisterPageWithAuth = Auth(RegisterPage, false);
    const MovieDetailWithAuth = Auth(MovieDetail, null);
    const FavoritePageWithAuth = Auth(FavoritePage, true);

    return (
        <Suspense fallback={(<div>Loading...</div>)}>            
            <NavBar />
            <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 155px)'}}>
                <Routes>                
                    <Route path="/" element={<LandingPageWithAuth/>} />
                    <Route path="/login" element={<LoginPageWithAuth/>}/>
                    <Route path="/register" element={<RegisterPageWithAuth/>}/>                    
                    <Route path="/movie/:movieId" element={<MovieDetailWithAuth/>}/>                    
                    <Route path="/favorite" element={<FavoritePageWithAuth/>}/>                    
                </Routes>                        
            </div>
            <Footer />        
        </Suspense>
    );
}

export default App;
