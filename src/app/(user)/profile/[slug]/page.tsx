import { sendRequest } from '@/utils/api';
import Grid from '@mui/material/Grid';
import React from 'react';
import ProfileTrack from '../../../../components/track/profile.track';
import { Container } from '@mui/material';

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: 'http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10 ',
        method: 'POST',
        body: { id: params.slug },
    });
  
    const trackList = tracks.data?.result;
    return (
        <Container>
            <Grid container spacing={2}>
                {trackList &&
                    trackList.map((item) => (
                        <Grid item md={6}>
                            <ProfileTrack data={item}></ProfileTrack>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default ProfilePage;
