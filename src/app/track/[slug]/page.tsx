"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const DetailPage = ({ params }: { params: { slug: string } }) => {
    const searchParams = useSearchParams();
    const fileName = searchParams.get("audio");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            WaveSurfer.create({
                container: containerRef.current,
                waveColor: "rgb(200, 0, 200)",
                progressColor: "rgb(100, 0, 100)",
                url: `/api?audio=${fileName}`,
            });
        }
    }, []);

    return <div ref={containerRef}>Dtail</div>;
};

export default DetailPage;
