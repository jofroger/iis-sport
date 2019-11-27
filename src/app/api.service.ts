import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Uzivatel, Podmienky_turnaja, Turnaj, Tim, Zapas } from './api.structures'

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


    /* #region  Uzivatel API */
    getAllUzivatel() {
        return this.request('GET', `${environment.serverUrl}/uzivatel`);
    }

    getUzivatel(uzivatel: Uzivatel) {
        return this.request('GET', `${environment.serverUrl}/uzivatel/${uzivatel.id}`);
    }

    createUzivatel(uzivatel: Uzivatel) {
        return this.request('POST', `${environment.serverUrl}/uzivatel`, uzivatel);
    }

    updateUzivatel(uzivatel: Uzivatel) {
        return this.request('PUT', `${environment.serverUrl}/uzivatel/${uzivatel.id}`, uzivatel);
    }

    deleteUzivatel(uzivatel: Uzivatel) {
        return this.request('DELETE', `${environment.serverUrl}/uzivatel/${uzivatel.id}`);
    }
    /* #endregion */

    /* #region  Podmienky_turnaja API */
    getAllPodmienky_turnaja() {
        return this.request('GET', `${environment.serverUrl}/podmienky_turnaja`);
    }

    getPodmienky_turnaja(podmienky: Podmienky_turnaja) {
        return this.request('GET', `${environment.serverUrl}/podmienky_turnaja/${podmienky.id}`);
    }

    createPodmienky_turnaja(podmienky: Podmienky_turnaja) {
        return this.request('POST', `${environment.serverUrl}/podmienky_turnaja`, podmienky);
    }

    updatePodmienky_turnaja(podmienky: Podmienky_turnaja) {
        return this.request('PUT', `${environment.serverUrl}/podmienky_turnaja/${podmienky.id}`, podmienky);
    }

    deletePodmienky_turnaja(podmienky: Podmienky_turnaja) {
        return this.request('DELETE', `${environment.serverUrl}/podmienky_turnaja/${podmienky.id}`);
    }
    /* #endregion */

    /* #region  Turnaj API */
    getAllTurnaj() {
        return this.request('GET', `${environment.serverUrl}/turnaj`);
    }

    getTurnaj(turnaj: Turnaj) {
        return this.request('GET', `${environment.serverUrl}/turnaj/${turnaj.id}`);
    }

    createTurnaj(turnaj: Turnaj) {
        return this.request('POST', `${environment.serverUrl}/turnaj`, turnaj);
    }

    updateTurnaj(turnaj: Turnaj) {
        return this.request('PUT', `${environment.serverUrl}/turnaj/${turnaj.id}`, turnaj);
    }

    deleteTurnaj(turnaj: Turnaj) {
        return this.request('DELETE', `${environment.serverUrl}/turnaj/${turnaj.id}`);
    }
    /* #endregion */

    /* #region  Tim API */
    getAllTim() {
        return this.request('GET', `${environment.serverUrl}/tim`);
    }

    getTim(tim: Tim) {
        return this.request('GET', `${environment.serverUrl}/tim/${tim.id}`);
    }

    createTim(tim: Tim) {
        return this.request('POST', `${environment.serverUrl}/tim`, tim);
    }

    updateTim(tim: Tim) {
        return this.request('PUT', `${environment.serverUrl}/tim/${tim.id}`, tim);
    }

    deleteTim(tim: Tim) {
        return this.request('DELETE', `${environment.serverUrl}/tim/${tim.id}`);
    }
    /* #endregion */

    /* #region  Zapas API */
    getAllZapas() {
        return this.request('GET', `${environment.serverUrl}/zapas`);
    }

    getZapas(zapas: Zapas) {
        return this.request('GET', `${environment.serverUrl}/zapas/${zapas.id}`);
    }

    createZapas(zapas: Zapas) {
        return this.request('POST', `${environment.serverUrl}/zapas`, zapas);
    }

    updateZapas(zapas: Zapas) {
        return this.request('PUT', `${environment.serverUrl}/zapas/${zapas.id}`, zapas);
    }

    deleteZapas(zapas: Zapas) {
        return this.request('DELETE', `${environment.serverUrl}/zapas/${zapas.id}`);
    }
    /* #endregion */

    getTimByUzivatel(uzivatel : Uzivatel) {
        return this.request('GET', `${environment.serverUrl}/hra_v/uzivatel/${uzivatel.id}`);
    }
}
