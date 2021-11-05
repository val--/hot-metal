import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import axios from 'axios';

import { API_SPOTIFY_BASE_URL, CLIENT_ID, CLIENT_SECRET } from '../config';
import ReleasePreview from './ReleasePreview';
import { IRelease } from '../types';

const defaultReleases: IRelease[] = [];

interface ReleaseListPageProps {
    numberOfReleases: number;
}

const ReleaseListPage = ({ numberOfReleases }: ReleaseListPageProps) => {

    const qs = require('qs');
    const limit:number = numberOfReleases || 50;
    const [releases, setReleases]: [IRelease[], (releases: IRelease[]) => void] = React.useState(defaultReleases);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState('',);

    const getAuth = async () => {
        try {
            const data = qs.stringify({ 'grant_type': 'client_credentials' });
            const response = await axios.post('https://accounts.spotify.com/api/token', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: CLIENT_ID,
                    password: CLIENT_SECRET,
                },
            });
            return response.data.access_token;
        } catch (error) {
            console.log(error);
        }
    };

    const getLatestReleases = async () => {
        const access_token = await getAuth();
        try {
            const response = await axios.get(`${API_SPOTIFY_BASE_URL}browse/new-releases/?limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            });
            setLoading(false);
            setReleases(response.data.albums.items);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    React.useEffect(() => {
        getLatestReleases();
    }, []);

    return (
        <div>
            {loading && <CircularProgress size={32} />}
            <Grid container spacing={2}>
                {releases.map((release) =>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                        <ReleasePreview release={release}/>
                    </Grid>
                )}
                {error && <p className='error'>{error}</p>}
            </Grid>
        </div>
    );
};

export default ReleaseListPage;
