import React, { useState, useMemo, useRef, useEffect } from "react";

/* ============================================================
   PORT — marketplace · ezdravotnici.cz
   Kompletace srpen 2026 — prototyp po jednání s dodavatelem.

   Provozovatel (zprostředkovatel): Pharmodeco s.r.o.
   Odběratel  = ZAHRANIČNÍ subjekt (poptává zboží sehnané v ČR)
   Dodavatel  = ČESKÝ subjekt (lékárna / klinika / lékař / velkodistributor)

   Zásada: odběratel a dodavatel se nikdy nepotkají — veškerá
   komunikace, ceny i doklady jdou přes zprostředkovatele.
   ============================================================ */
const LOGO_DARK = "data:image/png;base64,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";
const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAATpElEQVR42u1ce3Bcd3k93+/euw+tdlfyI4ljsCM78VM2BSd16glUGkJpaUgJg1RK2gkwbafMlGdTGELBdss0TAgh0PJIykyntDDBbqY0A7RgijSUQgyWk1hPS5ZWD8uPyJZ2Je373t/pH/deeSVLsWSvbAfvN7NjW7q7e3/nfvd85zu/7xqoRCUqUYlKVKISlahEJSpRiUpUohI3QpAUkqqlhWYLaba00CRp+K8Wuj/3/i3LdR7mrxuoBwG1uhUiIjYAAtCLfK8BgCKiKwDPA2xrKwwPVAcADhygcdc92FR0sN3R2AxgHYEVIEwR5ACcE4UBU3Asp/GCiIx7n6U8oHnDAzwHWPvIEVqxNWgQ4AHHQUOugM2RaijDBMgLLxH3BQCFAmAVcPbEKH9E4msi8gsf6HJks7yKwTVExAGAnh6uMmJ4r9Z4n2VhW8AC8nn3RcIWAUkX09K09H6uTBNGVQTI5wBNfHP6LB5+wxtkrPQ7bhiAfZ5tFnFefJGR0Ep80FD4YFUVbs3lgFwO2uNdtYT1+VytamqhshkMpJNoet02OXqlIKtyL/6AX6EvVG114EB5KvcBd7FsFnGOD/OByE1oi0bxKIlbk0nY+TwcAUQEpoi7NpFFgSwADACSnEBRKWyoqsFPXjzO3SLiHDhA45pyMEnV2gpVWmSW8r7WVuj9+1+Z71paaDaK2EeOcFVsDR4PBvBQ0QaS47AhUCLeWhaAUwRCYsHC5f9eBFY2AzsURjxSjefah7hnx3rpv1xOlnJy4enTjGSJXbaDXSTu0MTNmqgWwBEgBYXTBAYsC50kOjbdKmOXkkkk5eBBqOZmcTqHeG/AxNNVEdQlJ+CAEFFQPnAlIMnsz3B/Vgpw6bHzvUdr2LE4zOkpHD6bwD1jY2BTE/RS1YV5JXSwbx9ERJyufm4KhPAXkzbeaVlYHwl7pKa9qg1A1OzKXchh/PhJtkHwnCL+U0RGSoDWIsKSrHG6hvjJYAB/TwIT47BFYEBc8EqBLP1zLsiL+bcPuFIwpiZRrF2B3QQ+0tgoj3vn5ix7Bvv8KSLsHuKnTAuPhMOoyqSBYgEaAi0CgpjJC08e+YtSSsEIhQHTANIZTCrBs7aDL25dJ+3ed5giYre0MHTr7fhGNIoHk0lorQGlXH6dLyP9UxSB9kUDCfG/m4QAUN7xF9HEHNC1ZQGOg5RhYfMda3DOX/eyAeyBKwDU8WH8a7wW754YB0gU/UIx5ws0BNpfmHt+EBJaAJuEhiAQjUEVcsiT+KrKY//GjZLq7+fNThD/HqnGPckJFAGYPgjzZKmvBMSyYARD7sUjL0gzJYCjgUwGcGzY3vleSl84tStgTibxiS23yWMtdGvBcgJsiIjTOchvrVqF95wfQ4GANc+hGoCEwlDBIEDtUUPBT2EgEAQsy/1dOg04DnRNLVQqieNK8BlH429qarHDB3eBU9IgYAVhVFW5n5/P4TSBFwG0U2NQiAwICwbWisLrAfx2tBo109OA48ARgTH3gpVwsw6GoDIZdNfXYadPX8sC8Ay4A/zwilV4cmIcBRLWRRWa0JEoDMcG7CKOEWjVRBsFgwqYyBfAgImAKKwmcAeIu5Xg7kAQGx3HzTrLAuwikM/DUQoKxNyUdQCoSARKGUA2i5MgnhOF7yKIw5tWyeRC6xh8mWsKeTwEwSOGgWg2C61KiuU8INEMQDk27ty6XtqWoihkCeAqAOwZxHplogNAyLbd+uUDTAKGcsHNZfA/ysKjG29Gy2JO5sgoq6I2dkHhEdPCW3JZ6FLKEbeg+cAa0RikkAccjVbR+IZRxPc2bpTULAkIKLSWfEkDMHYQbG52Vc9L/dxRFcJ3RWFDPud+LnAxyCKw43FYyRQ+sX2JNLEUFSEiojsTfCRWjUgyiaIILA9YAoBhQIdCMDJpfGLLOnmsVMMCwFgD2DSnW21thaxeDVW/VjJHetgdr8Y6x57pwkrB1QAkFoOZyYD5HJ7Vgi9vfo38tPQOOwigyb2N9UJOGknp7IRVv1Haj/by7dEIDhsGqrR2u7mL5BshjquI9gDAGFBeiiApIsJj/bzZNHBCKUQc56LKraNRGJNT+Kv6OnnCkzS4VJvp69w3vhGhVAHPV8dQn5yAo9QML5IEo1EYxSIA4oDt4PEt6+RXJUVXLZUbvfdaIlLsOMFP16zE36aSFwpfqaIgoUMhqHwexzt+ie3uHUABLv19i8rg1lYYAGyl8LZYDNWplHsiJdrRiURgTk3hUH2dPHHkCC0A9mIW3NoKo7lZ7M4BPl2zAvVeq2qSIAgnEIQZDAL5Ag5pG5/dvM7NWL999S7gZXkF+/bBISl9p/H1qUk8bBiIae0qnjkSELbrLt9Uvwc1AM77rly5G41GT2OyVEOSULYNasF+L6MWlU1e0bSP9fP9NbV4T+oC7WgAjNfCzGYwlMvgU5vWybd8YJuawCt1uQBg/37R27fTaG6Wsc5B/jhWjXdOTbncX3p3khDtkk21shEDcN67+y+5xkWZPQ0NboYoYFPRhpAXjBQR6FAYKptFT/16/GIxtFBSNPXAKa4PB/FkOu0WGa3hWBZUVQRGNoOvj6ewa9M6+ZZvGjU3i1POXYfVTRCSAuLHomb09KzOzm+UILCECJXXTfP4l6SioEY7s9tLEgwGAaXwvIhoj04uGQfdosl0Dl8PhREtFkGtoaMxGCI4m03jnXeslQ/s3ibnvUzXfvUvZ4wddHcvDMGxXBYgZ3PwTBZ7x9v20hzISx7sf3BbGwwAQY8apCSD6XFRwsv2RenpZhGnZ4hNNTX43clJ1xSvrYVZKOB/pydx97Y6+Q/P8pRy0MFC0dTkLrEoOJPPw/bb8JL1ycyCCWgTuqwA+0S+axdsAbJKzfIU/N4eAuSWYBIxQYYcjc/l86AoODU1sNLT+JfUKbz59VtlsKWFZmOj2OXaG7tUDhlERgQ5WdjuBAU50Uh7BbJchrtw714qESGI80rNGDe+TqTXFwcXq0j27xedS+ChmhpsyOVQiMcRTE3iyU2vlffu2gWbpGpsXHy/X44IhtyWewEXjobbgkyHa5HyAGaZAAb27fPuEMGIYfqJOCuLAeIWALMap3lOVxoa4HR0MKAFH8tk4MTjCKYm8KWt6+SjJdpZXy1g/bVl0wjSVTDzWpqG21OOb6jFVOmdXRaAWzFD+O2lFOHxkzguQ97hdaN64V0JGCJCM4rfC4exKRSCMT2Jb26rk4943Z6+CpQwF2D3PjURVTJTY+a6dTRMAMRpEdF791ItpslYNMB+a2iY+EU+B1BfUAoklOeQbUskGBIRvdB+29iYV1BsvK92BTA9jf9u/yXef4A0GhrgXG1wfTXjcfAtodCM1zFT4LxMpWkCBE54hXzRSmJRBzb5WRlCWzaLl60AVInAkEIeNE2sTQNbFmrB9+6lam4Wp2uQayLVeMvYyxgsAu9pboJuKuOgx5J1sHeuDnGHFZh3h2TGrFeCF3zTqKwAiwgPkMbW1TIlgtZw2DW3S8S4XV0NEcG9HqVc9LkN+6DgZvbvRyKoyqTx7p3rZYKAupqc+wquzA7XGrx4K4mEkcsCII762rmsAAPA6lYvK4lnCIi3DeNblapoA9R4BwC07ruYh8cAQoQEHjx7Fk/+xmY57G0LOdcS15lzJXYWbZfy5mwd0TSh8jmM54FuTzsvOiEW7UW47TIlE8APOYnhYAivLeShvfkDlZ4GAwHs7hpm/bZ10lFqSvvNQtdJroSNTHQDPumZNdcUXO+8dNdJrmQRO/Kukp+xK/2trVAYSDv41etvk+RSt+8XncEiwpYWGHeulYwofC1SBfH9Vu+KO5FqmNrBn3l6V821RR0bm0Xhy3UiuaVuHi5TKADQRdwVqUbcseHMM6hC0wQE+PFC9FcWgP0sJilTafxTKoVzgQCU53wBgJqeBgzBg8eGWOsfW9otCTHgTKKFpCyHr7BkevAVhOCtlglAZiWMX+SM6WloW+PQpWToFQMsImxthbF7m5zXGl+MVM8CWOwi7FgcK0XjIf/Y0kytr5Mz9fVSuA4y1/Ve3UkhS2vcl81djIcIdDgMsYvorK9Du08pywawn8V7SaVy+IfkBE6GQjBIaO+qq2wWVMCHEgmGWlsxSxMv5yT5UuMAaQCU4CrcFQzj9nwO2rdhS3dpgiGAgmdFRLcCxmVx0FKzeB8gW7fKFDUeDoYucDEAyefhxGtQlwHet3//bPvyesncC6pIqIg/CofcXZl5PAhzehJFMfDty6GHeRuCJVRgQ0ScjgR/GIvhd6YmYUNggtCBAKRYxKgOY+v2m5DBNWwkXkE9sLeXsaKFPsvCTcWiu6laYmI5kWoY01M4tL1O3nq5w3/qys6TIg7+MpdD1jQhcKlCFQpw4jV4jWTw8FJM+KtY3AwAsE28Ix7HTcUibGCOwe4ObItS+Mo8qmj5M7g0i9sT/MjKFfhichxFuGOkNAxQBDmniPott2EI3rb/dZLBSkR0xwD/r7oae7ztqtIGwwkGoXI59DKNndu3o3i5d+AVDWCLiNPSQnNHnTw5MY5D0Rgs0j1Z2wbDYURsjSc9RaGuE3ANEbB7kHvCYexJp2em4WfxbygEIfGF+nopXMkdeMWLbmhwlYJSeG8mg7FAAAYJRwTm1BTsmhr8QecAmxsbxfb93msZBw+6itxx8HEr4CqFOc2FEwzBSCbRP3kG/0a6HvY1A9i77dXW9XIqX8CDhgkxDNeQJ6FyOWjTwj92JHiLaxDxmmWyt+Wve0a4MxjCfdPeFv1cBy0YhBD49J49knWp4/ILdFkWKyJOC2nu3CiHsmn8dSwOUwS2V/B0VQSrBXhaRNiKa0gVTa5UtIv4TCjs6vdS75d02/1UCoe334ZnPK6+oo6zbIttFLFbSHP7Bnl8YhxP1dbCIlEUgTmZgl1Tg7cfO8EP+cddi8aiWcTpGeZd4TAemJp05zBK22KlALsITY0PiggPHrzyRyzK2lmVzon1DOO5WBz3+bO9pgnHMID0NN74uk3yvL/gq1vcxOkY4KFoDPemp2GXzkBQw65dAfP8eXx5x0b5cDmekStrBpd0ahoA0mP4w+kp/Cwed5VFsQgFgRkK45muLq5sAvTeq8THJeDeH43h3ukpOD64XvY6oTCM1CT6V1XhEX/qqGx23TKALHfeKZn8BO7PZNAWj8MEoPM52FVVWC9VXuvZCrXc/oQ3vYnhYYaVwhN2EfR2Li6AoEClII7Gn69ZI2l/6gjXc/hq4UgPV/WO8oXh82THAIudCRZPpciOfn4JALxJzGULfza5fYCPjibJzgEWuwbJzgS19yqcSpLtA3y89PhXRfgjpkePcvXxUR4dGSc7B1joHmLh5ATZ3s8PLCfI/vcfO8E7+0+z2D1E2we2a5DsGKA9+DLZPcS2I6S1HP93hFwNkJubxTncxZW1MXw/EsHuZBIFw4CyLJjpDO7buVG+v9SndxZbcDs7YagofhUOYWcm43aZ/iGW5bbzuWnctWOzdJfrCftl5eC50dwsDkm1e5ucH+3Dvek0frBiBQKOA23b0OEQvvNSH9/QKGXv9AwRcViFz8Xj2JlOew8vXuBdJxSGkcviTz1wjeXwSq5KFfeGUVRjo0y/+HPcn0rh6ZpaBBwHDomqqip878Ue1l3pg9dzVIPd3s+3R6P46GTKA5czk6B2TS2sqRQe3XG7PLOcu9tXdYdh1hOiw3w4EMDnC3n3kS2t0WNP4p5t7jzwZd+q/ntfSPC26gDaANQUCoD/9D2JYk0trFQKz25bL+9qaaG5nFNFV7Vt9RdB0ti6Th7PZfE2K4CzSgGmhS1GFN9NJBjaB3cS6DIvoHR0MBBS+E4ggBX5PFgKbiwOa3oSPzur8cck1XKPbF11X0BE6HsX2+vkv6aSuNvR+IlhAJFq3JNT+PY+gNv3eaP9l8G7KoKvxuL4zakp2Eq5vKs17GgUViaDY3ni/sa662Z0YHk7LO9v0jvCv+sdoT2eJ9v7+bSvSRcLsi/1jvXzY6MTZNcgC12DrhzrTLAwdI7sHWHX4Q7eUqrTf+2D5Ew31z3Chr5RHsuQ7BzkE97vTVwCZHrm0bETfCBxluwZZtHXup0JFobPk32j7HzhONeW6uMbKvwO6mfdjJ44zc+fy5DHR/gF3wlb8H0euG19/K0Tp5k5PkKnM0HHB/fkBNl7km2HXT/6FT/r1z5KF985zDcNnGFf1xAfwwJFz78oR3u5re8Ux/pOkZ0Jt1vrGmThVIo8PsIfHjnC+A2bufMpAZ+bn3qKVtcgP9s5wD/x+FjNzdz2Xm7sHeXwwBkX3I4BOl2D1KNu5j7tg3rDcO5SfQQAeKmXr2lJMDS3oL3Uzc19o0wkzromTmeCxYEz5IlTLHaP8MP+BbscyXfDZHMp0CRlJnMHuadvlGcGzpDtA8x3DdIZTZJ9p9jd0c97fJVyPY1rXfdAz6iNYT7Yd5rZ4yMuuINj5InT5PERfuX55xl71dmO11xheFm7t4Vm7ygfGzhDdg/R6T9NDp8jT5ziT7sTbJyPXipxCY3s//1Yglt6T/KnZ6fIoXNuxvaO8ue9I3xXaeNSoYQlxg9+wGD3EPcPjZHnsmTPCE/1jvKfu0cuZOxcrr6eQq7TzJW2NphVq9FgWfi4CNY5Ng5pjR+JiZ9vWSvnSrP2Wj9I86qM4WGGO4f5pjNJbpjPw6jwbJnvs5L/zbXCscthBFWiEpWoRCUqUYlKVKISZYz/B7RA+sMAv/DtAAAAAElFTkSuQmCC";

/* verze datového schématu — při změně se sdílený stav na serveru zahodí a nasype znovu */
const SCHEMA = 6;
const SESSION_KEY = "port-session";
const SESSION_HODIN = 12;   /* po 12 hodinách je nutné se přihlásit znovu */

/* Uložení přihlášení do prohlížeče. Vše v try/catch — v režimu bez úložiště
   (soukromé okno, náhled v editoru) aplikace funguje dál, jen se po obnovení
   stránky přihlásí znovu. */
const ulozSession = (login) => {
  try { window.localStorage.setItem(SESSION_KEY, JSON.stringify({ login, ts: Date.now() })); } catch (e) { /* bez úložiště */ }
};
const zapomenSession = () => {
  try { window.localStorage.removeItem(SESSION_KEY); } catch (e) { /* bez úložiště */ }
};
const nactiSession = () => {
  try {
    const s = JSON.parse(window.localStorage.getItem(SESSION_KEY) || "null");
    if (!s || !s.login) return null;
    if (Date.now() - (s.ts || 0) > SESSION_HODIN * 3600 * 1000) { zapomenSession(); return null; }
    return s.login;
  } catch (e) { return null; }
};

const OPERATOR = {
  kod: "ADM-01", nazev: "Pharmodeco s.r.o.", ic: "17764017", dic: "CZ17764017",
  adresa: "Rybná 678/9, Staré Město, 110 00 Praha 1",
  spisova: "sp. zn. C 376229, Městský soud v Praze", ds: "rnegbz3",
  email: "port@ezdravotnici.cz",
};

/* ---------- ODBĚRATELÉ = zahraniční subjekty (země + VAT ID místo IČ/DIČ) ---------- */
const ODBERATELE_SEED = {
  "ODB-01": { nazev: "Apotheke Grenzland GmbH", zeme: "DE", regC: "HRB 118422", vatId: "DE327884120", adresa: "Bahnhofstraße 14, 94032 Passau, Deutschland", email: "einkauf@apotheke-grenzland.de" },
  "ODB-02": { nazev: "Farmacia Centrale S.r.l.", zeme: "IT", regC: "MI-2019-448120", vatId: "IT09912440965", adresa: "Via Torino 22, 20123 Milano, Italia", email: "acquisti@farmaciacentrale.it" },
  "ODB-03": { nazev: "MediPharm Handels GmbH", zeme: "AT", regC: "FN 402118k", vatId: "ATU68442219", adresa: "Landstraßer Hauptstraße 9, 1030 Wien, Österreich", email: "office@medipharm.at" },
};

/* ---------- DODAVATELÉ = české subjekty (typ subjektu je jen evidenční) ---------- */
const DODAVATELE_SEED = {
  "DOD-01": { nazev: "Lékárna U Anděla s.r.o.", typ: "lekarna", ic: "08812301", dic: "CZ08812301", adresa: "Nádražní 25, 150 00 Praha 5", email: "vydej@uandela.cz" },
  "DOD-02": { nazev: "Poliklinika Vinohrady a.s.", typ: "klinika", ic: "26154480", dic: "CZ26154480", adresa: "Vinohradská 176, 130 00 Praha 3", email: "sklad@poliklinikavinohrady.cz" },
  "DOD-03": { nazev: "PharmaDist s.r.o.", typ: "velkodistributor", ic: "05523456", dic: "CZ05523456", adresa: "Průmyslová 4, 619 00 Brno", email: "expedice@pharmadist.cz" },
};

const TYP_SUBJEKTU = [
  ["lekarna", "Lékárna", "Pharmacy"],
  ["klinika", "Klinika / poliklinika", "Clinic"],
  ["lekar", "Lékař", "Physician"],
  ["velkodistributor", "Velkodistributor", "Wholesale distributor"],
];

const USERS_SEED = [
  { login: "admin", heslo: "admin", role: "admin", jmeno: "Zprostředkovatel PORT", kod: "ADM-01", email: "port@ezdravotnici.cz" },
  { login: "passau", heslo: "demo", role: "odberatel", jmeno: "Apotheke Grenzland GmbH", kod: "ODB-01", email: "einkauf@apotheke-grenzland.de" },
  { login: "milano", heslo: "demo", role: "odberatel", jmeno: "Farmacia Centrale S.r.l.", kod: "ODB-02", email: "acquisti@farmaciacentrale.it" },
  { login: "lekarna", heslo: "demo", role: "dodavatel", jmeno: "Lékárna U Anděla s.r.o.", kod: "DOD-01", email: "vydej@uandela.cz" },
  { login: "distributor", heslo: "demo", role: "dodavatel", jmeno: "PharmaDist s.r.o.", kod: "DOD-03", email: "expedice@pharmadist.cz" },
  { login: "wien", heslo: "demo", role: "odberatel", jmeno: "MediPharm Handels GmbH", kod: "ODB-03", email: "office@medipharm.at" },
  { login: "poliklinika", heslo: "demo", role: "dodavatel", jmeno: "Poliklinika Vinohrady a.s.", kod: "DOD-02", email: "sklad@poliklinikavinohrady.cz" },
].map((u) => ({ ...u, aktivni: true, potvrzen: true, aktivacniKod: null }));

/* ---------- číselník SÚKL ----------
   Naimportovaný seznam kódů a názvů (235 položek). Název je rozdělen na
   obchodní název a doplněk (síla, forma, velikost balení).
   Produkce: cronem 1× měsíčně stáhnout dávku z https://prehledy.sukl.cz/dlp/v1/
   do lokální tabulky sukl_ciselnik a našeptávat z ní.                       */
