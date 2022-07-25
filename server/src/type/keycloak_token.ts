
type KeycloakToken = {
    resource_access?: {
        'docker-manager-frontend'?: {
            roles?: string[];
        }
    }
};

export default KeycloakToken;
