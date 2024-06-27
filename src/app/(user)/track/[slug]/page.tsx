'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import WaveTrack from '../../../../components/wave/wave.track';

const DetailPage = ({ params }: { params: { slug: string } }) => {
    return (
        <div>
            <WaveTrack></WaveTrack>
        </div>
    );
};

export default DetailPage;
