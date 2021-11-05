import { createStore, combineReducers } from 'redux';
import { useSelector } from 'react-redux';
import { loadingReducer } from './loading/loadingReducer';

const rootReducer = combineReducers({
    loading: loadingReducer,
});

const store = createStore(
    rootReducer,
);

export type RootState = ReturnType<typeof rootReducer>;

export const useLoading = () => {
    const numberOfLoadingQueries = useSelector((state: RootState) => state.loading);
    return numberOfLoadingQueries > 0;
};

export default store;
