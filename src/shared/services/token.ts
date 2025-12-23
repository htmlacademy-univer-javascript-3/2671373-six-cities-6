import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'token';

export const getToken = () => Cookies.get(AUTH_TOKEN_KEY) ?? '';

export const saveToken = (token: string) => Cookies.set(AUTH_TOKEN_KEY, token);

export const deleteToken = () => Cookies.remove(AUTH_TOKEN_KEY);
