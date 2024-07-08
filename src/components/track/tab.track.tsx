'use client'
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import StepOne from './steps/step.one';
import StepTwo from './steps/step.two';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export type TrackUpload = {
    fileName: string;
    percent: number;
    uploadTrackName: string;
};

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function UploadTrack() {
    const [value, setValue] = React.useState(0);
    const [trackUpload, setTrackUpload] = React.useState<TrackUpload>({
        fileName: "",
        uploadTrackName: "",
        percent: 0
    })
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tracks" {...a11yProps(0)} />
                    <Tab label="Basic Information" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <StepOne trackUpload={trackUpload} setValue={setValue} setTrackUpload={setTrackUpload}></StepOne>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <StepTwo trackUpload={trackUpload}></StepTwo>
            </CustomTabPanel>
        </Box>
    );
}


export default UploadTrack;