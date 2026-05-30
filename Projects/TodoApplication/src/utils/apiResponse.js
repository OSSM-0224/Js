class ApiResponse {
  constructor(message, data = null) {
    this.sucess = true;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
