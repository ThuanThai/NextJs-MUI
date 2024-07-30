'use client';

import { createContext, useContext, useState } from 'react';

export const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentTrack, setCurrentTrack] = useState<IShareTrack>();

    return (
        <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </TrackContext.Provider>
    );
};

export const useTrackContext = () => {
    const context = useContext(TrackContext);
    if (!context) {
        throw new Error(
            'useTrackContext must be used within TrackContextProvider'
        );
    }
    return context;
};
