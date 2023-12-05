# työaikakirjanpito

| päivä | aika | mitä tein  |
| :----:|:-----| :-----|
| 22.8. | 3    |  Aiheen pohtimista ja suunnittelua paperille |
| 23.8  | 4    | Aiheen pohtimista, päätin aiheen ja suunnittelin tietokantaa hieman paperille sekä pohdin millaisen käyttöliittymän rakennan, mitä toiminnallisuuksia ohjelma vaatii ollakseen järkevä |
| 24.8. | 6    | Projektin alustus, backendin aloitusta, tietokannan järjestelyä |
| 28.8  | 5    | Frontend aloitettu, perus rakenteen rakentamista |
| 29.8  | 8    | Frontend työstämistä, kirjautuminen lisätty, yritin saada deployauksen toimimaan gitin kanssa |
| 30.8. | 6    | Muutin backendiä sittenkin, työntekijän kirjautuminen toimii |
| 31.8  | 6    | Käyttäjälle "Omat tiedot" sivu missä näkyy tietoja esim työntekijän omasta ryhmästä, vanhemmista, CurrentUser reduceri jotta kirjautuneen käyttäjän tiedot säilyvät jossain koska niitä tarvitaan myöhemmin esim ettei kaikki vanhemmat näe kaikkien lasten tietoja jne. |
| 1.9.  | 7    | Kalenterin lisäys, jotta esim päiväkodin tapahtumat olisi kivasti esitettynä, käyttäjä voisi valita kalenterista päivän jonka mukaan sivulla näytettäisiin päivän tapahtumat jne. Date loi paljonkin ongelmia tässä kohti |
| 5.9.  | 7    | Tapahtumien lisäys koko hommaan, frontissa reducer tapahtumille, myös "päiväkoti" sivua aloitettu jossa näkyisi sitten päiväkodin tiedot |
| 6.9.  | 6    | Kirjautuminen myös vanhempana |
| 7.9.  | 7   | Erilainen näkymä vanhemmalle, esim hoitoaikojen ilmoitukselle oma sivu, git actions taistelua  |
| 8.9.  | 6   | Hoitoajan lisäys lapselle  |
| 18.9. | 6   |  Hoitoajan implementointi frontissa, vaikeeta Date kanssa taaskerran |
| 19.9.  | 5   | Samaa taistelua kun eilen  |
| 20.9.  | 6   | Hoitoajoille oma schema kuitenkin ja fronttiin reducer, alkaa toimimaan  |
| 21.9.  | 7   | Hoitoaikojen implementoinnin kanssa työskentelyä edelleen  |
| 27-28.9.  | 10   | Git unohtui, Testien pohtimista ja lisäämistä, hoitoajan lisäämisen toiminnallisuus onnistui |
| 2.10.  | 3   | Edellisten korjausten lisäys gitiin, suunnittelua paperilla mitä vielä pitää tehdä, testit, deployaus kuntoon, kirjautumiseen liittyvät jutut tarkistaa esim ulos kirjautuminen  |
| 6.10.  | 5   | hoitoajan lisäämisessä edelleen ongelmia sittenkin, ongelmien ratkomista  |
| 9.10.  | 5   | Päädyin siihen  että kirjautunut vanhempi valitsee lapsista lapsen jonka tietoja sillä hetkellä katsotaan, "currentchild" reducer joka pitää huolta sitten valitun lapsen tietojen tilasta, ei tarvitse tehdä turhia looppeja aina oikean lapsen tietojen hakemiseen jokaisessa komponentissa erikseen |
| 10.10.  | 7   |  rakennetaan banckendin testausta |
| 11.10.  | 7   | edelleen backendin testausta rakennellaan |
| 16.10.  | 2   | pieniä korjailuja testeissä ja fronttiin |
| 17.10.  | 5   | säätiedotus lisätty etusivulle |
| 19.10.  | 5   |  ilmoitustaulun rakentamista, lisäys ja poisto toimii |
| 24.10.  | 3   |  ilmoitusten korjailua vielä, työntekijän tilillä toimii ilmoiutksen lisäys |
| 25.10.  | 2  | ryhmän tietojen muokkaus |
| 26.10.  | 6   | hoitoaikojen ilmoitukseen ja ylläpitämiseen jotain järkeä ja selkeyttä |
| 30.10.  | 5,5h   | hoitoaikojen muokkaus toimii, muuta korjailua, date toimittaa taas päänvaivaa |
| 1.11.  | 5h   | viestitoiminnon lisäystä, bäkki toimii |
| 2.11.  | 6,5h   |  viestit sivun lisäystä fronttiin, toimii jo |
| 3.11.  | 8h |  hakufiltteri viestisivulle lisätty, testejä korjailtu bäkistä, hoitoaikojen maximiajan laskurihommaa aloteltu |
| 13.11.  | 6,5h   | Lisätty fronttiin hoitoajat sivulle kuukauden maximihoitoaika joka näyttää sillä hetkellä jäljellä olevan ajan kyseiselle kuukaudelle, vielä vaatii viilausta, ei päivitä kunnolla sujuvasti |
| 29.11.  | 4,5h   | Viimeistely, hoitoaikojen korjausta vielä, koitettu saada git actions toimimaan |
| 30.11.  | 5,5h   | Viimeistelyä, koitettu saada git actions toimimaan edelleen, lisätty kommentteja ja poisteltu turhia kommentoituja rivejä ja siistitty koodia ylipäätään |
| 4.12.  | 1h   | Viimeistely, deployuksen fiksausta, lisätty vielä vanhempien lisäys uutta lasta lisättäessä "select" inputiksi, vielä voisi vaikka mitä lisätä ja hommaa kehittää.. |

| yht     | 197,5h |  | 