import { Outlet, redirect } from "react-router";
import { isLogged, isTokenExpired } from "~/lib/spotify/store";
import { refreshAccessToken } from "~/lib/spotify/auth";
import { useEffect } from "react";

export default function Layout() {
	const isUserLogged = isLogged();

	if (!isUserLogged) {
		return redirect("/login");
	}

	return <Outlet />;
}

const CheckTokenExpiration = () => {
	const isExpired = isTokenExpired();

	if (!isExpired) {
		return <Outlet />;
	}

	return <RefreshToken />;
};

const RefreshToken = () => {

    useEffect(() => {
        const interval = setInterval(
            async () => {
                try {
                    refreshAccessToken();
                    console.log("🔄 Access token refreshed");
                } catch (err) {
                    console.error("Failed to refresh token", err);
                }
            },
            55 * 60 * 1000,
        );

        return () => clearInterval(interval);
    }, []); 

	return <Outlet />;
};
