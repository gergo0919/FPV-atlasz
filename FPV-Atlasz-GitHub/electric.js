(() => {
  const source='https://openstax.org/books/university-physics-volume-2/pages/9-key-equations';
  window.extraSources.push({name:'OpenStax · Ohm törvénye és a teljesítmény',url:source,desc:'Egyenáramú ellenállásmodell az interaktív áramköri példához.'});
  const format=v=>v.toLocaleString('hu-HU',{maximumFractionDigits:1});
  function result(v,r,closed){
    const i=closed?v/r:0;
    return '<div><small>Áramerősség</small><strong>'+format(i*1000)+' mA</strong></div><div><small>Hőteljesítmény</small><strong>'+format(v*i*1000)+' mW</strong></div>';
  }
  window.electricLab=()=>`<section class="panel elec"><h2>Mi történik egy áramkörben?</h2><p>A repülésvezérlőn egy vezetősáv viszi a tápot az alkatrészhez, egy másik út pedig visszavezeti az áramot. Ebben az egyszerű modellben az alkatrész egy ellenállás.</p><div class="elecgrid"><svg viewBox="0 0 300 145" role="img" aria-label="Feszültségforrás, kapcsoló és ellenállás egyetlen soros áramkörben"><g stroke="#b5e685" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M42 59V32H95 M134 32H203V51 M203 96V119H42V78 M28 60h28 M34 77h16"/><path data-switch-arm d="M95 32H134"/><rect x="193" y="52" width="20" height="43"/><circle cx="95" cy="32" r="3"/><circle cx="134" cy="32" r="3"/></g><g fill="#f0f7ea" font-family="system-ui" font-size="13"><text x="17" y="56">+</text><text x="20" y="91">−</text><text x="215" y="78">R</text><text x="83" y="18">Kapcsoló</text><text x="66" y="140">Visszavezetés</text></g></svg><div class="elecFields"><label>Feszültség <output data-vtext>5 V</output><input type="range" min="1" max="12" step=".5" value="5" data-voltage></label><label>Ellenállás <output data-rtext>100 Ω</output><input type="range" min="50" max="1000" step="50" value="100" data-resistance></label><label><input type="checkbox" checked data-closed> Zárt kapcsoló</label></div></div><div class="elecResult" aria-live="polite">${result(5,100,true)}</div><p>Az áramot a feszültség és az ellenállás hányadosa adja (I = U/R). A hővé alakuló teljesítmény P = U × I. Duplázd meg az ellenállást változatlan feszültségen, majd nyisd ki a kapcsolót, és figyeld a változást.</p><small>Ideális forrás és ohmos ellenállás szemléltető modellje. <a target="_blank" rel="noopener noreferrer" href="${source}">OpenStax · egyenletek</a></small></section>`;
  document.addEventListener('input',e=>{
    const panel=e.target.closest('.elec');if(!panel)return;
    const v=Number(panel.querySelector('[data-voltage]').value),r=Number(panel.querySelector('[data-resistance]').value),on=panel.querySelector('[data-closed]').checked;
    panel.querySelector('[data-vtext]').textContent=format(v)+' V';panel.querySelector('[data-rtext]').textContent=r+' Ω';
    panel.querySelector('[data-switch-arm]').setAttribute('d',on?'M95 32H134':'M95 32L130 19');
    panel.querySelector('.elecResult').innerHTML=result(v,r,on);
  });
})();
