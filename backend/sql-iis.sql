/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 13.5 		*/
/*  Created On : 26-nov-2019 22:29:31 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0
;

/* Drop Tables */

DROP TABLE IF EXISTS `Hrac` CASCADE
;

DROP TABLE IF EXISTS `hrac_hra_v_time` CASCADE
;

DROP TABLE IF EXISTS `hrac_hra_v_zapase` CASCADE
;

DROP TABLE IF EXISTS `hrac_chce_hrat` CASCADE
;

DROP TABLE IF EXISTS `Podmienky_turnaja` CASCADE
;

DROP TABLE IF EXISTS `Rozhodca` CASCADE
;

DROP TABLE IF EXISTS `rozhoduje_turnaj` CASCADE
;

DROP TABLE IF EXISTS `Stav_zapasu` CASCADE
;

DROP TABLE IF EXISTS `Tim` CASCADE
;

DROP TABLE IF EXISTS `tim_hra_v_zapase` CASCADE
;

DROP TABLE IF EXISTS `tim_chce_hrat` CASCADE
;

DROP TABLE IF EXISTS `Turnaj` CASCADE
;

DROP TABLE IF EXISTS `Usporiadatel` CASCADE
;

DROP TABLE IF EXISTS `Uzivatel` CASCADE
;

DROP TABLE IF EXISTS `Zapas` CASCADE
;

/* Create Tables */

CREATE TABLE `Hrac`
(
	`HracID` int NOT NULL AUTO_INCREMENT,
	`Odohrane_zapasy` int,
	`Pocet_vyhier` int,
	`Fotka` varchar(100),
    `UzivatelID` int NOT NULL,
	CONSTRAINT `PK_Hrac` PRIMARY KEY (`HracID` ASC)
)

;

CREATE TABLE `hrac_hra_v_time`
(
	`HracID` int NOT NULL,
	`TimID` int NOT NULL
)

;

CREATE TABLE `hrac_hra_v_zapase`
(
	`ZapasID` int NOT NULL,
	`HracID` int NOT NULL
)

;

CREATE TABLE `hrac_chce_hrat`
(
	`TurnajID` int NOT NULL,
	`HracID` int NOT NULL
)

;

CREATE TABLE `Podmienky_turnaja`
(
	`Podmienky_turnajaID` int NOT NULL AUTO_INCREMENT,
	`Minimalny_vek_hracov` varchar(100),
	`Pocet_hracov_v_tyme` int,
	`Pocet_tymov` int,
	`Registracny_poplatok` varchar(50),
	`Druh_hry` varchar(50),
	CONSTRAINT `PK_Podmienky_turnaja` PRIMARY KEY (`Podmienky_turnajaID` ASC)
)

;

CREATE TABLE `Rozhodca`
(
	`RozhodcaID` int NOT NULL AUTO_INCREMENT,
    `Typ` varchar(50),
	`UzivatelID` int NOT NULL,
	CONSTRAINT `PK_Rozhodca` PRIMARY KEY (`RozhodcaID` ASC)
)

;

CREATE TABLE `rozhoduje_turnaj`
(
	`TurnajID` int NOT NULL,
	`RozhodcaID` int NOT NULL
)

;

CREATE TABLE `Stav_zapasu`
(
	`Stav_zapasuID` int NOT NULL AUTO_INCREMENT,
	`Ziskane_sety` int,
	`Ziskane_gemy` int,
	`Ziskane_vymeny` int,
	`HracID` int,
	`TimID` int,
    `ZapasID` int NOT NULL,
	CONSTRAINT `PK_Stav_zapasu` PRIMARY KEY (`Stav_zapasuID` ASC)
)

;

CREATE TABLE `Tim`
(
	`TimID` int NOT NULL AUTO_INCREMENT,
    `Nazov` varchar(100),
	`Logo` varchar(100),
	`Pocet_hracov` int,
    `Odohrane_zapasy` int,
	`Pocet_vyhier` int,
	CONSTRAINT `PK_Tim` PRIMARY KEY (`TimID` ASC)
)

;

CREATE TABLE `tim_hra_v_zapase`
(
	`ZapasID` int NOT NULL,
	`TimID` int NOT NULL
)

;

CREATE TABLE `tim_chce_hrat`
(
	`TurnajID` int NOT NULL,
	`TimID` int NOT NULL
)

;

