import { useEffect } from 'react';
import { addTokenListener, getToken, getTokenPayload, removeTokenListener } from '../util/keycloak';
import useForceUpdate from './useForceUpdate';

const useKeycloakToken = () => {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        addTokenListener(forceUpdate);
        return () => removeTokenListener(forceUpdate);
    }, [forceUpdate]);

    return {
        token: getToken(),
        tokenPayload: getTokenPayload(),
    } as const;
};

export default useKeycloakToken;
