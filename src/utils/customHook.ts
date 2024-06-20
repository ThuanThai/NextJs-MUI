import { useEffect, useState } from "react";

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
};

import WaveSurfer from "wavesurfer.js";
import { WaveSurferOptions } from "wavesurfer.js";

export const useWaveSurfer = (
    containerRef: React.RefObject<HTMLDivElement>,
    options: Omit<WaveSurferOptions, "container">
) => {
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
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