CREATE TABLE `Turnaj`
(
	`TurnajID` int NOT NULL AUTO_INCREMENT,
    `Nazov` varchar(100),
    `Zaciatok` date,
	`Koniec` date,
	`Vyhra` varchar(50),
	`Sponzori` varchar(100),
    `Povrch` varchar(50),
	`Podmienky_turnajaID` int NOT NULL,
	`UsporiadatelID`int NOT NULL,
	CONSTRAINT `PK_Turnaj` PRIMARY KEY (`TurnajID` ASC)
)

;

CREATE TABLE `Usporiadatel`
(
	`UsporiadatelID` int NOT NULL AUTO_INCREMENT,
	`Organizacia` varchar(100),
	`UzivatelID` int NOT NULL,
	CONSTRAINT `PK_Usporiadatel` PRIMARY KEY (`UsporiadatelID` ASC)
)

;

CREATE TABLE `Uzivatel`
(
	`UzivatelID` int NOT NULL AUTO_INCREMENT,
    `Meno` varchar(50),
	`Priezvisko` varchar(50),
    `Vek` int,
    `Email` varchar(50),
    `Login` varchar(50),
	`Heslo` varchar(50),
	`Typ` varchar(50),
	CONSTRAINT `PK_Uzivatel` PRIMARY KEY (`UzivatelID` ASC)
)

;

CREATE TABLE `Zapas`
(
	`ZapasID` int NOT NULL AUTO_INCREMENT,
	`Nazov` varchar(50),
    `Miesto` varchar(50),
    `Datum` varchar(50),
	`Vyherca` int,
	`Uroven_zapasu` int,
    `Stav` varchar(50),
	`TurnajID` int NOT NULL,
	CONSTRAINT `PK_Zapas` PRIMARY KEY (`ZapasID` ASC)
)

;



/* Create Foreign Key Constraints */