const SUKL_CISELNIK = [
  { kod: "0028162", nazev: "ABILIFY", doplnek: "10MG TBL NOB 28X1" },
  { kod: "0028164", nazev: "ABILIFY", doplnek: "10MG TBL NOB 56X1" },
  { kod: "0028167", nazev: "ABILIFY", doplnek: "15MG TBL NOB 28X1" },
  { kod: "0213247", nazev: "ACARIZAX", doplnek: "12SQ-HDM POR LYO 30" },
  { kod: "5008178", nazev: "ACCU-CHEK GUIDE TESTOVACÍ PROUŽKY", doplnek: "50KS" },
  { kod: "0092410", nazev: "ALPICORT F", doplnek: "0,05MG/ML+2MG/ML+4MG/ML DRM SOL 1X100ML" },
  { kod: "0149587", nazev: "ARANESP", doplnek: "60MCG INJ SOL ISP 1X0,3ML II" },
  { kod: "0016458", nazev: "ARICEPT", doplnek: "5MG TBL FLM 28" },
  { kod: "0119509", nazev: "ARICEPT", doplnek: "10MG TBL FLM 98" },
  { kod: "0253468", nazev: "ARIMIDEX", doplnek: "1MG TBL FLM 28" },
  { kod: "0001259", nazev: "AROMASIN", doplnek: "25MG TBL FLM 90" },
  { kod: "0184319", nazev: "ATIMOS", doplnek: "12MCG/DÁV INH SOL PSS 100DÁV" },
  { kod: "0092351", nazev: "ATROVENT", doplnek: "0,025% 0,25MG/ML SOL NEB 20ML" },
  { kod: "0026247", nazev: "AZOPT", doplnek: "10 MG/ML OPH GTT SUS 1X5ML" },
  { kod: "0209128", nazev: "BENEPALI", doplnek: "50 MG 50MG INJ SOL 4X1ML - pen" },
  { kod: "0209127", nazev: "BENEPALI", doplnek: "50 MG 50MG INJ SOL 4X1ML - syringe" },
  { kod: "0002679", nazev: "BERODUAL N", doplnek: "0,02MG/0,05MG/DÁV INH SOL PSS 200DÁV" },
  { kod: "0231703", nazev: "BETALOC", doplnek: "1MG/ML INJ SOL 5X5ML" },
  { kod: "0238301", nazev: "BEVESPI AEROSPHERE", doplnek: "7,2MCG/5MCG INH SUS PSS 1X120DÁV" },
  { kod: "0193805", nazev: "BEXSERO", doplnek: "INJ SUS 1X0.5ML+JEH" },
  { kod: "0025421", nazev: "BONVIVA", doplnek: "150MG TBL FLM 1" },
  { kod: "0194718", nazev: "BRINTELLIX", doplnek: "5MG TBL FLM 28" },
  { kod: "0134861", nazev: "BUDENOFALK", doplnek: "2MG RCT SPM 1X14DÁVEK" },
  { kod: "0158943", nazev: "BUDENOFALK UNO", doplnek: "9MG GRA ENT 30" },
  { kod: "0017004", nazev: "CERTICAN", doplnek: "0,25MG TBL NOB 60" },
  { kod: "0016984", nazev: "CERTICAN", doplnek: "0,75MG TBL NOB 60" },
  { kod: "0149645", nazev: "CIMZIA", doplnek: "200MG INJ SOL 2X1ML I syringe" },
  { kod: "0219340", nazev: "CIMZIA", doplnek: "200MG INJ SOL 2X1ML AUTOCLICKS pen" },
  { kod: "0020132", nazev: "CIPRALEX", doplnek: "10 MG TBL FLM 28 I" },
  { kod: "0125183", nazev: "CIPRALEX", doplnek: "10 MG TBL FLM 56 I" },
  { kod: "0086901", nazev: "CISORDINOL DEPOT", doplnek: "200MG/ML INJ SOL 10X1ML" },
  { kod: "0232156", nazev: "CONCOR COR", doplnek: "2,5MG TBL FLM 28" },
  { kod: "0214526", nazev: "CONTROLOC", doplnek: "40MG TBL ENT 100 I" },
  { kod: "SK_2817B", nazev: "COSENTYX", doplnek: "150MG INJ SOL PEP 2X1ML pen SK origin" },
  { kod: "0210317", nazev: "COSENTYX", doplnek: "150MG INJ SOL PEP 2X1ML pen" },
  { kod: "0250236", nazev: "COSENTYX", doplnek: "300MG INJ SOL PEP 1X2ML pen" },
  { kod: "0211000", nazev: "CRESEMBA", doplnek: "100MG CPS DUR 14" },
  { kod: "0225230", nazev: "DELIPID PLUS", doplnek: "10MG/10MG CPS DUR 30" },
  { kod: "0225234", nazev: "DELIPID PLUS", doplnek: "10MG/10MG CPS DUR 90" },
  { kod: "0225237", nazev: "DELIPID PLUS", doplnek: "20MG/10MG CPS DUR 30" },
  { kod: "0225241", nazev: "DELIPID PLUS", doplnek: "20MG/10MG CPS DUR 90" },
  { kod: "0090044", nazev: "DEPO-MEDROL", doplnek: "40MG/ML INJ SUS 1X1ML" },
  { kod: "0211816", nazev: "DIPHERELINE S.R.", doplnek: "11,25MG INJ PLQ SUS PRO 1+1X2ML AMP" },
  { kod: "0170573", nazev: "DIPHERELINE S.R.", doplnek: "22,5MG INJ PLQ SUS PRO 1+1X2ML AMP" },
  { kod: "0230696", nazev: "DYSPORT", doplnek: "300SU INJ PLV SOL 1" },
  { kod: "0230698", nazev: "DYSPORT", doplnek: "500SU INJ PLV SOL 1" },
  { kod: "0267191", nazev: "ELIDEL", doplnek: "10MG/G CRM 30G" },
  { kod: "0267692", nazev: "ELIGARD", doplnek: "22,5MG INJ PSO LQF INJ SYSTÉM+J" },
  { kod: "0267694", nazev: "ELIGARD", doplnek: "45MG INJ PSO LQF INJ SYSTÉM+J" },
  { kod: "0193741", nazev: "ELIQUIS", doplnek: "2,5MG TBL FLM 168" },
  { kod: "0168326", nazev: "ELIQUIS", doplnek: "2,5MG TBL FLM 20" },
  { kod: "0168328", nazev: "ELIQUIS", doplnek: "2,5MG TBL FLM 60X1" },
  { kod: "0193747", nazev: "ELIQUIS", doplnek: "5MG TBL FLM 168" },
  { kod: "0193745", nazev: "ELIQUIS", doplnek: "5MG TBL FLM 60" },
  { kod: "0167372", nazev: "ELONVA", doplnek: "150 MCG INJ SOL 1X 0.5ML+JEHLA" },
  { kod: "0026637", nazev: "EMEND", doplnek: "125MG+80MG CPS DUR 1+2" },
  { kod: "0029028", nazev: "EMSELEX", doplnek: "7,5MG TBL PRO 28 II" },
  { kod: "0254169", nazev: "ENCEPUR PRO DOSPĚLÉ", doplnek: "INJ SUS ISP 1X0,5ML+SJ" },
  { kod: "0210049", nazev: "ENTYVIO", doplnek: "300 MG INF PLV CSL 1X300MG" },
  { kod: "0267161", nazev: "EPIPEN", doplnek: "300MCG INJ SOL PEP 1X0,3ML" },
  { kod: "0010185", nazev: "EQUORAL", doplnek: "100MG CPS MOL 50X1" },
  { kod: "0238354", nazev: "ERLEADA", doplnek: "60MG TBL FLM 120" },
  { kod: "0029740", nazev: "EUCREAS", doplnek: "50MG/1000MG TBL FLM 60 I" },
  { kod: "0029734", nazev: "EUCREAS", doplnek: "50MG/850MG TBL FLM 60 I" },
  { kod: "0026533", nazev: "EXELON", doplnek: "3MG CPS DUR 56" },
  { kod: "0253187", nazev: "EZETROL", doplnek: "10MG TBL NOB 30 B" },
  { kod: "0253189", nazev: "EZETROL", doplnek: "10MG TBL NOB 98 B" },
  { kod: "0278886", nazev: "FEMOSTON", doplnek: "1MG+1MG/10MG TBL FLM 1X28" },
  { kod: "0278884", nazev: "FEMOSTON", doplnek: "2MG+2MG/10MG TBL FLM 1X28" },
  { kod: "0165649", nazev: "FLUTIFORM", doplnek: "125MCG/5MCG/DÁV INH SUS PSS 1" },
  { kod: "0193658", nazev: "FORXIGA", doplnek: "10MG TBL FLM 28 KAL" },
  { kod: "0193660", nazev: "FORXIGA", doplnek: "10MG TBL FLM 30X1" },
  { kod: "0193661", nazev: "FORXIGA", doplnek: "10MG TBL FLM 90X1" },
  { kod: "0193659", nazev: "FORXIGA", doplnek: "10MG TBL FLM 98 KAL" },
  { kod: "0215948", nazev: "FSME-IMMUN", doplnek: "0,25ML INJ SUS ISP 1X0,25ML+J (Junior)" },
  { kod: "0215956", nazev: "FSME-IMMUN", doplnek: "0,5ML INJ SUS ISP 1X0,5ML+J (Adult)" },
  { kod: "0264812", nazev: "FUCIDIN", doplnek: "20MG/G UNG 1X30G" },
  { kod: "0210636", nazev: "GARDASIL", doplnek: "9 INJ SUS ISP 1X0,5ML+2J" },
  { kod: "0187295", nazev: "GENOTROPIN", doplnek: "36IU(12MG) INJ PSO LQF 5+5X1ML pen" },
  { kod: "0025169", nazev: "GENOTROPIN", doplnek: "36IU(12MG) INJ PSO LQF 5+5X1ML aplikator" },
  { kod: "0083741", nazev: "GLUCAGEN HYPOKIT", doplnek: "1MG INJ PSO LQF 1+1ML+STŘ" },
  { kod: "0100981", nazev: "GRAZAX", doplnek: "75 000 SQ-T POR LYO 100" },
  { kod: "0100980", nazev: "GRAZAX", doplnek: "75 000 SQ-T POR LYO 30" },
  { kod: "0025592", nazev: "HUMALOG", doplnek: "100U/ML INJ SOL ZVL 5X3ML cartridge" },
  { kod: "0025596", nazev: "HUMALOG Mix", doplnek: "25 100U/ML INJ SUS ZVL 5X3ML cartrige" },
  { kod: "0059840", nazev: "HYALGAN", doplnek: "20 MG/2 ML INJ SOL 1X2ML/20MG" },
  { kod: "0241678", nazev: "HYPNOMIDATE", doplnek: "2MG/ML INJ SOL 5X10ML" },
  { kod: "0271658", nazev: "IMRALDI", doplnek: "40MG INJ SOL PEP 2X(1X0,4ML) pen" },
  { kod: "0210035", nazev: "INCRUSE", doplnek: "55MCG INH PLV DOS 1X30DÁV" },
  { kod: "0028949", nazev: "INVEGA", doplnek: "3MG TBL PRO 30" },
  { kod: "0028966", nazev: "INVEGA", doplnek: "6MG TBL PRO 49 III" },
  { kod: "0028987", nazev: "INVEGA", doplnek: "9MG TBL PRO 49 III" },
  { kod: "0231500", nazev: "ITULAZAX", doplnek: "12SQ-BET POR LYO 30" },
  { kod: "0231501", nazev: "ITULAZAX", doplnek: "12SQ-BET POR LYO 90" },
  { kod: "0500551", nazev: "JANUMET", doplnek: "50MG/1000MG TBL FLM 196(2X98)" },
  { kod: "0028743", nazev: "JANUVIA", doplnek: "100MG POR TBL FLM 98" },
  { kod: "0210022", nazev: "JARDIANCE", doplnek: "10MG TBL FLM 28X1" },
  { kod: "0210023", nazev: "JARDIANCE", doplnek: "10MG TBL FLM 30X1" },
  { kod: "0210026", nazev: "JARDIANCE", doplnek: "10MG TBL FLM 90X1" },
  { kod: "0210027", nazev: "JARDIANCE", doplnek: "10MG TBL FLM 100X1" },
  { kod: "0222702", nazev: "JORVEZA", doplnek: "1MG POR TBL DIS 90" },
  { kod: "0025849", nazev: "KEPPRA", doplnek: "1000MG TBL FLM 50" },
  { kod: "0025853", nazev: "KEPPRA", doplnek: "100MG/ML POR SOL 300ML+STŘ 10ML" },
  { kod: "0025829", nazev: "KEPPRA", doplnek: "250MG TBL FLM 50" },
  { kod: "0025837", nazev: "KEPPRA", doplnek: "500MG TBL FLM 100" },
  { kod: "0025835", nazev: "KEPPRA", doplnek: "500MG TBL FLM 50" },
  { kod: "0255475", nazev: "KERENDIA", doplnek: "10MG TBL FLM 28" },
  { kod: "0255480", nazev: "KERENDIA", doplnek: "20MG TBL FLM 28" },
  { kod: "0222238", nazev: "KEVZARA", doplnek: "150MG INJ SOL 2X1,14ML pen" },
  { kod: "0222240", nazev: "KEVZARA", doplnek: "200MG INJ SOL 2X1,14ML pen" },
  { kod: "0268087", nazev: "KINPEYGO", doplnek: "4MG CPS DUR MRL 120" },
  { kod: "0026042", nazev: "KIOVIG", doplnek: "100MG/ML INF SOL 1X100ML" },
  { kod: "0026043", nazev: "KIOVIG", doplnek: "100MG/ML INF SOL 1X200ML" },
  { kod: "0197427", nazev: "LEPTOPROL", doplnek: "5MG IMP ISP 1" },
  { kod: "0255591", nazev: "LEQVIO", doplnek: "284MG INJ SOL ISP 1X1,5ML II" },
  { kod: "0186192", nazev: "LODRONAT", doplnek: "520MG TBL FLM 60" },
  { kod: "0194294", nazev: "LONQUEX", doplnek: "6MG INJ SOL ISP 1X0,6ML I" },
  { kod: "0194569", nazev: "LUCENTIS", doplnek: "10MG/ML INJ SOL 1X0,165ML" },
  { kod: "0027113", nazev: "LYRICA", doplnek: "150MG CPS DUR 112(2X56)" },
  { kod: "0028223", nazev: "LYRICA", doplnek: "150MG CPS DUR 56" },
  { kod: "0028230", nazev: "LYRICA", doplnek: "300MG CPS DUR 56" },
  { kod: "0027111", nazev: "LYRICA", doplnek: "75MG CPS DUR 112(2X56)" },
  { kod: "0028217", nazev: "LYRICA", doplnek: "75MG CPS DUR 56" },
  { kod: "0225168", nazev: "MAXITROL", doplnek: "OPH GTT SUS 1X5ML" },
  { kod: "0243759", nazev: "MIRTOR", doplnek: "30MG POR TBL DIS 30" },
  { kod: "0222056", nazev: "MOVYMIA", doplnek: "20MCG/80MCL INJ SOL 1X2,4ML" },
  { kod: "0018964", nazev: "MYFORTIC", doplnek: "180MG TBL ENT 120" },
  { kod: "0018698", nazev: "MYFORTIC", doplnek: "360MG TBL ENT 120" },
  { kod: "0215975", nazev: "NAXYL", doplnek: "10 MG VAGINÁLNÍ TABLETY 10MG VAG TBL NOB 6" },
  { kod: "0500304", nazev: "NEUPRO", doplnek: "1MG/24H TDR EMP 7X2,25MG" },
  { kod: "0500315", nazev: "NEUPRO", doplnek: "3MG/24H TDR EMP 28X6,75MG" },
  { kod: "0219153", nazev: "NINLARO", doplnek: "4MG CPS DUR 3(3X1)" },
  { kod: "0026794", nazev: "NOVORAPID FLEXPEN", doplnek: "100U/ML INJ SOL 5X3ML" },
  { kod: "0026789", nazev: "NOVORAPID PENFILL", doplnek: "100U/ML INJ SOL 5X3ML" },
  { kod: "0021353", nazev: "ONDANSETRON TEVA", doplnek: "8MG TBL FLM 10 I" },
  { kod: "0250546", nazev: "ONTOZRY", doplnek: "50MG TBL FLM 14" },
  { kod: "0250547", nazev: "ONTOZRY", doplnek: "50MG TBL FLM 28" },
  { kod: "0250550", nazev: "ONTOZRY", doplnek: "100MG TBL FLM 28" },
  { kod: "0250680", nazev: "ONTOZRY", doplnek: "150MG TBL FLM 28" },
  { kod: "0250545", nazev: "ONTOZRY", doplnek: "12,5MG+25MG TBL FLM+TBL NOB 14X12,5MG+14X25MG" },
  { kod: "0027557", nazev: "OPATANOL", doplnek: "1MG/ML OPH GTT SOL 1X5ML" },
  { kod: "0194756", nazev: "OPSUMIT", doplnek: "10MG TBL FLM 30" },
  { kod: "0193617", nazev: "ORENCIA", doplnek: "125MG INJ SOL ISP 4X1ML II" },
  { kod: "0258540", nazev: "ORGAMETRIL", doplnek: "5MG TBL NOB 30" },
  { kod: "0223052", nazev: "OZEMPIC", doplnek: "0,25MG INJ SOL 1X1,5ML+4J" },
  { kod: "0272401", nazev: "OZEMPIC", doplnek: "0,5MG INJ SOL PEP 1X3ML+4J" },
  { kod: "0223055", nazev: "OZEMPIC", doplnek: "1MG INJ SOL 1X3ML+4J" },
  { kod: "0193863", nazev: "PEGASYS", doplnek: "90MCG INJ SOL ISP 1X0,5ML+1J" },
  { kod: "0247412", nazev: "PENTASA PROLONG", doplnek: "500MG TBL PRO 100" },
  { kod: "0253580", nazev: "PEVARYL", doplnek: "10MG/G CRM 30G" },
  { kod: "0030073", nazev: "PK-MERZ", doplnek: "100MG TBL FLM 90" },
  { kod: "0255075", nazev: "PONVORY", doplnek: "20MG TBL FLM 28" },
  { kod: "0029465", nazev: "PRIVIGEN", doplnek: "100MG/ML INF SOL 1X200ML" },
  { kod: "0272979", nazev: "PYLERA", doplnek: "140MG/125MG/125MG CPS DUR 120" },
  { kod: "0238695", nazev: "REMSIMA", doplnek: "120MG INJ SOL 2X1ML pen" },
  { kod: "0149251", nazev: "RENVELA", doplnek: "800MG TBL FLM 180" },
  { kod: "0027286", nazev: "RILUTEK", doplnek: "50MG TBL FLM 56" },
  { kod: "0238756", nazev: "RINVOQ", doplnek: "15MG TBL PRO 28 KAL" },
  { kod: "0258231", nazev: "ROCALTROL", doplnek: "0,25MCG CPS MOL 30" },
  { kod: "0237899", nazev: "ROSEMIG", doplnek: "20MG NAS SPR SOL 2X0,1ML" },
  { kod: "0272602", nazev: "RYBELSUS", doplnek: "1,5MG TBL NOB 30" },
  { kod: "0272607", nazev: "RYBELSUS", doplnek: "4MG TBL NOB 30" },
  { kod: "0272612", nazev: "RYBELSUS", doplnek: "9MG TBL NOB 30" },
  { kod: "0238211", nazev: "RXULTI", doplnek: "1MG TBL FLM 28" },
  { kod: "0237440", nazev: "SAIZEN", doplnek: "8MG/ML INJ SOL ZVL 1X1,5ML" },
  { kod: "0237442", nazev: "SAIZEN", doplnek: "8MG/ML INJ SOL ZVL 5X1,5ML" },
  { kod: "0195893", nazev: "SALOFALK", doplnek: "1000MG GRA PRO 60" },
  { kod: "0016309", nazev: "SANDIMMUN NEORAL", doplnek: "100MG/ML POR SOL 50ML" },
  { kod: "0015642", nazev: "SANDIMMUN NEORAL", doplnek: "100MG CPS MOL 50" },
  { kod: "0015640", nazev: "SANDIMMUN NEORAL", doplnek: "25MG CPS MOL 50" },
  { kod: "0210390", nazev: "SAXENDA", doplnek: "6MG/ML INJ SOL 3X3ML" },
  { kod: "0193552", nazev: "SEEBRI BREEZHALER", doplnek: "44 MCG INH PLV CPS DUR 30X1X44RG+INH" },
  { kod: "0237697", nazev: "SERETIDE DISKUS", doplnek: "50MCG/250MCG INH PLV DOS 1X60DÁV" },
  { kod: "0285452", nazev: "SERETIDE DISKUS", doplnek: "50MCG/250MCG INH PLV DOS 3X60DÁV" },
  { kod: "0285457", nazev: "SERETIDE DISKUS", doplnek: "50MCG/500MCG INH PLV DOS 3X60DÁV" },
  { kod: "6005470", nazev: "SIDERAL FORTE", doplnek: "INT. TOB. 30" },
  { kod: "0149564", nazev: "SIMPONI", doplnek: "50MG INJ SOL PEP 1X0,5ML pen" },
  { kod: "0254589", nazev: "SINGULAIR", doplnek: "10MG TBL FLM 28" },
  { kod: "0254591", nazev: "SINGULAIR", doplnek: "10MG TBL FLM 98" },
  { kod: "0254588", nazev: "SINGULAIR JUNIOR", doplnek: "5MG TBL MND 98" },
  { kod: "0222267", nazev: "SKILARENCE", doplnek: "30MG TBL ENT 42" },
  { kod: "0210929", nazev: "SOMAVERT", doplnek: "30MG INJ PSO LQF 30+30X1ML ISP" },
  { kod: "0210927", nazev: "SOMAVERT", doplnek: "25MG INJ PSO LQF 30+30X1ML ISP" },
  { kod: "0027629", nazev: "SOMAVERT", doplnek: "10MG INJ PSO LQF 30+30X1ML ISP" },
  { kod: "0119653", nazev: "SORBIFER DURULES", doplnek: "320MG/60MG TBL MRL 60" },
  { kod: "0119654", nazev: "SORBIFER DURULES", doplnek: "320MG/60MG TBL MRL 100" },
  { kod: "0155777", nazev: "SPASMED", doplnek: "15MG TBL FLM 100" },
  { kod: "0109810", nazev: "SPIRIVA RESPIMAT", doplnek: "2,5MCG INH SOL 1X60DÁV+1INH REUSABLE" },
  { kod: "0241336", nazev: "SPIRIVA RESPIMAT", doplnek: "2,5MCG INH SOL 3X60DÁV+1INH REUSABLE" },
  { kod: "0165744", nazev: "TIAPRID PMCS", doplnek: "100MG TBL NOB 100" },
  { kod: "0165741", nazev: "TIAPRID PMCS", doplnek: "100MG TBL NOB 50" },
  { kod: "0225172", nazev: "TOBRADEX", doplnek: "3MG/ML+1MG/ML OPH GTT SUS 1X5ML" },
  { kod: "0225171", nazev: "TOBRADEX OČNÍ MAST", doplnek: "3MG/G+1MG/G OPH UNG 3,5G" },
  { kod: "0225175", nazev: "TOBREX", doplnek: "3MG/ML OPH GTT SOL 1X5ML" },
  { kod: "0225174", nazev: "TOBREX", doplnek: "3MG/G OPH UNG 3,5G" },
  { kod: "0168447", nazev: "TRAJENTA", doplnek: "5MG TBL FLM 30X1" },
  { kod: "0168451", nazev: "TRAJENTA", doplnek: "5MG TBL FLM 90X1" },
  { kod: "0193822", nazev: "TRESIBA", doplnek: "100U/ML INJ SOL 5X3ML" },
  { kod: "0193826", nazev: "TRESIBA", doplnek: "200U/ML INJ SOL 3X3ML" },
  { kod: "0209356", nazev: "TREVICTA", doplnek: "263MG INJ SUS PRO 1X1,315ML+2J" },
  { kod: "0209357", nazev: "TREVICTA", doplnek: "350MG INJ SUS PRO 1X1,75ML+2J" },
  { kod: "0209358", nazev: "TREVICTA", doplnek: "525MG INJ SUS PRO 1X2,625ML+2J" },
  { kod: "0222382", nazev: "TRIMBOW", doplnek: "87MCG/5MCG/9MCG INH SOL PSS 1X120DÁV" },
  { kod: "0250359", nazev: "TRIMBOW", doplnek: "172MCG/5MCG/9MCG INH SOL PSS 1X120DÁV" },
  { kod: "0250253", nazev: "TRIXEO AEROSPHERE", doplnek: "5MCG/7,2MCG/160MCG INH SUS PSS 1X120DÁV" },
  { kod: "0267266", nazev: "TWICOR", doplnek: "10MG/10MG TBL FLM 30" },
  { kod: "0267268", nazev: "TWICOR", doplnek: "10MG/10MG TBL FLM 90" },
  { kod: "0267272", nazev: "TWICOR", doplnek: "20MG/10MG TBL FLM 90" },
  { kod: "0194361", nazev: "ULTIBRO BREEZHALER", doplnek: "85MCG/43MCG INH PLV CPS DUR 30X1+1INH" },
  { kod: "0197787", nazev: "URIZIA", doplnek: "6MG/0,4MG TBL RET 100" },
  { kod: "0091017", nazev: "URSOFALK", doplnek: "250MG CPS DUR 100" },
  { kod: "0272165", nazev: "UZPRUVO", doplnek: "45MG INJ SOL ISP 1X0,5ML" },
  { kod: "0272166", nazev: "UZPRUVO", doplnek: "90MG INJ SOL ISP 1X1ML" },
  { kod: "0500578", nazev: "VALDOXAN", doplnek: "25MG TBL FLM 28" },
  { kod: "0254592", nazev: "VERQUVO", doplnek: "2,5MG TBL FLM 14 I" },
  { kod: "0254603", nazev: "VERQUVO", doplnek: "5MG TBL FLM 14 I" },
  { kod: "0254616", nazev: "VERQUVO", doplnek: "10MG TBL FLM 98 I" },
  { kod: "0193300", nazev: "VIMPAT", doplnek: "10MG/ML SIR 1X200ML" },
  { kod: "0271682", nazev: "WEGOVY FLEXTOUCH", doplnek: "0,25MG INJ SOL PEP 1X1,5ML+4J" },
  { kod: "0272400", nazev: "WEGOVY FLEXTOUCH", doplnek: "0,5MG INJ SOL PEP 1X3ML+4J" },
  { kod: "0271684", nazev: "WEGOVY FLEXTOUCH", doplnek: "1MG INJ SOL PEP 1X3ML+4J" },
  { kod: "0271685", nazev: "WEGOVY FLEXTOUCH", doplnek: "1,7MG INJ SOL PEP 1X3ML+4J" },
  { kod: "0271686", nazev: "WEGOVY FLEXTOUCH", doplnek: "2,4MG INJ SOL PEP 1X3ML+4J" },
  { kod: "0168089", nazev: "XEPLION", doplnek: "100MG INJ SUS PRO 1+2J" },
  { kod: "0168090", nazev: "XEPLION", doplnek: "150MG INJ SUS PRO 1+2J" },
  { kod: "0262218", nazev: "XONVEA", doplnek: "20MG/20MG TBL MRL 20" },
  { kod: "0222450", nazev: "XTANDI", doplnek: "40MG TBL FLM 112" },
  { kod: "0227038", nazev: "ZENON NEO", doplnek: "10MG/10MG TBL FLM 30" },
  { kod: "0227039", nazev: "ZENON NEO", doplnek: "10MG/10MG TBL FLM 90" },
  { kod: "0227040", nazev: "ZENON NEO", doplnek: "20MG/10MG TBL FLM 30" },
  { kod: "0227041", nazev: "ZENON NEO", doplnek: "20MG/10MG TBL FLM 90" },
  { kod: "0227043", nazev: "ZENON NEO", doplnek: "40MG/10MG TBL FLM 90" },
  { kod: "0231858", nazev: "ZOLADEX DEPOT", doplnek: "10,8MG IMP ISP 1" },
  { kod: "0231859", nazev: "ZOLADEX DEPOT", doplnek: "3,6MG IMP ISP 1" },
  { kod: "0254654", nazev: "ZOLOFT", doplnek: "50MG TBL FLM 100" },
];
const suklInfo = (kod) => SUKL_CISELNIK.find((x) => x.kod === (kod || "").trim()) || null;
const suklPodleNazvu = (nazev, doplnek) => {
  const n = (nazev || "").trim().toUpperCase();
  const d = (doplnek || "").trim().toUpperCase();
  const shody = SUKL_CISELNIK.filter((x) => x.nazev.toUpperCase() === n && (!d || x.doplnek.toUpperCase() === d));
  return shody.length === 1 ? shody[0] : null;
};
/* unikátní obchodní názvy pro našeptávač v poli „Název" */
const SUKL_NAZVY = [...new Set(SUKL_CISELNIK.map((x) => x.nazev))].sort();

/* ---------- blacklist SÚKL — VIDÍ JEN ZPROSTŘEDKOVATEL ----------
   Odběrateli ani dodavateli se nikde nezobrazuje (žádný štítek, žádné podbarvení).
   Zdroj: opatření obecné povahy SÚKL (v DLP API není) → zatím ruční správa. */
const BLACKLIST_SUKL = {
  "0223052": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0272401": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0223055": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0271682": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0272400": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0271684": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0271685": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0271686": { cs: "Opatření obecné povahy — omezení vývozu (semaglutid)", en: "General measure — export restriction (semaglutide)" },
  "0272602": { cs: "Opatření obecné povahy — omezení vývozu (perorální semaglutid)", en: "General measure — export restriction (oral semaglutide)" },
  "0272607": { cs: "Opatření obecné povahy — omezení vývozu (perorální semaglutid)", en: "General measure — export restriction (oral semaglutide)" },
  "0272612": { cs: "Opatření obecné povahy — omezení vývozu (perorální semaglutid)", en: "General measure — export restriction (oral semaglutide)" },
  "0210390": { cs: "Opatření obecné povahy — omezení vývozu (liraglutid)", en: "General measure — export restriction (liraglutide)" },
};
const jeBlacklist = (kod) => !!BLACKLIST_SUKL[(kod || "").trim()];
const blacklistDuvod = (kod, lang) => (BLACKLIST_SUKL[(kod || "").trim()] || {})[lang] || "";

/* ---------- ARES (mock; v produkci REST ares.gov.cz) ---------- */
const ARES_MOCK = {
  "08812301": { nazev: "Lékárna U Anděla s.r.o.", dic: "CZ08812301", adresa: "Nádražní 25, 150 00 Praha 5" },
  "26154480": { nazev: "Poliklinika Vinohrady a.s.", dic: "CZ26154480", adresa: "Vinohradská 176, 130 00 Praha 3" },
  "05523456": { nazev: "PharmaDist s.r.o.", dic: "CZ05523456", adresa: "Průmyslová 4, 619 00 Brno" },
  "17764017": { nazev: "Pharmodeco s.r.o.", dic: "CZ17764017", adresa: "Rybná 678/9, Staré Město, 110 00 Praha 1" },
  "27689012": { nazev: "MediSupply a.s.", dic: "CZ27689012", adresa: "Logistická 8, 250 01 Brandýs nad Labem" },
};

/* ---------- vzorová centrální tabulka (14 položek, ostrý seznam dorazí zvlášť) ---------- */
/* ---------------------------------------------------------------------------
   Demo data sledují skutečný tok obchodu:
     odběratel podá závaznou objednávku (POZ) → zprostředkovatel z ní udělá
     anonymní poptávku (POP) → konkrétní dodavatel nabídne → akceptací vzniká
     řádek ve Zboží v pohybu, vždy pro toho jednoho odběratele.
   Žádná položka nevzniká „na sklad“ a žádná nepatří „VŠEM“.
   -------------------------------------------------------------------------- */

/* zboží v pohybu — každý řádek je výsledek akceptované nabídky ke konkrétní objednávce.
   nakupCena = cena dodavatele, cena = max. cena odběratele (tu platí vždy). */
const PRODUCTS_SEED = [
  /* POZ-2026-010 · ODB-01 · pokryto dvěma dodavateli, oba pod limitem 1 480 Kč */
  { id: 1, sukl: "0193745", nazev: "ELIQUIS", doplnek: "5MG TBL FLM 60", atc: "B01AF02", vyrobce: "Bristol-Myers Squibb", sarze: "EQ4512A", expirace: "2028-03-31", ean: "", ks: 200, nakupCena: 1310, cena: 1480, dodKod: "DOD-01", odbKod: "ODB-01", pozCislo: "POZ-2026-010", stavPohyb: "expedovano", datumObjednano: "2026-07-20T09:00:00.000Z", datumPrijem: "2026-07-23T08:00:00.000Z", datumExpedice: "2026-07-23T14:00:00.000Z" },
  { id: 2, sukl: "0193745", nazev: "ELIQUIS", doplnek: "5MG TBL FLM 60", atc: "B01AF02", vyrobce: "Bristol-Myers Squibb", sarze: "EQ4602C", expirace: "2028-06-30", ean: "", ks: 300, nakupCena: 1385, cena: 1480, dodKod: "DOD-02", odbKod: "ODB-01", pozCislo: "POZ-2026-010", stavPohyb: "prijato", datumObjednano: "2026-07-28T09:00:00.000Z", datumPrijem: "2026-08-04T08:10:00.000Z", datumExpedice: "" },
  /* POZ-2026-011 · ODB-02 · čeká na dodání od dodavatele */
  { id: 3, sukl: "0210023", nazev: "JARDIANCE", doplnek: "10MG TBL FLM 30X1", atc: "A10BK03", vyrobce: "Boehringer Ingelheim", sarze: "JD2291", expirace: "2028-09-30", ean: "", ks: 320, nakupCena: 372, cena: 465, dodKod: "DOD-03", odbKod: "ODB-02", pozCislo: "POZ-2026-011", stavPohyb: "objednano", datumObjednano: "2026-08-17T10:00:00.000Z", datumPrijem: "", datumExpedice: "" },
  /* POZ-2026-012 · ODB-03 */
  { id: 4, sukl: "0193660", nazev: "FORXIGA", doplnek: "10MG TBL FLM 30X1", atc: "A10BK01", vyrobce: "AstraZeneca", sarze: "FX8841", expirace: "2028-01-31", ean: "", ks: 260, nakupCena: 356, cena: 445, dodKod: "DOD-03", odbKod: "ODB-03", pozCislo: "POZ-2026-012", stavPohyb: "prijato", datumObjednano: "2026-08-10T09:30:00.000Z", datumPrijem: "2026-08-18T07:50:00.000Z", datumExpedice: "" },
  /* POZ-2026-013 · ODB-02 · krátká expirace, hlídá se barevně */
  { id: 5, sukl: "0025837", nazev: "KEPPRA", doplnek: "500MG TBL FLM 100", atc: "N03AX14", vyrobce: "UCB", sarze: "KP5518", expirace: "2026-11-30", ean: "", ks: 150, nakupCena: 720, cena: 900, dodKod: "DOD-01", odbKod: "ODB-02", pozCislo: "POZ-2026-013", stavPohyb: "objednano", datumObjednano: "2026-08-18T11:00:00.000Z", datumPrijem: "", datumExpedice: "" },
  /* POZ-2026-014 · ODB-03 · položka s vývozním omezením — příznak vidí jen zprostředkovatel */
  { id: 6, sukl: "0223055", nazev: "OZEMPIC", doplnek: "1MG INJ SOL 1X3ML+4J", atc: "A10BJ06", vyrobce: "Novo Nordisk", sarze: "OZ9921", expirace: "2027-08-31", ean: "", ks: 40, nakupCena: 2180, cena: 2600, dodKod: "DOD-03", odbKod: "ODB-03", pozCislo: "POZ-2026-014", stavPohyb: "expedovano", datumObjednano: "2026-07-14T09:00:00.000Z", datumPrijem: "2026-07-16T08:00:00.000Z", datumExpedice: "2026-07-16T15:30:00.000Z" },
];

/* otevřené poptávky dodavatelům — každá vznikla z konkrétní závazné objednávky */
const DEMANDS_SEED = [
  {
    cislo: "POP-2026-001", datum: "2026-08-03T09:10:00.000Z", provize: 5,
    minExpMesice: 6, minExp: "", prijemci: [], stav: "otevrena",
    polozky: [
      {
        /* ODB-01 chce 500 ks za max. 1 480 Kč → dodavatelům jdeme s 1 409,52 Kč */
        id: 1, sukl: "0193745", nazev: "ELIQUIS", doplnek: "5MG TBL FLM 60",
        mnozstvi: 500, cena: 1409.52, maxProdejni: 1480, pozadovanaSarze: "",
        zdroje: [{ odbKod: "ODB-01", pozCislo: "POZ-2026-001", mnozstvi: 500, maxCena: 1480 }],
        nabidky: [
          { id: 1, dodKod: "DOD-01", cena: 1310, mnozstvi: 200, moq: null, akceptovano: 0, sarze: "EQ7781", expirace: "2027-09-30", stav: "podana", datum: "2026-08-03T11:00:00.000Z" },
          { id: 2, dodKod: "DOD-02", cena: 1385, mnozstvi: 300, moq: 100, akceptovano: 0, sarze: "EQ8120", expirace: "2027-12-31", stav: "podana", datum: "2026-08-03T13:20:00.000Z" },
          { id: 3, dodKod: "DOD-03", cena: 1440, mnozstvi: 500, moq: 500, akceptovano: 0, sarze: "EQ9004", expirace: "2028-02-28", stav: "podana", datum: "2026-08-04T08:05:00.000Z" },
        ],
      },
      {
        /* ODB-03 chce 200 ks za max. 900 Kč — zatím reagoval jediný dodavatel */
        id: 2, sukl: "0168451", nazev: "TRAJENTA", doplnek: "5MG TBL FLM 90X1",
        mnozstvi: 200, cena: 857.14, maxProdejni: 900, pozadovanaSarze: "",
        zdroje: [{ odbKod: "ODB-03", pozCislo: "POZ-2026-005", mnozstvi: 200, maxCena: 900 }],
        nabidky: [
          { id: 4, dodKod: "DOD-03", cena: 845, mnozstvi: 200, moq: null, akceptovano: 0, sarze: "TJ5540", expirace: "2028-04-30", stav: "podana", datum: "2026-08-04T09:40:00.000Z" },
        ],
      },
    ],
  },
];

/* závazné objednávky odběratelů */
const POZADAVKY_SEED = [
  { cislo: "POZ-2026-001", odbKod: "ODB-01", nazev: "ELIQUIS", doplnek: "5MG TBL FLM 60", sukl: "0193745", mnozstvi: 500, maxCena: 1480, sarze: "", minExpMesice: 6, minExp: "", pozn: "Pravidelný odběr, dodání do Passau.", datum: "2026-08-03T08:40:00.000Z", stav: "vreseni" },
  { cislo: "POZ-2026-002", odbKod: "ODB-02", nazev: "LYRICA", doplnek: "75MG CPS DUR 56", sukl: "0028217", mnozstvi: 300, maxCena: 340, sarze: "", minExpMesice: 6, minExp: "", pozn: "", datum: "2026-08-04T10:15:00.000Z", stav: "prijata" },
  { cislo: "POZ-2026-003", odbKod: "ODB-03", nazev: "LYRICA", doplnek: "75MG CPS DUR 56", sukl: "0028217", mnozstvi: 200, maxCena: 355, sarze: "", minExpMesice: 12, minExp: "", pozn: "Možno i po částech.", datum: "2026-08-04T12:02:00.000Z", stav: "prijata" },
  { cislo: "POZ-2026-004", odbKod: "ODB-01", nazev: "OZEMPIC", doplnek: "1MG INJ SOL 1X3ML+4J", sukl: "0223055", mnozstvi: 100, maxCena: 2600, sarze: "", minExpMesice: 6, minExp: "", pozn: "", datum: "2026-08-05T07:30:00.000Z", stav: "prijata" },
  { cislo: "POZ-2026-005", odbKod: "ODB-03", nazev: "TRAJENTA", doplnek: "5MG TBL FLM 90X1", sukl: "0168451", mnozstvi: 200, maxCena: 900, sarze: "", minExpMesice: 6, minExp: "", pozn: "", datum: "2026-08-03T09:00:00.000Z", stav: "vreseni" },
  { cislo: "POZ-2026-006", odbKod: "ODB-02", nazev: "KEPPRA", doplnek: "1000MG TBL FLM 50", sukl: "0025849", mnozstvi: 120, maxCena: 1650, sarze: "", minExpMesice: 9, minExp: "", pozn: "", datum: "2026-08-05T11:20:00.000Z", stav: "prijata" },
  /* už vyřízené objednávky, ke kterým patří řádky ve Zboží v pohybu */
  { cislo: "POZ-2026-010", odbKod: "ODB-01", nazev: "ELIQUIS", doplnek: "5MG TBL FLM 60", sukl: "0193745", mnozstvi: 500, maxCena: 1480, sarze: "", minExpMesice: 6, minExp: "", pozn: "", datum: "2026-07-18T08:00:00.000Z", stav: "vyrizena" },
  { cislo: "POZ-2026-011", odbKod: "ODB-02", nazev: "JARDIANCE", doplnek: "10MG TBL FLM 30X1", sukl: "0210023", mnozstvi: 320, maxCena: 465, sarze: "", minExpMesice: 6, minExp: "", pozn: "", datum: "2026-08-14T09:20:00.000Z", stav: "vreseni" },
  { cislo: "POZ-2026-012", odbKod: "ODB-03", nazev: "FORXIGA", doplnek: "10MG TBL FLM 30X1", sukl: "0193660", mnozstvi: 260, maxCena: 445, sarze: "", minExpMesice: 6, minExp: "", pozn: "", datum: "2026-08-07T13:00:00.000Z", stav: "vreseni" },
  { cislo: "POZ-2026-013", odbKod: "ODB-02", nazev: "KEPPRA", doplnek: "500MG TBL FLM 100", sukl: "0025837", mnozstvi: 150, maxCena: 900, sarze: "", minExpMesice: 3, minExp: "", pozn: "Krátká expirace akceptována.", datum: "2026-08-17T10:40:00.000Z", stav: "vreseni" },
  { cislo: "POZ-2026-014", odbKod: "ODB-03", nazev: "OZEMPIC", doplnek: "1MG INJ SOL 1X3ML+4J", sukl: "0223055", mnozstvi: 40, maxCena: 2600, sarze: "", minExpMesice: 6, minExp: "", pozn: "", datum: "2026-07-12T07:10:00.000Z", stav: "vyrizena" },
];

const PODMINKY = {
  cs: [
    ["Platnost nabídky a objednávky", "Odeslaná objednávka je závazná 5 pracovních dnů. Po potvrzení nelze měnit bez vzájemné dohody."],
    ["Minimální expirace léčiv", "Dodávané položky mají expiraci minimálně 6 měsíců od data dodání, není-li u konkrétní poptávky nebo položky uvedeno jinak."],
    ["Platební podmínky", "Splatnost faktur 14 dní od data vystavení dodacího listu. Platba bankovním převodem na účet uvedený na dokladu."],
    ["Svoz zboží", "Svoz zajišťuje zprostředkovatel validovanou přepravou 2× týdně (úterý, čtvrtek). Termín svozu je potvrzen e-mailem."],
    ["Skladovací podmínky", "Skladujte při 15–25 °C, chraňte před přímým světlem a vlhkostí. Chladový řetězec (2–8 °C) je vyznačen u konkrétní položky."],
    ["Reklamace", "Zjevné vady oznamte do 48 hodin od převzetí. Položky s porušeným obalem nepřebírejte a uveďte je do dodacího listu."],
    ["DPH při dodání do EU", "Při dodání do jiného členského státu EU je plnění osvobozeno od DPH s nárokem na odpočet — daň odvede pořizovatel (čl. 138 směrnice 2006/112/ES)."],
  ],
  en: [
    ["Offer and order validity", "A submitted order is binding for 5 business days. Once confirmed, it cannot be changed without mutual agreement."],
    ["Minimum shelf life", "Delivered items have an expiry of at least 6 months from the delivery date unless stated otherwise for a particular RFQ or item."],
    ["Payment terms", "Invoices are due 14 days from the delivery note issue date. Payment by bank transfer to the account stated on the document."],
    ["Goods collection", "Collection is arranged by the intermediary via validated transport twice a week (Tuesday, Thursday). The date is confirmed by e-mail."],
    ["Storage conditions", "Store at 15–25 °C, protect from direct light and humidity. Cold chain items (2–8 °C) are marked on the product."],
    ["Complaints", "Report visible defects within 48 hours of receipt. Do not accept items with damaged packaging and note them on the delivery note."],
    ["VAT on EU supplies", "Supplies to another EU member state are exempt from VAT with the right of deduction — the acquirer accounts for the tax (Art. 138 of Directive 2006/112/EC)."],
  ],
};

/* ---------- pomocné funkce ---------- */
const DPH_CZ = 0.12; // snížená sazba DPH pro léčiva v ČR
const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const marzePct = (p) => (Number(p.nakupCena) > 0 ? (Number(p.cena) / Number(p.nakupCena) - 1) * 100 : 0);
const today = () => new Date("2026-08-06");
const plusDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const plusMonths = (d, n) => { const x = new Date(d); x.setMonth(x.getMonth() + Number(n || 0)); return x; };
function expState(exp) {
  if (!exp) return "neuvedena";
  const months = (new Date(exp) - today()) / (1000 * 3600 * 24 * 30.4);
  if (months < 0) return "prosla";
  if (months < 6) return "brzy";
  return "ok";
}
/* ---------------------------------------------------------------------------
   NÁVRH — jediný mechanismus pro obě strany. Nese až tři množstevní hladiny
   (ks + cena/ks) a vlastní platnost. Směr „dod“ = zprostředkovatel → dodavatel,
   směr „odb“ = zprostředkovatel → odběratel (nabídka většího množství).
   Nový návrh vždy ruší předchozí, takže nikdy neplatí dva zároveň.
   -------------------------------------------------------------------------- */
const HLADIN_MAX = 3;
const prazdneHladiny = () => [{ ks: "", cena: "" }, { ks: "", cena: "" }, { ks: "", cena: "" }];
const platnostZa = (dni) => { const d = new Date(); d.setDate(d.getDate() + dni); return d.toISOString().slice(0, 10); };
const platneHladiny = (h) => (h || []).filter((x) => Number(x.ks) > 0 && Number(x.cena) > 0)
  .slice(0, HLADIN_MAX).map((x) => ({ ks: Math.round(Number(x.ks)), cena: r2(Number(x.cena)) }));
const navrhPropadl = (nv) => !!(nv && nv.platnost && nv.platnost < today());

/* ---------------------------------------------------------------------------
   ZBOŽÍ V POHYBU — Pharmodeco nedrží zásobu. Každý řádek je konkrétní nákup
   pro konkrétní objednávku a prochází třemi stavy. Nic se nenakupuje „na sklad“.
   -------------------------------------------------------------------------- */
const POHYB = ["objednano", "prijato", "expedovano"];
const POHYB_LABEL = {
  objednano: { cs: "objednáno u dodavatele", en: "ordered from supplier", pill: "nova" },
  prijato: { cs: "převzato od dodavatele", en: "received from supplier", pill: "brzy" },
  expedovano: { cs: "expedováno odběrateli", en: "dispatched to buyer", pill: "ok" },
};
const pohybStav = (p) => (POHYB.includes(p.stavPohyb) ? p.stavPohyb : "prijato");

/* kolik kusů položky poptávky už je pokryto akceptovanými nabídkami */
const pokryto = (it) => (it.nabidky || []).reduce((s, n) => s + (Number(n.akceptovano) || 0), 0);
const polozkaPokryta = (it) => pokryto(it) >= it.mnozstvi;
const poptavkaPokryta = (d) => (d.polozky || []).every(polozkaPokryta);
/* doporučená cena: poslední známá prodejní cena stejného kódu SÚKL */
const doporucenaCena = (kod, produkty) => {
  const h = (produkty || []).filter((x) => x.sukl === (kod || "").trim());
  return h.length ? h[0].cena : null;
};
/* skutečné stažení souboru — CSV se středníkem a BOM, otevře se přímo v Excelu */
const stahniCSV = (nazev, radky) => {
  const csv = "\uFEFF" + radky.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  /* odkaz musí být v dokumentu, jinak některé prohlížeče stahování ignorují */
  const a = document.createElement("a");
  a.href = url; a.download = nazev; a.rel = "noopener"; a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 2000);
};
const genKod6 = () => String(Math.floor(100000 + Math.random() * 900000));

/* ============================================================================
   Barevné motivy podle role. Přepisují se jen CSS proměnné na kořenovém prvku,
   takže zbytek stylů zůstává jediný. Odběratel = světlá, zprostředkovatel =
   černá se zlatým akcentem, dodavatel = tmavá inverze světlé s fialovým akcentem.
   ========================================================================== */
const TEMA = {
  odberatel: {
    "--bg": "#F7F6FC",
    "--top-bg": "#FFFFFF", "--top-fg": "#211B4E", "--top-line": "rgba(33,27,78,.18)", "--badge-bg": "#3B2E8F",
    "--nav-bg": "#EAE6FB", "--nav-fg": "#55507F", "--nav-on": "#211B4E", "--nav-line": "#7C6AE8",
    "--bar-bg": "#211B4E",
  },
  admin: {
    "--bg": "#F4F3F7", "--tint": "#F7F6FA", "--th-bg": "#F1F0F5", "--line": "#E2E0E9", "--td-line": "#EFEEF3",
    "--brand": "#1A1A22", "--brand-dk": "#0D0D12", "--brand-lt": "#E8E6EF", "--peri": "#DCD9E6", "--peri-fg": "#3A3846",
    "--top-bg": "#0D0D12", "--top-fg": "#FFFFFF", "--top-line": "rgba(255,255,255,.32)", "--badge-bg": "#8A6A0B",
    "--nav-bg": "#1A1A22", "--nav-fg": "#A9A6BE", "--nav-on": "#FFFFFF", "--nav-line": "#C9A227",
    "--amber": "#8A6A0B", "--amber-bg": "#FBF3DC", "--bar-bg": "#0D0D12",
  },
  /* Dodavatel: tmavé okolí, ale karty a formuláře zůstávají světlé — v tabulkách
     s cenami a šaržemi se čte líp na světlém a tisk dokladů zůstává v pořádku. */
  dodavatel: {
    "--bg": "#14122B",
    "--top-bg": "#0C0A1C", "--top-fg": "#FFFFFF", "--top-line": "rgba(255,255,255,.3)", "--badge-bg": "#3B2E8F",
    "--nav-bg": "#241F4E", "--nav-fg": "#B6B0E4", "--nav-on": "#FFFFFF", "--nav-line": "#8B7BF0",
    "--bar-bg": "#0C0A1C",
  },
};


