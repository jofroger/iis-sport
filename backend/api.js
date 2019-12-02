const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';


/* #region  Uzivatel API */
router.get('/uzivatel', function (req, res) {
  db.query(
    "SELECT * FROM Uzivatel",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/uzivatel/:id', function (req, res) {
  db.query(
    "SELECT * FROM Uzivatel WHERE UzivatelID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/uzivatel/login/:login', function (req, res) {
  db.query(
    "SELECT * FROM Uzivatel WHERE Login=?",
    [req.params.login],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/uzivatel', (req, res) => {
  db.query(
    "INSERT INTO Uzivatel (Meno, Priezvisko, Vek, Email, Login, Heslo, Typ) VALUES (?,?,?,?,?,?,?)",
    [req.body.meno, req.body.priezvisko, req.body.vek, req.body.email, req.body.login, req.body.heslo, req.body.typ],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/uzivatel/:id', function (req, res, next) {
  db.query(
    'UPDATE Uzivatel SET Meno=?, Priezvisko=?, Vek=?, Email=?, Login=?, Heslo=?, Typ=? WHERE UzivatelID=?',
    [req.body.meno, req.body.priezvisko, req.body.vek, req.body.email, req.body.login, req.body.heslo, req.body.typ, req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/uzivatel/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Uzivatel WHERE UzivatelID=?',
    [req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Hrac API */
router.get('/hrac', function (req, res) {
  db.query(
    "SELECT * FROM Hrac",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/hrac/:id', function (req, res) {
  db.query(
    "SELECT * FROM Hrac WHERE HracID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/hrac/uzivatel/:id', function (req, res) {
  db.query(
    "SELECT * FROM Hrac WHERE UzivatelID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/hrac', (req, res) => {
  db.query(
    "INSERT INTO Hrac (Odohrane_zapasy, Pocet_vyhier, Fotka, UzivatelID) VALUES (?,?,?,?)",
    [req.body.odohrane_zapasy, req.body.pocet_vyhier, req.body.fotka, req.body.uzivatelID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/hrac/:id', function (req, res, next) {
  db.query(
    'UPDATE Hrac SET Odohrane_zapasy=?, Pocet_vyhier=?, Fotka=?, UzivatelID=? WHERE HracID=?',
    [req.body.odohrane_zapasy, req.body.pocet_vyhier, req.body.fotka, req.body.uzivatelID, req.params.id],
    (error) => {
      if (error) {
        res.status(500).
        console.error(error);json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/hrac/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Hrac WHERE HracID=?',
    [req.params.id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Usporiadatel API */
router.get('/usporiadatel', function (req, res) {
  db.query(
    "SELECT * FROM Usporiadatel",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/usporiadatel/:id', function (req, res) {
  db.query(
    "SELECT * FROM Usporiadatel WHERE UsporiadatelID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/usporiadatel', (req, res) => {
  db.query(
    "INSERT INTO Usporiadatel (Organizacia, UzivatelID) VALUES (?,?)",
    [req.body.organizacia, req.body.uzivatelID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/usporiadatel/:id', function (req, res, next) {
  db.query(
    'UPDATE Usporiadatel SET Organizacia=?, UzivatelID=? WHERE UsporiadatelID=?',
    [req.body.organizacia, req.body.uzivatelID, req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/usporiadatel/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Usporiadatel WHERE UsporiadatelID=?',
    [req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Rozhodca API */
router.get('/rozhodca', function (req, res) {
  db.query(
    "SELECT * FROM Rozhodca",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/rozhodca/:id', function (req, res) {
  db.query(
    "SELECT * FROM Rozhodca WHERE RozhodcaID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/rozhodca/uzivatel/:id', function (req, res) {
  db.query(
    "SELECT * FROM Rozhodca WHERE UzivatelID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/rozhodca', (req, res) => {
  db.query(
    "INSERT INTO Rozhodca (Typ, UzivatelID) VALUES (?,?)",
    [req.body.typ, req.body.uzivatelID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/rozhodca/:id', function (req, res, next) {
  db.query(
    'UPDATE Rozhodca SET Typ=?, UzivatelID=? WHERE RozhodcaID=?',
    [req.body.typ, req.body.uzivatelID, req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/rozhodca/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Rozhodca WHERE RozhodcaID=?',
    [req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Podmienky_turnaja API */
router.get('/podmienky_turnaja', function (req, res) {
  db.query(
    "SELECT * FROM Podmienky_turnaja",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/podmienky_turnaja/:id', function (req, res) {
  db.query(
    "SELECT * FROM Podmienky_turnaja WHERE Podmienky_turnajaID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/podmienky_turnaja', (req, res) => {
  db.query(
    "INSERT INTO Podmienky_turnaja (Minimalny_vek_hracov, Pocet_hracov_v_tyme, Pocet_tymov, Registracny_poplatok, Druh_hry) VALUES (?,?,?,?,?)",
    [req.body.minimalny_vek_hracov, req.body.pocet_hracov_v_tyme, req.body.pocet_tymov, req.body.registracny_poplatok, req.body.druh_hry],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/podmienky_turnaja/:id', function (req, res, next) {
  db.query(
    'UPDATE Podmienky_turnaja SET Minimalny_vek_hracov=?, Pocet_hracov_v_tyme=?, Pocet_tymov=?, Registracny_poplatok=?, Druh_hry=? WHERE Podmienky_turnajaID=?',
    [req.body.minimalny_vek_hracov, req.body.pocet_hracov_v_tyme, req.body.pocet_tymov, req.body.registracny_poplatok, req.body.druh_hry, req.params.id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/podmienky_turnaja/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Podmienky_turnaja WHERE Podmienky_turnajaID=?',
    [req.params.id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Turnaj API */
router.get('/turnaj', function (req, res) {
  db.query(
    "SELECT * FROM Turnaj",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/turnaj/:id', function (req, res) {
  db.query(
    "SELECT * FROM Turnaj WHERE TurnajID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/turnaj/usporiadatel/:id', function (req, res) {
  db.query(
    "SELECT * FROM Turnaj WHERE UsporiadatelID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/turnaj', (req, res) => {
  db.query(
    "INSERT INTO Turnaj (Nazov, Zaciatok, Koniec, Vyhra, Sponzori, Podmienky_turnajaID, UsporiadatelID) VALUES (?,?,?,?,?,?,?)",
    [req.body.nazov, req.body.zaciatok, req.body.koniec, req.body.vyhra, req.body.sponzori, req.body.podmienky_turnajaID, req.body.usporiadatelID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/turnaj/:id', function (req, res, next) {
  db.query(
    'UPDATE Turnaj SET Nazov=?, Zaciatok=?, Koniec=?, Vyhra=?, Sponzori=?, Podmienky_turnajaID=?, UsporiadatelID=? WHERE TurnajID=?',
    [req.body.nazov, req.body.zaciatok, req.body.koniec, req.body.vyhra, req.body.sponzori, req.body.podmienky_turnajaID, req.body.usporiadatelID, req.params.id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/turnaj/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Turnaj WHERE TurnajID=?',
    [req.params.id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Tim API */
router.get('/tim', function (req, res) {
  db.query(
    "SELECT * FROM Tim",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/tim/:id', function (req, res) {
  db.query(
    "SELECT * FROM Tim WHERE TimID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/tim', (req, res) => {
  db.query(
    "INSERT INTO Tim (Nazov, Logo, Odohrane_zapasy, Pocet_vyhier, Pocet_hracov) VALUES (?,?,?,?,?)",
    [req.body.nazov, req.body.logo, req.body.odohrane_zapasy, req.body.pocet_vyhier, req.body.pocet_hracov],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/tim/:id', function (req, res, next) {
  db.query(
    'UPDATE Tim SET Nazov=?, Logo=?, Odohrane_zapasy=?, Pocet_vyhier=?, Pocet_hracov=? WHERE TimID=?',
    [req.body.nazov, req.body.logo, req.body.odohrane_zapasy, req.body.pocet_vyhier, req.body.pocet_hracov, req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/tim/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Tim WHERE TimID=?',
    [req.params.id],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Zapas API */
router.get('/zapas', function (req, res) {
  db.query(
    "SELECT * FROM Zapas ORDER BY Datum DESC",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/zapas/:id', function (req, res) {
  db.query(
    "SELECT * FROM Zapas WHERE ZapasID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/zapas/turnaj-uroven/:id&:uroven', function (req, res) {
  db.query(
    "SELECT * FROM Zapas WHERE TurnajID=? AND Uroven_zapasu=?",
    [req.params.id, req.params.uroven],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/zapas', (req, res) => {
  db.query(
    "INSERT INTO Zapas (Nazov, Miesto, Datum, Stav, Vyherca, Uroven_zapasu, TurnajID) VALUES (?,?,?,?,?,?,?)",
    [req.body.nazov, req.body.miesto, req.body.datum, req.body.stav, req.body.vyherca, req.body.uroven_zapasu, req.body.turnajID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/zapas/:id', function (req, res, next) {
  db.query(
    'UPDATE Zapas SET Nazov=?, Miesto=?, Datum=?, Stav=?, Vyherca=?, Uroven_zapasu=?, TurnajID=? WHERE ZapasID=?',
    [req.body.nazov, req.body.miesto, req.body.datum, req.body.stav, req.body.vyherca, req.body.uroven_zapasu, req.body.turnajID, req.params.id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/zapas/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Zapas WHERE ZapasID=?',
    [req.params.id],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  Stav_zapasu API */
router.get('/stav_zapasu', function (req, res) {
  db.query(
    "SELECT * FROM Stav_zapasu",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/stav_zapasu/:id', function (req, res) {
  db.query(
    "SELECT * FROM Stav_zapasu WHERE Stav_zapasuID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/stav_zapasu/zapas/:id', function (req, res) {
  db.query(
    "SELECT * FROM Stav_zapasu WHERE ZapasID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});


router.post('/stav_zapasu', (req, res) => {
  db.query(
    "INSERT INTO Stav_zapasu (Ziskane_sety, Ziskane_gemy, Ziskane_vymeny, HracID, TimID, ZapasID) VALUES (?,?,?,?,?,?)",
    [req.body.ziskane_sety, req.body.ziskane_gemy, req.body.ziskane_vymeny, req.body.hracID, req.body.timID, req.body.zapasID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/stav_zapasu/:id', function (req, res, next) {
  db.query(
    'UPDATE Stav_zapasu SET Ziskane_sety=?, Ziskane_gemy=?, Ziskane_vymeny=?, HracID=?, TimID=?, ZapasID=? WHERE Stav_zapasuID=?',
    [req.body.ziskane_sety, req.body.ziskane_gemy, req.body.ziskane_vymeny, req.body.hracID, req.body.timID, req.body.zapasID, req.params.id],
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/stav_zapasu/:id', function (req, res, next) {
  db.query(
    'DELETE FROM Stav_zapasu WHERE Stav_zapasuID=?',
    [req.params.id],
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */


/* #region  hrac_hra_v_time API */
router.get('/hrac_hra_v_time/hrac/:id', function (req, res) {
  db.query(
    "SELECT TimID, Nazov, Logo, Tim.Odohrane_zapasy, Tim.Pocet_vyhier, Pocet_hracov \
     FROM Hrac  \
     INNER JOIN hrac_hra_v_time USING (HracID) \
     INNER JOIN Tim USING (TimID) \
     WHERE HracID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/hrac_hra_v_time/tim/:id', function (req, res) {
  db.query(
    "SELECT HracID, Hrac.Odohrane_zapasy, Hrac.Pocet_vyhier, Hrac.Fotka, UzivatelID \
     FROM Tim  \
     INNER JOIN hrac_hra_v_time USING (TimID) \
     INNER JOIN Hrac USING (HracID) \
     WHERE TimID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/hrac_hra_v_time', (req, res) => {
  db.query(
    "INSERT INTO hrac_hra_v_time (HracID, TimID) VALUES (?,?)",
    [req.body.hracID, req.body.timID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/hrac_hra_v_time/:HracID&:TimID', function (req, res) {
  db.query(
    'DELETE FROM hrac_hra_v_time WHERE HracID=? AND TimID=?',
    [req.params.HracID, req.params.TimID],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  tim_chce_hrat API */
router.get('/tim_chce_hrat/turnaj/:id', function (req, res) {
  db.query(
    "SELECT TimID, Tim.Nazov, Logo, Odohrane_zapasy, Pocet_vyhier, Pocet_hracov \
     FROM Turnaj  \
     INNER JOIN tim_chce_hrat USING (TurnajID) \
     INNER JOIN Tim USING (TimID) \
     WHERE TurnajID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/tim_chce_hrat/tim/:id', function (req, res) {
  db.query(
    "SELECT TurnajID, Turnaj.Nazov, Zaciatok, Koniec, Vyhra, Sponzori, Podmienky_turnajaID, UsporiadatelID \
     FROM Tim  \
     INNER JOIN tim_chce_hrat USING (TimID) \
     INNER JOIN Turnaj USING (TurnajID) \
     WHERE TimID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/tim_chce_hrat', (req, res) => {
  db.query(
    "INSERT INTO tim_chce_hrat (TurnajID, TimID) VALUES (?,?)",
    [req.body.turnajID, req.body.timID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/tim_chce_hrat/:TurnajID&:TimID', function (req, res) {
  db.query(
    'DELETE FROM tim_chce_hrat WHERE TurnajID=? AND TimID=?',
    [req.params.TurnajID, req.params.TimID],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  hrac_chce_hrat API */
router.get('/hrac_chce_hrat/turnaj/:id', function (req, res) {
  db.query(
    "SELECT HracID, Odohrane_zapasy, Pocet_vyhier, UzivatelID \
     FROM Turnaj  \
     INNER JOIN hrac_chce_hrat USING (TurnajID) \
     INNER JOIN Hrac USING (HracID) \
     WHERE TurnajID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/hrac_chce_hrat/hrac/:id', function (req, res) {
  db.query(
    "SELECT TurnajID, Nazov, Zaciatok, Koniec, Vyhra, Sponzori, Podmienky_turnajaID, UsporiadatelID \
     FROM Hrac  \
     INNER JOIN hrac_chce_hrat USING (HracID) \
     INNER JOIN Turnaj USING (TurnajID) \
     WHERE HracID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/hrac_chce_hrat', (req, res) => {
  db.query(
    "INSERT INTO hrac_chce_hrat (TurnajID, HracID) VALUES (?,?)",
    [req.body.turnajID, req.body.hracID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/hrac_chce_hrat/:TurnajID&:HracID', function (req, res) {
  db.query(
    'DELETE FROM hrac_chce_hrat WHERE TurnajID=? AND HracID=?',
    [req.params.TurnajID, req.params.HracID],
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  tim_hra_v_zapase API */
router.get('/tim_hra_v_zapase/zapas/:id', function (req, res) {
  db.query(
    "SELECT TimID, Tim.Nazov, Logo, Odohrane_zapasy, Pocet_vyhier, Pocet_hracov \
     FROM Zapas  \
     INNER JOIN tim_hra_v_zapase USING (ZapasID) \
     INNER JOIN Tim USING (TimID) \
     WHERE ZapasID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/tim_hra_v_zapase/tim/:id', function (req, res) {
  db.query(
    "SELECT ZapasID, Zapas.Nazov, Miesto, Datum, Stav, TurnajID \
     FROM Tim  \
     INNER JOIN tim_hra_v_zapase USING (TimID) \
     INNER JOIN Zapas USING (ZapasID) \
     WHERE TimID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/tim_hra_v_zapase', (req, res) => {
  db.query(
    "INSERT INTO tim_hra_v_zapase (ZapasID, TimID) VALUES (?,?)",
    [req.body.zapasID, req.body.timID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/tim_hra_v_zapase/:ZapasID&:TimID', function (req, res) {
  db.query(
    'DELETE FROM tim_hra_v_zapase WHERE ZapasID=? AND TimID=?',
    [req.params.ZapasID, req.params.TimID],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  hrac_hra_v_zapase API */
router.get('/hrac_hra_v_zapase/zapas/:id', function (req, res) {
  db.query(
    "SELECT HracID, Odohrane_zapasy, Pocet_vyhier, UzivatelID \
     FROM Zapas  \
     INNER JOIN hrac_hra_v_zapase USING (ZapasID) \
     INNER JOIN Hrac USING (HracID) \
     WHERE ZapasID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/hrac_hra_v_zapase/hrac/:id', function (req, res) {
  db.query(
    "SELECT ZapasID, Nazov, Miesto, Datum, Stav, TurnajID \
     FROM Hrac  \
     INNER JOIN hrac_hra_v_zapase USING (HracID) \
     INNER JOIN Zapas USING (ZapasID) \
     WHERE HracID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/uzivatel_hra_v_zapase/zapas/:id', function (req, res) {
  db.query(
    "SELECT * \
     FROM Zapas  \
     INNER JOIN hrac_hra_v_zapase USING (ZapasID) \
     INNER JOIN Hrac USING (HracID) \
     INNER JOIN Uzivatel USING (UzivatelID) \
     WHERE ZapasID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/hrac_hra_v_zapase', (req, res) => {
  db.query(
    "INSERT INTO hrac_hra_v_zapase (ZapasID, HracID) VALUES (?,?)",
    [req.body.zapasID, req.body.hracID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/hrac_hra_v_zapase/:ZapasID&:HracID', function (req, res) {
  db.query(
    'DELETE FROM hrac_hra_v_zapase WHERE ZapasID=? AND HracID=?',
    [req.params.TurnajID, req.params.HracID],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  rozhoduje_turnaj API */
router.get('/rozhoduje_turnaj/turnaj/:id', function (req, res) {
  db.query(
    "SELECT RozhodcaID, Typ, UzivatelID \
     FROM Turnaj  \
     INNER JOIN rozhoduje_turnaj USING (TurnajID) \
     INNER JOIN Rozhodca USING (RozhodcaID) \
     WHERE TurnajID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/rozhoduje_turnaj/rozhodca/:id', function (req, res) {
  db.query(
    "SELECT TurnajID, Nazov, Zaciatok, Koniec, Vyhra, Sponzori, Podmienky_turnajaID, UsporiadatelID \
     FROM Rozhodca  \
     INNER JOIN rozhoduje_turnaj USING (RozhodcaID) \
     INNER JOIN Turnaj USING (TurnajID) \
     WHERE RozhodcaID=?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.post('/rozhoduje_turnaj', (req, res) => {
  db.query(
    "INSERT INTO rozhoduje_turnaj (TurnajID, RozhodcaID) VALUES (?,?)",
    [req.body.turnajID, req.body.rozhodcaID],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.delete('/rozhoduje_turnaj/:TurnajID&:RozhodcaID', function (req, res) {
  db.query(
    'DELETE FROM rozhoduje_turnaj WHERE TurnajID=? AND RozhodcaID=?',
    [req.params.TurnajID, req.params.RozhodcaID],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

router.get('/uzivatel-a-hrac', function (req, res) {
  db.query(
    "SELECT * FROM Hrac LEFT JOIN  Uzivatel USING(UzivatelID);",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/zapas/turnaj/:id', function (req, res) {
  db.query(
    "SELECT * FROM Zapas WHERE TurnajID=?;",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/zapas/rozhodca/:id', function (req, res) {
  db.query(
    "SELECT * \
     FROM Rozhodca \
     INNER JOIN rozhoduje_turnaj USING(RozhodcaID) \
     INNER JOIN Zapas USING(TurnajID) \
     WHERE RozhodcaID=?;",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

/* #region  test API */
router.get('/unsetkey', function (req, res) {
  db.query(
    "SET FOREIGN_KEY_CHECKS=0",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get('/setkey', function (req, res) {
  db.query(
    "SET FOREIGN_KEY_CHECKS=1",
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json(results);
      }
    }
  );
});
/* #endregion */


var multer = require('multer');
//var DIR_H = '../src/assets/fotky_hracov/';
var DIR_H = './assets/fotky_hracov/';
var uploadHrac = multer({dest: DIR_H}).single('photo');

router.post('/upload-img/hrac', function (req, res, next) {
  var path = '';
  uploadHrac(req, res, function (err) {
     if (err) {
       // An error occurred when uploading
       console.log(err);
       return res.status(422).send("an Error occured")
     }  
    // No error occured.
     path = req.file.path;
     res.status(200).json({"Fotka": "./assets/fotky_hracov/"+req.file.filename}); 
  });     
})

//var DIR_T = '../src/assets/loga_timov/'; 
var DIR_T = './assets/loga_timov/'; 
var uploadTim = multer({dest: DIR_T}).single('photo');

router.post('/upload-img/tim', function (req, res, next) {
  var path = '';
  uploadTim(req, res, function (err) {
     if (err) {
       // An error occurred when uploading
       console.log(err);
       return res.status(422).send("an Error occured")
     }  
    // No error occured.
     path = req.file.path;
     res.status(200).json({"Fotka": "./assets/loga_timov/"+req.file.filename}); 
  });     
})
  return router;
}

module.exports = createRouter;
