export interface Uzivatel {
    id: Number
    meno: String
    priezvisko: String
    vek: Number
    email: String
    login: String
    heslo: String
    typ: String
}

export interface Hrac {
    id: Number
    odohrane_zapasy: String
    pocet_vyhier: Number
    fotka: String
    uzivatelID: Number
}

export interface Rozhodca {
    id: Number
    typ: String
    uzivatelID: Number
}

export interface Usporiadatel {
    id: Number
    organizacia: String
    uzivatelID: Number
}

export interface Turnaj {
    id: Number
    nazov: String
    zaciatok: Date
    koniec: Date
    vyhra: String
    sponzori: String
    povrch: String
    podmienky_turnajaID : Number
    uzivatelID: Number
}

export interface Podmienky_turnaja {
    id: Number
    minimalny_vek_hracov: Number
    pocet_hracov_v_tyme: Number
    pocet_tymov: Number
    registracny_poplatok: String
    druh_hry: String
}

export interface Tim {
    id: Number
    nazov: String
    logo: String
    pocet_hracov: Number
    odohrane_zapasy : Number
    pocet_vyhier : Number
}

export interface Zapas {
    id: Number
    nazov: String
    miesto: String
    datum: Date
    stav: String
    turnajID: Number
    stav_zapasuID: Number
}

export interface Stav_zapasu {
    id: Number
    ziskane_sety: Number
    ziskane_gemy: Number
    ziskane_vymeny: Number
    hracID: Number
    timID: Number
    zapasID: Number
}
