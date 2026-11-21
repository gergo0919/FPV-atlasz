(() => {
  const sources = {
    seeker: ["DeepSpaceFPV · Seeker 3", "https://www.deepspacefpv.com/deepspace-seeker3-3inch-freestyle-fpv-drone-dji-o4-pro-analog-pnp-with-gps-4s-sub250g-p6408559.html", "Gyári konfigurációk, DC és XL váz, GPS és a kétféle ESC-firmware."],
    rotor: ["Rotorama · Seeker 3 analóg ELRS", "https://www.rotorama.com/product/deepspace-seeker-3-4s-elrs-s-gps", "Az analóg gép műszaki adatlapja és a drónnézet termékfotója."],
    pocket: ["RadioMaster · Pocket M2", "https://radiomasterrc.com/products/pocket-radio-controller-m2", "Rádióváltozatok, tápellátás és gyári dokumentáció."],
    cobra: ["SKYZONE · Cobra X V4", "https://www.skyzonefpv.com/collections/all/products/skyzone-cobra-x-v4-fpv-lcd-screen-analog-goggles-with-steadyview-receiver-dvr-head-tracker", "SteadyView vevő, kijelző, DVR és tápellátás."],
    bind: ["ExpressLRS · Párosítás", "https://www.expresslrs.org/quick-start/binding/", "A rádiómodul és a vevő firmware-verzióinak és párosításának feltételei."],
    lq: ["ExpressLRS · Fogalomtár", "https://www.expresslrs.org/info/glossary/", "A rádiós kapcsolat minősége, érvényes csomagok és jelerősség."],
    edge: ["EdgeTX · Modellbeállítás", "https://manual.edgetx.org/v2.11/bw-radios/model-select/setup", "USB-joystick és külön szimulátoros modellprofil a rádión."],
    lift: ["Liftoff · Kontroller támogatás", "https://www.liftoff-game.com/support?category=1&post=181&topic=70", "A számítógépes vezérlő felismerése és a Steam-beállítások."],
    rates: ["Betaflight · Rate Calculator", "https://betaflight.com/docs/wiki/guides/current/Rate-Calculator", "A botkitérés, a szögsebesség és a rates-modellek kapcsolata."],
    gps: ["Betaflight · GPS Rescue", "https://betaflight.com/docs/wiki/guides/current/GPS-Rescue", "Vészhelyzeti hazatérés, előfeltételek, tesztelés és verziófüggő működés."],
    motors: ["Betaflight · Motorok ellenőrzése", "https://betaflight.com/docs/wiki/app/motors-tab", "Motorok kiosztása, forgásirány és légcsavar nélküli próba."],
    setup: ["Betaflight · Beüzemelési útmutató", "https://betaflight.com/docs/wiki/getting-started/setup-guide", "Szenzorirányok, vezérlés, csatornák és biztonságos beüzemelés."],
    antenna: ["Oscar Liang · FPV-antennák és vétel", "https://oscarliang.com/calculate-fpv-range/", "Polarizáció, sugárzási karakterisztika és a vételt befolyásoló tényezők."],
    charge: ["ONYX · Balansztöltő kézikönyve", "https://www.spektrumrc.com/ProdInfo/Files/ONXC4101%20Manual-EN.pdf", "Akkukémia, cellánkénti végfeszültség és tárolási üzemmód."],
  };
  const part = (name, source, intro, ...steps) => ({name, intro, steps, url: sources[source][1]});
  window.extraSources = Object.values(sources).map(([name,url,desc]) => ({name,url,desc}));
  window.tech = [
    {name:"Kamera és videójel", parts:[
      part("Fedélzeti analóg kamera","rotor","A kamera a gép orrában a pilóta képét állítja elő. A Seeker 3 rendelhető több videórendszerrel, ezért a saját összeállításodban az Analog ELRS 2.4G + GPS opció számít.",
        "A kameradőlés dönti el, mekkora előrebillentésnél nézel a horizont felé. Liftoffban repülj végig egy egyenesen két különböző kameraszöggel, és figyeld meg, hogyan változik a kényelmes tempód.",
        "A valódi gépen a kamera mindkét oldali rögzítését ellenőrizd. Ha a látószög ütés után megváltozik, a megszokott belépési ív is másnak érződik.",
        "A szemüvegben látott kép a vezetést szolgálja. Cinematic felvétel tervezésénél külön tételként kezeld a fedélzeti rögzítőt, annak rögzítését és tömegét."),
      part("Videóadó és csatorna","rotor","A videóadó (VTX) a kamera képét továbbítja a szemüvegbe. A Rotorama az analóg összeállításnál PandaRC VT5804-BAT LITE adót tüntet fel.",
        "A gépen beállított sávhoz és csatornához keresd meg a pontos frekvenciát. A szemüveg azonos frekvencián fogadja a képet.",
        "A videórendszert a hozzá való antennával próbáld. Műhelyben rövid ideig használd, mert álló helyzetben hiányzik a menetszél.",
        "Széteső kép esetén először a csatornaegyezést, az antennacsatlakozókat és a kamera jelvezetékét vizsgáld. Az ELRS párosítása ettől külön művelet."),
      part("Cobra X V4 és DVR","cobra","Az 5,8 GHz-es, 48 csatornás Cobra X V4-ben a SteadyView vevő a két antenna jelét dolgozza fel. Használt szemüvegnél kérj fényképet a vevőmodulról is.",
        "Válaszd ki kézzel az adó csatornáját, majd állítsd be a kamerához illő 4:3 vagy 16:9 képarányt. A nyújtott kép a kapu szélességét is megtévesztően mutathatja.",
        "A gyári adatlap 1280 × 720-as LCD-t és 60 képkocka/másodperces DVR-t ír. A kijelző felbontása külön adat a beérkező analóg kép részletességétől.",
        "Rögzíts rövid próbát és játszd vissza. Az OSD-t is tartalmazó felvételen utólag megkereshető a képzavar vagy az a pont, ahol félrement a manőver.")
    ]},
    {name:"Motorok és légcsavarok", parts:[
      part("Aether 1505 motor","seeker","Négy kefe nélküli motor adja a tolóerőt. Az Aether 1505 név az állórész névleges átmérőjére és magasságára utal. Az analóg konfiguráció adatlapján 4000 KV szerepel.",
        "A KV az üresjárati fordulatszám és a feszültség arányára utal. Terhelt légcsavarral a tényleges fordulatszám ettől eltér.",
        "A gép vezérlője a négy motor tolóerejét külön változtatja. Így tudsz bedönteni, bólintani vagy az orr irányán fordítani.",
        "Pótmotorhoz egyeztesd a pontos típust, KV-t, furatkiosztást, tengelyt és csatlakozást. Sérülés után áramtalanított gépen hasonlítsd össze a négy harang szabad forgását."),
      part("Háromágú és kétágú propeller","rotor","A kereskedő HQProp 3×3×3 légcsavart sorol fel. Itt az első szám a hüvelykben mért átmérő, a második az emelkedés, a harmadik a lapátok száma.",
        "Cserekor vesd össze a tengelyfuratot, rögzítést, forgásirányt és a váznál maradó helyet. A 3 hüvelykes átmérő önmagában kevés a kompatibilitáshoz.",
        "Kétágú próbához ugyanazon a pályán, azonos akkuval és hasonló tempóval mérj. Jegyezd fel a repült időt, a megállíthatóságot és a vibrációt.",
        "Ha esés után új rezgés jelenik meg, ellenőrizd az összes lapát tövét és élét. A sérült készlet helyett ép, helyes irányú propellert szerelj fel."),
      part("Motorsorrend és forgásirány","motors","A vezérlő csak akkor tud stabilizálni, ha a kért motor és a tényleges motor helye, illetve forgásiránya egyezik.",
        "Vedd le mind a négy légcsavart. A Betaflight Motors felületén kövesd az adott verzió ellenőrző segédjét.",
        "Egyenként hasonlítsd össze a megmozduló motor helyét a képernyő ábrájával, majd ellenőrizd az egyes forgásirányokat.",
        "Csak áramtalanítás után szereld vissza a megfelelő jobb- és baljáratú légcsavarokat. Javítás után ugyanazt az ellenőrzést ismételd meg.")
    ]},
    {name:"Repülésvezérlő és ESC", parts:[
      part("F722 repülésvezérlő","setup","A repülésvezérlő (FC) összeveti a rádióval kért mozgást a giroszkóp által mért forgással. Az eltérés alapján folyamatosan korrigálja a motorparancsokat.",
        "Légcsavarok nélkül csatlakoztasd a gépet. Billentsd kézzel előre, majd jobbra, és nézd meg, hogy a képernyőn lévő modell ugyanabba az irányba fordul-e.",
        "A vevő nézetében külön mozgasd a roll, pitch, yaw és throttle tengelyt. Egyszerre egy sávnak kell a szándékodnak megfelelően megmozdulnia.",
        "Módosítás előtt készíts mentést a konfigurációról, és jegyezd fel a telepített verziót. Így egy későbbi eltéréshez van összehasonlítási alap."),
      part("40 A-es motorvezérlő","seeker","Az elektronikus fordulatszám-szabályzó (ESC) a repülésvezérlő kérését a motor tekercseinek vezérlésévé alakítja. A gyártó AM32 és BL32 szállítmányokat is megad.",
        "Az FC-n futó Betaflight és az ESC saját firmware-e külön rendszer. Az FC típusjelzése alapján az ESC firmware-e nem azonosítható biztosan.",
        "Szerelés előtt jegyezd fel az érkezett panel és a firmware azonosítóját. Fotózd le a csatlakozók helyét, mielőtt széthúzod a stack kábelét.",
        "Cserepanelnél ellenőrizd a tápfeszültséget, a rögzítési távolságot és a kábel lábkiosztását. Két egyforma alakú dugó különböző kiosztású lehet."),
      part("Rates és botérzet","rates","A rates azt adja meg, a bot kitéréséhez milyen kért szögsebesség tartozik. Ugyanaz a kézmozdulat más karakterű forgást indíthat el két különböző profilban.",
        "Actual rates esetén külön áll a közép körüli érzékenység, a teljes kitéréshez tartozó maximális szögsebesség és az átmenetet alakító expo.",
        "Liftoffban először egy hosszú egyenesen próbáld a finom iránykorrekciót, majd nyílt térben egy teljes orsót. A két gyakorlat a görbe eltérő tartományát teszi érezhetővé.",
        "Egyszerre egy paramétert változtass. A naplóba a modell nevét és mindhárom tengely értékeit írd, hogy később pontosan megismételhesd a tesztet.")
    ]},
    {name:"Akkumulátor és váz", parts:[
      part("4S akkuk és XT30","rotor","A 4S csomag négy sorba kapcsolt cellát tartalmaz. A Seeker 3 analóg adatlapján XT30 főcsatlakozó és 650–950 mAh ajánlott kapacitás szerepel.",
        "A tervezett 3 × 650 mAh és 1 × 850 mAh csomag kapacitása ebbe a tartományba esik. Vásárláskor ellenőrizd a cellaszámot, a csatlakozó polaritását, a méreteket és a kisütési terhelhetőséget is.",
        "A nagyobb kapacitás több tárolt töltést jelent, a repidő azonban függ a tömegtől és a repülési stílustól. Ugyanazon útvonalon hasonlíts össze egy könnyű és egy nehezebb csomagot.",
        "Mérd meg külön mindkét felszállókész összeállítást, a pánttal és az esetleges kamerával együtt. A gyári tömegjelölés a saját felszerelésed tömegét nem helyettesíti."),
      part("Balansztöltés és tárolás","charge","A balansztöltő a sorba kötött cellák feszültségét külön is figyeli. A töltőprogramot a tényleges akkukémia és a gyártó előírása alapján válaszd ki.",
        "Nézd meg a töltő pontos típusának kézikönyvében, támogatja-e a 4S LiPo balansztöltést. Ellenőrizd a főcsatlakozó, a balanszvezeték és az adapterek illeszkedését.",
        "Normál LiPo-nál a teljes töltési végfeszültség jellemzően 4,20 V cellánként, tehát 4S esetén 16,80 V. LiHV akkunál a címke és a kézikönyv külön programot írhat elő.",
        "A címke szerinti töltőáramot használd, töltés közben maradj a közelben, és sérült vagy felpuffadt csomagot ne tölts. Hosszabb pihenőhöz használd a megfelelő tárolási programot."),
      part("Deadcat váz és rögzítés","rotor","A DC változat első karjainak elhelyezése segít kívül tartani a légcsavarokat a kamera látómezején. A váz a motorok geometriáját és az elektronika védelmét is meghatározza.",
        "Kar vagy lemez rendelésénél egyeztesd a Seeker 3 típust, a 3 hüvelykes méretet és a DC kivitel jelölését. Az XL más vázváltozat.",
        "A repülőakkumulátor helyét úgy válaszd, hogy a pánt ne nyomjon vezetéket, és az akku kábele ne érhessen a légcsavarok körébe.",
        "Ütközés után nézd végig a karokat, a motorrögzítést és a rétegek szélét. Írd a javítási naplóba, hol találtál repedést vagy fellazult kötést.")
    ]},
    {name:"GPS és tájékozódás", parts:[
      part("M10 helymeghatározó","seeker","A Seeker 3 GPS-modulja elöl kapott helyet. A műholdas helymeghatározásból a vezérlő helyzetet, haladási irányt és talajhoz viszonyított sebességet számíthat.",
        "A helyzetmegoldást szabad ég alatt ellenőrizd. A kijelzett műholdszám mellett figyeld a rögzített kezdőpontot és a koordináták stabilitását.",
        "A haladási irány mozgásból számolható. Álló helyzetben a gép orrának pontos iránya és a GPS által mutatott irány eltérhet.",
        "A hazafelé mutató nyíl és a távolság a rögzített kezdőponthoz viszonyít. Téves kezdőponttal a kijelzés a helyes számítás mellett is félrevezet."),
      part("GPS Rescue","gps","A GPS Rescue beállított vészhelyzeti funkció. A cél, hogy megfelelő feltételek mellett visszavezesse a gépet a kezdőpont közelébe, ahol ismét átveheted az irányítást.",
        "A telepített Betaflight-verzióhoz tartozó útmutatót olvasd el. A működés előfeltétele a helyes GPS-adat, a megfelelő kezdőpont és a működő repülésvezérlés.",
        "Vizsgáld meg, van-e akadály a várható visszatérési pályán. A GPS helyzetadatot szolgáltat, a faágakat és vezetékeket nem érzékeli.",
        "A funkciót a dokumentáció szerinti, fokozatos próbasorral, nyitott területen ellenőrizd, és gyakorold a kézi irányítás visszavételét.")
    ]},
    {name:"Antennák és rádióvezérlés", parts:[
      part("ELRS vevő és RadioMaster Pocket","bind","A 2,4 GHz-es ExpressLRS kapcsolat a botmozdulatokat továbbítja a gépnek. A Pocket ELRS változatát a Seeker 3 azonos sávú ELRS vevőjével lehet párosítani.",
        "Ellenőrizd a rádió változatát és a vevőt. A Pocket CC2500 kivitele más rádiós rendszert használ, az analóg videó pedig külön kapcsolaton érkezik a szemüveghez.",
        "A párosításhoz kövesd az adott firmware-hez tartozó ExpressLRS útmutatót. Az adó- és vevőoldal főverziójának és a szabályozási tartománynak egyeznie kell.",
        "Sikeres kapcsolódás után levett propellerekkel nézd meg a Betaflight vevőoldalán az összes tengelyt és az élesítőkapcsolót. Ezzel a teljes parancsutat ellenőrzöd."),
      part("Linkminőség az OSD-n","lq","Az LQ (link quality) a megérkezett érvényes rádiócsomagok arányát mutatja. Az RSSI a vett jelerősséghez kapcsolódik. A két érték más kérdésre válaszol.",
        "Az OSD-be a használt rendszerhez illő LQ és RSSI dBm mezőket tedd ki. Így a videófelvételen is látszik, hogyan alakult a vezérlőkapcsolat.",
        "Azonos körülmények között figyeld a tendenciát. A működési határ értelmezése függ az alkalmazott rádiós üzemmódtól.",
        "A szemüveg képhibáit és a rádiós telemetriát külön jegyezd fel. Erős ELRS kapcsolat mellett is lehet gyenge az analóg videó."),
      part("Videóantenna és polarizáció","antenna","A gép videóantennája és a szemüveg antennái egy rendszert alkotnak. Egyeztetni kell a frekvenciasávot, a polarizációt és a tényleges csatlakozót.",
        "Körpolarizált párnál az RHCP adóhoz RHCP vevőantennát, az LHCP adóhoz LHCP vevőantennát válassz. A szín alapján a polarizáció nem azonosítható megbízhatóan.",
        "A körsugárzó környezetében sok irányból lehet vétel, az irányított patch előre koncentrál. A patch helyzetét a repült területhez igazítsd.",
        "Használt szettnél külön ellenőrizd az SMA vagy RP-SMA csatlakozót és a középérintkezőt. A szemüveg típusa önmagában nem ad kiszámítható hatótávot."),
      part("Pocket mint USB-s kontroller","edge","A Liftoff USB-joystickként fogadhatja a rádió botjainak jeleit. Ehhez elég a Pocket és egy adatátvitelre alkalmas USB-kábel.",
        "Tarts külön szimulátoros modellprofilt a rádión. Ebben az EdgeTX útmutatása szerint kikapcsolhatók a rádiófrekvenciás modulok.",
        "Csatlakoztasd a bekapcsolt rádiót az adatportra, és válaszd az USB Joystick/HID módot. A Liftoff kontrollerbeállításaiban végezd el a kalibrálást a teljes botúttal.",
        "Egyesével ellenőrizd a négy tengelyt. Ha kettő ugyanazt mozgatja vagy az irány fordított, javítsd a hozzárendelést, majd mentsd a profilt.")
    ]}
  ];
})();
