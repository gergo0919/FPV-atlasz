/* A képi elveket és a kézi irányítás alapjait a leckénként megjelölt
   források ismertetik. A Liftoff-feladatok és mérőszámok saját gyakorlatok. */
window.cinema = (() => {
  const camera = 'https://oscarliang.com/camera-angle/';
  const flight = 'https://oscarliang.com/learn-flying-fpv-multirotors/';
  const footage = 'https://oscarliang.com/cinematic-fpv-drone-video/';
  const rate = 'https://betaflight.com/docs/wiki/guides/current/Rate-Calculator';
  const dji = 'https://app-store.dji.com/au/content/drone-videography-guide?set_region=AU';
  const types = 'https://www.thedroneu.com/blog/types-of-shots-in-drone-cinematography/';
  const lesson = (name,level,group,intro,steps,fix,goal,url) => ({name,level,group,intro,steps,fix,goal,url});
  return [
    lesson('Egyenletes áthúzás','Kezdő','Alapok',
      'Húzz egy folytonos vonalat két tájékozódási pont között. A képen a talaj mozgása mutatja a sebességet, a távoli épület pedig segít észrevenni a sodródást.',[
      'Liftoffban válassz nyílt területet, egy távoli kaput és oldalról látható fasort. A Pocketen ellenőrizd, hogy középen nyugalomban marad a roll, pitch és yaw tengely.',
      'Állj rá a kapu irányára. Kis előrebillentéssel gyorsíts, majd állítsd meg a billenést. Acro módban a középre engedett bot megtartja az elért dőlést.',
      'Tartsd ugyanazon a képsoron a távoli épület tetejét, és közben figyeld az oldalsó fák tövét. A magasságot kis gázváltoztatással, az oldalirányú elsodródást rövid döntéssel javítsd.',
      'A kapun túl még két másodpercig vidd tovább a snittet. Visszanézéskor jelöld, mikor változott először láthatóan a sebességed.'
      ],'Ha hullámzik a kép, indulj lassabban. Egy korrekció után várd meg, hogyan változik a pálya, mielőtt újra megmozdítod a botot.','Ötből három, legalább nyolc másodperces áthúzás látható magasságingadozás nélkül.',flight),
    lesson('Kameraszög és utazósebesség','Kezdő','Beállítás', 
      'Fixen döntött FPV-kameránál a képkivágás együtt változik a gép bólintásával. Ezzel a próbával megtalálod azt a szöget, amelynél a tervezett sebességen is látszik a témád.',[
      'Válassz egy pályát jól felismerhető horizonttal. Az első próbához állíts például 15° kameradőlést a virtuális gépen. Jegyezd fel az értéket.',
      'Repülj kényelmes utazósebességgel ugyanahhoz az épülethez. Figyeld meg, hol metszi az épület teteje a képet a snitt közepén.',
      'Ismételd meg 5°-kal nagyobb dőléssel, változatlan rates és lehetőleg változatlan menetidő mellett. A körbefordulás utáni visszautat hagyd ki az összevetésből.',
      'Válaszd azt a szöget, amely mellett a számodra fontos előtér és horizont megfelelően elfér. Mentsd a szöget a felszerelés vagy az edzés megjegyzésébe.'
      ],'Ha a snitt csupa ég a kívánt lassú tempónál, csökkentsd a kamera felfelé irányuló dőlését. Ha csupa talaj, ugyanazon a sebességen vizsgáld a másik irányú módosítást.','Két összehasonlítható menet és egy saját, indokolt kameraszög-választás.',camera),
    lesson('Finom botkezelés és rates','Kezdő','Beállítás',
      'A rates a botkitéréshez tartozó szögsebességet határozza meg. Egy ismételhető kameramozgás megmutatja, a bot közepe körüli saját mozdulataidhoz milyen érzékenység illik.',[
      'Írd fel a rates modellt és a tengelyenkénti értékeket. Actual modellnél a középérzékenységet, a maximális szögsebességet és az expót rögzítsd.',
      'Repülj egyenesen két távoli jel között. Próbáld meg négy másodperc alatt lassan az egyik jelről a másikra fordítani a képet, majd ugyanezt visszafelé.',
      'Másold le a profilt. Csak a yaw középérzékenységén változtass egy kis lépést, majd azonos géppel és kameraszöggel ismételd meg a feladatot.',
      'Visszanézéskor számold meg, hányszor kellett visszafordítanod az orrot túllövés után. A kisebb hibát adó profilt és a botérzetet írd a naplóba.'
      ],'Ha az új érték mellett túl nagy mozdulat kell, térj vissza a korábbi beállításhoz, és kisebb lépést próbálj. A roll és pitch végsebességét hagyd az összehasonlítás végére.','Mindkét profillal három próba és tengelyenként visszakereshető beállítás.',rate),
    lesson('Közelítés egy témára','Kezdő','Kameramozgás',
      'A push-in során egy távoli részlet fokozatosan betölti a képet. A snitt attól határozott, hogy már az első képkockán tudod, pontosan melyik részlethez közeledsz.',[
      'Válassz egy homlokzati ablakot vagy jól látható táblát. Jelölj ki előtte egy végpontot, mellette pedig szabad kirepülési irányt a szimulátorban.',
      'A snitt kezdete előtt vedd fel az utazósebességet. Válassz képi helyet a táblának, például a felső harmad és a középvonal találkozásánál.',
      'A téma növekedése közben őrizd a helyét. Az apró sodródást korán igazítsd ki, hogy a végpont közelében elég legyen egy rövid korrekció.',
      'A kijelölt végpontnál zárd a snittet, és folytasd a korábban kiválasztott szabad íven. Hasonlítsd össze az első és az utolsó képkockát.'
      ],'Ha a végén az ablak kiszalad a képből, a következő próba végpontját tedd távolabb, és az utolsó másodperc helyett már félúton igazíts az irányon.','Három egyforma hosszúságú közelítés, amelyekben ugyanaz a részlet marad a képen.',dji),
    lesson('Oldalirányú parallaxis','Középhaladó','Kompozíció',
      'Egy közeli oszlop gyorsabban halad át a képen, mint a távoli háttér. Ebből a sebességkülönbségből a néző azonnal érzi a két térréteg távolságát.',[
      'Keress egy oszlopot, mögötte távoli épülettel. Nézd végig az oldalsó útvonalat és a kijáratot, majd állj fel enyhén az oszlop mellé.',
      'Kezdd tág oldaltávolsággal. Adj kevés oldalirányú dőlést, majd vedd vissza annyira, hogy kényelmes tempóval csússzon a gép a háttér előtt.',
      'Fordítsd a kamerát finoman a távoli épület felé. Engedd, hogy az oszlop áthaladjon a képen, miközben az épület helyzete csak lassan változik.',
      'Ismételd egy második, távolabbi vonalon azonos sebességgel. Válaszd ki, melyiknél olvashatóbb az előtér és melyiknél nyugodtabb a háttér.'
      ],'Ha mindkét réteg egyformán elsuhan, a következő próba elején keress távolabbi hátteret. Ha a néző elveszíti a témát, kezdd kisebb oldalirányú sebességgel.','Két különböző oldaltávolságból egy-egy snitt, mozgás közben is felismerhető háttérrel.',dji),
    lesson('Takarásból feltárás','Kezdő','Kompozíció',
      'A reveal során a néző először csak az előteret látja. Az útvonalad ritmusa határozza meg, hogy az épület vagy a táj mikor válik felismerhetővé.',[
      'Találj két elkülönülő képsíkot, például egy közeli fal szélét és mögötte távoli tornyot. Járd be a fal melletti szabad sávot.',
      'Úgy válaszd meg a kezdőkockát, hogy a fal takarja a tornyot. Fokozatosan indulj oldalra, miközben a kamera nagyjából a torony irányába néz.',
      'Tarts egyenletes tempót a fal széle mellett. Amikor a torony megjelenik, őrizd meg az útvonalat, hogy a takarás egyetlen mozdulattal nyíljon ki.',
      'Hagyj két másodpercet a teljes látványra. A visszanézésnél keress egy vágási pontot a takarás előtt és egyet a feltárás után.'
      ],'Ha túl korán kilátszik a téma, a következő nekifutásnál told a kezdőpontot beljebb az előtér mögé. A snitt közepén végzett gyors yaw többnyire megtöri a feltárást.','Négyből három olyan feltárás, amelynek tisztán elkülönül a nyitó- és záróképe.',types),
    lesson('Egyenletes körözés','Középhaladó','Kameramozgás',
      'Az orbit egy pontra néző oldalazás íves pályán. A téma mérete jelzi a kör sugarát, a háttér elmozdulása pedig az ív egyenletességét.',[
      'Válassz egy tornyot és jól felismerhető részletet a felső részén. Képzelj köré tág kört, és a kerületéről indulj el oldalra.',
      'Indíts kis oldaldöntéssel. Yaw-val fokozatosan fordítsd az orrot a torony felé, a gáz finom változtatásával tartsd a kiinduló magasságot.',
      'Negyedkörönként ellenőrizd a torony méretét. Ha nő, nyisd a pálya ívét. Ha zsugorodik, a következő negyedben fokozatosan közelíts.',
      'Először csak félkört repülj, majd cseréld meg az irányt. Tökéletes félkörökből építs teljes kört ugyanarra a nyitóképre visszaérkezve.'
      ],'Ha a torony mérete állandó, de oldalra kiszalad, a kamera iránya késik. Ha a kép közepén marad, de egyre nagyobb, a kör sugarát javítsd.','Jobbra és balra is egy-egy félkör, amelyben a torony teteje a középső képharmadban marad.',types),
    lesson('Széles S-ív','Középhaladó','Útvonal',
      'Két ellentétes irányú döntött fordulót kötsz össze. A cinematic S-ívben a horizont folyamatosan halad át a vízszintesen, és a második ív már az elsőből látszik.',[
      'Válassz két távoli jelzőpontot egymástól oldalra, majd egy harmadikat mögöttük. Repüld körbe őket lassan, hogy ismerd a kijáratot.',
      'Indíts tág ívet az első jel külső oldala felé. Döntsd a gépet fokozatosan, és kis yaw-val kísérd a kanyart.',
      'Mielőtt teljesen elhagynád az első jelet, kezdd kisimítani a dőlést. Az átbillenés alatt már a második ív kijáratát figyeld.',
      'A második fordulót ugyanannyi idő alatt építsd fel. A harmadik jel mellett tarts ki egyenes véget, majd nézd vissza a két ív közötti horizontmozgást.'
      ],'Ha a két ív között megtörik a vonal, tedd távolabb egymástól a jelzőpontokat. Így több időd marad a dőlésváltásra azonos sebességnél.','Három folyamatos S-ív középen megálló vagy hirtelen átbillenő horizont nélkül.',flight),
    lesson('Kapus átrepülés','Középhaladó','Útvonal',
      'Egy átjáró keretet ad annak, ami mögötte feltárul. A kitűzött cél itt a bejárat, a mögöttes téma és a kijárat egyetlen olvasható képsorba rendezése.',[
      'A szimulátorban válassz széles kaput és mögötte távoli célpontot. Járd végig a kijáratot oldalról is, hogy tudd, merre folytatod a felvételt.',
      'A kaputól távol állítsd a célpontot a nyílás közepére. Azonosíts egy pontot, ahol már eldöntöd, hogy jó-e a megközelítés.',
      'Ha a kijelölt ponton a kapu széle takarja a célpontot, fordulj ki és rendezd újra a kezdőhelyzetet. Jó vonalon kis korrekcióval tartsd a kijáratot láthatóan.',
      'A kapun túl folytasd az egyenest három másodpercig. A felvételen figyeld, láthatóan megváltozik-e a sebesség közvetlenül a nyílásnál.'
      ],'Ha a bejáratnál rendszeresen felrántod a gépet, próbálj nagyobb nyílást vagy hosszabb egyenes bevezetést. Figyeld a kapun túli célt is.','Öt ismétlésből négy tiszta áthaladás, utána három másodperc használható kifutással.',flight),
    lesson('Talajkövetés lejtőn','Haladó','Útvonal',
      'A lejtő látványát az egyenletesnek érződő talajtávolság adja. A feladatot Liftoffban széles, enyhe lejtőn kezdd, oldalirányban végig nyitott kijárattal.',[
      'Repüld végig a vonalat először magasan. Jegyezz meg egy tereptörést és két oldalsó tájékozódási pontot, ahol a próba közben ellenőrizni fogod a magasságot.',
      'A következő körön csak a lejtő felső harmadát kövesd. A gáz fokozatos csökkentésével engedj süllyedést, miközben a kamerád a pálya folytatását is mutatja.',
      'A tereptörés előtt már simítsd a lejtmenetet. Hagyd kifutni az ívet a szabad térbe, majd nézd vissza, melyik pontnál nőtt meg hirtelen a talaj látszólagos sebessége.',
      'Ha ugyanott kétszer is tisztán kijöttél, hosszabbítsd meg a vonalat a második jelzőpontig. Egy menetben csak az útvonal hosszán vagy a kezdőmagasságon változtass.'
      ],'Ha a föld váratlanul kitölti a képet, tervezd újra magasabban a megközelítést és korábbra a kiemelést. A felvétel végén legyen látható szabad kijárat.','Három tiszta szimulátoros lejtőkövetés az előre megjelölt kiemelési ponttal.',footage),
    lesson('Emelkedő spirál','Haladó','Kameramozgás',
      'A helixben egy orbitot folyamatos emelkedéssel kapcsolsz össze. A háttér új rétegei akkor tárulnak fel szépen, ha a kör sebessége és sugara közben kiszámítható.',[
      'Repülj egy sima félkört egy torony körül. Válassz alsó célmagasságot az ablakoknál és felsőt a tetőnél.',
      'Ismételd meg ugyanazt az ívet, ezúttal a belépés után fokozatosan növelve a gázt. A torony egy kiválasztott függőleges élét tartsd a kép azonos oldalán.',
      'A tetővonal közeledésekor fokozatosan csökkentsd az emelkedést. Fix kameránál a nézőpont a géppel együtt emelkedik, ezért előre válassz a képből ki nem futó részletet.',
      'Repüld meg ellenkező irányban is. Hasonlítsd össze a háttér feltárását és a torony látszólagos méretét a két menet felénél.'
      ],'Ha a magasság lépcsőzetesen nő, a következő menetben csak negyedkört gyakorolj kis, állandó emelkedéssel. A teljes spirált ebből építsd újra.','Mindkét irányban egy félfordulat, megszakítás nélküli emelkedéssel és azonosítható témával.',types),
    lesson('Hátráló távolítás','Haladó','Kompozíció',
      'A pull-back kezdetén egy részlet uralja a képet, majd láthatóvá válik a környezete. Fix FPV-kamerával a haladás iránya a képen kívülre esik, ezért ezt a gyakorlatot a szimulátorban, bejárt vonalon végezd.',[
      'Válassz nyílt teret. Először előremenetben repülj végig a tervezett hátráló útvonalon, és keress oldalt látható jelzést a végponthoz.',
      'Állj a téma elé úgy, hogy mindkét oldalon maradjon valamennyi háttér. Nézd meg, milyen szögben marad a téma a képen enyhe hátradöntés mellett.',
      'Lassan indítsd a hátrálást. A gyorsulás felépítése után mérsékeld a hátradőlést, hogy a gép orrával együtt a kamera se emelkedjen tovább.',
      'A végpont oldalsó jelénél zárd a használható snittet, majd állítsd meg a hátrálást. Ismételd meg szélesebb kezdőképpel, és hasonlítsd össze a térélményt.'
      ],'Ha a téma lefelé eltűnik a képből, kisebb kezdőgyorsítással vagy alacsonyabb kameradőléssel próbáld. Hátrafelé a kamera látómezeje miatt rövid szakaszokkal dolgozz.','Három öt másodperces szimulátoros távolítás megtartott témával és előre kijelölt végponttal.',dji),
    lesson('Haladás a téma mellett','Középhaladó','Kompozíció',
      'Oldalról kísérve a néző látja a téma környezetét is. Először egy hosszú, mozdulatlan homlokzat mellett tanuld meg az egyenletes távolságtartást.',[
      'Válassz oldalról jól látható épületsort. Haladj végig mellette úgy, hogy látszódjon az előtted szabad pálya és a fal egy része is.',
      'Válassz egy ablakmagasságot referenciának. A fal aljának és tetejének képen elfoglalt helyéből észreveszed a közeledést vagy távolodást.',
      'Ismételd meg úgy, hogy a kamera kicsit inkább a homlokzat felé nézzen. Apró roll és yaw korrekciókkal külön kezeld az útvonalat és a képkivágást.',
      'Ha a szimulátorpályádon van mozgó jármű, messziről, oldalról ismételd vele. Hagyd előtte több helyet a képen, és egyenes szakaszon állítsd össze a tempót.'
      ],'Ha a snitt folyamatosan közelebb húz a falhoz, repülj nagyobb oldaltávolsággal, és mérsékeld a befelé irányuló dőlést.','Két folyamatos nyolc másodperces oldalazás, a kiválasztott ablakmagasságot megtartva.',types),
    lesson('Vágás nélküli összekötött snitt','Haladó','Útvonal',
      'A hosszabb menet legyen három rövid, önmagában is érthető kép sora. Így könnyebb kideríteni, egy átmenetnél vagy valamelyik alapmozdulatnál veszíted el a képet.',[
      'Írd le a három képet egy mondatban: fal melletti feltárás, félkör a torony körül, majd egyenes távozás. Mindegyikhez válassz egy látható kezdő- és végjelet.',
      'Repüld meg külön a három részt. A második szakaszt egyszer abból az irányból is kezdd el, ahová az első szakasz ténylegesen kivisz.',
      'Fűzd össze az első kettőt. Az átmenetnél előre nézd meg a következő kezdőjelet, és hagyj elég helyet az irányváltás felépítéséhez.',
      'Add hozzá a távozást, majd egyszer nézd végig a felvételt hang nélkül. Írd fel azt az egy átmenetet, ahol a néző elveszítheti a következő témát.'
      ],'Ha az összekötés hirtelen fékezést kíván, vidd távolabb a második elem kezdőpontját. Külön gyakorold az előző elem utolsó és a következő első két másodpercét.','Két teljes menet ugyanabban a sorrendben, kényszerű megállás és újrakezdés nélkül.',footage),
    lesson('Képkockasebesség és mozgásérzet','Középhaladó','Felvétel',
      'Az analóg szemüveg DVR-felvétele a kapott videojelet rögzíti. Ehhez a kamerateszthez külön felvevőkamerára és azon kézzel állítható záridőre van szükség.',[
      'Válassz egy oldalirányú, részletgazdag mintát, például egy kerítést. Készíts két egyforma pásztázást kézben tartott akciókamerával, hogy a teszt megismételhető legyen.',
      'Állíts például 25 képkocka/másodpercet, az első próbához 1/50 s záridőt. Vizsgáld meg a fényességet és a mozgás közbeni elmosódást.',
      'A második próbát rövidebb záridővel készítsd. Tartsd azonosan a képsebességet és a mozgást, lehetőség szerint illeszd az expozíciót.',
      'Nézd meg mindkettőt normál lejátszási sebességen. A választásnál vedd figyelembe, hogy a gyors előtér még követhető-e, és milyen érzést kelt a mozgás.'
      ],'Ha az első klip túlexponált, fénycsökkentő ND-szűrővel ismételheted a próbát. A szükséges szűrőerősséget a tényleges fényhez és kamerához válaszd.','Egy képpár azonos témáról, a naplóban képsebességgel, záridővel és választási indokkal.',footage),
    lesson('Visszanézés és hibajegyzet','Kezdő','Értékelés',
      'Egy jól dokumentált ismétlés többet mond a fejlődésről, mint a leghosszabb repülés. Ezzel a rövid visszanézéssel külön tudod vizsgálni az ívet, a kompozíciót és az időzítést.',[
      'Válassz egy már ismert feladatot és egy előre leírt sikerkritériumot. Rögzíts öt azonos kísérletet a szimulátor képernyőfelvételével.',
      'Első lejátszáskor csak a horizontot figyeld. Jegyezd fel a hirtelen billenés idejét. Másodszor csak a témát kövesd, és jelöld a képkeretből való kisodródást.',
      'Válaszd ki a két leginkább eltérő próbát. Fogalmazd meg a különbséget megfigyelhető eseményként, például azt, hogy a második ív előtt már láttad a kijáratot.',
      'Mentsd a manőver nevét, az öt próbát, a sikeres darabszámot és a használt rates profilt. Írd le a megjegyzésbe, melyik egyetlen részletet javítod a következő menetben.'
      ],'Ha túl sok hibát írsz fel, szűkítsd a megfigyelést egy rövid szakaszra és egy tengelyre. Így az újabb próbán látni fogod, történt-e változás.','Öt megfigyelt menet, egy számszerű eredmény és egy konkrét heti gyakorlási cél.','https://www.youtube.com/watch?v=j8Lho3YWvFs')
  ];
})();
