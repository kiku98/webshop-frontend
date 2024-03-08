import { Injectable } from '@angular/core';

import { backend_url } from '../CONFIG';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor() {}

  async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }

  async handleRequest(
    sub_url: string,
    method: string,
    data?: string,
  ): Promise<any> {
    const complete_url = backend_url + sub_url;
    try {
      const response = await fetch(complete_url, { method, body: data });
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`Error at ${method} request:`, error);
      throw error;
    }
  }

  async getData(sub_url: string): Promise<any> {
    return await this.handleRequest(sub_url, 'GET');
  }

  async postData(sub_url: string, data: string): Promise<any> {
    return await this.handleRequest(sub_url, 'POST', data);
  }

  async deleteData(sub_url: string, data: string): Promise<void> {
    await this.handleRequest(sub_url, 'DELETE', data);
  }
}
