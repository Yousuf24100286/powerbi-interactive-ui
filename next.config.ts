/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.js");
// import { withAxiom } from "next-axiom"

/** @type {import("next").NextConfig} */
const config = {
	// images: {
	// 	remotePatterns: [{
	// 		hostname: 'cdn.sanity.io',
	// 	}, {
	// 		hostname: 'placehold.co',
	// 	}, {
	// 		hostname: 'findyourtutor.blr1.cdn.digitaloceanspaces.com',
	// 	}, {
	// 		hostname: 'findyourtutor-object-storage.lon1.cdn.digitaloceanspaces.com',
	// 	}],
	// },
	// serverExternalPackages: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
	// experimental: {
	// 	serverActions: {
	// 		bodySizeLimit: '100mb',
	// 	}
	// },
};

export default config;
// export default withAxiom(config);
