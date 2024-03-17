export type AuthUser = {
	id: string;
	username: string;
	name: string;
	role: string | undefined;
	token: string | undefined;
};

export type AuthResponse = {
	user: AuthUser;
	accessToken?: string;
	refreshToken?: string;
	error?: any;
};
