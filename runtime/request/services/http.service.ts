import queryString from 'query-string';

type TGetRequestInit = Omit<RequestInit, 'method'> & { query: Record<string, any> };
type TDeleteRequestInit = TGetRequestInit;

type TPostRequestInit = Omit<RequestInit, 'method' | 'body'> & { query: Record<string, any> };
type TPutRequestInit = TPostRequestInit;

export const HTTP_SERVICE_TOKEN = Symbol.for('http');

type THttpServiceConfig = {
  api: {
    baseUrl: string;
  }
}

export interface IHttpService {

  post<T, U>(endpoint: string, body: T, config?: TPostRequestInit): Promise<U>

  get<T>(endpoint: string, config?: TGetRequestInit): Promise<T>

  put<T, U>(endpoint: string, body: T, config?: TPutRequestInit): Promise<U>

  delete <T>(endpoint: string, config?: TDeleteRequestInit): Promise<T>

}

export const createHttpService = (config: THttpServiceConfig): IHttpService => {
  const parseResponse = <T>(response: Response): Promise<T> => {
    const contentType = response.headers.get('Content-Type');

    if (!contentType) {
      throw new Error('HttpService::parseResponse - Content-Type header is missing')
    }

    return contentType.indexOf('application/json') !== -1
      ? response.json()
      : response.text()
  }

  const makeFetchRequest = async <T>(url: string, config: RequestInit = {}): Promise<T> => {
    try {
      const request = new Request(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        ...config
      });
      
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return parseResponse<T>(response);
    } catch (error) {
      throw error;
    }
  }

  const prepareUrl = (endpoint: string, query?: Record<string, any>) => {
    return queryString.stringifyUrl({
      url: `${config.api.baseUrl}${endpoint}`,
      query
    });
  }

  return ({
    async post(endpoint, body, config) {
      return await makeFetchRequest(prepareUrl(endpoint, config?.query), {
        method: 'POST',
        body: JSON.stringify(body),
        ...config,
      });
    },

    async get(endpoint, config) {
      return await makeFetchRequest(prepareUrl(endpoint, config?.query), {
        method: 'GET',
        ...config
      });
    },

    async put(endpoint, body, config){
      return await makeFetchRequest(prepareUrl(endpoint, config?.query), {
        method: 'PUT',
        body: JSON.stringify(body),
        ...config
      })
    },

    async delete(endpoint, config) {
      return await makeFetchRequest(prepareUrl(endpoint, config?.query), {
        method: 'DELETE',
        ...config
      });
    },
  })
}