/* ============================================================================
   IMPORT / EXPORT EXCELU — vícepoložková poptávka odběratele
   ----------------------------------------------------------------------------
   Šablona (list „Poptávka“):
     SÚKL | PRODUKT | SÍLA / FORMA / BALENÍ | MAX. CENA/KS BEZ DPH |
     MNOŽSTVÍ (KS) | MIN. KS/ŠARŽE | MIN. EXSPIRACE | POZNÁMKA
   Povinné: PRODUKT (nebo platný kód SÚKL), MAX. CENA/KS, MNOŽSTVÍ.
   Cena = maximální částka, kterou je odběratel ochoten zaplatit za kus bez DPH;
   z ní zprostředkovatel odvozuje požadovanou cenu dodavatelům (limit ÷ (1+provize)).
   Knihovna SheetJS se načítá z CDN v index.html (window.XLSX). Není-li k dispozici
   (offline, blokované CDN), pracuje se s CSV se středníkem a BOM — Excel je otevře.
   POZOR: blacklist SÚKL se v náhledu importu odběrateli NIKDY nezobrazuje.
   ========================================================================== */
const XLS_HLAVICKA = {
  cs: ["SÚKL", "PRODUKT", "MAX. CENA/KS BEZ DPH", "MNOŽSTVÍ (KS)", "MIN. KS/ŠARŽE", "MIN. EXSPIRACE", "POZNÁMKA"],
  en: ["SUKL", "PRODUCT", "MAX. PRICE/PC EXCL. VAT", "QUANTITY (PCS)", "MIN. PCS/BATCH", "MIN. SHELF LIFE", "NOTE"],
};
const XLS_PRIKLAD = {
  cs: [
    ["0193745", "ELIQUIS 5MG TBL FLM 60", 1480, 500, 100, "6", "PŘÍKLAD — tento řádek smažte"],
    ["0028217", "LYRICA 75MG CPS DUR 56", 340, 300, "", "31.12.2027", "PŘÍKLAD — tento řádek smažte"],
  ],
  en: [
    ["0193745", "ELIQUIS 5MG TBL FLM 60", 1480, 500, 100, "6", "EXAMPLE — delete this row"],
    ["0028217", "LYRICA 75MG CPS DUR 56", 340, 300, "", "31.12.2027", "EXAMPLE — delete this row"],
  ],
};
const XLS_NAVOD = {
  cs: [
    ["PORT — marketplace · ezdravotnici.cz"],
    ["Vzorový soubor pro hromadnou poptávku"],
    [],
    ["Sloupec", "Popis"],
    ["SÚKL", "Sedmimístný kód SÚKL. Nepovinný, ale výrazně urychlí zpracování. Úvodní nuly doplníme automaticky."],
    ["PRODUKT", "POVINNÉ, pokud není vyplněn kód SÚKL. Obchodní název včetně síly, formy a velikosti balení v jedné buňce — např. ELIQUIS 5MG TBL FLM 60. Bez balení nelze položku jednoznačně určit."],
    ["MAX. CENA/KS BEZ DPH", "POVINNÉ. Nejvyšší cena za kus bez DPH, kterou jste ochotni zaplatit. Desetinná čárka i tečka."],
    ["MNOŽSTVÍ (KS)", "POVINNÉ. Celé číslo, počet kusů."],
    ["MIN. KS/ŠARŽE", "Nepovinné. Nejmenší přijatelný počet kusů z jedné šarže."],
    ["MIN. EXSPIRACE", "Nepovinné. Buď počet měsíců (např. 6), nebo datum (31.12.2027). Nevyplněno = 6 měsíců dle obchodních podmínek."],
    ["POZNÁMKA", "Nepovinné. Volný text pro zprostředkovatele."],
    [],
    ["Pravidla", ""],
    ["", "Vyplňujte pouze list „Poptávka“. Řádky s poznámkou PŘÍKLAD se neimportují."],
    ["", "Prázdné a součtové řádky se přeskočí. Maximálně 200 řádků na soubor."],
    ["", "Před odesláním uvidíte v portálu náhled, kde lze řádky opravit nebo odebrat."],
    ["", "Ceny uvádějte bez DPH v Kč."],
  ],
  en: [
    ["PORT — marketplace · ezdravotnici.cz"],
    ["Template for a bulk request for quotation"],
    [],
    ["Column", "Description"],
    ["SUKL", "Seven-digit Czech SÚKL code. Optional but speeds up processing. Leading zeros are restored automatically."],
    ["PRODUCT", "REQUIRED unless the SÚKL code is filled in. Brand name including strength, form and pack size in one cell — e.g. ELIQUIS 5MG TBL FLM 60. Without the pack size the item cannot be identified unambiguously."],
    ["MAX. PRICE/PC EXCL. VAT", "REQUIRED. The highest price per piece excl. VAT you are willing to pay."],
    ["QUANTITY (PCS)", "REQUIRED. Whole number of pieces."],
    ["MIN. PCS/BATCH", "Optional. Smallest acceptable number of pieces from a single batch."],
    ["MIN. SHELF LIFE", "Optional. Either a number of months (e.g. 6) or a date (31/12/2027). Empty = 6 months per the terms of trade."],
    ["NOTE", "Optional. Free text for the operator."],
    [],
    ["Rules", ""],
    ["", "Fill in the \u201cRFQ\u201d sheet only. Rows marked EXAMPLE are ignored."],
    ["", "Empty and total rows are skipped. Maximum 200 rows per file."],
    ["", "Before submitting you will see a preview where rows can be corrected or removed."],
    ["", "Prices excl. VAT in CZK."],
  ],
};

/* „ELIQUIS 5MG TBL FLM 60“ → { kod, nazev, doplnek } podle číselníku SÚKL.
   Porovnává se bez diakritiky, mezer a interpunkce, takže projde i „Eliquis 5 mg tbl.flm. 60x“. */
const normProdukt = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]/g, "");
const rozdelProdukt = (text) => {
  const cely = normProdukt(text);
  if (!cely) return null;
  let nej = null;
  for (const x of SUKL_CISELNIK) {
    const n = normProdukt(x.nazev);
    if (!n || !cely.startsWith(n)) continue;
    const d = normProdukt(x.doplnek);
    if (d && cely.indexOf(d, n.length) >= 0) {
      const skore = cely === n + d ? 3 : 2;
      if (!nej || skore > nej.skore || (skore === nej.skore && d.length > nej.dl)) nej = { x, skore, dl: d.length };
    } else if (!nej) nej = { x, skore: 1, dl: 0 };
  }
  if (!nej) return null;
  if (nej.skore === 1) {
    /* poznali jsme jen obchodní název — kód doplníme, jen když existuje jediné balení */
    const stejne = SUKL_CISELNIK.filter((x) => normProdukt(x.nazev) === normProdukt(nej.x.nazev));
    return stejne.length === 1
      ? { kod: stejne[0].kod, nazev: stejne[0].nazev, doplnek: stejne[0].doplnek }
      : { kod: "", nazev: nej.x.nazev, doplnek: "" };
  }
  return { kod: nej.x.kod, nazev: nej.x.nazev, doplnek: nej.x.doplnek };
};
const celyNazev = (r) => [r.nazev, r.doplnek].filter(Boolean).join(" ").trim();

/* název sloupce → interní pole; tolerantní k diakritice, mezerám a interpunkci */
const normHlav = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9]/g, "");
const mapSloupec = (h) => {
  const s = normHlav(h);
  if (!s) return null;
  if (s.includes("SUKL")) return "sukl";
  if (s.includes("EXSP") || s.includes("EXPIR") || s.includes("SHELF") || s.includes("TRVANL")) return "minExp";
  if (s.includes("SARZ") || s.includes("BATCH") || s.startsWith("MINKS") || s.startsWith("MINPCS")) return "minKsSarze";
  if (s.includes("POZN") || s.includes("NOTE") || s.includes("COMMENT")) return "pozn";
  if (s.includes("CENA") || s.includes("PRICE")) return "maxCena";
  if (s.includes("MNOZSTVI") || s.includes("POCET") || s.includes("QUANT") || s.includes("QTY") || s === "KS" || s === "PCS") return "mnozstvi";
  if (s.includes("SILA") || s.includes("FORMA") || s.includes("BALEN") || s.includes("DOPLNEK") || s.includes("STRENGTH") || s.includes("PACK")) return "doplnek";
  if (s.includes("PRODUKT") || s.includes("PRODUCT") || s.includes("NAZEV") || s.includes("PRIPRAVEK") || s.includes("NAME") || s.includes("ITEM")) return "nazev";
  if (s === "KOD" || s === "CODE") return "sukl";
  return null;
};
/* „1 234,50 Kč“ i 1234.5 */
const cisloZBunky = (v) => {
  if (typeof v === "number") return isFinite(v) ? v : null;
  const s = String(v == null ? "" : v).replace(/[\s\u00a0]/g, "").replace(/(kč|kc|czk|eur|€)/gi, "").replace(",", ".").replace(/[^0-9.\-]/g, "");
  if (!s || s === "-" || s === ".") return null;
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
};
/* Excel typicky ukousne úvodní nuly kódu SÚKL — doplníme je zpět */
const suklZBunky = (v) => {
  const s = String(v == null ? "" : v).replace(/\D/g, "");
  if (!s) return "";
  return s.length <= 7 ? s.padStart(7, "0") : s;
};
const EXCEL_EPOCH = Date.UTC(1899, 11, 30);
const isoDatum = (d) => (isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10));
/* minimální expirace: počet měsíců NEBO konkrétní datum (obojí je v modelu podporováno) */
const expZBunky = (v) => {
  const prazdno = { minExpMesice: null, minExp: "" };
  if (v === null || v === undefined || v === "") return prazdno;
  if (v instanceof Date) return { minExpMesice: null, minExp: isoDatum(v) };
  if (typeof v === "number") {
    if (v > 0 && v <= 120) return { minExpMesice: Math.round(v), minExp: "" };
    if (v >= 20000 && v <= 80000) return { minExpMesice: null, minExp: isoDatum(new Date(EXCEL_EPOCH + v * 86400000)) };
    return prazdno;
  }
  const s = String(v).trim();
  let m = s.match(/^(\d{1,2})\s*[.\/-]\s*(\d{1,2})\s*[.\/-]\s*(\d{2,4})$/);
  if (m) { let rok = Number(m[3]); if (rok < 100) rok += 2000; return { minExpMesice: null, minExp: isoDatum(new Date(Date.UTC(rok, Number(m[2]) - 1, Number(m[1])))) }; }
  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return { minExpMesice: null, minExp: isoDatum(new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])))) };
  m = s.match(/^(\d{1,2})\s*[.\/-]\s*(\d{4})$/);          /* 12/2027 → konec měsíce */
  if (m) return { minExpMesice: null, minExp: isoDatum(new Date(Date.UTC(Number(m[2]), Number(m[1]), 0))) };
  m = s.match(/(\d+)/);
  if (!m) return prazdno;
  const n = Number(m[1]);
  if (n >= 2020 && n <= 2100) return { minExpMesice: null, minExp: n + "-12-31" };  /* samotný rok */
  if (n > 0 && n <= 120) return { minExpMesice: n, minExp: "" };
  return prazdno;
};
const jePrikladovyRadek = (o) => /^(PŘÍKLAD|PRIKLAD|VZOR|EXAMPLE|SAMPLE)/i.test(String(o.pozn || "").trim());

/* tabulka (pole polí) → řádky poptávky; hlavička se hledá v prvních 15 řádcích,
   takže souboru nevadí logo, nadpis ani prázdné řádky nad tabulkou */
const radkyZTabulky = (aoa) => {
  let hi = -1, mapa = null;
  for (let i = 0; i < Math.min((aoa || []).length, 15); i++) {
    const m = (aoa[i] || []).map(mapSloupec);
    const pole = m.filter(Boolean);
    if (pole.indexOf("mnozstvi") >= 0 && (pole.indexOf("nazev") >= 0 || pole.indexOf("sukl") >= 0)) { hi = i; mapa = m; break; }
  }
  if (hi < 0) return null;
  const out = [];
  for (let i = hi + 1; i < aoa.length && out.length < 200; i++) {
    const r = aoa[i] || [];
    const o = { sukl: "", nazev: "", doplnek: "", maxCena: "", mnozstvi: "", minKsSarze: "", minExpMesice: null, minExp: "", pozn: "" };
    mapa.forEach((pole, j) => {
      if (!pole) return;
      const v = r[j];
      if (pole === "sukl") o.sukl = suklZBunky(v);
      else if (pole === "maxCena") { const n = cisloZBunky(v); if (n !== null) o.maxCena = n; }
      else if (pole === "mnozstvi") { const n = cisloZBunky(v); if (n !== null) o.mnozstvi = Math.round(n); }
      else if (pole === "minKsSarze") { const n = cisloZBunky(v); if (n !== null) o.minKsSarze = Math.round(n); }
      else if (pole === "minExp") { const e = expZBunky(v); o.minExpMesice = e.minExpMesice; o.minExp = e.minExp; }
      else o[pole] = String(v == null ? "" : v).trim();
    });
    if (!o.sukl && !o.nazev && !o.mnozstvi && !o.maxCena) continue;      /* prázdný řádek */
    if (jePrikladovyRadek(o)) continue;                                  /* ukázka ze šablony */
    if (!o.sukl && !o.nazev) continue;
    if (!o.sukl && /^(celkem|suma|součet|soucet|total|sum)\b/i.test(o.nazev)) continue;   /* součtový řádek */
    out.push(o);
  }
  return out;
};

