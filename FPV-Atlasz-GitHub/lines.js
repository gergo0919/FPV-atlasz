/* Saját, Liftoffban megépíthető útvonalak a cinematic leckékből. */
(() => {
  const split = 'Split-S · visszaforduló snitt';
  const orbit = 'Orbit · kilépés érintőn';
  const splitVideo = 'https://www.youtube.com/watch?v=WMJ0uWbGxJU&t=105s';
  const extras = [
    {name:split, level:'Haladó',group:'Szabadstílusból filmre',intro:'Egy magasabb kezdőképből ellenkező irányú, alacsonyabb kijáratra fordulsz. A felvétel témája az a tájrészlet, amely a félbukfenc végén megjelenik.',steps:[
      'Liftoffban válassz nyílt, nagy függőleges teret. Repüld meg előbb az alsó egyenest a kívánt kijárati irányban, és válassz egy távoli, könnyen felismerhető pontot.',
      'Indulj jóval magasabbról, az alsó egyenessel ellenkező irányban. Egy fél rollal fordulj fejjel lefelé. Lassan nézd vissza, hogy ekkor a látóhatár közel vízszintes-e.',
      'Húzott félbukfenccel vezesd lefelé az ívet. Az ismerős alsó irányba érkezve simítsd ki a gépet és fogd meg a süllyedést. A legelső próbákban csak azt vizsgáld, mekkora helyet használ el ez az ív a választott géppel.',
      'A következő menethez válassz olyan belépési pontot, ahonnan a távoli jel a kisimításkor kerül a kép közepére. A kijárat után három másodpercig tartsd tovább az egyenest.'],fix:'Ha az alsó egyeneshez kapkodva érsz vissza, kezdd magasabbról, nyíltabb térben. Visszanézéskor külön vizsgáld a fél roll véghelyzetét és a félbukfenc sugarát.',goal:'Három szimulátoros menet hasonló kijárati magassággal és ugyanazzal a távoli témával a kép közepén.',url:splitVideo,video:splitVideo},
    {name:orbit,level:'Középhaladó',group:'Szabadstílusból filmre',intro:'A freestyle orbit köre egy következő képre vezet át. A cél, hogy a téma fokozatosan hagyja el a képet, miközben a gép már egy távoli jel felé halad.',steps:[
      'Keress egy oszlopot vagy fát, mögötte távoli épülettel. Válassz az oszlop körüli körön egy pontot, ahol az érintő iránya az épület mellett visz el.',
      'Tág sugáron kezdj oldalazó orbitot. Tartsd a közeli téma méretét egyenletesen, és figyeld, hol tűnik fel a háttérben a kiválasztott épület.',
      'A jelölt pont előtt kezdd kisimítani az ívet. Fokozatosan hozd az orrot az új menetirányba, miközben a közeli oszlop a képszél felé csúszik.',
      'Repülj tovább egyenesen két-három másodpercig. A videón jelöld, melyik kockán veszi át a távoli épület a közeli tárgy szerepét. Ismételd az ellenkező irányból egy másik végcéllal.'],fix:'Ha az oszlop hirtelen kiugrik a képből, nyisd tágabbra a kör végét, és már korábban kezdd kiengedni a fordulót.',goal:'Két félkör külön irányban, mindkettőből egyenes kijárat és nevesíthető második téma.',url:'https://www.thedroneu.com/blog/types-of-shots-in-drone-cinematography/'}
  ];
  for (const extra of extras) if (!window.cinema.some(x => x.name === extra.name)) window.cinema.push(extra);
  const through='Egyenletes áthúzás',push='Közelítés egy témára',reveal='Takarásból feltárás',sTurn='Széles S-ív',gate='Kapus átrepülés',helix='Emelkedő spirál',hill='Talajkövetés lejtőn',side='Haladás a téma mellett',parallax='Oldalirányú parallaxis',circle='Egyenletes körözés';
  const routes = [
    ['Park és fák','A fasor mögötti tisztás','Egy világos tisztás a fák közötti térben.', 'A nyitóképen a közeli fasoré, a záróképen a tisztásé legyen a főszerep.',[[through,'A fasorral párhuzamosan, tág oldaltávolsággal vedd fel az utazósebességet.'],[reveal,'A fasor végén haladj tovább egyenesen, amíg a tisztás teljes szélességében megjelenik.'],[push,'Egy távoli fát célozva folytasd a snittet, a koronát három másodpercig a képen tartva.']]],
    ['Park és fák','Két fa, egyetlen ív','Két jól elkülönülő fa, mögöttük felismerhető épület.', 'A két korona felváltva vezesse a néző szemét, a végén az épület is jól kivehető legyen.',[[sTurn,'Kezdj széles S-ívet a két fa külső oldala mentén. Az első koronánál már keresd a második törzsét.'],[circle,'A második fa mellett szélesítsd ki a kanyart, amíg a háttérben felbukkan az épület.'],[orbit,'Simítsd ki az ívet az épület felé, és hagyd, hogy a törzs fokozatosan elhagyja a képet.']]],
    ['Épület és udvar','Homlokzattól a térig','Egy épület sarka és az udvar túloldalán álló tárgy.', 'A sarok elhaladása után a távoli tárgy legalább három másodpercig felismerhető legyen.',[[through,'Kényelmes tempóval állj rá a homlokzattal párhuzamos útvonalra.'],[reveal,'A falsarkot széles oldaltávolsággal hagyd el. Az eddig takart udvart mutasd meg egyetlen folyamatos mozgással.'],[push,'A túlsó oldalon lévő ablak vagy tábla felé haladj. A snitt végét még bőven a célpont előtt jelöld ki.']]],
    ['Épület és udvar','Az udvar két rétege','Egy közeli oszlop, háttérben a hosszú homlokzattal.', 'Az oszlop és az ablakok eltérő sebességgel mozduljanak a képen, a kijáratnál rángatás nélkül.',[[side,'Vedd fel az épületsor ritmusát, és egy ablakmagasságot tarts folyamatosan a képen.'],[parallax,'Amikor a közeli oszlop a képbe ér, haladj mellette tág íven. Az ablakok lassabban mozduljanak, mint az oszlop.'],[orbit,'Az oszlop körüli rövid ívről nyisd az útvonalat az udvar szabad vége felé.']]],
    ['Kapuk és pálya','A kapu mint képkeret','Egy széles kapu és mögötte jól látható, távoli tereptárgy.', 'A távoli tárgy a kapun át is látható legyen, és áthaladáskor maradjon egyenletes a tempó.',[[push,'Messziről helyezd a túloldali tereptárgyat a kapu közepére.'],[gate,'A nyílást egyenletes magasságon közelítsd és ugyanebben az irányban haladj át rajta.'],[through,'Őrizd meg az egyenest három másodpercig úgy, hogy a téma végig felismerhető maradjon.']]],
    ['Kapuk és pálya','Kanyarból a nyílásba','Egy oszlop, távolabb széles átrepülőnyílással.', 'A kapu már az utolsó forduló vége előtt kivehető legyen. Három ismétlésből kétszer azonos irányban érkezz ki.',[[circle,'Nagy sugarú félkörön indulj az oszlop mellett. A kör közepén keresd meg előre a kapu helyét.'],[orbit,'Az érintőn kilépve fordítsd az orrot a kapu felé, és hagyj magadnak hosszú bevezető egyenest.'],[gate,'Ha a kijárat látható, repülj át a kapu közepén és tarts ki egy egyenes véget.']]],
    ['Lejtő és gerinc','Kilátás a gerincről','Egy hegygerinc mögött kibomló völgy és egy távoli hegyoldal.', 'A völgy egyetlen nyugodt feltárással jelenjen meg és maradjon látható a kifutásban.',[[through,'A szimulátorban oldalról közelíts a gerinchez, a teljes útvonalon hagyj kényelmes függőleges tartalékot.'],[reveal,'A gerinc széle mellett elhaladva mutasd meg a túlsó hegyoldalt. A horizont legyen követhető.'],[push,'Tarts a távoli hegyoldal felé, és fejezd be a snittet még nyílt térben.']]],
    ['Lejtő és gerinc','Irányváltás a völgy fölött','Egy markáns lejtő és vele szemben távoli hegycsúcs.', 'A Split-S után ugyanabba a völgyirányba érkezz ki, és a snitt végén két másodpercig tartsd a távoli csúcsot.',[[split,'Nyílt szimulátoros légtérből, jóval a gerinc fölött kezdd. A fél roll és lefelé vezető félhurok kijáratát előre járd be.'],[hill,'Az előre kiválasztott, enyhe lejtő fölött vezess széles süllyedő ívet. A tereptörés előtt kezdj kisimítani.'],[through,'Fuss ki a völgy nyílt része fölé. Tartsd a kiválasztott távoli csúcsot a kép középső harmadában.']]],
    ['Torony és kémény','A torony megérkezik a képbe','Egy magányos építmény jól látható tetővonallal.', 'Az előtér után egyértelműen a torony legyen a tárgy, a kimenetben maradjon a teteje a képen.',[[reveal,'Kezdj egy távoli fal vagy fa széle mögött, és tárd fel a tornyot oldalirányú mozgással.'],[push,'Válaszd a tetővonal egyik pontját, és közelíts felé mérsékelt tempóban, széles oldaltávolsággal.'],[through,'A torony mellett haladj tovább előre kijelölt nyílt vonalon, utolsó pillanatos emelés nélkül.']]],
    ['Torony és kémény','Spirál a tetővonalig','A torony függőleges éle, a háttérben kibontakozó égbolttal.', 'A tetővonal és a háttér fokozatosan jelenjen meg, a kijáratban maradjon látható a horizont.',[[circle,'Az alsó ablakok magasságában vegyél fel egy kényelmes körívet.'],[helix,'Az ív megtartásával kezdj egyenletesen emelkedni. Egy függőleges él segítségével ellenőrizd a távolságot.'],[orbit,'A tető magasságát elérve fokozatosan nyisd ki a kört a következő távoli jel felé.']]]
  ];
  const locations = ['Bármilyen helyszín', ...new Set(routes.map(r => r[0]))];
  const id = name => window.cinema.findIndex(x => x.name === name);
  const ratings = ['Még nincs értékelve','Gyakorlom','Stabil','Magabiztos'];
  const stage = n => Math.max(0, Math.min(3, Number(window.skillLevel?.('cinematic', n)) || 0));
  const difficulty = n => ({'Kezdő':1,'Középhaladó':2,'Haladó':3}[window.cinema[id(n)].level] || 1);
  let place=locations[0], current=0;
  function ranked() {
    const selected=routes.filter(r=>place===locations[0] || r[0]===place);
    function score(r) {
      return r[4].reduce((sum,[name]) => {
        const practiced=stage(name);
        return sum + (practiced>=2 ? 2 : practiced===1 ? 1 : -difficulty(name)*1.5);
      },0);
    }
    return selected.sort((a,b)=>score(b)-score(a));
  }
  function routeCard(){
    const matches=ranked(), route=matches[current % matches.length];
    const [location,title,subject,goal,steps]=route;
    const stable=steps.filter(([name])=>stage(name)>=2).length;
    const assessed=steps.filter(([name])=>stage(name)>0).length;
    const progress=stable ? stable+' szakaszhoz már stabil az alapod.' : assessed ? 'A megjelölt mozdulatokat először külön is repüld meg.' : 'A szakaszokat először külön gyakorold. A leckék értékelése személyre szabja a sorrendet.';
    return '<div class="line-meta"><span>'+location+'</span><span>'+(current%matches.length+1)+' / '+matches.length+' útvonal</span></div><h3>'+title+'</h3><p class="line-subject"><strong>Téma</strong> '+subject+'</p><ol class="line-steps">'+steps.map(([name,body],i)=>'<li><span>'+['Belépés','Átmenet','Kilépés'][i]+'</span><a href="#cinematic/'+id(name)+'">'+name+'</a><p>'+body+'</p><small>'+ratings[stage(name)]+'</small></li>').join('')+'</ol><p class="line-goal"><strong>Sikercél</strong> '+goal+'</p><div class="line-bottom"><p>'+progress+'</p><button type="button" data-line-next>Másik útvonal</button></div>';
  }
  window.lineRecommender=()=>'<section class="line-widget" id="line-recommender" aria-labelledby="line-title"><div class="line-head"><div><h2 id="line-title">Cinematic útvonalajánló</h2><p>Válassz helyszínt a Liftoffban, és köss össze három leckét egyetlen snitté.</p></div><label>Gyakorlóhelyszín<select data-line-place>'+locations.map(x=>'<option'+(place===x?' selected':'')+'>'+x+'</option>').join('')+'</select></label></div><div class="line-body" aria-live="polite" data-line-body>'+routeCard()+'</div></section>';
  window.lineTeaser=()=>'<a class="line-teaser" href="#cinematic" data-line-open>Cinematic útvonal tervezése</a>';
  function update(focusNext){const el=document.querySelector('[data-line-body]');if(el){el.innerHTML=routeCard();if(focusNext)el.querySelector('[data-line-next]')?.focus({preventScroll:true});}}
  document.addEventListener('change',event=>{if(event.target.matches('[data-line-place]')){place=event.target.value;current=0;update(false);}});
  document.addEventListener('click',event=>{if(event.target.closest('[data-line-next]')){current=(current+1)%ranked().length;update(true);} if(event.target.closest('[data-line-open]')){requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById('line-recommender')?.scrollIntoView({block:'start'})));}});
})();
