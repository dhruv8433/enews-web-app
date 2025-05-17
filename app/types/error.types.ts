export interface ErrorType {
    message: string;
    details?: string; // additional error message/details
    status?: number; // HTTP status code
    isNetworkError?: boolean; // true if the error is a network error
    isTimeout?: boolean; // true if the error is a timeout error
}
