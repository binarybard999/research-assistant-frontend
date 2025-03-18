import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes/Routes';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </>
    );
};

export default App;
