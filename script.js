/* ===== ПРАВОВЫЕ ДАННЫЕ — редактируйте только после ручной проверки на adilet.zan.kz ===== */
const CHECKED_ON = null; // впишите дату своей ручной проверки, напр. "2026-11-20"; null = «Ожидает ручной проверки»
const LAW = 'https://adilet.zan.kz/rus/docs/Z2100000097';
const ACT = 'Закон РК «Об ответственном обращении с животными»', ACT_NO = 'от 30.12.2021 № 97-VII ЗРК';
const RULES = {
  keeping:  {act:ACT, no:ACT_NO, art:'ст. 21 «Требования при обращении и содержании домашних животных»', url:LAW, fine:null, verified:false},
  walking:  {act:ACT, no:ACT_NO, art:'ст. 22 «Требования к выгулу домашних животных»', url:LAW, fine:null, verified:false},
  cruelty:  {act:ACT, no:ACT_NO, art:'ст. 4 «Защита животных от жестокого обращения»', url:LAW, fine:null, verified:false},
  liability:{act:ACT, no:ACT_NO, art:'ст. 29 «Ответственность за нарушение законодательства…»', url:LAW, fine:null, verified:false}
};
/* Вопрос: opts = [текст, риск(0-2), «не знаю»(true/false)] */
const YN=[['Да',0],['Нет',2],['Не знаю',0,true]];
const ANIMAL=[['Собака',0],['Кошка',0],['Другое животное',1]];
const SC = {
 walk:{title:'Выгул собаки',icon:'🦮',rule:'walking',qs:[
  {id:'a',q:'Какое животное?',opts:ANIMAL},
  {id:'r',q:'В каком регионе Казахстана?',opts:[['Астана',0],['Алматы',0],['Шымкент',0],['Другой регион',1]]},
  {id:'p',q:'Где происходит выгул?',opts:[['Специальная площадка',0],['Двор / улица',1],['Детская или спортивная площадка',2],['Не знаю',0,true]]},
  {id:'l',q:'Собака на поводке (если нужен по местным правилам)?',opts:YN},
  {id:'c',q:'Убираете за собакой?',opts:[['Да',0],['Нет',2],['Иногда',1]]}],
  next:['Найдите местные правила выгула в акимате/МИО вашего города или области.','Выгуливайте на поводке и убирайте за животным — это снимает большинство конфликтов.','Избегайте детских и спортивных площадок.']},
 noise:{title:'Шум от животного',icon:'🔊',rule:'keeping',qs:[
  {id:'a',q:'Какое животное?',opts:ANIMAL},
  {id:'w',q:'Где возникла ситуация?',opts:[['Квартира в многоквартирном доме',1],['Частный дом',0],['Двор',1]]},
  {id:'h',q:'Что произошло?',opts:[['Лай/вой ночью',2],['Шум днём, периодически',1],['Единичный случай',0]]},
  {id:'k',q:'Есть жалоба соседей?',opts:[['Письменная / официальная',2],['Устная',1],['Нет',0],['Не знаю',0,true]]}],
  next:['Спокойно поговорите с соседями и выясните, когда шум мешает.','Проверьте причину: одиночество, скука, здоровье животного.','Если есть письменная жалоба — запросите её копию и сверьте факты.']},
 keeping:{title:'Содержание питомца в квартире',icon:'🏠',rule:'keeping',qs:[
  {id:'a',q:'Какое животное?',opts:ANIMAL},
  {id:'n',q:'Сколько животных (число от 1 до 50)?',type:'num',min:1,max:50},
  {id:'h',q:'Где живёте?',opts:[['Своя квартира',0],['Съёмная квартира',1],['Частный дом',0]]},
  {id:'v',q:'Есть ветеринарные документы / прививки?',opts:YN},
  {id:'s',q:'Условия содержания безопасны для соседей и животного?',opts:YN}],
  next:['Соблюдайте санитарные и ветеринарные требования.','Для съёмного жилья проверьте договор аренды.','Уточните, нет ли местных ограничений в вашем ОСИ/КСК.']},
 neighbors:{title:'Конфликт с соседями',icon:'🤝',rule:'keeping',qs:[
  {id:'t',q:'Суть конфликта?',opts:[['Шум',1],['Запах / чистота',1],['Места общего пользования',1],['Нападение / укус',2]]},
  {id:'d',q:'Пытались решить мирно?',opts:[['Да',0],['Нет',1]]},
  {id:'f',q:'Есть подтверждения (фото, видео, акт)?',opts:YN},
  {id:'o',q:'Обращались в КСК/ОСИ?',opts:[['Да',0],['Нет',0],['Не знаю',0,true]]}],
  next:['Зафиксируйте факты: даты, время, свидетели.','Предложите письменную договорённость.','При укусе обратитесь за медицинской помощью и сообщите в уполномоченные органы.']},
 complaint:{title:'Жалоба или возможное нарушение',icon:'📄',rule:'liability',qs:[
  {id:'w',q:'Кто обратился с жалобой?',opts:[['Сосед',1],['КСК / ОСИ',1],['Государственный орган',2],['Пока никто',0]]},
  {id:'f',q:'Жалоба в письменной форме?',opts:YN},
  {id:'e',q:'Вы согласны с описанными фактами?',opts:[['Да, всё верно',2],['Частично',1],['Нет',0],['Не знаю',0,true]]},
  {id:'p',q:'Есть протокол или предписание?',opts:[['Да',2],['Нет',0],['Не знаю',0,true]]}],
  next:['Запросите текст жалобы/документа и изучите, какая норма указана.','Соберите свои доказательства.','Сверьте норму и размер ответственности на adilet.zan.kz.']}
};
const STATUS=[
 ['s0','По проверенным условиям нарушение не выявлено'],
 ['s1','Обратите внимание на требования'],
 ['s2','Возможное нарушение'],
 ['s3','Недостаточно данных для вывода']];
