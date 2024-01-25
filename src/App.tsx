import React from 'react';
import MainPage from './components/views/MainPage';
import Navbar from "./components/views/Navbar";
const App: React.FC = () => {
    return (
        <div className="App">
            <Navbar/>
            <MainPage/>
        </div>
    );
};

export default App;