ALTER TABLE `Hrac`
 ADD CONSTRAINT `FK_Hrac_je_hrac`
	FOREIGN KEY (`UzivatelID`) REFERENCES `Uzivatel` (`UzivatelID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `hrac_hra_v_time`
 ADD CONSTRAINT `FK_hrac_hra_v_time_Hrac`
	FOREIGN KEY (`HracID`) REFERENCES `Hrac` (`HracID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `hrac_hra_v_time`
 ADD CONSTRAINT `FK_hrac_hra_v_time_Tim`
	FOREIGN KEY (`TimID`) REFERENCES `Tim` (`TimID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `hrac_hra_v_zapase`
 ADD CONSTRAINT `FK_hrac_hra_v_zapase_Zapas`
	FOREIGN KEY (`ZapasID`) REFERENCES `Zapas` (`ZapasID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `hrac_hra_v_zapase`
 ADD CONSTRAINT `FK_hrac_hra_v_zapase_Hrac`
	FOREIGN KEY (`HracID`) REFERENCES `Hrac` (`HracID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `hrac_chce_hrat`
 ADD CONSTRAINT `FK_hrac_chce_hrat_Turnaj`
	FOREIGN KEY (`TurnajID`) REFERENCES `Turnaj` (`TurnajID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `hrac_chce_hrat`
 ADD CONSTRAINT `FK_hrac_chce_hrat_Hrac`
	FOREIGN KEY (`HracID`) REFERENCES `Hrac` (`HracID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Rozhodca`
 ADD CONSTRAINT `FK_Rozhodca_je_rozhodca`
	FOREIGN KEY (`UzivatelID`) REFERENCES `Uzivatel` (`UzivatelID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `rozhoduje_turnaj`
 ADD CONSTRAINT `FK_rozhoduje_turnaj_Turnaj`
	FOREIGN KEY (`TurnajID`) REFERENCES `Turnaj` (`TurnajID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `rozhoduje_turnaj`
 ADD CONSTRAINT `FK_rozhoduje_turnaj_Rozhodca`
	FOREIGN KEY (`RozhodcaID`) REFERENCES `Rozhodca` (`RozhodcaID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Stav_zapasu`
 ADD CONSTRAINT `FK_Stav_zapasu_hrac_ma_stav`
	FOREIGN KEY (`HracID`) REFERENCES `Hrac` (`HracID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Stav_zapasu`
 ADD CONSTRAINT `FK_Stav_zapasu_tim_ma_stav`
	FOREIGN KEY (`TimID`) REFERENCES `Tim` (`TimID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Stav_zapasu`
 ADD CONSTRAINT `FK_Stav_zapasu_zapas_ma_stav`
	FOREIGN KEY (`ZapasID`) REFERENCES `Zapas` (`ZapasID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `tim_hra_v_zapase`
 ADD CONSTRAINT `FK_tim_hra_v_zapase_Zapas`
	FOREIGN KEY (`ZapasID`) REFERENCES `Zapas` (`ZapasID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `tim_hra_v_zapase`
 ADD CONSTRAINT `FK_tim_hra_v_zapase_Tim`
	FOREIGN KEY (`TimID`) REFERENCES `Tim` (`TimID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `tim_chce_hrat`
 ADD CONSTRAINT `FK_tim_chce_hrat_Turnaj`
	FOREIGN KEY (`TurnajID`) REFERENCES `Turnaj` (`TurnajID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `tim_chce_hrat`
 ADD CONSTRAINT `FK_tim_chce_hrat_Tim`
	FOREIGN KEY (`TimID`) REFERENCES `Tim` (`TimID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Turnaj`
 ADD CONSTRAINT `FK_Turnaj_turnaj_ma_podmienky`
	FOREIGN KEY (`Podmienky_turnajaID`) REFERENCES `Podmienky_turnaja` (`Podmienky_turnajaID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Turnaj`
 ADD CONSTRAINT `FK_Turnaj_usporaduva`
	FOREIGN KEY (`UsporiadatelID`) REFERENCES `Usporiadatel` (`UsporiadatelID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Usporiadatel`
 ADD CONSTRAINT `FK_Usporiadatel_je_usporiadatel`
	FOREIGN KEY (`UzivatelID`) REFERENCES `Uzivatel` (`UzivatelID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Zapas`
 ADD CONSTRAINT `FK_Zapas_sa_odohra`
	FOREIGN KEY (`TurnajID`) REFERENCES `Turnaj` (`TurnajID`) ON DELETE No Action ON UPDATE No Action
;

SET FOREIGN_KEY_CHECKS=1
;


/* Fill tables */

INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Matej", "Makovčík", 34, "makovcik@gmail.com", "matej1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Tomáš", "Majerský", 42, "majersky@gmail.com", "tomas1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Gejza", "Fico", 25, "fico@gmail.com", "gejza1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Robo", "Tomáš", 16, "tomas@gmail.com", "robo1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Marek", "Horvát", 17, "horvat@gmail.com", "marek1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Jozef", "Kandráč", 18, "kandrac@gmail.com", "jozef1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Nikolas", "Nikolev", 16, "nikolev@gmail.com", "nikolas1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Matej", "Hrdý", 20, "hrdy@gmail.com", "matej2", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Daniel", "Malý", 21, "maly@gmail.com", "daniel1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Ján", "Krátky", 19, "kratky@gmail.com", "jan1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Jaroslav", "Kováč", 18, "kovac@gmail.com", "jaroslav1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Ján", "Matovič", 19, "matovic@gmail.com", "jan2", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Marián", "Hlina", 17, "hlina@gmail.com", "marian1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Juraj", "Kotleta", 17, "kotleta@gmail.com", "juraj1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Ján", "Púčik", 25, "pucik@gmail.com", "jan3", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Andrej", "Zeman", 26, "zeman@gmail.com", "andrej1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Martin", "Danko", 24, "danko@gmail.com", "martin1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Alojz", "Marcin", 22, "marcin@gmail.com", "alojz1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Igor", "Bugár", 23, "bugar@gmail.com", "igor1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("František", "Novák", 21, "novak@gmail.com", "frantisek1", "heslo123", "normalny");
INSERT INTO `Uzivatel` (`Meno`, `Priezvisko`, `Vek`, `Email`, `Login`, `Heslo`, `Typ`) VALUES ("Dominik", "Stary", 45, "stary@gmail.com", "dominik1", "heslo123", "admin");

INSERT INTO `Podmienky_turnaja` (`Minimalny_vek_hracov`, `Pocet_hracov_v_tyme`, `Pocet_tymov`, `Registracny_poplatok`, `Druh_hry`) VALUES (16, 2, 10, "10 €", "klasicka");
INSERT INTO `Podmienky_turnaja` (`Minimalny_vek_hracov`, `Pocet_hracov_v_tyme`, `Pocet_tymov`, `Registracny_poplatok`, `Druh_hry`) VALUES (20, 1, 10, "1000 €", "klasicka");
INSERT INTO `Podmienky_turnaja` (`Minimalny_vek_hracov`, `Pocet_hracov_v_tyme`, `Pocet_tymov`, `Registracny_poplatok`, `Druh_hry`) VALUES (16, 2, 10, "15 €", "klasicka");
INSERT INTO `Podmienky_turnaja` (`Minimalny_vek_hracov`, `Pocet_hracov_v_tyme`, `Pocet_tymov`, `Registracny_poplatok`, `Druh_hry`) VALUES (16, 1, 10, "50 €", "klasicka");
INSERT INTO `Podmienky_turnaja` (`Minimalny_vek_hracov`, `Pocet_hracov_v_tyme`, `Pocet_tymov`, `Registracny_poplatok`, `Druh_hry`) VALUES (16, 1, 10, "5 €", "zmiesana");

INSERT INTO `Usporiadatel` (`Organizacia`, `UzivatelID`) VALUES ("Slovenská tenisová asociácia", 1);
INSERT INTO `Usporiadatel` (`Organizacia`, `UzivatelID`) VALUES ("Fyzická osoba", 2);
INSERT INTO `Usporiadatel` (`Organizacia`, `UzivatelID`) VALUES ("Nadačná organizácia zdravie", 3);
INSERT INTO `Usporiadatel` (`Organizacia`, `UzivatelID`) VALUES ("Športový klub Trenčín", 1);
INSERT INTO `Usporiadatel` (`Organizacia`, `UzivatelID`) VALUES ("Nezisková organizácia ROKE", 2);

INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Povrch`, `Podmienky_turnajaID`, `UsporiadatelID`) VALUES ("Okresná liga Trenčín", DATE("2019-06-14"), DATE("2019-08-14"), "125 €", "Mesto Trenčín", "trávnatý", 1, 4);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Povrch`, `Podmienky_turnajaID`, `UsporiadatelID`) VALUES ("Majstrovstvá Slovenska do 20 rokov", DATE("2019-07-20"), DATE("2019-07-30"), "100 000 €", "Mesto Bratislava, SLOVNAFT, ROLEX", "antuka", 2, 1);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Povrch`, `Podmienky_turnajaID`, `UsporiadatelID`) VALUES ("Nadačný turnaj HUGO", DATE("2018-09-10"), DATE("2018-09-10"), "0 €", "TV Markíza, TV JOJ, RadioExpress, Kaufland, IBM", "asfaltový", 3, 3);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Povrch`, `Podmienky_turnajaID`, `UsporiadatelID`) VALUES ("Liga ROKE", DATE("2019-05-05"), DATE("2019-09-06"), "2500 €", "SLOVNAFT, IKEA, ESET", "telocvičňa", 1, 5);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Povrch`, `Podmienky_turnajaID`, `UsporiadatelID`) VALUES ("Priateľský turnaj", DATE("2018-07-14"), DATE("2019-07-17"), "500 €", "Mesto Košice, Rádio Košice, US Steel", "antuka", 2, 2);

INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 4);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 5);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 6);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 7);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 8);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 9);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 10);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 11);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 12);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 13);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 14);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 15);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 16);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 17);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 18);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 19);
INSERT INTO `Hrac` (`Odohrane_zapasy`, `Pocet_vyhier`, `Fotka`, `UzivatelID`) VALUES (0, 0, "../../assets/fotky_hracov/generic.png", 20);

INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("Rýchle šípy", "../../assets/loga_timov/rychle_sipy.jpg", 1, 1, 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("Daemon", "../../assets/loga_timov/daemon.jpg", 1, 0, 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("Team Liquid", "../../assets/loga_timov/team_liquid.png", 1, 0, 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("Fnatic", "../../assets/loga_timov/fnatic.png", 1, 2, 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("G2", "../../assets/loga_timov/g2.png", 1, 3, 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("Adamov", "../../assets/loga_timov/adamov.png", 1, 0, 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("Karči a Lajči", "../../assets/loga_timov/karci_a_lajci.jpg", 1, 0, 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Odohrane_zapasy`, `Pocet_vyhier`, `Pocet_hracov`) VALUES ("Power Rangers", "../../assets/loga_timov/power_rangers.jpg", 1, 1, 2);

INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (1, 1);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (2, 1);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (3, 2);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (4, 2);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (5, 3);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (6, 3);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (7, 4);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (8, 4);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (9, 5);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (10, 5);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (11, 6);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (12, 6);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (13, 7);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (14, 7);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (15, 8);
INSERT INTO `hrac_hra_v_time` (`HracID`, `TimID`) VALUES (16, 8);

INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 1);
INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 2);
INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 3);
INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 4);
INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 5);
INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 6);
INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 7);
INSERT INTO `tim_chce_hrat` (`TurnajID`, `TimID`) VALUES (5, 8);

INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Rýchle šípy vs Daemon", "Trenčianska športová hala", DATE("2019-06-14"), "ukonceny", 1, 1, 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Team Liquid vs Fnatic", "Trenčianska športová hala", DATE("2019-06-21"), "ukonceny", 4, 1, 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("G2 vs Adamov", "Trenčianska športová hala", DATE("2019-06-28"), "ukonceny", 5, 1, 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Karči a Lajči vs Power Rangers", "Trenčianska športová hala", DATE("2019-07-05"), "ukonceny", 8, 1, 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Robo Tomáš vs Jozef Kandráč", "Bratislava športová hala", DATE("2020-07-20"), "planovany", null, 1, 2);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Matej Hrdý vs Ján Krátky", "Bratislava športová hala", DATE("2020-07-20"), "planovany", null, 1, 2);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Ján Matovič vs Juraj Kotleta", "Bratislava športová hala", DATE("2020-07-21"), "planovany", null, 1, 2);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Andrej Zeman vs Alojz Marcin", "Bratislava športová hala", DATE("2020-07-21"), "planovany", null, 1, 2);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Rýchle šípy vs Adamov", "Hala radosť v Košiciach", DATE("2019-12-10"), "prebieha", null, 1, 3);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("G2 vs Fnatic", "Hala radosť v Košiciach", DATE("2019-12-17"), "planovany", null, 1, 3);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("František Novák vs Marek Horvát", "SLOVNAFT hala BA", DATE("2020-05-5"), "planovany", null, 1, 4);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Nikolas Nikolev vs Daniel Malý", "SLOVNAFT hala BA", DATE("2020-05-12"), "planovany", null, 1, 4);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Rýchle šípy vs Fnatic", "Trenčianska športová hala", DATE("2019-07-14"), "ukonceny", 4, 2, 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("G2 vs Power Rangers", "Trenčianska športová hala", DATE("2019-07-21"), "ukonceny", 5, 2, 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Vyherca`, `Uroven_zapasu`, `TurnajID`) VALUES ("Fnatic vs G2", "Trenčianska športová hala", DATE("2019-07-28"), "ukonceny", 5, 3, 1);

INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (1, 1);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (1, 2);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (2, 3);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (2, 4);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (3, 5);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (3, 6);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (4, 7);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (4, 8);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (5, 1);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (5, 3);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (6, 5);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (6, 7);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (7, 9);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (7, 11);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (8, 13);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (8, 15);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (9, 1);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (9, 6);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (10, 5);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (10, 4);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (11, 17);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (11, 2);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (12, 4);
INSERT INTO `hrac_hra_v_zapase` (`ZapasID`, `HracID`) VALUES (12, 6);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (13, 1);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (13, 4);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (14, 5);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (14, 8);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (15, 4);
INSERT INTO `tim_hra_v_zapase` (`ZapasID`, `TimID`) VALUES (15, 5);

INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (2, 6, 0, null, 1, 1);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (1, 3, 0, null, 2, 1);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (1, 5, 0, null, 3, 2);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (2, 6, 0, null, 4, 2);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (2, 6, 0, null, 5, 3);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (0, 3, 0, null, 6, 3);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (1, 3, 0, null, 7, 4);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (2, 6, 0, null, 8, 4);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (1, 5, 45, null, 1, 9);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (0, 4, 30, null, 6, 9);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (1, 5, 0, null, 1, 13);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (2, 3, 0, null, 4, 13);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (0, 3, 0, null, 5, 14);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (2, 6, 0, null, 8, 14);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (1, 5, 45, null, 4, 15);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`, `ZapasID`) VALUES (2, 6, 30, null, 5, 15);

INSERT INTO `Rozhodca` (`Typ`, `UzivatelID`) VALUES ("hlavný", 1);
INSERT INTO `Rozhodca` (`Typ`, `UzivatelID`) VALUES ("hlavný", 2);
INSERT INTO `Rozhodca` (`Typ`, `UzivatelID`) VALUES ("hlavný", 3);

INSERT INTO `rozhoduje_turnaj` (`RozhodcaID`, `TurnajID`) VALUES (3, 1);
INSERT INTO `rozhoduje_turnaj` (`RozhodcaID`, `TurnajID`) VALUES (2, 2);
INSERT INTO `rozhoduje_turnaj` (`RozhodcaID`, `TurnajID`) VALUES (1, 3);
INSERT INTO `rozhoduje_turnaj` (`RozhodcaID`, `TurnajID`) VALUES (2, 4);
INSERT INTO `rozhoduje_turnaj` (`RozhodcaID`, `TurnajID`) VALUES (1, 5);
