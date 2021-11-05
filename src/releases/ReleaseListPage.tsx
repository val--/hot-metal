import React from 'react';
import axios, { CancelTokenSource } from 'axios';
import { IRelease } from '../types';

import { API_SPOTIFY_BASE_URL, CLIENT_ID, CLIENT_SECRET } from '../config';
const qs = require('qs');

const defaultReleases: IRelease[] = [];

const ReleaseListPage = () => {

    const [releases, setReleases]: [IRelease[], (releases: IRelease[]) => void] = React.useState(defaultReleases);
    const [loading, setLoading]: [
        boolean,
        (loading: boolean) => void
    ] = React.useState<boolean>(true);

    const [error, setError]: [string, (error: string) => void] = React.useState(
        '',
    );

    const cancelToken = axios.CancelToken;
    const [cancelTokenSource, setCancelTokenSource]: [
        CancelTokenSource,
        (cancelTokenSource: CancelTokenSource) => void
    ] = React.useState(cancelToken.source());

    const handleCancelClick = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel('User cancelled operation');
        }
    };

    const getAuth = async () => {
        try {
            const data = qs.stringify({ 'grant_type': 'client_credentials' });
            // @ts-ignore
            const response = await axios.post('https://accounts.spotify.com/api/token', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    // @ts-ignore
                    username: CLIENT_ID,
                    // @ts-ignore
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
            const response = await axios.get(`${API_SPOTIFY_BASE_URL}browse/new-releases/?limit=50`, {
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
            {loading && <button onClick={handleCancelClick}>Cancel</button>}
            <ul>
                {releases.map((release) =>
                    <li key={release.id}>
                         <img src={release.images[1].url}/>
                        <p>{release.artists.map((artist) => artist.name)}- {release.name}</p>
                    </li>,
                )}
                {error && <p className='error'>{error}</p>}
            </ul>
        </div>
    );
};

export default ReleaseListPage;
