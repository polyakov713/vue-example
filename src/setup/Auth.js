import jwtDecode from 'jwt-decode';
import axios from 'axios';

import eventBus from '../eventBus';

export default class Auth {
    constructor() {
        this.checkingInProgress = false;
    }

    static async logIn(credentials) {
        try {
            const { data } = await axios.post('https://zonesmart.su/api/v1/auth/jwt/create/', credentials);

            localStorage.setItem('tokenPair', JSON.stringify(data));
        } catch (err) {
            console.error('Auth.logIn ERROR:', err);
            throw err;
        }
    }

    static async logOut() {
        try {
            localStorage.removeItem('tokenPair');
        } catch (err) {
            console.error('Auth.logOut ERROR:', err);
            throw err;
        }
    }

    static async checkTokens() {
        // Чтобы избежать массового запуска метода при одновременных запросах. Все одновременные проверки получат один рзультат
        if (this.checkingInProgress) {
            return this.awaitChecking();
        }

        try {
            this.checkingInProgress = true;

            const tokenPairString = localStorage.getItem('tokenPair');
            if (!tokenPairString) {
                eventBus.$emit('tokens-checked', null);
                return null;
            }

            let result = null;
            const tokenPair = JSON.parse(tokenPairString);

            if (tokenPair && tokenPair.access) {
                const decodedAccessToken = jwtDecode(tokenPair.access);

                if (decodedAccessToken.exp * 1000 > Date.now()) {
                    result = {
                        encoded: tokenPair.access,
                        decoded: decodedAccessToken,
                    };
                } else {
                    const decodedRefreshToken = jwtDecode(tokenPair.refresh);

                    if (decodedRefreshToken.exp * 1000 > Date.now()) {
                        const { access } = await this.refreshTokenPair(tokenPair.refresh);

                        result = {
                            encoded: access,
                            decoded: jwtDecode(access),
                        };
                    } else {
                        localStorage.removeItem('tokenPair');
                    }
                }
            }

            eventBus.$emit('tokens-checked', result);
            return result;
        } catch (err) {
            console.error('Auth.checkTokens ERROR:', err);
            return null;
        } finally {
            this.checkingInProgress = false;
        }
    }

    static awaitChecking() {
        return new Promise((resolve) => {
            eventBus.$once('tokens-checked', (e) => {
                resolve(e);
            });
        });
    }

    static async refreshTokenPair(refreshToken) {
        try {
            const { data } = await axios.post('https://zonesmart.su/api/v1/auth/jwt/refresh/', { refresh: refreshToken });
            
            localStorage.setItem('tokenPair', JSON.stringify(data));
            return data;
        } catch (err) {
            console.error('Auth.refreshTokenPair ERROR:', err);
            localStorage.removeItem('tokenPair');
            eventBus.$emit('unauthorized');
        }
    }
}
