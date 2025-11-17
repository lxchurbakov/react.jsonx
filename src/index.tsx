import React from 'react';
import { Helmet } from 'react-helmet';
import { helmet } from 'lib/theme';
import { Routes, Route } from "react-router-dom";
import { Text } from 'lib/atoms';
import { EditorPage } from './editor/page';

export default () => {
    return (
        <>
            <Helmet>{helmet}</Helmet>

            <Routes>            
                <Route path="/" element={<EditorPage />} />
                <Route path='*' element={<Text>404 not found</Text>} />
            </Routes>
        </>
    );
};