import React, { useState, useMemo } from "react";

/* ============================================================
   PORT — marketplace · ezdravotnici.cz
   Dvojjazyčný prototyp (CS/EN). Provozovatel: Pharmodeco s.r.o.
   Zásada: odběratel a dodavatel se nikdy nepotkají — veškerá
   komunikace jde přes zprostředkovatele.
   ============================================================ */

const LOGO_DARK = "data:image/png;base64,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";
const LOGO = "data:image/png;base64,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";

const OPERATOR = { nazev: "Pharmodeco s.r.o.", ic: "17764017", dic: "CZ17764017", adresa: "Rybná 678/9, Staré Město, 110 00 Praha 1", email: "port@ezdravotnici.cz" };

const SUPPLIERS_SEED = {
  "DOD-A": { nazev: "PharmaDist s.r.o.", ic: "05523456", dic: "CZ05523456", adresa: "Průmyslová 4, 619 00 Brno", email: "expedice@pharmadist.cz" },
  "DOD-B": { nazev: "MediSupply a.s.", ic: "27689012", dic: "CZ27689012", adresa: "Logistická 8, 250 01 Brandýs n. L.", email: "expedice@medisupply.cz" },
};

const CLIENTS = {
  "ODB-01": { nazev: "Lékárna U Anděla s.r.o.", ic: "08812301", dic: "CZ08812301", adresa: "Nádražní 25, 150 00 Praha 5" },
  "ODB-02": { nazev: "Poliklinika Zdraví a.s.", ic: "26154480", dic: "CZ26154480", adresa: "Masarykova 110, 400 01 Ústí n. L." },
};

const USERS = [
  { login: "admin",     heslo: "admin", role: "admin",     jmeno: "Administrátor PORT" },
  { login: "lekarna",   heslo: "demo",  role: "klient",    jmeno: "Lékárna U Anděla", kod: "ODB-01", email: "objednavky@uandela.cz" },
  { login: "klinika",   heslo: "demo",  role: "klient",    jmeno: "Poliklinika Zdraví", kod: "ODB-02", email: "nakup@poliklinikazdravi.cz" },
  { login: "dodavatel", heslo: "demo",  role: "dodavatel", jmeno: "PharmaDist s.r.o.", kod: "DOD-A", email: "expedice@pharmadist.cz" },
];

