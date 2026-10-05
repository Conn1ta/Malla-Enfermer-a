const C = [
{y:"Año 1",s:[
 {n:"Semestre 1",c:[["Biología y Genética",7],["Química general y orgánica",4],["Matemáticas",3],["Disciplina y profesión de Enfermería",8],["Salud y sociedad",4],["Educación y enfermería",2],["Formación general I",2]]},
 {n:"Semestre 2",c:[["Anatomía",5],["Bioquímica del metabolismo humano",3,["Química general y orgánica"]],["Física",3,["Matemáticas"]],["Histología y Embriología",3],["Salud, MA y Sustentabilidad",3,["Salud y sociedad"]],["Bases del cuidado de Enfermería",10,["Disciplina y profesión de Enfermería"]],["Inglés I",3]]}
]},
{y:"Año 2",s:[
 {n:"Semestre 1",c:[["Fisiología general",4,["Biología y Genética","Anatomía","Física"]],["Farmacología I",3,["Bioquímica del metabolismo humano"]],["Psicología general y del desarrollo",6],["Salud pública y epidemiología I",4,["Matemáticas","Salud, MA y Sustentabilidad"]],["Educación para la salud",5,["Educación y enfermería"]],["Inglés II",3,["Inglés I"]],["Enfermería, salud y género",5,["Salud y sociedad"]]]},
 {n:"Semestre 2",c:[["Fisiología de sistema",6,["Histología y Embriología","Bioquímica del metabolismo humano","Fisiología general"]],["Farmacología II",3,["Farmacología I","Bases del cuidado de Enfermería"]],["Fisiopatología general",3,["Fisiología general"]],["Microbiología",5,["Biología y Genética"]],["Salud pública y epidemiología II",3,["Salud pública y epidemiología I"]],["Cuidados de enfermería aplicados",7,["Farmacología I","Bases del cuidado de Enfermería"]],["Inglés III",3,["Inglés II"]]]}
]},
{y:"Año 3",s:[
 {n:"Semestre 1",c:[["Enfermería de la adultez y vejez I",16,["Farmacología II","Cuidados de enfermería aplicados"]],["Enfermería en salud ocupacional",3,["Salud pública y epidemiología II"]],["Ética en salud",3,["Cuidados de enfermería aplicados"]],["Investigación en salud y metodologías cuantitativas",5,["Salud pública y epidemiología II"]],["Educación interprofesional y práctica colaborativa I",3]]},
 {n:"Semestre 2",c:[["Enfermería en la adultez y vejez II",14,["Enfermería de la adultez y vejez I","Microbiología"]],["Enfermería en emergencias sanitarias y desastres",3,["Salud pública y epidemiología II"]],["Enfermería en salud mental I",4,["Farmacología II","Educación para la salud","Psicología general y del desarrollo"]],["Metodología en investigación cualitativas",3,["Ética en salud","Salud y sociedad"]],["Gestión y liderazgo en salud I",4,["Cuidados de enfermería aplicados"]],["Formación general II",2]]}
]},
{y:"Año 4",s:[
 {n:"Semestre 1",c:[["Enfermería de la niñez y adolescencia I",11,["Farmacología II","Psicología general y del desarrollo","Cuidados de enfermería aplicados"]],["Enfermería en cuidados complejos de aten. primaria de salud",3,["Enfermería en la adultez y vejez II","Ética en salud","Enfermería en salud mental I"]],["Enfermería en salud mental II",6,["Farmacología II","Enfermería en salud mental I","Cuidados de enfermería aplicados"]],["Proyecto de investigación I",4,["Investigación en salud y metodologías cuantitativas","Metodología en investigación cualitativas"]],["Gestión y liderazgo en salud II",4,["Gestión y liderazgo en salud I"]],["Formación general III",2]]},
 {n:"Semestre 2",c:[["Enfermería de la niñez y adolescencia II",11,["Enfermería de la niñez y adolescencia I","Fisiopatología general","Microbiología"]],["Enfermería en cuidados críticos y urgencias",10,["Enfermería en la adultez y vejez II","Enfermería de la niñez y adolescencia I"]],["Enfermería en cuidados al final de la vida",2,["Enfermería en la adultez y vejez II","Enfermería de la niñez y adolescencia I","Ética en salud"]],["Proyecto de investigación II",4,["Proyecto de investigación I"]],["Educación interprofesional y práctica colaborativa II",3,["Educación interprofesional y práctica colaborativa I"]]]}
]},
{y:"Año 5",s:[
 {n:"Semestre 1",c:[["Práctica profesional en atención primaria de salud",20,["Proyecto de investigación II","Enfermería en cuidados críticos y urgencias","Enfermería de la niñez y adolescencia II","Enfermería en cuidados al final de la vida"]],["Formación profesional electiva",14,["Proyecto de investigación II","Enfermería en cuidados críticos y urgencias","Enfermería de la niñez y adolescencia II","Enfermería en cuidados al final de la vida"]]]},
 {n:"Semestre 2",c:[["Práctica profesional en atención hospitalaria",20,["Proyecto de investigación II","Enfermería en cuidados críticos y urgencias","Enfermería de la niñez y adolescencia II","Enfermería en cuidados al final de la vida"]],["Práctica profesional en unidades de urgencias",6,["Proyecto de investigación II","Enfermería en cuidados críticos y urgencias","Enfermería de la niñez y adolescencia II","Enfermería en cuidados al final de la vida"]]]}
]}
];

