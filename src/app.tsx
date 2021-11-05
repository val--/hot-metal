import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import ReleasesRoutes from './releases/ReleasesRoutes';
import Header from './Header';
import store from './store';

const AppContainer = styled.div`
    font-family: sans-serif;
    text-align: center;
`;

export const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer>
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/Releases">
                                <ReleasesRoutes />
                            </Route>
                            <Redirect exact path="/" to="/Releases" />
                            <Route>
                                <h1>404</h1>
                            </Route>
                        </Switch>
                    </main>
                </AppContainer>
            </Provider>
        </BrowserRouter>
    );
};
