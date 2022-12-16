export type Token = {
	expires: string
	token: string
}

export type AppTokenPair = {
	refreshToken: Token
	accessToken: Token
}
