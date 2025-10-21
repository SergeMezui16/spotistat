import { Store } from "@tanstack/react-store";
import type { AccessToken } from "./types";

const store = new Store({
	accessToken: null as AccessToken | null,
    expireAt: 0,
});

export const saveAccessToken = (token: AccessToken): void => {
	store.setState({ accessToken: token, expireAt: Date.now() + token.expires_in * 1000 });
};

export const getAccessToken = (): AccessToken | null => {
    return store.state.accessToken;
}

export const isLogged = (): boolean => {
    return !!store.state.accessToken;
}

export const isTokenExpired = (): boolean => {
    const expireAt = store.state.expireAt;
    return Date.now() >= expireAt;
}

export const requireAccessToken = (): AccessToken => {
    const accessToken = store.state.accessToken;

    if (!accessToken) {
        throw new Error("Access token not found");
    }

    return accessToken
}