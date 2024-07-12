class ErrorHandler extends Error{
    constructor(statusCode, message = "Code fatt gya hai", errors = [],stack){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;
        this.stack = stack;
    }
}
export default ErrorHandler;