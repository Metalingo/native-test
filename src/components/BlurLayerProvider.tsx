import { css } from '@emotion/native'
import { BlurView } from '@react-native-community/blur'
import { useAtomValue } from 'jotai'
import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { Animated, StyleProp, View, ViewStyle } from 'react-native'

import { applicationBlurredAtom } from '@app/store/ui'

type Props = {
	style?: StyleProp<ViewStyle>
}

const BlurLayerProvider: React.FC<PropsWithChildren<Props>> = props => {
	const { style, children } = props

	const blurred = useAtomValue(applicationBlurredAtom)
	const opacityAnimation = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(opacityAnimation, {
			toValue: blurred ? 1 : 0,
			duration: 800,
			useNativeDriver: true,
		}).start()
	}, [blurred])

	return (
		<View
			style={css`
				flex: 1;
			`}
		>
			<Animated.View
				pointerEvents="none"
				style={[
					css`
						position: absolute;
						width: 100%;
						height: 100%;
						z-index: 100;
					`,
					{
						opacity: opacityAnimation,
					},
				]}
			>
				<BlurView
					blurAmount={10}
					blurType="light"
					style={[
						css`
							position: absolute;
							width: 100%;
							height: 100%;
						`,
						style,
					]}
				/>
			</Animated.View>
			{children}
		</View>
	)
}

export default BlurLayerProvider
