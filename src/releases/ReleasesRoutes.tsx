import { Switch, Route, useRouteMatch } from 'react-router';
import ReleaseListPage from './ReleaseListPage';
import { Typography } from '@material-ui/core';

const ReleasePages = () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:id`}>

            </Route>
            <Route path={match.path}>
                <>
                    <Typography variant="h2" gutterBottom>
                        Latest Spotify releases
                    </Typography>
                    <ReleaseListPage numberOfReleases={50} />
                </>
            </Route>
        </Switch>
    );
};

export default ReleasePages;
