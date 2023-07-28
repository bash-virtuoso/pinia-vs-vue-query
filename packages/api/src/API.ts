export interface APIOptions {
  baseURL: string
}

export class API {
  constructor(private readonly options: Readonly<APIOptions>) {}

  async probe(): Promise<{ time: string }> {
    return this.#get('/probe')
  }

  async #get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.#request('GET', path, init)
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
