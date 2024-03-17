export interface IResponse {
	data?: Record<string, any>;
	_duration?: number;
	__logs?: string[];
	error?: boolean;
	success?: boolean;
	message?: string;
}
