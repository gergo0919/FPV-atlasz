(() => {
  const storageKey = 'fpvatlas.skills.v1';
  const labels = ['Még nem tudom', 'Bizonytalan', 'Stabil', 'Magabiztos'];
  const difficulties = ['Kezdő', 'Középhaladó', 'Haladó', 'Mester'];
  const tracks = ['freestyle', 'cinematic'];
  const obj = value => value && typeof value === 'object' && !Array.isArray(value);
  const esc = x => String(x).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const lessons = track => track === 'freestyle' ? (window.tricks || []) : track === 'cinematic' ? (window.cinema || []) : [];
  function readState() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey));
      return obj(value) ? value : {};
    } catch { return {}; }
  }
  const rating = (store, track, name) => {
    const value = store[track]?.[name];
    return Number.isInteger(value) && value >= 1 && value <= 3 ? value : 0;
  };
  window.skillLevel = (track, name) => rating(readState(), track, name);

  // Each sequence starts with its prerequisite(s); transformed and mirrored variants reuse the base lesson.
  const graphs = {freestyle: Object.create(null), cinematic: Object.create(null)};
  function path(track, ...stages) {
    for (let i = 1; i < stages.length; i++) {
      for (const name of [stages[i]].flat()) {
        const current = graphs[track][name] || [];
        graphs[track][name] = [...new Set([...current, ...[stages[i - 1]].flat()])];
      }
    }
  }
  const f = (...s) => path('freestyle', ...s), c = (...s) => path('cinematic', ...s);
  f('Roll', 'Double Roll');
  f('Front Flip', 'Double Flip');
  f('Roll', 'Split-S', ['540 Split S','Splitback','Split Yaw','Split-S Roll','Split Stall Matty Rewind']);
  f('Back Flip','Powerloop',['Power Split','Power Flip','Reversed Power Flip','Power Roll','Power Swap','Blind Loop','Stingy Loop','Reverse Powerloop','Immelmann']);
  f('Immelmann',['Immelmann 540 Rollout','Immelloop','Immelmatt']);
  f(['Front Flip','Roll'],['Inverted Rewind','Segmented Flips/Rolls','Juicy Flick','Rubik’s Cube','Cubik’s Rube']);
  f('Juicy Flick',['Juicy Flick Double Roll','Forani','True Barani']);
  f(['Flat Yaw Spin','Roll'],'Vanny Roll');
  f(['Flat Yaw Spin','Front Flip'],'Inverted Yaw Spin',['Inverted Yaw Tracking','Inverted Uh-uh']);
  f(['Inverted Yaw Spin','Powerloop'],'Inverted 360 Powerloop');
  f('Gap',['Knife Edge','Gap Roll','Beginner Matty','Maverick Loop']);
  f('Knife Edge',['Knife Edge Roll','Reverse Knife Edge','Ninja Star']);
  f(['Gap','Juicy Flick'],'Gap Juicy Flick');
  f(['Gap','Inverted Yaw Spin'],'Inverted Yaw Spin Gap');
  f(['Beginner Matty','Front Flip'],'Matty Flip',['Matty Twister','Half Matty','Matty 360','Loop to Matty','Anti Matty','Power Matty','Matty Roll','Look Back Matty','Power Switch','Barani']);
  f('Half Matty','540 Half Matty');
  f('Barani',['Rollani','Flipani']);
  f('Maverick Loop',['Mavvy Roll','Half Mavvy','Mavik’s Loop','Mavani','Donkey Loop','Beginner Switch','Mavvelmann','Mavvy Back Flip']);
  f('Flat Yaw Spin','Orbit','Cradle',['Whiplash','Side-Lock Rewind','Trippy Spin']);
  f('Whiplash','Pole Dance');
  f('Trippy Spin',['Trippy Switch','Trippy Spin Front Flip','Trippy Spin Back Flip','Trippy Spin Roll']);
  f('Trippy Spin Roll','Double Rolling Trippy Spin');
  f('Trippy Switch','Trippy Spin Figure 8');
  f('Roll','Jump Rope',['Cinnamon Roll','Burrito Roll','Side Loop','Double Dutch']);
  f('Stall','Stall Rewind',['Stall Flip Rewind','Stall 360 Rewind','Stall Matty Rewind','Stall Half Matty Rewind','Stall 540 Half Matty Rewind']);
  f('Stall','Building Dive',['Reverse Dive','Tornado Dive','Eject Roll']);
  f('Eject Roll','Stellar Eject Roll');
  f('Wall Ride',['Wall Tap','Reverse Wall Ride','Rail Slide']);
  f('Wall Tap',['Roll Tap','Loop Tap','Downtown Tap','Maverick Tap Rewind','Power Switch Tap','Ceiling Tap']);
  f('Look Back','Snapback','Snapback 540');
  f('Flare Stop','Perch','Docking');
  f('Roll','Barrel Roll');
  c('Egyenletes áthúzás',['Finom botkezelés és rates','Kameraszög és utazósebesség','Közelítés egy témára','Visszanézés és hibajegyzet']);
  c('Közelítés egy témára',['Oldalirányú parallaxis','Takarásból feltárás','Hátráló távolítás']);
  c('Oldalirányú parallaxis',['Haladás a téma mellett','Egyenletes körözés']);
  c('Egyenletes körözés','Emelkedő spirál');
  c('Kameraszög és utazósebesség',['Széles S-ív','Képkockasebesség és mozgásérzet']);
  c('Széles S-ív',['Kapus átrepülés','Talajkövetés lejtőn']);
  c(['Takarásból feltárás','Széles S-ív','Közelítés egy témára'],'Vágás nélküli összekötött snitt');
  const aliases = {
    'McStuffins Strong Side':'Roll', 'Speed Pump':'Flare Stop','Huck Strong Side':'Front Flip','50-50':'Perch','Rewind':'Inverted Rewind',
    'Reverse Orbit Strong Side':'Orbit','Boomerang Strong Side':'Orbit','Alley-Oop Strong Side':'Look Back','Bonk':'Wall Tap','Slingshot':'Stall Rewind',
    'Nose Up Wall Tap':'Wall Tap','MattEZy Beginner Matty':'Beginner Matty','Tidwell Flip Strong Side':'Knife Edge','Nose Up Roll Tap':'Roll Tap',
    'Downtown Front Flip':'Downtown Tap','Wall Ride Strong Side Roll':'Wall Ride','Wallie Strong Side':'Wall Ride','Side Lock Rewind Strong Side':'Side-Lock Rewind',
    'Moonwalk':'Look Back','Dive Reverse':'Building Dive','Gap Strong Side Roll':'Gap Roll','Power Loop Strong Side Roll':'Power Roll','Mavvy Loop Strong Side Roll':'Mavvy Roll',
    'IYS Track WS':'Inverted Yaw Tracking','Look Back SS Roll':'Look Back','Flip Ceiling Tap':'Ceiling Tap',"Rubik's Cube SS":'Rubik’s Cube',
    "Mabiik's Mavvy Rubik's":'Mavik’s Loop','Smatty Somermatty':'Matty Flip','Twatty Twister Matty SS':'Matty Twister',
    'SPANG Tornado':'Tornado Dive',"Back Flip Rubik's Pendulum":'Rubik’s Cube','Trippy SS Roll':'Trippy Spin Roll','TS Figure 8':'Trippy Spin Figure 8',
    "Matty Rubik's":'Matty Flip','Hurricane SS Gap':'Hurricane WS'
  };
  const groupBase = {'Szabad légtér':'Roll','Hurkok':'Powerloop','Matty-változatok':'Matty Flip','Split-S-változatok':'Split-S','Oszlop körüli trükkök':'Orbit','Oldalirányú hurkok':'Jump Rope','Visszafordítások':'Stall Rewind','Fal és felület':'Wall Ride','Kapu és pontosság':'Gap','Összetett elemek':'Front Flip'};
  function prerequisites(track, lesson, existing) {
    const explicit = graphs[track][lesson.name];
    if (explicit) return explicit.filter(s => existing.has(s));
    if (track !== 'freestyle') return [];
    const base = aliases[lesson.name] || lesson.name.replace(/ (Strong Side|Weak Side|SS|WS)$/,'').replace(/^Strong Side /,'');
    if (base !== lesson.name && existing.has(base)) return [base];
    const group = groupBase[lesson.group];
    if (lesson.level !== 'Kezdő' && group !== lesson.name && existing.has(group)) return [group];
    if (lesson.level !== 'Kezdő' && !group) {
      const knownBase = /roll/i.test(lesson.name) ? 'Roll' : /loop/i.test(lesson.name) ? 'Powerloop' : /spin/i.test(lesson.name) ? 'Inverted Yaw Spin' : 'Front Flip';
      if (knownBase !== lesson.name && existing.has(knownBase)) return [knownBase];
    }
    return [];
  }
  function options(track, store) {
    const pool = lessons(track), names = new Set(pool.map(x => x.name));
    return pool.map((lesson,index) => {
      const req = prerequisites(track, lesson, names);
      const value = rating(store,track,lesson.name);
      const difficulty = Math.max(0,difficulties.indexOf(lesson.level));
      return {lesson,index,req,value,difficulty,ready: req.every(n => rating(store,track,n) >= 2)};
    });
  }
  function recommend(track, exclude) {
    const store = readState(), rows = options(track,store);
    const context = exclude === undefined || exclude === null || exclude === '' ? null : rows[Number(exclude)];
    const candidates = rows.filter(r => r !== context);
    // Mastered building blocks unlock their direct next step ahead of unrelated catalog order.
    const score = r => {
      const connection = context && r.req.includes(context.lesson.name) ? 70 : 0;
      const breadth = r.req.length ? 45 + Math.min(r.req.length,3)*3 : 0;
      const sameGroup = context && context.lesson.group === r.lesson.group ? 4 : 0;
      return connection + breadth + sameGroup - r.difficulty*6;
    };
    const unknown = candidates.filter(r=>r.value===0);
    const eligible = unknown.filter(r=>r.ready).sort((a,b)=>score(b)-score(a) || a.index-b.index);
    const low = candidates.filter(r=>r.value===1);
    const firstSkill = track==='freestyle'?'Roll':'Egyenletes áthúzás';
    const review = low.sort((a,b)=> {
      const need = r => (context?.req.includes(r.lesson.name)?200:0) + unknown.filter(u=>u.req.includes(r.lesson.name)).length + (r.ready?10:0);
      return need(b)-need(a) || a.index-b.index;
    })[0];
    const steady = candidates.filter(r=>r.value===2).sort((a,b)=>b.difficulty-a.difficulty||a.index-b.index);
    const unmarked = rows.every(r=>r.value===0);
    const unmet = context?.req.map(n=>candidates.find(r=>r.lesson.name===n)).find(r=>r && r.value<2 && r.ready);
    const foundation=review&&review.ready&&unknown.some(u=>u.req.includes(review.lesson.name))?review:null;
    const next = unmet || foundation || (unmarked && !context ? eligible.find(r=>r.lesson.name===firstSkill) : null) || eligible[0] || review || steady[0] || null;
    return {rows,next,review,unmet,context};
  }
  const skillLabel = n => labels[n];
  function controls(track,index,detail) {
    const x=lessons(track)[index];
    if (!x) return '';
    const value=window.skillLevel(track,x.name);
    const attrs=' data-track="'+track+'" data-index="'+Number(index)+'"';
    const checked = '<label class="skillCheck"><input type="checkbox" data-skill="check"'+attrs+' aria-label="'+esc(x.name)+' – már tudom"'+(value?' checked':'')+'><span>Már tudom</span></label>';
    const select = '<label class="skillSelect"><span>Magabiztosság</span><select data-skill="level"'+attrs+' aria-label="'+esc(x.name)+' – magabiztosság">'+labels.map((s,i)=>'<option value="'+i+'"'+(i===value?' selected':'')+'>'+s+'</option>').join('')+'</select></label>';
    return '<div class="skillControls'+(detail?' skillFull':'')+'">'+(detail?'<h3>Saját tudásszintem</h3>':'')+checked+select+'</div>';
  }
  window.masteryCard = (track,index) => controls(track,index,false);
  window.masteryDetail = (track,index) => controls(track,index,true);

  document.addEventListener('change', event => {
    const control=event.target;
    if (!control.matches?.('[data-skill]')) return;
    const {track,index,skill}=control.dataset, lesson=lessons(track)[index];
    if (!lesson || !tracks.includes(track)) return;
    const state=readState();
    const level=skill==='check' ? (control.checked ? Math.max(1,rating(state,track,lesson.name)) : 0) : Number(control.value);
    if (!Number.isInteger(level)||level<0||level>3) return;
    const values=obj(state[track])?state[track]:{};
    if (level===0) delete values[lesson.name]; else values[lesson.name]=level;
    state[track]=values;
    try { localStorage.setItem(storageKey,JSON.stringify(state)); }
    catch { alert('A böngésző nem tudta menteni a tudásszintedet. Ellenőrizd a szabad tárhelyet.'); window.draw?.(); return; }
    if (typeof window.draw==='function') {
      window.draw();
      const controls=document.querySelectorAll('[data-skill]');
      for (const item of controls) {
        if (item.dataset.track===track && item.dataset.index===index && item.dataset.skill===skill) {item.focus({preventScroll:true});break;}
      }
    }
  });

  window.recommendation = (track,excludeIndex) => {
    if (!tracks.includes(track)) return '';
    const {rows,next,review,unmet,context}=recommend(track,excludeIndex);
    const link = r => '<a href="#'+track+'/'+r.index+'">'+esc(r.lesson.name)+'</a>';
    const count=rows.filter(r=>r.value>0).length;
    const meter='<span class="skillCount">'+count+' / '+rows.length+' megjelölve</span>';
    const allStrong = rows.length>0 && rows.every(r=>r.value===3);
    const alt = review && review!==next ? '<p class="skillReview"><strong>Visszagyakorlás</strong> '+link(review)+' · Bizonytalanra jelölted. Ismételd meg a lecke sikerkritériumát.</p>' : '';
    if (allStrong && rows.length>1) {
      const start=context||rows.find(r=>r.lesson.name===(track==='cinematic'?'Egyenletes áthúzás':'Roll'))||rows[0];
      const end=rows.find(r=>r!==start&&r.req.includes(start.lesson.name))||rows.find(r=>r!==start);
      return '<section class="skillRec"><div class="skillRecHeader"><h3>Következő kombinációd</h3>'+meter+'</div><div class="skillNext">'+link(start)+' <span>majd</span> '+link(end)+'</div><p>Minden leckét magabiztosnak jelöltél. Próbáld a két mozdulatot egyetlen folyamatos menetben, és figyeld meg a köztük lévő átmenetet.</p></section>';
    }
    if (!next) {
      return '<section class="skillRec"><h3>'+(allStrong?'Minden lecke magabiztosan megy':'Gyakorlási javaslat')+'</h3><p>'+(allStrong?'Köss össze két ismert mozdulatot egy vonallá, és jegyezd fel a sikeres ismétléseket.':'Az elérhető leckékből ezen a nézeten nincs további javaslat.')+'</p>'+meter+'</section>';
    }
    let why;
    if (unmet) why='A megnyitott lecke egyik előfeltétele. Gyakorold stabil szintig a továbblépéshez.';
    else if (next.value===1) why='Bizonytalanra jelölted. Ismételd a sikerkritériumig, majd értékeld újra.';
    else if (next.value===2) why='Stabilan megy. Próbáld új pályán vagy rövid sorozatban, majd értékeld a magabiztosságodat.';
    else if (next.req.length) why='Ezeket az alapokat már stabilnak vagy magabiztosnak jelölted: '+next.req.map(esc).join(', ')+'.';
    else if (!count) why='Ez a belépő gyakorlat önállóan elkezdhető. Jelöld a tudásszintedet, hogy hozzád igazodjon a következő lecke.';
    else why='Önállóan elkezdhető gyakorlat a következő alapmozdulat elsajátításához.';
    const title=unmet?'Gyakorold az alapját':next.value?'Erősítsd meg a tudásodat':'Következő ajánlott lecke';
    return '<section class="skillRec"><div class="skillRecHeader"><h3>'+title+'</h3>'+meter+'</div><div class="skillNext">'+link(next)+'<span>'+esc(next.lesson.level)+'</span></div><p>'+why+'</p>'+alt+'</section>';
  };
})();
