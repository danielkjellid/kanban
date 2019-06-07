# HTML Konvensjoner

## Terminologi

### Tags

HTML elementer består av start- og sluttag. Unntaket her er void elementer.

```
<p>Noe tekst</p> <!-- Start og sluttag -->
<img src="kilde"> <!-- Void element -->
```

### Attributt

En attributt er en verdi som vi kan putte inni HTML elementer:

```
<img src="kilde"> <!-- Her er src en attributt -->
```

## Navngiving

* Vi skriver all kode (inkludert HTML) på og tekst på engelsk.

## Ryddighet og struktur

* Vi deklarerer alltid korrekt document type. E.g `<!DOCTYPE html>`
* Vi bruker alltid lower-case element navn.
* Vi lukker alltid alle html tags, selvom man ikke behøver dette i HTML5. Unntaket her er void elementer.
* Vi bruker alltid lower-case atributt navn
* Vi bruker kun ekstrernt stil-ark. Bruk IDer dersom du skal stilsette singulære elementer.
* Vi bruker tab (4 spaces) for innrykk.
* Nye tagger får ny linje. 

### Dårlig

```
<head>
<title>Dårlig HTML kode </title>
</HEAD>

<BODY>
<img SRC="kilde"><p>Føste tekstavsnitt som 
forklarer noe
<p style="font-size: 10px;"> Tekstavsnitt 
som forklarer noe
</BODY>
```

### Bra

```
<!DOCTYPE html>
<html>
    <head>
        <title>God HTML kode</title>
        <link rel="stylesheet" type="text/css" href="kilde">
    </head>
    <body>
        <img src="kilde">
        <p>Føste tekstavsnitt som forklarer noe</p>
        <p>Andre tekstavsnitt som forklarer noe</p>
    </body>
</html>
```

## Semantikk

* Vi bruker ikke semantikk til sin fulle grad. Husk at man kan stilsette singulære elementer gjennom IDer, det er unaturlig med en `<h1>` tag midt i en paragraf (`<p>`) uansett.

## Kommentering

* Vi foretrekker korte, konsise kommentarer.
* Kommenter gjerne for å gjøre noe mer oversiktlig (start og end kommentarer):

```
<!-- element start -->
<div id="element1">
    <!-- kode -->
</div>
<div id="element2">
    <!-- kode -->
</div>
<div id="element3">
    <!-- kode -->
</div>
<!-- element end -->
```

* * *

# CSS Konvensjoner

## Terminologi

### Regel

En regel er navnet gitt til en velger (eller gruppe av velgere), samt deklarasjonen av egenskaper og verdiene deres.

```
.test {
    font-size: 18px;
    line-height: 1.2;
}
```

### Velgere

I en regel deklarasjon, er velgere deler som bestemmer hvilket element som stilsettes med definere egenskaper. Velgere kan matche HTML elementer og attributter. Velgere:

```
.velger {
    /* ... */
}

.h1 {
    /* ... */
}
```

### Egenskaper

Egenskaper er det som bestemmer stilsettingen av velgere:

```
/* velger */{
    background: #FFFFFF;
    color: #333;
}
```

## Navngiving

* Bruk logisk navngiving.
* Foretrekker bindestrek fremfor camelCase i klassenavn

## Ryddighet og struktur

* Bruk soft-tab (2 spaces) for innrykk.
* Når vi bruker flere velgere i en regeldeklarasjon, gir vi hver velger sin egen linje.
* Legg inn mellomrom (space) før hver åpende krøllparantes `{` i regedelkarasjon.
* I egenskaper, legg inn mellomrom etter, men ikke før, kolon `:`. 
* Legg lukkende krøllparantes `}` på egen linje.
* Legg inn en blank linje mellom regel deklarasjoner.
* Vi bruker hex-kode fremfor rgb og fargekoder (black, white) så langt det lar seg gjøre.

### Dårlig

```
.velger{border-radius:50%; border:2px; }
.nyVelger, .og-flere-velgere {
    //...
}
```

### Bra

```
.velger {
    border-radius: 50%;
    border:2px;
}

.en,
.velger,
.per-linje {
    /*...*/
}
```

## Kommentering

* Foretrekker block kommentarer fremfor linje kommentarer (`/* Kommentar */`)
* Foretrekker kommentarer på egen linje fremfor end-of-line kommentering.
* Bruk detaljerte kommentarer for kode som ikke er selvforklarende. F.eks. z-index.

## Annet

### Border

Bruk `0` istedenfor `none` for å spesifisere at stilen ikke har en border.

### Dårlig

```
.velger {
    border: none;
}
```

### Bra

```
.velger {
    border: 0;
}
```

# JavaScript Konvensjoner
## Referanser

Bruk `const`i konstante referanser. Unngå å bruk `var`. Dette sikrer at man ikke kan gi referansen en ny verdi, som kan forårsake mange bugs.

### Dårlig

```
var a = 1;
var b = 2;
```

### Bra

```
const a = 1;
const b = 2;
```

Dersom referansen må gis ny verdi, bruk `let` istedenfor `var`. Dette er fordi `let` er block-scoped og ikke function-scoped som `var`.

### Dårlig

```
var count = 1;
if(true) {
    count += 1;
}
```

### Bra

```
let count = 1;
if(true) {
    count += 1;
}
```

Merk at både `let` og `const` er block-scoped.

## Objekter

Bruk bokstavlig syntax for oppretting av objekter.

### Dårlig

```
const item = new Object();
```

### Bra

```
const item = {};
```

## Arrays

Bruk bokstavelig syntax for oppretting av array.

### Dårlig

```
const items = new Array();
```

### Bra

```
const items = [];
```

Bruk `array.push` istedenfor direkte oppgaver for å legge ting inn i et array.

### Dårlig

```
const someStack = [];
someStack[someStack.length] = 'abracadabra';
```

### Bra

```
const someStack = [];
someStack.push('abracadabra');
```

Bruk linjeskift etter åpne- og lukke krøllparantesen hvis arrayet har flere linjer.

### Dårlig

```
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];
```

### Bra

```
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```

## Strings

Bruk dobble anførselstegn `""` for strings.

### Dårlig

```
const name = `Capt. Janeway`;

const name = 'Capt. Janeway';
```

### Bra

```
const name = "Capt. Janeway";
```

## Funksjoner

Navngi funksjonen på en slik måte at det er åpenbart hva den gjør. Lange descriptive navn forestrekkes over kort, inkonsise.

### Dårlig

```
function open() {
    //...
}
```

### Bra

```
functoion openMainModal() {
    //...
}
```

Funksjoner som går over flere linjer, burde identeres slik som alt annet som går over flere linjer i standarden: hvert element på egen linje, etterfulgt av tilhørende komma.

### Dårlig

```
function foo(bar,
             baz,
             quux) {
  // ...
}

console.log(foo,
  bar,
  baz);
```

### Bra

```
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}

console.log(
  foo,
  bar,
  baz,
);
```

## Kontrollsetninger

## Kommentarer

## Whitespace

## Kommaer

## Semikolon

## Events




