# PORT — hromadná poptávka z Excelu (změny)

Datum: 19. 8. 2026 · dotčené soubory: `src/App.jsx`, `index.html`

## Co přibylo

Odběratel v záložce **Moje poptávky** má tři tlačítka:

| Tlačítko | Chování |
|---|---|
| ⬇ Stáhnout vzorový Excel | vygeneruje `PORT-poptavka-vzor.xlsx` (list *Poptávka* + list *Návod*), v EN verzi *RFQ* + *Instructions* |
| ⬆ Nahrát vyplněný Excel | načte `.xlsx`, `.xls` i `.csv`, otevře náhled |
| + Jedna položka | původní ruční formulář pro jednu položku (beze změny) |

Nahráním vznikne **dávka** `DAV-2026-xxx` = několik požadavků `POZ-2026-xxx` se stejným číslem dávky.
Zprostředkovatel v záložce *Poptávky* klikne na štítek dávky → vyberou se všechny její řádky → *Vytvořit poptávku z vybraných* → jedna vícepoložková poptávka dodavatelům (existující logika slučování podle SÚKL zůstává).

## Šablona

`SÚKL | PRODUKT | SÍLA / FORMA / BALENÍ | MAX. CENA/KS BEZ DPH | MNOŽSTVÍ (KS) | MIN. KS/ŠARŽE | MIN. EXSPIRACE | POZNÁMKA`

Povinné: **PRODUKT** (nebo platný kód SÚKL), **MAX. CENA/KS**, **MNOŽSTVÍ**. Ostatní nepovinné.
Cena = maximální částka, kterou je odběratel ochoten zaplatit za kus bez DPH. Z ní se odvozuje požadovaná cena dodavatelům (limit ÷ (1 + provize)).

## Odolnost parseru

- hlavička se hledá v prvních 15 řádcích → souboru nevadí logo ani nadpis nad tabulkou
- názvy sloupců bez ohledu na diakritiku, mezery, tečky; synonyma (CENA VÝKUPU / MAX. CENA, POČET / KS / QTY, EXSP. / EXPIRACE, CS i EN)
- úvodní nuly kódu SÚKL se doplní (Excel je ukusuje: `193745` → `0193745`)
- čísla `1 234,50`, `1234.50`, `2 600 Kč`
- expirace jako počet měsíců (`6`, `6 měs.`) i jako datum (`31.12.2027`, `2027-12-31`, `12/2027`, sériové číslo Excelu, buňka typu datum)
- přeskočí prázdné řádky, součtové řádky a ukázkové řádky ze šablony (poznámka „PŘÍKLAD“)
- limit 200 řádků / 3 MB

## Náhled před odesláním

Editovatelná tabulka s našeptávačem SÚKL. Neúplné řádky červeně a **neodešlou se**.
Hlášky: chybí název / množství / max. cena; kód SÚKL není v číselníku; položka mimo číselník; min. expirace v minulosti; název ze souboru opraven podle číselníku (zobrazí se původní → nový).
Nahoře průběžně: počet řádků k odeslání, počet k doplnění, orientační hodnota při max. cenách.

**Blacklist SÚKL se v náhledu odběrateli nezobrazuje** — žádná ikona, žádné varování; příznak vidí až zprostředkovatel. Testem ověřeno.

## Technické

- SheetJS z CDN v `index.html` (cdnjs 0.18.5; v komentáři i oficiální `cdn.sheetjs.com` 0.20.3). **Vědomě nepřidáno do `package.json`** — Netlify by při `npm ci` spadl kvůli neaktualizovanému `package-lock.json`, který přes web GitHubu nepřegenerujete.
- Bez SheetJS aplikace funguje dál: šablona se stáhne jako CSV (středník + BOM, Excel ji otevře) a nahrát lze CSV.
- `SCHEMA` 4 → 5 (nová pole `davka`, `minKsSarze`) → stará data v Netlify Blobs se při nasazení zahodí.
- `minKsSarze` se přenáší do položky poptávky (maximum ze slučovaných požadavků). Zatím se zobrazuje jen zprostředkovateli.

## Testy

- esbuild syntax check
- 25 unit testů parseru (mapování hlaviček CS/EN, čísla, SÚKL, expirace ve všech formátech, CSV fallback)
- roundtrip: vygenerovaná šablona → `.xlsx` → zpětné načtení parserem
- jsdom: odběratel nahraje soubor → náhled → odeslání dávky → zprostředkovatel vybere dávku → odešle vícepoložkovou poptávku → dodavatel nevidí kód odběratele ani blacklist

## Otevřené k rozhodnutí

1. **MIN. KS/ŠARŽE** — implementováno jako *nejmenší přijatelný počet kusů z jedné šarže*. Pokud jde o *minimální odběr celkem*, změní se jen popisek a přenos do poptávky.
2. Má tuto hodnotu **vidět dodavatel** u položky poptávky? Zatím ji vidí jen zprostředkovatel.
3. **Duplicity v souboru** (2× stejný SÚKL) se dnes nechávají jako dva řádky — sloučí je až zprostředkovatel při tvorbě poptávky. Alternativa: sečíst už v náhledu.
4. Povinná max. cena — pokud má být možné poslat poptávku bez ceny („dejte nabídku“), je to jednořádková změna v `zkontrolujRadek`.
5. Obdobná šablona pro **dodavatele** (nahrání nabídky / seznamu skladu) — zatím neřešeno.
