class Response {
  constructor(success, message, data, error) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    if (error instanceof Error) {
      this.error = {
        message: error.message ?? '',
        name: error.name ?? '',
        stack: error.stack ?? '',
      };
    }
  }
}

module.exports = Response;
