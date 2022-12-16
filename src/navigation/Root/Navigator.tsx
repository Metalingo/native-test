import DrawerNavigator from '@app/navigation/Drawer/Navigator'

import { RootStack } from './Stack'

const RootStackNavigator: React.FC = () => {
	return (
		<RootStack.Navigator>
			<RootStack.Group key="main-group">
				<RootStack.Screen
					name="Main"
					component={DrawerNavigator}
					options={{ headerShown: false, title: '메인' }}
				/>
			</RootStack.Group>				
		</RootStack.Navigator>
	)
}

export default RootStackNavigator
