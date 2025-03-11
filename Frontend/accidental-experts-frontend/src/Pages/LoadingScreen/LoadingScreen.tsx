import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

export default function LoadingScreen({ text }) {
    return (
        <Stack gap={4} className="justify-content-center vh-100">
            <Spinner className="mx-auto" animation="border" />
            <h4 className="mx-auto">{text}</h4>
        </Stack>
    );
}
