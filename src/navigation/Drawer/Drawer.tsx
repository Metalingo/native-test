import {
	createDrawerNavigator,
	DrawerNavigationProp,
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'

export type DrawerParamList = {
	Home: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

export const useDrawerNavigation = useNavigation<
	DrawerNavigationProp<DrawerParamList>
>

export default Drawer