let PID = 400;
const seedProducts = [
  {"id": 200, "sukl": "0028162", "nazev": "ABILIFY 10mg por.tbl.nob.28x10mg", "vyrobce": "Bristol-Myers Squibb", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2041.21, "cena": 2265.0, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 201, "sukl": "0026486", "nazev": "ACTRAPID 100IU/ml Penfill inj.5x3ml/300UT", "vyrobce": "Novo Nordisk", "sarze": "", "expirace": "", "ean": "", "nakupCena": 527.63, "cena": 653.0, "ks": 140, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 202, "sukl": "0057364", "nazev": "AGGRENOX cps.ret.60", "vyrobce": "Boehringer Ingelheim", "sarze": "", "expirace": "", "ean": "", "nakupCena": 267.59, "cena": 366.0, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 203, "sukl": "0028283", "nazev": "Apidra 100 U/ml sdr.inj.sol.1x10ml", "vyrobce": "AVENTIS", "sarze": "", "expirace": "", "ean": "", "nakupCena": 398.91, "cena": 448.0, "ks": 13, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 204, "sukl": "0099969", "nazev": "ARCOXIA 60mg por.tbl.flm.14x60mg", "vyrobce": "MERCK SHARP & DOHME PTY LTD.,", "sarze": "", "expirace": "", "ean": "", "nakupCena": 223.09, "cena": 260.0, "ks": 74, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 205, "sukl": "0169721", "nazev": "ASACOL TBL.OBD.100X400MG", "vyrobce": "Medimport", "sarze": "", "expirace": "", "ean": "", "nakupCena": 516.21, "cena": 630.0, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 206, "sukl": "0029816", "nazev": "AVAMYS nas.spr.sus.120x27.5rg", "vyrobce": "Glaxo", "sarze": "", "expirace": "", "ean": "", "nakupCena": 157.58, "cena": 171.0, "ks": 124, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 207, "sukl": "0028396", "nazev": "Avastin inf.cnc.sol.100mg/4ml", "vyrobce": "", "sarze": "", "expirace": "", "ean": "", "nakupCena": 7363.59, "cena": 8120.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 208, "sukl": "0028397", "nazev": "AVASTIN inf.cnc.sol.400mg/16ml", "vyrobce": "Roche Registration Ltd., Welwyn Garden City, Hert", "sarze": "", "expirace": "", "ean": "", "nakupCena": 28699.58, "cena": 31250.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 209, "sukl": "0026252", "nazev": "Avonex syring 4x 0,5ml x 30mcg", "vyrobce": "", "sarze": "", "expirace": "", "ean": "", "nakupCena": 20083.96, "cena": 29000.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 210, "sukl": "0064787", "nazev": "BUDENOFALK cps.ent.100x3mg", "vyrobce": "Falk", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2029.47, "cena": 2460.0, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 211, "sukl": "0064787", "nazev": "BUDENOFALK cps.ent.100x3mg", "vyrobce": "Falk", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1961.82, "cena": 2150.0, "ks": 9, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 212, "sukl": "0168379", "nazev": "BYDUREON 2mg inj.psu.lqf.pro. 4x(1 lah+1stř)", "vyrobce": "LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1991.35, "cena": 2200.0, "ks": 74, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 213, "sukl": "0027431", "nazev": "CANCIDAS 70mg inf.plv.sol.1x70mg 1004010", "vyrobce": "MERCK SHARP & DOHME PTY LTD.", "sarze": "", "expirace": "", "ean": "", "nakupCena": 12993.12, "cena": 13750.0, "ks": 14, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 214, "sukl": "0149645", "nazev": "CIMZIA 200mg inj.sol.2x1ml", "vyrobce": "UCB", "sarze": "", "expirace": "", "ean": "", "nakupCena": 21552.6, "cena": 24000.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 215, "sukl": "0020132", "nazev": "CIPRALEX 10mg por.tbl.flm.28x10mg", "vyrobce": "Lundbeck", "sarze": "", "expirace": "", "ean": "", "nakupCena": 97.3, "cena": 200.0, "ks": 650, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 216, "sukl": "0125287", "nazev": "CLEXANE inj.sol.50x0.4ml/4ku", "vyrobce": "CHINOIN", "sarze": "", "expirace": "", "ean": "", "nakupCena": 3127.88, "cena": 4748.79, "ks": 49, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 217, "sukl": "0125288", "nazev": "CLEXANE inj.sol.50x0.6ml/6ku", "vyrobce": "Aventis", "sarze": "", "expirace": "", "ean": "", "nakupCena": 4329.46, "cena": 6239.5, "ks": 99, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 218, "sukl": "0125289", "nazev": "CLEXANE inj.sol.50x0.8ml/8ku", "vyrobce": "Aventis", "sarze": "", "expirace": "", "ean": "", "nakupCena": 5637.17, "cena": 8800.3, "ks": 49, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 219, "sukl": "0027442", "nazev": "COMBIVIR tbl.obd.60", "vyrobce": "GSK", "sarze": "", "expirace": "", "ean": "", "nakupCena": 7055.72, "cena": 9350.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 220, "sukl": "0024997", "nazev": "COSOPT Free oční kapky 20mg/ml+5mg/ml 60x0.2ml", "vyrobce": "MERCK SHARP & DOHME PTY LTD.,", "sarze": "", "expirace": "", "ean": "", "nakupCena": 413.83, "cena": 458.01, "ks": 250, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 221, "sukl": "0049706", "nazev": "CRESTOR 20mg por.tbl.flm.28x20mg", "vyrobce": "Astra Zeneca", "sarze": "", "expirace": "", "ean": "", "nakupCena": 510.71, "cena": 619.0, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 222, "sukl": "0049720", "nazev": "CRESTOR 40mg por.tbl.flm.28x40mg", "vyrobce": "Astra Zeneca", "sarze": "", "expirace": "", "ean": "", "nakupCena": 645.55, "cena": 791.2, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 223, "sukl": "0087226", "nazev": "CUROSURF SUSP.2X1.5ML/120MG - české balení", "vyrobce": "TORREX PHARMA S.R.O.", "sarze": "", "expirace": "", "ean": "", "nakupCena": 16144.89, "cena": 17000.0, "ks": 3, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 224, "sukl": "0028389", "nazev": "CYMBALTA 60mg por.cps.etd.28x60mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 635.9, "cena": 780.0, "ks": 20, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 225, "sukl": "0010754", "nazev": "DEPO-PROVERA inj.1x1ml/150mg-stř.", "vyrobce": "Pfizer", "sarze": "", "expirace": "", "ean": "", "nakupCena": 267.5, "cena": 281.0, "ks": 40, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 226, "sukl": "0145988", "nazev": "DUODART 0.5mg/0.4mg por.cps.dur.90", "vyrobce": "Catalent Germany Schorndorf Gm", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1347.29, "cena": 1649.97, "ks": 99, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 227, "sukl": "0500600", "nazev": "EFIENT 10mg por.tbl.flm.28x10mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1122.48, "cena": 1300.0, "ks": 23, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 228, "sukl": "0125299", "nazev": "Eligard 22.5mg inj.pso.lqf.1x22.5mg van", "vyrobce": "MEDIGENE AG, PLANEGG", "sarze": "", "expirace": "", "ean": "", "nakupCena": 6113.8, "cena": 6800.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 229, "sukl": "0061246", "nazev": "ELONTRIL 150mg por.tbl.ret.30x150mg", "vyrobce": "GLAXO SmithKline", "sarze": "", "expirace": "", "ean": "", "nakupCena": 218.83, "cena": 415.0, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 230, "sukl": "0027905", "nazev": "Enbrel 50mg inj.sol.4x1ml/50mg-ps", "vyrobce": "WYETH WHITEHALL CZECH", "sarze": "", "expirace": "", "ean": "", "nakupCena": 21529.66, "cena": 24434.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 231, "sukl": "0012701", "nazev": "ENTOCORT 3 MG CPS.50X3MG", "vyrobce": "ASTRA ZENECA", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1057.73, "cena": 1152.0, "ks": 36, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 232, "sukl": "0012702", "nazev": "ENTOCORT 3MG cps.100x3mg", "vyrobce": "Astra Zeneca", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2048.14, "cena": 2504.45, "ks": 99, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 233, "sukl": "0030109", "nazev": "FEMOSTON Conti por.tbl.flm.28", "vyrobce": "SOLVAY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 123.72, "cena": 146.0, "ks": 100, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 234, "sukl": "0155379", "nazev": "Ferinject inj.sol.1x10ml", "vyrobce": "Vifor", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2376.47, "cena": 2660.0, "ks": 73, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 235, "sukl": "0042463", "nazev": "FLIXOTIDE 125 Inhaler N inh.sus.pss.60x125RG", "vyrobce": "GSK", "sarze": "", "expirace": "", "ean": "", "nakupCena": 174.93, "cena": 196.0, "ks": 40, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 236, "sukl": "0015900", "nazev": "FORADIL cps.inh.60x12RG+inh.", "vyrobce": "Novartis", "sarze": "", "expirace": "", "ean": "", "nakupCena": 428.41, "cena": 449.99, "ks": 147, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 237, "sukl": "0018817", "nazev": "Fosrenol 500mg žvýkací tabl.por.tbl.mnd.90x500mg", "vyrobce": "Bcm Ltd., Nottingham", "sarze": "", "expirace": "", "ean": "", "nakupCena": 3337.12, "cena": 3700.0, "ks": 13, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 238, "sukl": "0107732", "nazev": "FRAGMIN 2500m.j.(anti-xa)/0.2ml inj.s.10x0.2ml/2.5", "vyrobce": "Cardinal health France", "sarze": "", "expirace": "", "ean": "", "nakupCena": 289.33, "cena": 335.0, "ks": 34, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 239, "sukl": "0107734", "nazev": "FRAGMIN 5000M.j.(anti-xa)0.2ml inj.sol.10x0.2ml/5K", "vyrobce": "Cardinal health France", "sarze": "", "expirace": "", "ean": "", "nakupCena": 609.94, "cena": 815.0, "ks": 128, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 240, "sukl": "0006093", "nazev": "GUTRON 2.5MG tbl.50x2.5mg", "vyrobce": "NYCOMED", "sarze": "", "expirace": "", "ean": "", "nakupCena": 129.82, "cena": 155.0, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 241, "sukl": "0025555", "nazev": "HERCEPTIN 150mg inf.plv.sol.1x150mg - zákaz šarže H4311B07, H4329B01, H4284B04, H4319B02, H4324B03, H4196B01, H4271B01, H4301B09, H4303B01.", "vyrobce": "ROCHE", "sarze": "", "expirace": "", "ean": "", "nakupCena": 13521.69, "cena": 15500.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 242, "sukl": "0025590", "nazev": "HUMALOG 100IU inj.1x10ml/1KU", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 382.02, "cena": 436.03, "ks": 84, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 243, "sukl": "0025592", "nazev": "HUMALOG CARTRIDGE 100IU inj.5x3ml/300UT", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 675.33, "cena": 770.89, "ks": 84, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 244, "sukl": "0025596", "nazev": "HUMALOG Mix 25 inj.susp.5x3ml/300ut", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 684.04, "cena": 775.9, "ks": 84, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 245, "sukl": "0027918", "nazev": "Humira inj.sol.2x0.8ml/40mg", "vyrobce": "", "sarze": "", "expirace": "", "ean": "", "nakupCena": 24093.79, "cena": 30960.0, "ks": 13, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 246, "sukl": "0085265", "nazev": "INSPRA 50mg por.tbl.flm.30x50mg", "vyrobce": "PHARMACIA", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1089.7, "cena": 1185.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 247, "sukl": "0025689", "nazev": "INSUMAN RAPID 100m.j.inj.5x3ml/300UT", "vyrobce": "Sanofi", "sarze": "", "expirace": "", "ean": "", "nakupCena": 527.43, "cena": 700.02, "ks": 130, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 248, "sukl": "0025780", "nazev": "IntronA 30MIU inj.sol.1x1.2ml/30MU", "vyrobce": "Schering", "sarze": "", "expirace": "", "ean": "", "nakupCena": 3781.76, "cena": 4150.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 249, "sukl": "0028740", "nazev": "JANUVIA 100mg por.tbl.flm.28x100mg", "vyrobce": "MERCK SHARP & DOHME PTY LTD", "sarze": "", "expirace": "", "ean": "", "nakupCena": 843.36, "cena": 961.0, "ks": 200, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 250, "sukl": "0027170", "nazev": "Kaletra 200mg/50mg por.tbl.flm.120", "vyrobce": "Abbott", "sarze": "", "expirace": "", "ean": "", "nakupCena": 9555.22, "cena": 13500.0, "ks": 14, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 251, "sukl": "0025829", "nazev": "KEPPRA 250mg tbl.obd.50x250mg", "vyrobce": "UCB", "sarze": "", "expirace": "", "ean": "", "nakupCena": 226.72, "cena": 435.0, "ks": 100, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 252, "sukl": "0025837", "nazev": "KEPPRA 500mg tbl.obd.100x500mg", "vyrobce": "UCB", "sarze": "", "expirace": "", "ean": "", "nakupCena": 889.85, "cena": 980.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 253, "sukl": "0025898", "nazev": "LEVITRA 20mg por.tbl.flm.4x20mg", "vyrobce": "Bayer", "sarze": "", "expirace": "", "ean": "", "nakupCena": 658.78, "cena": 695.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 254, "sukl": "0134675", "nazev": "Lutinus 100mg tbl.vag. 21x100mg", "vyrobce": "Ferring", "sarze": "", "expirace": "", "ean": "", "nakupCena": 562.28, "cena": 650.0, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 255, "sukl": "0028223", "nazev": "LYRICA 150mg por.cps.dur.56x150mg", "vyrobce": "Pfizer", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1311.91, "cena": 1650.0, "ks": 14, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 256, "sukl": "0028217", "nazev": "LYRICA 75mg por.cps.dur.56x75mg", "vyrobce": "Pfizer", "sarze": "", "expirace": "", "ean": "", "nakupCena": 922.24, "cena": 1475.0, "ks": 40, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 257, "sukl": "0161522", "nazev": "Mictonorm Uno 30mg por.cps.rdr. 28x30mg", "vyrobce": "Apogepha Arzneimittel Gmbh", "sarze": "", "expirace": "", "ean": "", "nakupCena": 181.04, "cena": 210.0, "ks": 47, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 258, "sukl": "0028317", "nazev": "Mimpara 90mg por.tbl.flm.28x90mg", "vyrobce": "Amgen Europe B.v., Breda", "sarze": "", "expirace": "", "ean": "", "nakupCena": 11005.78, "cena": 12225.0, "ks": 3, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 259, "sukl": "0167351", "nazev": "Multaq 400mg por.tbl.flm.60x400mg", "vyrobce": "Sanofi Winthrop Industrie, AmbarÉs", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1698.86, "cena": 1880.0, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 260, "sukl": "0026076", "nazev": "NEUPRO 2mg/24H drm.emp.tdr.7x4.5mg", "vyrobce": "Schwarz", "sarze": "", "expirace": "", "ean": "", "nakupCena": 151.76, "cena": 255.0, "ks": 20, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 261, "sukl": "0026081", "nazev": "NEUPRO 4mg/24 H drm.emp.tdr.7x9mg", "vyrobce": "Schwarz", "sarze": "", "expirace": "", "ean": "", "nakupCena": 279.96, "cena": 312.0, "ks": 20, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 262, "sukl": "0026083", "nazev": "NEUPRO 6mg/24 H drm.emp.tdr.28x13.5mg", "vyrobce": "SCHWARZ PHARMA", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2075.8, "cena": 2305.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 263, "sukl": "0026087", "nazev": "NEUPRO 8mg/24 H drm.emp.tdr.7x18mg", "vyrobce": "Schwarz", "sarze": "", "expirace": "", "ean": "", "nakupCena": 584.51, "cena": 655.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 264, "sukl": "0026767", "nazev": "NOVOMIX 30 FlexPen 100 U/ml inj.sus.5x3ml - zakáz šarže CP51452", "vyrobce": "NOVO NORDISK S.R.O.", "sarze": "", "expirace": "", "ean": "", "nakupCena": 861.85, "cena": 910.0, "ks": 174, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 265, "sukl": "0026794", "nazev": "NOVORAPID FlexPen 100 U/ml inj.sol. 5x3ml", "vyrobce": "NOVO NORDISK S.R.O", "sarze": "", "expirace": "", "ean": "", "nakupCena": 812.47, "cena": 920.46, "ks": 124, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 266, "sukl": "0069242", "nazev": "PULMICORT TURBUHALER plv.inh.200x200RG", "vyrobce": "Astra Zeneca", "sarze": "", "expirace": "", "ean": "", "nakupCena": 596.28, "cena": 790.0, "ks": 100, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 267, "sukl": "0069243", "nazev": "PULMICORT TURBUHALER plv.inh.200x400RG", "vyrobce": "Astra Zeneca", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1201.2, "cena": 1540.0, "ks": 124, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 268, "sukl": "0059764", "nazev": "RELPAX 40mg tbl.obd.2x40mg (ac)", "vyrobce": "HEINRICH MACK", "sarze": "", "expirace": "", "ean": "", "nakupCena": 172.77, "cena": 195.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 269, "sukl": "0025450", "nazev": "Revatio 20mg por.tbl.flm.90x20mg", "vyrobce": "PFIZER (FR)", "sarze": "", "expirace": "", "ean": "", "nakupCena": 10903.66, "cena": 12200.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 270, "sukl": "0104693", "nazev": "RISPERDAL Consta 25mg inj.psu.lqf.25mg alaris", "vyrobce": "Janssen", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2084.82, "cena": 2400.0, "ks": 7, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 271, "sukl": "0104691", "nazev": "RISPERDAL Consta 50mg inj.psu.lqf.50mg alaris", "vyrobce": "Janssen", "sarze": "", "expirace": "", "ean": "", "nakupCena": 3568.28, "cena": 4330.0, "ks": 7, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 272, "sukl": "0075567", "nazev": "SALOFALK 500 tbl.obd.ent.100x500mg", "vyrobce": "FALK", "sarze": "", "expirace": "", "ean": "", "nakupCena": 546.49, "cena": 658.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 273, "sukl": "0015642", "nazev": "SANDIMMUN NEORAL 100mg cps.50x100mg", "vyrobce": "Novartis", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1744.23, "cena": 2100.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 274, "sukl": "0015640", "nazev": "SANDIMMUN NEORAL 25mg cps.50x25mg", "vyrobce": "Novartis", "sarze": "", "expirace": "", "ean": "", "nakupCena": 648.87, "cena": 865.0, "ks": 7, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 275, "sukl": "0015641", "nazev": "SANDIMMUN NEORAL 50mg cps.50x50mg", "vyrobce": "Novartis", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1068.37, "cena": 1182.0, "ks": 20, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 276, "sukl": "0121241", "nazev": "SAYANA 104mg/0.65ml inj.sus.1x0.65ml/104mg", "vyrobce": "Pfizer", "sarze": "", "expirace": "", "ean": "", "nakupCena": 266.45, "cena": 351.0, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 277, "sukl": "0187416", "nazev": "SPERSADEX Comp.opht.gtt.sol. 1x5ml", "vyrobce": "Novartis", "sarze": "", "expirace": "", "ean": "", "nakupCena": 57.3, "cena": 65.0, "ks": 74, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 278, "sukl": "0032393", "nazev": "SPIRIVA inh.plv.cps.30x18RG", "vyrobce": "Boehringer", "sarze": "", "expirace": "", "ean": "", "nakupCena": 756.86, "cena": 918.0, "ks": 100, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 279, "sukl": "0109810", "nazev": "SPIRIVA Respimat 2.5mikrogramu inh.sol.1x60dáv", "vyrobce": "BOEHRINGER INGELHEIM", "sarze": "", "expirace": "", "ean": "", "nakupCena": 788.14, "cena": 955.0, "ks": 100, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 280, "sukl": "0023853", "nazev": "STRATTERA 10mg por.cps.dur.28x10mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1697.66, "cena": 1930.0, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 281, "sukl": "0023858", "nazev": "STRATTERA 18mg por.cps.dur.28x18mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1697.66, "cena": 1900.0, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 282, "sukl": "0023864", "nazev": "Strattera 25mg por.cps.dur.28x25mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1697.75, "cena": 1910.0, "ks": 40, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 283, "sukl": "0023870", "nazev": "STRATTERA 40mg por.cps.dur.28x40mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1697.75, "cena": 1973.0, "ks": 64, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 284, "sukl": "0023876", "nazev": "STRATTERA 60mg por.cps.dur.28x60mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1697.77, "cena": 1900.0, "ks": 40, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 285, "sukl": "0027190", "nazev": "SUTENT 12.5mg por.cps.dur.30x12.5mg", "vyrobce": "PFIZER", "sarze": "", "expirace": "", "ean": "", "nakupCena": 28987.31, "cena": 33000.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 286, "sukl": "0027192", "nazev": "SUTENT 50mg por.cps.dur.30x50mg", "vyrobce": "PFIZER", "sarze": "", "expirace": "", "ean": "", "nakupCena": 118574.05, "cena": 124500.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 287, "sukl": "0027700", "nazev": "TARGRETIN por. cps.mol. 100x75mg", "vyrobce": "Eisai Manufacturing Ltd., Hatfield Velká Británie", "sarze": "", "expirace": "", "ean": "", "nakupCena": 26512.09, "cena": 28500.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 288, "sukl": "0168397", "nazev": "TOBI PODHALER 28mg inh.plv.cps.dur.224 +5 inh.", "vyrobce": "NOVARTIS Pharma (UK)", "sarze": "", "expirace": "", "ean": "", "nakupCena": 42021.87, "cena": 48000.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 289, "sukl": "0028410", "nazev": "TRUVADA por.tbl.flm.1x30", "vyrobce": "GILEAD SCIENCES LIMITED, DUBLIN Irsko", "sarze": "", "expirace": "", "ean": "", "nakupCena": 12569.44, "cena": 15265.0, "ks": 7, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 290, "sukl": "0027184", "nazev": "TYSABRI 300 MG INF CNC SOL 1X15ML(20MG/ML)", "vyrobce": "", "sarze": "", "expirace": "", "ean": "", "nakupCena": 36807.78, "cena": 39300.0, "ks": 10, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 291, "sukl": "0194361", "nazev": "ULTIBRO breezhaler 85/43mcg inh.plv.cps.dur.30+inh", "vyrobce": "NOVARTIS Pharma (SUI)", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1220.92, "cena": 1385.0, "ks": 100, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 292, "sukl": "0062978", "nazev": "VAGIFEM tbl.vag.15x25RG", "vyrobce": "Novo Nordisk", "sarze": "", "expirace": "", "ean": "", "nakupCena": 216.57, "cena": 265.0, "ks": 124, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 293, "sukl": "0097249", "nazev": "Valcyte 450mg por.tbl.flm.60x450mg", "vyrobce": "ROCHE PHARMA AG, GRENZACH-WYHLEN", "sarze": "", "expirace": "", "ean": "", "nakupCena": 29424.15, "cena": 30900.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 294, "sukl": "0029248", "nazev": "Vectibix 20mg/ml ivn.inf.cnc.sol.1x5ml", "vyrobce": "Amgen s.r.o.", "sarze": "", "expirace": "", "ean": "", "nakupCena": 10248.84, "cena": 11233.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 295, "sukl": "0028140", "nazev": "VELCADE 3,5 MG INJ PLV SOL 1X3.5 MG", "vyrobce": "Janssen Pharmaceutica N.v., Beerse", "sarze": "", "expirace": "", "ean": "", "nakupCena": 26028.55, "cena": 27500.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 296, "sukl": "0018287", "nazev": "VESICARE 10mg por.tbl.flm.100x10mg", "vyrobce": "Astellas", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1463.14, "cena": 2700.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 297, "sukl": "0018279", "nazev": "VESICARE 5mg por.tbl.flm.100x5mg", "vyrobce": "Astellas", "sarze": "", "expirace": "", "ean": "", "nakupCena": 742.3, "cena": 2615.0, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 298, "sukl": "0018275", "nazev": "VESICARE 5mg por.tbl.flm.30x5mg", "vyrobce": "Astellas", "sarze": "", "expirace": "", "ean": "", "nakupCena": 406.53, "cena": 650.0, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 299, "sukl": "0026902", "nazev": "VFEND 200mg inf.plv.sol.1x200mg", "vyrobce": "PFIZER", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2674.05, "cena": 3000.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 300, "sukl": "0026889", "nazev": "VFEND 200mg por.tbl.obd.14x200mg", "vyrobce": "HEINRICH MACK", "sarze": "", "expirace": "", "ean": "", "nakupCena": 12930.64, "cena": 14500.0, "ks": 3, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 301, "sukl": "0149309", "nazev": "VICTOZA 6mg/ml inj.sol.3x3ml", "vyrobce": "NOVO NORDISK", "sarze": "", "expirace": "", "ean": "", "nakupCena": 3421.18, "cena": 3600.0, "ks": 124, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 302, "sukl": "0500291", "nazev": "VIMPAT 100mg por.tbl.flm.56x100mg", "vyrobce": "SCHWARZ PHARMA", "sarze": "", "expirace": "", "ean": "", "nakupCena": 1668.32, "cena": 1860.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 303, "sukl": "0500297", "nazev": "VIMPAT 200mg por.tbl.flm.56x200mg", "vyrobce": "SCHWARZ PHARMA", "sarze": "", "expirace": "", "ean": "", "nakupCena": 3303.05, "cena": 3828.57, "ks": 13, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 304, "sukl": "0500287", "nazev": "VIMPAT 50mg por.tbl.flm.14x50mg", "vyrobce": "SCHWARZ PHARMA", "sarze": "", "expirace": "", "ean": "", "nakupCena": 209.99, "cena": 239.0, "ks": 24, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 305, "sukl": "0167725", "nazev": "Votrient 200mg por.tbl. Flm. 30x200mg", "vyrobce": "", "sarze": "", "expirace": "", "ean": "", "nakupCena": 19025.37, "cena": 19980.0, "ks": 4, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 306, "sukl": "0168898", "nazev": "Xarelto 15mg por.tbl.flm.42x15mg", "vyrobce": "Bayer Pharma Ag, Berlín", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2153.97, "cena": 2400.03, "ks": 174, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 307, "sukl": "0168899", "nazev": "XARELTO 15mg por.tbl.flm.98x15mg", "vyrobce": "BAYER", "sarze": "", "expirace": "", "ean": "", "nakupCena": 5026.13, "cena": 5543.48, "ks": 50, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 308, "sukl": "0168088", "nazev": "XEPLION 75mg inj.sus.pro.1x75mg + 2 jehly", "vyrobce": "JANSSEN", "sarze": "", "expirace": "", "ean": "", "nakupCena": 6655.02, "cena": 8000.0, "ks": 3, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 309, "sukl": "0028804", "nazev": "ZONEGRAN 100mg por.cps.dur.98x100mg", "vyrobce": "Eisai", "sarze": "", "expirace": "", "ean": "", "nakupCena": 2955.96, "cena": 3280.0, "ks": 23, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 310, "sukl": "0025930", "nazev": "ZYPREXA 10 tbl.obd.28x10mg", "vyrobce": "Eli lilly", "sarze": "", "expirace": "", "ean": "", "nakupCena": 383.33, "cena": 464.65, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
  {"id": 311, "sukl": "0025925", "nazev": "ZYPREXA 5 tbl.obd.28x5mg (Olanzapine)", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 193.73, "cena": 267.34, "ks": 90, "dodavatel": "DOD-A", "klientKod": "ODB-02"},
  {"id": 312, "sukl": "0025918", "nazev": "ZYPREXA Velotab 5mg por.tbl.dis.28x5mg", "vyrobce": "ELI LILLY", "sarze": "", "expirace": "", "ean": "", "nakupCena": 188.31, "cena": 247.33, "ks": 40, "dodavatel": "DOD-A", "klientKod": "ODB-01"},
];

const PODMINKY = {
  cs: [
    ["Platnost objednávky", "Odeslaná objednávka je závazná 5 pracovních dnů. Po potvrzení nelze měnit bez vzájemné dohody."],
    ["Minimální expirace léčiv", "Dodávané položky mají expiraci minimálně 6 měsíců od data dodání, není-li u položky výslovně uvedeno jinak."],
    ["Platební podmínky", "Splatnost faktur 14 dní od data vystavení dodacího listu. Platba bankovním převodem na účet uvedený na dokladu."],
    ["Svoz zboží", "Svoz zajišťuje provozovatel validovanou přepravou 2× týdně (úterý, čtvrtek). Termín svozu je potvrzen e-mailem."],
    ["Skladovací podmínky", "Skladujte při 15–25 °C, chraňte před přímým světlem a vlhkostí. Chladový řetězec (2–8 °C) je vyznačen u konkrétní položky."],
    ["Reklamace", "Zjevné vady oznamte do 48 hodin od převzetí. Položky s porušeným obalem nepřebírejte a uveďte do dodacího listu."],
  ],
  en: [
    ["Order validity", "A submitted order is binding for 5 business days. Once confirmed, it cannot be changed without mutual agreement."],
    ["Minimum shelf life", "Delivered items have an expiry of at least 6 months from the delivery date unless explicitly stated otherwise."],
    ["Payment terms", "Invoices are due 14 days from the delivery note issue date. Payment by bank transfer to the account stated on the document."],
    ["Goods collection", "Collection is arranged by the operator via validated transport twice a week (Tuesday, Thursday). The date is confirmed by e-mail."],
    ["Storage conditions", "Store at 15–25 °C, protect from direct light and humidity. Cold chain items (2–8 °C) are marked on the product."],
    ["Complaints", "Report visible defects within 48 hours of receipt. Do not accept items with damaged packaging and note them on the delivery note."],
  ],
};

/* ---------- pomocné funkce ---------- */
const DPH = 0.12; // snížená sazba DPH pro léčiva / reduced VAT rate for medicines
const marzePct = (p) => (p.nakupCena > 0 ? ((p.cena / p.nakupCena - 1) * 100) : 0);
const today = () => new Date("2026-07-16");
const plusDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
function expState(exp) {
  if (!exp) return "neuvedena";
  const months = (new Date(exp) - today()) / (1000 * 3600 * 24 * 30.4);
  if (months < 0) return "prosla";
  if (months < 6) return "brzy";
  return "ok";
}

/* ============================================================ */
export default function PortApp() {
  const [lang, setLang] = useState("cs");
  const t = (cs, en) => (lang === "cs" ? cs : en);
  const locale = lang === "cs" ? "cs-CZ" : "en-GB";
  const fmtCZK = (n) => n.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + (lang === "cs" ? " Kč" : " CZK");
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString(locale) : "—");
  const STAV_LABEL = {
    nova: t("Nová", "New"), potvrzena: t("Potvrzená", "Confirmed"), expedovana: t("Expedovaná", "Dispatched"),
  };

  const [user, setUser] = useState(null);
  const [view, setView] = useState("katalog");
  const [products, setProducts] = useState(seedProducts);
  const [orders, setOrders] = useState([]);
  const [emails, setEmails] = useState([]);
  const [cart, setCart] = useState({});
  const [hledat, setHledat] = useState("");
  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState(null);
  const [loginForm, setLoginForm] = useState({ login: "", heslo: "", err: "" });
  const [obnova, setObnova] = useState(null);
  const [novy, setNovy] = useState(null);
  const [users, setUsers] = useState(USERS.map((u) => ({ ...u, aktivni: true })));
  const [clients, setClients] = useState(CLIENTS);
  const [suppliers, setSuppliers] = useState(SUPPLIERS_SEED);
  const [novyUzivatel, setNovyUzivatel] = useState(null);
  const [demands, setDemands] = useState([]);
  const [pozadavky, setPozadavky] = useState([]);
  const [novaPoptavka, setNovaPoptavka] = useState(null);
  const [nabidkaForm, setNabidkaForm] = useState(null);
  const [novyPozadavek, setNovyPozadavek] = useState(null);
  const [akceptForm, setAkceptForm] = useState({});
  const [vybrane, setVybrane] = useState({}); // požadavky vybrané ke sloučení
  const [protiForm, setProtiForm] = useState({}); // protinávrhy admina k nabídkám

  const flash = (x) => { setToast(x); setTimeout(() => setToast(null), 3400); };
  const sendEmail = (to, subject, body) =>
    setEmails((e) => [{ id: e.length + 1, to, subject, body, datum: new Date().toISOString() }, ...e]);

  /* ================= SDÍLENÁ DATA PŘES NETLIFY (demo více počítačů) =================
     Vše, co je „obchodní data" (produkty, objednávky, e-maily, uživatelé, poptávky,
     požadavky), se ukládá do sdílené databáze (Netlify Blobs) přes serverless funkci
     /.netlify/functions/db. Rozpracované formuláře (novaPoptavka, akceptForm, ...)
     zůstávají jen lokálně v prohlížeči — každý uživatel je vidí jen u sebe.
     Pozn.: pro produkční nasazení tuto vrstvu nahradí skutečná databáze dle
     zvolené architektury (Wedos PHP/MySQL nebo Node/PostgreSQL na VPS). ================= */
  const remoteVersion = React.useRef(0);
  const applyingRemote = React.useRef(false);
  const hydrated = React.useRef(false);

  const gatherState = () => ({
    products, orders, emails, users, clients, suppliers, demands, pozadavky,
  });

  const hydrateFrom = (data) => {
    if (!data) return;
    applyingRemote.current = true;
    if (data.products) setProducts(data.products);
    if (data.orders) setOrders(data.orders);
    if (data.emails) setEmails(data.emails);
    if (data.users) setUsers(data.users);
    if (data.clients) setClients(data.clients);
    if (data.suppliers) setSuppliers(data.suppliers);
    if (data.demands) setDemands(data.demands);
    if (data.pozadavky) setPozadavky(data.pozadavky);
    remoteVersion.current = data.updatedAt || Date.now();
    setTimeout(() => { applyingRemote.current = false; }, 0);
  };

  const pushState = async () => {
    try {
      const res = await fetch("/.netlify/functions/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gatherState()),
      });
      if (res.ok) { const r = await res.json(); remoteVersion.current = r.updatedAt; }
    } catch (e) { /* offline / lokální náhled bez Netlify — ticho */ }
  };

  // 1) při startu: stáhnout sdílený stav, nebo pokud ještě neexistuje, nahrát startovní data
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/.netlify/functions/db");
        const data = res.ok ? await res.json() : null;
        if (data) hydrateFrom(data);
        else await pushState();
      } catch (e) { /* běží mimo Netlify (lokální náhled) — pokračuj bez sdílení */ }
      hydrated.current = true;
    })();
  }, []);

  // 2) při každé změně obchodních dat: po krátké prodlevě ulož na server
  React.useEffect(() => {
    if (!hydrated.current || applyingRemote.current) return;
    const timer = setTimeout(() => { pushState(); }, 700);
    return () => clearTimeout(timer);
  }, [products, orders, emails, users, clients, suppliers, demands, pozadavky]);

  // 3) pravidelně kontrolovat, jestli druhý uživatel/počítač něco nezměnil
  React.useEffect(() => {
    const iv = setInterval(async () => {
      try {
        const res = await fetch("/.netlify/functions/db");
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.updatedAt && data.updatedAt > remoteVersion.current) hydrateFrom(data);
      } catch (e) { /* ticho */ }
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  /* ---------- přihlášení / login ---------- */
  const doLogin = () => {
    const u = users.find((x) => x.login === loginForm.login.trim() && x.heslo === loginForm.heslo);
    if (!u) { setLoginForm((f) => ({ ...f, err: t("Nesprávné jméno nebo heslo.", "Incorrect username or password.") })); return; }
    if (u.aktivni === false) { setLoginForm((f) => ({ ...f, err: t("Tento účet byl deaktivován. Kontaktujte správce.", "This account has been deactivated. Contact the administrator.") })); return; }
    setUser(u);
    setView("prehled");
    setLoginForm({ login: "", heslo: "", err: "" });
  };
  const logout = () => { setUser(null); setCart({}); setDetail(null); };
  const genHeslo = () => Array.from({ length: 8 }, () => "abcdefghjkmnpqrstuvwxyz23456789".charAt(Math.floor(Math.random() * 31))).join("");
  const obnovHeslo = () => {
    const id = (obnova?.id || "").trim().toLowerCase();
    if (!id) { flash(t("Zadejte přihlašovací jméno nebo e-mail.", "Enter your username or e-mail.")); return; }
    const u = users.find((x) => x.login.toLowerCase() === id || (x.email || "").toLowerCase() === id);
    if (u && u.email) {
      const nove = genHeslo();
      setUsers((us) => us.map((x) => (x.login === u.login ? { ...x, heslo: nove } : x)));
      sendEmail(u.email, t("PORT — obnova hesla", "PORT — password reset"),
        t(`Vaše nové heslo do portálu PORT: ${nove}. Po přihlášení doporučujeme heslo změnit.`,
          `Your new PORT password: ${nove}. We recommend changing it after signing in.`));
    }
    setObnova(null);
    flash(t("Pokud účet existuje a má vyplněný e-mail, poslali jsme na něj nové heslo.",
            "If the account exists and has an e-mail on file, we have sent a new password to it."));
  };
  const resetHeslo = (u) => {
    const nove = genHeslo();
    setUsers((us) => us.map((x) => (x.login === u.login ? { ...x, heslo: nove } : x)));
    if (u.email) {
      sendEmail(u.email, t("PORT — obnova hesla", "PORT — password reset"),
        t(`Vaše nové heslo do portálu PORT: ${nove}.`, `Your new PORT password: ${nove}.`));
      flash(t(`Nové heslo bylo odesláno na ${u.email}.`, `A new password has been sent to ${u.email}.`));
    } else {
      flash(t(`Nové heslo pro „${u.login}“: ${nove} (uživatel nemá e-mail, předejte mu ho bezpečně).`,
              `New password for "${u.login}": ${nove} (no e-mail on file — hand it over securely).`));
    }
  };

  /* ---------- data podle role ---------- */
  const mojeProdukty = useMemo(() => {
    let list = products;
    if (user?.role === "klient") list = list.filter((p) => p.klientKod === user.kod);
    if (hledat.trim()) {
      const q = hledat.toLowerCase();
      list = list.filter((p) => [p.nazev, p.sukl, p.ean, p.sarze, p.vyrobce].some((v) => (v || "").toLowerCase().includes(q)));
    }
    return list;
  }, [products, user, hledat]);

  const mojeObjednavky = useMemo(() => {
    if (!user) return [];
    if (user.role === "klient") return orders.filter((o) => o.klientKod === user.kod);
    return orders;
  }, [orders, user]);

  /* ---------- objednávka odběratele ---------- */
  const setQty = (p, val) => {
    const n = Math.max(0, Math.min(p.ks, Number(val) || 0));
    setCart((c) => { const x = { ...c }; if (n === 0) delete x[p.id]; else x[p.id] = n; return x; });
  };
  const cartItems = Object.entries(cart)
    .map(([id, ks]) => ({ ...products.find((p) => p.id === Number(id)), mnozstvi: ks }))
    .filter((i) => i.id);
  const cartTotal = cartItems.reduce((s, i) => s + i.mnozstvi * i.cena, 0);

  const odeslatObjednavku = () => {
    if (!cartItems.length) return;
    const cislo = "PORT-2026-" + String(orders.length + 1).padStart(3, "0");
    const o = { cislo, datum: new Date().toISOString(), stav: "nova",
      klientKod: user.kod, klient: clients[user.kod],
      items: cartItems.map((i) => ({ ...i })), celkem: cartTotal };
    setOrders((os) => [o, ...os]);
    setProducts((ps) => ps.map((p) => cart[p.id] ? { ...p, ks: p.ks - cart[p.id] } : p));
    sendEmail(user.email, t(`Potvrzení přijetí objednávky ${cislo}`, `Order ${cislo} received`),
      t(`Vaše objednávka ${cislo} (${cartItems.length} položek, ${fmtCZK(cartTotal)} bez DPH) byla přijata ke zpracování.`,
        `Your order ${cislo} (${cartItems.length} items, ${fmtCZK(cartTotal)} excl. VAT) has been received for processing.`));
    // Dodavatelé se o objednávce odběratele nedozví — prodej vyřizuje výhradně zprostředkovatel.
    sendEmail(OPERATOR.email, t(`Nová objednávka ${cislo} — ${clients[user.kod].nazev}`, `New order ${cislo} — ${clients[user.kod].nazev}`),
      t(`Odběratel vytvořil objednávku (${cartItems.length} položek). Potvrďte ji v záložce Objednávky.`,
        `A buyer has placed an order (${cartItems.length} items). Confirm it in the Orders tab.`));
    setCart({});
    setDetail(o);
    flash(t(`Objednávka ${cislo} byla odeslána. Potvrzení jsme zaslali e-mailem.`,
            `Order ${cislo} has been submitted. A confirmation has been e-mailed to you.`));
  };

  const zmenStav = (o, stav) => {
    setOrders((os) => os.map((x) => (x.cislo === o.cislo ? { ...x, stav } : x)));
    const kUser = users.find((u) => u.kod === o.klientKod);
    sendEmail(kUser?.email || OPERATOR.email,
      t(`Objednávka ${o.cislo}: stav změněn na „${STAV_LABEL[stav]}“`, `Order ${o.cislo}: status changed to "${STAV_LABEL[stav]}"`),
      t(`Stav vaší objednávky ${o.cislo} byl aktualizován.`, `The status of your order ${o.cislo} has been updated.`));
    flash(t(`Stav objednávky ${o.cislo} změněn na „${STAV_LABEL[stav]}“.`, `Order ${o.cislo} status changed to "${STAV_LABEL[stav]}".`));
  };

  const objednatZnovu = (o) => {
    const c = {};
    o.items.forEach((i) => {
      const p = products.find((x) => x.id === i.id);
      if (p && p.ks > 0) c[p.id] = Math.min(i.mnozstvi, p.ks);
    });
    setCart(c); setView("katalog"); setDetail(null);
    flash(t("Položky předchozí objednávky byly vloženy do formuláře.", "Items from the previous order have been added to the form."));
  };

  /* ---------- marketplace: poptávky / nabídky / požadavky ---------- */
  const vytvorPoptavku = (zaklad) => {
    const f = zaklad || novaPoptavka;
    if (!f.nazev || !f.mnozstvi || !f.cena) { flash(t("Vyplňte název, množství a požadovanou cenu.", "Fill in the name, quantity and requested price.")); return; }
    const cislo = "POP-2026-" + String(demands.length + 1).padStart(3, "0");
    const zdroje = f.zdroje || (f.zdroj ? [{ klientKod: f.zdroj, pozCislo: f.pozCislo, mnozstvi: Number(f.mnozstvi), maxCena: f.maxProdejni || null }] : []);
    setDemands((ds) => [{ cislo, datum: new Date().toISOString(), stav: "otevrena",
      sukl: f.sukl || "", nazev: f.nazev, mnozstvi: Number(f.mnozstvi),
      cena: Number(f.cena), provize: Number(f.provize) || 5, maxProdejni: f.maxProdejni || null,
      minExp: f.minExp || "", pozadovanaSarze: f.pozadovanaSarze || "", zdroje,
      nabidky: [] }, ...ds]);
    const pozCisla = zdroje.map((z) => z.pozCislo).filter(Boolean);
    if (pozCisla.length) setPozadavky((ps) => ps.map((p) => (pozCisla.includes(p.cislo) ? { ...p, stav: "vreseni" } : p)));
    Object.values(suppliers).forEach((d) =>
      sendEmail(d.email, t(`Nová poptávka ${cislo}: ${f.nazev}`, `New request for quotation ${cislo}: ${f.nazev}`),
        t(`Poptáváme ${f.mnozstvi} ks za požadovanou cenu ${fmtCZK(Number(f.cena))}/ks. Nabídku podejte v portálu PORT.`,
          `We are requesting ${f.mnozstvi} pcs at a target price of ${fmtCZK(Number(f.cena))}/pc. Submit your offer in the PORT portal.`)));
    setNovaPoptavka(null);
    flash(t(`Poptávka ${cislo} byla odeslána dodavatelům.`, `RFQ ${cislo} has been sent to suppliers.`));
  };

  const podatNabidku = () => {
    const f = nabidkaForm;
    if (!f.cena || !f.mnozstvi) { flash(t("Vyplňte cenu a množství.", "Fill in the price and quantity.")); return; }
    const minOdber = Number(f.minMnozstvi) || null;
    // min. odběr může převyšovat poptávané množství (cenová podmínka „platí od X ks") —
    // dodavatel tím ale garantuje, že X ks umí dodat, proto se nabízené množství zvedne na min. odběr
    const nabizeno = minOdber && minOdber > Number(f.mnozstvi) ? minOdber : Number(f.mnozstvi);
    setDemands((ds) => ds.map((d) => d.cislo === f.demandCislo ? {
      ...d, nabidky: [...d.nabidky, { id: d.nabidky.length + 1, dodavatel: user.kod,
        cena: Number(f.cena), mnozstvi: nabizeno, minMnozstvi: minOdber,
        sarze: f.sarze || "", expirace: f.expirace || "", stav: "podana", datum: new Date().toISOString() }] } : d));
    sendEmail(OPERATOR.email, t(`Nabídka k poptávce ${f.demandCislo} — ${suppliers[user.kod].nazev}`, `Offer for RFQ ${f.demandCislo} — ${suppliers[user.kod].nazev}`),
      t(`Dodavatel nabízí ${nabizeno} ks za ${fmtCZK(Number(f.cena))}/ks${minOdber ? ` (cena platí při odběru min. ${minOdber} ks)` : ""}.`, `The supplier offers ${nabizeno} pcs at ${fmtCZK(Number(f.cena))}/pc${minOdber ? ` (price valid from a min. purchase of ${minOdber} pcs)` : ""}.`));
    setNabidkaForm(null);
    flash(minOdber && minOdber > Number(f.mnozstvi)
      ? t(`Nabídka byla odeslána na ${nabizeno} ks — cena platí od min. odběru ${minOdber} ks.`, `Your offer has been submitted for ${nabizeno} pcs — the price is valid from a min. purchase of ${minOdber} pcs.`)
      : t("Nabídka byla odeslána. O výsledku vás budeme informovat e-mailem.", "Your offer has been submitted. We will inform you of the outcome by e-mail."));
  };

  const akceptujNabidku = (demand, nabidka) => {
    const key = demand.cislo + "-" + nabidka.id;
    const af = akceptForm[key] || {};
    const prodej = Number(af.prodej) || Math.round(nabidka.cena * (1 + (demand.provize || 5) / 100) * 100) / 100;
    const nadLimit = demand.maxProdejni && prodej > demand.maxProdejni;
    const zdroje = demand.zdroje || [];
    const klientKod = af.klientKod || zdroje[0]?.klientKod || "ODB-01";
    // akceptované množství: admin může vzít méně než nabízeno, ne však pod min. odběr dodavatele
    const prijato = Number(af.ks) || nabidka.mnozstvi;
    if (prijato > nabidka.mnozstvi) { flash(t(`Nelze akceptovat více, než dodavatel nabízí (${nabidka.mnozstvi} ks).`, `You cannot accept more than the supplier offers (${nabidka.mnozstvi} pcs).`)); return; }
    if (nabidka.minMnozstvi && prijato < nabidka.minMnozstvi) { flash(t(`Dodavatel podmiňuje cenu min. odběrem ${nabidka.minMnozstvi} ks — akceptujte alespoň toto množství, nebo pošlete protinávrh.`, `The supplier's price requires a min. purchase of ${nabidka.minMnozstvi} pcs — accept at least that quantity, or send a counter-offer.`)); return; }
    // rozdělení akceptovaného množství mezi sloučené odběratele (v pořadí požadavků), zbytek na vybraný kód
    let zbyva = prijato;
    const alokace = [];
    for (const z of zdroje) {
      if (zbyva <= 0) break;
      const take = Math.min(z.mnozstvi, zbyva);
      alokace.push({ ...z, prideleno: take });
      zbyva -= take;
    }
    if (zbyva > 0) alokace.push({ klientKod, pozCislo: null, maxCena: null, mnozstvi: zbyva, prideleno: zbyva, sklad: true });
    setProducts((ps) => [
      ...alokace.map((a) => ({ id: ++PID, sukl: demand.sukl || "", ean: "", nazev: demand.nazev,
        vyrobce: "", sarze: nabidka.sarze, expirace: nabidka.expirace,
        ks: a.prideleno, nakupCena: nabidka.cena, cena: prodej,
        dodavatel: nabidka.dodavatel, klientKod: a.klientKod })),
      ...ps]);
    // pokrytí poptávky: součet dosud akceptovaného + tato nabídka; při plném pokrytí se poptávka automaticky uzavře
    const akceptovanoCelkem = demand.nabidky
      .filter((x) => x.stav === "akceptovana" && x.id !== nabidka.id)
      .reduce((sum, x) => sum + (x.akceptovanoKs ?? x.mnozstvi), 0) + prijato;
    const pokryto = akceptovanoCelkem >= demand.mnozstvi;
    setDemands((ds) => ds.map((d) => d.cislo === demand.cislo ? {
      ...d, stav: pokryto ? "uzavrena" : d.stav,
      nabidky: d.nabidky.map((n) => (n.id === nabidka.id ? { ...n, stav: "akceptovana", akceptovanoKs: prijato } : n)) } : d));
    sendEmail(suppliers[nabidka.dodavatel].email,
      t(`Nabídka k ${demand.cislo} akceptována`, `Offer for ${demand.cislo} accepted`),
      t(`Vaše nabídka byla akceptována v rozsahu ${prijato} ks à ${fmtCZK(nabidka.cena)}. Připravte zboží ke svozu (úterý/čtvrtek).`,
        `Your offer has been accepted for ${prijato} pcs at ${fmtCZK(nabidka.cena)}. Prepare the goods for collection (Tue/Thu).`));
    // vyřízení požadavků a e-maily jednotlivým odběratelům (každý jen o svém přídělu)
    const plne = alokace.filter((a) => a.pozCislo && a.prideleno >= a.mnozstvi).map((a) => a.pozCislo);
    if (plne.length) setPozadavky((ps) => ps.map((p) => (plne.includes(p.cislo) ? { ...p, stav: "vyrizena" } : p)));
    alokace.filter((a) => !a.sklad).forEach((a) => {
      const kUser = users.find((u) => u.kod === a.klientKod);
      const nadJeho = a.maxCena && prodej > a.maxCena;
      if (kUser) sendEmail(kUser.email,
        t(`Vaše poptávka byla vyřízena: ${demand.nazev}`, `Your request has been fulfilled: ${demand.nazev}`),
        t(`Položka je nyní dostupná ve vaší objednávce v portálu PORT (${a.prideleno} ks za ${fmtCZK(prodej)}/ks bez DPH${nadJeho ? ` — cena je vyšší než váš uvedený limit ${fmtCZK(a.maxCena)}, objednávka je na vašem zvážení` : ""}).`,
          `The item is now available in your order form in the PORT portal (${a.prideleno} pcs at ${fmtCZK(prodej)}/pc excl. VAT${nadJeho ? ` — the price is above your stated limit of ${fmtCZK(a.maxCena)}; ordering is at your discretion` : ""}).`));
    });
    const rozpis = alokace.map((a) => `${a.klientKod} ${a.prideleno} ks`).join(", ");
    flash(t(`Nabídka akceptována — naskladněno: ${rozpis} (nákup ${fmtCZK(nabidka.cena)}, prodej ${fmtCZK(prodej)})${pokryto ? ". Poptávka je plně pokryta a byla automaticky uzavřena — ostatním dodavatelům se již nezobrazuje" : ""}${nadLimit ? `. POZOR: prodejní cena je nad limitem odběratele ${fmtCZK(demand.maxProdejni)} — odběratel může objednávku odmítnout.` : "."}`,
            `Offer accepted — stocked: ${rozpis} (buy ${fmtCZK(nabidka.cena)}, sell ${fmtCZK(prodej)})${pokryto ? ". The RFQ is fully covered and has been closed automatically — it is no longer shown to other suppliers" : ""}${nadLimit ? `. WARNING: the selling price exceeds the buyer's limit of ${fmtCZK(demand.maxProdejni)} — the buyer may decline to order.` : "."}`));
  };

  const uzavriPoptavku = (cislo) => setDemands((ds) => ds.map((d) => (d.cislo === cislo ? { ...d, stav: "uzavrena" } : d)));

  /* ---------- handlování nabídek: protinávrh / odmítnutí ---------- */
  const poslatProtinavrh = (demand, nabidka) => {
    const key = demand.cislo + "-" + nabidka.id;
    const pf = protiForm[key] || {};
    const cena = Number(pf.cena) || nabidka.cena;
    const mnozstvi = Number(pf.mnozstvi) || nabidka.mnozstvi;
    setDemands((ds) => ds.map((d) => d.cislo === demand.cislo ? {
      ...d, nabidky: d.nabidky.map((n) => (n.id === nabidka.id ? { ...n, stav: "protinavrh", proti: { cena, mnozstvi, pozn: pf.pozn || "" } } : n)) } : d));
    sendEmail(suppliers[nabidka.dodavatel].email,
      t(`Protinávrh k vaší nabídce (${demand.cislo})`, `Counter-offer to your offer (${demand.cislo})`),
      t(`K vaší nabídce ${nabidka.mnozstvi} ks à ${fmtCZK(nabidka.cena)} navrhujeme: ${mnozstvi} ks à ${fmtCZK(cena)}/ks bez DPH.${pf.pozn ? ` Vzkaz: ${pf.pozn}` : ""} Protinávrh přijměte nebo odmítněte v portálu PORT.`,
        `In response to your offer of ${nabidka.mnozstvi} pcs at ${fmtCZK(nabidka.cena)} we propose: ${mnozstvi} pcs at ${fmtCZK(cena)}/pc excl. VAT.${pf.pozn ? ` Message: ${pf.pozn}` : ""} Accept or decline the counter-offer in the PORT portal.`));
    setProtiForm((f) => ({ ...f, [key]: { open: false } }));
    flash(t(`Protinávrh byl odeslán dodavateli (${mnozstvi} ks à ${fmtCZK(cena)}).`, `The counter-offer has been sent to the supplier (${mnozstvi} pcs at ${fmtCZK(cena)}).`));
  };

  const odmitniNabidku = (demand, nabidka) => {
    setDemands((ds) => ds.map((d) => d.cislo === demand.cislo ? {
      ...d, nabidky: d.nabidky.map((n) => (n.id === nabidka.id ? { ...n, stav: "odmitnuta" } : n)) } : d));
    sendEmail(suppliers[nabidka.dodavatel].email,
      t(`Nabídka k ${demand.cislo} nebyla přijata`, `Offer for ${demand.cislo} was not accepted`),
      t(`Vaše nabídka (${nabidka.mnozstvi} ks à ${fmtCZK(nabidka.cena)}) nebyla přijata. Pokud je poptávka stále otevřená, můžete podat novou nabídku.`,
        `Your offer (${nabidka.mnozstvi} pcs at ${fmtCZK(nabidka.cena)}) was not accepted. If the RFQ is still open, you may submit a new offer.`));
    flash(t("Nabídka byla odmítnuta. Dodavatel byl informován e-mailem.", "The offer has been rejected. The supplier has been notified by e-mail."));
  };

  const prijmiProtinavrh = (demand, nabidka) => {
    const proti = nabidka.proti || {};
    setDemands((ds) => ds.map((d) => d.cislo === demand.cislo ? {
      ...d, nabidky: d.nabidky.map((n) => (n.id === nabidka.id
        ? { ...n, cena: proti.cena ?? n.cena, mnozstvi: proti.mnozstvi ?? n.mnozstvi, stav: "podana", upravena: true, proti: null } : n)) } : d));
    sendEmail(OPERATOR.email,
      t(`Dodavatel přijal protinávrh (${demand.cislo}) — ${suppliers[nabidka.dodavatel].nazev}`, `Supplier accepted the counter-offer (${demand.cislo}) — ${suppliers[nabidka.dodavatel].nazev}`),
      t(`Nabídka byla upravena na ${proti.mnozstvi} ks à ${fmtCZK(proti.cena)}/ks a čeká na akceptaci.`,
        `The offer has been revised to ${proti.mnozstvi} pcs at ${fmtCZK(proti.cena)}/pc and awaits acceptance.`));
    flash(t("Protinávrh jste přijali — upravená nabídka čeká na akceptaci provozovatelem.", "You have accepted the counter-offer — the revised offer awaits the operator's acceptance."));
  };

  const odmitniProtinavrh = (demand, nabidka) => {
    setDemands((ds) => ds.map((d) => d.cislo === demand.cislo ? {
      ...d, nabidky: d.nabidky.map((n) => (n.id === nabidka.id ? { ...n, stav: "odmitnuta" } : n)) } : d));
    sendEmail(OPERATOR.email,
      t(`Dodavatel odmítl protinávrh (${demand.cislo}) — ${suppliers[nabidka.dodavatel].nazev}`, `Supplier declined the counter-offer (${demand.cislo}) — ${suppliers[nabidka.dodavatel].nazev}`),
      t(`Dodavatel protinávrh nepřijal a nabídku stáhl.`, `The supplier declined the counter-offer and withdrew the offer.`));
    flash(t("Protinávrh jste odmítli — vaše nabídka byla stažena. Můžete podat novou.", "You have declined the counter-offer — your offer has been withdrawn. You may submit a new one."));
  };

  const odesliPozadavek = () => {
    const f = novyPozadavek;
    if (!f.nazev || !f.mnozstvi) { flash(t("Vyplňte název položky a množství.", "Fill in the item name and quantity.")); return; }
    const cislo = "POZ-2026-" + String(pozadavky.length + 1).padStart(3, "0");
    setPozadavky((ps) => [{ cislo, datum: new Date().toISOString(), klientKod: user.kod,
      nazev: f.nazev, sukl: f.sukl || "", mnozstvi: Number(f.mnozstvi), maxCena: Number(f.maxCena) || null,
      sarze: f.sarze || "", minExp: f.minExp || "", pozn: f.pozn || "", stav: "prijata" }, ...ps]);
    sendEmail(OPERATOR.email, t(`Nový požadavek odběratele ${cislo} — ${clients[user.kod].nazev}`, `New buyer request ${cislo} — ${clients[user.kod].nazev}`),
      t(`Odběratel poptává: ${f.nazev}, ${f.mnozstvi} ks${f.maxCena ? `, max. ${fmtCZK(Number(f.maxCena))}/ks` : ""}${f.sarze ? `, šarže ${f.sarze}` : ""}${f.minExp ? `, min. expirace ${fmtDate(f.minExp)}` : ""}. ${f.pozn || ""}`,
        `The buyer requests: ${f.nazev}, ${f.mnozstvi} pcs${f.maxCena ? `, max. ${fmtCZK(Number(f.maxCena))}/pc` : ""}${f.sarze ? `, batch ${f.sarze}` : ""}${f.minExp ? `, min. expiry ${fmtDate(f.minExp)}` : ""}. ${f.pozn || ""}`));
    setNovyPozadavek(null);
    flash(t(`Poptávka ${cislo} byla odeslána. Ozveme se, jakmile položku potvrdíme.`,
            `Request ${cislo} has been sent. We will get back to you once the item is confirmed.`));
  };

  /* ---------- admin: centrální tabulka ---------- */
  const smazProdukt = (id) => setProducts((ps) => ps.filter((p) => p.id !== id));
  const upravPole = (id, pole, val) =>
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, [pole]: pole === "ks" || pole === "cena" || pole === "nakupCena" ? Number(val) || 0 : val } : p)));
  const ulozNovy = () => {
    if (!novy.nazev || !novy.sukl) { flash(t("Vyplňte alespoň kód SÚKL a název.", "Fill in at least the SÚKL code and name.")); return; }
    setProducts((ps) => [{ ...novy, id: ++PID, ks: Number(novy.ks) || 0, nakupCena: Number(novy.nakupCena) || 0, cena: Number(novy.cena) || 0 }, ...ps]);
    setNovy(null); flash(t("Položka byla přidána do centrální tabulky.", "The item has been added to the central table."));
  };

  /* ---------- admin: uživatelé ---------- */
  const toggleUzivatel = (login) => setUsers((us) => us.map((u) => (u.login === login ? { ...u, aktivni: !u.aktivni } : u)));
  const smazUzivatele = (login) => setUsers((us) => us.filter((u) => u.login !== login));
  const ulozUzivatele = () => {
    const f = novyUzivatel;
    if (!f.jmeno || !f.login || !f.heslo) { flash(t("Vyplňte jméno, přihlašovací jméno a heslo.", "Fill in the name, username and password.")); return; }
    if (users.some((u) => u.login === f.login.trim())) { flash(t("Toto přihlašovací jméno už existuje.", "This username already exists.")); return; }
    let kod = f.kod;
    if (f.role === "klient" && kod === "__novy__") {
      kod = "ODB-" + String(Object.keys(clients).length + 1).padStart(2, "0");
      setClients((c) => ({ ...c, [kod]: { nazev: f.firma || f.jmeno, ic: f.ic || "—", dic: f.dic || "—", adresa: f.adresa || "—" } }));
    }
    if (f.role === "dodavatel" && kod === "__novy__") {
      kod = "DOD-" + String.fromCharCode(65 + Object.keys(suppliers).length);
      setSuppliers((s) => ({ ...s, [kod]: { nazev: f.firma || f.jmeno, ic: f.ic || "—", dic: f.dic || "—", adresa: f.adresa || "—", email: f.email || "" } }));
    }
    if (f.role === "admin") kod = undefined;
    setUsers((us) => [...us, { login: f.login.trim(), heslo: f.heslo, role: f.role, jmeno: f.jmeno, email: f.email, kod, aktivni: true }]);
    if (f.poslatHeslo && f.email) {
      sendEmail(f.email, t("PORT — přístup do portálu", "PORT — your portal access"),
        t(`Byl vám založen účet v portálu PORT (ezdravotnici.cz). Přihlašovací jméno: ${f.login.trim()}, heslo: ${f.heslo}. Po prvním přihlášení doporučujeme heslo změnit.`,
          `An account has been created for you in the PORT portal (ezdravotnici.cz). Username: ${f.login.trim()}, password: ${f.heslo}. We recommend changing the password after your first sign-in.`));
    }
    setNovyUzivatel(null);
    flash(t(`Uživatel „${f.login.trim()}“ byl vytvořen${kod ? ` a přidělen kód ${kod}` : ""}${f.poslatHeslo && f.email ? ", přístupy odeslány e-mailem" : ""}.`,
            `User "${f.login.trim()}" has been created${kod ? ` and assigned code ${kod}` : ""}${f.poslatHeslo && f.email ? ", credentials sent by e-mail" : ""}.`));
  };

  /* ============================================================ */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
    :root{
      --bg:#F1EFFA; --surface:#FFFFFF; --ink:#211B4E; --muted:#6C6890;
      --brand:#7C6AE8; --brand-dk:#4E3FC8; --brand-lt:#EAE6FB; --peri:#D9E0F8;
      --line:#E3E0F1; --amber:#B45309; --amber-bg:#FDF1E3; --red:#B91C1C; --red-bg:#FDECEE;
      --ok:#177A45; --ok-bg:#E6F5EC;
    }
    *{box-sizing:border-box}
    .port{min-height:100vh;background:var(--bg);color:var(--ink);
      font-family:'Manrope',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.45}
    .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.86em;letter-spacing:.02em}
    .wrap{max-width:1080px;margin:0 auto;padding:0 20px}
    .top{background:var(--ink);color:#fff}
    .top .wrap{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-top:12px;padding-bottom:12px}
    .logo{display:flex;align-items:center;gap:10px}
    .logo .badge{width:40px;height:40px;border-radius:12px;background:#fff;display:grid;place-items:center}
    .logo .badge img{width:30px;height:30px;display:block}
    .logo b{font-size:19px;letter-spacing:.14em}
    .logo small{display:block;font-size:11px;opacity:.75;letter-spacing:.03em;font-weight:400}
    .spacer{flex:1}
    .who{font-size:13px;opacity:.9;text-align:right}
    .who b{display:block;font-size:14px}
    .langsw{display:flex;gap:2px;border:1px solid rgba(255,255,255,.35);border-radius:8px;overflow:hidden}
    .langsw button{background:none;border:none;color:#fff;opacity:.6;font:inherit;font-size:12px;font-weight:700;padding:5px 9px;cursor:pointer}
    .langsw button.on{opacity:1;background:rgba(255,255,255,.18)}
    .langsw.dark{border-color:var(--line)}
    .langsw.dark button{color:var(--ink)}
    .langsw.dark button.on{background:var(--brand-lt)}
    .nav{background:var(--brand);color:#fff}
    .nav .wrap{display:flex;gap:2px;overflow-x:auto;padding-left:12px;padding-right:12px}
    .nav button{background:none;border:none;color:#EAE6FB;padding:11px 15px;font:inherit;font-size:14px;
      cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap}
    .nav button.on{color:#fff;font-weight:700;border-bottom-color:var(--peri)}
    .nav button:hover{color:#fff}
    main{padding:26px 0 90px}
    h1{font-size:21px;margin:0 0 4px;letter-spacing:-.01em;font-weight:800}
    .sub{color:var(--muted);font-size:14px;margin:0 0 18px}
    .card{background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden}
    .card + .card{margin-top:16px}
    .card .pad{padding:18px 20px}
    .toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:14px 20px;border-bottom:1px solid var(--line);background:#FAF9FE}
    input[type=text],input[type=password],input[type=number],input[type=date],select{
      border:1px solid var(--line);border-radius:8px;padding:8px 10px;font:inherit;font-size:14px;background:#fff;color:var(--ink)}
    input:focus,select:focus,button:focus-visible{outline:2px solid var(--brand);outline-offset:1px}
    .search{flex:1;min-width:200px}
    .table-wrap{overflow-x:auto}
    table{width:100%;border-collapse:collapse;font-size:14px}
    th{background:#F6F4FC;color:var(--muted);text-transform:uppercase;font-size:11px;letter-spacing:.06em;
      text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);white-space:nowrap}
    td{padding:10px 12px;border-bottom:1px solid #F0EEF8;vertical-align:middle}
    tr:last-child td{border-bottom:none}
    td.num,th.num{text-align:right}
    .pill{display:inline-block;padding:2px 9px;border-radius:99px;font-size:12px;font-weight:600;white-space:nowrap}
    .pill.ok{background:var(--ok-bg);color:var(--ok)} .pill.brzy{background:var(--amber-bg);color:var(--amber)}
    .pill.prosla{background:var(--red-bg);color:var(--red)}
    .pill.nova{background:var(--peri);color:#3D3F8F} .pill.potvrzena{background:var(--amber-bg);color:var(--amber)}
    .pill.expedovana{background:var(--ok-bg);color:var(--ok)}
    .qty{width:74px;text-align:right}
    .btn{background:var(--brand);color:#fff;border:none;border-radius:9px;padding:10px 18px;font:inherit;
      font-size:14px;font-weight:700;cursor:pointer}
    .btn:hover{background:var(--brand-dk)} .btn:disabled{opacity:.45;cursor:default}
    .btn.sec{background:#fff;color:var(--brand-dk);border:1px solid var(--line);font-weight:600}
    .btn.sec:hover{background:#F4F2FC}
    .btn.mini{padding:6px 11px;font-size:13px;border-radius:7px}
    .btn.danger{background:#fff;color:var(--red);border:1px solid #F0C9C9}
    .link{background:none;border:none;color:var(--brand-dk);font:inherit;font-size:14px;text-decoration:underline;cursor:pointer;padding:0}
    .cartbar{position:fixed;left:0;right:0;bottom:0;background:var(--ink);color:#fff;z-index:40}
    .cartbar .wrap{display:flex;align-items:center;gap:14px;padding:13px 20px;flex-wrap:wrap}
    .cartbar b{font-size:16px}
    .login{min-height:100vh;display:grid;place-items:center;padding:24px;
      background:linear-gradient(160deg,#211B4E 0%,#4E3FC8 55%,#8B7BEF 100%)}
    .login .box{background:#fff;border-radius:16px;padding:34px 32px;width:100%;max-width:400px;box-shadow:0 24px 60px rgba(33,27,78,.35);position:relative}
    .login label{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:14px 0 5px}
    .login input{width:100%}
    .login .err{color:var(--red);font-size:13px;margin-top:10px}
    .demo{margin-top:20px;border-top:1px dashed var(--line);padding-top:14px;font-size:12.5px;color:var(--muted)}
    .demo code{background:#F1EFFA;border-radius:5px;padding:1px 6px}
    .overlay{position:fixed;inset:0;background:rgba(15,40,45,.55);z-index:50;display:grid;place-items:start center;overflow:auto;padding:30px 14px}
    .doc{background:#fff;border-radius:12px;max-width:760px;width:100%;padding:34px 38px;position:relative}
    .doc h2{margin:0;font-size:20px} .doc .dnum{color:var(--muted);font-size:14px}
    .doc .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:20px 0}
    .doc .party{border:1px solid var(--line);border-radius:10px;padding:12px 14px;font-size:13.5px}
    .doc .party h4{margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
    .doc .meta{display:flex;gap:24px;flex-wrap:wrap;font-size:13.5px;margin-bottom:16px}
    .doc .meta span{color:var(--muted);display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em}
    .doc table{font-size:13px}
    .doc tfoot td{font-weight:700;border-top:2px solid var(--ink)}
    .sig{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:44px;font-size:13px;color:var(--muted)}
    .sig div{border-top:1px solid var(--ink);padding-top:6px}
    .doc .actions{display:flex;gap:10px;justify-content:flex-end;margin-top:26px}
    .stamp{position:absolute;top:30px;right:38px;border:2px solid var(--brand);color:var(--brand);
      border-radius:8px;padding:4px 12px;font-weight:800;letter-spacing:.1em;font-size:13px;transform:rotate(-4deg)}
    .terms dt{font-weight:700;margin-top:16px} .terms dd{margin:4px 0 0;color:#3B3563}
    .mail{padding:14px 20px;border-bottom:1px solid #F0EEF8;font-size:14px}
    .mail:last-child{border-bottom:none}
    .mail .to{color:var(--muted);font-size:12.5px}
    .toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);background:var(--ink);color:#fff;
      padding:11px 20px;border-radius:10px;font-size:14px;z-index:80;box-shadow:0 10px 30px rgba(0,0,0,.3);max-width:92vw}
    .empty{padding:40px 20px;text-align:center;color:var(--muted)}
    @media(max-width:640px){ .doc{padding:24px 18px} .doc .grid2,.sig{grid-template-columns:1fr} .who{display:none} }
    @media print{
      .no-print{display:none !important}
      .overlay{position:static;background:none;padding:0}
      .doc{box-shadow:none;border-radius:0;max-width:none}
      .port>*:not(.overlay){display:none}
    }
  `;

  const LangSwitch = ({ dark }) => (
    <div className={"langsw" + (dark ? " dark" : "")} role="group" aria-label="Language">
      <button className={lang === "cs" ? "on" : ""} onClick={() => setLang("cs")}>CS</button>
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
    </div>
  );

  /* ---------- přihlašovací obrazovka ---------- */
  if (!user) {
    return (
      <div className="port">
        <style>{css}</style>
        {toast && <div className="toast">{toast}</div>}
        <div className="login">
          <div className="box">
            <div style={{ position: "absolute", top: 16, right: 16 }}><LangSwitch dark /></div>
            <div className="logo" style={{ color: "var(--ink)" }}>
              <div className="badge" style={{ background: "var(--brand-lt)" }}><img src={LOGO_DARK} alt="ezdravotnici.cz" /></div>
              <div><b style={{ letterSpacing: ".14em" }}>PORT</b>
                <small style={{ color: "var(--muted)" }}>marketplace · ezdravotnici<span style={{ color: "#A9B7EE", fontWeight: 700 }}>.cz</span></small></div>
            </div>
            <label>{t("Přihlašovací jméno", "Username")}</label>
            <input type="text" value={loginForm.login} autoComplete="off"
              onChange={(e) => setLoginForm((f) => ({ ...f, login: e.target.value, err: "" }))}
              onKeyDown={(e) => e.key === "Enter" && doLogin()} />
            <label>{t("Heslo", "Password")}</label>
            <input type="password" value={loginForm.heslo}
              onChange={(e) => setLoginForm((f) => ({ ...f, heslo: e.target.value, err: "" }))}
              onKeyDown={(e) => e.key === "Enter" && doLogin()} />
            {loginForm.err && <div className="err">{loginForm.err}</div>}
            <button className="btn" style={{ width: "100%", marginTop: 20 }} onClick={doLogin}>{t("Přihlásit se", "Sign in")}</button>
            {!obnova && (
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button className="link" style={{ fontSize: 13 }} onClick={() => setObnova({ id: "" })}>{t("Zapomněli jste heslo?", "Forgot your password?")}</button>
              </div>
            )}
            {obnova && (
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                <label>{t("Přihlašovací jméno nebo e-mail", "Username or e-mail")}</label>
                <input type="text" value={obnova.id} onChange={(e) => setObnova({ id: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && obnovHeslo()} />
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button className="btn" style={{ flex: 1 }} onClick={obnovHeslo}>{t("Obnovit heslo", "Reset password")}</button>
                  <button className="btn sec" onClick={() => setObnova(null)}>{t("Zpět", "Back")}</button>
                </div>
              </div>
            )}
            <div className="demo">
              <b>{t("Ukázkové účty:", "Demo accounts:")}</b><br />
              {t("odběratel", "buyer")} — <code>lekarna / demo</code> {t("nebo", "or")} <code>klinika / demo</code><br />
              {t("dodavatel", "supplier")} — <code>dodavatel / demo</code> · admin — <code>admin / admin</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- navigace podle role ---------- */
  const tabs =
    user.role === "klient" ? [
      ["prehled", t("Přehled", "Dashboard")],
      ["katalog", t("Moje objednávka", "My order")],
      ["pozadavky", t("Moje poptávky", "My requests")],
      ["historie", t("Historie objednávek", "Order history")],
      ["podminky", t("Podmínky obchodování", "Terms of trade")],
    ] :
    user.role === "dodavatel" ? [
      ["prehled", t("Přehled", "Dashboard")],
      ["poptavky", t("Poptávky", "RFQs")],
      ["podminky", t("Podmínky obchodování", "Terms of trade")],
    ] : [
      ["prehled", t("Přehled", "Dashboard")],
      ["produkty", t("Centrální tabulka", "Central table")],
      ["poptavky", t("Poptávky", "RFQs")],
      ["objednavky", t("Objednávky", "Orders")],
      ["uzivatele", t("Uživatelé", "Users")],
      ["emaily", t("Odeslané e-maily", "Sent e-mails")],
      ["podminky", t("Podmínky", "Terms")],
    ];

  const lbl = { fontSize: 12, color: "var(--muted)" };

  return (
    <div className="port">
      <style>{css}</style>

      <header className="top no-print">
        <div className="wrap">
          <div className="logo">
            <div className="badge"><img src={LOGO} alt="ezdravotnici.cz" /></div>
            <div><b>PORT</b><small>marketplace · ezdravotnici<span style={{ color: "var(--peri)", fontWeight: 700 }}>.cz</span></small></div>
          </div>
          <div className="spacer" />
          <LangSwitch />
          <div className="who"><b>{user.jmeno}</b>{user.kod ? <span className="mono">{t("kód", "code")} {user.kod}</span> : t("správce systému", "system administrator")}</div>
          <button className="btn sec mini" onClick={logout}>{t("Odhlásit", "Sign out")}</button>
        </div>
      </header>
      <nav className="nav no-print">
        <div className="wrap">
          {tabs.map(([id, label]) => (
            <button key={id} className={view === id ? "on" : ""} onClick={() => { setView(id); setHledat(""); }}>{label}</button>
          ))}
        </div>
      </nav>

      <main className="no-print">
        <div className="wrap">

          {/* ============ ODBĚRATEL: nástěnka (přehled) ============ */}
          {view === "prehled" && user.role === "klient" && (() => {
            const mojeObj = orders.filter((o) => o.klientKod === user.kod);
            const otevrene = mojeObj.filter((o) => o.stav !== "expedovana");
            const hodnota = mojeObj.reduce((sum, o) => sum + o.celkem, 0);
            const mojePoz = pozadavky.filter((pz) => pz.klientKod === user.kod);
            const cekajici = mojePoz.filter((pz) => pz.stav !== "vyrizena");
            const vNabidce = products.filter((pr) => pr.klientKod === user.kod && pr.ks > 0).length;
            const stat = { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", cursor: "pointer" };
            const num = { fontSize: 26, fontWeight: 800, lineHeight: 1.2 };
            const cap = { fontSize: 12.5, color: "var(--muted)", marginTop: 2 };
            return (
              <>
                <h1>{t("Přehled", "Dashboard")}</h1>
                <p className="sub">{t(`Vítejte, ${clients[user.kod].nazev}. Rychlý přehled vašich objednávek a poptávek.`,
                                      `Welcome, ${clients[user.kod].nazev}. A quick overview of your orders and requests.`)}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 18 }}>
                  <div style={stat} onClick={() => setView("historie")}>
                    <div style={num}>{mojeObj.length}</div><div style={cap}>{t("Objednávky celkem", "Orders total")}</div></div>
                  <div style={stat} onClick={() => setView("historie")}>
                    <div style={{ ...num, color: otevrene.length ? "var(--brand-dk)" : "var(--ink)" }}>{otevrene.length}</div><div style={cap}>{t("Otevřené objednávky", "Open orders")}</div></div>
                  <div style={stat} onClick={() => setView("historie")}>
                    <div style={num}>{fmtCZK(hodnota)}</div><div style={cap}>{t("Hodnota objednávek bez DPH", "Order value excl. VAT")}</div></div>
                  <div style={stat} onClick={() => setView("pozadavky")}>
                    <div style={num}>{mojePoz.length}</div><div style={cap}>{t("Moje poptávky", "My requests")}</div></div>
                  <div style={stat} onClick={() => setView("pozadavky")}>
                    <div style={{ ...num, color: cekajici.length ? "var(--amber)" : "var(--ok)" }}>{cekajici.length}</div><div style={cap}>{t("Poptávky ve vyřizování", "Requests in progress")}</div></div>
                  <div style={stat} onClick={() => setView("katalog")}>
                    <div style={num}>{vNabidce}</div><div style={cap}>{t("Položek ve vaší nabídce", "Items in your order form")}</div></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Poslední objednávky", "Recent orders")}</b>
                      <div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("historie")}>{t("Všechny", "All")}</button></div>
                    {!mojeObj.length && <div className="empty">{t("Zatím žádné objednávky.", "No orders yet.")}</div>}
                    {mojeObj.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Datum", "Date")}</th><th className="num">{t("Celkem", "Total")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                        <tbody>{mojeObj.slice(0, 5).map((o) => (
                          <tr key={o.cislo}>
                            <td className="mono"><button className="link" onClick={() => setDetail(o)}><b>{o.cislo}</b></button></td>
                            <td>{fmtDate(o.datum)}</td>
                            <td className="num">{fmtCZK(o.celkem)}</td>
                            <td><span className={"pill " + o.stav}>{STAV_LABEL[o.stav]}</span></td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Poslední poptávky", "Recent requests")}</b>
                      <div className="spacer" />
                      <button className="btn mini" onClick={() => { setView("pozadavky"); setNovyPozadavek({ nazev: "", sukl: "", mnozstvi: "", maxCena: "", sarze: "", minExp: "", pozn: "" }); }}>{t("+ Nová poptávka", "+ New request")}</button></div>
                    {!mojePoz.length && <div className="empty">{t("Zatím žádné poptávky.", "No requests yet.")}</div>}
                    {mojePoz.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                        <tbody>{mojePoz.slice(0, 5).map((pz) => (
                          <tr key={pz.cislo}>
                            <td className="mono"><b>{pz.cislo}</b></td>
                            <td>{pz.nazev}</td>
                            <td className="num">{pz.mnozstvi}</td>
                            <td><span className={"pill " + (pz.stav === "vyrizena" ? "ok" : "nova")}>{pz.stav === "vyrizena" ? t("vyřízena", "fulfilled") : t("přijata", "received")}</span></td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}

          {/* ============ DODAVATEL: nástěnka (přehled) ============ */}
          {view === "prehled" && user.role === "dodavatel" && (() => {
            const otevrPoptavky = demands.filter((d) => d.stav === "otevrena");
            const mojeNabidky = demands.flatMap((d) => d.nabidky.filter((n) => n.dodavatel === user.kod).map((n) => ({ ...n, demand: d })));
            const cekaji = mojeNabidky.filter((n) => n.stav === "podana");
            const protinavrhy = mojeNabidky.filter((n) => n.stav === "protinavrh");
            const akceptovane = mojeNabidky.filter((n) => n.stav === "akceptovana");
            const bezNabidky = otevrPoptavky.filter((d) => !d.nabidky.some((n) => n.dodavatel === user.kod));
            const stat = { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", cursor: "pointer" };
            const num = { fontSize: 26, fontWeight: 800, lineHeight: 1.2 };
            const cap = { fontSize: 12.5, color: "var(--muted)", marginTop: 2 };
            return (
              <>
                <h1>{t("Přehled", "Dashboard")}</h1>
                <p className="sub">{t(`Vítejte, ${suppliers[user.kod].nazev}. Rychlý přehled poptávek a vašich nabídek.`,
                                      `Welcome, ${suppliers[user.kod].nazev}. A quick overview of RFQs and your offers.`)}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 18 }}>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={{ ...num, color: bezNabidky.length ? "var(--brand-dk)" : "var(--ink)" }}>{bezNabidky.length}</div><div style={cap}>{t("Nové poptávky bez vaší nabídky", "New RFQs without your offer")}</div></div>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={num}>{otevrPoptavky.length}</div><div style={cap}>{t("Otevřené poptávky celkem", "Open RFQs total")}</div></div>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={num}>{cekaji.length}</div><div style={cap}>{t("Moje nabídky čekající na vyhodnocení", "My offers awaiting evaluation")}</div></div>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={{ ...num, color: protinavrhy.length ? "var(--amber)" : "var(--ink)" }}>{protinavrhy.length}</div><div style={cap}>{t("Protinávrhy čekající na mě", "Counter-offers awaiting me")}</div></div>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={{ ...num, color: "var(--ok)" }}>{akceptovane.length}</div><div style={cap}>{t("Akceptováno — připravit ke svozu", "Accepted — prepare for collection")}</div></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Aktuální otevřené poptávky", "Current open RFQs")}</b>
                      <div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("poptavky")}>{t("Všechny", "All")}</button></div>
                    {!otevrPoptavky.length && <div className="empty">{t("Momentálně nejsou vypsány žádné poptávky.", "There are currently no open RFQs.")}</div>}
                    {otevrPoptavky.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Požadovaná cena", "Target price")}</th></tr></thead>
                        <tbody>{otevrPoptavky.slice(0, 5).map((d) => (
                          <tr key={d.cislo}>
                            <td className="mono"><b>{d.cislo}</b></td>
                            <td>{d.nazev}</td>
                            <td className="num">{d.mnozstvi}</td>
                            <td className="num">{fmtCZK(d.cena)}</td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Moje poslední nabídky", "My recent offers")}</b>
                      <div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("poptavky")}>{t("Všechny", "All")}</button></div>
                    {!mojeNabidky.length && <div className="empty">{t("Zatím jste nepodali žádnou nabídku.", "You have not submitted any offers yet.")}</div>}
                    {mojeNabidky.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Poptávka", "RFQ")}</th><th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Cena", "Price")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                        <tbody>{mojeNabidky.slice(0, 5).map((n) => (
                          <tr key={n.demand.cislo + "-" + n.id}>
                            <td className="mono">{n.demand.cislo}</td>
                            <td className="num">{n.mnozstvi}</td>
                            <td className="num">{fmtCZK(n.cena)}</td>
                            <td><span className={"pill " + (n.stav === "akceptovana" ? "ok" : n.stav === "odmitnuta" ? "prosla" : n.stav === "protinavrh" ? "brzy" : "nova")}>
                              {n.stav === "akceptovana" ? t("akceptována", "accepted") : n.stav === "odmitnuta" ? t("odmítnuta", "rejected") : n.stav === "protinavrh" ? t("protinávrh", "counter-offer") : t("čeká", "pending")}</span></td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}

          {/* ============ ADMIN: nástěnka (přehled) ============ */}
          {view === "prehled" && user.role === "admin" && (() => {
            const otevrPoptavky = demands.filter((d) => d.stav === "otevrena");
            const cekajiciNabidky = otevrPoptavky.reduce((sum, d) => sum + d.nabidky.filter((n) => n.stav === "podana").length, 0);
            const protinavrhy = otevrPoptavky.reduce((sum, d) => sum + d.nabidky.filter((n) => n.stav === "protinavrh").length, 0);
            const nevyrizenePoz = pozadavky.filter((pz) => pz.stav === "prijata");
            const noveObj = orders.filter((o) => o.stav === "nova");
            const kExpedici = orders.filter((o) => o.stav === "potvrzena");
            const expirujici = products.filter((pr) => { const st = expState(pr.expirace); return st === "brzy" || st === "prosla"; });
            const aktivniUziv = users.filter((u) => u.aktivni !== false);
            const stat = { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", cursor: "pointer" };
            const num = { fontSize: 26, fontWeight: 800, lineHeight: 1.2 };
            const cap = { fontSize: 12.5, color: "var(--muted)", marginTop: 2 };
            return (
              <>
                <h1>{t("Přehled", "Dashboard")}</h1>
                <p className="sub">{t("Souhrn dění v portálu — poptávky, objednávky a požadavky vyžadující pozornost.",
                                      "A summary of portal activity — RFQs, orders and requests needing attention.")}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 18 }}>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={{ ...num, color: nevyrizenePoz.length ? "var(--brand-dk)" : "var(--ink)" }}>{nevyrizenePoz.length}</div><div style={cap}>{t("Nevyřízené požadavky odběratelů", "Pending buyer requests")}</div></div>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={num}>{otevrPoptavky.length}</div><div style={cap}>{t("Otevřené poptávky", "Open RFQs")}</div></div>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={{ ...num, color: cekajiciNabidky ? "var(--brand-dk)" : "var(--ink)" }}>{cekajiciNabidky}</div><div style={cap}>{t("Nabídky k vyhodnocení", "Offers to evaluate")}</div></div>
                  <div style={stat} onClick={() => setView("poptavky")}>
                    <div style={{ ...num, color: protinavrhy ? "var(--amber)" : "var(--ink)" }}>{protinavrhy}</div><div style={cap}>{t("Protinávrhy čekající na dodavatele", "Counter-offers awaiting suppliers")}</div></div>
                  <div style={stat} onClick={() => setView("objednavky")}>
                    <div style={{ ...num, color: noveObj.length ? "var(--brand-dk)" : "var(--ink)" }}>{noveObj.length}</div><div style={cap}>{t("Nové objednávky k potvrzení", "New orders to confirm")}</div></div>
                  <div style={stat} onClick={() => setView("objednavky")}>
                    <div style={{ ...num, color: kExpedici.length ? "var(--amber)" : "var(--ink)" }}>{kExpedici.length}</div><div style={cap}>{t("Potvrzené — k expedici", "Confirmed — to dispatch")}</div></div>
                  <div style={stat} onClick={() => setView("produkty")}>
                    <div style={{ ...num, color: expirujici.length ? "var(--red)" : "var(--ink)" }}>{expirujici.length}</div><div style={cap}>{t("Položky s krátkou/prošlou expirací", "Items with short/expired shelf life")}</div></div>
                  <div style={stat} onClick={() => setView("produkty")}>
                    <div style={num}>{products.length}</div><div style={cap}>{t("Položek v centrální tabulce", "Items in central table")}</div></div>
                  <div style={stat} onClick={() => setView("uzivatele")}>
                    <div style={num}>{aktivniUziv.length}</div><div style={cap}>{t("Aktivních uživatelů", "Active users")}</div></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Nevyřízené požadavky odběratelů", "Pending buyer requests")}</b>
                      <div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("poptavky")}>{t("Všechny", "All")}</button></div>
                    {!nevyrizenePoz.length && <div className="empty">{t("Žádné nevyřízené požadavky.", "No pending requests.")}</div>}
                    {nevyrizenePoz.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Odběratel", "Buyer")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th></tr></thead>
                        <tbody>{nevyrizenePoz.slice(0, 5).map((pz) => (
                          <tr key={pz.cislo}>
                            <td className="mono"><b>{pz.cislo}</b></td>
                            <td>{clients[pz.klientKod]?.nazev}</td>
                            <td>{pz.nazev}</td>
                            <td className="num">{pz.mnozstvi}</td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Poslední objednávky", "Recent orders")}</b>
                      <div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("objednavky")}>{t("Všechny", "All")}</button></div>
                    {!orders.length && <div className="empty">{t("Zatím žádné objednávky.", "No orders yet.")}</div>}
                    {orders.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Odběratel", "Buyer")}</th><th className="num">{t("Celkem", "Total")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                        <tbody>{orders.slice(0, 5).map((o) => (
                          <tr key={o.cislo}>
                            <td className="mono"><button className="link" onClick={() => setDetail(o)}><b>{o.cislo}</b></button></td>
                            <td>{o.klient.nazev}</td>
                            <td className="num">{fmtCZK(o.celkem)}</td>
                            <td><span className={"pill " + o.stav}>{STAV_LABEL[o.stav]}</span></td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}

          {/* ============ ODBĚRATEL: objednávkový formulář ============ */}
          {view === "katalog" && user.role === "klient" && (
            <>
              <h1>{t("Vaše objednávka", "Your order")}</h1>
              <p className="sub">
                {t(`Položky přidělené pro ${clients[user.kod].nazev}. Zadejte množství a objednávku potvrďte tlačítkem dole. Pokud položku nenajdete, pošlete nám ji přes záložku `,
                   `Items assigned to ${clients[user.kod].nazev}. Enter the quantities and confirm the order with the button below. If you can't find an item, send it to us via `)}
                <button className="link" onClick={() => setView("pozadavky")}>{t("Moje poptávky", "My requests")}</button>.
              </p>
              <div className="card">
                <div className="toolbar">
                  <input className="search" type="text"
                    placeholder={t("Hledat podle názvu, kódu SÚKL, šarže nebo výrobce…", "Search by name, SÚKL code, batch or manufacturer…")}
                    value={hledat} onChange={(e) => setHledat(e.target.value)} />
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{mojeProdukty.length} {t("položek", "items")}</span>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead><tr>
                      <th>{t("Kód SÚKL", "SÚKL code")}</th><th>{t("Název produktu", "Product name")}</th><th>{t("Šarže", "Batch")}</th><th>{t("Expirace", "Expiry")}</th>
                      <th className="num">{t("Skladem", "In stock")}</th><th className="num">{t("Cena/ks bez DPH", "Price/pc excl. VAT")}</th><th className="num">{t("Objednat ks", "Order qty")}</th>
                    </tr></thead>
                    <tbody>
                      {mojeProdukty.map((p) => {
                        const st = expState(p.expirace);
                        return (
                          <tr key={p.id}>
                            <td><span className="mono">{p.sukl}</span></td>
                            <td><b>{p.nazev}</b>{p.vyrobce && <><br /><span style={{ color: "var(--muted)", fontSize: 12.5 }}>{p.vyrobce}</span></>}</td>
                            <td className="mono">{p.sarze || "—"}</td>
                            <td>{fmtDate(p.expirace)}{st !== "neuvedena" && <><br />
                              <span className={"pill " + (st === "ok" ? "ok" : st === "brzy" ? "brzy" : "prosla")}>
                                {st === "ok" ? t("expirace v pořádku", "expiry OK") : st === "brzy" ? t("expirace < 6 měs.", "expiry < 6 mo.") : t("prošlá", "expired")}</span></>}</td>
                            <td className="num">{p.ks}</td>
                            <td className="num">{fmtCZK(p.cena)}</td>
                            <td className="num">
                              <input className="qty" type="number" min="0" max={p.ks}
                                value={cart[p.id] || ""} placeholder="0"
                                onChange={(e) => setQty(p, e.target.value)} disabled={p.ks === 0} />
                            </td>
                          </tr>
                        );
                      })}
                      {!mojeProdukty.length && <tr><td colSpan={7} className="empty">{t("Žádná položka neodpovídá hledání.", "No items match your search.")}</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ============ HISTORIE / OBJEDNÁVKY ============ */}
          {(view === "historie" || view === "objednavky") && (
            <>
              <h1>{user.role === "klient" ? t("Historie objednávek", "Order history") : t("Objednávky", "Orders")}</h1>
              <p className="sub">
                {user.role === "klient" && t("Archiv vašich objednávek. Předchozí nákup můžete jedním kliknutím zopakovat.",
                                             "An archive of your orders. Repeat a previous purchase with one click.")}
                {user.role === "admin" && t("Prodejní objednávky odběratelů — potvrzením a expedicí je vyřizuje provozovatel.",
                                            "Buyers' sales orders — confirmed and dispatched by the operator.")}
              </p>
              <div className="card">
                <div className="table-wrap">
                  <table>
                    <thead><tr>
                      <th>{t("Číslo", "Number")}</th><th>{t("Datum", "Date")}</th>{user.role !== "klient" && <th>{t("Odběratel", "Buyer")}</th>}
                      <th className="num">{t("Položek", "Items")}</th><th className="num">{t("Celkem", "Total")}</th><th>{t("Stav", "Status")}</th><th></th>
                    </tr></thead>
                    <tbody>
                      {mojeObjednavky.map((o) => (
                        <tr key={o.cislo}>
                          <td className="mono"><b>{o.cislo}</b></td>
                          <td>{fmtDate(o.datum)}</td>
                          {user.role !== "klient" && <td>{o.klient.nazev}</td>}
                          <td className="num">{o.items.length}</td>
                          <td className="num">{fmtCZK(o.celkem)}</td>
                          <td><span className={"pill " + o.stav}>{STAV_LABEL[o.stav]}</span></td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <button className="link" onClick={() => setDetail(o)}>{t("Dodací list", "Delivery note")}</button>
                            {user.role === "klient" && <> · <button className="link" onClick={() => objednatZnovu(o)}>{t("Objednat znovu", "Order again")}</button></>}
                            {user.role === "admin" && o.stav === "nova" && <> · <button className="link" onClick={() => zmenStav(o, "potvrzena")}>{t("Potvrdit", "Confirm")}</button></>}
                            {user.role === "admin" && o.stav === "potvrzena" && <> · <button className="link" onClick={() => zmenStav(o, "expedovana")}>{t("Expedovat", "Dispatch")}</button></>}
                          </td>
                        </tr>
                      ))}
                      {!mojeObjednavky.length && <tr><td colSpan={7} className="empty">
                        {t("Zatím žádné objednávky.", "No orders yet.")} {user.role === "klient" && t("Vytvořte první v záložce „Moje objednávka“.", "Create your first one in the \u201cMy order\u201d tab.")}</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ============ ADMIN: centrální tabulka ============ */}
          {view === "produkty" && user.role === "admin" && (
            <>
              <h1>{t("Centrální tabulka (PRODUKTY)", "Central table (PRODUCTS)")}</h1>
              <p className="sub">{t("Hlavní zdroj dat. Přidělený kód odběratele určuje, komu se položka zobrazí v objednávkovém formuláři. Odběratel vidí pouze prodejní cenu.",
                                    "The main data source. The assigned buyer code determines who sees the item in the order form. Buyers only ever see the selling price.")}</p>
              <div className="card">
                <div className="toolbar">
                  <input className="search" type="text" placeholder={t("Hledat…", "Search…")} value={hledat} onChange={(e) => setHledat(e.target.value)} />
                  <button className="btn mini" onClick={() => setNovy({ sukl: "", ean: "", nazev: "", vyrobce: "", sarze: "", expirace: "2027-12-31", ks: 0, nakupCena: 0, cena: 0, dodavatel: "DOD-A", klientKod: "ODB-01" })}>{t("+ Přidat položku", "+ Add item")}</button>
                  <button className="btn sec mini" onClick={() => flash(t("Export XLS: v produkční verzi se stáhne soubor centrální tabulky.", "XLS export: the production version downloads the central table file."))}>{t("Export XLS", "Export XLS")}</button>
                </div>
                {novy && (
                  <div className="pad" style={{ borderBottom: "1px solid var(--line)", background: "#FAF9FE", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
                    {[["sukl", t("Kód SÚKL", "SÚKL code")], ["nazev", t("Název", "Name")], ["vyrobce", t("Výrobce", "Manufacturer")], ["sarze", t("Šarže", "Batch")]].map(([k, l]) => (
                      <label key={k} style={lbl}>{l}<br />
                        <input type="text" value={novy[k]} onChange={(e) => setNovy({ ...novy, [k]: e.target.value })} style={{ width: k === "nazev" ? 220 : 120 }} /></label>
                    ))}
                    <label style={lbl}>{t("Expirace", "Expiry")}<br />
                      <input type="date" value={novy.expirace} onChange={(e) => setNovy({ ...novy, expirace: e.target.value })} /></label>
                    <label style={lbl}>{t("Ks", "Qty")}<br />
                      <input type="number" style={{ width: 80 }} value={novy.ks} onChange={(e) => setNovy({ ...novy, ks: e.target.value })} /></label>
                    <label style={lbl}>{t("Nákup/ks", "Buy/pc")}<br />
                      <input type="number" style={{ width: 90 }} value={novy.nakupCena} onChange={(e) => setNovy({ ...novy, nakupCena: e.target.value })} /></label>
                    <label style={lbl}>{t("Prodej/ks", "Sell/pc")}<br />
                      <input type="number" style={{ width: 90 }} value={novy.cena} onChange={(e) => setNovy({ ...novy, cena: e.target.value })} /></label>
                    <label style={lbl}>{t("Dodavatel", "Supplier")}<br />
                      <select value={novy.dodavatel} onChange={(e) => setNovy({ ...novy, dodavatel: e.target.value })}>
                        {Object.keys(suppliers).map((k) => <option key={k}>{k}</option>)}</select></label>
                    <label style={lbl}>{t("Kód odběratele", "Buyer code")}<br />
                      <select value={novy.klientKod} onChange={(e) => setNovy({ ...novy, klientKod: e.target.value })}>
                        {Object.keys(clients).map((k) => <option key={k}>{k}</option>)}</select></label>
                    <button className="btn mini" onClick={ulozNovy}>{t("Uložit", "Save")}</button>
                    <button className="btn sec mini" onClick={() => setNovy(null)}>{t("Zrušit", "Cancel")}</button>
                  </div>
                )}
                <div className="table-wrap">
                  <table>
                    <thead><tr>
                      <th>{t("Kód SÚKL", "SÚKL code")}</th><th>{t("Název / výrobce", "Name / manufacturer")}</th><th>{t("Šarže", "Batch")}</th><th>{t("Expirace", "Expiry")}</th>
                      <th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Nákup bez DPH", "Buy excl. VAT")}</th><th className="num">{t("Prodej bez DPH", "Sell excl. VAT")}</th><th className="num">{t("Marže", "Margin")}</th><th>{t("Dodavatel", "Supplier")}</th><th>{t("Kód odběratele", "Buyer code")}</th><th></th>
                    </tr></thead>
                    <tbody>
                      {mojeProdukty.map((p) => (
                        <tr key={p.id}>
                          <td><span className="mono">{p.sukl}</span></td>
                          <td><b>{p.nazev}</b>{p.vyrobce && <><br /><span style={{ color: "var(--muted)", fontSize: 12.5 }}>{p.vyrobce}</span></>}</td>
                          <td><input type="text" className="mono" style={{ width: 86 }} value={p.sarze} placeholder={t("doplnit", "add")}
                            onChange={(e) => upravPole(p.id, "sarze", e.target.value)} /></td>
                          <td><input type="date" value={p.expirace} onChange={(e) => upravPole(p.id, "expirace", e.target.value)} /></td>
                          <td className="num"><input className="qty" type="number" value={p.ks} onChange={(e) => upravPole(p.id, "ks", e.target.value)} /></td>
                          <td className="num"><input className="qty" style={{ width: 92 }} type="number" value={p.nakupCena} onChange={(e) => upravPole(p.id, "nakupCena", e.target.value)} /></td>
                          <td className="num"><input className="qty" style={{ width: 92 }} type="number" value={p.cena} onChange={(e) => upravPole(p.id, "cena", e.target.value)} /></td>
                          <td className="num"><span className={"pill " + (marzePct(p) >= 0 ? "ok" : "prosla")}>{marzePct(p).toFixed(1).replace(".", lang === "cs" ? "," : ".")} %</span></td>
                          <td className="mono">{p.dodavatel}</td>
                          <td><span className="pill" style={{ background: "var(--brand-lt)", color: "var(--brand-dk)" }}>{p.klientKod}</span></td>
                          <td><button className="btn danger mini" onClick={() => smazProdukt(p.id)}>{t("Smazat", "Delete")}</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ============ ADMIN: poptávky a nabídky ============ */}
          {view === "poptavky" && user.role === "admin" && (
            <>
              <h1>{t("Poptávky dodavatelům", "RFQs to suppliers")}</h1>
              <p className="sub">{t("Provozovatel poptává zboží za požadovanou výkupní cenu. Akceptací nabídky se zboží naskladní do centrální tabulky a stanoví se prodejní cena pro odběratele.",
                                    "The operator requests goods at a target purchase price. Accepting an offer stocks the goods into the central table and sets the selling price for the buyer.")}</p>

              {pozadavky.filter((p) => p.stav === "prijata").length > 0 && (
                <div className="card" style={{ marginBottom: 16 }}>
                  <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Nevyřízené požadavky odběratelů", "Pending buyer requests")}</b>
                    <div className="spacer" />
                    {Object.values(vybrane).filter(Boolean).length > 1 && (
                      <button className="btn mini" onClick={() => {
                        const rs = pozadavky.filter((p) => vybrane[p.cislo]);
                        const limity = rs.map((r) => r.maxCena).filter(Boolean);
                        const minLimit = limity.length ? Math.min(...limity) : null;
                        const expy = rs.map((r) => r.minExp).filter(Boolean).sort();
                        const sarzeSet = [...new Set(rs.map((r) => r.sarze).filter(Boolean))];
                        setNovaPoptavka({
                          sukl: rs.find((r) => r.sukl)?.sukl || "", nazev: rs[0].nazev,
                          mnozstvi: rs.reduce((s, r) => s + r.mnozstvi, 0), provize: 5,
                          maxProdejni: minLimit,
                          cena: minLimit ? Math.round(minLimit / 1.05 * 100) / 100 : "",
                          minExp: expy.length ? expy[expy.length - 1] : "",
                          pozadovanaSarze: sarzeSet.length === 1 ? sarzeSet[0] : "",
                          zdroje: rs.map((r) => ({ klientKod: r.klientKod, pozCislo: r.cislo, mnozstvi: r.mnozstvi, maxCena: r.maxCena || null })),
                        });
                        setVybrane({});
                      }}>{t(`Sloučit vybrané do jedné poptávky (${Object.values(vybrane).filter(Boolean).length})`,
                            `Merge selected into one RFQ (${Object.values(vybrane).filter(Boolean).length})`)}</button>
                    )}
                  </div>
                  <div className="table-wrap"><table>
                    <thead><tr><th></th><th>{t("Číslo", "Number")}</th><th>{t("Odběratel", "Buyer")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Max. cena odběratele", "Buyer's max. price")}</th><th>{t("Šarže", "Batch")}</th><th>{t("Min. expirace", "Min. expiry")}</th><th>{t("Poznámka", "Note")}</th><th></th></tr></thead>
                    <tbody>{pozadavky.filter((p) => p.stav === "prijata").map((p) => (
                      <tr key={p.cislo}>
                        <td><input type="checkbox" checked={!!vybrane[p.cislo]}
                          onChange={(e) => setVybrane({ ...vybrane, [p.cislo]: e.target.checked })}
                          title={t("Vybrat ke sloučení", "Select for merging")} /></td>
                        <td className="mono"><b>{p.cislo}</b></td>
                        <td>{clients[p.klientKod]?.nazev} <span className="pill" style={{ background: "var(--brand-lt)", color: "var(--brand-dk)" }}>{p.klientKod}</span></td>
                        <td><b>{p.nazev}</b>{p.sukl && <span className="mono" style={{ color: "var(--muted)" }}> · {p.sukl}</span>}</td>
                        <td className="num">{p.mnozstvi}</td>
                        <td className="num">{p.maxCena ? fmtCZK(p.maxCena) : "—"}</td>
                        <td className="mono">{p.sarze || "—"}</td>
                        <td>{p.minExp ? fmtDate(p.minExp) : "—"}</td>
                        <td>{p.pozn || "—"}</td>
                        <td><button className="btn mini" onClick={() => setNovaPoptavka({ sukl: p.sukl, nazev: p.nazev, mnozstvi: p.mnozstvi, provize: 5,
                          maxProdejni: p.maxCena || null,
                          cena: p.maxCena ? Math.round(p.maxCena / 1.05 * 100) / 100 : "",
                          minExp: p.minExp || "", pozadovanaSarze: p.sarze || "", zdroj: p.klientKod, pozCislo: p.cislo })}>{t("Vytvořit poptávku", "Create RFQ")}</button></td>
                      </tr>))}</tbody>
                  </table></div>
                </div>
              )}

              <div className="card">
                <div className="toolbar">
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{demands.length} {t("poptávek", "RFQs")}</span>
                  <div className="spacer" />
                  <button className="btn mini" onClick={() => setNovaPoptavka({ sukl: "", nazev: "", mnozstvi: "", cena: "", provize: 5, maxProdejni: null, minExp: "", pozadovanaSarze: "", zdroj: null, pozCislo: null })}>{t("+ Nová poptávka (nákup na sklad)", "+ New RFQ (stock purchase)")}</button>
                </div>
                {novaPoptavka && (
                  <div className="pad" style={{ borderBottom: "1px solid var(--line)", background: "#FAF9FE", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
                    {novaPoptavka.zdroj && <span className="pill" style={{ background: "var(--brand-lt)", color: "var(--brand-dk)" }}>{t("pro odběratele", "for buyer")} {novaPoptavka.zdroj} ({novaPoptavka.pozCislo})</span>}
                    {novaPoptavka.zdroje && novaPoptavka.zdroje.map((z) => (
                      <span key={z.pozCislo} className="pill" style={{ background: "var(--brand-lt)", color: "var(--brand-dk)" }}>
                        {z.klientKod} · {z.mnozstvi} {t("ks", "pcs")}{z.maxCena ? ` · max ${fmtCZK(z.maxCena)}` : ""}</span>
                    ))}
                    {novaPoptavka.zdroje && novaPoptavka.zdroje.length > 1 &&
                      <span className="pill nova">{t("sloučená poptávka", "merged RFQ")}</span>}
                    {novaPoptavka.maxProdejni && <span className="pill brzy">{t("limit odběratele", "buyer's limit")} {fmtCZK(novaPoptavka.maxProdejni)}/{t("ks", "pc")}</span>}
                    <label style={lbl}>{t("Kód SÚKL", "SÚKL code")}<br />
                      <input type="text" style={{ width: 110 }} value={novaPoptavka.sukl} onChange={(e) => setNovaPoptavka({ ...novaPoptavka, sukl: e.target.value })} /></label>
                    <label style={lbl}>{t("Název položky", "Item name")}<br />
                      <input type="text" style={{ width: 240 }} value={novaPoptavka.nazev} onChange={(e) => setNovaPoptavka({ ...novaPoptavka, nazev: e.target.value })} /></label>
                    <label style={lbl}>{t("Množství (ks)", "Quantity (pcs)")}<br />
                      <input type="number" style={{ width: 90 }} value={novaPoptavka.mnozstvi} onChange={(e) => setNovaPoptavka({ ...novaPoptavka, mnozstvi: e.target.value })} /></label>
                    <label style={lbl}>{t("Provize %", "Commission %")}<br />
                      <input type="number" style={{ width: 70 }} value={novaPoptavka.provize ?? 5}
                        onChange={(e) => {
                          const prov = Number(e.target.value) || 0;
                          setNovaPoptavka({ ...novaPoptavka, provize: e.target.value,
                            cena: novaPoptavka.maxProdejni ? Math.round(novaPoptavka.maxProdejni / (1 + prov / 100) * 100) / 100 : novaPoptavka.cena });
                        }} /></label>
                    <label style={lbl}>{t("Požadovaná cena/ks bez DPH", "Target price/pc excl. VAT")}
                      {novaPoptavka.maxProdejni && <span> ({t("= limit − provize", "= limit − commission")})</span>}<br />
                      <input type="number" style={{ width: 130 }} value={novaPoptavka.cena} onChange={(e) => setNovaPoptavka({ ...novaPoptavka, cena: e.target.value })} /></label>
                    <label style={lbl}>{t("Min. expirace", "Min. expiry")}<br />
                      <input type="date" value={novaPoptavka.minExp} onChange={(e) => setNovaPoptavka({ ...novaPoptavka, minExp: e.target.value })} /></label>
                    <label style={lbl}>{t("Požadovaná šarže", "Required batch")}<br />
                      <input type="text" className="mono" style={{ width: 110 }} value={novaPoptavka.pozadovanaSarze || ""} onChange={(e) => setNovaPoptavka({ ...novaPoptavka, pozadovanaSarze: e.target.value })} /></label>
                    <button className="btn mini" onClick={() => vytvorPoptavku()}>{t("Odeslat dodavatelům", "Send to suppliers")}</button>
                    <button className="btn sec mini" onClick={() => setNovaPoptavka(null)}>{t("Zrušit", "Cancel")}</button>
                  </div>
                )}
                {!demands.length && <div className="empty">{t("Zatím žádné poptávky. Vytvořte první tlačítkem výše, nebo z požadavku odběratele.", "No RFQs yet. Create the first one with the button above, or from a buyer request.")}</div>}
                {demands.map((d) => (
                  <div key={d.cislo} style={{ borderBottom: "1px solid var(--line)" }}>
                    <div className="pad" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                      <span className="mono"><b>{d.cislo}</b></span>
                      <b>{d.nazev}</b>
                      <span>{d.mnozstvi} {t("ks", "pcs")} · {t("požadovaná cena", "target price")} {fmtCZK(d.cena)}/{t("ks", "pc")} · {t("provize", "commission")} {d.provize} %{d.maxProdejni && ` · ${t("limit prodeje", "sell cap")} ${fmtCZK(d.maxProdejni)}`}{d.minExp && ` · ${t("min. exp.", "min. exp.")} ${fmtDate(d.minExp)}`}{d.pozadovanaSarze && ` · ${t("šarže", "batch")} ${d.pozadovanaSarze}`}</span>
                      {(d.zdroje || []).map((z) => (
                        <span key={z.klientKod + (z.pozCislo || "")} className="pill" style={{ background: "var(--brand-lt)", color: "var(--brand-dk)" }}>
                          {z.klientKod} · {z.mnozstvi} {t("ks", "pcs")}{z.maxCena ? ` · max ${fmtCZK(z.maxCena)}` : ""}</span>
                      ))}
                      {(d.zdroje || []).length > 1 && <span className="pill nova">{t("sloučená", "merged")}</span>}
                      <span className={"pill " + (d.stav === "otevrena" ? "nova" : "expedovana")}>{d.stav === "otevrena" ? `${t("otevřená", "open")} · ${d.nabidky.length} ${t("nabídek", "offers")}` : t("uzavřená", "closed")}</span>
                      <div className="spacer" />
                      {d.stav === "otevrena" && <button className="btn sec mini" onClick={() => uzavriPoptavku(d.cislo)}>{t("Uzavřít", "Close")}</button>}
                    </div>
                    {d.nabidky.length > 0 && (
                      <div className="table-wrap" style={{ paddingBottom: 8 }}><table>
                        <thead><tr><th>{t("Dodavatel", "Supplier")}</th><th className="num">{t("Nabídnutá cena", "Offered price")}</th><th className="num">{t("Ks", "Qty")}</th><th>{t("Šarže", "Batch")}</th><th>{t("Expirace", "Expiry")}</th>
                          <th className="num">{t("Akceptovat ks", "Accept qty")}</th><th className="num">{t("Prodejní cena", "Selling price")}</th><th>{t("Kód odběratele", "Buyer code")}</th><th></th></tr></thead>
                        <tbody>{d.nabidky.map((n) => {
                          const key = d.cislo + "-" + n.id;
                          const af = akceptForm[key] || {};
                          const pf = protiForm[key] || {};
                          return (
                            <React.Fragment key={n.id}>
                            <tr>
                              <td><b>{suppliers[n.dodavatel].nazev}</b>{n.upravena && <><br /><span className="pill nova" style={{ marginTop: 4 }}>{t("upravená po protinávrhu", "revised after counter-offer")}</span></>}</td>
                              <td className="num">{fmtCZK(n.cena)}{n.cena > d.cena && <span className="pill brzy" style={{ marginLeft: 6 }}>{t("nad požadavkem", "above target")}</span>}
                                {d.maxProdejni && n.cena * (1 + (d.provize || 5) / 100) > d.maxProdejni && <><br /><span className="pill prosla" style={{ marginTop: 4 }}>{t("s provizí nad limitem odběratele", "with commission exceeds buyer's limit")}</span></>}</td>
                              <td className="num">{n.mnozstvi}{n.mnozstvi < d.mnozstvi && <span className="pill brzy" style={{ marginLeft: 6 }}>{t("část", "partial")}</span>}
                                {n.minMnozstvi && <><br /><span className={"pill " + (n.minMnozstvi > d.mnozstvi ? "prosla" : "brzy")} style={{ marginTop: 4 }}>{t("min. odběr", "min. purchase")} {n.minMnozstvi} {t("ks", "pcs")}{n.minMnozstvi > d.mnozstvi && t(" — nad poptávkou, přebytek na sklad", " — above demand, surplus to stock")}</span></>}</td>
                              <td className="mono">{n.sarze || "—"}</td><td>{fmtDate(n.expirace)}</td>
                              {n.stav === "podana" && d.stav === "otevrena" ? (<>
                                <td className="num"><input className="qty" style={{ width: 80 }} type="number" placeholder={String(n.mnozstvi)}
                                  min={n.minMnozstvi || 1} max={n.mnozstvi}
                                  value={af.ks || ""} onChange={(e) => setAkceptForm({ ...akceptForm, [key]: { ...af, ks: e.target.value } })} /></td>
                                <td className="num"><input className="qty" style={{ width: 96 }} type="number" placeholder={String(Math.round(n.cena * (1 + (d.provize || 5) / 100) * 100) / 100)}
                                  value={af.prodej || ""} onChange={(e) => setAkceptForm({ ...akceptForm, [key]: { ...af, prodej: e.target.value } })} /></td>
                                <td><select value={af.klientKod || (d.zdroje && d.zdroje[0]?.klientKod) || "ODB-01"} onChange={(e) => setAkceptForm({ ...akceptForm, [key]: { ...af, klientKod: e.target.value } })}>
                                  {Object.keys(clients).map((k) => <option key={k}>{k}</option>)}</select></td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                  <button className="btn mini" onClick={() => akceptujNabidku(d, n)}>{t("Akceptovat a naskladnit", "Accept & stock")}</button>{" "}
                                  <button className="btn sec mini" onClick={() => setProtiForm({ ...protiForm, [key]: pf.open ? { open: false } : { open: true, cena: n.cena, mnozstvi: n.mnozstvi, pozn: "" } })}>{t("Protinávrh", "Counter-offer")}</button>{" "}
                                  <button className="btn danger mini" onClick={() => odmitniNabidku(d, n)}>{t("Odmítnout", "Reject")}</button>
                                </td>
                              </>) : (<>
                                <td className="num">{n.stav === "akceptovana" && n.akceptovanoKs ? n.akceptovanoKs : "—"}</td><td className="num">—</td><td>—</td>
                                <td>{n.stav === "akceptovana" ? <span className="pill ok">{t("akceptována", "accepted")}</span>
                                  : n.stav === "odmitnuta" ? <span className="pill prosla">{t("odmítnuta", "rejected")}</span>
                                  : n.stav === "protinavrh" ? <span className="pill brzy">{n.proti ? `${t("protinávrh", "counter-offer")} ${n.proti.mnozstvi} ${t("ks à", "pcs at")} ${fmtCZK(n.proti.cena)} — ${t("čeká na dodavatele", "awaiting supplier")}` : t("protinávrh — čeká na dodavatele", "counter-offer — awaiting supplier")}</span>
                                  : <span style={{ color: "var(--muted)" }}>{t("čeká", "pending")}</span>}</td>
                              </>)}
                            </tr>
                            {pf.open && n.stav === "podana" && d.stav === "otevrena" && (
                              <tr><td colSpan={9} style={{ background: "#FAF9FE" }}>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", padding: "6px 0" }}>
                                  <b style={{ fontSize: 13 }}>{t("Protinávrh dodavateli", "Counter-offer to supplier")}</b>
                                  <label style={lbl}>{t("Cena/ks bez DPH", "Price/pc excl. VAT")}<br />
                                    <input type="number" style={{ width: 110 }} value={pf.cena} onChange={(e) => setProtiForm({ ...protiForm, [key]: { ...pf, cena: e.target.value } })} /></label>
                                  <label style={lbl}>{t("Množství (ks)", "Quantity (pcs)")}<br />
                                    <input type="number" style={{ width: 90 }} value={pf.mnozstvi} onChange={(e) => setProtiForm({ ...protiForm, [key]: { ...pf, mnozstvi: e.target.value } })} /></label>
                                  <label style={lbl}>{t("Vzkaz dodavateli (volitelné)", "Message to supplier (optional)")}<br />
                                    <input type="text" style={{ width: 260 }} value={pf.pozn} onChange={(e) => setProtiForm({ ...protiForm, [key]: { ...pf, pozn: e.target.value } })} /></label>
                                  <button className="btn mini" onClick={() => poslatProtinavrh(d, n)}>{t("Odeslat protinávrh", "Send counter-offer")}</button>
                                  <button className="btn sec mini" onClick={() => setProtiForm({ ...protiForm, [key]: { open: false } })}>{t("Zrušit", "Cancel")}</button>
                                </div>
                              </td></tr>
                            )}
                            </React.Fragment>);
                        })}</tbody>
                      </table></div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ============ DODAVATEL: poptávky a nabídky ============ */}
          {view === "poptavky" && user.role === "dodavatel" && (
            <>
              <h1>{t("Poptávky provozovatele", "Operator's RFQs")}</h1>
              <p className="sub">{t("Aktuální poptávky s požadovanou cenou. V nabídce můžete upravit cenu i množství, které jste schopni dodat.",
                                    "Current RFQs with the target price. In your offer you may adjust both the price and the quantity you can deliver.")}</p>
              <div className="card">
                {!demands.filter((d) => d.stav === "otevrena" || d.nabidky.some((n) => n.dodavatel === user.kod)).length &&
                  <div className="empty">{t("Momentálně nejsou vypsány žádné poptávky.", "There are currently no open RFQs.")}</div>}
                {demands.filter((d) => d.stav === "otevrena" || d.nabidky.some((n) => n.dodavatel === user.kod)).map((d) => {
                  const moje = d.nabidky.filter((n) => n.dodavatel === user.kod);
                  return (
                    <div key={d.cislo} className="pad" style={{ borderBottom: "1px solid var(--line)" }}>
                      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                        <span className="mono"><b>{d.cislo}</b></span>
                        <b>{d.nazev}</b>
                        <span>{d.mnozstvi} {t("ks", "pcs")} · {t("požadovaná cena", "target price")} <b>{fmtCZK(d.cena)}</b>/{t("ks", "pc")}{d.minExp && ` · ${t("min. expirace", "min. expiry")} ${fmtDate(d.minExp)}`}{d.pozadovanaSarze && <> · {t("požadovaná šarže", "required batch")} <span className="mono">{d.pozadovanaSarze}</span></>}</span>
                        <span className={"pill " + (d.stav === "otevrena" ? "nova" : "expedovana")}>{d.stav === "otevrena" ? t("otevřená", "open") : t("uzavřená", "closed")}</span>
                        <div className="spacer" />
                        {d.stav === "otevrena" && !moje.some((n) => n.stav !== "odmitnuta") && (
                          <button className="btn mini" onClick={() => setNabidkaForm({ demandCislo: d.cislo, cena: d.cena, mnozstvi: d.mnozstvi, minMnozstvi: "", sarze: "", expirace: "" })}>{t("Podat nabídku", "Submit offer")}</button>
                        )}
                      </div>
                      {moje.map((n) => (
                        <div key={n.id} style={{ marginTop: 8, fontSize: 14 }}>
                          {t("Vaše nabídka:", "Your offer:")} <b>{n.mnozstvi} {t("ks à", "pcs at")} {fmtCZK(n.cena)}</b>{n.minMnozstvi && <> · {t("min. odběr", "min. purchase")} {n.minMnozstvi} {t("ks", "pcs")}</>}{n.sarze && <> · {t("šarže", "batch")} <span className="mono">{n.sarze}</span></>}{n.expirace && ` · ${t("exp.", "exp.")} ${fmtDate(n.expirace)}`}{" "}
                          {n.stav === "akceptovana"
                            ? <span className="pill ok">{t("akceptována — připravte ke svozu (út/čt)", "accepted — prepare for collection (Tue/Thu)")}</span>
                            : n.stav === "odmitnuta"
                            ? <span className="pill prosla">{t("odmítnuta", "rejected")}</span>
                            : n.stav === "protinavrh"
                            ? <span className="pill brzy">{t("protinávrh provozovatele", "operator's counter-offer")}</span>
                            : <span className="pill nova">{t("čeká na vyhodnocení", "awaiting evaluation")}</span>}
                          {n.stav === "protinavrh" && n.proti && (
                            <div style={{ marginTop: 8, padding: 12, background: "#FAF9FE", border: "1px solid var(--line)", borderRadius: 10 }}>
                              <b>{t("Protinávrh provozovatele:", "Operator's counter-offer:")}</b>{" "}
                              {n.proti.mnozstvi} {t("ks à", "pcs at")} <b>{fmtCZK(n.proti.cena)}</b>/{t("ks bez DPH", "pc excl. VAT")}
                              {n.proti.pozn && <div style={{ color: "var(--muted)", marginTop: 4 }}>„{n.proti.pozn}“</div>}
                              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                                <button className="btn mini" onClick={() => prijmiProtinavrh(d, n)}>{t("Přijmout protinávrh", "Accept counter-offer")}</button>
                                <button className="btn sec mini" onClick={() => odmitniProtinavrh(d, n)}>{t("Odmítnout — nabídku stáhnout", "Decline — withdraw offer")}</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {nabidkaForm?.demandCislo === d.cislo && (
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", marginTop: 12, padding: 12, background: "#FAF9FE", border: "1px solid var(--line)", borderRadius: 10 }}>
                          <label style={lbl}>{t("Cena/ks bez DPH", "Price/pc excl. VAT")}<br />
                            <input type="number" style={{ width: 110 }} value={nabidkaForm.cena} onChange={(e) => setNabidkaForm({ ...nabidkaForm, cena: e.target.value })} /></label>
                          <label style={lbl}>{t("Nabízené množství (ks)", "Offered quantity (pcs)")}<br />
                            <input type="number" style={{ width: 90 }} value={nabidkaForm.mnozstvi} onChange={(e) => setNabidkaForm({ ...nabidkaForm, mnozstvi: e.target.value })} /></label>
                          <label style={lbl}>{t("Min. odběr při této ceně (ks)", "Min. purchase at this price (pcs)")}<br />
                            <input type="number" style={{ width: 110 }} placeholder={t("bez limitu", "no limit")} value={nabidkaForm.minMnozstvi} onChange={(e) => setNabidkaForm({ ...nabidkaForm, minMnozstvi: e.target.value })} /></label>
                          <label style={lbl}>{t("Šarže", "Batch")}<br />
                            <input type="text" style={{ width: 100 }} value={nabidkaForm.sarze} onChange={(e) => setNabidkaForm({ ...nabidkaForm, sarze: e.target.value })} /></label>
                          <label style={lbl}>{t("Expirace", "Expiry")}<br />
                            <input type="date" value={nabidkaForm.expirace} onChange={(e) => setNabidkaForm({ ...nabidkaForm, expirace: e.target.value })} /></label>
                          <button className="btn mini" onClick={podatNabidku}>{t("Odeslat nabídku", "Submit offer")}</button>
                          <button className="btn sec mini" onClick={() => setNabidkaForm(null)}>{t("Zrušit", "Cancel")}</button>
                          {Number(nabidkaForm.minMnozstvi) > 0 && Number(nabidkaForm.minMnozstvi) > Number(nabidkaForm.mnozstvi) && (
                            <div style={{ width: "100%", fontSize: 13, color: "var(--amber)" }}>
                              {t(`Min. odběr ${nabidkaForm.minMnozstvi} ks převyšuje nabízené množství — nabídka bude podána na ${nabidkaForm.minMnozstvi} ks (cena platí od tohoto odběru; poptáváno je ${d.mnozstvi} ks).`,
                                 `The min. purchase of ${nabidkaForm.minMnozstvi} pcs exceeds the offered quantity — the offer will be submitted for ${nabidkaForm.minMnozstvi} pcs (the price is valid from that volume; ${d.mnozstvi} pcs are requested).`)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ============ ODBĚRATEL: moje poptávky ============ */}
          {view === "pozadavky" && user.role === "klient" && (
            <>
              <h1>{t("Moje poptávky", "My requests")}</h1>
              <p className="sub">{t("Nenašli jste položku ve své objednávce? Pošlete nám poptávku — jakmile ji potvrdíme, položka se objeví ve vaší objednávce a dáme vám vědět e-mailem.",
                                    "Can't find an item in your order form? Send us a request — once confirmed, the item will appear in your order form and we will let you know by e-mail.")}</p>
              <div className="card">
                <div className="toolbar">
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{pozadavky.filter((p) => p.klientKod === user.kod).length} {t("poptávek", "requests")}</span>
                  <div className="spacer" />
                  <button className="btn mini" onClick={() => setNovyPozadavek({ nazev: "", sukl: "", mnozstvi: "", maxCena: "", sarze: "", minExp: "", pozn: "" })}>{t("+ Nová poptávka", "+ New request")}</button>
                </div>
                {novyPozadavek && (
                  <div className="pad" style={{ borderBottom: "1px solid var(--line)", background: "#FAF9FE", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
                    <label style={lbl}>{t("Název položky", "Item name")}<br />
                      <input type="text" style={{ width: 240 }} value={novyPozadavek.nazev} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, nazev: e.target.value })} /></label>
                    <label style={lbl}>{t("Kód SÚKL (pokud znáte)", "SÚKL code (if known)")}<br />
                      <input type="text" style={{ width: 130 }} value={novyPozadavek.sukl} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, sukl: e.target.value })} /></label>
                    <label style={lbl}>{t("Množství (ks)", "Quantity (pcs)")}<br />
                      <input type="number" style={{ width: 90 }} value={novyPozadavek.mnozstvi} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, mnozstvi: e.target.value })} /></label>
                    <label style={lbl}>{t("Max. cena/ks bez DPH", "Max. price/pc excl. VAT")}<br />
                      <input type="number" style={{ width: 120 }} value={novyPozadavek.maxCena} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, maxCena: e.target.value })} /></label>
                    <label style={lbl}>{t("Šarže (pokud požadujete)", "Batch (if required)")}<br />
                      <input type="text" className="mono" style={{ width: 110 }} value={novyPozadavek.sarze} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, sarze: e.target.value })} /></label>
                    <label style={lbl}>{t("Min. expirace", "Min. expiry")}<br />
                      <input type="date" value={novyPozadavek.minExp} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, minExp: e.target.value })} /></label>
                    <label style={lbl}>{t("Poznámka", "Note")}<br />
                      <input type="text" style={{ width: 220 }} value={novyPozadavek.pozn} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, pozn: e.target.value })} /></label>
                    <button className="btn mini" onClick={odesliPozadavek}>{t("Odeslat poptávku", "Send request")}</button>
                    <button className="btn sec mini" onClick={() => setNovyPozadavek(null)}>{t("Zrušit", "Cancel")}</button>
                  </div>
                )}
                <div className="table-wrap"><table>
                  <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Datum", "Date")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                  <tbody>
                    {pozadavky.filter((p) => p.klientKod === user.kod).map((p) => (
                      <tr key={p.cislo}>
                        <td className="mono"><b>{p.cislo}</b></td><td>{fmtDate(p.datum)}</td>
                        <td><b>{p.nazev}</b>{p.maxCena && <> · <span style={{ color: "var(--muted)", fontSize: 13 }}>{t("max.", "max.")} {fmtCZK(p.maxCena)}/{t("ks", "pc")}</span></>}
                          {(p.sarze || p.minExp) && <><br /><span style={{ color: "var(--muted)", fontSize: 13 }}>{p.sarze && <>{t("šarže", "batch")} <span className="mono">{p.sarze}</span></>}{p.sarze && p.minExp && " · "}{p.minExp && <>{t("min. exp.", "min. exp.")} {fmtDate(p.minExp)}</>}</span></>}
                          {p.pozn && <><br /><span style={{ color: "var(--muted)", fontSize: 13 }}>{p.pozn}</span></>}</td>
                        <td className="num">{p.mnozstvi}</td>
                        <td><span className={"pill " + (p.stav === "vyrizena" ? "ok" : "nova")}>{p.stav === "vyrizena" ? t("vyřízena — položka je v objednávce", "fulfilled — item is in your order form") : t("přijata", "received")}</span></td>
                      </tr>
                    ))}
                    {!pozadavky.filter((p) => p.klientKod === user.kod).length && <tr><td colSpan={5} className="empty">{t("Zatím žádné poptávky.", "No requests yet.")}</td></tr>}
                  </tbody>
                </table></div>
              </div>
            </>
          )}

          {/* ============ ADMIN: uživatelé ============ */}
          {view === "uzivatele" && user.role === "admin" && (
            <>
              <h1>{t("Uživatelé", "Users")}</h1>
              <p className="sub">{t("Účty pro přístup do portálu. Odběrateli i dodavateli se při založení přidělí jedinečný kód; odběrateli se podle něj filtrují položky z centrální tabulky.",
                                    "Portal access accounts. Buyers and suppliers are assigned a unique code on creation; a buyer's code filters their items from the central table.")}</p>
              <div className="card">
                <div className="toolbar">
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{users.length} {t("účtů", "accounts")}</span>
                  <div className="spacer" />
                  <button className="btn mini" onClick={() => setNovyUzivatel({ role: "klient", jmeno: "", login: "", heslo: "", email: "", kod: "__novy__", firma: "", ic: "", dic: "", adresa: "", poslatHeslo: true })}>{t("+ Přidat uživatele", "+ Add user")}</button>
                </div>
                {novyUzivatel && (
                  <div className="pad" style={{ borderBottom: "1px solid var(--line)", background: "#FAF9FE" }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
                      <label style={lbl}>{t("Role", "Role")}<br />
                        <select value={novyUzivatel.role} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, role: e.target.value, kod: "__novy__" })}>
                          <option value="klient">{t("Odběratel", "Buyer")}</option><option value="dodavatel">{t("Dodavatel", "Supplier")}</option><option value="admin">Admin</option>
                        </select></label>
                      {[["jmeno", t("Jméno / název", "Name"), 180], ["login", t("Přihlašovací jméno", "Username"), 140], ["heslo", t("Heslo", "Password"), 110], ["email", "E-mail", 200]].map(([k, l, w]) => (
                        <label key={k} style={lbl}>{l}<br />
                          <input type="text" style={{ width: w }} value={novyUzivatel[k]} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, [k]: e.target.value })} /></label>
                      ))}
                      {novyUzivatel.role === "klient" && (
                        <label style={lbl}>{t("Kód odběratele", "Buyer code")}<br />
                          <select value={novyUzivatel.kod} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, kod: e.target.value })}>
                            <option value="__novy__">{t("Přidělit nový kód", "Assign a new code")}</option>
                            {Object.keys(clients).map((k) => <option key={k} value={k}>{k} — {clients[k].nazev}</option>)}
                          </select></label>
                      )}
                      {novyUzivatel.role === "dodavatel" && (
                        <label style={lbl}>{t("Kód dodavatele", "Supplier code")}<br />
                          <select value={novyUzivatel.kod} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, kod: e.target.value })}>
                            <option value="__novy__">{t("Přidělit nový kód", "Assign a new code")}</option>
                            {Object.keys(suppliers).map((k) => <option key={k} value={k}>{k} — {suppliers[k].nazev}</option>)}
                          </select></label>
                      )}
                    </div>
                    {novyUzivatel.role !== "admin" && novyUzivatel.kod === "__novy__" && (
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", marginTop: 10 }}>
                        {[["firma", t("Firma (na dodací list)", "Company (for delivery notes)"), 220], ["ic", t("IČ", "Company ID"), 100], ["dic", t("DIČ", "VAT ID"), 120], ["adresa", t("Adresa", "Address"), 260]].map(([k, l, w]) => (
                          <label key={k} style={lbl}>{l}<br />
                            <input type="text" style={{ width: w }} value={novyUzivatel[k]} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, [k]: e.target.value })} /></label>
                        ))}
                      </div>
                    )}
                    <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13.5 }}>
                      <input type="checkbox" checked={!!novyUzivatel.poslatHeslo}
                        onChange={(e) => setNovyUzivatel({ ...novyUzivatel, poslatHeslo: e.target.checked })} />
                      {t("Odeslat přihlašovací údaje na zadaný e-mail", "Send credentials to the e-mail address")}
                    </label>
                    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                      <button className="btn mini" onClick={ulozUzivatele}>{t("Vytvořit účet", "Create account")}</button>
                      <button className="btn sec mini" onClick={() => setNovyUzivatel(null)}>{t("Zrušit", "Cancel")}</button>
                    </div>
                  </div>
                )}
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>{t("Uživatel", "User")}</th><th>{t("Role", "Role")}</th><th>{t("Kód", "Code")}</th><th>E-mail</th><th>{t("Stav", "Status")}</th><th></th></tr></thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.login} style={u.aktivni === false ? { opacity: .55 } : undefined}>
                          <td><b>{u.jmeno}</b><br /><span className="mono" style={{ color: "var(--muted)" }}>{u.login}</span></td>
                          <td>{u.role === "klient" ? t("Odběratel", "Buyer") : u.role === "dodavatel" ? t("Dodavatel", "Supplier") : "Admin"}</td>
                          <td>{u.kod ? <span className="pill" style={{ background: "var(--brand-lt)", color: "var(--brand-dk)" }}>{u.kod}</span> : "—"}</td>
                          <td>{u.email || "—"}</td>
                          <td><span className={"pill " + (u.aktivni === false ? "prosla" : "ok")}>{u.aktivni === false ? t("deaktivován", "deactivated") : t("aktivní", "active")}</span></td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {u.login !== user.login && (<>
                              <button className="link" onClick={() => resetHeslo(u)}>{t("Reset hesla", "Reset password")}</button>
                              {" · "}
                              <button className="link" onClick={() => toggleUzivatel(u.login)}>{u.aktivni === false ? t("Aktivovat", "Activate") : t("Deaktivovat", "Deactivate")}</button>
                              {" · "}
                              <button className="link" style={{ color: "var(--red)" }} onClick={() => smazUzivatele(u.login)}>{t("Smazat", "Delete")}</button>
                            </>)}
                            {u.login === user.login && <span style={{ color: "var(--muted)", fontSize: 13 }}>{t("přihlášený účet", "current account")}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ============ ADMIN: e-maily ============ */}
          {view === "emaily" && user.role === "admin" && (
            <>
              <h1>{t("Odeslané e-maily", "Sent e-mails")}</h1>
              <p className="sub">{t("Protokol notifikací (v prototypu simulováno — produkční verze odesílá přes SMTP / e-mailovou službu).",
                                    "Notification log (simulated in the prototype — the production version sends via SMTP / an e-mail service).")}</p>
              <div className="card">
                {emails.map((m) => (
                  <div className="mail" key={m.id}>
                    <b>{m.subject}</b>
                    <div className="to">{t("komu:", "to:")} {m.to} · {new Date(m.datum).toLocaleString(locale)}</div>
                    <div style={{ marginTop: 4 }}>{m.body}</div>
                  </div>
                ))}
                {!emails.length && <div className="empty">{t("Zatím nebyly odeslány žádné notifikace.", "No notifications have been sent yet.")}</div>}
              </div>
            </>
          )}

          {/* ============ Podmínky obchodování ============ */}
          {view === "podminky" && (
            <>
              <h1>{t("Podmínky obchodování", "Terms of trade")}</h1>
              <p className="sub">{t("Platné pro všechny objednávky vytvořené prostřednictvím portálu PORT. K dispozici také jako PDF.",
                                    "Applicable to all orders placed via the PORT portal. Also available as a PDF.")}</p>
              <div className="card"><div className="pad">
                <dl className="terms" style={{ margin: 0 }}>
                  {PODMINKY[lang].map(([tt, x]) => (<React.Fragment key={tt}><dt>{tt}</dt><dd>{x}</dd></React.Fragment>))}
                </dl>
                <div style={{ marginTop: 22 }}>
                  <button className="btn sec" onClick={() => flash(t("V produkční verzi se stáhne PDF dokument podmínek.", "The production version downloads the terms as a PDF."))}>{t("Stáhnout PDF", "Download PDF")}</button>
                </div>
              </div></div>
            </>
          )}
        </div>
      </main>

      {/* ============ lišta rozpracované objednávky ============ */}
      {user.role === "klient" && view === "katalog" && cartItems.length > 0 && (
        <div className="cartbar no-print">
          <div className="wrap">
            <div>{t("Rozpracovaná objednávka:", "Order in progress:")} <b>{cartItems.length} {t("položek", "items")}</b> · <b>{fmtCZK(cartTotal)}</b> {t("bez DPH", "excl. VAT")}</div>
            <div className="spacer" />
            <button className="btn sec mini" onClick={() => setCart({})}>{t("Vyprázdnit", "Clear")}</button>
            <button className="btn" onClick={odeslatObjednavku}>{t("Odeslat objednávku", "Submit order")}</button>
          </div>
        </div>
      )}

      {/* ============ dodací list ============ */}
      {detail && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setDetail(null)}>
          <div className="doc">
            <div className="stamp">PORT</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={LOGO_DARK} alt="" style={{ width: 34, height: 34 }} />
              <h2>{t("Dodací list / souhrn objednávky", "Delivery note / order summary")}</h2>
            </div>
            <div className="dnum mono">{detail.cislo}</div>

            <div className="grid2">
              <div className="party">
                <h4>{t("Dodavatel", "Supplier")}</h4>
                <b>{OPERATOR.nazev}</b><br />{OPERATOR.adresa}<br />{t("IČ", "Company ID")}: {OPERATOR.ic} · {t("DIČ", "VAT ID")}: {OPERATOR.dic}
              </div>
              <div className="party">
                <h4>{t("Odběratel", "Buyer")}</h4>
                <b>{detail.klient.nazev}</b><br />{detail.klient.adresa}<br />{t("IČ", "Company ID")}: {detail.klient.ic} · {t("DIČ", "VAT ID")}: {detail.klient.dic}
              </div>
            </div>

            <div className="meta">
              <div><span>{t("Datum vystavení", "Issue date")}</span>{fmtDate(detail.datum)}</div>
              <div><span>{t("Datum zdanitelného plnění", "Taxable supply date")}</span>{fmtDate(detail.datum)}</div>
              <div><span>{t("Datum splatnosti", "Due date")}</span>{fmtDate(plusDays(detail.datum, 14))}</div>
              <div><span>{t("Stav", "Status")}</span><span className={"pill " + detail.stav}>{STAV_LABEL[detail.stav]}</span></div>
            </div>

            <div className="table-wrap">
              <table>
                <thead><tr><th>{t("SÚKL", "SÚKL")}</th><th>{t("Název", "Name")}</th><th>{t("Šarže", "Batch")}</th><th>{t("Expirace", "Expiry")}</th>
                  <th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Cena/ks", "Price/pc")}</th><th className="num">{t("Celkem", "Total")}</th></tr></thead>
                <tbody>
                  {detail.items.map((i) => (
                    <tr key={i.id}>
                      <td className="mono">{i.sukl}</td><td>{i.nazev}</td><td className="mono">{i.sarze || "—"}</td>
                      <td>{fmtDate(i.expirace)}</td><td className="num">{i.mnozstvi}</td>
                      <td className="num">{fmtCZK(i.cena)}</td><td className="num">{fmtCZK(i.mnozstvi * i.cena)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr><td colSpan={6}>{t("Celkem bez DPH", "Total excl. VAT")}</td><td className="num">{fmtCZK(detail.celkem)}</td></tr>
                  <tr><td colSpan={6}>{t("Celkem s DPH (12 %)", "Total incl. VAT (12%)")}</td>
                    <td className="num">{fmtCZK(detail.items.reduce((s, i) => s + i.mnozstvi * i.cena * (1 + DPH), 0))}</td></tr>
                </tfoot>
              </table>
            </div>

            <div className="sig">
              <div>{t("Za dodavatele (datum, podpis)", "For the supplier (date, signature)")}</div>
              <div>{t("Za odběratele (datum, podpis)", "For the buyer (date, signature)")}</div>
            </div>

            <div className="actions no-print">
              <button className="btn sec" onClick={() => flash(t("V produkční verzi se stáhne soubor XLS.", "The production version downloads an XLS file."))}>{t("Export XLS", "Export XLS")}</button>
              <button className="btn sec" onClick={() => window.print()}>{t("Tisk / uložit jako PDF", "Print / save as PDF")}</button>
              <button className="btn" onClick={() => setDetail(null)}>{t("Zavřít", "Close")}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast no-print">{toast}</div>}
    </div>
  );
}
