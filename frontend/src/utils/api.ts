const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export interface SendCodeResponse {
  success: boolean;
  message: string;
}

export interface VerifyCodeResponse {
  success: boolean;
  message: string;
  user?: {
    phone: string;
  };
}

export interface ResendCodeResponse {
  success: boolean;
  message: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Произошла неизвестная ошибка');
    }
  }

  async sendCode(phone: string): Promise<SendCodeResponse> {
    return this.request<SendCodeResponse>('/auth/send-code', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  }

  async verifyCode(phone: string, code: string): Promise<VerifyCodeResponse> {
    return this.request<VerifyCodeResponse>('/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    });
  }

  async resendCode(phone: string): Promise<ResendCodeResponse> {
    return this.request<ResendCodeResponse>('/auth/resend-code', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
