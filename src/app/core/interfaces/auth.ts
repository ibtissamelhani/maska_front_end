

  export interface AuthResponse {
    token: string;
  }

  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface RegisterRequest {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cin: string;
    nationality: string;
    role: string;
  }