function analyse(sc,ans){
  let risk=0,unk=0;
  sc.qs.forEach(q=>{
    if(q.type==='num'){ if(+ans[q.id]>=3) risk+=1; return; }
    const o=q.opts[ans[q.id]]; risk+=o[1]; if(o[2]) unk++;
  });
  if(unk>=2) return 3;
  if(risk>=4) return 2;
  if(risk>=2) return 1;
  return unk? 3 : 0;
}
/* ===== Справочник и ситуации ===== */
const TOPICS=[
 {t:'Содержание домашних животных',b:'Владелец отвечает за животное и условия его содержания. Конкретные обязанности смотрите в статье о требованиях при обращении и содержании домашних животных.',r:'keeping'},
 {t:'Выгул собак',b:'Требования к выгулу установлены законом, а детали (места, поводок) могут задаваться местными правилами. Не смешивайте правила разных регионов.',r:'walking'},
 {t:'Ответственность владельцев',b:'Закон содержит отдельную статью об ответственности. Размеры штрафов здесь не приводятся до ручной проверки.',r:'liability'},
 {t:'Обязанности по отношению к животным',b:'Закон защищает животных от жестокого обращения. Проверьте формулировки в соответствующей статье.',r:'cruelty'},
 {t:'Проживание в многоквартирном доме',b:'Помимо закона о животных действуют правила ОСИ/КСК и общие нормы. Конкретные положения требуют отдельной проверки.',r:'keeping'},
 {t:'Возможные административные нарушения',b:'Ответственность может быть предусмотрена КоАП РК. Статью и санкцию найдите и проверьте на adilet.zan.kz.',r:'liability'}];
const CASES=[
 {t:'Соседи жалуются на лай собаки',tag:'шум',sc:'noise',b:'Значение могут иметь время, частота шума и наличие жалоб. Мирные пути: разговор, причины лая, договорённость.'},
 {t:'Можно ли выгуливать собаку во дворе?',tag:'выгул',sc:'walk',b:'Ответ зависит от действующих правил и конкретного места (двор, площадка, улица).'},
 {t:'Конфликт из-за кошки в квартире',tag:'содержание',sc:'keeping',b:'У владельца есть права и обязанности по содержанию; важны условия, ветеринарные требования и правила дома.'},
 {t:'Что делать, если поступила жалоба?',tag:'жалоба',sc:'complaint',b:'Алгоритм: запросить документ → проверить факты → найти норму → сверить с источником → ответить письменно.'}];

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function ruleHTML(k){const r=RULES[k];return `<p><b>${esc(r.act)}</b>, ${esc(r.no)}, ${esc(r.art)}.<br><a href="${r.url}" target="_blank" rel="noopener">Открыть на adilet.zan.kz</a></p>`+
 (r.verified?'':'<p class="warn">Требуется проверка актуальной редакции нормативного акта. Размер штрафа не указан — он не подтверждён.</p>');}

/* ===== Мастер ===== */
let cur=null,step=0,ans={};
function wiz(h){const w=$('#wiz');w.innerHTML='<div class="fade">'+h+'</div>';}
function start(){cur=null;step=0;ans={};
 wiz('<h3>Шаг 1. Выберите ситуацию</h3>'+Object.entries(SC).map(([k,s])=>`<button class="opt" data-k="${k}">${s.icon} ${s.title}</button>`).join(''));
 document.querySelectorAll('#wiz .opt').forEach(b=>b.onclick=()=>pick(b.dataset.k));}
