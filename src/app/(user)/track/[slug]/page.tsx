'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WaveTrack from '../../../../components/track/wave.track';
import { sendRequest } from '@/utils/api';



const DetailPage = ({ params }: { params: { slug: string } }) => {
    const {slug} = params
    const [data, setData] = useState<ITrackTop>()

    const fetchData = async () => {
        const res = await sendRequest<IBackendRes<ITrackTop>>({
            url: `http://localhost:8000/api/v1/tracks/${slug}`,
            method: 'GET',
        });
        setData(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <WaveTrack data={data}></WaveTrack>
        </div>
    );
};

export default DetailPage;
