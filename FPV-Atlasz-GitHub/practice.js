(() => {
  'use strict';
  const sessionsKey = 'fpvatlas.practice.sessions.v1';
  const styles = ['Freestyle', 'Cinematic'];
  const levels = ['Kezdő', 'Középhaladó', 'Haladó', 'Mester', 'Szakértő'];
  const localDate = date => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  const today = () => localDate(new Date());
  const asDate = str => new Date(str+'T12:00:00');
  const short = date => asDate(date).toLocaleDateString('hu-HU',{month:'short',day:'numeric'});
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const options = (arr,value) => arr.map(i=>'<option'+(i===value?' selected':'')+'>'+esc(i)+'</option>').join('');
  const id = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36)+Math.random().toString(36).slice(2);
  const read = (key,fallback) => {try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;}};
  const sessions = () => read(sessionsKey,[]);
  let filter = 'Mindkettő';
  const sum = (rows,key) => rows.reduce((n,s)=>n+(Number(s[key])||0),0);
  const accuracy = rows => sum(rows,'reps') ? Math.round(100*sum(rows,'success')/sum(rows,'reps')) : 0;
  const field = (label,control) => '<label class="field"><span>'+label+'</span>'+control+'</label>';
  function newSession(maneuver='',existingId='',track='') {
    const all=sessions(), row=all.find(s=>s.id===existingId);
    const cine=window.cinema||[], tricks=window.tricks||[];
    const style=track==='cinematic'?'Cinematic':track==='freestyle'?'Freestyle':cine.some(s=>s.name===maneuver)?'Cinematic':'Freestyle';
    const draft = row || {name:maneuver,style,date:today(),difficulty:(style==='Cinematic'?cine:tricks).find(x=>x.name===maneuver)?.level||'Középhaladó',minutes:15,reps:10,success:0,rates:all[0]?.rates||'',notes:''};
    const choices=[...new Set([...tricks,...cine].map(x=>x.name))];
    const form = '<form id="fpv-session-form"><p class="muted">Liftoff · RadioMaster Pocket</p><div class="grid2">'+
      field('Manőver vagy gyakorlat','<input name="name" maxlength="120" placeholder="Pl. Powerloop" list="fpv-maneuvers" required value="'+esc(draft.name)+'"><datalist id="fpv-maneuvers">'+choices.map(n=>'<option value="'+esc(n)+'"></option>').join('')+'</datalist>')+
      field('Repülési stílus','<select name="style">'+options(styles,draft.style)+'</select>')+
      field('Dátum','<input type="date" name="date" required max="'+today()+'" value="'+esc(draft.date)+'">')+
      field('Nehézség','<select name="difficulty">'+options(levels,draft.difficulty)+'</select>')+
      field('Gyakorlási idő (perc)','<input name="minutes" type="number" min="1" max="1440" required value="'+draft.minutes+'">')+
      field('Összes ismétlés','<input name="reps" type="number" min="1" max="10000" required value="'+draft.reps+'">')+
      field('Sikeres ismétlés','<input name="success" type="number" min="0" max="'+draft.reps+'" required value="'+draft.success+'">')+
      field('Sikeresség','<output id="fpv-ratio" aria-live="polite"></output>')+'</div>'+
      field('Rates-beállítás','<textarea name="rates" maxlength="600" rows="2" placeholder="Modell, majd roll / pitch / yaw értékek vagy a használt profil neve">'+esc(draft.rates)+'</textarea>')+
      field('Megjegyzések','<textarea name="notes" maxlength="3000" rows="3" placeholder="Hol csúszott el a mozdulat? Mit ismételsz legközelebb?">'+esc(draft.notes)+'</textarea>')+
      '<button type="submit" class="btn primary">Gyakorlás mentése</button></form>';
    modal(row?'Gyakorlás szerkesztése':'Új gyakorlás',form);
    const el=document.getElementById('fpv-session-form');
    const update = () => {
      const r=el.elements.reps.valueAsNumber, s=el.elements.success.valueAsNumber;
      el.elements.success.max=Number.isFinite(r)?r:10000;
      document.getElementById('fpv-ratio').textContent = r>0 && s>=0 && s<=r ? Math.round(s/r*100)+'%' : '—';
    };
    update(); el.addEventListener('input',update);
    el.onsubmit = e => {
      e.preventDefault(); const data=Object.fromEntries(new FormData(el));
      data.name=data.name.trim(); if(!data.name){el.elements.name.value='';el.elements.name.reportValidity();return;}
      ['success','reps','minutes'].forEach(k=>data[k]=Number(data[k]));
      data.id=row?.id||id();
      const current=sessions(), index=current.findIndex(s=>s.id===data.id);
      if(index>=0) current[index]=data; else current.unshift(data);
      localStorage.setItem(sessionsKey,JSON.stringify(current)); closeModal();draw();
    };
  }
  function removeSession(sessionId) {
    const row=sessions().find(s=>s.id===sessionId); if(!row)return;
    modal('Bejegyzés törlése','<p>Biztosan törlöd a(z) <strong>'+esc(row.name)+'</strong> gyakorlást ('+short(row.date)+')?</p><button type="button" class="btn primary" id="fpv-delete">Törlés</button> <button class="btn" onclick="closeModal()">Mégse</button>');
    document.getElementById('fpv-delete').onclick=()=>{localStorage.setItem(sessionsKey,JSON.stringify(sessions().filter(s=>s.id!==sessionId)));closeModal();draw();};
  }
  function logView() {
    const all=sessions().sort((a,b)=>b.date.localeCompare(a.date)), filtered=all.filter(s=>filter==='Mindkettő'||s.style===filter);
    return '<section class="panel"><div style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div><h2>Mentett edzések</h2></div><button class="btn primary" onclick="newSession()">+ Új gyakorlás</button></div>'+
    field('Stílus szerinti szűrés','<select onchange="fpvPractice.filter(this.value)">'+options(['Mindkettő',...styles],filter)+'</select>')+
    (filtered.length?'<p>'+filtered.length+' edzés · '+sum(filtered,'minutes')+' perc · '+accuracy(filtered)+'% sikeresség</p><div class="tablewrap"><table><thead><tr><th>Dátum</th><th>Manőver</th><th>Idő</th><th>Sikeres / összes</th><th>Bejegyzés</th></tr></thead><tbody>'+filtered.map(s=>'<tr><td>'+esc(s.date)+'</td><td><strong>'+esc(s.name)+'</strong><br><span class="muted">'+esc(s.style)+' · '+esc(s.difficulty)+'</span></td><td>'+s.minutes+' perc</td><td>'+s.success+' / '+s.reps+' · '+accuracy([s])+'%</td><td><button class="btn" onclick="fpvPractice.edit(\''+esc(s.id)+'\')">Megnyitás</button> <button class="btn" onclick="fpvPractice.remove(\''+esc(s.id)+'\')">Törlés</button></td></tr>').join('')+'</tbody></table></div>':'<p class="muted">'+(all.length?'Ehhez a stílushoz még nincs mentett gyakorlás.':'Itt jelennek meg a mentett edzéseid. Az elsőt a trükk leckéjéből is elindíthatod.')+'</p>')+'</section>';
  }
  function progressView(){
    const all=sessions().filter(s=>filter==='Mindkettő'||s.style===filter).sort((a,b)=>a.date.localeCompare(b.date));
    if(!all.length)return '';
    const grouped=new Map();
    for(const s of all){const key=s.name.trim().toLocaleLowerCase('hu')+'|'+s.style;if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(s);}
    return '<section class="panel"><h2>Fejlődés manőverenként</h2><div class="tablewrap"><table><thead><tr><th>Manőver</th><th>Gyakorlások</th><th>Összes ismétlés</th><th>Első edzés</th><th>Legutóbbi edzés</th><th>Változás</th></tr></thead><tbody>'+[...grouped.values()].map(rows=>{const first=accuracy([rows[0]]),last=accuracy([rows.at(-1)]),delta=last-first;return '<tr><td>'+esc(rows[0].name)+'</td><td>'+rows.length+'</td><td>'+sum(rows,'reps')+'</td><td>'+first+'%</td><td>'+last+'%</td><td>'+(rows.length<2?'Új manőver':(delta>0?'+':'')+delta+' százalékpont')+'</td></tr>';}).join('')+'</tbody></table></div></section>';
  }
  window.fpvPractice={filter:v=>{filter=v;draw();},edit:id=>newSession('',id),remove:removeSession};
  window.renderPractice=()=>logView()+progressView();
  window.newSession=newSession;
})();
