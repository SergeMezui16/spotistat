import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tailwindcss(), tsconfigPaths(), biomePlugin()],
	server: {
		port: 5173,
	},
});
