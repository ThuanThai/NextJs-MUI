"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) {
        return <></>;
    }
    return (
        <AppBar
            position="fixed"
            color="default"
            sx={{ top: "auto", bottom: 0 }}>
            <Container
                sx={{ display: "flex", alignItems: "center", columnGap: 15 }}>
                <AudioPlayer
                    style={{ backgroundColor: "#f5f5f5", boxShadow: "none" }}
                    autoPlay
                    volume={0.5}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                    onPlay={(e) => console.log("onPlay")}
                    // other props here
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 100,
                    }}>
                    <div style={{ color: "#ccc" }}>Jasper</div>
                    <div style={{ color: "black" }}>Who Am I</div>
                </div>
            </Container>
        </AppBar>
    );
};

export default AppFooter;
