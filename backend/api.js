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

router.post('/uzivatel', (req, res) => {
  db.query(
    "INSERT INTO Uzivatel (Meno, Priezvisko, Vek, Email, Login, Heslo) VALUES (?,?,?,?,?,?)",
    [req.body.meno, req.body.priezvisko, req.body.vek, req.body.email, req.body.login, req.body.heslo],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ status: 'error' });
        throw error;
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});

router.put('/uzivatel/:id', function (req, res, next) {
  db.query(
    'UPDATE Uzivatel SET Meno=?, Priezvisko=?, Vek=?, Email=?, Login=?, Heslo=? WHERE UzivatelID=?',
    [req.body.meno, req.body.priezvisko, req.body.vek, req.body.email, req.body.login, req.body.heslo, req.params.id],
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
        throw error;
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
    "INSERT INTO Podmienky_turnaja (Minimalny_vek_hracov, Pocet_hracov_v_tyme, Pocet_tymov, Registracny_poplatok) VALUES (?,?,?,?)",
    [req.body.Minimalny_vek_hracov, req.body.Pocet_hracov_v_tyme, req.body.Pocet_tymov, req.body.Registracny_poplatok],
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
    'UPDATE Podmienky_turnaja SET Minimalny_vek_hracov=?, Pocet_hracov_v_tyme=?, Pocet_tymov=?, Registracny_poplatok=? WHERE Podmienky_turnajaID=?',
    [req.body.Minimalny_vek_hracov, req.body.Pocet_hracov_v_tyme, req.body.Pocet_tymov, req.body.Registracny_poplatok, req.params.id],
    (error) => {
      if (error) {
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

router.post('/turnaj', (req, res) => {
  db.query(
    "INSERT INTO Turnaj (Nazov, Zaciatok, Koniec, Vyhra, Sponzori, Podmienky_turnajaID, UzivatelID) VALUES (?,?,?,?,?,?,?)",
    [req.body.Nazov, req.body.Zaciatok, req.body.Koniec, req.body.Vyhra, req.body.Sponzori, req.body.Podmienky_turnajaID, req.body.UzivatelID],
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
    'UPDATE Turnaj SET Nazov=?, Zaciatok=?, Koniec=?, Vyhra=?, Sponzori=?, Podmienky_turnajaID=?, UzivatelID=? WHERE TurnajID=?',
    [req.body.Nazov, req.body.Zaciatok, req.body.Koniec, req.body.Vyhra, req.body.Sponzori, req.body.Podmienky_turnajaID, req.body.UzivatelID, req.params.id],
    (error) => {
      if (error) {
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
    "INSERT INTO Tim (Nazov, Logo, Pocet_hracov) VALUES (?,?,?)",
    [req.body.Nazov, req.body.Logo, req.body.Pocet_hracov],
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
    'UPDATE Tim SET Nazov=?, Zaciatok=?, Koniec=?, Vyhra=?, Sponzori=?, Podmienky_turnajaID=?, UzivatelID=? WHERE TimID=?',
    [req.body.Nazov, req.body.Logo, req.body.Pocet_hracov, req.params.id],
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
    "SELECT * FROM Zapas",
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

router.post('/zapas', (req, res) => {
  db.query(
    "INSERT INTO Zapas (Nazov, Miesto, Datum, TurnajID) VALUES (?,?,?,?)",
    [req.body.Nazov, req.body.Miesto, req.body.Datum, req.body.TurnajID],
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
    'UPDATE Zapas SET Nazov=?, Miesto=?, Datum=?, TurnajID=? WHERE ZapasID=?',
    [req.body.Nazov, req.body.Miesto, req.body.Datum, req.body.TurnajID, req.params.id],
    (error) => {
      if (error) {
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
        res.status(500).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  hra_v API */
router.get('/hra_v/uzivatel/:id', function (req, res) {
  db.query(
    "SELECT TimID, Nazov, Logo, Pocet_hracov \
     FROM Uzivatel  \
     INNER JOIN hra_v USING (UzivatelID) \
     INNER JOIN Tim USING (TimID) \
     WHERE UzivatelID=?",
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

router.get('/hra_v/tim/:id', function (req, res) {
  db.query(
    "SELECT UzivatelID, Meno, Priezvisko, Vek, Email \
     FROM Tim  \
     INNER JOIN hra_v USING (TimID) \
     INNER JOIN Uzivatel USING (UzivatelID) \
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

router.post('/hra_v', (req, res) => {
  db.query(
    "INSERT INTO hra_v (UzivatelID, TimID) VALUES (?,?)",
    [req.body.UzivatelID, req.body.TimID],
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

router.delete('/hra_v/:UzivatelID&:TimID', function (req, res) {
  db.query(
    'DELETE FROM hra_v WHERE UzivatelID=? AND TimID=?',
    [req.params.UzivatelID, req.params.TimID],
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

/* #region  sa_zucastni API */
router.get('/sa_zucastni/zapas/:id', function (req, res) {
  db.query(
    "SELECT TimID, Tim.Nazov, Logo, Pocet_hracov \
     FROM Zapas  \
     INNER JOIN sa_zucastni USING (ZapasID) \
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

router.get('/sa_zucastni/tim/:id', function (req, res) {
  db.query(
    "SELECT ZapasID, Zapas.Nazov, Miesto, Datum, TurnajID \
     FROM Tim  \
     INNER JOIN sa_zucastni USING (TimID) \
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

router.post('/sa_zucastni', (req, res) => {
  db.query(
    "INSERT INTO sa_zucastni (ZapasID, TimID) VALUES (?,?)",
    [req.body.ZapasID, req.body.TimID],
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

router.delete('/sa_zucastni/:ZapasID&:TimID', function (req, res) {
  db.query(
    'DELETE FROM sa_zucastni WHERE ZapasID=? AND TimID=?',
    [req.params.ZapasID, req.params.TimID],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
        throw error;
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */

/* #region  rozhoduje_na API */
router.get('/rozhoduje_na/zapas/:id', function (req, res) {
  db.query(
    "SELECT TimID, Tim.Nazov, Logo, Pocet_hracov \
     FROM Zapas  \
     INNER JOIN sa_zucastni USING (ZapasID) \
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

router.get('/sa_zucastni/tim/:id', function (req, res) {
  db.query(
    "SELECT ZapasID, Zapas.Nazov, Miesto, Datum, TurnajID \
     FROM Tim  \
     INNER JOIN sa_zucastni USING (TimID) \
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

router.post('/sa_zucastni', (req, res) => {
  db.query(
    "INSERT INTO sa_zucastni (ZapasID, TimID) VALUES (?,?)",
    [req.body.ZapasID, req.body.TimID],
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

router.delete('/sa_zucastni/:ZapasID&:TimID', function (req, res) {
  db.query(
    'DELETE FROM sa_zucastni WHERE ZapasID=? AND TimID=?',
    [req.params.ZapasID, req.params.TimID],
    (error) => {
      if (error) {
        res.status(500).json({ status: 'error' });
        throw error;
      } else {
        res.status(200).json({ status: 'ok' });
      }
    }
  );
});
/* #endregion */


  return router;
}

module.exports = createRouter;