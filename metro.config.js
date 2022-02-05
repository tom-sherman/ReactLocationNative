/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
	resolver: {
		resolveRequest: (context, realModuleName, platform, moduleName) => {
			let module = realModuleName;
			if (realModuleName.includes("@tanstack/react-location")) {
				module = module.replace(
					"@tanstack/react-location",
					"@tanstack/react-location/build/cjs"
				);
			}
			const { resolveRequest: removed, ...restContext } = context;
			return require("metro-resolver").resolve(restContext, module, platform);
		},
	},
};
