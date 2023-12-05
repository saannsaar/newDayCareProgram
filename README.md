# newDayCareProgram

Full Stack -websovelluskehitys harjoitustyö 10 op

Sovellus on käynnissä osoitteessa: https://newdaycareapp.onrender.com/

Sovellus on tarkoitettu päiväkodin ja kodin väliseen kommunikointiin. Päiväkodin työntekijöillä on omanlainen käyttäjätili jonka myötä sovellus näyttää ja antaa hieman erilaisia toimintoja kun vanhempien käyttäjälle. 

Testikäyttäjätili ”työntekijälle”: 

email: helin.sahkoposti@email.com
Password: Salasanani

Testikäyttäjätili ”vanhemmalle”:

email: saaran.sahkoposti@email.com
Password: Salasanani1

Vanhemmalle sovelluksessa on seuraavia toimintoja:
Etusivulla on ilmoitustaulu jossa näkyy työntekijöiden lisäämiä ilmoituksia. Niitä klikkaamalla käyttäjälle avautuu ikkuna jossa ilmoituksesta voi lukea mahdollisia lisätietoja. Etusivulla on myöskin kalenteri josta käyttäjä voi katsoa päivän tapahtumia. Jos päivälle ei ole lisätty tapahtumia, lukee kalenterin oikealla puolella ”Ei tapahtumia”. Jos päivälle on lisätty tapahtuma, ilmestyy oikealle puolelle laatikko tapahtuman nimellä, jota klikkaamalla käyttäjä voi avata uuden ikkunan missä näkyy mahodllisia lisätietoja tapahtumista. Vanhemmalle näkyy vain tapahtumat joiden ”event_type” arvo on joko ”C_event” tai ”P_event”. ”W_event” arvoiset tapahtumat on tarkoitettu vain työntekijöille näkyviksi. Etusivulla näkyy myös päivän sää, joka haetaan sivulle ”OpenWeatherMap” APIn kautta siitä kaupungista mikä tietokannasta haetun päiväkodin kaupungiksi on annettu. 

Vasemmassa yläkulmassa navigaatiopalkissa on ”Select” input josta käyttäjä voi valita kenen lapsensa asiota hoitaa sillä hetkellä sovelluksessa. Navigaatiopalkista käyttäjä pääsee ”Viestit” sivulle, josta käyttäjä voi lähettää viestejä työntekijöille. Käyttäjä ei voi lähettää muille vanhemmille viestejä. Klikkaamalla jonkun käyttäjän nimeä listasta aukeaa keskelle sivua keskustelu jossa näkyy viestit aikaleimojen kanssa.

”Hoitoajat” sivulla käyttäjä voi ilmoittaa päiväkodille lapsen hoitoaikoja. Sovelluksessa on toiminnallisuus, joka laskee ilmoituksen tehtyä paljon tunteja vielä sille kuukaudelle on jäljellä kyseisen ilmoituksen jälkeen. Tämä ominaisuus helpoittaa ja nopeuttaa vanhempien toimintaa, koska lapsille yleensä on myönnetty tietty määrä hoitoaikaa per kuukausi, ja tuntien laskeminen voi olla ärsyttävää ja hidastakin puuhaa välillä. Tämän toiminnon avulla käyttäjän on helppo ilmoittaa hoitoaikoja, muuttaa ja poistaa niitä tarvittaessa. Kalenterin yläpuolella näkyy kokoajan paljon hoitoaikaa on vielä kyseiselle kuukaudelle jäljellä. Vaihtamalla navigaatiopalkista lasta hoitoaikojen ilmoittaminen onnistuu toiselle lapselle. 

”Oma perhe” sivulla käyttäjä näkee omat tietonsa ja lasten tietoja sisältäen vaippojen määrän. Tämä on arvo jota työntekijät voivat vaihtaa sovellukseen jokaisen lapsen kohdalle ”FULL”, ”HALF” ja ”EMPTY”, arvojen väliltä. Tämä helpottaa päiväkodin ja kodin välistä kommunikaatiota vaippatilanteen suhteen, sillä usein vaipat joita lapsi käyttää päiväkodissa on vanhempien päiväkotiin hankkimia. Tälle sivulle voisi lisätä ehdottomasti esimerkiksi sähköpostin / salasanan vaihtamiseen liittyvän toiminnon. 

Navigointipalkista käyttäjä voi kirjautua ulos. Sovellus myös kirjaa käyttäjän ulos kun on kulunut 10 minuuttia kirjautumisesta. 

Työntekijälle sovelluksessa on seuraavia toimintoja:

Etusivulla työntekijä voi lisätä ilmoitustaululle uusia ilmoituksia ja valita niiden taustavärin. Työntekijä voi lisätä kalenteriin uusia tapahtumia. Jos tapahtuma on ”lapset” eli ”C_event”, pitää tapahtumaan lisätä myös ryhmä. Tällä hetkellä sovellus lisää automaattisesti jonkun ryhmän jokaiseen tapahtumaan. Jos tapahtuma on ”Työntekijät” eli ”W_event”, se näkyy vain työntekijöille. Työntekijä voi myöskin poistaa jo olemassa olevia tapahtumia.

”Päiväkoti” sivulla työntekijä näkee päiväkodin tiedot, listan ryhmistä, listan lapsista jotka ovat hoidossa ja listan kaikista lapsista.
Ryhmälistauksessa ryhmän nimeä klikatessa aukeaa uusi ikkuna, jossa näkyy kuka/ketkä työntekijöistä ovat vastuussa ryhmästä ja keitä lapsia ryhmään kuuluu. Käyttäjä voi poistaa vastuussa olevia työntekijöitä vastuulistauksesta. (Pitäisi lisätä toiminnallisuus jotta työntekijöitä voisi lisätä vastuulistaukseen, sekä lisätä/poistaa lapsia ryhmästä.)

Lapsi listauksen kohdalla on myöskin nappi ”Lisää uusi lapsi”, jota klikkaamalla aukeaa uusi ikkuna jossa on lomake jonka avulla käyttäjä voi lisätä uuden lapsen tiedot. Tällä hetkellä käyttäjä voi lisätä uuden lapsen vain jos tietokannasta löytyy jo yksi vanhempi joka lapsella on. Klikkaamalla jonkin lapsen nimeä aukeaa oikealle alue jossa lukee lapsen nimi, syntymäaika ja vaippojen tilanne. Käyttäjä voi muuttaa ”diapers” arvoa klikkaamalla ”Vaipat:” nappia ”select” inputin avulla. 

”Viestit” sivulla käyttäjä voi lähettää viestejä vanhemmille ja toisille työntekijöille.Työntekijä voi myös lähettää saman viesti kaikille vanhemmille yhdellä viestillä valitsemalla ” klikkaamalla ”Lähetä viesti kaikille vanhemmille”. 

”Omat tiedot” sivulla käyttäjä näkee omat tiedot ja voi muokata niitä klikkaamalla ”Muokkaa tietoja”. Kaikkia tietoja paitsi syntymäaikaa voi muokata.  

Tuntikirjanpito: https://github.com/saannsaar/newDayCareProgram/blob/main/tuntikirjanpito.md