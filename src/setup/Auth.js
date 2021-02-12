import jwtDecode from 'jwt-decode';
import axios from 'axios';

import event_bus from '../event_bus';

export default class Auth {
    constructor() {
        this.checking_in_progress = false;
    }

    static async logIn(credentials) {
        try {
            const { data } = await axios.post('https://zonesmart.su/api/v1/auth/jwt/create/', credentials);

            localStorage.setItem('token_pair', JSON.stringify(data));
        } catch (err) {
            console.error('Auth.logIn ERROR:', err);
            throw err;
        }
    }

    static async logOut() {
        try {
            localStorage.removeItem('token_pair');
        } catch (err) {
            console.error('Auth.logOut ERROR:', err);
            throw err;
        }
    }

    static async checkTokens() {
        // Чтобы избежать массового запуска метода при одновременных запросах. Все одновременные проверки получат один рзультат
        if (this.checking_in_progress) {
            return this.awaitChecking();
        }

        try {
            this.checking_in_progress = true;

            const token_pair_string = localStorage.getItem('token_pair');
            if (!token_pair_string) {
                event_bus.$emit('tokens-checked', null);
                return null;
            }

            let result = null;
            const token_pair = JSON.parse(token_pair_string);

            if (token_pair && token_pair.access) {
                const decoded_access_token = jwtDecode(token_pair.access);

                if (decoded_access_token.exp * 1000 > Date.now()) {
                    result = {
                        encoded: token_pair.access,
                        decoded: decoded_access_token,
                    };
                } else {
                    const decoded_refresh_token = jwtDecode(token_pair.refresh);

                    if (decoded_refresh_token.exp * 1000 > Date.now()) {
                        const { access } = await this.refreshTokenPair(token_pair.refresh);

                        result = {
                            encoded: access,
                            decoded: jwtDecode(access),
                        };
                    } else {
                        localStorage.removeItem('token_pair');
                    }
                }
            }

            event_bus.$emit('tokens-checked', result);
            return result;
        } catch (err) {
            console.error('Auth.checkTokens ERROR:', err);
            return null;
        } finally {
            this.checking_in_progress = false;
        }
    }

    static awaitChecking() {
        return new Promise((resolve) => {
            event_bus.$once('tokens-checked', (e) => {
                resolve(e);
            });
        });
    }

    static async refreshTokenPair(refresh_token) {
        try {
            const { data } = await axios.post('https://zonesmart.su/api/v1/auth/jwt/refresh/', { refresh: refresh_token });
            
            localStorage.setItem('token_pair', JSON.stringify(data));
            return data;
        } catch (err) {
            console.error('Auth.refreshTokenPair ERROR:', err);
            localStorage.removeItem('token_pair');
            event_bus.$emit('unauthorized');
        }
    }
}
