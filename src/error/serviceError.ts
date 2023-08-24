export class ServiceError extends Error {
  status = 500;
  message: string;

  ErrorMessage(message: string, status?: 500) {
    return {
      status: status ?? this.status,
      message,
      error: true,
    };
  }

  setStatus(status: number) {
    this.status = status;
  }
}
