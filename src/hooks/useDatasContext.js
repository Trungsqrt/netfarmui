import { useContext } from 'react';
import { DatasContext } from '../contexts';

function useDatasContext() {
    const datasContext = useContext(DatasContext);
    return datasContext;
}

export default useDatasContext;
