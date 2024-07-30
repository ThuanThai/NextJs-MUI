import {
    Box,
    Button,
    Container,
    LinearProgress,
    LinearProgressProps,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TrackUpload } from '../tab.track';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';

function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

interface ITrackUpload {
    title: string;
    category: string;
    description: string;
    imgUrl: string;
    trackUrl: string;
}

const categories = [
    {
        value: 'CHILL',
        label: 'Chill',
    },
    {
        value: 'PARTY',
        label: 'Party',
    },
    {
        value: 'WORKOUT',
        label: 'Workout',
    },
];

const StepTwo = ({
    trackUpload,
    setValue,
}: {
    trackUpload: TrackUpload;
    setValue: Dispatch<SetStateAction<number>>;
}) => {
    const { data: session } = useSession();

    const [info, setInfo] = React.useState<ITrackUpload>({
        title: '',
        category: '',
        description: '',
        imgUrl: '',
        trackUrl: '',
    });

    const toast = useToast();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    const handleUpload = async (image: any) => {
        const formData = new FormData();
        formData.append('fileUpload', image);
        const config = {
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
                target_type: 'images',
            },
        };
        try {
            const res = await axios.post(
                'http://localhost:8000/api/v1/files/upload',
                formData,
                config
            );

            const imgName = res.data.data.fileName;
            setInfo({
                ...info,
                imgUrl: imgName,
            });
        } catch (error) {
            //@ts-ignore
        }
    };

    const onSubmit = async () => {
        const res = await sendRequest<IBackendRes<[]>>({
            url: 'http://localhost:8000/api/v1/tracks',
            method: 'POST',
            body: { ...info },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        });

        if (res.error) {
            toast.error(res.message);
        } else {
            setValue(0);
            toast.success('upload successfully');
        }
    };

    console.log(info);

    React.useEffect(() => {
        console.log('>>> trackupload', trackUpload);
        if (trackUpload.uploadTrackName) {
            setInfo({
                ...info,
                trackUrl: trackUpload.uploadTrackName,
            });
        }
    }, [trackUpload]);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Typography>{trackUpload.fileName}</Typography>
                <LinearProgressWithLabel value={trackUpload.percent} />
            </Box>

            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        columnGap: 15,
                        marginTop: 4,
                    }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Box
                            sx={{
                                width: '300px',
                                height: '300px',
                                backgroundColor: 'grey',
                            }}>
                            {info.imgUrl && (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                    src={`${
                                        info.imgUrl
                                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`
                                            : ''
                                    }`}
                                />
                            )}
                        </Box>
                        <Button
                            onChange={(e) => {
                                const event = e.target as HTMLInputElement;
                                if (event && event.files) {
                                    const image = event.files[0];
                                    handleUpload(image);
                                }
                            }}
                            sx={{ marginTop: 2.5 }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}>
                            <input type="file" style={{ display: 'none' }} />
                            Upload file
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 3,
                            flex: 1,
                        }}>
                        <TextField
                            name="title"
                            onChange={handleOnChange}
                            fullWidth
                            label="title"
                            variant="standard"
                        />
                        <TextField
                            onChange={handleOnChange}
                            fullWidth
                            label="description"
                            name="description"
                            variant="standard"
                        />
                        <TextField
                            onChange={handleOnChange}
                            name="category"
                            id="outlined-select-currency"
                            select
                            variant="standard"
                            label="Select">
                            {categories.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button
                            onClick={onSubmit}
                            variant="outlined"
                            sx={{ display: 'inline', maxWidth: '100px' }}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default StepTwo;
