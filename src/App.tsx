import { QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MultiProvider from '@app/components/MultiProvider'
import queryClient from '@app/utils/query-client'

import BlurLayerProvider from './components/BlurLayerProvider'
import RootSuspense from './components/RootSuspense'
import RootNavigationContainer from './navigation/RootNavigationContainer'



const App: React.FC = () => {
	return (
		<MultiProvider
			providers={[
				<RootSuspense />,
				<JotaiProvider />,
				<QueryClientProvider client={queryClient} />,
				<SafeAreaProvider />,
				<BlurLayerProvider />,
			]}
		>
			<RootNavigationContainer />
			<StatusBar barStyle="light-content" />
		</MultiProvider>
	)
}

export default App
