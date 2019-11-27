export interface Uzivatel {
    id: Number
    meno: String
    priezvisko: String
    vek: Number
    email: String
    login: String
    heslo: String
}

export interface Turnaj {
    id: Number
    nazov: String
    zaciatok: Date
    koniec: Date
    vyhra: String
    sponzori: String
    podmienky_turnajaID : Number
    uzivatelID: Number
}

export interface Podmienky_turnaja {
    id: Number
    minimalny_vek_hracov: Number
    pocet_hracov_v_tyme: Number
    pocet_tymov: Number
    registracny_poplatok: String
}

export interface Tim {
    id: Number
    nazov: String
    logo: String
    pocet_hracov: Number
}

export interface Zapas {
    id: Number
    nazov: String
    miesto: String
    datum: Date
    turnajID: Number
}
