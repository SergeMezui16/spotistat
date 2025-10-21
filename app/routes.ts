import {
	type RouteConfig,
	index,
	route,
	layout,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	// layout("./routes/layout.tsx", [
	// ]),
	route("/login", "./routes/login.tsx"),
	route("/auth/callback", "./routes/auth/callback.tsx"),
	route("/test", "./routes/test.ts"),
] satisfies RouteConfig;
