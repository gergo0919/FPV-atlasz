(() => {
  'use strict';
  const key = 'fpvatlas.felszereles.v1';
  const seeker = 'https://www.deepspacefpv.com/DeepSpace-SEEKER3-3inch-freestyle-FPV-Drone-DJI-O4-PRO-Analog-PNP-with-GPS-4S-sub250g-p6408559.html';
  const cobra = 'https://www.skyzonefpv.com/products/skyzone-cobra-x-v4-goggle';
  const pocket = 'https://radiomasterrc.com/products/pocket-radio-controller-m2';
  const uses = ['Freestyle', 'Cinematic', 'Hosszabb hatótáv'];
  const statuses = ['Kinézett', 'Megvett', 'Elvetett'];
  const currencies = ['Ft', 'USD', 'EUR', 'PLN'];
  const availability = ['Ellenőrizendő', 'Raktáron', 'Rendelhető', 'Foglalt', 'Elkelt', 'Saját készlet'];
  const importance = ['Szükséges', 'Ajánlott', 'Opcionális'];
  const categories = ['Drón', 'Távirányító', 'Akkumulátor', 'Szemüveg', 'Töltés', 'Pótalkatrész', 'Javítókészlet', 'Videó', 'Egyéb'];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const validUrl = raw => {try {const u = new URL(raw); return /^(https?:)$/.test(u.protocol) ? u.href : '';} catch {return '';}};
  const opts = (values, current) => values.map(v => '<option'+(v === current ? ' selected' : '')+'>'+escape(v)+'</option>').join('');
  const money = v => Math.round(v).toLocaleString('hu-HU')+' Ft';
  const native = (v, c) => v == null ? 'Nincs ár' : v.toLocaleString('hu-HU')+' '+c;
  const uid = () => crypto.randomUUID();
  const fileId = /^[a-zA-Z0-9-]+$/;
  function item(id, name, category, compat, fields = {}) {
    return {id,name,category,compat,qty:1,price:null,ship:null,currency:'Ft',rate:null,planned:true,status:'Kinézett',available:'Ellenőrizendő',priority:'Szükséges',uses:[...uses],source:'',url:'',notes:'',...fields};
  }
  function initial() {
    return {items:[
      item('pocket','RadioMaster Pocket + 2×18650 + töltő','Távirányító','A Pocket ELRS 2,4 GHz-es változata használható a Seeker ELRS-vevőjével. A Pocket két 18650-es cellát igényel.',{status:'Megvett',price:32000,ship:0,available:'Saját készlet',source:'Saját beszerzés · kerekített csomagár',url:pocket}),
      item('seeker','DeepSpace Seeker 3 DC','Drón','Analóg videó, ELRS 2,4 GHz és GPS. Rendeléskor az „Analog ELRS 2.4G +GPS” és a DC opciót válaszd.',{price:244,currency:'USD',url:seeker,source:'DeepSpaceFPV · korábbi saját árajánlat',notes:'A 244 USD tervezési adat. A variáns árát a pénztárnál ellenőrizd.'}),
      item('lipo650','4S 650 mAh LiPo · XT30','Akkumulátor','Ellenőrizd a 4S cellaszámot, az XT30 főcsatlakozót, az akkumulátor méretét és tömegét.',{qty:3,price:0,ship:0,source:'Tervezett ajándék',url:seeker,notes:'Saját költsége várhatóan 0 Ft.'}),
      item('lipo850','4S 850 mAh LiPo · XT30','Akkumulátor','A 850 mAh-s csomag nehezebb lehet a 650-esnél. Hasonlítsd össze a felszállótömeget és a tényleges repidőt.',{price:0,ship:0,source:'Tervezett ajándék',priority:'Ajánlott',uses:['Cinematic','Hosszabb hatótáv'],url:seeker}),
      item('cobra','Skyzone Cobra X V4','Szemüveg','Beépített analóg 5,8 GHz-es SteadyView vevő. Ellenőrizd a pontos verziót, a tápellátást és a csomag antennáit.',{url:cobra,source:'Skyzone · gyártói adatlap'}),
      item('cobra-new','Skyzone Cobra X V4 · új gyártói ajánlat','Szemüveg','A 48 csatornás, 5,8 GHz-es változat illeszkedik az analóg Seekerhez.',{planned:false,price:292,currency:'USD',available:'Raktáron',source:'SKYZONE · ellenőrizve 2026. 11. 21.',url:cobra,notes:'Összehasonlítási ár új termékre. A bolti készlet változhat, a szállítást a pénztár számolja.'}),
      item('ev200','Eachine EV200D','Szemüveg','Használt alternatíva. Az adott példányhoz járó vevőket, antennákat, tápellátást és DVR-t az eladóval ellenőrizd.',{planned:false,source:'Saját modelljelölt'}),
      item('charger','4S LiPo balansztöltő','Töltés','A meglévő okostöltő típusa még kérdéses. Ellenőrizd a 4S LiPo balansztöltést, a tápegységet, a balanszportot és az XT30 töltőkábelt.'),
      item('props','3 hüvelykes pótpropeller · készlet','Pótalkatrész','Azonosítsd a gyári légcsavar cikkszámát, a rögzítőfuratokat, illetve a motorhoz illő csavarokat.',{priority:'Ajánlott',url:seeker}),
      item('biprop','Kétágú propeller · próbakészlet','Pótalkatrész','A 3 hüvelykes átmérő mellett a tengelyt, a rögzítést és a megengedett terhelést is egyeztesd.',{priority:'Opcionális',uses:['Cinematic','Hosszabb hatótáv']}),
      item('repair','Imbuszkulcsok és csavarok','Javítókészlet','A csavarfejhez illő kulcsot használd. A motorcsavar hosszát az eredeti csavarral ellenőrizd.',{priority:'Ajánlott'}),
      item('motor','Aether 1505 4000 KV pótmotor','Pótalkatrész','A gyári motor mérete és KV-értéke egyezzen. A tengelyt és a vezetékek hosszát hasonlítsd össze a meglévő motorral.',{priority:'Opcionális',planned:false,uses:['Freestyle'],price:12.51,currency:'USD',source:'DeepSpaceFPV · ellenőrizve 2026. 11. 21.',url:'https://www.deepspacefpv.com/aether-series-c219183/'}),
      item('antenna','Szemüvegantenna · irányított','Videó','Ellenőrizd a videóadó antennájának polarizációját és a szemüveg csatlakozótípusát. Az irányított antennát a repülési terület felé kell fordítani.',{priority:'Opcionális',planned:false,uses:['Hosszabb hatótáv']}),
      item('camera','Külön rögzítőkamera','Videó','A tartó, a tömeg és az áramellátás alapján válassz. Mérd meg a teljes felszállótömeget a kiválasztott akkuval.',{priority:'Opcionális',planned:false,uses:['Cinematic']})
    ],history:[]};
  }
  function load() {try {const s=JSON.parse(localStorage.getItem(key));if(s && Array.isArray(s.items)&&Array.isArray(s.history))return s;}catch{} return initial();}
  let state=load(), statusFilter='', useFilter='', categoryFilter='', onlyMissing=false, comparison=new Set(), order='Alapsorrend';
  const base = g => g.currency==='Ft' ? 1 : g.rate;
  const total = g => g.price==null || g.ship==null || !base(g) ? null : (g.price*g.qty+g.ship)*base(g);
  function save(){localStorage.setItem(key,JSON.stringify(state));}
  function redraw(){window.draw();}
  const badge = value => '<span class="tag">'+escape(value)+'</span>';
  const src = g => {const href=validUrl(g.url); return href ? '<a rel="noopener noreferrer" target="_blank" href="'+escape(href)+'">'+escape(g.source || 'Adatlap')+'</a>' : escape(g.source || 'Nincs megadva');};
  const req = g => g.status!=='Elvetett' && g.planned;
  const select = (label, options, val, fn, all) => '<label class="gear-filter">'+label+'<select onchange="'+fn+'">'+(all ? '<option value="">Összes</option>' : '')+opts(options,val)+'</select></label>';
  const stat = (title, value, caption) => '<div class="panel gear-stat"><span class="muted">'+title+'</span><strong>'+value+'</strong><small>'+caption+'</small></div>';
  const css = '<style>.gear-scope{display:grid;gap:18px}.gear-scope .panel{padding:20px}.gear-scope h3{margin:0 0 6px}.gear-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.gear-stat{display:grid;gap:6px}.gear-stat strong{font-size:1.6rem}.gear-stat small,.gear-meta{color:var(--muted,#87969f);font-size:.85rem}.gear-bar{display:flex;flex-wrap:wrap;align-items:end;gap:12px}.gear-bar .btn{min-height:40px}.gear-filter,.gear-form label{display:grid;gap:6px;font-size:.88rem}.gear-filter select,.gear-form select,.gear-form input:not([type=checkbox]),.gear-form textarea{font:inherit;color:inherit;background:var(--panel,#182329);border:1px solid #576569;border-radius:6px;padding:9px;width:100%;box-sizing:border-box}.gear-form select option,.gear-filter select option{color:#eee;background:#172229}.gear-form{display:grid;gap:14px}.gear-form .gear-cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.gear-form .gear-check,.gear-scope .gear-check{display:inline-flex;align-items:center;gap:7px}.gear-check input,.gear-scope input[type=checkbox]{width:17px;height:17px;accent-color:#b9ee66}.gear-table{width:100%;border-collapse:collapse;text-align:left}.gear-table th,.gear-table td{padding:12px 9px;border-bottom:1px solid #42525755;vertical-align:middle}.gear-table th{font-weight:500;color:var(--muted,#a0aaa9);font-size:.85rem}.gear-table td{font-size:.92rem}.gear-table td button{white-space:nowrap}.gear-scope .tablewrap,.gear-compare{overflow-x:auto}.gear-scope .gear-check{font-size:.9rem}.gear-note{margin:0}.gear-history{display:grid;gap:0}.gear-event{padding:14px 0;border-top:1px solid #42525755}.gear-event p{margin:4px 0 0;white-space:pre-line}.gear-compare th{min-width:110px}.gear-compare td{min-width:170px}.gear-table small{display:block;margin-top:4px}.gear-hint{font-size:.88rem;color:var(--muted,#9caaad)}.gear-miss{display:flex;gap:8px;flex-wrap:wrap}.gear-table a{color:inherit;text-decoration:underline}.gear-form fieldset{padding:9px;border:1px solid #576569;border-radius:6px}.gear-form input[type=checkbox]{width:auto}@media(max-width:540px){.gear-form .gear-cols{grid-template-columns:1fr}.gear-scope .panel{padding:14px}.gear-stat strong{font-size:1.3rem}}</style>';
  const rowButton=(g,label='Szerkesztés')=>'<button type="button" class="btn" onclick="Gear.edit(\''+g.id+'\')">'+label+'</button>';
  function summary(){
    const planned=state.items.filter(req), missing=planned.filter(g=>g.status!=='Megvett'), unknown=planned.filter(g=>total(g)==null);
    const subtotal=planned.reduce((s,g)=>s+(total(g)||0),0);
    const goods=currencies.map(c=>{const items=planned.filter(g=>g.currency===c&&g.price!=null);return items.length?native(items.reduce((sum,g)=>sum+g.price*g.qty,0),c):'';}).filter(Boolean).join(' + ');
    const owned=planned.filter(g=>g.status==='Megvett');
    return '<div class="gear-stats">'+stat(unknown.length ? 'Ismert tételek részösszege' : 'Teljes tervezett költség',money(subtotal),unknown.length ? unknown.length+' tétel összege még hiányzik' : 'Szállítással együtt')+
      stat('Megvett a tervből',owned.length+' / '+planned.length,'Kiválasztott felszereléstételek')+stat('Még beszerzendő',String(missing.length),missing.filter(g=>g.priority==='Szükséges').length+' szükséges tétel')+'</div><p class="gear-hint">Ismert termékárak, szállítás nélkül: <strong>'+escape(goods||'—')+'</strong>. A forintosított végösszeghez add meg a hiányzó árakat, szállítási díjakat és árfolyamokat.</p>';
  }
  function compare(){
    const gs=state.items.filter(g=>comparison.has(g.id)); if(!gs.length)return '';
    const fields=[['Státusz',g=>escape(g.status)],['Mennyiség',g=>g.qty+' db'],['Egységár',g=>native(g.price,g.currency)],['Szállítás',g=>g.ship==null?'Nincs megadva':native(g.ship,g.currency)],['Teljes költség',g=>total(g)==null?'Hiányos adat':money(total(g))],['Forrás',src],['Elérhetőség',g=>escape(g.available)],['Fontosság',g=>escape(g.priority)],['Felhasználás',g=>g.uses.map(escape).join(', ') || 'Nincs megadva'],['Kompatibilitás',g=>escape(g.compat)||'Ellenőrizendő'],['Tervben',g=>g.planned&&g.status!=='Elvetett'?'Igen':'Nem']];
    return '<section class="panel"><div class="gear-bar"><h3>Kijelölt tételek összehasonlítása</h3><button class="btn" onclick="Gear.clear()">Kijelölés törlése</button></div><div class="gear-compare"><table class="gear-table"><thead><tr><th>Szempont</th>'+gs.map(g=>'<th>'+escape(g.name)+'</th>').join('')+'</tr></thead><tbody>'+fields.map(([name,f])=>'<tr><th>'+name+'</th>'+gs.map(g=>'<td>'+f(g)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div></section>';
  }
  function gear(){
    const visible=state.items.filter(g=>(!statusFilter||g.status===statusFilter)&&(!useFilter||g.uses.includes(useFilter))&&(!categoryFilter||g.category===categoryFilter)&&(!onlyMissing||req(g)&&g.status!=='Megvett'));
    if(order==='Teljes költség szerint')visible.sort((a,b)=>(total(a)??Infinity)-(total(b)??Infinity));
    if(order==='Fontosság szerint')visible.sort((a,b)=>importance.indexOf(a.priority)-importance.indexOf(b.priority));
    return css+'<div class="gear-scope">'+summary()+'<section class="panel"><div class="gear-bar">'+select('Állapot',statuses,statusFilter,"Gear.filter('st',this.value)",true)+select('Felhasználás',uses,useFilter,"Gear.filter('use',this.value)",true)+select('Kategória',categories,categoryFilter,"Gear.filter('cat',this.value)",true)+select('Rendezés',['Alapsorrend','Teljes költség szerint','Fontosság szerint'],order,"Gear.filter('ord',this.value)",false)+'<label class="gear-check"><input type="checkbox" onchange="Gear.filter(\'miss\',this.checked)" '+(onlyMissing?'checked':'')+'>Csak beszerzendő</label><button class="btn primary" onclick="Gear.edit()">Új tétel</button></div></section>'+compare()+
      '<section class="panel"><h3>Felszereléslista</h3><p class="gear-hint">Jelöld be az összevetendő tételeket. A költségtervbe a „Tervben” beállítású felszerelés kerül.</p><div class="tablewrap"><table class="gear-table"><thead><tr><th>Összevetés</th><th>Felszerelés</th><th>Állapot</th><th>Egységár</th><th>Mennyiség</th><th>Tervben</th><th></th></tr></thead><tbody>'+
      visible.map(g=>'<tr><td><input type="checkbox" aria-label="'+escape(g.name)+' összehasonlítása" onchange="Gear.toggle(\''+g.id+'\',this.checked)" '+(comparison.has(g.id)?'checked':'')+'></td><td><strong>'+escape(g.name)+'</strong><small class="gear-meta">'+escape(g.category)+' · '+escape(g.priority)+'</small></td><td>'+badge(g.status)+'</td><td>'+native(g.price,g.currency)+'</td><td>'+g.qty+' db</td><td>'+ (req(g)?'Igen':'Nem')+'</td><td>'+rowButton(g)+'</td></tr>').join('')+
      (!visible.length?'<tr><td colspan="7">Nincs a szűrésnek megfelelő tétel.</td></tr>':'')+'</tbody></table></div></section></div>';
  }
  function history(){
    return css+'<div class="gear-scope"><section class="panel"><div class="gear-bar"><h3>Bejegyzések</h3><button class="btn primary" onclick="Gear.note()">Új döntés</button></div><p class="gear-hint">Az ár, a szállítás, az állapot és a többi adat módosítása mentéskor bekerül a naplóba.</p><div class="gear-history">'+(state.history.length ? [...state.history].reverse().map(e=>'<article class="gear-event"><small class="gear-meta">'+escape(new Date(e.time).toLocaleString('hu-HU'))+' · '+escape(e.type)+'</small><p><strong>'+escape(e.name)+'</strong></p><p>'+escape(e.msg)+'</p></article>').join('') : '<p>Még nincs rögzített változás. Egy ajánlat frissítése vagy egy új döntés mentése indítja a naplót.</p>')+'</div></section></div>';
  }
  const field=(label,key,value,type='text',extra='')=>'<label>'+label+'<input name="'+key+'" type="'+type+'" value="'+escape(value)+'" '+extra+'></label>';
  const selField=(label,key,values,value)=>'<label>'+label+'<select name="'+key+'">'+opts(values,value)+'</select></label>';
  function edit(id){
    const old=state.items.find(i=>i.id===id), g=old||item(uid(),'','Egyéb','');
    window.modal(old?'Felszerelés szerkesztése':'Új felszerelés',css+'<form class="gear-form" id="gear-editor">'+field('Megnevezés','name',g.name,'text','required maxlength="150"')+'<div class="gear-cols">'+selField('Kategória','category',categories,g.category)+selField('Állapot','status',statuses,g.status)+selField('Elérhetőség','available',availability,g.available)+selField('Fontosság','priority',importance,g.priority)+field('Darabszám','qty',g.qty,'number','min="1" max="10000" step="1" required')+selField('Pénznem','currency',currencies,g.currency)+field('Egységár','price',g.price,'number','min="0" step="0.01" placeholder="Ismeretlen"')+field('Szállítás erre a sorra','ship',g.ship,'number','min="0" step="0.01" placeholder="Ismeretlen"')+'</div><p class="gear-hint">Közös rendelésnél a szállítási díjat csak egyszer számold el. A többi tételnél adj meg 0-t.</p>'+field('Átváltás · Ft / 1 devizaegység','rate',g.rate,'number','min="0.0001" step="any" placeholder="Devizaárhoz szükséges"')+field('Forrás vagy eladó','source',g.source)+field('Forráslink','url',g.url,'url','placeholder="https://"')+'<label>Kompatibilitás<textarea rows="2" name="compat">'+escape(g.compat)+'</textarea></label><fieldset><legend>Felhasználás</legend>'+uses.map((u,i)=>'<label class="gear-check"><input name="use'+i+'" type="checkbox" '+(g.uses.includes(u)?'checked':'')+'>'+u+'</label> ').join('')+'</fieldset><label class="gear-check"><input name="planned" type="checkbox" '+(g.planned?'checked':'')+'>Tervben · számítson bele a költségbe és a beszerzésbe</label><label>Megjegyzés<textarea name="notes" rows="2">'+escape(g.notes)+'</textarea></label><button type="submit" class="btn primary">Mentés</button></form>');
    document.getElementById('gear-editor').onsubmit=e=>{
      e.preventDefault(); const data=new FormData(e.currentTarget), read=k=>String(data.get(k)||'').trim(), number=k=>read(k)===''?null:Number(read(k));
      const next={...g}; for(const k of ['name','category','status','available','priority','currency','source','url','compat','notes'])next[k]=read(k);
      if(!next.name){e.currentTarget.elements.name.focus();return;}
      for(const k of ['qty','price','ship','rate'])next[k]=number(k);
      next.planned=next.status!=='Elvetett' && data.has('planned'); next.uses=uses.filter((_,i)=>data.has('use'+i));
      const labels={name:'Név',category:'Kategória',status:'Állapot',available:'Elérhetőség',priority:'Fontosság',currency:'Pénznem',qty:'Darabszám',price:'Egységár',ship:'Szállítás',rate:'Árfolyam',source:'Forrás',url:'Forráslink',compat:'Kompatibilitás',notes:'Megjegyzés',planned:'Tervben',uses:'Felhasználás'};
      const format=(x,k)=>k==='price'||k==='ship'?native(x[k],x.currency): x[k]===true?'igen':x[k]===false?'nem':Array.isArray(x[k])?x[k].join(', ')||'—':x[k]??'—';
      const changes=Object.keys(labels).filter(k=>JSON.stringify(g[k])!==JSON.stringify(next[k])).map(k=>labels[k]+' · '+format(g,k)+' → '+format(next,k));
      if(old)state.items[state.items.findIndex(i=>i.id===id)]=next; else state.items.push(next);
      if(changes.length||!old)state.history.push({time:new Date().toISOString(),type:old?'Módosítás':'Új tétel',name:next.name,msg:old?changes.join('\n'):native(next.price,next.currency)+' / db · '+next.qty+' db · '+next.status});
      save();window.closeModal();redraw();
    };
  }
  function note(){
    window.modal('Döntés rögzítése',css+'<form id="gear-note" class="gear-form"><label>Kapcsolódó tétel<select name="id"><option value="">Teljes projekt</option>'+state.items.map(g=>'<option value="'+g.id+'">'+escape(g.name)+'</option>').join('')+'</select></label><label>Mit döntöttél és miért?<textarea rows="4" name="note" required></textarea></label><button class="btn primary">Döntés mentése</button></form>');
    document.getElementById('gear-note').onsubmit=e=>{e.preventDefault();const d=new FormData(e.currentTarget),msg=String(d.get('note')).trim();if(!msg)return;state.history.push({time:new Date().toISOString(),type:'Döntés',name:state.items.find(i=>i.id===d.get('id'))?.name || 'Teljes projekt',msg});save();window.closeModal();redraw();};
  }
  window.Gear={edit,note,filter(k,v){if(k==='st')statusFilter=v;if(k==='cat')categoryFilter=v;if(k==='use')useFilter=v;if(k==='ord')order=v;if(k==='miss')onlyMissing=v;redraw();},toggle(id,on){if(!fileId.test(id))return;if(on)comparison.add(id);else comparison.delete(id);redraw();},clear(){comparison.clear();redraw();},
    checklist(){return state.items.filter(g=>g.planned && g.status!=='Elvetett').map(g=>({id:g.id,name:g.name,qty:g.qty,done:g.status==='Megvett'}));},
    purchase(id,on){const g=state.items.find(i=>i.id===id);if(!g)return;const newStatus=on?'Megvett':'Kinézett';if(g.status===newStatus)return;state.history.push({time:new Date().toISOString(),type:'Beszerzés',name:g.name,msg:g.status+' → '+newStatus});g.status=newStatus;save();redraw();}};
  window.renderGear=view=>view==='history'?history():gear();
})();
