'use strict';
// Pure routing function: original FAO baseline plus explicitly labeled regional guidance.
function evaluateRoute(a) {
  const warnings=[]; let section=null;
  const student=['undergrad','graduate'].includes(a.applicant);
  const foreign=a.foreign==='yes'||a.applicant==='foreign';
  if(foreign) section='22.2';
  else if(a.purpose==='urgent'&&a.applicant==='government') section='22.4';
  else if(a.purpose==='government') section='22.5';
  else if(student&&a.purpose==='thesis') section='22.6';
  else if(a.purpose==='conservation') section='22.3';
  else if(a.purpose==='research'&&a.foreign==='no'&&a.applicant!=='unknown') section='22.1';
  if(a.purpose==='commercial'){section=null;warnings.push('Commercial product development / bioprospecting: confirm the applicable legal route. A research GP must not be assumed to authorize commercial use.');}
  if(a.purpose==='urgent'&&a.applicant!=='government')warnings.push('Section 22.4 is for certified urgent government-agency collection. Your answers do not establish that condition.');
  if(a.purpose==='thesis'&&!student&&!foreign)warnings.push('Section 22.6 is for students affiliated with local academic institutions. Confirm the applicant category and project status.');
  if(foreign&&['government','conservation','thesis','urgent'].includes(a.purpose))warnings.push('Foreign nationality, affiliation or funding points to Section 22.2. Your project also overlaps another category; BFAR must resolve the applicable pathway.');
  if(a.foreign==='unknown')warnings.push('Nationality, foreign affiliation or funding is unresolved. The displayed pathway is provisional; Section 22.2 may apply.');
  if(a.applicant==='foreign'&&a.foreign==='no')warnings.push('Your nationality answers conflict. Foreign researcher takes precedence for this indicative route; correct the answers or confirm with BFAR.');
  if(a.purpose==='government'&&a.applicant!=='government')warnings.push('Confirm that this is genuinely government-initiated or implemented research; a government grant alone does not establish Section 22.5.');
  if(a.applicant==='unknown'||a.purpose==='unknown')warnings.push('Applicant or research category is uncertain. Ask BFAR to confirm the section before relying on the checklist.');
  let office=section&&['22.1','22.2','22.3'].includes(section)?'BFAR Central Office':section?'BFAR Region IV-A':'Confirm processing office with BFAR';
  let officeBasis='Original FAO 233 §22.7 baseline; confirm current receiving unit/delegation.';
  if(a.geography==='other'&&section&&!['22.1','22.2','22.3'].includes(section))office='Concerned BFAR Regional Office outside IV-A';
  if(a.geography==='multi'){office='BFAR Central Office';officeBasis='FAO 233 §22.9: research covering two or more regions.';}
  if(a.geography==='palawan'){office='Confirm jurisdiction with BFAR / PCSD';officeBasis='Palawan involvement needs jurisdiction review; this guide does not decide the receiving authority.';warnings.push('Palawan is involved. Confirm jurisdiction and any cross-region coordination before filing.');}
  if(a.geography==='unknown')warnings.push('Collection sites are not finalized. Office routing can change, especially if two or more regions are involved.');
  const special=['protected','cites','unknown'].includes(a.species)||a.status!=='no';
  if(special)warnings.push('Special review required — confirm the applicable permit and processing office with BFAR. Threatened/protected/CITES or unknown status does not trigger an automatic blanket Central Office rule in this guide.');
  if(a.species==='coral'){office=a.geography==='palawan'?'BFAR Central Office–FRLD–AWRS referral; confirm Palawan jurisdiction':'BFAR Central Office – FRLD – AWRS';officeBasis='Supplied BFAR 4A operational coral referral; not a blanket FAO 233 routing provision.';warnings.push('Coral collection: seek Central Office–FRLD–AWRS review under the supplied regional operational guidance.');}
  const properties=a.properties==='yes'||a.species==='properties';
  if(properties){warnings.push('Known toxin/residue/pharmacological/commercial properties: an MOA with the Secretary and Secretary-level issuance may be needed; confirm the evidence and route with BFAR. An affidavit must not substitute for a required MOA.');if(section==='22.6'||section==='22.1'){office=a.geography==='palawan'?'Central Office / Secretary-level review; confirm Palawan jurisdiction':'BFAR Central Office / Secretary-level review';officeBasis='FAO 233 §§22.1(7), 22.6(6–7), 22.7, as applicable; BFAR confirms the special condition.';}}
  if(a.properties==='unknown')warnings.push('The species’ toxin/pharmacological/commercial properties remain unverified; ask BFAR whether an MOA/Secretary-level route is required.');
  if(!a.scientific?.trim())warnings.push('Scientific names are missing. Identify every target species and verify status with BFAR; the site does not perform a live status lookup.');
  if(a.source!=='wild')warnings.push('The source is cultured/purchased/existing or uncertain. Disclose acquisition details and confirm permit coverage and transport requirements; this result does not declare an exemption.');
  if(a.clearance!=='no')warnings.push('Check each site for protected-area, Indigenous Peoples’ and private/tenurial rights. Confirm which consent/clearance and issuing authority apply.');
  if(a.export!=='no')warnings.push('Actual or possible export needs separate BFAR advice on export/CITES and other applicable authorizations. Do not assume the GP covers shipment abroad.');
  if(section==='22.4')warnings.push('Section 22.4 is a conditional exemption from the scientific-research rule for certified urgent government collection. Prior notice and written results/action plan still apply. Ask BFAR to confirm eligibility; do not assume a fee waiver or permission to collect.');
  if(!section)warnings.push('No definitive Section 22 checklist can be assigned from these answers. Use the preparation list and ask BFAR to determine the applicable permit.');
  if(a.applicant==='highschool'||a.purpose==='school'){section=null;warnings.push('School project: ask BFAR to confirm the applicable section, documents and fee. Do not assume that a school activity qualifies as a thesis under Section 22.6.');if(!['multi','palawan'].includes(a.geography)&&a.species!=='coral')office='Ask BFAR to confirm the office for this school project';}
  let fee=student&&a.foreign==='no'&&!foreign?(a.applicant==='undergrad'?'₱20 total':'₱120 total'):'Generally ₱200 total';
  let feeNote=student&&a.foreign==='no'&&!foreign?(a.applicant==='undergrad'?'₱0 research application + ₱20 GP.':'₱100 research application + ₱20 GP.'):'Typical other-researcher/project total: ₱100 research application + ₱100 GP. Confirm assessment; this is not a universal fee for every special route.';
  if(section==='22.4'||!section||a.foreign==='unknown'){fee='Confirm assessment with BFAR';feeNote='The standard regional reference totals are ₱20 undergraduate, ₱120 graduate and generally ₱200 other researchers. Eligibility and special cases must be assessed first.';}
  return {section,office,officeBasis,warnings,fee,feeNote,properties,special};
}
if(typeof module!=='undefined'&&module.exports)module.exports={evaluateRoute};
if(typeof document!=='undefined'){
const $=s=>document.querySelector(s);const $$=s=>Array.from(document.querySelectorAll(s));
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const form=$('#permit-form'),steps=$$('.wizard-step');let step=0,checkKey='',checks={},canStore=true;
$('#wizard-app').hidden=false;
try{localStorage.setItem('gp-v1-test','1');localStorage.removeItem('gp-v1-test');}catch(e){canStore=false;}
function answers(){return Object.fromEntries(new FormData(form));}
function showStep(n,focus=true){step=n;steps.forEach((s,i)=>s.hidden=i!==n);$$('.stepper li').forEach((li,i)=>{if(i===n)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});$('#back').hidden=n===0;$('#next').textContent=n===3?'Show my next steps →':'Continue →';$('#step-count').textContent=`Step ${n+1} of 4`;$('#form-error').textContent='';if(n===3){$('#answer-review').innerHTML='<h3>Your answers so far</h3><div class="answer-list">'+$$('#permit-form select').filter(x=>!steps[3].contains(x)).map(x=>`<p><b>${escapeHTML(document.querySelector(`label[for="${x.id}"]`).textContent)}:</b> ${escapeHTML(x.selectedOptions[0].textContent)}</p>`).join('')+'</div>';}if(focus){const legend=steps[n].querySelector('legend');legend.tabIndex=-1;legend.focus();}}
form.addEventListener('submit',e=>{e.preventDefault();const bad=Array.from(steps[step].querySelectorAll('[required]')).filter(x=>!x.value);steps[step].querySelectorAll('[required]').forEach(x=>x.removeAttribute('aria-invalid'));if(bad.length){$('#form-error').textContent='Please choose an answer for each question. You can choose “I’m not sure”.';bad.forEach(x=>x.setAttribute('aria-invalid','true'));bad[0].focus();return;}if(step<3)showStep(step+1);else renderResult();});
$('#back').addEventListener('click',()=>showStep(step-1));showStep(0,false);
function hash(s){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16);}
function renderResult(){
 const a=answers(),r=evaluateRoute(a),path=window.GP_DATA.paths[r.section];
 checkKey='gp-v2-checks-'+hash(JSON.stringify(a));checks={};
 if(canStore)try{const saved=JSON.parse(localStorage.getItem(checkKey)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))checks=saved;}catch(e){checks={};}
 const requirements=path?path.requirements.slice():['Write what you want to study, what and how much you will collect, where and when, who will collect it, and who will pay for the project.','Ask BFAR which permit, office, documents and fee apply to your project.'];
 if(r.properties&&['22.1','22.6'].includes(r.section)){const i=requirements.findIndex(t=>t.includes('Affidavit'));requirements[i]='Confirm the specified species-property condition with BFAR; if it applies, obtain the required MOA with the Secretary rather than substituting an affidavit.';}
 const practical=['If BFAR asks for the Annex A work plan, list the weight in grams, possible dates, all collectors and exact collection places.','Check that the PDF files are easy to read. Names, dates and amounts should match in every document.'];
 const item=(text,id)=>{const short=window.GP_DATA.simpleRequirements[text];return `<li><label><input type="checkbox" data-check="${id}" ${checks[id]?'checked':''}><span>${escapeHTML(short||text)}</span></label>${short?`<details class="requirement-detail"><summary>What this needs to include</summary><div class="detail-body">${escapeHTML(text)}</div></details>`:''}</li>`;};
 const local=r.office==='BFAR Region IV-A'&&a.geography==='4a';
 const submit=local?'For the indicated Region IV-A route: email TO <b>region4arecords@bfar.da.gov.ph</b>, CC <b>frms.4a@bfar.da.gov.ph</b>, or submit in person at <b>BFAR Region IV-A, Purok 3, Brgy. Bambang, Los Baños, Laguna</b>. One combined PDF or separate readable PDFs are accepted under the supplied regional guidance.':'Your result involves Central Office, another region or unresolved routing. Confirm the receiving office and its submission channel before filing. For referral guidance, contact Region IV-A: <b>region4arecords@bfar.da.gov.ph</b>, CC <b>frms.4a@bfar.da.gov.ph</b>; Purok 3, Brgy. Bambang, Los Baños, Laguna. These are Region IV-A contacts, not Central Office filing addresses.';
 $('#result-title').textContent='Your next steps';
 $('#result-content').innerHTML=`<p class="result-meta"><b>Scientific name(s):</b> ${escapeHTML(a.scientific||'Not supplied')}<br><b>Sites:</b> ${escapeHTML(a.sites||$('#geography').selectedOptions[0].textContent)}<br><b>Research:</b> ${escapeHTML($('#purpose').selectedOptions[0].textContent)}<br><b>Guide prepared:</b> 14 October 2026 · indicative result</p><div class="result-grid"><div class="result-tile"><small>LIKELY FAO 233 PATHWAY</small><strong>${path?`§${r.section} · ${escapeHTML(path.title)}`:'Needs confirmation'}</strong><p>Read this together with every review flag below.</p></div><div class="result-tile"><small>LIKELY PROCESSING OFFICE</small><strong>${escapeHTML(r.office)}</strong><p>${escapeHTML(r.officeBasis)}</p></div><div class="result-tile"><small>REGIONAL FEE GUIDANCE</small><strong>${escapeHTML(r.fee)}</strong><p>${escapeHTML(r.feeNote)} Supplied BFAR 4A practical guidance; confirm the Order of Payment.</p></div><div class="result-tile"><small>BEFORE FIELDWORK</small><strong>Obtain the applicable authorization.</strong><p>Application and payment are not approval. Follow the issued permit’s species, sites, quantities, personnel and dates.</p></div></div>${r.warnings.length?'<div class="warnings"><b>Review these points with BFAR</b><ul>'+r.warnings.map(w=>`<li>${escapeHTML(w)}</li>`).join('')+'</ul></div>':''}<p class="help">The original §22.7 baseline and the 2024 Citizen’s Charter differ on some processing assignments. Confirm current delegation. Threatened/protected status requires specific review, regardless of the baseline office shown.</p><h3>Your preparation checklist</h3><p id="check-progress" role="status"></p><span class="tag ${path?'legal':'verify'}">${path?'Required by FAO 233 · §'+r.section:'Preparation only · requirements unconfirmed'}</span><ul class="checklist">${requirements.map((t,i)=>item(t,'legal-'+i)).join('')}</ul><span class="tag practice">BFAR 4A practical guidance</span><ul class="checklist">${practical.map((t,i)=>item(t,'practice-'+i)).join('')}</ul><h3>Submit and follow up</h3><p>${submit}</p><p>BFAR checks completeness and evaluates your application; respond to any clarification requests. Section 22.8 does not allow acceptance of incomplete applications. No processing time is promised here.</p><h3>Payment and permit release</h3><span class="tag practice">Region IV-A workflow only</span><p>FMRED–FRMS: get the Order of Payment → Accounting: bring the order → Cashier: pay → FRMS: provide a <b>Certified True Copy of the Official Receipt</b> → Records: if the GP is already signed, show the receipt and claim the hard copy.</p><p>The application and GP fee components may be paid in one transaction for convenience. Confirm payment/release instructions separately for Central Office or another region.</p><h3>Templates and samples</h3><p>Newly drafted aids; original uploaded samples were unavailable. Confirm the accepted formats before use.</p><ul>${Array.from(document.querySelectorAll('.download-card')).map(el=>`<li><a href="${escapeHTML(el.getAttribute('href'))}" download>${escapeHTML(el.querySelector('strong').textContent)}</a></li>`).join('')}</ul><h3>After collection</h3><ul class="checklist">${item('Regional guidance: submit the Sampling Report and Inventory within 60 days after the last collection day, including accidentally collected biological resources. Check permit-specific obligations.','post-0')}${item('Regional guidance: send final thesis/manuscript/research results to Records (region4arecords@bfar.da.gov.ph), CC FRMS (frms.4a@bfar.da.gov.ph).','post-1')}${item('FAO 233 §22.10: submit research results to BFAR and NFRDI; confirm NFRDI’s receiving channel separately.','post-2')}</ul><p class="help">Source: FAO 233 §§22 and 35.1(A), plus the supplied BFAR 4A workflow. Full source and verification notes are in the complete guide. This is not an official BFAR issuance.</p>`;
 simplifyResult(a,r,path);
 $('#wizard-app').hidden=true;$('#result').hidden=false;
 $$('#result-content input[type=checkbox]').forEach(x=>x.addEventListener('change',()=>{checks[x.dataset.check]=x.checked;persist();updateProgress();}));
 updateProgress();storageMessage();$('#result-title').focus();
}
function simplifyResult(a,r,path){
 const content=$('#result-content');
 const school=a.applicant==='highschool'||a.purpose==='school';
 const next=document.createElement('div');next.className='next-first';
 next.innerHTML=`<p class="eyebrow">START WITH THESE 3 THINGS</p><h3>${school?'Bring your project plan to your teacher.':'Here is what to do first.'}</h3><ol class="flow"><li><b>${school?'Go through your answers with your teacher.':'Check your answers with your research team.'}</b><span>Write down anything you are not sure about.</span></li><li><b>Ask BFAR to check the rules for your project.</b><span>${school?'A school activity does not automatically use the college-thesis rules. Ask about the right documents and fee.':'Confirm the office, documents and fee before you apply.'}</span></li><li><b>Use the list below to prepare your papers.</b><span>Wait for the required permission before collecting anything.</span></li></ol><a href="#word-help">Need help with a word? Open the word guide ↓</a>`;
 content.prepend(next);
 const tiles=content.querySelectorAll('.result-tile');
 tiles[0].querySelector('small').textContent='POSSIBLE SET OF RULES';
 const names={'22.1':'Filipino researcher, no foreign funding','22.2':'Research with foreign involvement','22.3':'A wildlife conservation project','22.4':'Urgent government collection','22.5':'Government research','22.6':'Student thesis or dissertation'};
 tiles[0].querySelector('strong').textContent=path?names[r.section]:'Ask BFAR to check your project';
 tiles[0].querySelector('p').textContent=path?`FAO 233 Section ${r.section} may apply. BFAR must confirm this.`:'We cannot choose a legal section from these answers.';
 tiles[1].querySelector('small').textContent='OFFICE TO ASK';
 const basis=tiles[1].querySelector('p');const detail=document.createElement('details');detail.innerHTML='<summary>Why this office?</summary><div class="detail-body"></div>';detail.querySelector('div').textContent=basis.textContent;basis.replaceWith(detail);
 tiles[2].querySelector('small').textContent='MONEY TO PLAN FOR';
 tiles[3].querySelector('strong').textContent='Wait for the required permission.';
 tiles[3].querySelector('p').textContent='Sending papers or paying a fee does not mean you can collect yet. Read and follow the permit when it is issued.';
 const warning=content.querySelector('.warnings');
 if(warning){
   const plain=[];
   if(school)plain.push('Ask your teacher and BFAR to check the rules for this school project. The fee is not confirmed yet.');
   if(r.special)plain.push('Some living things may have special protection, or their status is unknown. Ask BFAR which permit and office apply.');
   if(a.species==='coral')plain.push('For coral, the supplied BFAR 4A instructions refer you to the aquatic wildlife team at BFAR Central Office (FRLD–AWRS).');
   if(r.properties||a.properties==='unknown')plain.push('Ask whether the species needs a special agreement because of toxins or possible medicine/product uses.');
   if(a.foreign!=='no'||a.applicant==='foreign')plain.push('Tell BFAR about any person, school, organization or money from another country.');
   if(a.geography==='palawan'||a.geography==='unknown')plain.push('Confirm the exact collection places and the office responsible for them.');
   if(a.export!=='no')plain.push('Ask about extra permission before sending samples outside the Philippines.');
   if(a.source!=='wild')plain.push('Tell BFAR if samples are bought, farmed or already collected. Do not assume no permit is needed.');
   if(a.clearance!=='no')plain.push('Ask whose permission is needed for each collection place.');
   if(!a.scientific.trim())plain.push('Ask for help finding the scientific names of everything you plan to collect.');
   if(!plain.length)plain.push('Some answers need a closer check. Show the notes below to BFAR.');
   const original=warning.innerHTML;
   warning.innerHTML='<b>Things to ask about</b><ul>'+plain.map(t=>'<li>'+escapeHTML(t)+'</li>').join('')+'</ul><details><summary>More details for your teacher or BFAR</summary><div class="detail-body">'+original+'</div></details>';
 }
 const legalNote=Array.from(content.children).find(e=>e.matches('p.help')&&e.textContent.includes('22.7'));
 if(legalNote){const note=document.createElement('details');note.innerHTML='<summary>Note about the legal rules and office assignments</summary><div class="detail-body"></div>';note.querySelector('div').textContent=legalNote.textContent;legalNote.replaceWith(note);}
 const headings={'Your preparation checklist':'Your list of things to prepare','Submit and follow up':'Send your papers, then check for a reply','Payment and permit release':'How to pay and get the permit','Templates and samples':'Sample documents','After collection':'After you finish collecting'};
 content.querySelectorAll('h3').forEach(h=>{if(headings[h.textContent])h.textContent=headings[h.textContent];});
 const pay=Array.from(content.querySelectorAll('p')).find(e=>e.textContent.startsWith('FMRED–FRMS:'));
 if(pay){const list=document.createElement('ol');list.className='flow';list.innerHTML='<li><b>Ask FMRED–FRMS for an Order of Payment.</b><span>This tells the Cashier what you need to pay.</span></li><li><b>Bring it to Accounting.</b></li><li><b>Pay at the Cashier.</b><span>Keep your Official Receipt.</span></li><li><b>Give FRMS a Certified True Copy of the receipt.</b><span>Ask the office how to obtain the accepted certified copy.</span></li><li><b>Claim the hard copy at Records when the GP is signed.</b><span>Show your receipt.</span></li>';pay.replaceWith(list);}
}
function persist(){if(canStore)try{localStorage.setItem(checkKey,JSON.stringify(checks));}catch(e){canStore=false;}storageMessage();}
function storageMessage(){$('#storage-status').textContent=canStore?'Your ticked boxes stay in this browser. Your answers are not saved or sent. Enter the same answers next time to see your saved ticks.':'This browser cannot save your ticks. Print your list if you want to keep it.';}
function updateProgress(){const all=$$('#result-content input[type=checkbox]');$('#check-progress').textContent=`${all.filter(x=>x.checked).length} of ${all.length} items checked. Ticking a box does not send a document or mean BFAR has approved it.`;}
$('#edit-answers').addEventListener('click',()=>{$('#result').hidden=true;$('#wizard-app').hidden=false;showStep(0);});
$('#reset-checklist').addEventListener('click',()=>{checks={};$$('#result-content input[type=checkbox]').forEach(x=>x.checked=false);if(canStore)try{localStorage.removeItem(checkKey);}catch(e){canStore=false;}updateProgress();storageMessage();});
let printDetails=[];
window.addEventListener('beforeprint',()=>{printDetails=$$('#result-content details').map(el=>[el,el.open]);printDetails.forEach(([el])=>el.open=true);});
$('#print-result').addEventListener('click',()=>{document.body.classList.add('print-result');window.print();});window.addEventListener('afterprint',()=>{document.body.classList.remove('print-result');printDetails.forEach(([el,open])=>el.open=open);printDetails=[];});
$('#faq-search').addEventListener('input',e=>{const q=e.target.value.trim().toLocaleLowerCase();let count=0;$$('.faq-item').forEach(el=>{el.hidden=!el.textContent.toLocaleLowerCase().includes(q);if(!el.hidden)count++;});$('#faq-count').textContent=`${count} question${count===1?'':'s'}${q?' found':''}`;$('#faq-empty').hidden=count!==0;});
$('#last-date').addEventListener('change',e=>{if(!e.target.value){$('#deadline').textContent='Select a date to calculate 60 calendar days after collection.';return;}const d=new Date(e.target.value+'T00:00:00Z');if(Number.isNaN(d.getTime()))return;d.setUTCDate(d.getUTCDate()+60);$('#deadline').textContent='60-day reference deadline: '+new Intl.DateTimeFormat('en-PH',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(d)+'. Check the issued permit and current BFAR instructions.';});
}
