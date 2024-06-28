import * as React from "react";
import Box from "@mui/material/Box";
import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function HomePage() {
    // const session = await getServerSession(authOptions);
    // console.log('🚀 ~ HomePage ~ session:', session);

    const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: { category: "CHILL", limit: "10" },
    });
    const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: { category: "WORKOUT", limit: "10" },
    });
    const parties = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: "http://localhost:8000/api/v1/tracks/top",
        method: "POST",
        body: { category: "PARTY", limit: "10" },
    });
    return (
        <Container sx={{ paddingBottom: "120px" }}>
            <MainSlider title={"Chill"} data={chills?.data ?? []}></MainSlider>
            <MainSlider
                title={"Workout"}
                data={workouts?.data ?? []}></MainSlider>
            <MainSlider title={"Party"} data={parties?.data ?? []}></MainSlider>
        </Container>
    );
}
