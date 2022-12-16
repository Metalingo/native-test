import { css } from '@emotion/native'
import { ImageBackground, ImageStyle } from 'react-native'

const HomeScreen: React.FC = () => {

	return (
		<>
			<ImageBackground
				style={css`
					flex: 1;
					background: #000; /* match image */
				`}
				imageStyle={
					css`
						opacity: 0.35;
						transform: translateY(140px);
					` as ImageStyle
				}
				source={require('@assets/character.png')}
			>
				
			</ImageBackground>


		</>
	)
}

export default HomeScreen