function pick(k){cur=k;ans={};step=0;question();}
function question(){const sc=SC[cur],q=sc.qs[step],n=sc.qs.length;
 let body;
 if(q.type==='num') body=`<input id="num" type="number" inputmode="numeric" min="${q.min}" max="${q.max}" value="${ans[q.id]??''}">`;
 else body=q.opts.map((o,i)=>`<button class="opt ${ans[q.id]===i?'sel':''}" data-i="${i}">${o[0]}</button>`).join('');
 wiz(`<div class="bar"><i style="width:${(step/n)*100}%"></i></div><p class="muted">${sc.title} · вопрос ${step+1} из ${n}</p><h3>${q.q}</h3>${body}<p class="err" id="err" role="alert"></p>
 <div class="row"><button class="btn ghost" id="back">← Назад</button><button class="btn" id="next">${step+1===n?'Показать результат':'Далее'}</button></div>`);
 document.querySelectorAll('#wiz .opt').forEach(b=>b.onclick=()=>{ans[q.id]=+b.dataset.i;question();});
 $('#back').onclick=()=>{step===0?start():(step--,question());};
 $('#next').onclick=()=>{
  if(q.type==='num'){const raw=$('#num').value.trim();const v=Number(raw);
   if(raw==='') return err('Введите число.');
   if(!Number.isInteger(v)) return err('Нужно целое число.');
   if(v<q.min||v>q.max) return err(`Допустимо от ${q.min} до ${q.max}.`);
   ans[q.id]=v;
  } else if(ans[q.id]===undefined) return err('Выберите вариант ответа.');
  step++; step<n?question():result();};
}
function err(m){$('#err').textContent=m;}
function result(){const sc=SC[cur];
 for(const q of sc.qs) if(ans[q.id]===undefined) return err('Есть пропущенные ответы.');
 const [cls,label]=STATUS[analyse(sc,ans)];
 wiz(`<div class="res"><div class="bar"><i style="width:100%"></i></div><div class="status ${cls}">${label}</div>
 <h3>${sc.title}</h3>
 <p>Это справочная подсказка по вашим ответам, а не юридическое заключение и не вывод о виновности.</p>
 <h4>Применимая норма</h4>${ruleHTML(sc.rule)}
 <h4>Что можно сделать дальше</h4><ul>${sc.next.map(x=>`<li>${x}</li>`).join('')}</ul>
 <div class="row noprint"><button class="btn" id="re">Начать заново</button><button class="btn ghost" id="ed">Изменить ответы</button><button class="btn ghost" id="pr">Распечатать результат</button></div></div>`);
 $('#re').onclick=start;$('#ed').onclick=()=>{step=0;question();};$('#pr').onclick=()=>window.print();}

/* ===== Справочник, ситуации, источники ===== */
function drawRules(f=''){const q=f.toLowerCase();
 const list=TOPICS.filter(x=>(x.t+x.b).toLowerCase().includes(q));
 $('#ruleList').innerHTML=list.length?list.map(x=>`<details><summary>${x.t}</summary><p>${x.b}</p>${ruleHTML(x.r)}</details>`).join(''):'<p class="muted">Ничего не найдено.</p>';}
let flt='все';
function drawCases(){const tags=['все',...new Set(CASES.map(c=>c.tag))];
 $('#filters').innerHTML=tags.map(t=>`<button class="opt" style="width:auto;margin:0;${t===flt?'background:var(--a);color:#123D35':''}" data-t="${t}">${t}</button>`).join('');
 $('#caseList').innerHTML=CASES.filter(c=>flt==='все'||c.tag===flt).map(c=>`<article class="card"><span class="tag">${c.tag}</span><h3>${c.t}</h3><p>${c.b}</p><button class="btn ghost" data-sc="${c.sc}">Проверить похожую ситуацию</button></article>`).join('');
 document.querySelectorAll('#filters .opt').forEach(b=>b.onclick=()=>{flt=b.dataset.t;drawCases();});
 bindSc();}
function bindSc(){document.querySelectorAll('[data-sc]').forEach(e=>e.onclick=()=>{pick(e.dataset.sc);$('#helper').scrollIntoView();});}
$('#q').oninput=e=>drawRules(e.target.value);
$('#checked').textContent=CHECKED_ON||'Ожидает ручной проверки';
$('#srcList').innerHTML='<ul>'+Object.values(RULES).map(r=>`<li>${esc(r.act)}, ${esc(r.no)}, ${esc(r.art)} — <a href="${r.url}" target="_blank" rel="noopener">adilet.zan.kz</a> · ${CHECKED_ON?'проверено '+CHECKED_ON:'ожидает ручной проверки'}</li>`).join('')+'<li>Кодекс РК об административных правонарушениях — статью и санкцию найдите самостоятельно на adilet.zan.kz · ожидает ручной проверки</li></ul>';

/* ===== Навигация, тема ===== */
$('#burger').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o);};
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.theme='dark';
$('#theme').onclick=()=>{const d=document.documentElement;d.dataset.theme=d.dataset.theme==='dark'?'light':'dark';};
const links=[...document.querySelectorAll('#nav a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id));}),{rootMargin:'-40% 0px -55% 0px'});
['home','helper','rules','cases','sources'].forEach(id=>io.observe(document.getElementById(id)));
start();drawRules();drawCases();bindSc();
