import { Injectable } from '@angular/core';

import { backend_url } from '../CONFIG';
import { RestResponse } from '../interfaces/rest-response.interface';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor() {}

  // TODO: As soon as the backend is finished don't ignore the errors
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IGNORE_NETWORK_ERRORS = true;

  async handleResponse(response: Response): Promise<any> {
    if (!response.ok || response.status === 400) {
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
      const response = await fetch(complete_url, {
        method: method,
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        },
        body: data,
      });
      return await this.handleResponse(response);
    } catch (error) {
      if (!this.IGNORE_NETWORK_ERRORS) {
        console.error(`Error at ${method} request:`, error);
      }
      throw error;
    }
  }

  async getData(sub_url: string): Promise<RestResponse> {
    return await this.handleRequest(sub_url, 'GET');
  }

  async postData(sub_url: string, data: string): Promise<RestResponse> {
    return await this.handleRequest(sub_url, 'POST', data);
  }

  async deleteData(sub_url: string, data: string): Promise<RestResponse> {
    return await this.handleRequest(sub_url, 'DELETE', data);
  }
}