const STORE="malla-enfermeria-v2", states=JSON.parse(localStorage.getItem(STORE)||"{}");
let filter="all", selected=null, selectedName=null;

const allCourses=()=>C.flatMap(y=>y.s.flatMap(s=>s.c.map(x=>({name:x[0],credits:x[1],req:x[2]||[],year:y.y,sem:s.n}))));
const byName=n=>allCourses().find(x=>x.name===n);
function id(x){return x.year+"|"+x.sem+"|"+x.name}
function status(x){
  const st=states[id(x)]||"pending";
  if(st==="approved"||st==="current") return st;
  return (x.req.length===0 || x.req.every(r=>states[id(byName(r))]==="approved")) ? "available":"blocked";
}
function render(){
  const root=document.getElementById("curriculum"); root.innerHTML="";
  C.forEach((y,yi)=>{
    const yr=document.createElement("section"); yr.className="year";
    yr.innerHTML=`<div class="year-title">${y.y}</div>`;
    const pair=document.createElement("div"); pair.className="semester-pair";
    y.s.forEach(s=>{
      const sem=document.createElement("div");
      sem.innerHTML=`<div class="semester-title">${s.n}</div>`;
      s.c.forEach(raw=>{
        const x={name:raw[0],credits:raw[1],req:raw[2]||[],year:y.y,sem:s.n}, st=status(x);
        const el=document.createElement("article"); el.className=`course ${st}`;
        if(selectedName===x.name) el.classList.add("selected");
        if(selectedName && x.req.includes(selectedName)) el.classList.add("unlocks");
        if(selectedName && byName(selectedName)?.req.includes(x.name)) el.classList.add("prereq");
        if(filter!=="all" && st!==filter) el.classList.add("filtered");
        el.innerHTML=`<span class="course-name">${x.name}</span><span class="course-credits">(${x.credits} Cr)</span>`;
        el.onclick=()=>openCourse(x);
        sem.appendChild(el);
      });
      sem.insertAdjacentHTML("beforeend",`<div class="semester-total">${s.c.reduce((a,x)=>a+x[1],0)} créditos</div>`);
      pair.appendChild(sem);
    });
    yr.appendChild(pair);
    if(yi===4) yr.insertAdjacentHTML("beforeend",`<p class="note">* Los cursos de quinto año son ofrecidos en ambos semestres y la secuencia dependerá del reglamento interno de asignación de internados.</p>`);
    root.appendChild(yr);
  });
  updateProgress();
}
function updateProgress(){
  const all=allCourses(), total=all.reduce((a,x)=>a+x.credits,0), ap=all.filter(x=>states[id(x)]==="approved").reduce((a,x)=>a+x.credits,0);
  const pct=Math.round(ap/total*100);
  progressText.textContent=pct+"%"; progressBar.style.width=pct+"%"; creditText.textContent=`${ap} / ${total} créditos aprobados`;
}
function openCourse(x){
  selected=id(x); selectedName=x.name;
  modalSemester.textContent=`${x.year} · ${x.sem}`;
  modalTitle.textContent=x.name; modalCredits.textContent=`${x.credits} créditos · Estado: ${label(status(x))}`;
  modalReq.innerHTML=x.req.length?`<div class="req-title">Prerrequisitos</div><ul class="req-list">${x.req.map(r=>`<li class="${states[id(byName(r))]==="approved"?"ok":"missing"}">${r} — ${states[id(byName(r))]==="approved"?"aprobado":"pendiente"}</li>`).join("")}</ul>`:`<div class="req-title">Prerrequisitos</div><ul class="req-list"><li>Sin prerrequisitos</li></ul>`;
  modalBackdrop.hidden=false; render();
}
function label(s){return ({approved:"Aprobado",current:"Cursando",available:"Disponible",blocked:"Bloqueado",pending:"Pendiente"})[s]||s}
function close(){modalBackdrop.hidden=true;selected=null;selectedName=null;render()}
document.querySelectorAll(".status-buttons button").forEach(b=>b.onclick=()=>{
  if(selected){states[selected]=b.dataset.status;localStorage.setItem(STORE,JSON.stringify(states));modalBackdrop.hidden=true;selected=null;selectedName=null;render()}
});
closeModal.onclick=close; modalBackdrop.onclick=e=>{if(e.target===modalBackdrop)close()};
document.querySelectorAll(".legend button").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render()});
resetBtn.onclick=()=>{if(confirm("¿Borrar todo el progreso guardado?")){Object.keys(states).forEach(k=>delete states[k]);localStorage.setItem(STORE,JSON.stringify(states));render()}};
render();
