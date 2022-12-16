import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {},
	},
})

export default queryClient
