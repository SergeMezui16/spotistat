import {
	type RouteConfig,
	index,
	route,
	prefix,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/login", "./routes/login.tsx"),
	...prefix("/auth", [route("/callback", "./routes/auth/callback.tsx")]),
] satisfies RouteConfig;
