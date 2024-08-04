'use client';
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { AppBar, Container } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const {currentTrack, setCurrentTrack} = useTrackContext();
    const hasMounted = useHasMounted();
    const audioRef = useRef(null)
    if (!hasMounted) {
        return <></>;
    }


     //@ts-ignore
    if (audioRef?.current?.audio?.current) {
        if(currentTrack?.isPlaying) {
            //@ts-ignore
            audioRef.current.audio.current.play()
        } else {
             //@ts-ignore
             audioRef.current.audio.current.pause()
        }
         
    }

    return (
        <AppBar
            position="fixed"
            color="default"
            sx={{ top: 'auto', bottom: 0 }}>
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: 15,
                    '.rhap_main': { gap: '30px' },
                }}>
                <AudioPlayer
                    ref={audioRef} 
                    layout="horizontal-reverse"
                    style={{ backgroundColor: '#f5f5f5', boxShadow: 'none' }}
                    volume={0.5}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack?.trackUrl}`}
                    onPlay={() => {setCurrentTrack({...currentTrack, isPlaying: true})
                    //@ts-ignore
                    audioRef.current.audio.current.play()}}
                    onPause={() => {setCurrentTrack({...currentTrack, isPlaying: false})
                    //@ts-ignore
                    audioRef.current.audio.current.pause()}}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 100,
                    }}>
                    <div style={{ color: '#ccc' }}>{currentTrack?.description}</div>
                    <div style={{ color: 'black' }}>{currentTrack?.title}</div>
                </div>
            </Container>
        </AppBar>
    );
};

export default AppFooter;
