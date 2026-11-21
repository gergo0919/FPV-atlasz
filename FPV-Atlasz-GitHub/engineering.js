(() => {
  'use strict';
  const src = {
    mcu:['STMicroelectronics · STM32F722xx','https://www.st.com/resource/en/datasheet/stm32f722ie.pdf','Mikrovezérlő, Cortex-M7 mag, memória és perifériák.'],
    imu:['TDK InvenSense · ICM-42688-P','https://invensense.tdk.com/wp-content/uploads/2020/04/ds-000347_icm-42688-p-datasheet.pdf','Digitális inerciális érzékelő, minták és soros csatolók.'],
    mems:['Analog Devices · MEMS-giroszkóp','https://www.analog.com/media/en/technical-documentation/data-sheets/adis16266.pdf','Coriolis-erő és kapacitív kiolvasás, szemléltető példatípus.'],
    mos:['Texas Instruments · MOSFET-kapumeghajtás','https://www.ti.com/lit/ml/slua618a/slua618a.pdf','Térerővezérelt tranzisztor, kaputöltés és kapcsolási veszteség.'],
    bridge:['Texas Instruments · Háromfázisú inverter','https://www.ti.com/lit/ug/tiduak1/tiduak1.pdf','Három félhíd, motoráram és teljesítményfokozat egy referenciatervben.'],
    bldc:['Microchip · AN885, Brushless DC Motor Fundamentals','https://ww1.microchip.com/downloads/en/appnotes/00885a.pdf','Állórész, állandó mágneses forgórész, kommutáció és ellenfeszültség.'],
    aero:['NASA Glenn · Propeller Thrust','https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/propeller-thrust/','A tolóerő impulzuselméleti értelmezése.'],
    buck:['Analog Devices · AN-2582','https://www.analog.com/en/resources/app-notes/an-2582.html','Feszültségcsökkentő kapcsolóüzemű fokozat, tekercs, kondenzátor és szabályozás.'],
    pcb:['Analog Devices · MT-031','https://www.analog.com/media/en/training-seminars/tutorials/MT-031.pdf','Földelés, visszaáram és hidegítés vegyes jelű nyomtatott áramkörökön.'],
    dshot:['Betaflight · DShot protokoll','https://betaflight.com/docs/development/API/Dshot','Digitális motorparancs formátuma és kétirányú válasz.'],
    bat:['Texas Instruments · BQ4050','https://www.ti.com/lit/ds/symlink/bq4050.pdf','Cellánkénti mérés és passzív kiegyenlítés egy referenciaáramkörben.'],
    pixel:['Sony Semiconductor Solutions · Képérzékelő-gyártás','https://www.sony-semicon.com/en/company/operation-flow/index.html','A fotodióda feladata a fényből származó töltés létrehozása.'],
    video:['Analog Devices · AD724','https://www.analog.com/en/products/ad724.html','Összetett analóg videojel, RGB-kódolás és szinkronizálás.'],
    pll:['Analog Devices · PLL','https://www.analog.com/en/resources/glossary/pll.html','Fáziszárt hurok, referencia, oszcillátor és visszacsatolás.'],
    gnss:['u-blox · MAX-M10S','https://content.u-blox.com/sites/default/files/MAX-M10S_DataSheet_UBX-20035208.pdf','Az M10 család egy dokumentált példája, antenna és UART-csatoló.'],
    gps:['GPS.gov · How GPS Works','https://www.gps.gov/sites/default/files/2025-08/Educational_Poster.pdf','Műholdjelek, futási idő és helymeghatározás.'],
    radio:['Semtech · LoRa adó-vevő család','https://www.semtech.com/products/wireless-rf/lora-connect','Példák 2,4 GHz-es rádióáramkörökre és modulációkra.'],
    hid:['USB-IF · HID Usage Tables','https://usb.org/sites/default/files/hut1_13.pdf','Joystick-tengelyek, gombok és az USB HID adatmodellje.'],
    hall:['Infineon · Hall-effektusos érzékelés','https://www.infineon.com/dgdl/Infineon-Current-Sensing-lin-Hall-ApplicationNotes-v01_20-EN.pdf?fileId=8ac78c8c962508060196869ade34161a','A Hall-effektus működési alapelve.']
  };
  const known = window.extraSources || [];
  const ext = key => ({name:src[key][0],url:src[key][1],desc:src[key][2]});
  for(const k of Object.keys(src)) if(!known.some(s => s.url===src[k][1])) known.push(ext(k));
  window.extraSources=known;
  const item = (name, short, srcKey, text, example) => ({name,short,srcKey,text,example});
  const topic = (title,diagram,note,items) => ({title,diagram,note,items});
  const chapters=[
    [
      topic('Fényből analóg videojel','camera','Az analóg kamera belső felépítésének elvi modellje. Az érzékelő pontos típusa a Seeker 3 adatlapján nincs megnevezve.',[
        item('Fotodióda és expozíció','Fotodióda','pixel','A félvezetőben elnyelt fotonok elektron–lyuk párokat kelthetnek. A pixel az expozíciós idő alatt összegyűlt töltést tárolja. A több fény vagy a hosszabb integrálás nagyobb jelet eredményez, amíg a pixel el nem éri a telítést.','Világos kapuból árnyékba fordulva a kamera expozíciója válaszra kényszerül. Hasonlíts össze két felvételt: a sötét rész zajosodása és a világos ég kiégése két külön jelenség.'),
        item('Kiolvasás és kódolás','Kiolvasás','video','A képérzékelő pontonkénti mintáiból a kamera képsorokat állít elő. A kompozit kódoló a világosság, a szín és az időzítés információját közös analóg kimenetre képezi. A tényleges feldolgozási lánc kameratípusonként eltérhet.','A 4:3 kamera nyújtott megjelenítésekor a kör ellipszisnek látszik. Az eredeti képforma visszaállításához a szemüveg képarányát ellenőrizd.'),
        item('Sor- és képszinkron','Szinkronjel','video','A kompozit jelben külön időszakaszok jelzik az új sor és a következő képmező kezdetét. A vevő ezekből állítja helyre a rajzolás ütemét. A szinkron sérülésekor a kép elcsúszhat vagy gördülhet.','Ha a feliratokkal együtt az egész kép gördül, a szinkron útját is vizsgáld. Ha csak a kép részletei fakók, más jelenséggel lehet dolgod.')
      ]),
      topic('A videó rádiófrekvenciás útja','radio','Elvi adólánc. A PandaRC adó pontos belső kapcsolása és chipkiosztása a használt termékadatlapon nem szerepel.',[
        item('Bemeneti illesztés','Videóbemenet','video','Az analóg jel feszültségét mindig a kijelölt referencia és terhelés mellett értelmezzük. Egy videóvonalon a helytelen lezárás megváltoztathatja a jelszintet vagy visszaverődést okozhat. A pontos bekötést a modul csatlakozókiosztása adja meg.','Cserénél együtt kövesd végig a VIDEO és GND vezetéket. Az azonos alakú dugó önmagában nem igazolja a lábkiosztást.'),
        item('Vivő és fáziszárt hurok','PLL','pll','A fáziszárt hurok stabil referenciához igazít egy hangolható oszcillátort. A fázishibát a hurokszűrő olyan vezérlőjellé alakítja, amely korrigálja a kimenet ütemét. A csatornaválasztás a kívánt vivő beállítását jelenti.','A szemüvegen és az adón a tényleges MHz-értéket hasonlítsd össze. Egy sávbetű vagy egy közeli csatornán megjelenő próbapadi kép önmagában nem elég.'),
        item('RF-kimenet és terhelés','RF-kimenet','mos','A végfok energiaforrása az egyenáramú táp. A kimeneti illesztés feladata, hogy a rádiófrekvenciás energiát a kábel és az antenna felé vezesse. Egy veszteséges fokozat hőt is termel. A MOSFET forrás a tranzisztorveszteség alapelvét magyarázza.','A gyártó által előírt antennával használd az adót. Ha álló helyzetben gyorsan melegszik, szakítsd meg a próbát és ellenőrizd a hűtést.')
      ]),
      topic('Az analóg képtől a rögzített fájlig','receiver','A kétbemenetes SteadyView a Cobra gyári adata. A belső jelfeldolgozás itt blokkmodellként látható.',[
        item('Két antennabemenet','Antenna A/B','radio','Egy visszavert és egy közvetlenül érkező rádióhullám egy helyen gyengítheti egymást. Különböző antennákon eltérő jel alakulhat ki. A két bemenet így két megfigyelést ad a képrekonstrukcióhoz.','Egy irányított és egy körsugárzó antenna a tér más részeiről vehet jól. Feljegyzéskor jelöld a pilóta és a modell egymáshoz viszonyított irányát is.'),
        item('Szinkron és képfeldolgozás','Képszinkron','video','Az analóg vevőből visszanyert alapsávi jelet a megjelenítéshez fel kell bontani sorokra és képpontokra. A jel stabilitása befolyásolja, hogy az elektronika követni tudja-e a szinkront. A két vételi ág kezelését a SteadyView végzi.','A kép összeomlása és a kijelző teljes elsötétülése külön tünet. A hiba leírásában rögzítsd, hogy közben a szemüveg saját menüje látható marad-e.'),
        item('DVR és megjelenítés','LCD és DVR','video','A kijelzőre történő kirajzolás és a memóriakártyára történő tömörítés két eltérő feladat. A gyártó a Cobra X V4-re 60 fps DVR-t ad meg. Egy képkockaszám önmagában nem határozza meg a kamera és a kijelző közötti késleltetést.','Ha késleltetést hasonlítasz össze, ugyanazt az eseményt és a szemüveg kijelzőjét egy külső nagy képkockasebességű kamerával kell közös időalapon látni.')
      ])
    ],[
      topic('Elektromágneses hajtás','motor','Háromfázisú, állandó mágneses, külső forgórészes motor szemléltetése. A fogak és mágnespólusok száma az ábrából nem olvasható ki.',[
        item('Állórész és tekercselés','Állórész','bldc','Az állórész hornyain szigetelt rézhuzal fut. Az egyes fázisokon átfolyó áram mágneses teret hoz létre. A vaslemezek vezetik a fluxust, a lemezelés mérsékli a változó tér által keltett örvényáram-veszteséget.','Azonos táp mellett a terhelt motor több áramot vehet fel. A tekercs rézvesztesége az áram négyzetével nő, ezért a rövid erős terhelés is gyors melegedést okozhat.'),
        item('Mágneses forgórész','Forgórész','bldc','A motorharang belső felületén állandó mágnesek találhatók. Az állórész forgó mágneses tere nyomatékot fejt ki rájuk. A harang, a tengely és a légcsavar együtt forog, miközben az állórész a karhoz rögzül.','Áramtalanított, propeller nélküli gépen hasonlítsd össze a harangok forgását. Az egy motorra jellemző súrlódás más jelenség, mint a mindegyiken érezhető mágneses lépcsőzetesség.'),
        item('Indukált ellenfeszültség','Ellenfeszültség','bldc','A forgó mágnesek megváltoztatják a tekercset átjáró fluxust, ezért feszültség indukálódik. Nagysága a fordulatszámmal nő. Érzékelő nélküli szabályozásnál az ESC ebből is következtethet a rotor helyzetére.','Álló motornál a forgásból származó visszajelzés hiányzik. Az indulás és a folyamatos forgás szabályozása ezért eltérő feladat.')
      ]),
      topic('A motor nyomatékától a tolóerőig','prop','Áramlástani szemléltetés. A lapátok száma és a névleges emelkedés önmagában nem ad teljesítménygörbét.',[
        item('Lapátprofil és relatív szél','Lapátprofil','aero','A lapát szelvénye a forgásból és a tengelyirányú áramlásból adódó relatív szélben dolgozik. A lapát mentén eltérő a helyi kerületi sebesség, ami a terhelés eloszlását is befolyásolja.','Azonos motorfordulat mellett más tömegű levegőt gyorsíthat két különböző propeller. A csere hatását azonos pályán és azonos akkuállapotnál érdemes megfigyelni.'),
        item('Impulzus és tolóerő','Légsugár','aero','A forgó légcsavar megváltoztatja az átáramló levegő impulzusát. Az egyszerűsített modellben a tolóerő a másodpercenként átáramló tömeg és a sebességváltozás szorzata. A gépen ennek ellentétes irányú reakcióereje hat.','Döntött drónnál a tolóerőnek csak egy része tart függőlegesen. Azonos össztolóerő mellett ezért a gép magasságot veszíthet a kanyarban.'),
        item('Tengelyteljesítmény és terhelés','Nyomaték','bldc','A motor mechanikai teljesítménye a nyomaték és a szögsebesség szorzata. A légcsavar megváltoztatásával más terhelési pontba kerülhet a motor. Az új munkapont az áramfelvételt és a hőtermelést is befolyásolja.','Ha légcsavart hasonlítasz össze, a repidő mellé jegyezd fel az akkuterhelést, a vibrációt és a gázreakciót is. Egyetlen szám könnyen elfedi a kompromisszumot.')
      ]),
      topic('A parancstól a forgásirányig','drive','A digitális DShot a kompatibilis beállítás egyik lehetősége. A használt protokollt a saját Betaflight-konfigurációban ellenőrizd.',[
        item('Motorok logikai sorrendje','Keverő','dshot','A repülésvezérlő a kért össztolóerőt és tengelyenkénti nyomatékot az egyes motorok parancsaivá alakítja. A hozzájuk rendelt kimeneteknek a motorok valós helyével kell egyezniük.','Ha a kijelölt jobb első motor helyett egy hátsó mozdul meg a légcsavar nélküli ellenőrzésen, először a sorrendet kell tisztázni.'),
        item('DShot bitfolyam és ellenőrzés','DShot','dshot','A DShot kerete a parancsértéket, a telemetria kérésére szolgáló bitet és ellenőrző biteket visz át. A nagy és kis szintek időzítése kódolja a biteket. A motor fázisaihoz vezető teljesítményáram külön úton folyik.','A gyorsabb DShot-változat rövidebb időablakot hagy egy bitre. A jelátvitel hibája és egy sérült légcsavar okozta rezgés eltérő hibakeresést igényel.'),
        item('Kommutáció és forgásirány','Fázissorrend','bldc','Az ESC egymást követő állapotokban gerjeszti a motor tekercseit. A mágneses tér lépéseinek sorrendje határozza meg a forgás irányát. Az irány és a parancsot fogadó motor sorszáma két külön tulajdonság.','A légcsavar nélküli próbán a forgást a Betaflight ábrájával hasonlítsd össze, és csak áramtalanítás után szereld fel a hozzá illő légcsavart.')
      ])
    ],[
      topic('A repülésvezérlő belseje','fc','Az F722 család dokumentált. A rajz a feldolgozás logikáját mutatja, a panel valódi huzalozását a konkrét revízió határozza meg.',[
        item('Mikrovezérlő, CPU és memória','Cortex-M7','mcu','Az STM32F722 mikrovezérlőben az Arm Cortex-M7 központi feldolgozóegység utasításokat hajt végre. A nem felejtő flash őrzi a programot, az SRAM a futás közbeni állapotot és puffereket. A chipen kívüli Blackbox-tár ettől külön szerepet tölt be.','A giroszkópminta a memóriába kerül, a CPU kiszámolja az eltérést a botparancstól, majd frissíti a motorparancsot. Áramtalanításkor az SRAM tartalma elvész, a firmware megmarad.'),
        item('MEMS-giroszkóp és SPI','MEMS / SPI','imu','A mikro-elektromechanikus (MEMS) giroszkóp parányi rezgő tömeget használ. Forgatáskor a Coriolis-hatás a rezgésre merőleges elmozdulást hoz létre. A chip elektronikája digitalizálja a jelet, a repülésvezérlő például SPI buszon olvashatja ki a három tengely adatait.','A giroszkóp szögsebességet érzékel. Ha elfordítod, majd az új helyzetben mozdulatlanul tartod a gépet, a forgási sebesség ismét nullához közelít. A gyorsulásmérő eközben a gravitáció összetevőit is érzékeli.'),
        item('Időzítő, DMA és megszakítás','Időzítő / DMA','mcu','Az időzítő órajelből számlál és meghatározott időpillanatokban kimeneti eseményt generálhat. A közvetlen memória-hozzáférés (DMA) adatokat mozgat memória és periféria között, miközben a CPU más feladatot futtathat. A megszakítás egy eseményre hívja fel a CPU figyelmét.','Egy időzített kimenet éleit a periféria a processzor pillanatnyi elfoglaltságától részben függetlenül hozhatja létre. A konkretizáláshoz a panel céldefiníciója és firmware-e is szükséges.')
      ]),
      topic('Az ESC háromfázisú teljesítményfokozata','bridge','Egyetlen motor három félhídjának kapcsolási elve látható. A MOSFET-ek típusa, darabszáma és párhuzamosítása hardververziónként eltérhet.',[
        item('MOSFET, kapu, drain és source','MOSFET','mos','A MOSFET szigetelt kapujának a source-hoz képesti feszültsége vezérli a drain és a source közötti csatornát. Bekapcsolva a kis ellenállású csatorna vezeti az áramot. Kapcsoláskor a kapu elektromos töltését gyorsan át kell rendezni.','A vezetési veszteség közelítően I² × R értékű. Kétszeres áram azonos ellenállásnál négyszeres vezetési hőt okoz; ez megmagyarázza a hűtés és a terhelési idő jelentőségét.'),
        item('Félhíd, meghajtó és holtidő','Kapumeghajtó','bridge','Egy félhídban a felső és alsó kapcsoló a fáziskivezetést felváltva a pozitív vagy negatív tápsínhez kötheti. A kapumeghajtó biztosítja a megfelelő vezérlőszintet és kapuáramot. Átváltáskor holtidő akadályozza meg a két kapcsoló egyidejű bekapcsolását.','Ha a két kapcsoló egyszerre vezetne, kis ellenállású út nyílna közvetlenül a tápsínek között. Ez megkülönböztetendő a motoron átfolyó hasznos áramtól.'),
        item('Három fázis és impulzusszélesség','U / V / W','bridge','Egy háromfázisú motorhoz három félhíd tartozik. Az ESC a megfelelő ágakat és az impulzusszélességet vezérli. A rövid kapcsolási impulzusokból a tekercsek induktivitása miatt folytonosabban változó fázisáram alakul ki.','A vezérlőtől érkező digitális gázparancsot és az ESC belsejében előállított fázisimpulzust különítsd el. Csak a második hajtja közvetlenül a motort.')
      ]),
      topic('Bothelyzet, célérték és visszacsatolás','control','Szemléltetés Acro módhoz. A numerikus görbét a kiválasztott rates-modell és a tengelyenkénti paraméterek adják.',[
        item('Botkitérés és skálázás','Bothelyzet','mcu','A szenzor vagy digitális bemenet nyers tartományát a rádió és a vezérlő egy normalizált botpozícióra képezi. A középpont és a végpont a következő számítások viszonyítási alapja.','Ha a szimulátorban a középre engedett botra lassú forgás marad, először a bemenet középértékét vizsgáld, mielőtt expo-val próbálnád ellensúlyozni.'),
        item('Rates-görbe mint függvény','Célsebesség','rates','A rates-modell a normalizált botkitérésből cél-szögsebességet számol. A görbe közép körüli meredeksége a finom célzásra, a végérték a teljes kitérésnél kért forgásra van hatással. Az expo módosítja az átmenetet.','650 fok/másodperc elméleti állandó forgás mellett egy teljes fordulat nagyjából 0,55 másodperc. A gyorsulás, a terhelés és a vezérlő válasza miatt a valódi fordulat tovább tarthat.'),
        item('Szabályozási hiba és motorparancs','Visszacsatolás','imu','A cél-szögsebességből levonható a giroszkóp által mért forgás. A vezérlő ebből a hibából számít korrekciót. A hurok új méréssel ismétlődik; a motor tényleges mozgása visszahat a következő érzékelőmintára.','Oldalszélben ugyanazt a kért szögsebességet más motorparancsokkal lehet elérni. A rates módosítása a kívánt mozgást, egy érzékelési hiba pedig a visszajelzést változtatja meg.')
      ])
    ],
    [
      topic('Soros cellák és feszültségmérés','battery','A feszültségosztó elvi mérőkapcsolás, nem a Seeker 3 paneljének jóváhagyott mérőpontja vagy beültetési terve.',[
        item('Soros cellák és töltés','4S cellasor','bat','A négy sorba kapcsolt cellán ugyanaz a főáram folyik. A kapocsfeszültségek összeadódnak, az amperórában mért kapacitás az egyes, azonos cellák kapacitásával egyezik meg. A leggyengébb cella hamarabb elérheti a megengedett határt.','Négy 650 mAh-s cellából 4S 650 mAh csomag állhat össze. Névleges 14,8 V mellett ez hozzávetőleg 9,62 Wh energia, ami már összehasonlítható más cellaszámú csomaggal.'),
        item('Feszültségosztó és Ohm-törvény','R1 és R2','adc','A két soros ellenálláson azonos áram folyik. Terheletlen kimenetnél az alsó ellenálláson mérhető feszültség: Ube × R2/(R1+R2). Az FC ilyen arányos jellel mérhet az analóg bemeneténél nagyobb akkufeszültséget.','Számpélda: 15 V bemenetből az 5:1 osztási arány 3 V-ot ad. Ez számítási példa; az adott panel bemeneti határát és tényleges osztóját a panel dokumentációja adja meg.'),
        item('ADC és felbontás','ADC','adc','Az analóg–digitális átalakító (ADC) egy referenciafeszültséghez viszonyítva számmá alakítja a mintát. A több bit finomabb lépcsőzést enged, de a referenciahibát és az ellenállások tűrését nem szünteti meg.','Ideális 12 bites mérésnél 4096 különböző kód lehetséges. A kijelzőn megjelenő sok tizedesjegy ettől még nem garantál pontosabb mérést.')
      ]),
      topic('A töltő szabályozási hurkai','charge','A töltő felépítésének tanulási modellje. Az airsoft töltő pontos típusa és a gyári kézikönyve szükséges a kompatibilitás eldöntéséhez.',[
        item('Állandó áramú töltési szakasz','Áramhurok','cccv','Állandó áramú (CC) szabályozáskor a töltő az áramot tartja a kiválasztott határon. A cellafeszültség közben emelkedik. A töltő a mért és a beállított áram különbsége szerint módosítja a kimenetet.','Az 1C egy 650 mAh-s akkunál 0,65 A-t, 850 mAh-nál 0,85 A-t jelent. Az engedélyezett töltési szorzót mindig az adott akku gyártója írja elő.'),
        item('Feszültséghatár és töltésvég','Feszültséghurok','cccv','Amikor a cella eléri a megadott végfeszültséget, a szabályozás állandó feszültségű (CV) szakaszba vált. A feszültséget korlátozza, miközben a felvett áram fokozatosan csökken. A töltés lezárásáról az adott algoritmus dönt.','A ciklus végén csökkenő töltőáram normális jelenség. Különböző kémiájú cellákhoz eltérő végfeszültség tartozhat, ezért a címkét a programválasztás előtt olvasd le.'),
        item('Cellamérés és passzív balansz','Balanszág','bat','A balanszcsatlakozó a cellák közötti csomópontokat is eléri. A töltő két szomszédos pont feszültségkülönbségéből külön-külön láthatja a cellákat. Egy passzív kiegyenlítő kapcsolt ellenálláson vezethet el töltést a magasabb feszültségű cellától.','A teljes csomag megfelelő feszültsége mellett is lehet egy cella túl magas és egy másik túl alacsony. Ezért hasznos a töltő cellánkénti nézete.')
      ]),
      topic('A vázon rögzített elektronika','board','A váz hordozza az akkumulátort, kamerát és stack-et. Az alábbi rajz a rászerelt elektronika általános rétegrendjét szemlélteti.',[
        item('Nyomtatott áramkör és átvezetés','Rézréteg / via','pcb','A nyomtatott áramkörben (PCB) szigetelő rétegek választják el a mintázott rézfóliákat. A furat falát borító vezető bevonat, a via, összeköthet kiválasztott rétegeket. A felső felületen látható vezetősáv a teljes összeköttetésnek csak egy része lehet.','Felszakadt forrszemnél az épnek látszó felület alatt is megszakadhat a belső réteg kapcsolata. Látatlanban ezért nem lehet biztosan kijelölni egy pótló vezeték végpontját.'),
        item('Földsík és visszavezető út','GND sík','pcb','Minden áram zárt hurkon folyik. A GND a választott feszültségreferencia és visszavezető hálózat. A valós réz ellenállása és induktivitása miatt nagy vagy gyorsan változó áram esetén eltérhet két távoli GND pont pillanatnyi feszültsége.','Egy erős gázadásra megjelenő képcsík oka lehet a táp vagy közös visszaút zavarása is. A jel és a hozzá tartozó visszaút együtt alkot áramkört.'),
        item('Hidegítőkondenzátor és tápsín','Helyi kondenzátor','pcb','A kondenzátor töltést tárol, így rövid ideig helyben fedezheti egy chip gyors áramigényét. A közel elhelyezett kis kondenzátor rövidebb nagyfrekvenciás áramhurkot hoz létre. A nagyobb energiatároló kondenzátor más időtartományban segíthet.','Ha a vezérlő nagy gázadásra újraindul, a rövid tápbeszakadás vizsgálata fontosabb lehet a statikus, terhelés nélküli feszültségnél.')
      ])
    ],[
      topic('Műholdjeltől a koordinátáig','gnss','Az M10 generáció dokumentált a gépnél. A MAX-M10S itt nyilvános példamodul, nem a beépített GPS pontos azonosítása.',[
        item('GNSS-antenna és bemeneti fokozat','RF-bemenet','gnss','A műholdjelek rádiófrekvenciás feszültséget keltenek a vevőantennán. A bemeneti szűrés és kis zajú erősítés a gyenge hasznos jel további feldolgozását segíti. A vevő több műhold jelét követheti párhuzamosan.','A GPS-modult felül eltakaró vezető anyag, rossz antennahelyzet vagy közeli zajforrás ronthatja a vételt. Először nyílt ég alatt figyeld meg a helyzetmegoldást.'),
        item('Jelfutási idő és órahiba','Helyzetmegoldás','gps','A vevő összeveti a műhold által kódolt időt a jel beérkezési idejével. Az ebből számolt látszólagos távolság az órahibát is tartalmazza. Ideális esetben négy vagy több műhold adata alapján három térkoordináta és egy óraeltérés becsülhető.','Sok, egymáshoz közeli irányban látszó műhold kedvezőtlenebb geometriát adhat, mint az égen jobban eloszló készlet. A műholdak száma a minőség egyik tényezője.'),
        item('UART és pozícióüzenetek','UART','gnss','Az UART aszinkron soros adatátvitelnél a küldő és a fogadó előre egyeztetett bitsebességet használ. A TX a küldő-, az RX a fogadóbemenet. Az adatüzenet tartalmazhat például koordinátát, sebességet és érvényességi információt.','Ha a repülésvezérlő nem lát adatot, a port, a protokoll és az adatsebesség ellenőrzése külön kérdés. A megérkezett üzenet még nem igazolja az érvényes helyzetmegoldást.')
      ]),
      topic('A Rescue navigációs hurka','nav','A tényleges Betaflight-verzió, szenzorok és konfiguráció határozza meg a használható funkciókat.',[
        item('Kezdőpont és irányvektor','Kezdőpont','gps','Az eltárolt kezdőpont és a pillanatnyi helyzet különbségéből adódhat a cél iránya és távolsága. A GPS a modell mozgásának irányát is megadhatja. Ez álló vagy oldalazó gépnél eltérhet az orr pillanatnyi irányától.','Hibásan rögzített kezdőpontnál matematikailag következetes, de számodra rossz irányt jelezhet a rendszer. A kiindulási hely visszaellenőrzése ezért külön lépés.'),
        item('Magasság és légnyomás','Magasságbecslés','baro','Barométer használatakor egy MEMS nyomásérzékelő a légnyomás változásából segít relatív magasságot becsülni. A DPS310 kapacitív érzékelőelemet használ. A helyi légáram és az időjárás is befolyásolhatja a mért nyomást.','Ugyanazon helyen a barometrikus magasság és a GNSS magassága nem szükségszerűen azonos. A két érzékelő más fizikai mennyiségből indul ki.'),
        item('Navigáció és belső szabályozás','Motorparancs','rescue','A navigáció meghatározza a közelítéshez kívánt mozgást, a belső stabilizálás pedig a gép tényleges forgását szabályozza. A visszacsatolt állapot ismét módosítja a kérést. Hibás helyzetadat vagy akadály esetén a helyes szögszabályozás sem biztosít szabad útvonalat.','A Betaflight dokumentált próbamenetében az adott verzió feltételeit kövesd. A kifogástalan GPS-jel és egy sikeres padpróba külön ellenőrzés.')
      ])
    ],[
      topic('A Pocket botjelétől a repülésvezérlőig','rfchain','Az ábra a 2,4 GHz-es ExpressLRS kapcsolat szerepeit választja szét. A Semtech termékek példák a rádiófizikára, nem igazolt Seeker-alkatrészszámok.',[
        item('Digitális csomag és rádiójel','Adócsomag','radio','A bothelyzeteket és kapcsolóállásokat digitális adatok hordozzák. Az adó a kiválasztott rádiós módban modulálja a vivőt. A másik oldalon az egyező sáv és megfelelő firmware-konfiguráció szükséges a dekódoláshoz.','Ha a rádió látja a telemetriát, de a vevő nézetében rossz tengely mozog, a csatornakiosztást is vizsgáld. Az ilyen hiba a rádiós átvitel sikerével együtt is fennállhat.'),
        item('Vevő és demoduláció','Vevőchip','radio','A rádióvevő a hasznos sávot kiválasztja, erősíti és a jelet digitális információvá alakítja. A környezeti zaj és más adók jelei is jelen lehetnek. A sikeres adatkinyerés függ az alkalmazott modulációtól és a jelminőségtől.','A vezérlő adatkapcsolat és az 5,8 GHz-es videó külön vevőt használ. Az egyik zavarát a másik normál működése mellett is tapasztalhatod.'),
        item('CRSF soros kapcsolat','CRSF / UART','elrs','A modellben a soros ELRS vevő általában CRSF adatkeretekben továbbítja a csatornákat és linkadatokat a repülésvezérlőnek. Ez egy vezetékes szakasz a rádiós vevő és az FC között. A rádiós és vezetékes szakasz önálló hibaforrás lehet.','Ha az ELRS kapcsolódik, de az FC-n nincs botmozgás, a megfelelő soros bemenetet, vevőprotokollt és kábelkiosztást is ellenőrizd.')
      ]),
      topic('Két külön mérőszám egy kapcsolatról','quality','Egy percenkénti vagy pillanatnyi érték csak a rádiós üzemmóddal és az időbeli változással együtt értelmezhető.',[
        item('Jelerősség és dBm','RSSI','elrs','A dBm logaritmikus teljesítményegység, amelynek viszonyítási alapja 1 mW. A negatívabb szám kisebb teljesítményt jelent. A vevő a vett jel erősségét RSSI-ként jelentheti.','A −80 dBm jelszint tízszer kisebb teljesítményű a −70 dBm-nél. Ettől a helyes csomagok aránya még mindkét helyen lehet azonos.'),
        item('Helyes csomagok aránya','LQ','elrs','Az LQ azt mutatja, hogy a várt csomagok mekkora része érkezett érvényesen. A vételi teljesítmény, a zaj, az interferencia és a kiválasztott mód együtt hat a csomagok dekódolhatóságára.','A 100%-os LQ önmagában nem mutatja meg a megmaradt tartalékot. A jelszint trendje és az RF-mód az értelmezéshez további információt ad.'),
        item('Telemetria és OSD','OSD adat','elrs','Az uplink a rádiótól a modell felé vezető irány, a downlink az ellenkező irány. Mindkettőnek lehet saját linkminősége. Az FC a kapott adatot ráírhatja a pilótakép OSD-rétegére.','A naplóban a mező nevét és az egységet mentsd. Egy RQly százalék és egy TRSS dBm szám más irányt és más fizikai mennyiséget jelenthet.')
      ]),
      topic('A vezetett jeltől a térbeli hullámig','antenna','Szemléltető RF-jelút. A konkrét csatlakozó és polarizáció megállapításához az antennán és a vevőn szereplő jelölés szükséges.',[
        item('Koaxiális tápvonal','Koaxiális kábel','vswr','A koaxiális kábelben a belső vezető és a külső árnyékoló együtt határozza meg a jel útját. A geometria és a szigetelőanyag szabja meg a hullámimpedanciát. Magas frekvencián a kábel már elosztott paraméterű tápvonalként viselkedik.','A megtört koax kívülről épnek tűnhet, de megváltozhat a belső szerkezete. Zavar esetén a csatlakozó mellett a kábel alakját is ellenőrizd.'),
        item('Illesztés és visszaverődés','Illesztés','vswr','Ha a terhelés impedanciája eltér a tápvonal hullámimpedanciájától, a hullám energiájának egy része visszaverődik. Az állóhullámarány (VSWR) az illesztés jellemzésének egyik módja. Egy jó illesztésű antenna sem sugároz minden irányban egyformán.','A csatlakozó menete, középérintkezője és a frekvenciasáv mind számít. Azonosnak látszó SMA és RP-SMA csatlakozóknál külön nézd meg a középső érintkezést.'),
        item('Polarizáció és iránykarakterisztika','Sugárzás','ant','A polarizáció azt írja le, hogyan változik az elektromos tér iránya. A sugárzási karakterisztika ezzel szemben megmutatja, mely térirányokban erősebb a jel. A két tulajdonság egymástól külön vizsgálandó.','Két azonos polarizációjú patch antenna rosszul nézhet egymás felé. A helyes RHCP/LHCP választást és a sugárzási főirányt ezért külön ellenőrizd.')
      ]),
      topic('A bot mechanikájától az USB-adatig','usb','A Pocket gyári Hall-gimbalt használ. Az ábra a szimulátoros vezérlés adatútját mutatja, és független a fedélzeti vevőtől.',[
        item('Hall-érzékelő a gimbalban','Hall-szenzor','hall','A bot elmozdulásakor változik egy mágnes és az érzékelő egymáshoz viszonyított helyzete. A Hall-effektus alapján az áramot vivő anyagban a rá merőleges mágneses tér oldalirányú feszültséget hoz létre. Az elektronika ebből pozíciót becsül.','A kalibráció a ténylegesen bejárt végpontokhoz és középhez rendeli a jelentett tartományt. A mágneses érzékelés ettől a mechanikai végpontbeállítástól még nem válik függetlenné.'),
        item('EdgeTX csatornák és kalibrálás','EdgeTX','edge','A rádión a kalibrált tengelyértékek a modell bemeneti és keverőbeállításain haladnak át. A szimulátoros profilból az USB-vezérlő numerikus tengelyértékeket küldhet a számítógépnek. A gépen választott rates további, külön átalakítás.','Ha túl lágy a közép, nézd meg, van-e expo egyszerre a rádión és a szimulátorban. Egymásra rakott görbék mellett nehezebb megismételni a beállítást.'),
        item('HID-jelentés és tengelyazonosító','USB HID','hid','A Human Interface Device (HID) eszköz leírja, milyen tengelyeket és gombokat jelent. A host a jelentésekből kiolvassa az értékeket, a Liftoff pedig tengelyeket rendel a gáz, roll, pitch és yaw feladatokhoz.','Ha a rendszer joystickként látja a Pocketet, de a gáz a yaw tengelyt mozgatja, a fizikai USB kapcsolat már működhet. A szimulátor hozzárendelését és irányát kell külön ellenőrizni.')
      ])
    ]
  ];
  Object.assign(src,{
    adc:['Texas Instruments · ADS131B04-Q1','https://www.ti.com/lit/ds/symlink/ads131b04-q1.pdf','Feszültségosztós mérés és analóg–digitális átalakítás.'],
    cccv:['Analog Devices · Akkutöltési alapok','https://www.analog.com/en/resources/technical-articles/usb-battery-charging-overview--maxim-integrated.html','Állandó áramú és állandó feszültségű töltési szakasz.'],
    baro:['Infineon · DPS310','https://www.infineon.com/assets/row/public/documents/24/45/infineon-dps310-pressure-sensor-pb-en.pdf','Kapacitív légnyomásérzékelő.'],
    vswr:['Analog Devices · VSWR','https://www.analog.com/en/resources/glossary/vswr.html','Tápvonal, terhelés és állóhullámarány.'],
    elrs:['ExpressLRS · Telemetria és rádiómódok','https://www.expresslrs.org/faq/','Az uplink és downlink adatai és a rádiós üzemmódok.'],
    ant:['Oscar Liang · RF-antennák és vétel','https://oscarliang.com/calculate-fpv-range/','Polarizáció és iránykarakterisztika.'],
    rates:['Betaflight · Rate Calculator','https://betaflight.com/docs/wiki/guides/current/Rate-Calculator','Botgörbék és forgási célértékek.'],
    rescue:['Betaflight · GPS Rescue','https://betaflight.com/docs/wiki/guides/current/GPS-Rescue','A telepített verzióval együtt értelmezendő navigációs funkció.'],
    edge:['EdgeTX · Modellbeállítás','https://manual.edgetx.org/v2.11/bw-radios/model-select/setup','Szimulátoros modellprofil és USB-vezérlés.']
  });
  for(const k of Object.keys(src)) if(!known.some(s => s.url===src[k][1])) known.push(ext(k));
  chapters[2][0].items.push(item('Tápegység, tekercs és feszültségszabályozás','Tápellátás','buck','Az MCU és érzékelői az akkufeszültségnél kisebb, stabil tápot igényelnek. Egy feszültségcsökkentő buck szabályozó gyorsan kapcsol, a tekercs mágneses terében és a kimeneti kondenzátor elektromos terében energiát tárol. A visszacsatolás az eltéréssel arányosan igazítja a működést.','A 4S akkufeszültség és az érzékelő tápfeszültsége két külön sín. A konkrét panel kapcsolása tartalmazhat lineáris szabályozót is. A buck elvi ábra önmagában nem azonosítja a fedélzeti típust.'));
  chapters[2][1].items.push(item('Testdióda és induktív áramút','Testdióda','mos','A motor tekercsének árama nem változhat ugrásszerűen. A kapcsolási állapot változásakor az áram másik vezető utat keres. A teljesítmény-MOSFET szerkezetéből adódó testdióda bizonyos állapotokban átveheti ezt az áramot. Szinkron kapcsolásnál a megfelelően vezérelt tranzisztorcsatorna is vezethet.','Az induktivitásban E = ½ × L × I² energia tárolódik. Amikor egy ág elenged, ezt az energiát a rendszernek vezetési úttal kell kezelnie. A dióda polaritása ezért lényeges.'));
  chapters[2][0].items.push(item('Digitális szűrés és mintavétel','Mintavétel','imu','A szenzor időközönként mintát vesz. A túl magas frekvenciájú rezgés helytelenül alacsonyabb frekvenciának látszhat a mintákban. A mintavételi és szűrőbeállítások célja, hogy a szabályozáshoz hasznos mozgás elkülönüljön a zajtól.','A sérült légcsavar okozta mechanikai rezgés forrása akkor is megmarad, ha a kijelzett jel simább egy új szűrőtől. Előbb a propellert és a rögzítést érdemes átnézni.'));
  const xlink=(g,p,s) => '#tech/'+g+(p===undefined?'':'/'+p)+(s===undefined?'':'/'+s);
  const back=(url,text)=>'<a class="textbtn back" href="'+url+'">‹ '+esc(text)+'</a>';
  function listItems(rows,urlFn,moreFn){
    return '<div class="engList">'+rows.map((x,i)=>'<a href="'+urlFn(i)+'"><strong>'+esc(x.name)+'</strong><small>'+esc(moreFn(i))+'</small></a>').join('')+'</div>';
  }
  // Original symbol drawings, expressed in the local coordinates of a diagram block.
  const glyphs={
    light:'<path d="M-20 -18l12 10m-4-10 12 10M-21 9h12l13-10v20L-9 9m14-12v23M5 9h15"/>',
    wave:'<path d="M-24 9h8v9h6v-26h6v17h6V4h5v-9h6v14h10"/>',
    signal:'<path d="M-24 9c4-23 9-23 13 0s9 23 13 0 9-23 13 0 7 15 9 0"/>',
    rf:'<path d="M0 20v-26m0 0-15-15m15 15 15-15M-8 20H8"/>',
    chip:'<rect x="-15" y="-14" width="30" height="30" rx="2"/><path d="M-9-14v-6m9 6v-6m9 6v-6m-18 36v6m9-6v6m9-6v6m-24-24h-7m7 9h-7m37-9h7m-7 9h7"/>',
    frames:'<rect x="-20" y="-13" width="40" height="28" rx="3"/><path d="M-12-5h23m-23 7h16m-16 6h23"/>',
    coil:'<path d="M-24 5h4c0-15 10-15 10 0 0-15 10-15 10 0 0-15 10-15 10 0 0-15 10-15 10 0h4"/>',
    rotor:'<circle r="18"/><circle r="5"/><path d="M0-18v8m0 20v8m18-18h-8m-20 0h-8"/>',
    wing:'<path d="M-23 4Q-15-16 23 4Q6 10-23 4zM-22 13q16 6 40 1"/>',
    flow:'<path d="M-20-9q15 2 32 0m-29 10q17 3 40 0m-42 10q15 2 31 0"/>',
    gates:'<path d="M-20-11h9V9h10v-20h10V9h11m-40 7h40"/>',
    cap:'<path d="M0-23v17m-16 0h32M-16 2h32M0 2v21"/>',
    feed:'<path d="M-20-8h34V8h-31m6-6-6 6 6 6"/>',
    led:'<path d="M-23 3h12l17-11v22L-11 3m18-12v24m0-12h16"/>',
    timer:'<circle r="16"/><path d="M0-9v10l9 4"/>',
    cell:'<path d="M-22 0h9m0-15v30m7-23V8M-6 0h10m0-15v30m7-23V8m0-8h12"/>',
    res:'<path d="M-23 0h8v-6h30V6h-30V0m30 0h8"/>',
    graph:'<path d="M-20-19v37h40M-18 13Q8 10 17-16"/>',
    board:'<path d="M-21-9h42v6h-42zm0 18h42v6h-42zM-6-3v12m13-12v12"/>',
    gnd:'<path d="M0-20V2m-17 0h34m-28 7h22m-17 7H6"/>',
    loc:'<circle r="15"/><circle r="5"/><path d="M-23 0h12m22 0h12M0-23v12m0 22v12"/>',
    bars:'<path d="M-20 16v-8h7v8zm12 0V0h7v16zm12 0V-9h7v25zm12 0v-34h7v34z"/>',
    lcd:'<rect x="-22" y="-14" width="44" height="28" rx="3"/><path d="M-9 20H9M0 14v6"/>',
    mems:'<path d="M-23 0h6l3-6 6 11 5-11 4 6h2m8 0h11"/><rect x="3" y="-9" width="11" height="18"/>',
    coax:'<path d="M-23 0h46m-36-8h25m-25 16h25"/><ellipse cx="12" cy="0" rx="4" ry="8"/>',
    usb:'<path d="M0 20v-37m-4 4 4-6 4 6M0 4l-11-7v-9M0-2l11-8v-4"/><circle cx="-11" cy="-14" r="2"/><rect x="9" y="-18" width="4" height="4"/>',
    line:'<path d="M-22 11l12-16 10 13 10-20 13 7"/>',
    fet:'<path d="M5-21v13h-9v16h9v13m-17-30V9m-10-9h10"/>'
  };
  const series={
    camera:['light','chip','wave'],radio:['wave','timer','rf'],receiver:['rf','wave','lcd'],
    motor:['coil','rotor','signal'],prop:['wing','flow','rotor'],drive:['chip','gates','coil'],
    fc:['chip','mems','timer'],bridge:['fet','gates','coil'],control:['graph','graph','feed'],
    battery:['cell','res','chip'],charge:['gates','graph','res'],board:['board','gnd','cap'],
    gnss:['rf','loc','wave'],nav:['loc','mems','gates'],rfchain:['frames','rf','wave'],
    quality:['bars','frames','lcd'],antenna:['coax','signal','rf'],usb:['mems','chip','usb']
  };
  const path = (data,css='') => '<path class="engTrace '+css+'" d="'+data+'"/>';
  const txt = (x,y,t) => '<text class="engMicro" x="'+x+'" y="'+y+'">'+esc(t)+'</text>';
  const circle=(x,y,r=3)=>'<circle class="engDot" cx="'+x+'" cy="'+y+'" r="'+r+'"/>';
  const symbol=(x,y,type,scale=1)=>'<g transform="translate('+x+' '+y+') scale('+scale+')" class="engGlyph">'+glyphs[type]+'</g>';
  const frame=(content,label,view='0 0 600 195')=>'<svg class="engDrawing" role="img" aria-label="'+esc(label)+'" viewBox="'+view+'">'+content+'</svg>';
  function architecture(t,g,p,s){
    const kind=t.diagram;
    const xs=[100,300,500], gy=68;
    const anchor=(i,x,y,w,h,contents)=>'<a href="'+xlink(g,p,i)+'" aria-label="'+esc(t.items[i].name)+'" class="engSvgLink '+(String(s)===String(i)?'engSel':'')+'"><rect class="engHit" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="10"/>'+contents+'</a>';
    let base=(kind==='receiver'?path('M28 45H54V64H67 M28 88H54V72H67'):'')+
      path('M100 68H500')+
      (['control','nav','charge','fc'].includes(kind)?path('M500 95V144H100V101','engFeedback')+txt(300,165,kind==='fc'?'Adat- és perifériabusz':'Visszacsatolt mérés'):'');
    // Sibling measurements and physical constituents are not serial signal stages.
    if(['board','prop','motor','charge','nav','quality','fc','bridge'].includes(kind)){
      const captions={board:'A hordozó és az áramkör elemei',prop:'Egymással összefüggő mechanikai jellemzők',motor:'Egy motor három nézőpontja',charge:'A töltő szabályozási és mérési funkciói',nav:'Irányítás és állapotbecslés',quality:'A két külön mérőszám megjeleníthető az OSD-n',fc:'A mikrovezérlő és perifériái',bridge:'Egy motor teljesítményfokozatának részei'};
      base=path('M100 110v19h400v-19m-200 0v19','engFeedback')+txt(300,154,captions[kind]);
    }
    const nodes=xs.map((x,i)=>anchor(i,x-65,gy-39,130,80,symbol(x,gy-9,series[kind][i],0.83)+'<text class="engNodeText" x="'+x+'" y="'+(gy+25)+'">'+esc(t.items[i].short)+'</text>')).join('');
    return frame(base+nodes,t.title,'0 0 600 '+(['control','board','prop','motor','charge','nav','quality','fc','bridge'].includes(kind)?178:128));
  }
  function circuitDiagram(type){
    let content='';
    if(type==='bridge'){
      content=path('M62 29H548 M62 163H548')+txt(70,20,'+VBAT')+txt(69,184,'GND');
      for(let i=0;i<3;i++){
        const x=175+150*i;
        content+=path('M'+x+' 29v16m0 31v35m0 30v22 M'+x+' 94h52')+symbol(x-5,61,'fet',.75)+symbol(x-5,126,'fet',.75)+circle(x,94)+txt(x+56,88,['U','V','W'][i])+txt(x-38,63,'GH')+txt(x-38,129,'GL');
      }
    } else if(type==='buck'){
      content=path('M50 65H125m0 0 44-17m4 17h53m72 0h220M210 65v62m0 20v10h298M385 65v45m0 15v32')+circle(210,65)+circle(385,65)+symbol(260,60,'coil',1.6)+path('M364 110h42m-42 14h42 M195 128h30m-30 0 15 17 15-17')+txt(57,46,'Vin')+txt(145,32,'Kapcsoló')+txt(262,34,'L')+txt(416,123,'C')+txt(523,50,'Vout')+txt(315,178,'Közös visszavezetés');
      // Freewheel diode points from GND (anode) toward switching node (cathode).
      content=content.replace('m-30 0 15 17 15-17','m-30 17 15-17 15 17z');
    } else if(type==='divider'){
      content=path('M72 43H275v11m0 29v22m0 0h179m-179 0v17m0 24v10')+circle(275,105)+symbol(275,68,'res',.65).replace('scale(0.65)','rotate(90) scale(.65)')+symbol(275,135,'res',.6).replace('scale(0.6)','rotate(90) scale(.6)')+symbol(275,169,'gnd',.7)+txt(81,33,'VBAT')+txt(310,74,'R1')+txt(310,141,'R2')+txt(451,96,'ADC bemenet')+txt(408,140,'Uki = Ube × R2 / (R1 + R2)');
    } else if(type==='board'){
      for(let i=0;i<3;i++)content+='<rect x="72" y="'+(45+i*38)+'" width="450" height="10" rx="2" class="engCopper"/>';
      content+='<rect x="183" y="44" width="11" height="88" class="engCopper"/>'+txt(127,34,'Rézréteg')+txt(185,157,'Átvezető furat')+txt(453,157,'Szigetelő hordozó')+path('M434 140v-29');
    } else {
      return '';
    }
    return frame(content,({bridge:'Az ESC három félhídja, motorfázisokkal',buck:'Aszinkron feszültségcsökkentő fokozat',divider:'Feszültségosztó és ADC',board:'Nyomtatott áramkör elvi keresztmetszete'})[type]);
  }
  function bread(g,p){return '<nav class="engBread" aria-label="Az atlasz útvonala"><a href="#tech">Technikai atlasz</a>'+(g===undefined?'':'<span>/</span><a href="'+xlink(g)+'">'+esc(window.tech[g].name)+'</a>')+(p===undefined?'':'<span>/</span><a href="'+xlink(g,p)+'">'+esc(window.tech[g].parts[p].name)+'</a>')+'</nav>'}
  function diagramCard(t,g,p,s){
    return '<section class="engPlate"><div class="engCaption"><span>Jelút és alkatrészek</span><small>Elvi működés</small></div><h2>'+esc(t.title)+'</h2>'+architecture(t,g,p,s)+'<div class="engLinks">'+t.items.map((x,i)=>'<a '+(String(s)===String(i)?'aria-current="page" ':'')+'href="'+xlink(g,p,i)+'">'+esc(x.short)+'</a>').join('')+'</div><p>'+esc(t.note)+'</p></section>';
  }
  function schem(t,i){
    const type=t.diagram==='fc'&&i===3?'buck':({bridge:'bridge',battery:'divider',board:'board'})[t.diagram];
    if(!type) return '';
    return '<figure class="engCircuit"><figcaption>'+({bridge:'Egy motor teljesítményfokozata',buck:'Egy feszültségcsökkentő áramkör',divider:'Az akkufeszültség mérőága',board:'A panel elvi keresztmetszete'})[type]+'</figcaption>'+circuitDiagram(type)+'<p>'+({bridge:'A három középpont az U, V és W motorfázis. GH és GL a felső és az alsó kapu vezérlőjele. A meghajtók és a védelmek el vannak hagyva.',buck:'A kapcsoló, a szabadonfutó dióda, az L tekercs és a C kondenzátor energetikai útja. A vezérlő és a visszacsatoló hálózat nincs kirajzolva.',divider:'Az ADC az R2 feszültségét érzékeli. A rajz értékek nélküli magyarázó példa.',board:'A vezető furat a kiválasztott rézrétegeket köti össze. A Seeker paneljének pontos rétegrendje gyártói rajz nélkül nem azonosítható.'})[type]+'</p></figure>';
  }
  function indexOf(value, arr){
    if(value===null||value===undefined||!/^\d+$/.test(String(value)))return undefined;
    const i=Number(value);return i<arr.length?i:undefined;
  }
  window.engineeringView = function (groupId,partId,subId) {
    const all=window.tech||[],g=indexOf(groupId,all);
    const group=all[g],p=group?indexOf(partId,group.parts):undefined,part=group?.parts[p],t=chapters[g]?.[p];
    const s=t?indexOf(subId,t.items):undefined,sub=t?.items[s];
    if(sub){
      return bread(g,p)+intro(sub.name,t.title,'','Mérnöki részletek')+'<div class="engPair"><article class="panel engArticle"><h2>Működés</h2><p>'+esc(sub.text)+'</p><h3>Mit jelent ez a gépeden?</h3><p>'+esc(sub.example)+'</p>'+schem(t,s)+'<div class="engRefs">'+link(src[sub.srcKey][1],src[sub.srcKey][0])+(g===2&&p===0&&s===1?' · '+link(src.mems[1],src.mems[0]):'')+'</div></article>'+diagramCard(t,g,p,s)+'</div>';
    }
    if(part&&t){
      return bread(g)+intro(part.name,part.intro,'',group.name)+'<div class="engPair">'+diagramCard(t,g,p)+'<section class="panel engArticle"><h2>Alkatrészek és jelek</h2>'+listItems(t.items,i=>xlink(g,p,i),i=>src[t.items[i].srcKey][0])+'</section></div><article class="panel lesson engUsage"><h2>A Seeker 3 projektben</h2><ol>'+part.steps.map(v=>'<li>'+esc(v)+'</li>').join('')+'</ol>'+link(part.url,'A részegység műszaki forrása')+'</article>';
    }
    if(group){
      return bread()+intro(group.name,'Válassz egy alkatrészt a működési rajzhoz, majd nyisd meg a rajta szereplő jelek vagy áramköri elemek magyarázatát.','','Seeker 3 · Részegység')+'<div class="engPair"><section class="panel engArticle"><h2>Alkatrészek</h2>'+listItems(group.parts,i=>xlink(g,i),i=>chapters[g][i].title)+'</section><section class="panel engMachine">'+photo(true)+'</section></div>';
    }
    return intro('Technikai atlasz','Kattints a Seeker 3 egyik jelölt részére. Az alkatrészektől a jelutakon át az áramkörökig követheted a működését.','','Deepspace Seeker 3')+'<div class="engPair"><section class="panel engMachine">'+photo(true)+'</section><section class="panel engArticle"><h2>Részegységek</h2>'+listItems(all,i=>xlink(i),i=>all[i].parts.map(p=>p.name).join(' · '))+'</section></div>';
  };
})();
