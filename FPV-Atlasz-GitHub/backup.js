(() => {
  const keys=['fpvatlas.practice.sessions.v1','fpvatlas.practice.weeks.v1','fpvatlas.felszereles.v1','fpvatlas.checks.v1','fpvatlas.skills.v1','fpvatlas.firstflight.v1'];
  const textValue=x=>typeof x==='string'&&x.length<=30000;
  const id=x=>typeof x==='string'&&/^[a-zA-Z0-9-]{1,120}$/.test(x);
  const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x));
  const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
  const positive=x=>Number.isInteger(x)&&x>0&&x<=1000000;
  const strings=x=>Array.isArray(x)&&x.every(textValue);
  function valid(key,x){
    if(key===keys[0])return Array.isArray(x)&&x.every(s=>obj(s)&&id(s.id)&&date(s.date)&&['name','style','difficulty','rates','notes'].every(k=>textValue(s[k]))&&positive(s.minutes)&&positive(s.reps)&&Number.isInteger(s.success)&&s.success>=0&&s.success<=s.reps);
    if(key===keys[1])return obj(x)&&Object.entries(x).every(([d,p])=>date(d)&&obj(p)&&positive(p.target)&&textValue(p.goal)&&strings(p.days)&&p.days.length===7);
    if(key===keys[2])return obj(x)&&Array.isArray(x.items)&&x.items.every(g=>obj(g)&&id(g.id)&&positive(g.qty)&&['name','status','category','source','url','compat','priority','currency','available','notes'].every(k=>textValue(g[k]))&&['price','ship','rate'].every(k=>g[k]===null||(Number.isFinite(g[k])&&g[k]>=0))&&typeof g.planned==='boolean'&&strings(g.uses))&&Array.isArray(x.history)&&x.history.every(e=>obj(e)&&['time','name','type','msg'].every(k=>textValue(e[k])));
    if(key==='fpvatlas.skills.v1')return obj(x)&&Object.entries(x).every(([track,items])=>['freestyle','cinematic'].includes(track)&&obj(items)&&Object.entries(items).every(([name,n])=>textValue(name)&&Number.isInteger(n)&&n>=0&&n<=3));
    if(key==='fpvatlas.firstflight.v1')return Array.isArray(x)&&x.every(id);
    return obj(x)&&Object.entries(x).every(([k,v])=>['Indulás előtt','Javítás'].includes(k)&&obj(v)&&(!v.custom||strings(v.custom))&&(!v.done||(obj(v.done)&&Object.entries(v.done).every(([i,d])=>/^\d+$/.test(i)&&typeof d==='boolean'))));
  }
  function exportData(){
    const data={};for(const k of keys){const raw=localStorage.getItem(k);if(raw!==null)data[k]=JSON.parse(raw)}
    const blob=new Blob([JSON.stringify({format:'fpv-atlasz-1',data},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='FPV-Atlasz-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  window.backupMenu=()=>{
    modal('Projektadatok mentése','<p>A manővereid tudásszintje, a gyakorlásnaplód, a felszerelésed, az első repülési útmutatóban elért haladásod és az ellenőrzőlistáid ebben a böngészőben tárolódnak. Egy mentési fájllal átviheted őket másik eszközre.</p><p style="margin:16px 0"><button id="export-data" class="btn primary">Mentési fájl letöltése</button></p><label class="field">Korábbi mentés betöltése<input id="import-file" type="file" accept=".json,application/json"></label><p id="import-status" role="status"></p>');
    document.querySelector('#export-data').onclick=exportData;
    document.querySelector('#import-file').onchange=async e=>{
      const file=e.target.files[0];if(!file)return;
      try{
        if(file.size>8000000)throw Error();
        const parsed=JSON.parse(await file.text());
        if(parsed.format!=='fpv-atlasz-1'||!obj(parsed.data)||!Object.entries(parsed.data).every(([k,v])=>keys.includes(k)&&valid(k,v)))throw Error();
        modal('Mentés visszaállítása','<p>A kiválasztott mentés lecseréli az itt tárolt projektadatokat. Előtte letöltheted a jelenlegi állapotot.</p><div class="tools" style="margin-top:16px"><button class="btn" id="save-old">Jelenlegi adatok letöltése</button><button class="btn primary" id="confirm-import">Visszaállítás</button></div>');
        document.querySelector('#save-old').onclick=exportData;
        document.querySelector('#confirm-import').onclick=()=>{const prev=keys.map(k=>localStorage.getItem(k));try{for(const k of keys){if(Object.hasOwn(parsed.data,k))localStorage.setItem(k,JSON.stringify(parsed.data[k]));else localStorage.removeItem(k)}location.reload()}catch{keys.forEach((k,i)=>prev[i]===null?localStorage.removeItem(k):localStorage.setItem(k,prev[i]));modal('Sikertelen visszaállítás','<p>A böngésző tárhelyére nem fért rá a mentés.</p>')}};
      }catch{document.querySelector('#import-status').textContent='A fájl nem olvasható FPV Atlasz-mentésként.'}
    };
  };
})();
