module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: ['./'],
				extensions: [
					'.ios.js',
					'.android.js',
					'.js',
					'.cjs',
					'.ts',
					'.tsx',
					'.json',
				],
				alias: {
					'@assets': './assets',
					'@app': './src',
				},
			},
		],
		'react-native-reanimated/plugin',
		['module:react-native-dotenv'],
	],
}
