import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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

    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(0);

    const [releases, setReleases]: [IRelease[], (releases: IRelease[]) => void] = useState(defaultReleases);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = useState('',);

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
            const response = await axios.get(`${API_SPOTIFY_BASE_URL}browse/new-releases/?limit=${limit}&offset=${offset}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            });
            setLoading(false);
            if(!response.data.albums.next) {
                //return;
            }
            setReleases(releases.concat(response.data.albums.items))
            setOffset(offset+limit);
            setPage(page+1);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getLatestReleases();
    }, []);

    return (
        <div>
            {loading && <CircularProgress size={32} />}
            <InfiniteScroll dataLength={releases.length} next={getLatestReleases} hasMore={true} loader={<span>Loading...</span>}>
                <Grid container spacing={2}>
                    {releases.map((release) =>
                        <Grid item xs={8} md={4} lg={3} xl={2} key={release.id}>
                            <ReleasePreview release={release}/>
                        </Grid>
                    )}
                    {error && <p className='error'>{error}</p>}
                </Grid>
                <p>{ page } </p>
            </InfiniteScroll>
        </div>
    );
};

export default ReleaseListPage;
