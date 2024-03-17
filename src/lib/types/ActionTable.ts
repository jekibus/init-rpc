export type ActionTable = {
	id: string;
	action: string;
	name?: string;
	params?: Record<string, any>;
	value?: string | number;
	data?: any;
};
