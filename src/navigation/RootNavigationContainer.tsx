import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native'

import RootStackNavigator from './Root/Navigator'
import { RootStackParamList } from './Root/Stack'

const RootNavigationContainer: React.FC = () => {
	const navigationContainerRef = useNavigationContainerRef<RootStackParamList>()
	return (
		<NavigationContainer<RootStackParamList>
			key={'RootNavigationContainer'}
			ref={navigationContainerRef}
		>
			<RootStackNavigator
				key={'RootStackNavigator'}
			/>
		</NavigationContainer>
	)
}

export default RootNavigationContainer
