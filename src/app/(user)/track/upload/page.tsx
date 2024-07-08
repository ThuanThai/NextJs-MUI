import UploadTrack from '@/components/track/tab.track';
import { Container } from '@mui/material';
import React from 'react';

const UploadPage = () => {
    return <Container sx={{
        marginTop: "20px",
        border: "1px solid #ddd"
        ,
    }}>
        <UploadTrack></UploadTrack>
    </Container>;
};

export default UploadPage;
