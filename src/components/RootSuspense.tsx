import { css } from '@emotion/native'
import React, { PropsWithChildren, Suspense } from 'react'
import { Text,  View } from 'react-native'



type Props = {}

const RootSuspense: React.FC<PropsWithChildren<Props>> = ({ children }) => {
	return (
		<Suspense
			fallback={
				<View
					style={css`
						flex: 1;
						align-items: center;
						justify-content: center;
					`}
				>
					<Text>Insert spinner here</Text>
				</View>
			}
		>
			{children}
		</Suspense>
	)
}

export default RootSuspense
