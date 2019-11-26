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

DROP TABLE IF EXISTS `chce_hrat` CASCADE
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

CREATE TABLE `chce_hrat`
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

INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES ("Rýchle šípy vs Daemon", "Trenčianska športová hala", DATE("2019-06-14"), "ukončený", 0, 0, 1, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES ("Team Liquid vs Fnatic", "Trenčianska športová hala", DATE("2019-06-21"), "ukončený", 0, 0, 1, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES ("G2 vs Adamov", "Trenčianska športová hala", DATE("2019-06-28"), "ukončený", 0, 0, 1, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES ("Karči a Lajči vs Power Rangers", "Trenčianska športová hala", DATE("2019-07-05"), "ukončený", 0, 0, 1, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES (" vs ", "Bratislava športová hala", DATE("2020-07-20"), "plánovaný", 0, 0, 2, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES (" vs ", "Bratislava športová hala", DATE("2020-07-20"), "plánovaný", 0, 0, 2, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES (" vs ", "Bratislava športová hala", DATE("2020-07-21"), "plánovaný", 0, 0, 2, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES (" vs ", "Bratislava športová hala", DATE("2020-07-21"), "plánovaný", 0, 0, 2, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES ("Rýchle šípy vs Adamov", "Hala radosť v Košiciach", DATE("2019-12-10"), "prebieha", 0, 0, 3, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES ("G2 vs Fnatic", "Hala radosť v Košiciach", DATE("2019-12-17"), "plánovaný", 0, 0, 3, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES (" vs ", "SLOVNAFT hala BA", DATE("2020-05-5"), "plánovaný", 0, 0, 4, null);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `Stav`, `Set`, `Gem`, `TurnajID`, `Stav_zapasuID`) VALUES (" vs ", "SLOVNAFT hala BA", DATE("2020-05-12"), "plánovaný", 0, 0, 4, null);

INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (2, 6, 0, null, 1);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (1, 3, 0, null, 2);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (1, 5, 0, null, 3);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (2, 6, 0, null, 4);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (2, 6, 0, null, 5);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (0, 3, 0, null, 6);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (1, 3, 0, null, 7);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (2, 6, 0, null, 8);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (1, 5, 45, null, 1);
INSERT INTO `Stav_zapasu` (`Ziskane_sety`, `Ziskane_gemy`, `Ziskane_vymeny`, `HracID`, `TimID`) VALUES (0, 4, 30, null, 6);
CREATE TABLE `Tim`
(
	`TimID` int NOT NULL AUTO_INCREMENT,
    `Nazov` varchar(100),
	`Logo` varchar(100),
	`Pocet_hracov` int,
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
    `Datum` date,
    `Stav` varchar(50),
	`Set` int,
	`Gem` int,
	`TurnajID` int NOT NULL,
	`Stav_zapasuID` int NOT NULL,
	CONSTRAINT `PK_Zapas` PRIMARY KEY (`ZapasID` ASC)
)

;

/* Create Foreign Key Constraints */

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

ALTER TABLE `chce_hrat` 
 ADD CONSTRAINT `FK_chce_hrat_Turnaj`
	FOREIGN KEY (`TurnajID`) REFERENCES `Turnaj` (`TurnajID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `chce_hrat` 
 ADD CONSTRAINT `FK_chce_hrat_Hrac`
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

ALTER TABLE `Uzivatel` 
 ADD CONSTRAINT `FK_Uzivatel_je_hrac`
	FOREIGN KEY (`HracID`) REFERENCES `Hrac` (`HracID`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `Zapas` 
 ADD CONSTRAINT `FK_Zapas_zapas_ma_stav`
	FOREIGN KEY (`Stav_zapasuID`) REFERENCES `Stav_zapasu` (`Stav_zapasuID`) ON DELETE No Action ON UPDATE No Action
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

INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Podmienky_turnajaID`, `UzivatelID`) VALUES ("Okresná liga Trenčín", DATE("2019-06-14"), DATE("2019-08-14"), "125 €", "Mesto Trenčín", 1, 1);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Podmienky_turnajaID`, `UzivatelID`) VALUES ("Majstrovstvá Slovenska do 20 rokov", DATE("2019-07-20"), DATE("2019-07-30"), "100 000 €", "Mesto Bratislava, SLOVNAFT, ROLEX", 2, 2);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Podmienky_turnajaID`, `UzivatelID`) VALUES ("Nadačný turnaj HUGO", DATE("2018-09-10"), DATE("2018-09-10"), "0 €", "TV Markíza, TV JOJ, RadioExpress, Kaufland, IBM", 3, 3);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Podmienky_turnajaID`, `UzivatelID`) VALUES ("Liga ROKE", DATE("2019-05-05"), DATE("2019-09-06"), "2500 €", "SLOVNAFT, IKEA, ESET", 1, 4);
INSERT INTO `Turnaj` (`Nazov`, `Zaciatok`, `Koniec`, `Vyhra`, `Sponzori`, `Podmienky_turnajaID`, `UzivatelID`) VALUES ("Priateľský turnaj", DATE("2018-07-14"), DATE("2019-07-17"), "500 €", "Mesto Košice, Rádio Košice, US Steel", 2, 5);

INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Rýchle šípy", "cesta", 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Daemon", "cesta", 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Team Liquid", "cesta", 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Fnatic", "cesta", 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("G2", "cesta", 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Adamov", "cesta", 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Karči a Lajči", "cesta", 2);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Power Rangers", "cesta", 2);
/*
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("FPX", "cesta", 1);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("TSM", "cesta", 1);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Spread Love", "cesta", 1);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Unicorns", "cesta", 1);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Ugly Horses", "cesta", 1);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Small Jack", "cesta", 1);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Pea", "cesta", 1);
INSERT INTO `Tim` (`Nazov`, `Logo`, `Pocet_hracov`) VALUES ("Excalibur", "cesta", 1);
*/

INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (4, 1);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (5, 1);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (6, 2);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (7, 2);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (8, 3);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (9, 3);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (10, 4);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (11, 4);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (12, 5);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (13, 5);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (14, 6);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (15, 6);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (16, 7);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (17, 7);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (18, 8);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (19, 8);
/*
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (20, 9);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (4, 10);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (6, 11);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (8, 12);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (10, 13);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (12, 14);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (14, 15);
INSERT INTO `hra_v` (`UzivatelID`, `TimID`) VALUES (16, 16);
*/

INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Rýchle šípy vs Daemon", "Trenčianska športová hala", DATE("2019-06-14"), 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Team Liquid vs Fnatic", "Trenčianska športová hala", DATE("2019-06-21"), 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("G2 vs Adamov", "Trenčianska športová hala", DATE("2019-06-28"), 1);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Karči a Lajči vs Power Rangers", "Trenčianska športová hala", DATE("2019-07-05"), 1);

INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("FPX vs TSM", "Bratislava športová hala", DATE("2019-07-20"), 2);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Spread Love vs Unicorns", "Bratislava športová hala", DATE("2019-07-20"), 2);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Ugly Horses vs Small Jack", "Bratislava športová hala", DATE("2019-07-21"), 2);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Pea vs Excalibur", "Bratislava športová hala", DATE("2019-07-21"), 2);

INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Rýchle šípy vs Adamov", "Hala radosť v Košiciach", DATE("2019-09-10"), 3);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("G2 vs Fnatic", "Hala radosť v Košiciach", DATE("2019-09-10"), 3);

INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("FPX vs Unicorns", "SLOVNAFT hala BA", DATE("2019-05-5"), 4);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("TSM vs Spread Love", "SLOVNAFT hala BA", DATE("2019-05-12"), 4);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Unicorns vs TSM", "SLOVNAFT hala BA", DATE("2019-07-14"), 5);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Ugly Horses vs FPX", "SLOVNAFT hala BA", DATE("2019-07-14"), 5);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Small Jack vs Spread Love", "SLOVNAFT hala BA", DATE("2019-07-15"), 5);
INSERT INTO `Zapas` (`Nazov`, `Miesto`, `Datum`, `TurnajID`) VALUES ("Pea vs Excalibur", "SLOVNAFT hala BA", DATE("2019-07-15"), 5);

INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (1, 1);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (1, 2);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (2, 3);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (2, 4);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (3, 5);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (3, 6);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (4, 7);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (4, 8);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (5, 9);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (5, 10);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (6, 11);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (6, 12);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (7, 13);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (7, 4);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (8, 15);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (8, 16);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (9, 1);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (9, 6);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (10, 5);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (10, 4);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (11, 9);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (11, 12);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (12, 10);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (12, 11);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (13, 12);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (13, 10);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (14, 13);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (14, 9);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (15, 14);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (15, 11);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (16, 15);
INSERT INTO `sa_zucastni` (`ZapasID`, `TimID`) VALUES (16, 16);

INSERT INTO `rozhoduje_na` (`UzivatelID`, `TurnajID`) VALUES (3, 1);
INSERT INTO `rozhoduje_na` (`UzivatelID`, `TurnajID`) VALUES (2, 2);
INSERT INTO `rozhoduje_na` (`UzivatelID`, `TurnajID`) VALUES (1, 3);
INSERT INTO `rozhoduje_na` (`UzivatelID`, `TurnajID`) VALUES (2, 4);
INSERT INTO `rozhoduje_na` (`UzivatelID`, `TurnajID`) VALUES (1, 5);

INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
INSERT INTO `registroval_sa_na` (`UzivatelID`, `TurnajID`) VALUES (1, 1);
