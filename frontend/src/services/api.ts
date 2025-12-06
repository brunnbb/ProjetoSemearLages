// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_BASE_URL: string =
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  const config: RequestInit = {
    ...fetchOptions,
    headers,
    credentials: 'include', // Important for httponly cookies
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorMessage = 'Erro ao processar requisição';
    let errorDetails = null;

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
      errorDetails = errorData;
    } catch {
      errorMessage = `Erro ${response.status}: ${response.statusText}`;
    }

    throw new ApiError(response.status, errorMessage, errorDetails);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const api = {
  // Auth endpoints
  async login(email: string, password: string) {
    // Ensure email and password are not formatted incorrectly
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password; // Don't trim password, but ensure it's a string
    
    if (!cleanEmail || !cleanPassword) {
      throw new ApiError(400, 'E-mail e senha são obrigatórios');
    }

    return apiRequest<{ message: string; user_email: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: cleanEmail,
        password: cleanPassword,
      }),
    });
  },

  async logout() {
    return apiRequest<{ message: string }>('/api/auth/logout', {
      method: 'POST',
    });
  },

  async getCurrentUser() {
    return apiRequest<{ email: string; id: number }>('/api/auth/me', {
      requiresAuth: true,
    });
  },

  // News endpoints
  async getNews() {
    return apiRequest<
      Array<{
        id: number;
        title: string;
        excerpt: string;
        content: string;
        date: string;
      }>
    >('/api/news');
  },

  async getNewsItem(id: number) {
    return apiRequest<{
      id: number;
      title: string;
      excerpt: string;
      content: string;
      date: string;
    }>(`/api/news/${id}`);
  },

  async createNews(news: {
    title: string;
    excerpt: string;
    content: string;
    date: string; // Format: YYYY-MM-DD
  }) {
    // Validate and clean data before sending
    const cleanNews = {
      title: news.title.trim(),
      excerpt: news.excerpt.trim(),
      content: news.content.trim(),
      date: news.date, // Ensure format is YYYY-MM-DD
    };

    // Validate required fields
    if (!cleanNews.title || !cleanNews.excerpt || !cleanNews.content) {
      throw new ApiError(400, 'Todos os campos são obrigatórios');
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(cleanNews.date)) {
      throw new ApiError(400, 'Formato de data inválido. Use YYYY-MM-DD');
    }

    return apiRequest<{
      id: number;
      title: string;
      excerpt: string;
      content: string;
      date: string;
    }>('/api/news', {
      method: 'POST',
      body: JSON.stringify(cleanNews),
      requiresAuth: true,
    });
  },

  async updateNews(
    id: number,
    news: {
      title?: string;
      excerpt?: string;
      content?: string;
      date?: string; // Format: YYYY-MM-DD
    }
  ) {
    // Clean and validate data
    const cleanNews: any = {};

    if (news.title !== undefined) {
      cleanNews.title = news.title.trim();
      if (!cleanNews.title) {
        throw new ApiError(400, 'Título não pode estar vazio');
      }
    }

    if (news.excerpt !== undefined) {
      cleanNews.excerpt = news.excerpt.trim();
      if (!cleanNews.excerpt) {
        throw new ApiError(400, 'Resumo não pode estar vazio');
      }
    }

    if (news.content !== undefined) {
      cleanNews.content = news.content.trim();
      if (!cleanNews.content) {
        throw new ApiError(400, 'Conteúdo não pode estar vazio');
      }
    }

    if (news.date !== undefined) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(news.date)) {
        throw new ApiError(400, 'Formato de data inválido. Use YYYY-MM-DD');
      }
      cleanNews.date = news.date;
    }

    return apiRequest<{
      id: number;
      title: string;
      excerpt: string;
      content: string;
      date: string;
    }>(`/api/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cleanNews),
      requiresAuth: true,
    });
  },

  async deleteNews(id: number) {
    return apiRequest<void>(`/api/news/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },
};

export { ApiError };

