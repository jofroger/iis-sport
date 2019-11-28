import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Uzivatel, Hrac, Rozhodca, Usporiadatel, Podmienky_turnaja, Turnaj, Tim, Zapas, Stav_zapasu } from './api.structures'

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

    getUzivatelByLogin(uzivatel: Uzivatel) {
        return this.request('GET', `${environment.serverUrl}/uzivatel/login/${uzivatel.login}`);
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

    /* #region  Hrac API */
    getAllHrac() {
        return this.request('GET', `${environment.serverUrl}/hrac`);
    }

    getHrac(hrac: Hrac) {
        return this.request('GET', `${environment.serverUrl}/hrac/${hrac.id}`);
    }

    createHrac(hrac: Hrac) {
        return this.request('POST', `${environment.serverUrl}/hrac`, hrac);
    }

    updateHrac(hrac: Hrac) {
        return this.request('PUT', `${environment.serverUrl}/hrac/${hrac.id}`, hrac);
    }

    deleteHrac(hrac: Hrac) {
        return this.request('DELETE', `${environment.serverUrl}/hrac/${hrac.id}`);
    }
    /* #endregion */

    /* #region  Usporiadatel API */
    getAllUsporiadatel() {
        return this.request('GET', `${environment.serverUrl}/usporiadatel`);
    }

    getUsporiadatel(usporiadatel: Usporiadatel) {
        return this.request('GET', `${environment.serverUrl}/usporiadatel/${usporiadatel.id}`);
    }

    createUsporiadatel(usporiadatel: Usporiadatel) {
        return this.request('POST', `${environment.serverUrl}/usporiadatel`, usporiadatel);
    }

    updateUsporiadatel(usporiadatel: Usporiadatel) {
        return this.request('PUT', `${environment.serverUrl}/usporiadatel/${usporiadatel.id}`, usporiadatel);
    }

    deleteUsporiadatel(usporiadatel: Usporiadatel) {
        return this.request('DELETE', `${environment.serverUrl}/usporiadatel/${usporiadatel.id}`);
    }
    /* #endregion */

    /* #region  Rozhodca API */
    getAllRozhodca() {
        return this.request('GET', `${environment.serverUrl}/rozhodca`);
    }

    getRozhodca(rozhodca: Rozhodca) {
        return this.request('GET', `${environment.serverUrl}/rozhodca/${rozhodca.id}`);
    }

    createRozhodca(rozhodca: Rozhodca) {
        return this.request('POST', `${environment.serverUrl}/rozhodca`, rozhodca);
    }

    updateRozhodca(rozhodca: Rozhodca) {
        return this.request('PUT', `${environment.serverUrl}/rozhodca/${rozhodca.id}`, rozhodca);
    }

    deleteRozhodca(rozhodca: Rozhodca) {
        return this.request('DELETE', `${environment.serverUrl}/rozhodca/${rozhodca.id}`);
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

    /* #region  Stav_zapasu API */
    getAllStav_zapasu() {
        return this.request('GET', `${environment.serverUrl}/stav_zapasu`);
    }

    getStav_zapasu(stav_zapasu: Stav_zapasu) {
        return this.request('GET', `${environment.serverUrl}/stav_zapasu/${stav_zapasu.id}`);
    }

    createStav_zapasu(stav_zapasu: Stav_zapasu) {
        return this.request('POST', `${environment.serverUrl}/stav_zapasu`, stav_zapasu);
    }

    updateStav_zapasu(stav_zapasu: Stav_zapasu) {
        return this.request('PUT', `${environment.serverUrl}/stav_zapasu/${stav_zapasu.id}`, stav_zapasu);
    }

    deleteStav_zapasu(stav_zapasu: Stav_zapasu) {
        return this.request('DELETE', `${environment.serverUrl}/stav_zapasu/${stav_zapasu.id}`);
    }
    /* #endregion */


    /* #region hrac_hra_v_time */
    getTimByHrac(hrac: Hrac) {
        return this.request('GET', `${environment.serverUrl}/hrac_hra_v_time/hrac/${hrac.id}`);
    }

    getHracByTim(tim: Tim) {
        return this.request('GET', `${environment.serverUrl}/hrac_hra_v_time/tim/${tim.id}`);
    }

    createHrac_hra_v_time(hrac: Hrac, tim: Tim) {
        return this.request('POST', `${environment.serverUrl}/hrac_hra_v_time`, {"HracID": hrac.id, "TimID": tim.id});
    }

    deleteHrac_hra_v_time(hrac: Hrac, tim: Tim) {
        return this.request('DELETE', `${environment.serverUrl}/hrac_hra_v_time/${hrac.id}&${tim.id}`);
    }
    /* #endregion */

    /* #region tim_chce_hrat */
    getTurnajByTim(turnaj: Turnaj) {
        return this.request('GET', `${environment.serverUrl}/tim_chce_hrat/turnaj/${turnaj.id}`);
    }

    getTimByTurnaj(tim: Tim) {
        return this.request('GET', `${environment.serverUrl}/tim_chce_hrat/tim/${tim.id}`);
    }

    createTim_chce_hrat(turnaj: Turnaj, tim: Tim) {
        return this.request('POST', `${environment.serverUrl}/tim_chce_hrat`, {"TurnajID": turnaj.id, "TimID": tim.id});
    }

    deleteTim_chce_hrat(turnaj: Turnaj, tim: Tim) {
        return this.request('DELETE', `${environment.serverUrl}/tim_chce_hrat/${turnaj.id}&${tim.id}`);
    }
    /* #endregion */

    /* #region hrac_chce_hrat */
    getHracByTurnaj(turnaj: Turnaj) {
        return this.request('GET', `${environment.serverUrl}/hrac_chce_hrat/turnaj/${turnaj.id}`);
    }

    getTurnajByHrac(hrac: Hrac) {
        return this.request('GET', `${environment.serverUrl}/hrac_chce_hrat/hrac/${hrac.id}`);
    }

    createHrac_chce_hrat(turnaj: Turnaj, hrac: Hrac) {
        return this.request('POST', `${environment.serverUrl}/hrac_chce_hrat`, {"TurnajID": turnaj.id, "HracID": hrac.id});
    }

    deleteHrac_chce_hrat(turnaj: Turnaj, hrac: Hrac) {
        return this.request('DELETE', `${environment.serverUrl}/hrac_chce_hrat/${turnaj.id}&${hrac.id}`);
    }
    /* #endregion */

    /* #region tim_hra_v_zapase */
    getTimByZapas(zapas: Zapas) {
        return this.request('GET', `${environment.serverUrl}/tim_hra_v_zapase/zapas/${zapas.id}`);
    }

    getZapasByTim(tim: Tim) {
        return this.request('GET', `${environment.serverUrl}/tim_hra_v_zapase/tim/${tim.id}`);
    }

    createTim_hra_v_zapase(zapas: Zapas, tim: Tim) {
        return this.request('POST', `${environment.serverUrl}/tim_hra_v_zapase`, {"ZapasID": zapas.id, "Tim": tim.id});
    }

    deleteTim_hra_v_zapase(zapas: Zapas, tim: Tim) {
        return this.request('DELETE', `${environment.serverUrl}/tim_hra_v_zapase/${zapas.id}&${tim.id}`);
    }
    /* #endregion */

    /* #region hrac_hra_v_zapase */
    getHracByZapas(zapas: Zapas) {
        return this.request('GET', `${environment.serverUrl}/hrac_hra_v_zapase/zapas/${zapas.id}`);
    }

    getZapasByHrac(hrac: Hrac) {
        return this.request('GET', `${environment.serverUrl}/hrac_hra_v_zapase/hrac/${hrac.id}`);
    }

    createHrac_hra_v_zapase(zapas: Zapas, hrac: Hrac) {
        return this.request('POST', `${environment.serverUrl}/hrac_hra_v_zapase`, {"ZapasID": zapas.id, "HracID": hrac.id});
    }

    deleteHrac_hra_v_zapase(zapas: Zapas, hrac: Hrac) {
        return this.request('DELETE', `${environment.serverUrl}/hrac_hra_v_zapase/${zapas.id}&${hrac.id}`);
    }
    /* #endregion */


    /* #region rozhoduje_turnaj */
    getRozhodcaByTurnaj(turnaj: Turnaj) {
        return this.request('GET', `${environment.serverUrl}/rozhoduje_turnaj/turnaj/${turnaj.id}`);
    }

    getTurnajByRozhodca(rozhodca: Rozhodca) {
        return this.request('GET', `${environment.serverUrl}/rozhoduje_turnaj/rozhodca/${rozhodca.id}`);
    }

    createRozhoduje_turnaj(turnaj: Turnaj, rozhodca: Rozhodca) {
        return this.request('POST', `${environment.serverUrl}/rozhoduje_turnaj`, {"TurnajID": turnaj.id, "RozhodcaID": rozhodca.id});
    }

    deleteRozhoduje_turnaj(turnaj: Turnaj, rozhodca: Rozhodca) {
        return this.request('DELETE', `${environment.serverUrl}/rozhoduje_turnaj/${turnaj.id}&${rozhodca.id}`);
    }
    /* #endregion */
}
