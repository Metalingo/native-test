import { useWindowDimensions } from 'react-native'

import HomeScreen from '@app/screens/HomeScreen'

import Drawer from './Drawer'

const DrawerNavigator: React.FC = () => {
	const { width: screenWidth } = useWindowDimensions()
	return (
		<Drawer.Navigator
			screenOptions={{
				drawerType: 'front',
				drawerPosition: 'right',
				drawerStyle: {
					maxWidth: 400,
					width: screenWidth,
				},
			}}
		>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
		</Drawer.Navigator>
	)
}

export default DrawerNavigator
