'use client';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTrackContext } from '@/lib/track.wrapper';
import Link from 'next/link';
const ProfileTrack = ({ data }: { data: ITrackTop }) => {
    const theme = useTheme();
    const { currentTrack, setCurrentTrack } = useTrackContext();
    return (
        <Card sx={{ display: 'flex', marginTop: '20px', height:"170px"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link href={`/track/${data?._id}?audio=${data?.trackUrl}&id=${data?._id}`} style={{textDecoration:"none",
                        color:"unset"
                    }}>
                    <Typography 
                    variant='h6' 
                       >
                        {data.title}
                    </Typography>
                    </Link>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div">
                        {data.description}
                    </Typography>
                </CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 1,
                        pb: 1,
                    }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? (
                            <SkipNextIcon />
                        ) : (
                            <SkipPreviousIcon />
                        )}
                    </IconButton>
                    {(data._id !== currentTrack?._id ||
                        (data._id === currentTrack._id &&
                            currentTrack.isPlaying === false)) && (
                        <IconButton
                            aria-label="play/pause"
                            onClick={(e) => {
                                setCurrentTrack({ ...data, isPlaying: true });
                            }}>
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    )}
                    {data._id === currentTrack?._id &&
                        currentTrack.isPlaying === true && (
                            <IconButton
                                aria-label="play/pause"
                                onClick={(e) => {
                                    setCurrentTrack({
                                        ...data,
                                        isPlaying: false,
                                    });
                                }}>
                                <PauseIcon sx={{ height: 38, width: 38 }} />
                            </IconButton>
                        )}
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? (
                            <SkipPreviousIcon />
                        ) : (
                            <SkipNextIcon />
                        )}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
                alt="Live from space album cover"
            />
        </Card>
    );
};

export default ProfileTrack;
