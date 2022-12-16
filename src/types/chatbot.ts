export type ChatMessage = {
	by: 'AI' | 'USER'
	message: string
	timestamp?: Date
}
export type Recommendation = {
	englishSentence: string,
	nativeSentence: string
}