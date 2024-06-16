import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const useWaveSurfer = (containerRef: any, options: any) => {
    const [waveSurfer, setWaveSurfer] = useState<any>();
    useEffect(() => {
        if (containerRef.current) {
            const ws = WaveSurfer.create({
                container: containerRef.current,
                ...options,
            });
            setWaveSurfer(ws);
            return () => {
                ws.destroy();
            };
        }
    }, [options, containerRef]);
    return waveSurfer;
};

const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const fileName = searchParams.get('audio');

    const waveOptions = useMemo(() => {
        return {
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: `/api?audio=${fileName}`,
        };
    }, []);

    const wave = useWaveSurfer(containerRef, waveOptions);

    return <div ref={containerRef}></div>;
};

export default WaveTrack;
