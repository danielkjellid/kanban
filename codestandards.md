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
`<!-- element start -->
<div id="element1">
    <!-- kode -->
</div>
`<div id="element2">
    <!-- kode -->
</div>
`<div id="element3">
    <!-- kode -->
</div>``
<!-- element end -->`
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

# 


