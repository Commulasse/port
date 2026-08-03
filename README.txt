PORT — demo nasazení na Netlify (sdílená data mezi počítači)
================================================================

CO TO JE
--------
Malý projekt, který vezme aplikaci PORT a přidá jí sdílené úložiště
(Netlify Blobs) přes serverless funkci. Díky tomu uvidíte na dvou
různých počítačích/prohlížečích STEJNÁ data — objednávky, poptávky,
nabídky, uživatele — protože se neukládají jen do paměti prohlížeče,
ale na server.

Je to POŘÁD demo/testovací řešení, ne finální produkční architektura
(tu popisuje samostatný plán pro Wedos). Pro pilotní testování se
dvěma i více uživateli ale funguje spolehlivě.

POSTUP NASAZENÍ (bez příkazové řádky, jen přes web)
----------------------------------------------------
1) Založte si účet na github.com (pokud ho nemáte) a na netlify.com
   (přihlášení přes GitHub účet je nejrychlejší).

2) Na github.com klikněte vpravo nahoře na "+" -> "New repository".
   Dejte mu libovolný název (např. "port-demo"), zvolte "Public" nebo
   "Private" (obojí funguje), NEZAŠKRTÁVEJTE žádné volby na "Add
   README" -- necháváme repozitář prázdný. Klikněte "Create repository".

3) Na stránce nového (prázdného) repozitáře uvidíte odkaz
   "uploading an existing file" -- klikněte na něj.

4) Rozbalte tento ZIP soubor u sebe v počítači a PŘETÁHNĚTE VŠECHNY
   soubory a složky (index.html, netlify.toml, package.json,
   vite.config.js, src/, netlify/ -- vše kromě README.txt, to je jen
   pro vás) do okna prohlížeče na GitHubu. Dole klikněte
   "Commit changes".

   POZOR: nahrávejte OBSAH rozbalené složky, ne samotný ZIP soubor.

5) Přejděte na app.netlify.com -> "Add new site" -> "Import an
   existing project" -> "Deploy with GitHub" -> vyberte repozitář
   "port-demo", který jste právě vytvořili.

6) Netlify by mělo samo rozpoznat nastavení ze souboru netlify.toml
   (build command "npm run build", publish "dist", funkce ve složce
   netlify/functions). Stačí kliknout "Deploy site".

7) Počkejte 1-2 minuty, než Netlify nainstaluje závislosti a projekt
   sestaví. Pak dostanete adresu typu:
   https://nejaky-nahodny-nazev.netlify.app

8) Otevřete tuto adresu na obou počítačích. Přihlaste se pod dvěma
   různými demo účty (např. admin/admin na jednom a lekarna/demo na
   druhém) a vyzkoušejte třeba: na jednom počítači odešlete jako
   odběratel požadavek, na druhém (jako admin) uvidíte do pár vteřin
   nový požadavek v přehledu -- data se sdílí přes server, ne jen
   v paměti prohlížeče.

JAK TO FUNGUJE UVNITŘ
----------------------
- netlify/functions/db.mjs je malá serverless funkce, která umí
  uložit (POST) a načíst (GET) jeden JSON objekt se všemi obchodními
  daty do Netlify Blobs (úložiště zabudované přímo v Netlify).
- Aplikace při startu data načte, po každé změně je (s malým
  zpožděním) uloží zpět na server, a každé 4 sekundy zkontroluje,
  jestli mezitím něco nezměnil někdo jiný na jiném počítači -- pokud
  ano, načte to k sobě.
- Rozpracované formuláře (co zrovna někdo vyplňuje) se nesdílejí --
  to zůstává jen u dané osoby, dokud akci nedokončí. Sdílí se až
  výsledek (nová objednávka, nabídka, akceptace...).

OMEZENÍ TOHOTO DEMA
--------------------
- Není tam žádné skutečné zabezpečení -- kdokoli se zná URL, se může
  přihlásit pod demo účty z tabulky uživatelů v kódu.
- Dva lidé mohou (vzácně) uložit změnu "přes sebe", pokud by upravovali
  úplně totéž v tutéž vteřinu -- pro demo účel je to v pořádku.
- Netlify Blobs má na free plánu limity (viz netlify.com/pricing) --
  pro pár desítek testovacích záznamů to bohatě stačí.
