import { useWaveSurfer } from '@/utils/customHook';
import { Container, Tooltip } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';
import './style.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const arrComments = [
    {
        id: 1,
        avatar: 'http://localhost:8000/images/chill1.png',
        moment: 10,
        user: 'username 1',
        content: 'just a comment1',
    },
    {
        id: 2,
        avatar: 'http://localhost:8000/images/chill1.png',
        moment: 30,
        user: 'username 2',
        content: 'just a comment3',
    },
    {
        id: 3,
        avatar: 'http://localhost:8000/images/chill1.png',
        moment: 50,
        user: 'username 3',
        content: 'just a comment3',
    },
];

interface IProps {
    data: ITrackTop | undefined;
}

const WaveTrack = (props: IProps) => {
    const { data } = props;
    console.log(data);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const fileName = searchParams.get('audio');
    const [isPlaying, setIsPlaying] = useState(false);

    const waveOptions = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient;
        if (typeof window !== 'undefined') {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
            gradient.addColorStop(0, '#656666'); // Top color
            gradient.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                '#656666'
            ); // Top color
            gradient.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                '#ffffff'
            ); // White line
            gradient.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                '#ffffff'
            ); // White line
            gradient.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                '#B1B1B1'
            ); // Bottom color
            gradient.addColorStop(1, '#B1B1B1'); // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height * 1.35
            );
            progressGradient.addColorStop(0, '#EE772F'); // Top color
            progressGradient.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                '#EB4926'
            ); // Top color
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                '#ffffff'
            ); // White line
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                '#ffffff'
            ); // White line
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                '#F6B094'
            ); // Bottom color
            progressGradient.addColorStop(1, '#F6B094'); // Bottom color
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 100,
            barWidth: 3,
            url: `/api?audio=${fileName}`,
        };
    }, []);

    const ws = useWaveSurfer(containerRef, waveOptions);
    const onPlayClick = () => {
        if (ws) {
            ws.playPause();
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemainder = Math.round(seconds) % 60;
        const paddedSeconds = `0${secondsRemainder}`.slice(-2);
        return `${minutes}:${paddedSeconds}`;
    };
    const hoverRef = useRef<HTMLDivElement | null>(null);
    const [time, setTime] = useState<string>('00:00');
    const [duration, setDuration] = useState<string>('00:00');

    const calcLeft = (moment: number) => {
        const d = 199;
        return `${(moment / d) * 100}%`;
    };

    useEffect(() => {
        if (!ws) return;
        setIsPlaying(false);

        const waveform = containerRef.current!;
        const hover = hoverRef.current!;
        waveform.addEventListener(
            'pointermove',
            //@ts-ignore
            (e) => (hover.style.width = `${e.offsetX}px`)
        );

        const subcriptions = [
            ws.on('play', () => setIsPlaying(true)),
            ws.on('pause', () => setIsPlaying(false)),
            ws.on('decode', (duration) => setDuration(formatTime(duration))),
            ws.on('timeupdate', (currentTime) =>
                setTime(formatTime(currentTime))
            ),
            ws.once('interaction', () => {
                ws.play();
            }),
        ];
        return () => {
            subcriptions.forEach((unsub) => unsub());
        };
    }, [ws]);

    return (
        <Container>
            <div style={{ marginTop: 20 }}>
                <div
                    style={{
                        display: 'flex',
                        gap: 15,
                        padding: 20,
                        height: 400,
                        background:
                            'linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)',
                    }}>
                    <div
                        className="left"
                        style={{
                            width: '75%',
                            height: 'calc(100% - 10px)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                        <div className="info" style={{ display: 'flex' }}>
                            <div>
                                <div
                                    onClick={() => onPlayClick()}
                                    style={{
                                        borderRadius: '50%',
                                        background: '#f50',
                                        height: '50px',
                                        width: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}>
                                    {isPlaying === true ? (
                                        <PauseIcon
                                            sx={{
                                                fontSize: 30,
                                                color: 'white',
                                            }}
                                        />
                                    ) : (
                                        <PlayArrowIcon
                                            sx={{
                                                fontSize: 30,
                                                color: 'white',
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <div
                                    style={{
                                        padding: '0 5px',
                                        background: '#333',
                                        fontSize: 30,
                                        width: 'fit-content',
                                        color: 'white',
                                    }}>
                                    {data?.title}
                                </div>
                                <div
                                    style={{
                                        padding: '0 5px',
                                        marginTop: 10,
                                        background: '#333',
                                        fontSize: 20,
                                        width: 'fit-content',
                                        color: 'white',
                                    }}>
                                    {data?.description}
                                </div>
                            </div>
                        </div>
                        <div ref={containerRef} className="wave-form-container">
                            <div id="time">{time}</div>
                            <div id="duration">{duration}</div>
                            <div ref={hoverRef} id="hover"></div>
                            <div
                                className="overlay"
                                style={{
                                    position: 'absolute',
                                    height: '30px',
                                    width: '100%',
                                    bottom: '0',
                                    backdropFilter: 'brightness(0.5)',
                                }}></div>
                            <div
                                style={{
                                    position: 'relative',
                                    zIndex: 20,
                                }}
                                className="comment">
                                {arrComments &&
                                    arrComments.map((item) => (
                                        <Tooltip key={item.id} title="Delete">
                                            <img
                                                onPointerMove={(e) => {
                                                    hoverRef.current!.style.width =
                                                        calcLeft(
                                                            item.moment + 3
                                                        );
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 71,
                                                    width: 20,
                                                    height: 20,
                                                    objectFit: 'cover',
                                                    left: calcLeft(item.moment),
                                                }}
                                                src={`${item.avatar}`}
                                                alt=""
                                            />
                                        </Tooltip>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="right"
                        style={{
                            width: '37 %',
                            padding: 15,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                            }}>
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data?.imgUrl}`}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default WaveTrack;
