import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Uzivatel } from './api.structures'

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
    constructor(private http: HttpClient) {
    }

    private async request(method: string, url: string, data?: any) {
        const result = this.http.request(method, url, {
            body: data,
            responseType: 'json',
            observe: 'body'
          });
        return new Promise((resolve, reject) => {
            result.subscribe(resolve, reject);
          });
    }




    getAllUzivatel() {
        return this.request('GET', `${environment.serverUrl}/uzivatel`);
    }

    getUzivatel(uzivatel : Uzivatel) {
        return this.request('GET', `${environment.serverUrl}/uzivatel/${uzivatel.id}`);
    }

    createUzivatel(uzivatel : Uzivatel) {
        return this.request('POST', `${environment.serverUrl}/uzivatel`, uzivatel);
    }

    updateUzivatel(uzivatel : Uzivatel) {
        return this.request('PUT', `${environment.serverUrl}/uzivatel/${uzivatel.id}`, uzivatel);
    }

    deleteUzivatel(uzivatel : Uzivatel) {
        return this.request('DELETE', `${environment.serverUrl}/uzivatel/${uzivatel.id}`);
    }
}