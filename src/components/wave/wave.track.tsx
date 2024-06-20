import { useWaveSurfer } from "@/utils/customHook";
import { Container, Tooltip } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./style.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const arrComments = [
    {
        id: 1,
        avatar: "http://localhost:8000/images/chill1.png",
        moment: 10,
        user: "username 1",
        content: "just a comment1",
    },
    {
        id: 2,
        avatar: "http://localhost:8000/images/chill1.png",
        moment: 30,
        user: "username 2",
        content: "just a comment3",
    },
    {
        id: 3,
        avatar: "http://localhost:8000/images/chill1.png",
        moment: 50,
        user: "username 3",
        content: "just a comment3",
    },
];

const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const fileName = searchParams.get("audio");
    const [isPlaying, setIsPlaying] = useState(false);

    const waveOptions = useMemo((): Omit<WaveSurferOptions, "container"> => {
        let gradient, progressGradient;
        if (typeof window !== "undefined") {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
            gradient.addColorStop(0, "#656666"); // Top color
            gradient.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                "#656666"
            ); // Top color
            gradient.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                "#ffffff"
            ); // White line
            gradient.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                "#ffffff"
            ); // White line
            gradient.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                "#B1B1B1"
            ); // Bottom color
            gradient.addColorStop(1, "#B1B1B1"); // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(
                0,
                0,
                0,
                canvas.height * 1.35
            );
            progressGradient.addColorStop(0, "#EE772F"); // Top color
            progressGradient.addColorStop(
                (canvas.height * 0.7) / canvas.height,
                "#EB4926"
            ); // Top color
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 1) / canvas.height,
                "#ffffff"
            ); // White line
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 2) / canvas.height,
                "#ffffff"
            ); // White line
            progressGradient.addColorStop(
                (canvas.height * 0.7 + 3) / canvas.height,
                "#F6B094"
            ); // Bottom color
            progressGradient.addColorStop(1, "#F6B094"); // Bottom color
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
    const onClick = () => {
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
    const [time, setTime] = useState<string>("00:00");
    const [duration, setDuration] = useState<string>("00:00");

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
            "pointermove",
            //@ts-ignore
            (e) => (hover.style.width = `${e.offsetX}px`)
        );

        const subcriptions = [
            ws.on("play", () => setIsPlaying(true)),
            ws.on("pause", () => setIsPlaying(false)),
            ws.on("decode", (duration) => setDuration(formatTime(duration))),
            ws.on("timeupdate", (currentTime) =>
                setTime(formatTime(currentTime))
            ),
            ws.once("interaction", () => {
                ws.play();
            }),
        ];
        return () => {
            subcriptions.forEach((unsub) => unsub());
        };
    }, [ws]);

    return (
        <Container>
            <div className="background-gradient">
                <div className="title">
                    <button
                        style={{
                            width: 60,
                            height: 60,
                            backgroundColor: "#f50",
                            borderRadius: "100%",
                            border: "#f50",
                        }}
                        onClick={onClick}>
                        {isPlaying ? (
                            <PauseIcon
                                sx={{
                                    width: 40,
                                    height: 40,
                                    color: "white",
                                    textAlign: "center",
                                }}
                            />
                        ) : (
                            <PlayArrowIcon
                                sx={{
                                    width: 40,
                                    height: 40,
                                    color: "white",
                                    textAlign: "center",
                                }}
                            />
                        )}
                    </button>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "4px",
                            justifyItems: "flex-start",
                        }}>
                        <div
                            style={{
                                display: "inline-block",
                                padding: 4,
                                background: "black",
                                fontSize: 20,
                            }}>
                            Obito-'Danh Doi' Album
                        </div>
                        <span
                            style={{
                                padding: 4,
                                background: "black",
                                width: "fit-content",
                            }}>
                            Trending Music
                        </span>
                    </div>
                </div>
                <div className="release-time">8 months ago</div>
                <div className="artwork">
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        src="https://i1.sndcdn.com/artworks-TF5pH5awcmhGswqo-CyNskg-t500x500.jpg"
                        alt=""
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 20,
                        maxWidth: "calc(100% - 340px)",
                        right: 0,
                        left: 0,
                        padding: "0 30px",
                    }}>
                    <div
                        id="waveform"
                        style={{
                            position: "relative",
                            cursor: "pointer",
                            zIndex: 1,
                        }}
                        ref={containerRef}>
                        <div id="time">{time}</div>
                        <div id="duration">{duration}</div>
                        <div className="hover" ref={hoverRef}></div>
                        <div
                            style={{
                                position: "relative",
                                zIndex: 20,
                                top: "70%",
                                background: "red",
                            }}
                            className="comment">
                            {arrComments &&
                                arrComments.map((item) => (
                                    <Tooltip title="Delete">
                                        <img
                                            onPointerMove={(e) => {
                                                hoverRef.current!.style.width =
                                                    calcLeft(item.moment + 3);
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: 71,
                                                width: 20,
                                                height: 20,
                                                objectFit: "cover",
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
            </div>
        </Container>
    );
};

export default WaveTrack;
