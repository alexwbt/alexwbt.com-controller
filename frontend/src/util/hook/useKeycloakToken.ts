import { useEffect } from 'react';
import { addTokenListener, getToken, getTokenPayload, removeTokenListener } from '../keycloak';
import useForceUpdate from './useForceUpdate';

const useKeycloakToken = () => {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        addTokenListener(forceUpdate);
        return () => removeTokenListener(forceUpdate);
    }, [forceUpdate]);

    return [
        getToken(),
        getTokenPayload()
    ] as const;
};

export default useKeycloakToken;
