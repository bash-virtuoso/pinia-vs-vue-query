import { Page } from './model/Page'
import { Todo, TodoTemplate } from './model/Todo'

export interface APIOptions {
  baseURL: string
}

export class API {
  constructor(private readonly options: Readonly<APIOptions>) {}

  async probe(): Promise<{ time: string }> {
    return this.#get('/probe')
  }

  todos = {
    list: async (): Promise<Page<Todo>> => this.#get('/todos'),
    create: async (todo: TodoTemplate): Promise<Todo> =>
      this.#post('/todos', { body: JSON.stringify([todo]) }),
    update: async (todo: Todo): Promise<Todo> =>
      this.#put(`/todos/${todo._uuid}`, { body: JSON.stringify(todo) }),
  }

  async #get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.#request('GET', path, init)
  }

  async #post<T>(path: string, init?: RequestInit): Promise<T> {
    return this.#request('POST', path, init)
  }

  async #put<T>(path: string, init?: RequestInit): Promise<T> {
    return this.#request('PUT', path, init)
  }

  async #request<T>(method: string, path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.options.baseURL}${path}`, {
      ...init,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })
    return response.json()
  }
}
