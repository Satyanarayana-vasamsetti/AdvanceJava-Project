export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export interface AuthResponse {
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: AuthRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}