/* doplnění z číselníku SÚKL — jen jednou, při načtení souboru */
const obohatRadek = (o) => {
  const r = Object.assign({}, o, { varovani: [] });
  const zeSouboru = celyNazev(r);                 /* co uživatel napsal do sloupce PRODUKT */
  const c = r.sukl ? suklInfo(r.sukl) : null;
  if (c) {
    if (zeSouboru && normProdukt(zeSouboru) !== normProdukt(c.nazev + c.doplnek)) r.varovani.push(["nazev", zeSouboru, c.nazev + " " + c.doplnek]);
    r.nazev = c.nazev; r.doplnek = c.doplnek;
  } else {
    if (r.sukl) r.varovani.push(["suklNeznamy", r.sukl]);
    const p = rozdelProdukt(zeSouboru) || suklPodleNazvu(r.nazev, r.doplnek);
    if (p && p.kod) { r.sukl = p.kod; r.nazev = p.nazev; r.doplnek = p.doplnek; }
    else if (p) { r.nazev = p.nazev; r.doplnek = ""; r.varovani.push(["bezBaleni"]); }
    else if (zeSouboru) { r.nazev = zeSouboru; r.doplnek = ""; r.varovani.push(["mimoCiselnik"]); }
  }
  r.produkt = celyNazev(r);
  return r;
};
/* kontrola — běží po každé ruční úpravě v náhledu */
const zkontrolujRadek = (r) => {
  const chyby = [];
  if (!String(r.nazev || "").trim()) chyby.push("nazev");
  if (!(Number(r.mnozstvi) > 0)) chyby.push("mnozstvi");
  if (!(Number(r.maxCena) > 0)) chyby.push("maxCena");
  const varovani = (r.varovani || []).filter((v) => v[0] !== "expMinulost");
  if (r.minExp && new Date(r.minExp) < today()) varovani.push(["expMinulost"]);
  return Object.assign({}, r, { chyby, varovani });
};
/* nouzové čtení CSV, když není k dispozici SheetJS */
const csvNaAoa = (text) => {
  const s = String(text || "").replace(/^\uFEFF/, "");
  const prvni = s.split("\n")[0] || "";
  const delim = (prvni.match(/;/g) || []).length >= (prvni.match(/,/g) || []).length ? ";" : ",";
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) { if (ch === '"') { if (s[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
    else if (ch === '"') q = true;
    else if (ch === delim) { row.push(cur); cur = ""; }
    else if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
    else if (ch !== "\r") cur += ch;
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows;
};
/* stažení vzorové šablony — .xlsx přes SheetJS, jinak CSV pro Excel */
const stahniVzorPoptavky = (jazyk) => {
  const hlav = XLS_HLAVICKA[jazyk] || XLS_HLAVICKA.cs;
  const priklad = XLS_PRIKLAD[jazyk] || XLS_PRIKLAD.cs;
  const navod = XLS_NAVOD[jazyk] || XLS_NAVOD.cs;
  const X = typeof window !== "undefined" ? window.XLSX : null;
  if (!X) { stahniCSV("PORT-poptavka-vzor.csv", [hlav].concat(priklad)); return "csv"; }
  const wb = X.utils.book_new();
  const ws = X.utils.aoa_to_sheet([hlav].concat(priklad));
  ws["!cols"] = [{ wch: 12 }, { wch: 40 }, { wch: 22 }, { wch: 15 }, { wch: 15 }, { wch: 17 }, { wch: 34 }];
  for (let r = 1; r <= priklad.length; r++) {
    const a = X.utils.encode_cell({ c: 0, r });
    if (ws[a]) { ws[a].t = "s"; ws[a].z = "@"; }
  }
  X.utils.book_append_sheet(wb, ws, jazyk === "en" ? "RFQ" : "Poptávka");
  const wn = X.utils.aoa_to_sheet(navod);
  wn["!cols"] = [{ wch: 26 }, { wch: 92 }];
  X.utils.book_append_sheet(wb, wn, jazyk === "en" ? "Instructions" : "Návod");
  X.writeFile(wb, "PORT-poptavka-vzor.xlsx");
  return "xlsx";
};


/* ============================================================ */
export default function PortApp() {
  const [lang, setLang] = useState("cs");
  const t = (cs, en) => (lang === "cs" ? cs : en);
  const locale = lang === "cs" ? "cs-CZ" : "en-GB";
  const fmtCZK = (n) => (Number(n) || 0).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + (lang === "cs" ? " Kč" : " CZK");
  const fmtPct = (n) => (Number(n) || 0).toFixed(1).replace(".", lang === "cs" ? "," : ".") + " %";
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString(locale) : "—");
  /* výpis hladin návrhu — potřebuje formát měny, proto uvnitř komponenty */
  const hladinyText = (h) => (h || []).map((x) => `${x.ks} ${t("ks", "pcs")} à ${fmtCZK(x.cena)}`).join(" / ");
  const STAV_LABEL = { nova: t("Nová", "New"), potvrzena: t("Potvrzená", "Confirmed"), expedovana: t("Expedovaná", "Dispatched") };
  const ROLE_LABEL = (r) => (r === "odberatel" ? t("Odběratel", "Buyer") : r === "dodavatel" ? t("Dodavatel", "Supplier") : t("Zprostředkovatel", "Intermediary"));
  const typLabel = (k) => { const x = TYP_SUBJEKTU.find((y) => y[0] === k); return x ? t(x[1], x[2]) : "—"; };
  /* minimální expirace: buď počet měsíců od dnešního dne, nebo konkrétní datum */
  const minExpText = (o) => {
    if (!o) return "";
    if (Number(o.minExpMesice) > 0) return t(`min. ${o.minExpMesice} měs. (do ${plusMonths(today(), o.minExpMesice).toLocaleDateString(locale)})`,
                                             `min. ${o.minExpMesice} mo. (until ${plusMonths(today(), o.minExpMesice).toLocaleDateString(locale)})`);
    if (o.minExp) return fmtDate(o.minExp);
    return "";
  };

  /* ---- sdílená obchodní data ---- */
  const [products, setProducts] = useState(PRODUCTS_SEED);
  const [orders, setOrders] = useState([]);
  const [emails, setEmails] = useState([]);
  const [users, setUsers] = useState(USERS_SEED);
  const [odberatele, setOdberatele] = useState(ODBERATELE_SEED);
  const [dodavatele, setDodavatele] = useState(DODAVATELE_SEED);
  const [demands, setDemands] = useState(DEMANDS_SEED);
  const [pozadavky, setPozadavky] = useState(POZADAVKY_SEED);

  /* ---- lokální (nesdílené) ---- */
  const [user, setUser] = useState(null);
  const [view, setView] = useState("prehled");
  const [cart, setCart] = useState({});
  const [hledat, setHledat] = useState("");
  const [hledatPop, setHledatPop] = useState("");
  const [strana, setStrana] = useState(1);
  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState(null);
  const [loginForm, setLoginForm] = useState({ login: "", heslo: "", err: "" });
  const [obnova, setObnova] = useState(null);
  const [aktivace, setAktivace] = useState(null);
  const [novy, setNovy] = useState(null);
  const [novyUzivatel, setNovyUzivatel] = useState(null);
  const [novaPoptavka, setNovaPoptavka] = useState(null);
  const [nabidkaForm, setNabidkaForm] = useState(null);
  const [novyPozadavek, setNovyPozadavek] = useState(null);
  const [importNahled, setImportNahled] = useState(null);   /* náhled nahraného Excelu */
  const importRef = useRef(null);
  const poptavkaRef = useRef(null);                        /* rozpracovaná poptávka dodavatelům */
  const [pozOtevreno, setPozOtevreno] = useState(true);    /* seznam nevyřízených požadavků */
  /* Na úzkém displeji se tabulky vykreslují jako karty a ke každé buňce patří název
     sloupce. Kopírujeme ho z hlavičky do atributu data-l, aby to nemuselo být ručně
     v každé z ~20 tabulek. Na desktopu se efekt hned ukončí. */
  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    if (window.innerWidth > 720) return;
    document.querySelectorAll(".card table").forEach((tb) => {
      const hlavicky = [...tb.querySelectorAll("thead th")].map((th) => (th.textContent || "").trim());
      if (!hlavicky.length) return;
      tb.querySelectorAll("tbody tr").forEach((tr) => {
        [...tr.children].forEach((td, i) => {
          const l = hlavicky[i] || "";
          if (l && td.getAttribute("data-l") !== l) td.setAttribute("data-l", l);
        });
      });
    });
  });

  const naPoptavku = () => setTimeout(() => {
    if (poptavkaRef.current && poptavkaRef.current.scrollIntoView) poptavkaRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
  const [akceptForm, setAkceptForm] = useState({});
  const [navrhOdbForm, setNavrhOdbForm] = useState({});   /* návrh odběrateli — víc kusů za jeho cenu */
  const [zavaznaPotvrz, setZavaznaPotvrz] = useState(false);
  const [pohybFiltr, setPohybFiltr] = useState("vse");   /* fronta zboží podle stavu */
  const [protiForm, setProtiForm] = useState({});
  const [vybrane, setVybrane] = useState({});
  const [mnozstviForm, setMnozstviForm] = useState({});

  const flash = (x) => { setToast(x); setTimeout(() => setToast(null), 4600); };
  const sendEmail = (to, subject, body) =>
    setEmails((e) => [{ id: Date.now() + Math.random(), to, subject, body, datum: new Date().toISOString() }, ...e]);

  const STRANKA = 8; // poptávek na stránku

  /* ================= SDÍLENÁ DATA PŘES NETLIFY (demo na více počítačích) =================
     Obchodní entity se ukládají jako jeden JSON do Netlify Blobs přes serverless funkci
     /.netlify/functions/db. Rozpracované formuláře zůstávají lokální.
     V produkci tuto vrstvu nahradí skutečná DB (Wedos PHP/MySQL nebo Node/PostgreSQL). */
  const remoteVersion = useRef(0);
  const applyingRemote = useRef(false);
  const hydrated = useRef(false);

  const gatherState = () => ({ schema: SCHEMA, products, orders, emails, users, odberatele, dodavatele, demands, pozadavky });

  const hydrateFrom = (data) => {
    if (!data || data.schema !== SCHEMA) return false;
    applyingRemote.current = true;
    if (data.products) setProducts(data.products);
    if (data.orders) setOrders(data.orders);
    if (data.emails) setEmails(data.emails);
    if (data.users) setUsers(data.users);
    if (data.odberatele) setOdberatele(data.odberatele);
    if (data.dodavatele) setDodavatele(data.dodavatele);
    if (data.demands) setDemands(data.demands);
    if (data.pozadavky) setPozadavky(data.pozadavky);
    remoteVersion.current = data.updatedAt || Date.now();
    setTimeout(() => { applyingRemote.current = false; }, 0);
    return true;
  };

  const pushState = async (statOverride) => {
    try {
      const res = await fetch("/.netlify/functions/db", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statOverride || gatherState()),
      });
      if (res.ok) { const r = await res.json(); remoteVersion.current = r.updatedAt; }
    } catch (e) { /* offline / lokální náhled bez Netlify */ }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/.netlify/functions/db");
        const data = res.ok ? await res.json() : null;
        if (!hydrateFrom(data)) await pushState();
      } catch (e) { /* běží mimo Netlify */ }
      hydrated.current = true;
    })();
  }, []);

  useEffect(() => {
    if (!hydrated.current || applyingRemote.current) return;
    const timer = setTimeout(() => { pushState(); }, 700);
    return () => clearTimeout(timer);
  }, [products, orders, emails, users, odberatele, dodavatele, demands, pozadavky]);

  useEffect(() => {
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

  const resetDemo = async () => {
    const fresh = { schema: SCHEMA, products: PRODUCTS_SEED, orders: [], emails: [], users: USERS_SEED, odberatele: ODBERATELE_SEED, dodavatele: DODAVATELE_SEED, demands: DEMANDS_SEED, pozadavky: POZADAVKY_SEED };
    setProducts(PRODUCTS_SEED); setOrders([]); setEmails([]); setUsers(USERS_SEED);
    setOdberatele(ODBERATELE_SEED); setDodavatele(DODAVATELE_SEED);
    setDemands(DEMANDS_SEED); setPozadavky(POZADAVKY_SEED); setCart({});
    await pushState(fresh);
    flash(t("Demo data byla obnovena do výchozího stavu.", "Demo data have been reset to their initial state."));
  };

  /* ---------- přihlášení / aktivace účtu ---------- */
  const doLogin = () => {
    const u = users.find((x) => x.login === loginForm.login.trim() && x.heslo === loginForm.heslo);
    if (!u) { setLoginForm((f) => ({ ...f, err: t("Nesprávné jméno nebo heslo. Pokud jste dostali potvrzovací kód, aktivujte účet níže.",
      "Incorrect username or password. If you have received a confirmation code, activate your account below.") })); return; }
    if (u.aktivni === false) { setLoginForm((f) => ({ ...f, err: t("Tento účet byl deaktivován. Kontaktujte zprostředkovatele.", "This account has been deactivated. Contact the intermediary.") })); return; }
    if (u.potvrzen === false) { setLoginForm((f) => ({ ...f, err: t("Účet zatím není potvrzen — použijte tlačítko „Mám potvrzovací kód“.", "The account is not confirmed yet — use the \u201cI have a confirmation code\u201d button.") })); return; }
    setUser(u); setView("prehled"); setLoginForm({ login: "", heslo: "", err: "" });
    ulozSession(u.login);
  };
  const logout = () => { zapomenSession(); setUser(null); setCart({}); setDetail(null); setView("prehled"); };

  /* obnovení přihlášení po refreshi — čeká, až se načtou uživatelé ze sdíleného stavu */
  const [sessionZkusena, setSessionZkusena] = useState(false);
  useEffect(() => {
    if (sessionZkusena || user || !users.length) return;
    setSessionZkusena(true);
    const login = nactiSession();
    if (!login) return;
    const u = users.find((x) => x.login === login && x.aktivni !== false && x.potvrzen !== false);
    if (u) { setUser(u); ulozSession(u.login); } else zapomenSession();
  }, [users, user, sessionZkusena]);

  /* heslo se NIKDY neposílá e-mailem — posílá se šestimístný potvrzovací kód */
  const posliKod = (u, duvod) => {
    const kod = genKod6();
    setUsers((us) => us.map((x) => (x.login === u.login ? { ...x, potvrzen: false, aktivacniKod: kod } : x)));
    if (u.email) {
      sendEmail(u.email,
        t("PORT — potvrzovací kód", "PORT — confirmation code"),
        t(`${duvod === "novy" ? "Byl vám založen účet v portálu PORT (ezdravotnici.cz)." : "Požádali jste o obnovu přístupu do portálu PORT."} Přihlašovací jméno: ${u.login}. Váš potvrzovací kód: ${kod}. Na přihlašovací stránce zvolte „Mám potvrzovací kód“, zadejte kód a nastavte si vlastní heslo. Kód nikomu nepředávejte.`,
          `${duvod === "novy" ? "An account has been created for you in the PORT portal (ezdravotnici.cz)." : "You have requested to restore access to the PORT portal."} Username: ${u.login}. Your confirmation code: ${kod}. On the sign-in page choose \u201cI have a confirmation code\u201d, enter the code and set your own password. Do not share the code with anyone.`));
    }
    return kod;
  };

  const zapomenuteHeslo = () => {
    const id = (obnova?.id || "").trim().toLowerCase();
    if (!id) { flash(t("Zadejte přihlašovací jméno nebo e-mail.", "Enter your username or e-mail.")); return; }
    const u = users.find((x) => x.login.toLowerCase() === id || (x.email || "").toLowerCase() === id);
    if (u) posliKod(u, "reset");
    setObnova(null);
    flash(t("Pokud účet existuje a má vyplněný e-mail, poslali jsme na něj potvrzovací kód.",
            "If the account exists and has an e-mail on file, we have sent a confirmation code to it."));
  };

  const aktivujUcet = () => {
    const f = aktivace || {};
    const id = (f.id || "").trim().toLowerCase();
    const u = users.find((x) => x.login.toLowerCase() === id || (x.email || "").toLowerCase() === id);
    if (!u || !u.aktivacniKod || u.aktivacniKod !== (f.kod || "").trim()) {
      setAktivace({ ...f, err: t("Neplatné přihlašovací jméno nebo kód.", "Invalid username or code.") }); return;
    }
    if ((f.heslo || "").length < 4) {
      setAktivace({ ...f, err: t("Zvolte heslo alespoň o 4 znacích.", "Choose a password of at least 4 characters.") }); return;
    }
    setUsers((us) => us.map((x) => (x.login === u.login ? { ...x, heslo: f.heslo, potvrzen: true, aktivacniKod: null } : x)));
    sendEmail(u.email || OPERATOR.email, t("PORT — účet aktivován", "PORT — account activated"),
      t(`Účet ${u.login} byl aktivován a heslo nastaveno. Pokud jste to nebyli vy, obratem kontaktujte ${OPERATOR.email}.`,
        `Account ${u.login} has been activated and the password set. If this was not you, contact ${OPERATOR.email} immediately.`));
    setAktivace(null);
    setLoginForm({ login: u.login, heslo: "", err: "" });
    flash(t("Účet byl aktivován. Nyní se přihlaste novým heslem.", "The account has been activated. Sign in with your new password."));
  };

  /* ---------- data podle role ---------- */
  const mojeProdukty = useMemo(() => {
    let list = products;
    if (user?.role === "odberatel") list = list.filter((p) => p.odbKod === user.kod || p.odbKod === "VSICHNI");
    if (hledat.trim()) {
      const q = hledat.toLowerCase();
      list = list.filter((p) => [p.nazev, p.doplnek, p.sukl, p.ean, p.sarze, p.vyrobce, p.atc].some((v) => (v || "").toLowerCase().includes(q)));
    }
    return list;
  }, [products, user, hledat]);

  const mojeObjednavky = useMemo(
    () => (user?.role === "odberatel" ? orders.filter((o) => o.odbKod === user.kod) : orders),
    [orders, user]);

  const cartItems = Object.entries(cart).filter(([, q]) => Number(q) > 0)
    .map(([id, q]) => ({ ...products.find((p) => p.id === Number(id)), mnozstvi: Number(q) })).filter((x) => x.id);
  const cartTotal = cartItems.reduce((s, i) => s + i.mnozstvi * i.cena, 0);

  const setQty = (p, val) => {
    const n = Math.max(0, Math.min(Number(val) || 0, p.ks));
    setCart((c) => ({ ...c, [p.id]: n }));
  };

  /* ---------- objednávky ---------- */
  const odeslatObjednavku = () => {
    if (!cartItems.length) return;
    const cislo = "PORT-2026-" + String(orders.length + 1).padStart(3, "0");
    const o = {
      cislo, datum: new Date().toISOString(), odbKod: user.kod,
      odberatel: odberatele[user.kod], items: cartItems, celkem: cartTotal, stav: "nova",
    };
    setOrders((os) => [o, ...os]);
    setProducts((ps) => ps.map((p) => { const i = cartItems.find((x) => x.id === p.id); return i ? { ...p, ks: p.ks - i.mnozstvi } : p; }));
    setCart({});
    setZavaznaPotvrz(false);
    sendEmail(user.email || odberatele[user.kod].email, t(`Potvrzení závazné objednávky ${cislo}`, `Binding order confirmation ${cislo}`),
      t(`Přijali jsme vaši závaznou objednávku ${cislo} v hodnotě ${fmtCZK(cartTotal)} bez DPH. O potvrzení a expedici vás budeme informovat. Objednávku lze zrušit pouze do jejího potvrzení.`,
        `We have received your binding order ${cislo} for ${fmtCZK(cartTotal)} excl. VAT. We will inform you about confirmation and dispatch. The order can only be cancelled until it is confirmed.`));
    setView("historie");
    flash(t(`Objednávka ${cislo} byla odeslána.`, `Order ${cislo} has been submitted.`));
  };

  const zmenStav = (o, stav) => {
    setOrders((os) => os.map((x) => (x.cislo === o.cislo ? { ...x, stav } : x)));
    const komu = (users.find((u) => u.kod === o.odbKod) || {}).email || o.odberatel.email;
    sendEmail(komu, t(`Objednávka ${o.cislo} — ${STAV_LABEL[stav]}`, `Order ${o.cislo} — ${STAV_LABEL[stav]}`),
      stav === "potvrzena"
        ? t(`Vaše objednávka ${o.cislo} byla potvrzena. Svoz probíhá v úterý a ve čtvrtek.`, `Your order ${o.cislo} has been confirmed. Collection takes place on Tuesdays and Thursdays.`)
        : t(`Vaše objednávka ${o.cislo} byla expedována. Dodací list najdete v portálu.`, `Your order ${o.cislo} has been dispatched. The delivery note is available in the portal.`));
    flash(t(`Objednávka ${o.cislo}: ${STAV_LABEL[stav]}.`, `Order ${o.cislo}: ${STAV_LABEL[stav]}.`));
  };

  const objednatZnovu = (o) => {
    const i = o.items[0] || {};
    setNovyPozadavek({ nazev: i.nazev || "", doplnek: i.doplnek || "", sukl: i.sukl || "", mnozstvi: i.mnozstvi || "",
      maxCena: i.cena || "", sarze: "", minExpMesice: 6, minExp: "", pozn: "" });
    setZavaznaPotvrz(false);
    setView("pozadavky");
    flash(t("Položka z minulé objednávky byla předvyplněna — zkontrolujte množství a cenu a objednávku odešlete.",
            "The item from your previous order has been pre-filled — check the quantity and price, then submit the order."));
  };

  /* ---------- poptávky (RFQ) — jedna poptávka může obsahovat více položek ---------- */
  const dodavateleKody = () => Object.keys(dodavatele);
  const adresatiPoptavky = (d) => ((d.prijemci || []).length ? d.prijemci : dodavateleKody());
  const emailKodu = (kod) => (users.find((u) => u.kod === kod) || {}).email
    || (dodavatele[kod] || {}).email || (odberatele[kod] || {}).email || "";

  const prazdnaPolozka = (i) => ({ id: i, sukl: "", nazev: "", doplnek: "", mnozstvi: "", maxProdejni: "", cena: "", pozadovanaSarze: "", zdroje: [] });

  const vytvorPoptavku = () => {
    const f = novaPoptavka;
    const polozky = (f.polozky || []).filter((p) => p.nazev && Number(p.mnozstvi) > 0 && Number(p.cena) > 0);
    if (!polozky.length) { flash(t("Vyplňte u položky název, množství a požadovanou cenu.", "Fill in the item name, quantity and target price.")); return; }
    const cislo = "POP-2026-" + String(demands.length + 1).padStart(3, "0");
    const d = {
      cislo, datum: new Date().toISOString(), provize: Number(f.provize) || 0,
      minExpMesice: Number(f.minExpMesice) || null, minExp: f.minExp || "",
      prijemci: f.prijemci || [], stav: "otevrena",
      polozky: polozky.map((p, i) => ({
        id: i + 1, sukl: p.sukl || "", nazev: p.nazev, doplnek: p.doplnek || "",
        mnozstvi: Number(p.mnozstvi), cena: r2(p.cena), maxProdejni: Number(p.maxProdejni) || null,
        pozadovanaSarze: p.pozadovanaSarze || "", minKsSarze: Number(p.minKsSarze) || null, zdroje: p.zdroje || [], nabidky: [],
      })),
    };
    setDemands((ds) => [d, ...ds]);
    const soupis = d.polozky.map((p) => `${p.nazev}${p.doplnek ? " " + p.doplnek : ""} — ${p.mnozstvi} ks à ${fmtCZK(p.cena)}`).join("; ");
    const soupisEn = d.polozky.map((p) => `${p.nazev}${p.doplnek ? " " + p.doplnek : ""} — ${p.mnozstvi} pcs at ${fmtCZK(p.cena)}`).join("; ");
    adresatiPoptavky(d).forEach((k) => {
      const em = emailKodu(k);
      if (em) sendEmail(em, t(`Nová poptávka ${cislo} (${d.polozky.length} pol.)`, `New RFQ ${cislo} (${d.polozky.length} items)`),
        t(`Poptáváme: ${soupis}. Ceny jsou bez DPH${minExpText(d) ? `, minimální expirace ${minExpText(d)}` : ""}. Nabídku podejte v portálu PORT.`,
          `We are requesting: ${soupisEn}. Prices excl. VAT${minExpText(d) ? `, minimum shelf life ${minExpText(d)}` : ""}. Submit your offer in the PORT portal.`));
    });
    const zdrojovaCisla = d.polozky.flatMap((p) => (p.zdroje || []).map((z) => z.pozCislo)).filter(Boolean);
    if (zdrojovaCisla.length) setPozadavky((ps) => ps.map((p) => (zdrojovaCisla.includes(p.cislo) ? { ...p, stav: "vreseni" } : p)));
    setNovaPoptavka(null);
    setPozOtevreno(true);
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
    flash(t(`Poptávka ${cislo} (${d.polozky.length} položek) byla odeslána ${(d.prijemci || []).length ? `${d.prijemci.length} vybraným dodavatelům` : "všem dodavatelům"} — anonymně.`,
            `RFQ ${cislo} (${d.polozky.length} items) has been sent ${(d.prijemci || []).length ? `to ${d.prijemci.length} selected suppliers` : "to all suppliers"} — anonymously.`));
  };

  const zmenMnozstvi = (d, it) => {
    const key = d.cislo + "-" + it.id;
    const nove = Number(mnozstviForm[key]);
    if (!nove || nove === it.mnozstvi) { setMnozstviForm({ ...mnozstviForm, [key]: undefined }); return; }
    setDemands((ds) => ds.map((x) => (x.cislo === d.cislo
      ? { ...x, polozky: x.polozky.map((p) => (p.id === it.id ? { ...p, mnozstvi: nove } : p)) } : x)));
    adresatiPoptavky(d).forEach((k) => {
      const em = emailKodu(k);
      if (em) sendEmail(em, t(`Aktualizace poptávky ${d.cislo}`, `RFQ ${d.cislo} updated`),
        t(`Poptávané množství u položky ${it.nazev}${it.doplnek ? " " + it.doplnek : ""} bylo změněno z ${it.mnozstvi} na ${nove} ks. Pokud jste již podali nabídku, upravte ji prosím v portálu.`,
          `The requested quantity for ${it.nazev}${it.doplnek ? " " + it.doplnek : ""} has changed from ${it.mnozstvi} to ${nove} pcs. If you have already submitted an offer, please update it in the portal.`));
    });
    setMnozstviForm({ ...mnozstviForm, [key]: undefined });
    flash(t(`Množství změněno na ${nove} ks, aktualizace odeslána adresátům poptávky.`, `Quantity changed to ${nove} pcs, an update has been sent to the RFQ recipients.`));
  };

  const uzavriPoptavku = (cislo) => setDemands((ds) => ds.map((d) => (d.cislo === cislo ? { ...d, stav: "uzavrena" } : d)));

  /* ---------- nabídky dodavatele (k jednotlivé položce poptávky) ---------- */
  const podatNabidku = () => {
    const f = nabidkaForm;
    if (!Number(f.cena) || !Number(f.mnozstvi)) { flash(t("Vyplňte cenu a množství.", "Fill in the price and quantity.")); return; }
    const d = demands.find((x) => x.cislo === f.demandCislo);
    const it = d.polozky.find((p) => p.id === f.polozkaId);
    const n = {
      id: Date.now(), dodKod: user.kod, cena: r2(f.cena), mnozstvi: Number(f.mnozstvi),
      moq: Number(f.moq) > 0 ? Number(f.moq) : null, akceptovano: 0,
      sarze: f.sarze || "", expirace: f.expirace || "", stav: "podana", datum: new Date().toISOString(),
    };
    setDemands((ds) => ds.map((x) => (x.cislo === f.demandCislo
      ? { ...x, polozky: x.polozky.map((p) => (p.id === f.polozkaId ? { ...p, nabidky: [...p.nabidky, n] } : p)) } : x)));
    sendEmail(OPERATOR.email, t(`Nová nabídka k poptávce ${d.cislo}`, `New offer for RFQ ${d.cislo}`),
      t(`Dodavatel ${user.kod} nabízí k položce ${it.nazev}${it.doplnek ? " " + it.doplnek : ""}: ${n.mnozstvi} ks à ${fmtCZK(n.cena)}${n.moq ? `, min. odběr ${n.moq} ks` : ""}${n.sarze ? `, šarže ${n.sarze}` : ""}${n.expirace ? `, exp. ${fmtDate(n.expirace)}` : ""}.`,
        `Supplier ${user.kod} offers for ${it.nazev}${it.doplnek ? " " + it.doplnek : ""}: ${n.mnozstvi} pcs at ${fmtCZK(n.cena)}${n.moq ? `, MOQ ${n.moq} pcs` : ""}${n.sarze ? `, batch ${n.sarze}` : ""}${n.expirace ? `, exp. ${fmtDate(n.expirace)}` : ""}.`));
    setNabidkaForm(null);
    flash(t("Nabídka byla odeslána zprostředkovateli.", "Your offer has been sent to the intermediary."));
  };

  /* ---------- akceptace nabídky (částečná, více dodavatelů na jednu položku) ---------- */
  const akceptujNabidku = (d, it, n) => {
    const key = d.cislo + "-" + it.id + "-" + n.id;
    const af = akceptForm[key] || {};
    const zbyvaVNabidce = n.mnozstvi - (n.akceptovano || 0);
    const zbyvaPokryt = Math.max(0, it.mnozstvi - pokryto(it));
    const strop = Math.min(zbyvaVNabidce, zbyvaPokryt);
    const ks = Math.min(Number(af.ks) || strop, zbyvaVNabidce);
    if (ks <= 0) { flash(t("Zadejte počet kusů k akceptaci.", "Enter the number of pieces to accept.")); return; }

    /* ZÁSADA: nikdy nekupovat víc, než kolik je závazně objednáno odběrateli.
       Přebytek by zůstal na skladě za peníze zprostředkovatele. */
    if (ks > zbyvaPokryt) {
      flash(t(`Nelze akceptovat ${ks} ks — nepokrytý závazek odběratelů je ${zbyvaPokryt} ks. Chcete-li koupit víc, nabídněte nejdřív větší množství odběrateli.`,
              `Cannot accept ${ks} pcs — the uncovered buyer commitment is ${zbyvaPokryt} pcs. To buy more, first offer the larger quantity to the buyer.`));
      return;
    }
    if (n.moq && n.moq > zbyvaPokryt) {
      flash(t(`Min. odběr dodavatele je ${n.moq} ks, ale závazně objednáno je jen ${zbyvaPokryt} ks. Nabídněte odběrateli větší množství, nebo pošlete dodavateli návrh na nižší minimum.`,
              `The supplier's MOQ is ${n.moq} pcs but only ${zbyvaPokryt} pcs are firmly ordered. Offer the buyer a larger quantity, or send the supplier a proposal with a lower minimum.`));
      return;
    }

    /* CENOVÁ LOGIKA: odběrateli se nabízí jeho MAX cena, nikdy nižší.
       Ruční zásah zprostředkovatele má přednost; sklad bez limitu = nákup + provize. */
    const prodej = r2(Number(af.prodej) || it.maxProdejni || n.cena * (1 + (d.provize || 5) / 100));

    /* rozdělení mezi sloučené odběratele — přeskočí už rozdělené množství */
    const zacatek = pokryto(it);
    const konec = zacatek + ks;
    const alokace = [];
    let cur = 0;
    (it.zdroje || []).forEach((z) => {
      const zStart = cur, zEnd = cur + z.mnozstvi; cur = zEnd;
      const od = Math.max(zStart, zacatek), doo = Math.min(zEnd, konec);
      if (doo > od) alokace.push({ ...z, ks: doo - od, hotovo: zEnd <= konec });
    });
    const rozdeleno = alokace.reduce((s, a) => s + a.ks, 0);
    if (rozdeleno < ks) { flash(t("Množství nelze rozdělit mezi objednávky odběratelů.", "The quantity cannot be allocated to buyer orders.")); return; }

    /* každá akceptace = samostatný skladový řádek (vlastní nákup, šarže, expirace) */
    let pid = Math.max(0, ...products.map((p) => p.id));
    const info = suklInfo(it.sukl);
    const noveRadky = alokace.map((a) => ({
      id: ++pid, sukl: it.sukl, nazev: it.nazev, doplnek: it.doplnek || (info ? info.doplnek : ""),
      atc: "", vyrobce: "", ean: "",
      sarze: n.sarze || "", expirace: n.expirace || "", ks: a.ks,
      nakupCena: n.cena, cena: r2(a.maxCena || prodej), dodKod: n.dodKod, odbKod: a.odbKod,
      stavPohyb: "objednano", datumObjednano: new Date().toISOString(), datumPrijem: "", datumExpedice: "",
    }));
    setProducts((ps) => [...noveRadky, ...ps]);

    const noveAkceptovano = (n.akceptovano || 0) + ks;
    setDemands((ds) => ds.map((x) => {
      if (x.cislo !== d.cislo) return x;
      const polozky = x.polozky.map((p) => (p.id !== it.id ? p : {
        ...p, nabidky: p.nabidky.map((y) => (y.id === n.id
          ? { ...y, akceptovano: noveAkceptovano, stav: noveAkceptovano >= y.mnozstvi ? "akceptovana" : "castecne" }
          : y)),
      }));
      const vse = polozky.every((p) => pokryto(p) >= p.mnozstvi);
      return { ...x, polozky, stav: vse ? "uzavrena" : x.stav };
    }));

    /* požadavky odběratelů, které se tímto plně pokryly */
    const hotove = alokace.filter((a) => a.hotovo && a.pozCislo).map((a) => a.pozCislo);
    if (hotove.length) setPozadavky((ps) => ps.map((p) => (hotove.includes(p.cislo) ? { ...p, stav: "vyrizena" } : p)));

    /* e-mail dodavateli — se SKUTEČNĚ akceptovaným množstvím */
    const podMOQ = n.moq && ks < n.moq;
    const emDod = emailKodu(n.dodKod);
    if (emDod) sendEmail(emDod, t(`Nabídka k ${d.cislo} akceptována`, `Offer for ${d.cislo} accepted`),
      t(`Akceptujeme ${ks} ks — ${it.nazev}${it.doplnek ? " " + it.doplnek : ""} à ${fmtCZK(n.cena)} bez DPH${n.sarze ? `, šarže ${n.sarze}` : ""}${n.expirace ? `, exp. ${fmtDate(n.expirace)}` : ""}. Připravte prosím zboží ke svozu (út/čt).${podMOQ ? ` Upozornění: akceptované množství je pod vaším min. odběrem (${n.moq} ks) — potvrďte prosím platnost ceny.` : ""}`,
        `We accept ${ks} pcs — ${it.nazev}${it.doplnek ? " " + it.doplnek : ""} at ${fmtCZK(n.cena)} excl. VAT${n.sarze ? `, batch ${n.sarze}` : ""}${n.expirace ? `, exp. ${fmtDate(n.expirace)}` : ""}. Please prepare the goods for collection (Tue/Thu).${podMOQ ? ` Note: the accepted quantity is below your MOQ (${n.moq} pcs) — please confirm the price remains valid.` : ""}`));

    /* e-mail každému odběrateli — jen o jeho přídělu, nikdy o ostatních */
    alokace.filter((a) => !a.sklad).forEach((a) => {
      const em = emailKodu(a.odbKod);
      const cenaProOdb = r2(a.maxCena || prodej);
      if (em) sendEmail(em, t(`Vaše poptávka ${a.pozCislo || ""} — vyřízeno`, `Your request ${a.pozCislo || ""} — fulfilled`),
        t(`Zajistili jsme ${a.ks} ks — ${it.nazev}${it.doplnek ? " " + it.doplnek : ""}. Cena ${fmtCZK(cenaProOdb)}/ks bez DPH${a.maxCena && cenaProOdb > a.maxCena ? " — POZOR: nad vámi uvedený limit, objednáním ceny potvrdíte" : ""}. Položka je k dispozici ve vaší objednávce.`,
          `We have secured ${a.ks} pcs — ${it.nazev}${it.doplnek ? " " + it.doplnek : ""}. Price ${fmtCZK(cenaProOdb)}/pc excl. VAT${a.maxCena && cenaProOdb > a.maxCena ? " — NOTE: above your stated limit; placing the order confirms the price" : ""}. The item is available in your order form.`));
    });

    setAkceptForm({ ...akceptForm, [key]: {} });
    flash(t(`Akceptováno ${ks} ks od ${n.dodKod}, naskladněno za prodejní cenu ${fmtCZK(prodej)}${podMOQ ? " — pod MOQ dodavatele" : ""}.`,
            `Accepted ${ks} pcs from ${n.dodKod}, stocked at a selling price of ${fmtCZK(prodej)}${podMOQ ? " — below the supplier's MOQ" : ""}.`));
  };

  /* posun zboží o krok dál — přijetí od dodavatele, expedice odběrateli */
  const posunPohyb = (p, novy) => {
    const ted = new Date().toISOString();
    setProducts((ps) => ps.map((x) => (x.id !== p.id ? x : {
      ...x, stavPohyb: novy,
      datumPrijem: novy === "prijato" ? ted : x.datumPrijem,
      datumExpedice: novy === "expedovano" ? ted : x.datumExpedice,
    })));
    if (novy === "expedovano" && p.odbKod && p.odbKod !== "VSICHNI") {
      /* expedicí vzniká objednávka s dodacím listem — dřív ji zakládal odběratel z katalogu */
      const cislo = "PORT-2026-" + String(orders.length + 1).padStart(3, "0");
      const polozka = { ...p, mnozstvi: p.ks };
      setOrders((os) => [{
        cislo, datum: ted, odbKod: p.odbKod, odberatel: odberatele[p.odbKod] || {},
        items: [polozka], celkem: r2(p.ks * p.cena), stav: "expedovana",
      }, ...os]);
      const em = emailKodu(p.odbKod);
      if (em) sendEmail(em, t(`Expedujeme ${cislo} — ${p.nazev}`, `Dispatching ${cislo} — ${p.nazev}`),
        t(`${p.ks} ks ${p.nazev}${p.doplnek ? " " + p.doplnek : ""} (šarže ${p.sarze || "—"}, exp. ${fmtDate(p.expirace)}) odchází k vám. Dodací list najdete v portálu.`,
          `${p.ks} pcs of ${p.nazev}${p.doplnek ? " " + p.doplnek : ""} (batch ${p.sarze || "—"}, exp. ${fmtDate(p.expirace)}) is on its way to you. The delivery note is available in the portal.`));
    }
    flash(t(`${p.nazev}: ${POHYB_LABEL[novy].cs}.`, `${p.nazev}: ${POHYB_LABEL[novy].en}.`));
  };

  const upravNabidku = (d, it, nId, zmena) =>
    setDemands((ds) => ds.map((x) => (x.cislo !== d.cislo ? x : {
      ...x, polozky: x.polozky.map((p) => (p.id !== it.id ? p : { ...p, nabidky: p.nabidky.map((y) => (y.id === nId ? { ...y, ...zmena } : y)) })),
    })));

  const odmitniNabidku = (d, it, n) => {
    upravNabidku(d, it, n.id, { stav: "odmitnuta" });
    const em = emailKodu(n.dodKod);
    if (em) sendEmail(em, t(`Nabídka k ${d.cislo} — nevyužita`, `Offer for ${d.cislo} — not used`),
      t("Děkujeme za nabídku, tentokrát jsme ji nevyužili.", "Thank you for your offer; we have not used it this time."));
    flash(t("Nabídka byla odmítnuta.", "The offer has been rejected."));
  };

  /* ---------- návrh dodavateli (až 3 množstevní hladiny, vlastní platnost) ---------- */
  const poslatProtinavrh = (d, it, n) => {
    const key = d.cislo + "-" + it.id + "-" + n.id;
    const pf = protiForm[key] || {};
    const hladiny = platneHladiny(pf.h);
    if (!hladiny.length) { flash(t("Vyplňte alespoň jednu hladinu — množství a cenu.", "Fill in at least one tier — quantity and price.")); return; }
    if (!pf.platnost) { flash(t("Zadejte, do kdy návrh platí.", "Enter the proposal's validity date.")); return; }
    const nv = { hladiny, platnost: pf.platnost, pozn: pf.pozn || "", datum: new Date().toISOString(), kolo: ((n.jednani || []).length + 1) };
    upravNabidku(d, it, n.id, {
      stav: "protinavrh", proti: nv,
      jednani: [...(n.jednani || []), { kdo: "adm", hladiny, platnost: pf.platnost, pozn: pf.pozn || "", datum: nv.datum }],
    });
    const em = emailKodu(n.dodKod);
    if (em) sendEmail(em, t(`Návrh k poptávce ${d.cislo}`, `Proposal for RFQ ${d.cislo}`),
      t(`K položce ${it.nazev}${it.doplnek ? " " + it.doplnek : ""} navrhujeme: ${hladinyText(hladiny)} bez DPH. Vyberte prosím jednu z hladin v portálu, platnost do ${fmtDate(pf.platnost)}.${pf.pozn ? ` Poznámka: ${pf.pozn}` : ""}`,
        `For ${it.nazev}${it.doplnek ? " " + it.doplnek : ""} we propose: ${hladinyText(hladiny)} excl. VAT. Please pick one tier in the portal, valid until ${fmtDate(pf.platnost)}.${pf.pozn ? ` Note: ${pf.pozn}` : ""}`));
    setProtiForm({ ...protiForm, [key]: { open: false } });
    flash(t(`Návrh byl odeslán dodavateli — ${hladiny.length} ${hladiny.length === 1 ? "hladina" : "hladiny"}.`,
            `The proposal has been sent to the supplier — ${hladiny.length} tier(s).`));
  };

  /* dodavatel si vybere jednu hladinu */
  const prijmiProtinavrh = (d, it, n, idx) => {
    const h = ((n.proti || {}).hladiny || [])[idx || 0];
    if (!h) return;
    if (navrhPropadl(n.proti)) { flash(t("Platnost návrhu už vypršela.", "The proposal has expired.")); return; }
    upravNabidku(d, it, n.id, {
      cena: h.cena, mnozstvi: h.ks, stav: "podana", upravena: true, proti: null,
      jednani: [...(n.jednani || []), { kdo: "dod", prijato: h, datum: new Date().toISOString() }],
    });
    sendEmail(OPERATOR.email, t(`Návrh k ${d.cislo} přijat`, `Proposal for ${d.cislo} accepted`),
      t(`Dodavatel ${user.kod} přijal hladinu ${h.ks} ks à ${fmtCZK(h.cena)} — nabídka je připravena k akceptaci.`,
        `Supplier ${user.kod} accepted the tier ${h.ks} pcs at ${fmtCZK(h.cena)} — the offer is ready to accept.`));
    flash(t(`Přijali jste ${h.ks} ks à ${fmtCZK(h.cena)}.`, `You accepted ${h.ks} pcs at ${fmtCZK(h.cena)}.`));
  };

  const odmitniProtinavrh = (d, it, n) => {
    upravNabidku(d, it, n.id, {
      stav: "odmitnuta", proti: null,
      jednani: [...(n.jednani || []), { kdo: "dod", odmitnuto: true, datum: new Date().toISOString() }],
    });
    sendEmail(OPERATOR.email, t(`Návrh k ${d.cislo} odmítnut`, `Proposal for ${d.cislo} declined`),
      t(`Dodavatel ${user.kod} návrh odmítl a nabídku stáhl.`, `Supplier ${user.kod} declined the proposal and withdrew the offer.`));
    flash(t("Návrh jste odmítli, nabídka byla stažena.", "You declined the proposal; the offer has been withdrawn."));
  };

  /* ---------- návrh odběrateli (nabídka většího množství za jeho cenu) ---------- */
  const poslatNavrhOdb = (d, it) => {
    const mkey = d.cislo + "-" + it.id;
    const f = navrhOdbForm[mkey] || {};
    const zdroj = (it.zdroje || []).find((z) => z.odbKod === f.odbKod) || (it.zdroje || [])[0];
    if (!zdroj) { flash(t("K položce není přiřazen žádný odběratel.", "No buyer is linked to this item.")); return; }
    const navic = Math.round(Number(f.navic) || 0);
    const cena = r2(Number(f.cena) || Number(zdroj.maxCena) || 0);
    if (navic <= 0) { flash(t("Zadejte, o kolik kusů víc nabízíte.", "Enter how many extra pieces you are offering.")); return; }
    if (cena <= 0) { flash(t("Zadejte cenu za kus.", "Enter the price per piece.")); return; }
    if (!f.platnost) { flash(t("Zadejte, do kdy nabídka platí.", "Enter the offer's validity date.")); return; }
    const hladiny = [{ ks: (Number(zdroj.mnozstvi) || 0) + navic, cena }];
    const nv = { odbKod: zdroj.odbKod, pozCislo: zdroj.pozCislo || "", hladiny, platnost: f.platnost, pozn: f.pozn || "", stav: "odeslan", datum: new Date().toISOString() };
    setDemands((ds) => ds.map((x) => (x.cislo !== d.cislo ? x : {
      ...x, polozky: x.polozky.map((y) => (y.id !== it.id ? y : { ...y, navrhOdb: nv, jednaniOdb: [...(y.jednaniOdb || []), { kdo: "adm", hladiny, platnost: f.platnost, datum: nv.datum }] })),
    })));
    const em = emailKodu(zdroj.odbKod);
    if (em) sendEmail(em, t(`Nabídka většího množství — ${it.nazev}`, `Offer of a larger quantity — ${it.nazev}`),
      t(`K vaší objednávce ${zdroj.pozCislo || ""} (${it.nazev}${it.doplnek ? " " + it.doplnek : ""}) můžeme nabídnout: ${hladinyText(hladiny)} bez DPH. Platnost do ${fmtDate(f.platnost)}. Přijetím se objednané množství navýší.${f.pozn ? ` ${f.pozn}` : ""}`,
        `For your order ${zdroj.pozCislo || ""} (${it.nazev}${it.doplnek ? " " + it.doplnek : ""}) we can offer: ${hladinyText(hladiny)} excl. VAT. Valid until ${fmtDate(f.platnost)}. Accepting increases the ordered quantity.${f.pozn ? ` ${f.pozn}` : ""}`));
    setNavrhOdbForm({ ...navrhOdbForm, [mkey]: { open: false } });
    const uprava = it.navrhOdb && it.navrhOdb.stav === "odeslan";
    flash(uprava
      ? t(`Nabídka pro ${zdroj.odbKod} byla upravena a odeslána znovu.`, `The offer for ${zdroj.odbKod} has been amended and resent.`)
      : t(`Nabídka byla odeslána odběrateli ${zdroj.odbKod}.`, `The offer has been sent to buyer ${zdroj.odbKod}.`));
  };

  /* odběratel přijme jednu hladinu → navýší se jeho objednávka i požadované množství v poptávce */
  const prijmiNavrhOdb = (d, it, idx) => {
    const nv = it.navrhOdb; const h = ((nv || {}).hladiny || [])[idx];
    if (!nv || !h) return;
    if (navrhPropadl(nv)) { flash(t("Platnost nabídky už vypršela.", "The offer has expired.")); return; }
    const zdroj = (it.zdroje || []).find((z) => z.odbKod === nv.odbKod) || {};
    const puvodni = Number(zdroj.mnozstvi) || 0;
    const rozdil = h.ks - puvodni;
    setDemands((ds) => ds.map((x) => (x.cislo !== d.cislo ? x : {
      ...x, stav: "otevrena",
      polozky: x.polozky.map((y) => (y.id !== it.id ? y : {
        ...y, mnozstvi: Number(y.mnozstvi) + rozdil,
        maxProdejni: Math.min(...[...(y.zdroje || []).filter((z) => z.odbKod !== nv.odbKod).map((z) => Number(z.maxCena) || Infinity), h.cena]),
        zdroje: (y.zdroje || []).map((z) => (z.odbKod !== nv.odbKod ? z : { ...z, mnozstvi: h.ks, maxCena: h.cena })),
        navrhOdb: { ...nv, stav: "prijat", prijata: h },
        jednaniOdb: [...(y.jednaniOdb || []), { kdo: "odb", prijato: h, datum: new Date().toISOString() }],
      })),
    })));
    if (nv.pozCislo) setPozadavky((ps) => ps.map((x) => (x.cislo !== nv.pozCislo ? x : { ...x, mnozstvi: h.ks, maxCena: h.cena })));
    sendEmail(OPERATOR.email, t(`Navýšení objednávky ${nv.pozCislo || ""} přijato`, `Order increase ${nv.pozCislo || ""} accepted`),
      t(`Odběratel ${nv.odbKod} přijal ${h.ks} ks à ${fmtCZK(h.cena)} u položky ${it.nazev}. Závazek je nyní ${h.ks} ks.`,
        `Buyer ${nv.odbKod} accepted ${h.ks} pcs at ${fmtCZK(h.cena)} for ${it.nazev}. The commitment is now ${h.ks} pcs.`));
    flash(t(`Objednávka navýšena na ${h.ks} ks à ${fmtCZK(h.cena)}. Je to závazné.`, `Order increased to ${h.ks} pcs at ${fmtCZK(h.cena)}. This is binding.`));
  };

  /* dokud odběratel nerozhodl, může zprostředkovatel nabídku upravit nebo stáhnout */
  const stahniNavrhOdb = (d, it) => {
    setDemands((ds) => ds.map((x) => (x.cislo !== d.cislo ? x : {
      ...x, polozky: x.polozky.map((y) => (y.id !== it.id ? y : { ...y, navrhOdb: null })),
    })));
    const em = emailKodu((it.navrhOdb || {}).odbKod);
    if (em) sendEmail(em, t(`Nabídka většího množství — staženo`, `Offer of a larger quantity — withdrawn`),
      t(`Nabídku k položce ${it.nazev} jsme stáhli. Vaše objednávka zůstává v původním množství.`,
        `We have withdrawn the offer for ${it.nazev}. Your order remains in its original quantity.`));
    flash(t("Nabídka byla stažena.", "The offer has been withdrawn."));
  };

  const odmitniNavrhOdb = (d, it) => {
    setDemands((ds) => ds.map((x) => (x.cislo !== d.cislo ? x : {
      ...x, polozky: x.polozky.map((y) => (y.id !== it.id ? y : {
        ...y, navrhOdb: { ...y.navrhOdb, stav: "odmitnut" },
        jednaniOdb: [...(y.jednaniOdb || []), { kdo: "odb", odmitnuto: true, datum: new Date().toISOString() }],
      })),
    })));
    sendEmail(OPERATOR.email, t("Nabídka většího množství odmítnuta", "Offer of a larger quantity declined"),
      t(`Odběratel ${(it.navrhOdb || {}).odbKod} zůstává u původního množství.`, `Buyer ${(it.navrhOdb || {}).odbKod} keeps the original quantity.`));
    flash(t("Zůstáváte u původního množství.", "You keep the original quantity."));
  };

  /* ---------- požadavky odběratele ---------- */
  const odesliPozadavek = () => {
    const f = novyPozadavek;
    if (!f.nazev || !Number(f.mnozstvi)) { flash(t("Vyplňte název položky a množství.", "Fill in the item name and quantity.")); return; }
    if (!zavaznaPotvrz) { flash(t("Potvrďte prosím, že podáváte závaznou objednávku.", "Please confirm that you are placing a binding order.")); return; }
    setZavaznaPotvrz(false);
    const cislo = "POZ-2026-" + String(pozadavky.length + 1).padStart(3, "0");
    const p = {
      cislo, odbKod: user.kod, nazev: f.nazev, doplnek: f.doplnek || "", sukl: f.sukl || "",
      mnozstvi: Number(f.mnozstvi), maxCena: Number(f.maxCena) || null, sarze: f.sarze || "",
      minExpMesice: Number(f.minExpMesice) || null, minExp: f.minExp || "",
      pozn: f.pozn || "", datum: new Date().toISOString(), stav: "prijata",
    };
    setPozadavky((ps) => [p, ...ps]);
    sendEmail(OPERATOR.email, t(`Nový požadavek ${cislo}`, `New request ${cislo}`),
      t(`Odběratel ${user.kod} poptává ${p.mnozstvi} ks — ${p.nazev}${p.doplnek ? " " + p.doplnek : ""}${p.maxCena ? `, max. ${fmtCZK(p.maxCena)}/ks` : ""}.`,
        `Buyer ${user.kod} requests ${p.mnozstvi} pcs — ${p.nazev}${p.doplnek ? " " + p.doplnek : ""}${p.maxCena ? `, max. ${fmtCZK(p.maxCena)}/pc` : ""}.`));
    sendEmail(user.email || odberatele[user.kod].email, t(`Přijali jsme vaši poptávku ${cislo}`, `We received your request ${cislo}`),
      t("Poptávku zpracujeme a o výsledku vás budeme informovat e-mailem.", "We will process the request and inform you of the outcome by e-mail."));
    setNovyPozadavek(null);
    flash(t(`Poptávka ${cislo} byla odeslána.`, `Request ${cislo} has been sent.`));
  };


  /* ---------- hromadná poptávka z Excelu ---------- */
  const nactiExcel = async (file) => {
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { flash(t("Soubor je větší než 3 MB.", "The file is larger than 3 MB.")); return; }
    try {
      let aoa = null;
      const X = typeof window !== "undefined" ? window.XLSX : null;
      if (X && !/\.csv$/i.test(file.name)) {
        const wb = X.read(await file.arrayBuffer(), { cellDates: true });
        const jmeno = wb.SheetNames.find((n) => normHlav(n).includes("POPTAVKA") || normHlav(n).includes("RFQ")) || wb.SheetNames[0];
        aoa = X.utils.sheet_to_json(wb.Sheets[jmeno], { header: 1, blankrows: false, raw: true });
      } else if (/\.csv$/i.test(file.name)) {
        aoa = csvNaAoa(await file.text());
      } else {
        flash(t("Knihovnu pro čtení XLSX se nepodařilo načíst. Uložte soubor jako CSV a zkuste to znovu.",
                "The XLSX reader could not be loaded. Save the file as CSV and try again."));
        return;
      }
      const zaklad = radkyZTabulky(aoa);
      if (!zaklad) {
        flash(t("V souboru jsme nenašli hlavičku tabulky. Použijte prosím vzorový soubor — potřebujeme aspoň sloupce PRODUKT (nebo SÚKL) a MNOŽSTVÍ.",
                "No table header found. Please use the template — we need at least the PRODUCT (or SUKL) and QUANTITY columns."));
        return;
      }
      if (!zaklad.length) { flash(t("Soubor neobsahuje žádné vyplněné řádky.", "The file contains no filled-in rows.")); return; }
      setNovyPozadavek(null);
      setImportNahled({ soubor: file.name, radky: zaklad.map((r) => zkontrolujRadek(obohatRadek(r))) });
      flash(t(`Načteno ${zaklad.length} řádků ze souboru ${file.name}. Zkontrolujte náhled a poptávku odešlete.`,
              `${zaklad.length} rows loaded from ${file.name}. Check the preview and submit the request.`));
    } catch (e) {
      flash(t("Soubor se nepodařilo přečíst: ", "The file could not be read: ") + (e && e.message ? e.message : e));
    }
  };

  const upravImport = (idx, pole, hodnota) => setImportNahled((s) => ({
    ...s,
    radky: s.radky.map((r, i) => {
      if (i !== idx) return r;
      if (pole === "produkt") {
        /* jedno pole „Produkt“ = název i balení; rozdělíme podle číselníku */
        const p = rozdelProdukt(hodnota);
        const zaklad = p && p.kod ? { sukl: p.kod, nazev: p.nazev, doplnek: p.doplnek }
                                  : { sukl: "", nazev: String(hodnota || "").trim(), doplnek: "" };
        return zkontrolujRadek({ ...r, ...zaklad, produkt: hodnota, varovani: [] });
      }
      if (pole === "sukl") {
        const c = suklInfo(suklZBunky(hodnota));
        const r2 = c ? { ...r, sukl: c.kod, nazev: c.nazev, doplnek: c.doplnek, produkt: c.nazev + " " + c.doplnek, varovani: [] }
                     : { ...r, sukl: hodnota };
        return zkontrolujRadek(r2);
      }
      return zkontrolujRadek({ ...r, [pole]: hodnota });
    }),
  }));
  const odeberImport = (idx) => setImportNahled((s) => ({ ...s, radky: s.radky.filter((_, i) => i !== idx) }));

  /* z náhledu vznikne dávka požadavků (jedno číslo DAV-…), kterou zprostředkovatel
     vybere jedním klikem a přepošle dodavatelům jako jednu vícepoložkovou poptávku */
  const odesliImport = () => {
    const platne = (importNahled.radky || []).filter((r) => !zkontrolujRadek(r).chyby.length);
    if (!platne.length) { flash(t("Žádný řádek není kompletní — doplňte název, množství a max. cenu.", "No row is complete — fill in the name, quantity and max. price.")); return; }
    if (!zavaznaPotvrz) { flash(t("Potvrďte prosím, že podáváte závaznou objednávku.", "Please confirm that you are placing a binding order.")); return; }
    setZavaznaPotvrz(false);
    const davka = "DAV-2026-" + String(new Set(pozadavky.map((p) => p.davka).filter(Boolean)).size + 1).padStart(3, "0");
    const zaklad = pozadavky.length;
    const nove = platne.map((r, i) => ({
      cislo: "POZ-2026-" + String(zaklad + i + 1).padStart(3, "0"), davka, odbKod: user.kod,
      nazev: r.nazev, doplnek: r.doplnek || "", sukl: r.sukl || "",
      mnozstvi: Number(r.mnozstvi), maxCena: Number(r.maxCena) || null,
      minKsSarze: Number(r.minKsSarze) || null, sarze: "",
      minExpMesice: Number(r.minExpMesice) || (r.minExp ? null : 6), minExp: r.minExp || "",
      pozn: r.pozn || "", datum: new Date().toISOString(), stav: "prijata",
    }));
    setPozadavky((ps) => [...nove, ...ps]);
    const soupis = nove.map((p) => `${p.nazev}${p.doplnek ? " " + p.doplnek : ""} — ${p.mnozstvi} ks, max. ${fmtCZK(p.maxCena)}/ks`).join("; ");
    const soupisEn = nove.map((p) => `${p.nazev}${p.doplnek ? " " + p.doplnek : ""} — ${p.mnozstvi} pcs, max. ${fmtCZK(p.maxCena)}/pc`).join("; ");
    sendEmail(OPERATOR.email, t(`Hromadná poptávka ${davka} (${nove.length} položek) — ${user.kod}`, `Bulk request ${davka} (${nove.length} items) — ${user.kod}`),
      t(`Odběratel ${user.kod} nahrál poptávku z Excelu: ${soupis}. Ceny jsou maximální limity odběratele bez DPH.`,
        `Buyer ${user.kod} uploaded a request from Excel: ${soupisEn}. Prices are the buyer's maximum limits excl. VAT.`));
    sendEmail(user.email || (odberatele[user.kod] || {}).email,
      t(`Přijali jsme vaši poptávku ${davka} (${nove.length} položek)`, `We received your request ${davka} (${nove.length} items)`),
      t("Poptávku zpracujeme a o výsledku vás budeme informovat e-mailem u každé položky zvlášť.",
        "We will process the request and inform you of the outcome for each item by e-mail."));
    const vynechano = (importNahled.radky || []).length - platne.length;
    setImportNahled(null);
    flash(t(`Poptávka ${davka} byla odeslána — ${nove.length} položek${vynechano ? `, ${vynechano} nekompletních řádků vynecháno` : ""}.`,
            `Request ${davka} has been sent — ${nove.length} items${vynechano ? `, ${vynechano} incomplete rows skipped` : ""}.`));
  };

  const IMPORT_HLASKA = {
    nazev: t("chybí název položky", "item name missing"),
    mnozstvi: t("chybí množství", "quantity missing"),
    maxCena: t("chybí max. cena", "max. price missing"),
    suklNeznamy: t("kód SÚKL není v číselníku", "SÚKL code not in the codebook"),
    mimoCiselnik: t("položka není v číselníku SÚKL", "item is not in the SÚKL codebook"),
    bezBaleni: t("doplňte sílu a velikost balení — název má v číselníku více variant", "add strength and pack size — the name has several variants in the codebook"),
    expMinulost: t("min. expirace je v minulosti", "min. shelf life is in the past"),
  };

  /* ---------- centrální tabulka ---------- */
  const upravPole = (id, pole, hod) =>
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, [pole]: ["ks", "nakupCena", "cena"].includes(pole) ? Number(hod) || 0 : hod } : p)));
  /* obousměrný přepočet: změna marže % přepočítá prodejní cenu */
  const upravMarzi = (id, pct) =>
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, cena: r2(Number(p.nakupCena) * (1 + (Number(pct) || 0) / 100)) } : p)));

  const ulozNovy = () => {
    const f = novy;
    if (!f.nazev) { flash(t("Vyplňte název položky.", "Fill in the item name.")); return; }
    const id = Math.max(0, ...products.map((p) => p.id)) + 1;
    setProducts((ps) => [{ ...f, id, ks: Number(f.ks) || 0, nakupCena: r2(f.nakupCena), cena: r2(f.cena) }, ...ps]);
    setNovy(null);
    flash(t("Položka byla přidána do centrální tabulky.", "The item has been added to the central table."));
  };
  const smazProdukt = (id) => setProducts((ps) => ps.filter((p) => p.id !== id));

  /* ---------- uživatelé ---------- */
  const novyKodOdb = () => "ODB-" + String(Object.keys(odberatele).length + 1).padStart(2, "0");
  const novyKodDod = () => "DOD-" + String(Object.keys(dodavatele).length + 1).padStart(2, "0");
  const novyKodAdm = () => "ADM-" + String(users.filter((u) => u.role === "admin").length + 1).padStart(2, "0");

  const aresNacti = () => {
    const ico = (novyUzivatel.ic || "").trim();
    const d = ARES_MOCK[ico];
    if (!d) { flash(t("IČO nebylo v ARES nalezeno (v prototypu je k dispozici jen ukázkový vzorek).", "The company ID was not found in ARES (the prototype only contains a sample set).")); return; }
    setNovyUzivatel({ ...novyUzivatel, firma: d.nazev, dic: d.dic, adresa: d.adresa, jmeno: novyUzivatel.jmeno || d.nazev });
    flash(t("Údaje byly načteny z ARES.", "Data loaded from ARES."));
  };

  const ulozUzivatele = () => {
    const f = novyUzivatel;
    if (!f.jmeno || !f.login) { flash(t("Vyplňte jméno a přihlašovací jméno.", "Fill in the name and username.")); return; }
    if (users.some((u) => u.login === f.login.trim())) { flash(t("Toto přihlašovací jméno už existuje.", "This username already exists.")); return; }
    let kod = f.kod;
    if (f.role === "odberatel" && kod === "__novy__") {
      kod = novyKodOdb();
      setOdberatele((c) => ({ ...c, [kod]: { nazev: f.firma || f.jmeno, zeme: f.zeme || "", regC: f.regC || "—", vatId: f.vatId || "—", adresa: f.adresa || "—", email: f.email || "" } }));
    }
    if (f.role === "dodavatel" && kod === "__novy__") {
      kod = novyKodDod();
      setDodavatele((s) => ({ ...s, [kod]: { nazev: f.firma || f.jmeno, typ: f.typ || "lekarna", ic: f.ic || "—", dic: f.dic || "—", adresa: f.adresa || "—", email: f.email || "" } }));
    }
    if (f.role === "admin" && (kod === "__novy__" || !kod)) kod = novyKodAdm();
    const u = { login: f.login.trim(), heslo: null, role: f.role, jmeno: f.jmeno, email: f.email, kod, aktivni: true, potvrzen: false, aktivacniKod: null };
    setUsers((us) => [...us, u]);
    const kodAkt = genKod6();
    setUsers((us) => us.map((x) => (x.login === u.login ? { ...x, aktivacniKod: kodAkt } : x)));
    if (f.email) sendEmail(f.email, t("PORT — potvrzovací kód", "PORT — confirmation code"),
      t(`Byl vám založen účet v portálu PORT (ezdravotnici.cz). Přihlašovací jméno: ${u.login}. Váš potvrzovací kód: ${kodAkt}. Na přihlašovací stránce zvolte „Mám potvrzovací kód“, zadejte kód a nastavte si vlastní heslo.`,
        `An account has been created for you in the PORT portal (ezdravotnici.cz). Username: ${u.login}. Your confirmation code: ${kodAkt}. On the sign-in page choose \u201cI have a confirmation code\u201d, enter the code and set your own password.`));
    setNovyUzivatel(null);
    flash(t(`Účet „${u.login}“ byl založen${kod ? `, přidělen kód ${kod}` : ""}. Potvrzovací kód: ${kodAkt}${f.email ? " (odeslán e-mailem)" : " — předejte jej uživateli bezpečně"}.`,
            `Account \u201c${u.login}\u201d created${kod ? `, code ${kod} assigned` : ""}. Confirmation code: ${kodAkt}${f.email ? " (sent by e-mail)" : " — hand it over securely"}.`));
  };

  const posliNovyKod = (u) => {
    const kod = posliKod(u, "reset");
    flash(u.email
      ? t(`Nový potvrzovací kód byl odeslán na ${u.email}.`, `A new confirmation code has been sent to ${u.email}.`)
      : t(`Nový potvrzovací kód pro „${u.login}“: ${kod} (uživatel nemá e-mail, předejte jej bezpečně).`, `New confirmation code for \u201c${u.login}\u201d: ${kod} (no e-mail on file — hand it over securely).`));
  };
  const toggleUzivatel = (login) => setUsers((us) => us.map((u) => (u.login === login ? { ...u, aktivni: u.aktivni === false } : u)));
  const smazUzivatele = (login) => setUsers((us) => us.filter((u) => u.login !== login));

  /* ---------- exporty (skutečné stažení souboru) ---------- */
  const exportProdukty = () => stahniCSV("PORT-centralni-tabulka.csv", [
    ["SÚKL", "Název", "Doplněk", "ATC", "Výrobce", "Šarže", "Expirace", "Ks", "Nákup bez DPH", "Prodej bez DPH", "Marže %", "Dodavatel", "Odběratel", "Vývozní omezení"],
    ...products.map((p) => [p.sukl, p.nazev, p.doplnek, p.atc, p.vyrobce, p.sarze, p.expirace, p.ks, p.nakupCena, p.cena, marzePct(p).toFixed(1), p.dodKod, p.odbKod, jeBlacklist(p.sukl) ? blacklistDuvod(p.sukl, lang) : ""]),
  ]);

  const exportPoptavkyAdmin = (list) => stahniCSV("PORT-poptavky.csv", [
    ["Poptávka", "Datum", "Stav", "Adresáti", "Provize %", "Min. expirace", "Položka", "SÚKL", "Doplněk", "Množství", "Pokryto", "Požadovaná cena", "Limit odběratele", "Nabídek"],
    ...list.flatMap((d) => d.polozky.map((p) => [
      d.cislo, new Date(d.datum).toLocaleDateString(locale), d.stav, (d.prijemci || []).join(" ") || t("všichni", "all"),
      d.provize, minExpText(d), p.nazev, p.sukl, p.doplnek, p.mnozstvi, pokryto(p), p.cena, p.maxProdejni || "", p.nabidky.length,
    ])),
  ]);

  const exportPoptavkyDodavatel = (list) => stahniCSV("PORT-poptavky.csv", [
    ["Poptávka", "Datum", "Stav", "Min. expirace", "Položka", "SÚKL", "Doplněk", "Množství", "Požadovaná cena", "Moje nabídka ks", "Moje nabídka cena", "Akceptováno ks"],
    ...list.flatMap((d) => d.polozky.map((p) => {
      const n = p.nabidky.find((x) => x.dodKod === user.kod);
      return [d.cislo, new Date(d.datum).toLocaleDateString(locale), d.stav, minExpText(d), p.nazev, p.sukl, p.doplnek, p.mnozstvi, p.cena,
        n ? n.mnozstvi : "", n ? n.cena : "", n ? n.akceptovano || 0 : ""];
    })),
  ]);

  const dphSazba = (o) => (!o.odberatel?.zeme || o.odberatel.zeme === "CZ" ? DPH_CZ : 0);

  const exportDodaciList = (o) => {
    const sazba = dphSazba(o);
    stahniCSV(`${o.cislo}.csv`, [
      [t("DODACÍ LIST", "DELIVERY NOTE"), o.cislo],
      [t("Dodavatel", "Supplier"), OPERATOR.nazev, OPERATOR.adresa, "IČ " + OPERATOR.ic, "DIČ " + OPERATOR.dic],
      [t("Odběratel", "Buyer"), o.odberatel.nazev, o.odberatel.adresa, (o.odberatel.regC ? t("Reg. č. ", "Reg. no. ") + o.odberatel.regC : ""), (o.odberatel.vatId ? "VAT ID " + o.odberatel.vatId : "")],
      [t("Datum vystavení", "Issue date"), new Date(o.datum).toLocaleDateString(locale), t("Splatnost", "Due date"), plusDays(o.datum, 14).toLocaleDateString(locale)],
      [],
      ["SÚKL", t("Název", "Name"), t("Šarže", "Batch"), t("Expirace", "Expiry"), t("Ks", "Qty"), t("Cena/ks", "Price/pc"), t("Celkem", "Total")],
      ...o.items.map((i) => [i.sukl, i.nazev + (i.doplnek ? ", " + i.doplnek : ""), i.sarze, i.expirace, i.mnozstvi, i.cena, r2(i.mnozstvi * i.cena)]),
      [],
      ["", "", "", "", "", t("Celkem bez DPH", "Total excl. VAT"), r2(o.celkem)],
      ["", "", "", "", "", t(`DPH ${sazba * 100} %`, `VAT ${sazba * 100}%`), r2(o.celkem * sazba)],
      ["", "", "", "", "", t("Celkem s DPH", "Total incl. VAT"), r2(o.celkem * (1 + sazba))],
      ...(sazba === 0 ? [[], [t("Dodání zboží do jiného členského státu EU osvobozené od DPH s nárokem na odpočet — daň odvede pořizovatel (reverse charge), čl. 138 směrnice 2006/112/ES.",
        "Supply of goods to another EU member state exempt from VAT with the right of deduction — the acquirer accounts for the tax (reverse charge), Art. 138 of Directive 2006/112/EC.")]] : []),
    ]);
  };

  /* ============================================================ */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
    :root{
      --bg:#F1EFFA; --surface:#FFFFFF; --ink:#211B4E; --muted:#6C6890;
      --brand:#7C6AE8; --brand-dk:#4E3FC8; --brand-lt:#EAE6FB; --peri:#D9E0F8;
      --line:#E3E0F1; --amber:#B45309; --amber-bg:#FDF1E3; --red:#B91C1C; --red-bg:#FDECEE;
      --ok:#177A45; --ok-bg:#E6F5EC;
      /* prvky, které se mění podle role přihlášeného uživatele */
      --tint:#FAF9FE; --th-bg:#F6F4FC; --td-line:#F0EEF8; --input-bg:#FFFFFF; --peri-fg:#3D3F8F;
      --top-bg:#211B4E; --top-fg:#FFFFFF; --top-line:rgba(255,255,255,.35); --badge-bg:#3B2E8F;
      --nav-bg:#7C6AE8; --nav-fg:#EAE6FB; --nav-on:#FFFFFF; --nav-line:#D9E0F8; --bar-bg:#211B4E;
    }
    *{box-sizing:border-box}
    .port{min-height:100vh;background:var(--bg);color:var(--ink);
      font-family:'Manrope',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.45}
    .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.86em;letter-spacing:.02em}
    .wrap{max-width:1180px;margin:0 auto;padding:0 20px}
    .top{background:var(--top-bg);color:var(--top-fg)}
    .top .wrap{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-top:12px;padding-bottom:12px}
    .logo{display:flex;align-items:center;gap:10px}
    .logo .badge{width:46px;height:46px;border-radius:13px;background:var(--badge-bg);display:grid;place-items:center}
    .logo .badge img{width:30px;height:30px;filter:brightness(0) invert(1)}   /* srdce vždy bílé, ať je kontrastní */
    .logo .badge img{width:30px;height:30px;display:block}
    .logo b{font-size:19px;letter-spacing:.14em}
    .logo small{display:block;font-size:11px;opacity:.75;letter-spacing:.03em;font-weight:400}
    .spacer{flex:1}
    .who{font-size:13px;opacity:.9;text-align:right}
    .who b{display:block;font-size:14px}
    .langsw{display:flex;gap:2px;border:1px solid var(--top-line);border-radius:8px;overflow:hidden}
    .langsw button{background:none;border:none;color:var(--top-fg);opacity:.6;font:inherit;font-size:12px;font-weight:700;padding:5px 9px;cursor:pointer}
    .langsw button.on{opacity:1;background:var(--top-line)}
    .langsw.dark{border-color:var(--line)}
    .langsw.dark button{color:var(--ink)}
    .langsw.dark button.on{background:var(--brand-lt)}
    .nav{background:var(--nav-bg);color:var(--nav-fg)}
    .nav .wrap{display:flex;gap:2px;overflow-x:auto;padding-left:12px;padding-right:12px}
    .nav button{background:none;border:none;color:var(--nav-fg);padding:11px 15px;font:inherit;font-size:14px;
      cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap}
    .nav button.on{color:var(--nav-on);font-weight:700;border-bottom-color:var(--nav-line)}
    .nav button:hover{color:var(--nav-on)}
    main{padding:26px 0 90px}
    h1{font-size:21px;margin:0 0 4px;letter-spacing:-.01em;font-weight:800}
    .sub{color:var(--muted);font-size:14px;margin:0 0 18px;max-width:900px}
    .card{background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden}
    .card + .card{margin-top:16px}
    .card .pad{padding:18px 20px}
    .toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:14px 20px;border-bottom:1px solid var(--line);background:var(--tint)}
    input[type=text],input[type=password],input[type=number],input[type=date],select{
      border:1px solid var(--line);border-radius:8px;padding:8px 10px;font:inherit;font-size:14px;background:var(--input-bg);color:var(--ink)}
    input:focus,select:focus,button:focus-visible{outline:2px solid var(--brand);outline-offset:1px}
    .search{flex:1;min-width:200px}
    .table-wrap{overflow-x:auto}
    .table-wrap.scroll{max-height:430px;overflow:auto}
    .table-wrap.scroll thead th{position:sticky;top:0;z-index:1}
    .form-akce{position:sticky;bottom:0;display:flex;gap:10px;flex-wrap:wrap;align-items:center;
      margin:14px -20px -16px;padding:12px 20px;background:var(--tint);border-top:1px solid var(--line)}
    .karta-draft{border:2px solid var(--brand)}
    /* tmavé okolí u dodavatele — nadpisy a popisky mimo karty */
    .port.tmave main > .wrap > h1{color:#EDEBFA}
    .port.tmave main > .wrap > .sub{color:#A9A3D8}
    .port.tmave .pager button{background:var(--surface)}
    /* rozhodnutí, které na odběratele čeká — musí být vidět na první pohled */
    .vyzva{border:2px solid var(--amber);border-radius:14px;background:var(--amber-bg);margin-bottom:18px;overflow:hidden}
    .vyzva .hlava{display:flex;align-items:center;gap:10px;padding:12px 18px;background:var(--amber);color:#fff}
    .vyzva .hlava b{font-size:15px;letter-spacing:.01em}
    .vyzva .znak{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.22);display:grid;place-items:center;
      font-size:16px;font-weight:800;flex:0 0 auto;animation:tep 1.6s ease-in-out infinite}
    @keyframes tep{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.14);opacity:.75}}
    @media (prefers-reduced-motion: reduce){ .vyzva .znak{animation:none} }
    .vyzva .radek{padding:14px 18px;border-top:1px solid rgba(0,0,0,.08)}
    .vyzva .btn{background:var(--amber);border-color:var(--amber)}
    /* jedna položka poptávky = jedna uzavřená karta, ať se dvě léčiva neslijí v jedno */
    /* Poptávka = jeden blok oddělený mezerou a tenkou linkou, položka uvnitř = pruh
       s barevným okrajem. Žádné rámy v rámech — odděluje mezera a linka, ne obrys. */
    .poptavka{margin:0 0 26px;border:1px solid var(--line);border-radius:14px;background:var(--surface);overflow:hidden}
    .poptavka:last-child{margin-bottom:6px}
    .poptavka > .hlava{padding:12px 18px;background:var(--tint);border-bottom:1px solid var(--line);
      box-shadow:inset 0 3px 0 var(--brand)}
    .poptavka > .hlava .mono b{font-size:14px;letter-spacing:.04em}
    .polozka{position:relative;padding:0 0 2px;background:var(--surface)}
    .polozka + .polozka{border-top:3px solid var(--line)}
    .polozka > .hlava{padding:14px 18px 12px;border-left:4px solid var(--brand)}
    .polozka > .pad,.polozka > .table-wrap{border-left:4px solid var(--brand-lt)}
    .polozka .cislo{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--brand-dk);
      background:var(--brand-lt);border-radius:6px;padding:3px 8px}
    .polozka table{border-top:1px solid var(--line)}
    .polozka table th{background:transparent;border-bottom:1px solid var(--line)}
    table{width:100%;border-collapse:collapse;font-size:14px}
    th{background:var(--th-bg);color:var(--muted);text-transform:uppercase;font-size:11px;letter-spacing:.06em;
      text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);white-space:nowrap}
    td{padding:10px 12px;border-bottom:1px solid var(--td-line);vertical-align:middle}
    tr:last-child td{border-bottom:none}
    td.num,th.num{text-align:right}
    tr.bl td{background:var(--red-bg)}
    .pill{display:inline-block;padding:2px 9px;border-radius:99px;font-size:12px;font-weight:600;white-space:nowrap}
    .pill.ok{background:var(--ok-bg);color:var(--ok)} .pill.brzy{background:var(--amber-bg);color:var(--amber)}
    .pill.prosla{background:var(--red-bg);color:var(--red)}
    .pill.nova{background:var(--peri);color:var(--peri-fg)} .pill.potvrzena{background:var(--amber-bg);color:var(--amber)}
    .pill.expedovana{background:var(--ok-bg);color:var(--ok)}
    .pill.kod{background:var(--brand-lt);color:var(--brand-dk)}
    .qty{width:74px;text-align:right}
    .btn{background:var(--brand);color:#fff;border:none;border-radius:9px;padding:10px 18px;font:inherit;
      font-size:14px;font-weight:700;cursor:pointer}
    .btn:hover{background:var(--brand-dk)} .btn:disabled{opacity:.45;cursor:default}
    .btn.sec{background:var(--input-bg);color:var(--brand-dk);border:1px solid var(--line);font-weight:600}
    .btn.sec:hover{background:var(--brand-lt)}
    .btn.mini{padding:6px 11px;font-size:13px;border-radius:7px}
    .btn.danger{background:var(--input-bg);color:var(--red);border:1px solid var(--red-bg)}
    .link{background:none;border:none;color:var(--brand-dk);font:inherit;font-size:14px;text-decoration:underline;cursor:pointer;padding:0}
    .cartbar{position:fixed;left:0;right:0;bottom:0;background:var(--bar-bg);color:#fff;z-index:40}
    .cartbar .wrap{display:flex;align-items:center;gap:14px;padding:13px 20px;flex-wrap:wrap}
    .cartbar b{font-size:16px}
    .login{min-height:100vh;display:grid;place-items:center;padding:24px;
      background:linear-gradient(160deg,#211B4E 0%,#4E3FC8 55%,#8B7BEF 100%)}
    .login .box{background:#fff;border-radius:16px;padding:34px 32px;width:100%;max-width:410px;box-shadow:0 24px 60px rgba(33,27,78,.35);position:relative}
    .login label{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:14px 0 5px}
    .login input{width:100%}
    .login .err{color:var(--red);font-size:13px;margin-top:10px}
    .demo{margin-top:20px;border-top:1px dashed var(--line);padding-top:14px;font-size:12.5px;color:var(--muted);line-height:1.7}
    .demo code{background:#F1EFFA;border-radius:5px;padding:1px 6px}
    .overlay{position:fixed;inset:0;background:rgba(15,20,45,.55);z-index:50;display:grid;place-items:start center;overflow:auto;padding:30px 14px}
    /* dodací list a podmínky se tisknou — barvy zůstávají světlé bez ohledu na roli */
    .doc{--surface:#FFFFFF; --ink:#211B4E; --muted:#6C6890; --line:#E3E0F1; --td-line:#F0EEF8; --th-bg:#F6F4FC; --input-bg:#FFFFFF;
      background:#fff;color:#211B4E;border-radius:12px;max-width:800px;width:100%;padding:34px 38px;position:relative}
    .doc h2{margin:0;font-size:20px} .doc .dnum{color:var(--muted);font-size:14px}
    .doc .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:20px 0}
    .doc .party{border:1px solid var(--line);border-radius:10px;padding:12px 14px;font-size:13.5px}
    .doc .party h4{margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
    .doc .meta{display:flex;gap:24px;flex-wrap:wrap;font-size:13.5px;margin-bottom:16px}
    .doc .meta span{color:var(--muted);display:block;font-size:11px;text-transform:uppercase;letter-spacing:.06em}
    .doc table{font-size:13px}
    .doc tfoot td{font-weight:700;border-top:2px solid var(--ink)}
    .note{font-size:12.5px;color:var(--muted);margin-top:14px;line-height:1.6}
    .sig{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:44px;font-size:13px;color:var(--muted)}
    .sig div{border-top:1px solid var(--ink);padding-top:6px}
    .doc .actions{display:flex;gap:10px;justify-content:flex-end;margin-top:26px}
    .stamp{position:absolute;top:30px;right:38px;border:2px solid var(--brand);color:var(--brand);
      border-radius:8px;padding:4px 12px;font-weight:800;letter-spacing:.1em;font-size:13px;transform:rotate(-4deg)}
    .terms dt{font-weight:700;margin-top:16px} .terms dd{margin:4px 0 0;color:#3B3563}
    .mail{padding:14px 20px;border-bottom:1px solid #F0EEF8;font-size:14px}
    .mail:last-child{border-bottom:none}
    .mail .to{color:var(--muted);font-size:12.5px}
    .toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);background:var(--bar-bg);color:#fff;
      padding:11px 20px;border-radius:10px;font-size:14px;z-index:80;box-shadow:0 10px 30px rgba(0,0,0,.3);max-width:92vw}
    .empty{padding:40px 20px;text-align:center;color:var(--muted)}
    .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:14px;margin-bottom:18px}
    .stat{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px 18px;cursor:pointer}
    .stat .n{font-size:26px;font-weight:800;line-height:1.2}
    .stat .c{font-size:13px;color:var(--muted);margin-top:4px}
    .pohyb tbody td{border-bottom:3px solid var(--line)}
    tbody tr.klik{cursor:pointer}
    tbody tr.klik:hover td{background:var(--brand-lt)}
    .form{padding:16px 20px;border-bottom:1px solid var(--line);background:#FAF9FE;display:flex;gap:10px;flex-wrap:wrap;align-items:end}
    .pager{display:flex;gap:6px;align-items:center;justify-content:center;padding:12px}
    .pager button{background:#fff;border:1px solid var(--line);border-radius:7px;padding:5px 10px;font:inherit;font-size:13px;cursor:pointer;color:var(--brand-dk)}
    .pager button.on{background:var(--brand);color:#fff;border-color:var(--brand);font-weight:700}
    .warn{background:var(--amber-bg);color:var(--amber);border:1px solid #F3D9B4;border-radius:10px;padding:9px 12px;font-size:13.5px}
    .danger-box{background:var(--red-bg);color:var(--red);border:1px solid #F0C9C9;border-radius:10px;padding:9px 12px;font-size:13.5px}
    @media(max-width:640px){ .doc{padding:24px 18px} .doc .grid2,.sig{grid-template-columns:1fr} .who{display:none} }

    /* ---------- telefon a úzký tablet ----------
       Tabulky se překlápějí do karet: hlavička se skryje a název sloupce se vypisuje
       ke každé buňce z atributu data-l (doplňuje ho useEffect níže). */
    @media(max-width:720px){
      .wrap{padding:0 12px}
      main{padding:18px 0 72px}
      h1{font-size:19px}
      .sub{font-size:13.5px}
      .nav .wrap{-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .nav .wrap::-webkit-scrollbar{display:none}
      .nav button{padding:13px 14px}
      .card{border-radius:12px}
      .card .pad{padding:14px}
      .toolbar{padding:12px}
      .btn,.btn.mini{min-height:44px;padding:11px 16px;font-size:14px}
      .search{min-width:100%}
      input[type=text],input[type=password],input[type=number],input[type=date],select{
        font-size:16px;padding:10px 12px}                    /* 16 px = iPhone stránku nepřiblíží */
      .form{padding:14px;gap:14px}
      .form label{width:100%}
      .form label input,.form label select{width:100% !important;max-width:none}
      .form-akce{margin:14px -14px -14px;padding:12px 14px}
      .form-akce .btn{width:100%;justify-content:center}
      .table-wrap,.table-wrap.scroll{max-height:none;overflow:visible}
      .card table{display:block;width:100%}
      .card thead{display:none}
      .card tbody{display:block}
      .card tbody tr{display:block;background:var(--surface);border:1px solid var(--line);border-radius:12px;margin:12px;padding:4px 12px}
      .card tbody td{display:flex;justify-content:space-between;align-items:center;gap:14px;
        text-align:right;padding:9px 0;border:0;border-bottom:1px dashed var(--line)}
      .card tbody tr td:last-child{border-bottom:0}
      .card tbody td::before{content:attr(data-l);flex:0 0 40%;text-align:left;color:var(--muted);
        font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
      .card tbody td input,.card tbody td select{width:100% !important;max-width:210px}
      .card tbody td .btn{width:auto}
      .card tbody td.num{text-align:right}
    }
    @media print{
      .no-print{display:none !important}
      .overlay{position:static;background:none;padding:0}
      .doc{box-shadow:none;border-radius:0;max-width:none}
      .port>*:not(.overlay){display:none}
    }
  `;

  const lbl = { fontSize: 12, color: "var(--muted)" };
  const LangSwitch = ({ dark }) => (
    <div className={"langsw" + (dark ? " dark" : "")} role="group" aria-label="Language">
      <button className={lang === "cs" ? "on" : ""} onClick={() => setLang("cs")}>CS</button>
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
    </div>
  );

  /* našeptávače z číselníku SÚKL — kód, obchodní název i doplněk */
  const SuklDatalist = () => (
    <>
      <datalist id="sukl-list">
        {SUKL_CISELNIK.map((c) => <option key={c.kod} value={c.kod}>{`${c.nazev} ${c.doplnek}`}</option>)}
      </datalist>
      <datalist id="sukl-nazvy">
        {SUKL_NAZVY.map((n) => <option key={n} value={n} />)}
      </datalist>
      <datalist id="sukl-doplnky">
        {SUKL_CISELNIK.map((c) => <option key={c.kod} value={c.doplnek}>{`${c.nazev} · ${c.kod}`}</option>)}
      </datalist>
    </>
  );

  /* doplní zbytek řádku podle toho, co uživatel vybral z našeptávače */
  const doplnZCiselniku = (radek, pole, hodnota) => {
    const zaklad = { ...radek, [pole]: hodnota };
    if (pole === "sukl") {
      const c = suklInfo(hodnota);
      return c ? { ...zaklad, nazev: c.nazev, doplnek: c.doplnek } : zaklad;
    }
    const c = suklPodleNazvu(pole === "nazev" ? hodnota : zaklad.nazev, pole === "doplnek" ? hodnota : zaklad.doplnek);
    return c ? { ...zaklad, sukl: c.kod, nazev: c.nazev, doplnek: c.doplnek } : zaklad;
  };

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
              <div className="badge" style={{ background: "#3B2E8F" }}><img src={LOGO_DARK} alt="ezdravotnici.cz" /></div>
              <div><b style={{ letterSpacing: ".14em" }}>PORT</b>
                <small style={{ color: "var(--muted)" }}>marketplace · ezdravotnici<span style={{ color: "#A9B7EE", fontWeight: 700 }}>.cz</span></small></div>
            </div>

            {!aktivace && (<>
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
              <div style={{ textAlign: "center", marginTop: 12, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="link" style={{ fontSize: 13 }} onClick={() => setAktivace({ id: "", kod: "", heslo: "" })}>{t("Mám potvrzovací kód", "I have a confirmation code")}</button>
                {!obnova && <button className="link" style={{ fontSize: 13 }} onClick={() => setObnova({ id: "" })}>{t("Zapomněli jste heslo?", "Forgot your password?")}</button>}
              </div>
              {obnova && (
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                  <label>{t("Přihlašovací jméno nebo e-mail", "Username or e-mail")}</label>
                  <input type="text" value={obnova.id} onChange={(e) => setObnova({ id: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && zapomenuteHeslo()} />
                  <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>
                    {t("Pošleme vám potvrzovací kód — heslo nikdy neposíláme e-mailem.", "We will send you a confirmation code — we never send passwords by e-mail.")}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button className="btn" style={{ flex: 1 }} onClick={zapomenuteHeslo}>{t("Poslat kód", "Send code")}</button>
                    <button className="btn sec" onClick={() => setObnova(null)}>{t("Zpět", "Back")}</button>
                  </div>
                </div>
              )}
            </>)}

            {aktivace && (<>
              <div style={{ marginTop: 18, fontSize: 14, fontWeight: 700 }}>{t("Aktivace přístupu", "Access activation")}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>
                {t("Zadejte kód z e-mailu a zvolte si vlastní heslo. Tím zároveň potvrdíte převzetí přístupu.",
                   "Enter the code from your e-mail and choose your own password. This also confirms that you have received the access.")}</div>
              <label>{t("Přihlašovací jméno nebo e-mail", "Username or e-mail")}</label>
              <input type="text" value={aktivace.id} onChange={(e) => setAktivace({ ...aktivace, id: e.target.value, err: "" })} />
              <label>{t("Potvrzovací kód (6 číslic)", "Confirmation code (6 digits)")}</label>
              <input type="text" className="mono" value={aktivace.kod} onChange={(e) => setAktivace({ ...aktivace, kod: e.target.value, err: "" })} />
              <label>{t("Nové heslo", "New password")}</label>
              <input type="password" value={aktivace.heslo} onChange={(e) => setAktivace({ ...aktivace, heslo: e.target.value, err: "" })}
                onKeyDown={(e) => e.key === "Enter" && aktivujUcet()} />
              {aktivace.err && <div className="err">{aktivace.err}</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button className="btn" style={{ flex: 1 }} onClick={aktivujUcet}>{t("Aktivovat a nastavit heslo", "Activate and set password")}</button>
                <button className="btn sec" onClick={() => setAktivace(null)}>{t("Zpět", "Back")}</button>
              </div>
            </>)}

            <div className="demo">
              <b>{t("Ukázkové účty:", "Demo accounts:")}</b>
              {[[t("odběratel (zahraniční)", "buyer (foreign)"), [["passau", "demo"], ["milano", "demo"], ["wien", "demo"]]],
                [t("dodavatel (český)", "supplier (Czech)"), [["lekarna", "demo"], ["poliklinika", "demo"], ["distributor", "demo"]]],
                [t("zprostředkovatel", "intermediary"), [["admin", "admin"]]]].map(([popis, ucty]) => (
                <div key={popis} style={{ marginTop: 4 }}>
                  {popis} —{" "}
                  {ucty.map(([l, h], i) => (
                    <span key={l}>
                      {i > 0 && " · "}
                      {/* bez mezer uvnitř značky, ať se kopíruje jen samotné jméno */}
                      <code>{l}</code>/<code>{h}</code>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- navigace podle role ---------- */
  const tabs =
    user.role === "odberatel" ? [
      ["prehled", t("Přehled", "Dashboard")],
      ["stav", t("Stav objednávek", "Order status")],
      ["pozadavky", t("Nová objednávka", "New order")],
      ["historie", t("Historie objednávek", "Order history")],
      ["podminky", t("Podmínky obchodování", "Terms of trade")],
    ] :
    user.role === "dodavatel" ? [
      ["prehled", t("Přehled", "Dashboard")],
      ["poptavky", t("Poptávky", "RFQs")],
      ["podminky", t("Podmínky obchodování", "Terms of trade")],
    ] : [
      ["prehled", t("Přehled", "Dashboard")],
      ["produkty", t("Zboží v pohybu", "Goods in transit")],
      ["poptavky", t("Poptávky", "RFQs")],
      ["objednavky", t("Objednávky", "Orders")],
      ["uzivatele", t("Uživatelé", "Users")],
      ["emaily", t("Odeslané e-maily", "Sent e-mails")],
      ["podminky", t("Podmínky", "Terms")],
    ];

  const mojeJmeno = user.role === "odberatel" ? (odberatele[user.kod] || {}).nazev
    : user.role === "dodavatel" ? (dodavatele[user.kod] || {}).nazev : OPERATOR.nazev;

  return (
    <div className={"port" + (user.role === "dodavatel" ? " tmave" : "")} style={TEMA[user.role] || undefined}>
      <style>{css}</style>
      <SuklDatalist />

      <header className="top no-print">
        <div className="wrap">
          <div className="logo">
            <div className="badge"><img src={LOGO} alt="ezdravotnici.cz" /></div>
            <div><b>PORT</b><small>marketplace · ezdravotnici<span style={{ color: "var(--peri)", fontWeight: 700 }}>.cz</span></small></div>
          </div>
          <div className="spacer" />
          <LangSwitch />
          <div className="who"><b>{mojeJmeno}</b>
            <span className="mono">{ROLE_LABEL(user.role)} · {user.kod}</span></div>
          <button className="btn sec mini" onClick={logout}>{t("Odhlásit", "Sign out")}</button>
        </div>
      </header>
      <nav className="nav no-print">
        <div className="wrap">
          {tabs.map(([id, label]) => (
            <button key={id} className={view === id ? "on" : ""} onClick={() => { setView(id); setHledat(""); setStrana(1); }}>{label}</button>
          ))}
        </div>
      </nav>

      <main className="no-print">
        <div className="wrap">

          {/* ============ ODBĚRATEL: čeká rozhodnutí o navýšení ============ */}
          {user.role === "odberatel" && (() => {
            const cekaji = [];
            demands.forEach((d) => d.polozky.forEach((it) => {
              const nv = it.navrhOdb;
              if (nv && nv.stav === "odeslan" && nv.odbKod === user.kod && !navrhPropadl(nv)) cekaji.push({ d, it, nv });
            }));
            if (!cekaji.length) return null;
            return (
              <div className="vyzva">
                <div className="hlava">
                  <span className="znak">!</span>
                  <b>{t(`Čeká na vaše rozhodnutí: navýšení objednávky (${cekaji.length})`,
                        `Awaiting your decision: order increase (${cekaji.length})`)}</b>
                </div>
                {cekaji.map(({ d, it, nv }) => {
                  const ted = ((it.zdroje || []).find((z) => z.odbKod === user.kod) || {}).mnozstvi;
                  return (
                    <div key={d.cislo + it.id} className="radek">
                      <div style={{ fontSize: 15 }}>
                        <b>{it.nazev}</b>{it.doplnek && <span style={{ color: "var(--muted)" }}> {it.doplnek}</span>}
                      </div>
                      <div style={{ fontSize: 13.5, margin: "4px 0 12px" }}>
                        {t("nyní objednáno", "currently ordered")} <b>{ted} {t("ks", "pcs")}</b>
                        {" · "}{t("nabídka platí do", "offer valid until")} <b>{fmtDate(nv.platnost)}</b>
                        {nv.pozn && <> · „{nv.pozn}“</>}
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        {nv.hladiny.map((h, i) => (
                          <button key={i} className="btn" onClick={() => prijmiNavrhOdb(d, it, i)}>
                            {t(`Navýšit o ${h.ks - (ted || 0)} ks — celkem ${h.ks} ks à ${fmtCZK(h.cena)}`,
                               `Add ${h.ks - (ted || 0)} pcs — ${h.ks} pcs in total at ${fmtCZK(h.cena)}`)}</button>
                        ))}
                        <button className="btn sec mini" onClick={() => odmitniNavrhOdb(d, it)}>{t("Nenavyšovat", "Do not increase")}</button>
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>
                        {t("Navýšení je závazné. Dokud nerozhodnete, objednávku vyřizujeme v původním množství.",
                           "The increase is binding. Until you decide, we process the order in its original quantity.")}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* ============ ODBĚRATEL: nástěnka ============ */}
          {view === "prehled" && user.role === "odberatel" && (() => {
            const mojeObj = orders.filter((o) => o.odbKod === user.kod);
            const otevrene = mojeObj.filter((o) => o.stav !== "expedovana");
            const hodnota = mojeObj.reduce((s, o) => s + o.celkem, 0);
            const mojePoz = pozadavky.filter((p) => p.odbKod === user.kod);
            const cekajici = mojePoz.filter((p) => p.stav !== "vyrizena");
            const dostupne = products.filter((p) => (p.odbKod === user.kod || p.odbKod === "VSICHNI") && p.ks > 0).length;
            return (
              <>
                <h1>{t("Přehled", "Dashboard")}</h1>
                <p className="sub">{t(`Vítejte, ${mojeJmeno}. Rychlý přehled objednávek a poptávek.`, `Welcome, ${mojeJmeno}. A quick overview of your orders and requests.`)}</p>
                <div className="stats">
                  <div className="stat" onClick={() => setView("historie")}><div className="n">{mojeObj.length}</div><div className="c">{t("Objednávky celkem", "Orders total")}</div></div>
                  <div className="stat" onClick={() => setView("historie")}><div className="n" style={{ color: otevrene.length ? "var(--brand-dk)" : undefined }}>{otevrene.length}</div><div className="c">{t("Otevřené objednávky", "Open orders")}</div></div>
                  <div className="stat" onClick={() => setView("historie")}><div className="n">{fmtCZK(hodnota)}</div><div className="c">{t("Hodnota objednávek bez DPH", "Order value excl. VAT")}</div></div>
                  <div className="stat" onClick={() => setView("pozadavky")}><div className="n">{mojePoz.length}</div><div className="c">{t("Moje poptávky", "My requests")}</div></div>
                  <div className="stat" onClick={() => setView("pozadavky")}><div className="n" style={{ color: cekajici.length ? "var(--amber)" : "var(--ok)" }}>{cekajici.length}</div><div className="c">{t("Poptávky ve vyřizování", "Requests in progress")}</div></div>
                  <div className="stat" onClick={() => setView("stav")}><div className="n">{pozadavky.filter((p) => p.odbKod === user.kod && p.stav !== "vyrizena").length}</div><div className="c">{t("Objednávek ve zpracování", "Orders in progress")}</div></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 16 }}>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Poslední objednávky", "Recent orders")}</b><div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("historie")}>{t("Všechny", "All")}</button></div>
                    {!mojeObj.length && <div className="empty">{t("Zatím žádné objednávky.", "No orders yet.")}</div>}
                    {mojeObj.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Datum", "Date")}</th><th className="num">{t("Celkem", "Total")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                        <tbody>{mojeObj.slice(0, 5).map((o) => (
                          <tr key={o.cislo}>
                            <td className="mono"><button className="link" onClick={() => setDetail(o)}><b>{o.cislo}</b></button></td>
                            <td>{fmtDate(o.datum)}</td><td className="num">{fmtCZK(o.celkem)}</td>
                            <td><span className={"pill " + o.stav}>{STAV_LABEL[o.stav]}</span></td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Poslední poptávky", "Recent requests")}</b><div className="spacer" />
                      <button className="btn mini" onClick={() => { setView("pozadavky"); setNovyPozadavek({ nazev: "", sukl: "", mnozstvi: "", maxCena: "", sarze: "", minExp: "", pozn: "" }); }}>{t("+ Nová poptávka", "+ New request")}</button></div>
                    {!mojePoz.length && <div className="empty">{t("Zatím žádné poptávky.", "No requests yet.")}</div>}
                    {mojePoz.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                        <tbody>{mojePoz.slice(0, 5).map((p) => (
                          <tr key={p.cislo} className="klik" onClick={() => setView("stav")} title={t("Otevřít stav objednávek", "Open order status")}>
                            <td className="mono"><b>{p.cislo}</b></td><td>{p.nazev}</td><td className="num">{p.mnozstvi}</td>
                            <td><span className={"pill " + (p.stav === "vyrizena" ? "ok" : "nova")}>{p.stav === "vyrizena" ? t("vyřízena", "fulfilled") : t("přijata", "received")}</span></td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}

          {/* ============ DODAVATEL: nástěnka ============ */}
          {view === "prehled" && user.role === "dodavatel" && (() => {
            const proMne = demands.filter((d) => !(d.prijemci || []).length || d.prijemci.includes(user.kod));
            const otevrene = proMne.filter((d) => d.stav === "otevrena");
            const polozkyProMne = otevrene.flatMap((d) => d.polozky.map((it) => ({ ...it, demand: d })));
            const mojeNabidky = proMne.flatMap((d) => d.polozky.flatMap((it) => it.nabidky.filter((n) => n.dodKod === user.kod).map((n) => ({ ...n, demand: d, polozka: it }))));
            const cekaji = mojeNabidky.filter((n) => n.stav === "podana");
            const protinavrhy = mojeNabidky.filter((n) => n.stav === "protinavrh");
            const akcept = mojeNabidky.filter((n) => n.stav === "akceptovana" || n.stav === "castecne");
            const bezNabidky = polozkyProMne.filter((it) => !it.nabidky.some((n) => n.dodKod === user.kod));
            return (
              <>
                <h1>{t("Přehled", "Dashboard")}</h1>
                <p className="sub">{t(`Vítejte, ${mojeJmeno}. Poptávky zprostředkovatele a stav vašich nabídek.`, `Welcome, ${mojeJmeno}. The intermediary's RFQs and the status of your offers.`)}</p>
                <div className="stats">
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n" style={{ color: bezNabidky.length ? "var(--brand-dk)" : undefined }}>{bezNabidky.length}</div><div className="c">{t("Položky bez vaší nabídky", "Items without your offer")}</div></div>
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n">{otevrene.length}</div><div className="c">{t("Otevřené poptávky", "Open RFQs")}</div></div>
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n">{cekaji.length}</div><div className="c">{t("Nabídky čekající na vyhodnocení", "Offers awaiting evaluation")}</div></div>
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n" style={{ color: protinavrhy.length ? "var(--amber)" : undefined }}>{protinavrhy.length}</div><div className="c">{t("Protinávrhy čekající na mě", "Counter-offers awaiting me")}</div></div>
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n" style={{ color: "var(--ok)" }}>{akcept.length}</div><div className="c">{t("Akceptováno — připravit ke svozu", "Accepted — prepare for collection")}</div></div>
                </div>
                <div className="card">
                  <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Aktuální otevřené poptávky", "Current open RFQs")}</b><div className="spacer" />
                    <button className="btn sec mini" onClick={() => setView("poptavky")}>{t("Všechny", "All")}</button></div>
                  {!polozkyProMne.length && <div className="empty">{t("Momentálně nejsou vypsány žádné poptávky.", "There are currently no open RFQs.")}</div>}
                  {polozkyProMne.length > 0 && (
                    <div className="table-wrap"><table>
                      <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Požadovaná cena", "Target price")}</th><th>{t("Moje nabídka", "My offer")}</th></tr></thead>
                      <tbody>{polozkyProMne.slice(0, 6).map((it) => {
                        const n = it.nabidky.find((x) => x.dodKod === user.kod);
                        return (
                          <tr key={it.demand.cislo + "-" + it.id} className="klik"
                            onClick={() => { setHledatPop(it.demand.cislo); setStrana(1); setView("poptavky"); }}
                            title={t("Otevřít poptávku", "Open the RFQ")}>
                            <td className="mono"><b>{it.demand.cislo}</b></td>
                            <td><b>{it.nazev}</b>{it.doplnek && <><br /><span style={{ color: "var(--muted)", fontSize: 12.5 }}>{it.doplnek}</span></>}</td>
                            <td className="num">{it.mnozstvi}</td><td className="num">{fmtCZK(it.cena)}</td>
                            <td>{n ? `${n.mnozstvi} ${t("ks à", "pcs at")} ${fmtCZK(n.cena)}` : <span style={{ color: "var(--muted)" }}>{t("zatím nepodána", "not submitted yet")}</span>}</td>
                          </tr>);
                      })}</tbody>
                    </table></div>
                  )}
                </div>
              </>
            );
          })()}

          {/* ============ ZPROSTŘEDKOVATEL: nástěnka ============ */}
          {view === "prehled" && user.role === "admin" && (() => {
            const otevrene = demands.filter((d) => d.stav === "otevrena");
            const cekajiciNabidky = otevrene.reduce((s, d) => s + d.polozky.reduce((s2, it) => s2 + it.nabidky.filter((n) => n.stav === "podana" || n.stav === "castecne").length, 0), 0);
            const nevyrizene = pozadavky.filter((p) => p.stav === "prijata");
            const noveObj = orders.filter((o) => o.stav === "nova");
            const kExpedici = orders.filter((o) => o.stav === "potvrzena");
            const expirujici = products.filter((p) => ["brzy", "prosla"].includes(expState(p.expirace)));
            const blacklistPolozky = products.filter((p) => jeBlacklist(p.sukl));
            const cekaPotvrzeni = users.filter((u) => u.potvrzen === false);
            return (
              <>
                <h1>{t("Přehled", "Dashboard")}</h1>
                <p className="sub">{t("Souhrn dění v portálu — požadavky, poptávky, objednávky a položky vyžadující pozornost.",
                                      "A summary of portal activity — requests, RFQs, orders and items needing attention.")}</p>
                <div className="stats">
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n" style={{ color: nevyrizene.length ? "var(--brand-dk)" : undefined }}>{nevyrizene.length}</div><div className="c">{t("Nevyřízené požadavky odběratelů", "Pending buyer requests")}</div></div>
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n">{otevrene.length}</div><div className="c">{t("Otevřené poptávky", "Open RFQs")}</div></div>
                  <div className="stat" onClick={() => setView("poptavky")}><div className="n" style={{ color: cekajiciNabidky ? "var(--brand-dk)" : undefined }}>{cekajiciNabidky}</div><div className="c">{t("Nabídky k vyhodnocení", "Offers to evaluate")}</div></div>
                  <div className="stat" onClick={() => setView("objednavky")}><div className="n" style={{ color: noveObj.length ? "var(--brand-dk)" : undefined }}>{noveObj.length}</div><div className="c">{t("Nové objednávky k potvrzení", "New orders to confirm")}</div></div>
                  <div className="stat" onClick={() => setView("objednavky")}><div className="n" style={{ color: kExpedici.length ? "var(--amber)" : undefined }}>{kExpedici.length}</div><div className="c">{t("Potvrzené — k expedici", "Confirmed — to dispatch")}</div></div>
                  <div className="stat" onClick={() => setView("produkty")}><div className="n" style={{ color: expirujici.length ? "var(--red)" : undefined }}>{expirujici.length}</div><div className="c">{t("Krátká / prošlá expirace", "Short / expired shelf life")}</div></div>
                  <div className="stat" onClick={() => setView("produkty")}><div className="n" style={{ color: blacklistPolozky.length ? "var(--red)" : undefined }}>{blacklistPolozky.length}</div><div className="c">{t("Položky s vývozním omezením ⚑", "Items with export restriction ⚑")}</div></div>
                  <div className="stat" onClick={() => setView("uzivatele")}><div className="n" style={{ color: cekaPotvrzeni.length ? "var(--amber)" : undefined }}>{cekaPotvrzeni.length}</div><div className="c">{t("Účty čekající na potvrzení", "Accounts awaiting confirmation")}</div></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 16 }}>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Nevyřízené požadavky odběratelů", "Pending buyer requests")}</b><div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("poptavky")}>{t("Všechny", "All")}</button></div>
                    {!nevyrizene.length && <div className="empty">{t("Žádné nevyřízené požadavky.", "No pending requests.")}</div>}
                    {nevyrizene.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Odběratel", "Buyer")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th></tr></thead>
                        <tbody>{nevyrizene.slice(0, 5).map((p) => (
                          <tr key={p.cislo} className={jeBlacklist(p.sukl) ? "bl" : undefined}>
                            <td className="mono"><b>{p.cislo}</b></td>
                            <td>{(odberatele[p.odbKod] || {}).nazev}</td>
                            <td>{jeBlacklist(p.sukl) && "⚑ "}{p.nazev}</td><td className="num">{p.mnozstvi}</td>
                          </tr>))}</tbody>
                      </table></div>
                    )}
                  </div>
                  <div className="card">
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Poslední objednávky", "Recent orders")}</b><div className="spacer" />
                      <button className="btn sec mini" onClick={() => setView("objednavky")}>{t("Všechny", "All")}</button></div>
                    {!orders.length && <div className="empty">{t("Zatím žádné objednávky.", "No orders yet.")}</div>}
                    {orders.length > 0 && (
                      <div className="table-wrap"><table>
                        <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Odběratel", "Buyer")}</th><th className="num">{t("Celkem", "Total")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                        <tbody>{orders.slice(0, 5).map((o) => (
                          <tr key={o.cislo}>
                            <td className="mono"><button className="link" onClick={() => setDetail(o)}><b>{o.cislo}</b></button></td>
                            <td>{o.odberatel.nazev}</td><td className="num">{fmtCZK(o.celkem)}</td>
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
          {/* ============ ODBĚRATEL: stav objednávek ============ */}
          {view === "stav" && user.role === "odberatel" && (() => {
            const moje = pozadavky.filter((p) => p.odbKod === user.kod);
            /* zboží, které se pro odběratele fyzicky pohybuje */
            const zbozi = products.filter((x) => x.odbKod === user.kod);
            const stavPoz = (p) => {
              const dodane = zbozi.filter((z) => z.sukl === p.sukl);
              if (p.stav === "vyrizena" || dodane.some((z) => pohybStav(z) === "expedovano")) return "expedovano";
              if (dodane.some((z) => pohybStav(z) === "prijato")) return "prijato";
              if (dodane.length) return "zajisteno";
              return "zpracovava";
            };
            const POPIS = {
              zpracovava: { cs: "zpracováváme", en: "processing", pill: "nova" },
              zajisteno: { cs: "zajištěno u dodavatele", en: "secured from supplier", pill: "brzy" },
              prijato: { cs: "u nás — chystáme k odeslání", en: "with us — preparing dispatch", pill: "brzy" },
              expedovano: { cs: "odesláno", en: "dispatched", pill: "ok" },
            };
            return (
              <>
                <h1>{t("Stav objednávek", "Order status")}</h1>
                <p className="sub">{t("Přehled toho, co pro vás zajišťujeme. Novou položku objednáte v záložce Nová objednávka — objednávka je závazná od odeslání, katalog ani sklad k výběru nemáme.",
                                      "An overview of what we are securing for you. Order a new item under New order — the order is binding from the moment you submit it; we keep no catalogue or stock to pick from.")}</p>
                <div className="card">
                  <div className="toolbar">
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{moje.length} {t("položek", "items")}</span>
                    <div className="spacer" />
                    <button className="btn mini" onClick={() => setView("pozadavky")}>{t("+ Nová objednávka", "+ New order")}</button>
                  </div>
                  {!moje.length && <div className="empty">{t("Zatím nemáte žádnou objednávku.", "You have no orders yet.")}</div>}
                  <div className="table-wrap"><table>
                    <thead><tr>
                      <th>{t("Číslo", "Number")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th>
                      <th className="num">{t("Max. cena/ks", "Max. price/pc")}</th><th>{t("Šarže / expirace", "Batch / expiry")}</th><th>{t("Stav", "Status")}</th>
                    </tr></thead>
                    <tbody>
                      {moje.map((p) => {
                        const s = stavPoz(p);
                        const dodane = zbozi.filter((z) => z.sukl === p.sukl);
                        return (
                          <tr key={p.cislo}>
                            <td className="mono"><b>{p.cislo}</b>{p.davka && <><br /><span className="pill kod">{p.davka}</span></>}</td>
                            <td><b>{p.nazev}</b>{p.doplnek && <><br /><span style={{ color: "var(--muted)", fontSize: 12.5 }}>{p.doplnek}</span></>}</td>
                            <td className="num">{p.mnozstvi}</td>
                            <td className="num">{p.maxCena ? fmtCZK(p.maxCena) : "—"}</td>
                            <td style={{ fontSize: 13 }}>{dodane.length
                              ? dodane.map((z) => <div key={z.id}><span className="mono">{z.sarze || "—"}</span> · {fmtDate(z.expirace)} · {z.ks} {t("ks", "pcs")}</div>)
                              : <span style={{ color: "var(--muted)" }}>—</span>}</td>
                            <td><span className={"pill " + POPIS[s].pill}>{POPIS[s][lang] || POPIS[s].cs}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table></div>
                </div>
              </>
            );
          })()}

          {/* ============ HISTORIE / OBJEDNÁVKY ============ */}
          {(view === "historie" || view === "objednavky") && (
            <>
              <h1>{user.role === "odberatel" ? t("Historie objednávek", "Order history") : t("Objednávky", "Orders")}</h1>
              <p className="sub">
                {user.role === "odberatel" && t("Archiv vašich objednávek. Předchozí nákup můžete jedním kliknutím zopakovat.", "An archive of your orders. Repeat a previous purchase with one click.")}
                {user.role === "admin" && t("Objednávky odběratelů — potvrzením a expedicí je vyřizuje zprostředkovatel. Na dodacím listu je vždy Pharmodeco.",
                                            "Buyers' orders — confirmed and dispatched by the intermediary. The delivery note always shows Pharmodeco.")}
              </p>
              <div className="card">
                <div className="table-wrap">
                  <table>
                    <thead><tr>
                      <th>{t("Číslo", "Number")}</th><th>{t("Datum", "Date")}</th>{user.role !== "odberatel" && <th>{t("Odběratel", "Buyer")}</th>}
                      <th className="num">{t("Položek", "Items")}</th><th className="num">{t("Celkem", "Total")}</th><th>{t("Stav", "Status")}</th><th></th>
                    </tr></thead>
                    <tbody>
                      {mojeObjednavky.map((o) => (
                        <tr key={o.cislo}>
                          <td className="mono"><b>{o.cislo}</b></td>
                          <td>{fmtDate(o.datum)}</td>
                          {user.role !== "odberatel" && <td>{o.odberatel.nazev} <span className="pill kod">{o.odbKod}</span></td>}
                          <td className="num">{o.items.length}</td>
                          <td className="num">{fmtCZK(o.celkem)}</td>
                          <td><span className={"pill " + o.stav}>{STAV_LABEL[o.stav]}</span></td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <button className="link" onClick={() => setDetail(o)}>{t("Dodací list", "Delivery note")}</button>
                            {user.role === "odberatel" && <> · <button className="link" onClick={() => objednatZnovu(o)}>{t("Objednat znovu", "Order again")}</button></>}
                            {user.role === "admin" && o.stav === "nova" && <> · <button className="link" onClick={() => zmenStav(o, "potvrzena")}>{t("Potvrdit", "Confirm")}</button></>}
                            {user.role === "admin" && o.stav === "potvrzena" && <> · <button className="link" onClick={() => zmenStav(o, "expedovana")}>{t("Expedovat", "Dispatch")}</button></>}
                          </td>
                        </tr>
                      ))}
                      {!mojeObjednavky.length && <tr><td colSpan={7} className="empty">
                        {t("Zatím žádné objednávky.", "No orders yet.")}</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ============ ODBĚRATEL: moje poptávky ============ */}
          {view === "pozadavky" && user.role === "odberatel" && (() => {
            const moje = pozadavky.filter((p) => p.odbKod === user.kod);
            const dopor = novyPozadavek ? doporucenaCena(novyPozadavek.sukl, products) : null;
            return (
              <>
                <h1>{t("Nová objednávka", "New order")}</h1>

                {(() => {
                  /* nabídky většího množství, které na odběratele čekají */
                  const nabidky = [];
                  demands.forEach((d) => d.polozky.forEach((it) => {
                    const nv = it.navrhOdb;
                    if (nv && nv.stav === "odeslan" && nv.odbKod === user.kod && !navrhPropadl(nv)) nabidky.push({ d, it, nv });
                  }));
                  if (!nabidky.length) return null;
                  return (
                    <div className="card" style={{ marginBottom: 16, border: "2px solid var(--brand)" }}>
                      <div className="toolbar">
                        <b style={{ fontSize: 14 }}>{t("Nabídka většího množství", "Offer of a larger quantity")}</b>
                        <span className="pill kod">{nabidky.length}</span>
                      </div>
                      {nabidky.map(({ d, it, nv }) => (
                        <div key={d.cislo + it.id} className="pad" style={{ borderTop: "1px solid var(--line)" }}>
                          <b>{it.nazev}</b> {it.doplnek && <span style={{ color: "var(--muted)", fontSize: 13 }}>{it.doplnek}</span>}
                          <div style={{ fontSize: 13.5, color: "var(--muted)", margin: "4px 0 10px" }}>
                            {t("objednáno", "ordered")} {(it.zdroje || []).find((z) => z.odbKod === user.kod)?.mnozstvi} {t("ks", "pcs")}
                            {" · "}{t("nabídka platí do", "offer valid until")} {fmtDate(nv.platnost)}
                            {nv.pozn && <> · „{nv.pozn}“</>}
                          </div>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                            {nv.hladiny.map((h, i) => (
                              <button key={i} className="btn mini" onClick={() => prijmiNavrhOdb(d, it, i)}>
                                {t(`Navýšit na ${h.ks} ks à ${fmtCZK(h.cena)}`, `Increase to ${h.ks} pcs at ${fmtCZK(h.cena)}`)}</button>
                            ))}
                            <button className="btn sec mini" onClick={() => odmitniNavrhOdb(d, it)}>{t("Zůstat u původního množství", "Keep the original quantity")}</button>
                            <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{t("přijetím se objednávka závazně navýší", "accepting increases the order bindingly")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                <p className="sub">{t("Uveďte položku, počet kusů a nejvyšší cenu, kterou jste ochotni zaplatit. Odesláním vzniká závazná objednávka — zboží pro vás teprve sháníme, žádný katalog k výběru nemáme. Průběh sledujte v záložce Stav objednávek.",
                                      "State the item, the quantity and the highest price you are willing to pay. Submitting creates a binding order — we source the goods for you; there is no catalogue to pick from. Track progress under Order status.")}</p>
                <div className="card">
                  <div className="toolbar">
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{moje.length} {t("poptávek", "requests")}</span>
                    <div className="spacer" />
                    <button className="btn sec mini" onClick={() => { const f = stahniVzorPoptavky(lang); flash(f === "xlsx" ? t("Vzorový soubor PORT-poptavka-vzor.xlsx byl stažen.", "The template PORT-poptavka-vzor.xlsx has been downloaded.") : t("Stažen vzor ve formátu CSV — otevřete jej v Excelu a uložte jako .xlsx.", "Template downloaded as CSV — open it in Excel and save as .xlsx.")); }}>{t("⬇ Stáhnout vzorový Excel", "⬇ Download Excel template")}</button>
                    <button className="btn sec mini" onClick={() => importRef.current && importRef.current.click()}>{t("⬆ Nahrát vyplněný Excel", "⬆ Upload filled-in Excel")}</button>
                    <input ref={importRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: "none" }}
                      onChange={(e) => { const f = e.target.files && e.target.files[0]; e.target.value = ""; nactiExcel(f); }} />
                    <button className="btn mini" onClick={() => { setImportNahled(null); setNovyPozadavek({ nazev: "", doplnek: "", sukl: "", mnozstvi: "", maxCena: "", sarze: "", minExpMesice: 6, minExp: "", pozn: "" }); }}>{t("+ Jedna položka", "+ Single item")}</button>
                  </div>
                  {novyPozadavek && (
                    <div className="form">
                      <label style={lbl}>{t("Kód SÚKL (našeptávač)", "SÚKL code (autocomplete)")}<br />
                        <input type="text" list="sukl-list" style={{ width: 150 }} value={novyPozadavek.sukl}
                          onChange={(e) => setNovyPozadavek(doplnZCiselniku(novyPozadavek, "sukl", e.target.value))} /></label>
                      <label style={lbl}>{t("Název položky", "Item name")}<br />
                        <input type="text" list="sukl-nazvy" style={{ width: 200 }} value={novyPozadavek.nazev}
                          onChange={(e) => setNovyPozadavek(doplnZCiselniku(novyPozadavek, "nazev", e.target.value))} /></label>
                      <label style={lbl}>{t("Síla / forma / balení", "Strength / form / pack")}<br />
                        <input type="text" list="sukl-doplnky" style={{ width: 230 }} value={novyPozadavek.doplnek}
                          onChange={(e) => setNovyPozadavek(doplnZCiselniku(novyPozadavek, "doplnek", e.target.value))} /></label>
                      <label style={lbl}>{t("Množství (ks)", "Quantity (pcs)")}<br />
                        <input type="number" style={{ width: 90 }} value={novyPozadavek.mnozstvi} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, mnozstvi: e.target.value })} /></label>
                      <label style={lbl}>{t("Max. cena/ks bez DPH", "Max. price/pc excl. VAT")}<br />
                        <input type="number" style={{ width: 130 }} value={novyPozadavek.maxCena} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, maxCena: e.target.value })} /></label>
                      {dopor && <button className="btn sec mini" onClick={() => setNovyPozadavek({ ...novyPozadavek, maxCena: dopor })}>
                        {t(`Doporučená cena ${fmtCZK(dopor)}`, `Recommended price ${fmtCZK(dopor)}`)}</button>}
                      <label style={lbl}>{t("Min. expirace (měsíců)", "Min. shelf life (months)")}<br />
                        <input type="number" style={{ width: 110 }} min="0" placeholder="6" value={novyPozadavek.minExpMesice ?? ""}
                          onChange={(e) => setNovyPozadavek({ ...novyPozadavek, minExpMesice: e.target.value, minExp: "" })} /></label>
                      <label style={lbl}>{t("nebo konkrétní datum", "or a specific date")}<br />
                        <input type="date" value={novyPozadavek.minExp} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, minExp: e.target.value, minExpMesice: "" })} /></label>
                      <label style={lbl}>{t("Šarže (pokud požadujete)", "Batch (if required)")}<br />
                        <input type="text" className="mono" style={{ width: 110 }} value={novyPozadavek.sarze} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, sarze: e.target.value })} /></label>
                      <label style={lbl}>{t("Poznámka", "Note")}<br />
                        <input type="text" style={{ width: 220 }} value={novyPozadavek.pozn} onChange={(e) => setNovyPozadavek({ ...novyPozadavek, pozn: e.target.value })} /></label>
<label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, cursor: "pointer", width: "100%" }}>
                        <input type="checkbox" checked={zavaznaPotvrz} onChange={(e) => setZavaznaPotvrz(e.target.checked)} />
                        <b>{t("Podávám závaznou objednávku", "I am placing a binding order")}</b>
                      </label>
                      <button className="btn mini" disabled={!zavaznaPotvrz} onClick={odesliPozadavek}>{t("Odeslat závaznou objednávku", "Send binding order")}</button>
                      <button className="btn sec mini" onClick={() => setNovyPozadavek(null)}>{t("Zrušit", "Cancel")}</button>
                    </div>
                  )}
                  {importNahled && (() => {
                    const radky = importNahled.radky.map(zkontrolujRadek);
                    const okPocet = radky.filter((r) => !r.chyby.length).length;
                    const celkem = radky.reduce((s, r) => s + (Number(r.mnozstvi) || 0) * (Number(r.maxCena) || 0), 0);
                    return (
                      <div className="pad" style={{ borderBottom: "1px solid var(--line)", background: "var(--tint)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                          <b style={{ fontSize: 14 }}>{t("Náhled importu", "Import preview")}</b>
                          <span className="pill kod mono">{importNahled.soubor}</span>
                          <span className="pill ok">{t(`${okPocet} k odeslání`, `${okPocet} ready`)}</span>
                          {okPocet < radky.length && <span className="pill brzy">{t(`${radky.length - okPocet} k doplnění`, `${radky.length - okPocet} incomplete`)}</span>}
                          <span style={{ fontSize: 13, color: "var(--muted)" }}>{t("orientační hodnota při max. cenách", "indicative value at max. prices")}: <b>{fmtCZK(celkem)}</b></span>
                        </div>
                        <p className="sub" style={{ marginTop: 0 }}>{t("Řádky lze před odesláním upravit. Neúplné řádky (červeně) se neodešlou — buď je doplňte, nebo odeberte.",
                                                                       "Rows can be edited before submitting. Incomplete rows (red) will not be sent — complete or remove them.")}</p>
                        <div className="table-wrap"><table>
                          <thead><tr><th>#</th><th>SÚKL</th><th>{t("Produkt (název, síla, forma, balení)", "Product (name, strength, form, pack)")}</th>
                            <th className="num">{t("Max. cena/ks", "Max. price/pc")}</th><th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Min. ks/šarže", "Min. pcs/batch")}</th>
                            <th>{t("Min. expirace", "Min. shelf life")}</th><th>{t("Poznámka", "Note")}</th><th></th></tr></thead>
                          <tbody>
                            {radky.map((r, i) => (
                              <tr key={i} style={r.chyby.length ? { background: "var(--red-bg)" } : undefined}>
                                <td className="mono" style={{ color: "var(--muted)" }}>{i + 1}</td>
                                <td><input type="text" list="sukl-list" className="mono" style={{ width: 100 }} value={r.sukl}
                                  onChange={(e) => upravImport(i, "sukl", e.target.value)} /></td>
                                <td><input type="text" list="sukl-nazvy" style={{ width: 280 }} value={r.produkt !== undefined ? r.produkt : celyNazev(r)}
                                  onChange={(e) => upravImport(i, "produkt", e.target.value)} />
                                  {r.sukl && suklInfo(r.sukl) && (
                                    <div style={{ fontSize: 12, color: "var(--ok)" }}>→ {r.nazev} {r.doplnek}</div>)}
                                  {r.varovani.map((v, k) => (
                                    <div key={k} style={{ fontSize: 12, color: "var(--amber)" }}>
                                      {IMPORT_HLASKA[v[0]]}{v[0] === "nazev" ? ` (${v[1]} → ${v[2]})` : ""}
                                    </div>))}
                                  {r.chyby.map((c) => <div key={c} style={{ fontSize: 12, color: "var(--red)" }}>{IMPORT_HLASKA[c]}</div>)}
                                </td>
                                <td className="num"><input type="number" style={{ width: 100 }} value={r.maxCena}
                                  onChange={(e) => upravImport(i, "maxCena", e.target.value)} /></td>
                                <td className="num"><input type="number" style={{ width: 80 }} value={r.mnozstvi}
                                  onChange={(e) => upravImport(i, "mnozstvi", e.target.value)} /></td>
                                <td className="num"><input type="number" style={{ width: 80 }} value={r.minKsSarze}
                                  onChange={(e) => upravImport(i, "minKsSarze", e.target.value)} /></td>
                                <td style={{ fontSize: 13 }}>{minExpText(r) || t("min. 6 měs.", "min. 6 mo.")}</td>
                                <td style={{ fontSize: 13, color: "var(--muted)" }}>{r.pozn}</td>
                                <td><button className="btn danger mini" onClick={() => odeberImport(i)}>{t("Odebrat", "Remove")}</button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table></div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, cursor: "pointer", width: "100%", marginBottom: 4 }}>
                            <input type="checkbox" checked={zavaznaPotvrz} onChange={(e) => setZavaznaPotvrz(e.target.checked)} />
                            <b>{t("Podávám závaznou objednávku", "I am placing a binding order")}</b>
                          </label>
                          <button className="btn mini" disabled={!zavaznaPotvrz} onClick={odesliImport}>{t(`Odeslat závazně (${okPocet} položek)`, `Submit bindingly (${okPocet} items)`)}</button>
                          <button className="btn sec mini" onClick={() => setImportNahled(null)}>{t("Zrušit import", "Cancel import")}</button>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="table-wrap"><table>
                    <thead><tr><th>{t("Číslo", "Number")}</th><th>{t("Datum", "Date")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th><th>{t("Min. expirace", "Min. shelf life")}</th><th>{t("Stav", "Status")}</th></tr></thead>
                    <tbody>
                      {moje.map((p) => (
                        <tr key={p.cislo}>
                          <td className="mono"><b>{p.cislo}</b>{p.davka && <><br /><span className="pill kod">{p.davka}</span></>}</td><td>{fmtDate(p.datum)}</td>
                          <td><b>{p.nazev}</b>{p.doplnek && <span style={{ color: "var(--muted)", fontSize: 13 }}> {p.doplnek}</span>}
                            {p.maxCena && <><br /><span style={{ color: "var(--muted)", fontSize: 13 }}>{t("max.", "max.")} {fmtCZK(p.maxCena)}/{t("ks", "pc")}</span></>}
                            {p.sarze && <><br /><span style={{ color: "var(--muted)", fontSize: 13 }}>{t("šarže", "batch")} <span className="mono">{p.sarze}</span></span></>}
                            {p.pozn && <><br /><span style={{ color: "var(--muted)", fontSize: 13 }}>{p.pozn}</span></>}</td>
                          <td className="num">{p.mnozstvi}</td>
                          <td style={{ fontSize: 13 }}>{minExpText(p) || "—"}</td>
                          <td><span className={"pill " + (p.stav === "vyrizena" ? "ok" : "nova")}>
                            {p.stav === "vyrizena" ? t("vyřízena — položka je v objednávce", "fulfilled — item is in your order form") : t("přijata", "received")}</span></td>
                        </tr>
                      ))}
                      {!moje.length && <tr><td colSpan={6} className="empty">{t("Zatím žádné poptávky.", "No requests yet.")}</td></tr>}
                    </tbody>
                  </table></div>
                </div>
              </>
            );
          })()}

          {/* ============ ZPROSTŘEDKOVATEL: centrální tabulka ============ */}
          {view === "produkty" && user.role === "admin" && (() => {
            return (
              <>
                <h1>{t("Zboží v pohybu", "Goods in transit")}</h1>
                <p className="sub">{t("Každý řádek je konkrétní nákup pro konkrétní objednávku — Pharmodeco nedrží zásobu. Zboží prochází třemi stavy: objednáno u dodavatele, převzato od dodavatele, expedováno odběrateli. Odběratel vidí pouze prodejní cenu — nikdy nákup, marži ani příznak vývozního omezení.",
                                      "Every row is a specific purchase for a specific order — Pharmodeco holds no stock. Goods move through three states: ordered from the supplier, received from the supplier, dispatched to the buyer. Buyers only ever see the selling price — never the purchase price, margin or export-restriction flag.")}</p>
                <div className="card">
                  <div className="toolbar">
                    <input className="search" type="text" placeholder={t("Hledat…", "Search…")} value={hledat} onChange={(e) => setHledat(e.target.value)} />
                    <button className="btn sec mini" onClick={exportProdukty}>{t("Export XLS", "Export XLS")}</button>
                    <button className="btn sec mini" onClick={resetDemo}>{t("Obnovit demo data", "Reset demo data")}</button>
                  </div>
                  <div className="pad" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", borderBottom: "1px solid var(--line)" }}>
                    {[["vse", t("Vše", "All")], ["objednano", t("Čeká na dodavatele", "Awaiting supplier")],
                      ["prijato", t("U nás — k expedici", "With us — to dispatch")], ["expedovano", t("Expedováno", "Dispatched")]].map(([k, popis]) => {
                      const pocet = k === "vse" ? products.length : products.filter((x) => pohybStav(x) === k).length;
                      return (
                        <button key={k} className={"btn " + (pohybFiltr === k ? "" : "sec ") + "mini"} onClick={() => setPohybFiltr(k)}>
                          {popis} <span className="pill kod">{pocet}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="table-wrap">
                    <table className="pohyb">
                      <thead><tr>
                        <th style={{ width: "30%" }}>{t("Položka", "Item")}</th>
                        <th style={{ width: 150 }}>{t("Šarže / expirace", "Batch / expiry")}</th>
                        <th style={{ width: 70 }}>{t("Ks", "Qty")}</th>
                        <th style={{ width: 210 }}>{t("Nákup / marže / prodej", "Buy / margin / sell")}</th>
                        <th style={{ width: 220 }}>{t("Stav a akce", "Status and action")}</th>
                      </tr></thead>
                      <tbody>
                        {mojeProdukty.filter((p) => pohybFiltr === "vse" || pohybStav(p) === pohybFiltr).map((p) => {
                          const bl = jeBlacklist(p.sukl);
                          const st = expState(p.expirace);
                          const ps = pohybStav(p);
                          return (
                            <tr key={p.id} className={bl ? "bl" : undefined}>
                              <td>
                                <b style={{ fontSize: 14.5 }}>{p.nazev}</b>{bl && <> <span className="pill prosla" title={blacklistDuvod(p.sukl, lang)}>⚑</span></>}
                                {p.doplnek && <><br /><span style={{ color: "var(--muted)", fontSize: 12.5 }}>{p.doplnek}</span></>}
                                <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--line)", fontSize: 12, color: "var(--muted)" }}>
                                  <span className="mono">{p.sukl}</span>{p.atc ? <> · <span className="mono">{p.atc}</span></> : null}
                                  {p.vyrobce && <><br />{p.vyrobce}</>}
                                </div>
                                {bl && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 4 }}>{blacklistDuvod(p.sukl, lang)}</div>}</td>
                              <td style={{ textAlign: "left", paddingLeft: 6 }}>
                                <input type="text" className="mono" style={{ width: 100 }} value={p.sarze} placeholder={t("šarže", "batch")}
                                  onChange={(e) => upravPole(p.id, "sarze", e.target.value)} />
                                <br /><input type="date" style={{ width: 132, marginTop: 4 }} value={p.expirace || ""} onChange={(e) => upravPole(p.id, "expirace", e.target.value)} />
                                {st === "brzy" && <><br /><span className="pill brzy">{t("< 6 měs.", "< 6 mo.")}</span></>}
                                {st === "prosla" && <><br /><span className="pill prosla">{t("prošlá", "expired")}</span></>}</td>
                              <td style={{ textAlign: "left", paddingLeft: 6, fontWeight: 700 }}>{p.ks}</td>
                              <td style={{ background: "var(--tint)", whiteSpace: "nowrap" }}>
                                {/* ceny jsou dané: nákup z akceptované nabídky, prodej = max. cena odběratele */}
                                <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "4px 12px", alignItems: "baseline", fontSize: 12.5, color: "var(--muted)" }}>
                                  <span>{t("nákup", "buy")}</span><span style={{ textAlign: "right", color: "var(--ink)" }}>{fmtCZK(p.nakupCena)}</span>
                                  <span>{t("marže", "margin")}</span><span style={{ textAlign: "right", color: "var(--ink)" }}>{fmtPct(marzePct(p))}</span>
                                  <span style={{ color: "var(--ink)", fontWeight: 700 }}>{t("prodej", "sell")}</span>
                                  <span style={{ textAlign: "right", fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{fmtCZK(p.cena)}</span>
                                </div></td>
                              <td>
                                <span className={"pill " + POHYB_LABEL[ps].pill}>{POHYB_LABEL[ps][lang] || POHYB_LABEL[ps].cs}</span>
                                {p.datumPrijem && <><br /><span style={{ fontSize: 12, color: "var(--muted)" }}>{t("převzato", "received")} {fmtDate(p.datumPrijem)}</span></>}
                                {p.datumExpedice && <><br /><span style={{ fontSize: 12, color: "var(--muted)" }}>{t("expedováno", "dispatched")} {fmtDate(p.datumExpedice)}</span></>}
                                <div style={{ marginTop: 6, whiteSpace: "nowrap" }}>
                                  {ps === "objednano" && <><button className="btn mini" onClick={() => posunPohyb(p, "prijato")}>{t("Převzato", "Received")}</button>{" "}</>}
                                  {ps === "prijato" && <><button className="btn mini" onClick={() => posunPohyb(p, "expedovano")}>{t("Expedovat", "Dispatch")}</button>{" "}</>}
                                  <button className="btn danger mini" onClick={() => smazProdukt(p.id)}>{t("Smazat", "Delete")}</button>
                                </div>
                                <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid var(--line)", fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap" }}>
                                  {t("od", "from")} <span className="pill kod">{p.dodKod}</span>{" "}
                                  {t("komu", "to")} <span className="pill kod">{p.odbKod}</span>
                                  {p.pozCislo && <><br /><span className="mono" style={{ fontSize: 11.5 }}>{p.pozCislo}</span></>}
                                </div></td>
                            </tr>
                          );
                        })}
                        {!mojeProdukty.length && <tr><td colSpan={5} className="empty">{t("Žádná položka neodpovídá hledání.", "No items match your search.")}</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            );
          })()}

          {/* ============ ZPROSTŘEDKOVATEL: poptávky a nabídky ============ */}
          {view === "poptavky" && user.role === "admin" && (() => {
            const nevyrizene = pozadavky.filter((p) => p.stav === "prijata");
            const filtr = demands.filter((d) => {
              if (!hledatPop.trim()) return true;
              const q = hledatPop.toLowerCase();
              return d.cislo.toLowerCase().includes(q)
                || d.polozky.some((p) => [p.nazev, p.sukl, p.doplnek].some((v) => (v || "").toLowerCase().includes(q)));
            });
            const stran = Math.max(1, Math.ceil(filtr.length / STRANKA));
            const strankaAkt = Math.min(strana, stran);
            const zobrazene = filtr.slice((strankaAkt - 1) * STRANKA, strankaAkt * STRANKA);
            const vybranePoz = pozadavky.filter((p) => vybrane[p.cislo] && p.stav === "prijata");

            /* z vybraných požadavků udělá poptávku: stejný SÚKL = jedna položka (množství se sečte,
               limitem je nejnižší max. cena), různé položky = víc položek v jedné poptávce */
            const poptavkaZPozadavku = (rs) => {
              const skupiny = new Map();
              rs.forEach((r) => {
                const klic = r.sukl || (r.nazev + "|" + (r.doplnek || ""));
                if (!skupiny.has(klic)) skupiny.set(klic, []);
                skupiny.get(klic).push(r);
              });
              const provize = 5;
              const mesice = Math.max(0, ...rs.map((r) => Number(r.minExpMesice) || 0)) || null;
              const datumy = rs.map((r) => r.minExp).filter(Boolean).sort();
              const polozky = [...skupiny.values()].map((g, i) => {
                const limity = g.map((r) => r.maxCena).filter(Boolean);
                const limit = limity.length ? Math.min(...limity) : null;
                return {
                  id: i + 1, sukl: g[0].sukl || "", nazev: g[0].nazev, doplnek: g[0].doplnek || "",
                  mnozstvi: g.reduce((s, r) => s + r.mnozstvi, 0),
                  maxProdejni: limit || "", cena: limit ? r2(limit / (1 + provize / 100)) : "",
                  pozadovanaSarze: g.find((r) => r.sarze)?.sarze || "",
                  minKsSarze: Math.max(0, ...g.map((r) => Number(r.minKsSarze) || 0)) || null,
                  zdroje: g.map((r) => ({ odbKod: r.odbKod, pozCislo: r.cislo, mnozstvi: r.mnozstvi, maxCena: r.maxCena || null })),
                };
              });
              setNovaPoptavka({ provize, minExpMesice: mesice || 6, minExp: mesice ? "" : (datumy[datumy.length - 1] || ""), prijemci: [], polozky });
              setVybrane({});
              setPozOtevreno(false);      /* dlouhý seznam požadavků se sbalí, ať je vidět formulář */
              naPoptavku();
            };

            const setPol = (idx, nova) => setNovaPoptavka({ ...novaPoptavka, polozky: novaPoptavka.polozky.map((p, i) => (i === idx ? nova : p)) });

            return (
              <>
                <h1>{t("Poptávky dodavatelům", "RFQs to suppliers")}</h1>
                <p className="sub">{t("Jedna poptávka může obsahovat více položek. Jde dodavatelům anonymně, požadovaná cena = limit odběratele ÷ (1 + provize). Každou položku lze pokrýt postupně od více dodavatelů — každá akceptace vytvoří samostatný skladový řádek se svou nákupní cenou, šarží a expirací.",
                                      "A single RFQ may contain several items. It is sent to suppliers anonymously; target price = buyer's limit ÷ (1 + commission). Each item can be covered from several suppliers — every acceptance creates a separate stock row with its own purchase price, batch and expiry.")}</p>

                {novaPoptavka && (
                  <div className="card karta-draft" ref={poptavkaRef} style={{ marginBottom: 16 }}>
                    <div className="toolbar">
                      <b style={{ fontSize: 14 }}>{t("Rozpracovaná poptávka dodavatelům", "RFQ draft for suppliers")}</b>
                      <span className="pill kod">{novaPoptavka.polozky.length} {t("položek", "items")}</span>
                      <div className="spacer" />
                      <button className="btn mini" onClick={vytvorPoptavku}>{t("Odeslat dodavatelům", "Send to suppliers")}</button>
                    </div>
<div className="form" style={{ display: "block" }}>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "end" }}>
                        <label style={lbl}>{t("Provize %", "Commission %")}<br />
                          <input type="number" style={{ width: 90 }} value={novaPoptavka.provize}
                            onChange={(e) => {
                              const prov = Number(e.target.value) || 0;
                              setNovaPoptavka({
                                ...novaPoptavka, provize: e.target.value,
                                polozky: novaPoptavka.polozky.map((p) => (p.maxProdejni ? { ...p, cena: r2(Number(p.maxProdejni) / (1 + prov / 100)) } : p)),
                              });
                            }} /></label>
                        <label style={lbl}>{t("Min. expirace (měsíců)", "Min. shelf life (months)")}<br />
                          <input type="number" style={{ width: 120 }} min="0" placeholder="6" value={novaPoptavka.minExpMesice ?? ""}
                            onChange={(e) => setNovaPoptavka({ ...novaPoptavka, minExpMesice: e.target.value, minExp: "" })} /></label>
                        <label style={lbl}>{t("nebo konkrétní datum", "or a specific date")}<br />
                          <input type="date" value={novaPoptavka.minExp} onChange={(e) => setNovaPoptavka({ ...novaPoptavka, minExp: e.target.value, minExpMesice: "" })} /></label>
                        {minExpText(novaPoptavka) && <span className="pill kod" style={{ alignSelf: "center" }}>{t("min. expirace", "min. shelf life")}: {minExpText(novaPoptavka)}</span>}
                      </div>

                      <div className="table-wrap" style={{ marginTop: 12 }}>
                        <table className="pohyb">
                          <thead><tr>
                            <th style={{ width: "34%" }}>{t("Položka", "Item")}</th>
                            <th style={{ width: 220 }}>{t("Z objednávky", "From order")}</th>
                            <th style={{ width: 90 }}>{t("Množství", "Quantity")}</th>
                            <th style={{ width: 210 }}>{t("Limit / požadovaná cena", "Limit / target price")}</th>
                            <th style={{ width: 150 }}>{t("Šarže a akce", "Batch and action")}</th>
                          </tr></thead>
                          <tbody>
                            {novaPoptavka.polozky.map((p, idx) => {
                              const bl = jeBlacklist(p.sukl);
                              const objednano = (p.zdroje || []).reduce((s, z) => s + (Number(z.mnozstvi) || 0), 0);
                              /* nad závazek odběratelů nemá smysl poptávat — zbytek by zůstal nám */
                              const nadZavazek = objednano > 0 && Number(p.mnozstvi) > objednano;
                              return (
                              <tr key={idx} style={bl ? { background: "var(--red-bg)" } : undefined}>
                                <td>
                                  <input type="text" list="sukl-nazvy" style={{ width: "100%", maxWidth: 260 }} value={p.nazev}
                                    onChange={(e) => setPol(idx, doplnZCiselniku(p, "nazev", e.target.value))} />
                                  <input type="text" list="sukl-doplnky" style={{ width: "100%", maxWidth: 260, marginTop: 4 }} value={p.doplnek}
                                    placeholder={t("síla / forma / balení", "strength / form / pack")}
                                    onChange={(e) => setPol(idx, doplnZCiselniku(p, "doplnek", e.target.value))} />
                                  <div style={{ marginTop: 4, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                                    <input type="text" list="sukl-list" className="mono" style={{ width: 110 }} value={p.sukl}
                                      placeholder="SÚKL" onChange={(e) => setPol(idx, doplnZCiselniku(p, "sukl", e.target.value))} />
                                    {bl && <span className="pill prosla" title={blacklistDuvod(p.sukl, lang)}>⚑ {t("vývozní omezení", "export restriction")}</span>}
                                  </div>
                                  {bl && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 4 }}>{blacklistDuvod(p.sukl, lang)}</div>}
                                </td>
                                <td style={{ fontSize: 12.5 }}>
                                  {(p.zdroje || []).length ? (p.zdroje || []).map((z) => (
                                    <div key={z.pozCislo || z.odbKod} style={{ marginBottom: 4 }}>
                                      <span className="pill kod">{z.odbKod}</span> {z.mnozstvi} {t("ks", "pcs")}
                                      {z.maxCena ? ` · max ${fmtCZK(z.maxCena)}` : ""}
                                      {z.pozCislo && <><br /><span className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{z.pozCislo}</span></>}
                                    </div>
                                  )) : <span style={{ color: "var(--muted)" }}>{t("vlastní poptávka", "own RFQ")}</span>}
                                  {(p.zdroje || []).length > 1 && <span className="pill nova">{t("sloučená", "merged")}</span>}
                                </td>
                                <td>
                                  <input type="number" className="qty" style={{ width: 82 }} value={p.mnozstvi}
                                    onChange={(e) => setPol(idx, { ...p, mnozstvi: e.target.value })} />
                                  {nadZavazek && (
                                    <div className="warn" style={{ marginTop: 6, padding: "6px 8px", fontSize: 12 }}>
                                      {t(`Nad závazek odběratelů (${objednano} ks) — rozdíl byste kupovali na sebe.`,
                                         `Above the buyer commitment (${objednano} pcs) — you would buy the difference for yourself.`)}
                                    </div>
                                  )}
                                </td>
                                <td style={{ background: "var(--tint)" }}>
                                  <div style={{ display: "grid", gridTemplateColumns: "auto 110px", gap: "5px 8px", alignItems: "center", fontSize: 12.5, color: "var(--muted)" }}>
                                    <span>{t("limit odběratele", "buyer's limit")}</span>
                                    <input type="number" className="qty" style={{ width: 110 }} value={p.maxProdejni}
                                      onChange={(e) => { const lim = Number(e.target.value) || 0; setPol(idx, { ...p, maxProdejni: e.target.value, cena: lim ? r2(lim / (1 + (Number(novaPoptavka.provize) || 0) / 100)) : p.cena }); }} />
                                    <span style={{ color: "var(--ink)", fontWeight: 700 }}>{t("požadovaná cena", "target price")}</span>
                                    <input type="number" className="qty" style={{ width: 110, fontWeight: 700 }} value={p.cena}
                                      onChange={(e) => setPol(idx, { ...p, cena: e.target.value })} />
                                  </div>
                                </td>
                                <td>
                                  <input type="text" className="mono" style={{ width: 110 }} value={p.pozadovanaSarze}
                                    placeholder={t("šarže", "batch")} onChange={(e) => setPol(idx, { ...p, pozadovanaSarze: e.target.value })} />
                                  {novaPoptavka.polozky.length > 1 && (
                                    <div style={{ marginTop: 6 }}>
                                      <button className="btn danger mini" onClick={() => setNovaPoptavka({ ...novaPoptavka, polozky: novaPoptavka.polozky.filter((_, i) => i !== idx) })}>{t("Odebrat", "Remove")}</button>
                                    </div>
                                  )}
                                </td>
                              </tr>);
                            })}
                          </tbody>
                        </table>
                      </div>
                      <button className="btn sec mini" style={{ marginTop: 10 }}
                        onClick={() => setNovaPoptavka({ ...novaPoptavka, polozky: [...novaPoptavka.polozky, prazdnaPolozka(novaPoptavka.polozky.length + 1)] })}>{t("+ Přidat položku", "+ Add item")}</button>

                      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
                        <span style={lbl}>{t("Komu odeslat:", "Send to:")}</span>
                        <label style={{ fontSize: 13.5, display: "flex", gap: 6, alignItems: "center" }}>
                          <input type="checkbox" checked={!(novaPoptavka.prijemci || []).length} onChange={() => setNovaPoptavka({ ...novaPoptavka, prijemci: [] })} />
                          {t("všem dodavatelům", "all suppliers")}
                        </label>
                        {Object.keys(dodavatele).map((k) => (
                          <label key={k} style={{ fontSize: 13.5, display: "flex", gap: 6, alignItems: "center" }}>
                            <input type="checkbox" checked={(novaPoptavka.prijemci || []).includes(k)}
                              onChange={(e) => {
                                const set = new Set(novaPoptavka.prijemci || []);
                                if (e.target.checked) set.add(k); else set.delete(k);
                                setNovaPoptavka({ ...novaPoptavka, prijemci: [...set] });
                              }} />
                            {k} — {dodavatele[k].nazev} <span style={{ color: "var(--muted)" }}>({typLabel(dodavatele[k].typ)})</span>
                          </label>
                        ))}
                      </div>
                      <div className="form-akce">
                        <button className="btn" onClick={vytvorPoptavku}>
                          {t(`Odeslat dodavatelům (${novaPoptavka.polozky.length} položek)`, `Send to suppliers (${novaPoptavka.polozky.length} items)`)}</button>
                        <button className="btn sec mini" onClick={() => { setNovaPoptavka(null); setPozOtevreno(true); }}>{t("Zrušit", "Cancel")}</button>
                        <span style={{ fontSize: 13, color: "var(--muted)" }}>
                          {t("Odešle se anonymně. Položky bez názvu, množství nebo požadované ceny se vynechají.",
                             "Sent anonymously. Items without a name, quantity or target price are skipped.")}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- nevyřízené požadavky odběratelů --- */}
                {nevyrizene.length > 0 && (
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div className="toolbar"><b style={{ fontSize: 14 }}>{t("Nevyřízené požadavky odběratelů", "Pending buyer requests")}</b>
                      <span className="pill kod">{nevyrizene.length}</span>
                      {pozOtevreno && (
                        <button className="btn sec mini" onClick={() => {
                          const vse = nevyrizene.every((x) => vybrane[x.cislo]);
                          const v = {}; if (!vse) nevyrizene.forEach((x) => { v[x.cislo] = true; }); setVybrane(v);
                        }}>{nevyrizene.every((x) => vybrane[x.cislo]) ? t("Zrušit výběr", "Clear selection") : t("Vybrat vše", "Select all")}</button>
                      )}
                      <div className="spacer" />
                      {vybranePoz.length > 0 && (
                        <button className="btn mini" onClick={() => poptavkaZPozadavku(vybranePoz)}>
                          {t(`Vytvořit poptávku z vybraných (${vybranePoz.length})`, `Create RFQ from selected (${vybranePoz.length})`)}</button>
                      )}
                      <button className="btn sec mini" onClick={() => setPozOtevreno(!pozOtevreno)}>
                        {pozOtevreno ? t("Sbalit", "Collapse") : t("Rozbalit", "Expand")}</button>
                    </div>
                    {!pozOtevreno && (
                      <div className="pad" style={{ fontSize: 13.5, color: "var(--muted)" }}>
                        {t(`Seznam je sbalený — ${nevyrizene.length} nevyřízených požadavků. Rozbalte jej, chcete-li do poptávky přidat další položky.`,
                           `The list is collapsed — ${nevyrizene.length} pending requests. Expand it to add more items to the RFQ.`)}
                      </div>
                    )}
                    {pozOtevreno && (
                    <div className="table-wrap scroll"><table>
                      <thead><tr><th></th><th>{t("Číslo", "Number")}</th><th>{t("Odběratel", "Buyer")}</th><th>{t("Položka", "Item")}</th><th className="num">{t("Ks", "Qty")}</th>
                        <th className="num">{t("Max. cena odběratele", "Buyer's max. price")}</th><th>{t("Min. expirace", "Min. shelf life")}</th><th>{t("Poznámka", "Note")}</th><th></th></tr></thead>
                      <tbody>{nevyrizene.map((p) => (
                        <tr key={p.cislo} className={jeBlacklist(p.sukl) ? "bl" : undefined}>
                          <td><input type="checkbox" checked={!!vybrane[p.cislo]} onChange={(e) => setVybrane({ ...vybrane, [p.cislo]: e.target.checked })} title={t("Vybrat do poptávky", "Select for an RFQ")} /></td>
                          <td className="mono"><b>{p.cislo}</b>{p.davka && <><br />
                            <button className="link" title={t("Vybrat celou dávku z Excelu", "Select the whole uploaded batch")}
                              onClick={() => { const v = { ...vybrane }; nevyrizene.filter((x) => x.davka === p.davka).forEach((x) => { v[x.cislo] = true; }); setVybrane(v); }}>
                              <span className="pill kod">{p.davka}</span></button></>}</td>
                          <td>{(odberatele[p.odbKod] || {}).nazev} <span className="pill kod">{p.odbKod}</span></td>
                          <td><b>{jeBlacklist(p.sukl) && "⚑ "}{p.nazev}</b>{p.doplnek && <span style={{ color: "var(--muted)", fontSize: 13 }}> {p.doplnek}</span>}
                            {p.sukl && <span className="mono" style={{ color: "var(--muted)" }}> · {p.sukl}</span>}
                            {jeBlacklist(p.sukl) && <><br /><span style={{ color: "var(--red)", fontSize: 12.5 }}>{blacklistDuvod(p.sukl, lang)}</span></>}</td>
                          <td className="num">{p.mnozstvi}</td>
                          <td className="num">{p.maxCena ? fmtCZK(p.maxCena) : "—"}</td>
                          <td style={{ fontSize: 13 }}>{minExpText(p) || "—"}</td>
                          <td>{p.pozn || "—"}</td>
                          <td><button className="btn mini" onClick={() => poptavkaZPozadavku([p])}>{t("Vytvořit poptávku", "Create RFQ")}</button></td>
                        </tr>))}</tbody>
                    </table></div>
                    )}
                  </div>
                )}

                <div className="card">
                  <div className="toolbar">
                    <input className="search" type="text" placeholder={t("Hledat v poptávkách…", "Search RFQs…")} value={hledatPop}
                      onChange={(e) => { setHledatPop(e.target.value); setStrana(1); }} />
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{filtr.length} {t("poptávek", "RFQs")}</span>
                    <div className="spacer" />
                    <button className="btn sec mini" onClick={() => exportPoptavkyAdmin(filtr)}>{t("Export XLS", "Export XLS")}</button>
                    <button className="btn mini" onClick={() => { setNovaPoptavka({ provize: 5, minExpMesice: 6, minExp: "", prijemci: [], polozky: [prazdnaPolozka(1)] }); setPozOtevreno(false); naPoptavku(); }}>{t("+ Nová poptávka", "+ New RFQ")}</button>
                  </div>

                  {!zobrazene.length && <div className="empty">{t("Žádné poptávky. Vytvořte první tlačítkem výše, nebo z požadavku odběratele.", "No RFQs. Create the first one with the button above, or from a buyer request.")}</div>}
                  <div style={{ padding: zobrazene.length ? "16px 16px 0" : 0 }}>

                  {zobrazene.map((d) => {
                    const hotovych = d.polozky.filter(polozkaPokryta).length;
                    return (
                      <div key={d.cislo} className="poptavka">
                        <div className="hlava" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                          <span className="mono"><b>{d.cislo}</b></span>
                          <span style={{ fontSize: 13.5 }}>{fmtDate(d.datum)} · {t("provize", "commission")} {d.provize} %{minExpText(d) ? ` · ${t("min. expirace", "min. shelf life")} ${minExpText(d)}` : ""}</span>
                          <span className="pill kod">{d.polozky.length} {t("položek · pokryto", "items · covered")} {hotovych}</span>
                          <span className="pill nova">{(d.prijemci || []).length ? `${t("adresáti", "recipients")}: ${d.prijemci.join(", ")}` : t("všem dodavatelům", "all suppliers")}</span>
                          <span className={"pill " + (d.stav === "otevrena" ? "nova" : "expedovana")}>{d.stav === "otevrena" ? t("otevřená", "open") : t("uzavřená", "closed")}</span>
                          <div className="spacer" />
                          {d.stav === "otevrena" && <button className="btn sec mini" onClick={() => uzavriPoptavku(d.cislo)}>{t("Uzavřít", "Close")}</button>}
                        </div>

                        {d.polozky.map((it, ii) => {
                          const pkr = pokryto(it);
                          const zbyvaPokryt = Math.max(0, it.mnozstvi - pkr);
                          const mkey = d.cislo + "-" + it.id;
                          return (
                            <div key={it.id} className="polozka">
                              <div className="hlava" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                                <span className="cislo">{t("položka", "item")} {ii + 1}/{d.polozky.length}</span>
                                <b style={{ fontSize: 15 }}>{jeBlacklist(it.sukl) && "⚑ "}{it.nazev}</b>
                                {it.doplnek && <span style={{ color: "var(--muted)", fontSize: 13 }}>{it.doplnek}</span>}
                                <span className="mono" style={{ color: "var(--muted)" }}>{it.sukl}</span>
                                <span style={{ fontSize: 13.5 }}>{t("požadovaná cena", "target price")} {fmtCZK(it.cena)}/{t("ks", "pc")}
                                  {it.maxProdejni ? ` · ${t("limit odběratele", "buyer's limit")} ${fmtCZK(it.maxProdejni)}` : ""}</span>
                                <span className="pill kod">{t("požadováno", "requested")} {it.mnozstvi} · {t("pokryto", "covered")} {pkr} · {t("zbývá", "remaining")} {zbyvaPokryt}</span>
                                {(it.zdroje || []).map((z) => (
                                  <span key={z.odbKod + (z.pozCislo || "")} className="pill kod">{z.odbKod} · {z.mnozstvi} {t("ks", "pcs")}{z.maxCena ? ` · max ${fmtCZK(z.maxCena)}` : ""}</span>
                                ))}
                                {(it.zdroje || []).length > 1 && <span className="pill nova">{t("sloučená", "merged")}</span>}
                                <div className="spacer" />
                                {d.stav === "otevrena" && (
                                  mnozstviForm[mkey] !== undefined ? (
                                    <>
                                      <input type="number" className="qty" value={mnozstviForm[mkey]} onChange={(e) => setMnozstviForm({ ...mnozstviForm, [mkey]: e.target.value })} />
                                      <button className="btn mini" onClick={() => zmenMnozstvi(d, it)}>{t("Uložit a upozornit", "Save and notify")}</button>
                                      <button className="btn sec mini" onClick={() => setMnozstviForm({ ...mnozstviForm, [mkey]: undefined })}>{t("Zrušit", "Cancel")}</button>
                                    </>
                                  ) : (<>
                                    <button className="btn sec mini" onClick={() => setMnozstviForm({ ...mnozstviForm, [mkey]: it.mnozstvi })}>{t("Změnit množství", "Change quantity")}</button>{" "}
                                    {(() => {
                                      const nv = it.navrhOdb;
                                      const ceka = nv && nv.stav === "odeslan" && !navrhPropadl(nv);
                                      const zdroj0 = (it.zdroje || []).find((z) => z.odbKod === (ceka ? nv.odbKod : ((it.zdroje || [])[0] || {}).odbKod)) || {};
                                      const otevri = () => setNavrhOdbForm({ ...navrhOdbForm, [mkey]: (navrhOdbForm[mkey] || {}).open
                                        ? { open: false }
                                        : { open: true, odbKod: (ceka ? nv.odbKod : ((it.zdroje || [])[0] || {}).odbKod), platnost: ceka ? nv.platnost : platnostZa(3),
                                            pozn: ceka ? nv.pozn : "",
                                            navic: ceka ? String(Math.max(0, nv.hladiny[0].ks - (zdroj0.mnozstvi || 0))) : "",
                                            cena: String(ceka ? nv.hladiny[0].cena : (zdroj0.maxCena || it.maxProdejni || "")) } });
                                      return (<>
                                        <button className="btn sec mini" onClick={otevri}>
                                          {ceka ? t("Upravit nabídku odběrateli", "Amend offer to buyer")
                                            : nv && nv.stav === "prijat" ? t("Nabídnout ještě víc", "Offer even more")
                                            : t("Nabídnout odběrateli víc", "Offer buyer more")}</button>
                                        {ceka && <>{" "}<button className="btn danger mini" onClick={() => stahniNavrhOdb(d, it)}>{t("Stáhnout nabídku", "Withdraw offer")}</button></>}
                                      </>);
                                    })()}
                                  </>)
                                )}
                              </div>

                              {(navrhOdbForm[mkey] || {}).open && (() => {
                                const f = navrhOdbForm[mkey];
                                const zdrojF = (it.zdroje || []).find((z) => z.odbKod === f.odbKod) || (it.zdroje || [])[0] || {};
                                const celkem = (Number(zdrojF.mnozstvi) || 0) + (Number(f.navic) || 0);
                                return (
                                  <div className="pad" style={{ background: "var(--brand-lt)", borderTop: "1px solid var(--line)" }}>
                                    <b style={{ fontSize: 13.5 }}>{t("Nabídka většího množství odběrateli", "Offer of a larger quantity to the buyer")}</b>
                                    <p className="sub" style={{ margin: "4px 0 10px" }}>
                                      {t("Kolik kusů navíc nabízíte. Přijetím se objednávka odběratele závazně navýší — teprve pak smíte odpovídající množství koupit od dodavatele.",
                                         "How many extra pieces you are offering. Accepting increases the buyer's binding order — only then may you buy the matching quantity from the supplier.")}
                                      {" "}{it.navrhOdb && it.navrhOdb.stav === "odeslan"
                                        ? t("Odesláním nahradíte nabídku, která na odběratele čeká.", "Sending replaces the offer currently awaiting the buyer.")
                                        : it.navrhOdb && it.navrhOdb.stav === "prijat"
                                        ? t("Předchozí nabídku už odběratel přijal — tato jde nad rámec navýšeného množství.", "The buyer already accepted the previous offer — this one goes beyond the increased quantity.")
                                        : ""}</p>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
                                      <label style={lbl}>{t("Odběratel", "Buyer")}<br />
                                        <select value={f.odbKod || ""} onChange={(e) => setNavrhOdbForm({ ...navrhOdbForm, [mkey]: { ...f, odbKod: e.target.value } })}>
                                          {(it.zdroje || []).map((z) => <option key={z.odbKod} value={z.odbKod}>{z.odbKod} · {z.mnozstvi} {t("ks", "pcs")}</option>)}
                                        </select></label>
                                      <label style={lbl}>{t("O kolik kusů víc", "How many extra pieces")}<br />
                                        <input type="number" className="qty" value={f.navic || ""}
                                          onChange={(e) => setNavrhOdbForm({ ...navrhOdbForm, [mkey]: { ...f, navic: e.target.value } })} /></label>
                                      <label style={lbl}>{t("Cena/ks bez DPH", "Price/pc excl. VAT")}<br />
                                        <input type="number" style={{ width: 110 }} value={f.cena || ""}
                                          onChange={(e) => setNavrhOdbForm({ ...navrhOdbForm, [mkey]: { ...f, cena: e.target.value } })} /></label>
                                      <div style={{ fontSize: 13, color: "var(--muted)", alignSelf: "center" }}>
                                        {t("celkem po navýšení", "total after increase")}<br /><b style={{ fontSize: 15, color: "var(--ink)" }}>{celkem} {t("ks", "pcs")}</b></div>
                                      <label style={lbl}>{t("Platí do", "Valid until")}<br />
                                        <input type="date" value={f.platnost} onChange={(e) => setNavrhOdbForm({ ...navrhOdbForm, [mkey]: { ...f, platnost: e.target.value } })} /></label>
                                      <label style={lbl}>{t("Vzkaz (volitelné)", "Message (optional)")}<br />
                                        <input type="text" style={{ width: 220 }} value={f.pozn} onChange={(e) => setNavrhOdbForm({ ...navrhOdbForm, [mkey]: { ...f, pozn: e.target.value } })} /></label>
                                      <button className="btn mini" onClick={() => poslatNavrhOdb(d, it)}>{t("Odeslat nabídku", "Send offer")}</button>
                                      <button className="btn sec mini" onClick={() => setNavrhOdbForm({ ...navrhOdbForm, [mkey]: { open: false } })}>{t("Zrušit", "Cancel")}</button>
                                    </div>
                                  </div>
                                );
                              })()}

                              {it.navrhOdb && (
                                <div className="pad" style={{ borderTop: "1px solid var(--line)", fontSize: 13.5 }}>
                                  <span className={"pill " + (it.navrhOdb.stav === "prijat" ? "ok" : it.navrhOdb.stav === "odmitnut" ? "prosla" : "brzy")}>
                                    {it.navrhOdb.stav === "prijat" ? t("odběratel navýšil objednávku", "buyer increased the order")
                                      : it.navrhOdb.stav === "odmitnut" ? t("odběratel nabídku odmítl", "buyer declined the offer")
                                      : navrhPropadl(it.navrhOdb) ? t("nabídka odběrateli propadla", "offer to buyer expired")
                                      : t("čeká na odběratele", "awaiting the buyer")}</span>{" "}
                                  {it.navrhOdb.odbKod} · {hladinyText(it.navrhOdb.hladiny)}
                                  {it.navrhOdb.stav === "odeslan" && ` · ${t("platí do", "valid until")} ${fmtDate(it.navrhOdb.platnost)}`}
                                </div>
                              )}

                              {it.nabidky.length > 0 && (() => {
                                /* nejlevnější použitelná nabídka — pomáhá v rozhodnutí na první pohled */
                                const pouzitelne = it.nabidky.filter((n) => ["podana", "castecne"].includes(n.stav) && n.mnozstvi - (n.akceptovano || 0) > 0);
                                const nejlepsi = pouzitelne.length ? Math.min(...pouzitelne.map((n) => n.cena)) : null;
                                return (
                                <div className="table-wrap" style={{ paddingBottom: 8 }}><table>
                                  <thead><tr>
                                    <th>{t("Dodavatel", "Supplier")}</th>
                                    <th className="num">{t("Cena/ks · marže", "Price/pc · margin")}</th>
                                    <th className="num">{t("Nabízí ks", "Offered qty")}</th>
                                    <th>{t("Expirace", "Expiry")}</th>
                                    <th>{t("Stav", "Status")}</th>
                                  </tr></thead>
                                  <tbody>{it.nabidky.map((n) => {
                                    const key = d.cislo + "-" + it.id + "-" + n.id;
                                    const af = akceptForm[key] || {};
                                    const pf = protiForm[key] || {};
                                    const zbyvaVNabidce = n.mnozstvi - (n.akceptovano || 0);
                                    const strop = Math.min(zbyvaVNabidce, zbyvaPokryt);
                                    const lzeAkceptovat = d.stav === "otevrena" && zbyvaPokryt > 0 && zbyvaVNabidce > 0 && ["podana", "castecne"].includes(n.stav);
                                    const nadLimit = it.maxProdejni && n.cena > it.maxProdejni;
                                    const marze = ((it.maxProdejni || n.cena * (1 + (d.provize || 5) / 100)) / n.cena - 1) * 100;
                                    const podProvizi = marze < (Number(d.provize) || 5) - 0.05;
                                    return (
                                      <React.Fragment key={n.id}>
                                        <tr style={nadLimit ? { opacity: .55 } : undefined}>
                                          <td><b>{(dodavatele[n.dodKod] || {}).nazev || n.dodKod}</b><br />
                                            <span className="mono" style={{ color: "var(--muted)" }}>{n.dodKod}</span>
                                            {n.upravena && <><br /><span className="pill nova">{t("po jednání", "after negotiation")}</span></>}</td>
                                          <td className="num"><b>{fmtCZK(n.cena)}</b>
                                            {nejlepsi !== null && n.cena === nejlepsi && !nadLimit && <><br /><span className="pill ok">{t("nejlevnější", "cheapest")}</span></>}
                                            {nadLimit && <><br /><span className="pill prosla">{t("nad limitem odběratele", "above buyer's limit")}</span></>}
                                            <br /><span style={{ fontSize: 12, color: podProvizi ? "var(--red)" : "var(--muted)", fontWeight: podProvizi ? 700 : 400 }}>
                                              {fmtPct(marze)}{podProvizi ? ` · ${t("pod provizí", "below commission")} ${d.provize} %` : ""}</span></td>
                                          <td className="num">{zbyvaVNabidce}
                                            {n.akceptovano > 0 && <><br /><span className="pill ok">{t("akcept.", "accepted")} {n.akceptovano}</span></>}
                                            {n.moq && <><br /><span className={"pill " + (n.moq > zbyvaPokryt ? "prosla" : "brzy")}>MOQ {n.moq}</span></>}</td>
                                          <td>{fmtDate(n.expirace)}{n.sarze && <><br /><span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{n.sarze}</span></>}</td>
                                          <td style={{ whiteSpace: "nowrap" }}>
                                            {lzeAkceptovat ? (<>
                                              <button className="btn mini" onClick={() => setAkceptForm({ ...akceptForm, [key]: af.open ? {} : { open: true, ks: String(strop), prodej: String(it.maxProdejni || r2(n.cena * (1 + (d.provize || 5) / 100))) } })}>
                                                {af.open ? t("Zavřít", "Close") : t("Vybrat", "Select")}</button>{" "}
                                              <button className="btn sec mini" onClick={() => setProtiForm({ ...protiForm, [key]: pf.open ? { open: false } : { open: true, platnost: platnostZa(2), pozn: "", h: [{ ks: String(zbyvaVNabidce), cena: String(it.cena) }, { ks: "", cena: "" }, { ks: "", cena: "" }] } })}>
                                                {t("Návrh", "Proposal")}</button>{" "}
                                              <button className="btn danger mini" onClick={() => odmitniNabidku(d, it, n)}>{t("Odmítnout", "Reject")}</button>
                                            </>) : (
                                              n.stav === "akceptovana" ? <span className="pill ok">{t("vyčerpaná", "fully accepted")}</span>
                                              : n.stav === "castecne" ? <span className="pill brzy">{t("částečně akceptovaná", "partially accepted")}</span>
                                              : n.stav === "odmitnuta" ? <span className="pill prosla">{t("odmítnuta", "rejected")}</span>
                                              : n.stav === "protinavrh" ? <span className="pill brzy">{t("návrh — čeká na dodavatele", "proposal — awaiting supplier")}</span>
                                              : zbyvaPokryt === 0 ? <span style={{ color: "var(--muted)" }}>{t("závazek pokrytý", "commitment covered")}</span>
                                              : <span style={{ color: "var(--muted)" }}>{t("poptávka uzavřena", "RFQ closed")}</span>
                                            )}
                                          </td>
                                        </tr>

                                        {af.open && lzeAkceptovat && (
                                          <tr><td colSpan={5} style={{ background: "var(--tint)" }}>
                                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", padding: "6px 0" }}>
                                              <b style={{ fontSize: 13 }}>{t("Akceptace a objednávka u dodavatele", "Acceptance and order from the supplier")}</b>
                                              <label style={lbl}>{t("Kusů", "Pieces")}<br />
                                                <input className="qty" type="number" min="1" max={strop} value={af.ks}
                                                  onChange={(e) => setAkceptForm({ ...akceptForm, [key]: { ...af, ks: e.target.value } })} /></label>
                                              <label style={lbl}>{t("Prodejní cena/ks", "Selling price/pc")}<br />
                                                <input style={{ width: 110 }} type="number" value={af.prodej}
                                                  onChange={(e) => setAkceptForm({ ...akceptForm, [key]: { ...af, prodej: e.target.value } })} /></label>
                                              <div style={{ fontSize: 13, color: "var(--muted)" }}>
                                                {t("šarže", "batch")} {n.sarze || "—"} · {t("exp.", "exp.")} {fmtDate(n.expirace)}<br />
                                                {t(`nejvýš ${strop} ks — tolik je závazně objednáno`, `at most ${strop} pcs — that is the firm commitment`)}
                                              </div>
                                              <button className="btn mini" onClick={() => akceptujNabidku(d, it, n)}>{t("Akceptovat a naskladnit", "Accept & stock")}</button>
                                              <button className="btn sec mini" onClick={() => setAkceptForm({ ...akceptForm, [key]: {} })}>{t("Zrušit", "Cancel")}</button>
                                            </div>
                                            {n.moq && n.moq > strop && (
                                              <div className="warn" style={{ marginBottom: 8 }}>
                                                {t(`Min. odběr dodavatele je ${n.moq} ks, závazně objednáno je ${zbyvaPokryt} ks. Nabídněte nejdřív odběrateli větší množství.`,
                                                   `The supplier's MOQ is ${n.moq} pcs but only ${zbyvaPokryt} pcs are firmly ordered. Offer the buyer a larger quantity first.`)}
                                              </div>
                                            )}
                                          </td></tr>
                                        )}

                                        {pf.open && lzeAkceptovat && (() => {
                                          const uprav = (i, pole, v) => setProtiForm({ ...protiForm, [key]: { ...pf, h: pf.h.map((x, j) => (j === i ? { ...x, [pole]: v } : x)) } });
                                          return (
                                          <tr><td colSpan={5} style={{ background: "var(--tint)" }}>
                                            <div style={{ padding: "6px 0" }}>
                                              <b style={{ fontSize: 13 }}>{t("Návrh dodavateli — až tři hladiny", "Proposal to the supplier — up to three tiers")}</b>
                                              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", marginTop: 8 }}>
                                                {pf.h.map((x, i) => (
                                                  <label key={i} style={lbl}>{t(`Hladina ${i + 1} — ks / cena`, `Tier ${i + 1} — pcs / price`)}<br />
                                                    <input type="number" className="qty" value={x.ks} onChange={(e) => uprav(i, "ks", e.target.value)} />{" "}
                                                    <input type="number" style={{ width: 100 }} value={x.cena} onChange={(e) => uprav(i, "cena", e.target.value)} /></label>
                                                ))}
                                                <label style={lbl}>{t("Platí do", "Valid until")}<br />
                                                  <input type="date" value={pf.platnost} onChange={(e) => setProtiForm({ ...protiForm, [key]: { ...pf, platnost: e.target.value } })} /></label>
                                                <label style={lbl}>{t("Vzkaz (volitelné)", "Message (optional)")}<br />
                                                  <input type="text" style={{ width: 200 }} value={pf.pozn} onChange={(e) => setProtiForm({ ...protiForm, [key]: { ...pf, pozn: e.target.value } })} /></label>
                                                <button className="btn mini" onClick={() => poslatProtinavrh(d, it, n)}>{t("Odeslat návrh", "Send proposal")}</button>
                                                <button className="btn sec mini" onClick={() => setProtiForm({ ...protiForm, [key]: { open: false } })}>{t("Zrušit", "Cancel")}</button>
                                              </div>
                                            </div>
                                          </td></tr>);
                                        })()}

                                        {(n.jednani || []).length > 0 && (
                                          <tr><td colSpan={5} style={{ fontSize: 12.5, color: "var(--muted)", paddingTop: 0 }}>
                                            {t("Jednání", "Negotiation")}: {n.jednani.map((j, i) => (
                                              <span key={i}>{i > 0 && " → "}
                                                {j.kdo === "adm" ? t("my", "we") : t("dodavatel", "supplier")}{" "}
                                                {j.hladiny ? hladinyText(j.hladiny) : j.prijato ? `${t("přijal", "accepted")} ${j.prijato.ks} × ${fmtCZK(j.prijato.cena)}` : t("odmítl", "declined")}</span>
                                            ))}
                                          </td></tr>
                                        )}
                                      </React.Fragment>);
                                  })}</tbody>
                                </table></div>);
                              })()}
                              {!it.nabidky.length && <div style={{ padding: "14px 16px", color: "var(--muted)", fontSize: 13.5 }}>{t("Zatím žádná nabídka k této položce.", "No offers for this item yet.")}</div>}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  </div>
                  {stran > 1 && (
                    <div className="pager">
                      <button onClick={() => setStrana(Math.max(1, strankaAkt - 1))} disabled={strankaAkt === 1}>‹</button>
                      {Array.from({ length: stran }, (_, i) => i + 1).map((s) => (
                        <button key={s} className={s === strankaAkt ? "on" : ""} onClick={() => setStrana(s)}>{s}</button>
                      ))}
                      <button onClick={() => setStrana(Math.min(stran, strankaAkt + 1))} disabled={strankaAkt === stran}>›</button>
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {/* ============ DODAVATEL: poptávky a nabídky ============ */}
          {view === "poptavky" && user.role === "dodavatel" && (() => {
            const proMne = demands.filter((d) => (!(d.prijemci || []).length || d.prijemci.includes(user.kod))
              && (d.stav === "otevrena" || d.polozky.some((p) => p.nabidky.some((n) => n.dodKod === user.kod))));
            const filtr = proMne.filter((d) => {
              if (!hledatPop.trim()) return true;
              const q = hledatPop.toLowerCase();
              return d.cislo.toLowerCase().includes(q)
                || d.polozky.some((p) => [p.nazev, p.sukl, p.doplnek].some((v) => (v || "").toLowerCase().includes(q)));
            });
            const stran = Math.max(1, Math.ceil(filtr.length / STRANKA));
            const strankaAkt = Math.min(strana, stran);
            const zobrazene = filtr.slice((strankaAkt - 1) * STRANKA, strankaAkt * STRANKA);
            return (
              <>
                <h1>{t("Poptávky zprostředkovatele", "Intermediary's RFQs")}</h1>
                <p className="sub">{t("Poptávka může obsahovat více položek — nabídku podáváte ke každé zvlášť. Můžete upravit cenu i množství a uvést minimální odběr (MOQ); zprostředkovatel může akceptovat i jen část nabídky.",
                                      "An RFQ may contain several items — you submit an offer for each item separately. You may adjust the price and quantity and state a minimum order quantity (MOQ); the intermediary may accept only part of your offer.")}</p>
                <div className="card">
                  <div className="toolbar">
                    <input className="search" type="text" placeholder={t("Hledat v poptávkách…", "Search RFQs…")} value={hledatPop}
                      onChange={(e) => { setHledatPop(e.target.value); setStrana(1); }} />
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{filtr.length} {t("poptávek", "RFQs")}</span>
                    <div className="spacer" />
                    <button className="btn sec mini" onClick={() => exportPoptavkyDodavatel(filtr)}>{t("Export XLS", "Export XLS")}</button>
                  </div>
                  {!zobrazene.length && <div className="empty">{t("Momentálně nejsou vypsány žádné poptávky.", "There are currently no open RFQs.")}</div>}
                  <div style={{ padding: zobrazene.length ? "16px 16px 0" : 0 }}>
                  {zobrazene.map((d) => (
                    <div key={d.cislo} className="poptavka">
                      <div className="hlava" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                        <span className="mono"><b>{d.cislo}</b></span>
                        <span style={{ fontSize: 13.5 }}>{fmtDate(d.datum)} · {d.polozky.length} {t("položek", "items")}
                          {minExpText(d) ? ` · ${t("min. expirace", "min. shelf life")} ${minExpText(d)}` : ""}</span>
                        <span className={"pill " + (d.stav === "otevrena" ? "nova" : "expedovana")}>{d.stav === "otevrena" ? t("otevřená", "open") : t("uzavřená", "closed")}</span>
                      </div>
                      {d.polozky.map((it, ii) => {
                        const moje = it.nabidky.filter((n) => n.dodKod === user.kod);
                        const formOtevren = nabidkaForm && nabidkaForm.demandCislo === d.cislo && nabidkaForm.polozkaId === it.id;
                        return (
                          <div key={it.id} className="polozka">
                            <div className="hlava" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                              <span className="cislo">{t("položka", "item")} {ii + 1}/{d.polozky.length}</span>
                              <b style={{ fontSize: 15 }}>{it.nazev}</b>
                              {it.doplnek && <span style={{ color: "var(--muted)", fontSize: 13 }}>{it.doplnek}</span>}
                              <span className="mono" style={{ color: "var(--muted)" }}>{it.sukl}</span>
                              <span style={{ fontSize: 13.5 }}>{it.mnozstvi} {t("ks", "pcs")} · {t("požadovaná cena", "target price")} <b>{fmtCZK(it.cena)}</b>/{t("ks", "pc")}
                                {it.pozadovanaSarze ? ` · ${t("šarže", "batch")} ${it.pozadovanaSarze}` : ""}</span>
                              <div className="spacer" />
                              {d.stav === "otevrena" && !moje.some((n) => n.stav !== "odmitnuta") && !formOtevren && (
                                <button className="btn mini" onClick={() => setNabidkaForm({ demandCislo: d.cislo, polozkaId: it.id, cena: it.cena, mnozstvi: it.mnozstvi, moq: "", sarze: "", expirace: "" })}>{t("Podat nabídku", "Submit offer")}</button>
                              )}
                            </div>
                            <div className="pad">
                            {moje.map((n) => (
                              <div key={n.id} style={{ marginTop: 0, fontSize: 14 }}>
                                {t("Vaše nabídka:", "Your offer:")} <b>{n.mnozstvi} {t("ks à", "pcs at")} {fmtCZK(n.cena)}</b>
                                {n.moq ? <> · {t("min. odběr", "MOQ")} {n.moq} {t("ks", "pcs")}</> : null}
                                {n.sarze ? <> · {t("šarže", "batch")} <span className="mono">{n.sarze}</span></> : null}
                                {n.expirace ? ` · ${t("exp.", "exp.")} ${fmtDate(n.expirace)}` : ""}{" "}
                                {n.stav === "akceptovana" ? <span className="pill ok">{t(`akceptováno ${n.akceptovano} ks — připravte ke svozu (út/čt)`, `${n.akceptovano} pcs accepted — prepare for collection (Tue/Thu)`)}</span>
                                  : n.stav === "castecne" ? <span className="pill ok">{t(`akceptováno ${n.akceptovano} z ${n.mnozstvi} ks`, `${n.akceptovano} of ${n.mnozstvi} pcs accepted`)}</span>
                                  : n.stav === "odmitnuta" ? <span className="pill prosla">{t("nevyužita", "not used")}</span>
                                  : n.stav === "protinavrh" ? <span className="pill brzy">{t("protinávrh zprostředkovatele", "intermediary's counter-offer")}</span>
                                  : <span className="pill nova">{t("čeká na vyhodnocení", "awaiting evaluation")}</span>}
                                {n.moq && n.akceptovano > 0 && n.akceptovano < n.moq && (
                                  <div className="warn" style={{ marginTop: 8 }}>
                                    {t(`Akceptované množství (${n.akceptovano} ks) je pod vaším min. odběrem ${n.moq} ks — potvrďte prosím, zda cena platí.`,
                                       `The accepted quantity (${n.akceptovano} pcs) is below your MOQ of ${n.moq} pcs — please confirm whether the price still applies.`)}
                                  </div>
                                )}
                                {n.stav === "protinavrh" && n.proti && (
                                  <div style={{ marginTop: 8, padding: 12, background: "var(--tint)", border: "1px solid var(--line)", borderRadius: 10 }}>
                                    <b>{t("Návrh zprostředkovatele", "Intermediary's proposal")}</b>
                                    {n.proti.platnost && <span style={{ color: "var(--muted)" }}> · {t("platí do", "valid until")} {fmtDate(n.proti.platnost)}</span>}
                                    {n.proti.pozn && <div style={{ color: "var(--muted)", marginTop: 4 }}>„{n.proti.pozn}“</div>}
                                    {navrhPropadl(n.proti) ? (
                                      <div className="warn" style={{ marginTop: 10 }}>{t("Platnost návrhu vypršela.", "The proposal has expired.")}</div>
                                    ) : (
                                      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                                        {(n.proti.hladiny || []).map((h, i) => (
                                          <button key={i} className="btn mini" onClick={() => prijmiProtinavrh(d, it, n, i)}>
                                            {t(`Beru ${h.ks} ks à ${fmtCZK(h.cena)}`, `Take ${h.ks} pcs at ${fmtCZK(h.cena)}`)}</button>
                                        ))}
                                        <button className="btn sec mini" onClick={() => odmitniProtinavrh(d, it, n)}>{t("Odmítnout — nabídku stáhnout", "Decline — withdraw offer")}</button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                            {formOtevren && (
                              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", marginTop: 12, padding: 12, background: "var(--tint)", border: "1px solid var(--line)", borderRadius: 10 }}>
                                <label style={lbl}>{t("Cena/ks bez DPH", "Price/pc excl. VAT")}<br />
                                  <input type="number" style={{ width: 110 }} value={nabidkaForm.cena} onChange={(e) => setNabidkaForm({ ...nabidkaForm, cena: e.target.value })} /></label>
                                <label style={lbl}>{t("Nabízené množství (ks)", "Offered quantity (pcs)")}<br />
                                  <input type="number" style={{ width: 100 }} value={nabidkaForm.mnozstvi} onChange={(e) => setNabidkaForm({ ...nabidkaForm, mnozstvi: e.target.value })} /></label>
                                <label style={lbl}>{t("Min. odběr / MOQ (nepovinné)", "MOQ (optional)")}<br />
                                  <input type="number" style={{ width: 120 }} placeholder={t("bez limitu", "no limit")} value={nabidkaForm.moq} onChange={(e) => setNabidkaForm({ ...nabidkaForm, moq: e.target.value })} /></label>
                                <label style={lbl}>{t("Šarže", "Batch")}<br />
                                  <input type="text" className="mono" style={{ width: 100 }} value={nabidkaForm.sarze} onChange={(e) => setNabidkaForm({ ...nabidkaForm, sarze: e.target.value })} /></label>
                                <label style={lbl}>{t("Expirace", "Expiry")}<br />
                                  <input type="date" value={nabidkaForm.expirace} onChange={(e) => setNabidkaForm({ ...nabidkaForm, expirace: e.target.value })} /></label>
                                <button className="btn mini" onClick={podatNabidku}>{t("Odeslat nabídku", "Submit offer")}</button>
                                <button className="btn sec mini" onClick={() => setNabidkaForm(null)}>{t("Zrušit", "Cancel")}</button>
                                {minExpText(d) && <div style={{ width: "100%", fontSize: 13, color: "var(--muted)" }}>
                                  {t(`Požadovaná minimální expirace: ${minExpText(d)}.`, `Required minimum shelf life: ${minExpText(d)}.`)}</div>}
                                {Number(nabidkaForm.moq) > 0 && (
                                  <div className="warn" style={{ width: "100%" }}>
                                    {t(`Min. odběr ${nabidkaForm.moq} ks je nezávazný údaj — zprostředkovatel může akceptovat i menší množství. V takovém případě vás vyzveme k potvrzení ceny.`,
                                       `The MOQ of ${nabidkaForm.moq} pcs is indicative — the intermediary may accept a smaller quantity. In that case we will ask you to confirm the price.`)}
                                  </div>
                                )}
                              </div>
                            )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  </div>
                  {stran > 1 && (
                    <div className="pager">
                      <button onClick={() => setStrana(Math.max(1, strankaAkt - 1))} disabled={strankaAkt === 1}>‹</button>
                      {Array.from({ length: stran }, (_, i) => i + 1).map((s) => (
                        <button key={s} className={s === strankaAkt ? "on" : ""} onClick={() => setStrana(s)}>{s}</button>
                      ))}
                      <button onClick={() => setStrana(Math.min(stran, strankaAkt + 1))} disabled={strankaAkt === stran}>›</button>
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {/* ============ ZPROSTŘEDKOVATEL: uživatelé ============ */}
          {view === "uzivatele" && user.role === "admin" && (
            <>
              <h1>{t("Uživatelé", "Users")}</h1>
              <p className="sub">{t("Účty se zakládají bez hesla — uživatel dostane šestimístný potvrzovací kód a heslo si zvolí sám. Odběratel (zahraniční) se eviduje na zemi a VAT ID, dodavatel (český) na IČO s propisem z ARES.",
                                    "Accounts are created without a password — the user receives a six-digit confirmation code and chooses their own password. Buyers (foreign) are registered by country and VAT ID, suppliers (Czech) by company ID with ARES lookup.")}</p>
              <div className="card">
                <div className="toolbar">
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{users.length} {t("účtů", "accounts")}</span>
                  <div className="spacer" />
                  <button className="btn mini" onClick={() => setNovyUzivatel({ role: "odberatel", jmeno: "", login: "", email: "", kod: "__novy__", firma: "", zeme: "DE", regC: "", vatId: "", ic: "", dic: "", typ: "lekarna", adresa: "" })}>{t("+ Přidat uživatele", "+ Add user")}</button>
                </div>
                {novyUzivatel && (
                  <div className="pad" style={{ borderBottom: "1px solid var(--line)", background: "var(--tint)" }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
                      <label style={lbl}>{t("Role", "Role")}<br />
                        <select value={novyUzivatel.role} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, role: e.target.value, kod: "__novy__" })}>
                          <option value="odberatel">{t("Odběratel (zahraniční)", "Buyer (foreign)")}</option>
                          <option value="dodavatel">{t("Dodavatel (český)", "Supplier (Czech)")}</option>
                          <option value="admin">{t("Zprostředkovatel", "Intermediary")}</option>
                        </select></label>
                      {[["jmeno", t("Jméno / název", "Name"), 190], ["login", t("Přihlašovací jméno", "Username"), 150], ["email", "E-mail", 220]].map(([k, l, w]) => (
                        <label key={k} style={lbl}>{l}<br />
                          <input type="text" style={{ width: w }} value={novyUzivatel[k]} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, [k]: e.target.value })} /></label>
                      ))}
                      {novyUzivatel.role === "odberatel" && (
                        <label style={lbl}>{t("Kód odběratele", "Buyer code")}<br />
                          <select value={novyUzivatel.kod} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, kod: e.target.value })}>
                            <option value="__novy__">{t("Přidělit nový kód", "Assign a new code")}</option>
                            {Object.keys(odberatele).map((k) => <option key={k} value={k}>{k} — {odberatele[k].nazev}</option>)}
                          </select></label>
                      )}
                      {novyUzivatel.role === "dodavatel" && (
                        <label style={lbl}>{t("Kód dodavatele", "Supplier code")}<br />
                          <select value={novyUzivatel.kod} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, kod: e.target.value })}>
                            <option value="__novy__">{t("Přidělit nový kód", "Assign a new code")}</option>
                            {Object.keys(dodavatele).map((k) => <option key={k} value={k}>{k} — {dodavatele[k].nazev}</option>)}
                          </select></label>
                      )}
                    </div>

                    {novyUzivatel.role === "dodavatel" && novyUzivatel.kod === "__novy__" && (
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", marginTop: 10 }}>
                        <label style={lbl}>{t("IČO", "Company ID")}<br />
                          <input type="text" className="mono" style={{ width: 110 }} value={novyUzivatel.ic} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, ic: e.target.value })} /></label>
                        <button className="btn sec mini" onClick={aresNacti}>{t("Načíst z ARES", "Load from ARES")}</button>
                        <label style={lbl}>{t("Firma (na doklady)", "Company (for documents)")}<br />
                          <input type="text" style={{ width: 230 }} value={novyUzivatel.firma} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, firma: e.target.value })} /></label>
                        <label style={lbl}>{t("DIČ", "VAT ID")}<br />
                          <input type="text" className="mono" style={{ width: 130 }} value={novyUzivatel.dic} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, dic: e.target.value })} /></label>
                        <label style={lbl}>{t("Adresa", "Address")}<br />
                          <input type="text" style={{ width: 260 }} value={novyUzivatel.adresa} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, adresa: e.target.value })} /></label>
                        <label style={lbl}>{t("Typ subjektu", "Entity type")}<br />
                          <select value={novyUzivatel.typ} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, typ: e.target.value })}>
                            {TYP_SUBJEKTU.map(([k, cs, en]) => <option key={k} value={k}>{t(cs, en)}</option>)}</select></label>
                      </div>
                    )}

                    {novyUzivatel.role === "odberatel" && novyUzivatel.kod === "__novy__" && (
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end", marginTop: 10 }}>
                        <label style={lbl}>{t("Firma (na doklady)", "Company (for documents)")}<br />
                          <input type="text" style={{ width: 230 }} value={novyUzivatel.firma} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, firma: e.target.value })} /></label>
                        <label style={lbl}>{t("Země (kód)", "Country (code)")}<br />
                          <input type="text" className="mono" style={{ width: 70 }} value={novyUzivatel.zeme} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, zeme: e.target.value.toUpperCase() })} /></label>
                        <label style={lbl}>{t("Registrační číslo", "Registration no.")}<br />
                          <input type="text" className="mono" style={{ width: 150 }} value={novyUzivatel.regC} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, regC: e.target.value })} /></label>
                        <label style={lbl}>VAT ID<br />
                          <input type="text" className="mono" style={{ width: 150 }} value={novyUzivatel.vatId} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, vatId: e.target.value })} /></label>
                        <label style={lbl}>{t("Adresa", "Address")}<br />
                          <input type="text" style={{ width: 280 }} value={novyUzivatel.adresa} onChange={(e) => setNovyUzivatel({ ...novyUzivatel, adresa: e.target.value })} /></label>
                      </div>
                    )}

                    <div className="warn" style={{ marginTop: 12 }}>
                      {t("Heslo se nezadává ani neposílá e-mailem. Po uložení systém vygeneruje potvrzovací kód, který uživatel zadá na přihlašovací stránce a nastaví si vlastní heslo.",
                         "No password is entered or sent by e-mail. After saving, the system generates a confirmation code that the user enters on the sign-in page to set their own password.")}
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                      <button className="btn mini" onClick={ulozUzivatele}>{t("Založit účet a vygenerovat kód", "Create account and generate code")}</button>
                      <button className="btn sec mini" onClick={() => setNovyUzivatel(null)}>{t("Zrušit", "Cancel")}</button>
                    </div>
                  </div>
                )}
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>{t("Uživatel", "User")}</th><th>{t("Role", "Role")}</th><th>{t("Kód", "Code")}</th><th>{t("Subjekt", "Entity")}</th><th>E-mail</th><th>{t("Stav", "Status")}</th><th></th></tr></thead>
                    <tbody>
                      {users.map((u) => {
                        const ent = u.role === "odberatel" ? odberatele[u.kod] : u.role === "dodavatel" ? dodavatele[u.kod] : null;
                        return (
                          <tr key={u.login} style={u.aktivni === false ? { opacity: .55 } : undefined}>
                            <td><b>{u.jmeno}</b><br /><span className="mono" style={{ color: "var(--muted)" }}>{u.login}</span></td>
                            <td>{ROLE_LABEL(u.role)}</td>
                            <td>{u.kod ? <span className="pill kod">{u.kod}</span> : "—"}</td>
                            <td style={{ fontSize: 13 }}>
                              {u.role === "odberatel" && ent && <>{ent.zeme} · VAT {ent.vatId}</>}
                              {u.role === "dodavatel" && ent && <>{typLabel(ent.typ)} · IČO {ent.ic}</>}
                              {u.role === "admin" && OPERATOR.nazev}
                            </td>
                            <td>{u.email || "—"}</td>
                            <td>{u.aktivni === false ? <span className="pill prosla">{t("deaktivován", "deactivated")}</span>
                              : u.potvrzen === false ? <span className="pill brzy">{t("čeká na potvrzení", "awaiting confirmation")}</span>
                              : <span className="pill ok">{t("aktivní", "active")}</span>}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {u.login !== user.login ? (<>
                                <button className="link" onClick={() => posliNovyKod(u)}>{t("Poslat nový kód", "Send new code")}</button>
                                {" · "}
                                <button className="link" onClick={() => toggleUzivatel(u.login)}>{u.aktivni === false ? t("Aktivovat", "Activate") : t("Deaktivovat", "Deactivate")}</button>
                                {" · "}
                                <button className="link" style={{ color: "var(--red)" }} onClick={() => smazUzivatele(u.login)}>{t("Smazat", "Delete")}</button>
                              </>) : <span style={{ color: "var(--muted)", fontSize: 13 }}>{t("přihlášený účet", "current account")}</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ============ ZPROSTŘEDKOVATEL: e-maily ============ */}
          {view === "emaily" && user.role === "admin" && (
            <>
              <h1>{t("Odeslané e-maily", "Sent e-mails")}</h1>
              <p className="sub">{t("Protokol notifikací (v prototypu simulováno — produkční verze odesílá přes SMTP). Žádný e-mail nepropojuje odběratele a dodavatele napřímo.",
                                    "Notification log (simulated in the prototype — the production version sends via SMTP). No e-mail ever connects a buyer and a supplier directly.")}</p>
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
              <p className="sub">{t("Platné pro všechny objednávky vytvořené prostřednictvím portálu PORT.", "Applicable to all orders placed via the PORT portal.")}</p>
              <div className="card"><div className="pad">
                <dl className="terms" style={{ margin: 0 }}>
                  {PODMINKY[lang].map(([tt, x]) => (<React.Fragment key={tt}><dt>{tt}</dt><dd>{x}</dd></React.Fragment>))}
                </dl>
                <div className="note">
                  {OPERATOR.nazev} · {OPERATOR.adresa} · {t("IČO", "Company ID")} {OPERATOR.ic} · {t("DIČ", "VAT ID")} {OPERATOR.dic}<br />
                  {OPERATOR.spisova} · {t("datová schránka", "data box")} {OPERATOR.ds} · {OPERATOR.email}
                </div>
                <div style={{ marginTop: 22 }}>
                  <button className="btn sec" onClick={() => window.print()}>{t("Tisk / uložit jako PDF", "Print / save as PDF")}</button>
                </div>
              </div></div>
            </>
          )}
        </div>
      </main>

      {/* ============ dodací list ============ */}
      {detail && (() => {
        const sazba = dphSazba(detail);
        const odb = detail.odberatel || {};
        return (
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
                  <b>{OPERATOR.nazev}</b><br />{OPERATOR.adresa}<br />
                  {t("IČO", "Company ID")}: {OPERATOR.ic} · {t("DIČ", "VAT ID")}: {OPERATOR.dic}
                </div>
                <div className="party">
                  <h4>{t("Odběratel", "Buyer")}</h4>
                  <b>{odb.nazev}</b><br />{odb.adresa}<br />
                  {!odb.zeme || odb.zeme === "CZ"
                    ? <>{t("IČO", "Company ID")}: {odb.ic || "—"} · {t("DIČ", "VAT ID")}: {odb.dic || "—"}</>
                    : <>{t("Reg. č.", "Reg. no.")}: {odb.regC || "—"} · VAT ID: {odb.vatId || "—"}</>}
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
                  <thead><tr><th>SÚKL</th><th>{t("Název", "Name")}</th><th>{t("Šarže", "Batch")}</th><th>{t("Expirace", "Expiry")}</th>
                    <th className="num">{t("Ks", "Qty")}</th><th className="num">{t("Cena/ks", "Price/pc")}</th><th className="num">{t("Celkem", "Total")}</th></tr></thead>
                  <tbody>
                    {detail.items.map((i) => (
                      <tr key={i.id}>
                        <td className="mono">{i.sukl}</td>
                        <td><b>{i.nazev}</b>{i.doplnek && <><br /><span style={{ color: "var(--muted)", fontSize: 12 }}>{i.doplnek}</span></>}</td>
                        <td className="mono">{i.sarze || "—"}</td><td>{fmtDate(i.expirace)}</td>
                        <td className="num">{i.mnozstvi}</td><td className="num">{fmtCZK(i.cena)}</td><td className="num">{fmtCZK(i.mnozstvi * i.cena)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr><td colSpan={6}>{t("Celkem bez DPH", "Total excl. VAT")}</td><td className="num">{fmtCZK(detail.celkem)}</td></tr>
                    <tr><td colSpan={6}>{sazba > 0 ? t("DPH 12 %", "VAT 12%") : t("DPH 0 % (osvobozeno)", "VAT 0% (exempt)")}</td>
                      <td className="num">{fmtCZK(detail.celkem * sazba)}</td></tr>
                    <tr><td colSpan={6}>{t("Celkem s DPH", "Total incl. VAT")}</td><td className="num">{fmtCZK(detail.celkem * (1 + sazba))}</td></tr>
                  </tfoot>
                </table>
              </div>

              {sazba === 0 && (
                <div className="note">
                  {t("Dodání zboží do jiného členského státu EU osvobozené od DPH s nárokem na odpočet — daň odvede pořizovatel (reverse charge), čl. 138 směrnice 2006/112/ES.",
                     "Supply of goods to another EU member state exempt from VAT with the right of deduction — the acquirer accounts for the tax (reverse charge), Art. 138 of Directive 2006/112/EC.")}
                </div>
              )}

              <div className="sig">
                <div>{t("Za dodavatele (datum, podpis)", "For the supplier (date, signature)")}</div>
                <div>{t("Za odběratele (datum, podpis)", "For the buyer (date, signature)")}</div>
              </div>

              <div className="actions no-print">
                <button className="btn sec" onClick={() => exportDodaciList(detail)}>{t("Export XLS", "Export XLS")}</button>
                <button className="btn sec" onClick={() => window.print()}>{t("Tisk / uložit jako PDF", "Print / save as PDF")}</button>
                <button className="btn" onClick={() => setDetail(null)}>{t("Zavřít", "Close")}</button>
              </div>
            </div>
          </div>
        );
      })()}

      {toast && <div className="toast no-print">{toast}</div>}
    </div>
  );
}
