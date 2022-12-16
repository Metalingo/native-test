declare module '*.svg' {
	import React from '@app/types/svg'
	import { SvgProps } from 'react-native-svg'
	const content: React.FC<SvgProps>
	export default content
}
