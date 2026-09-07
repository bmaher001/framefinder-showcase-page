import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import QRCode from 'qrcode';
gsap.registerPlugin(ScrollTrigger);
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');

// Reveal navigation on upward scroll; ignore tiny trackpad movements.
const header = $('.header');
let navigationScrollY = Math.max(0, window.scrollY);
let navigationFramePending = false;
window.addEventListener('scroll', () => {
  if (navigationFramePending) return;
  navigationFramePending = true;
  requestAnimationFrame(() => {
    navigationFramePending = false;
    const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
    if (document.body.classList.contains('modal-open')) {
      navigationScrollY = y;
      return;
    }
    const delta = y - navigationScrollY;
    if (y <= header.offsetHeight) {
      header.classList.remove('header-hidden');
    } else if (Math.abs(delta) >= 8) {
      header.classList.toggle('header-hidden', delta > 0 && !header.contains(document.activeElement));
    } else {
      return;
    }
    navigationScrollY = y;
  });
}, { passive: true });
header.addEventListener('focusin', () => header.classList.remove('header-hidden'));
const clipNames=['coast','forest','city','dunes','mountain','night','snow'];
$('.intro-filmstrip').innerHTML=[...clipNames,...clipNames,...clipNames].map(n=>`<img src="/assets/${n}.jpg" alt="" loading="lazy">`).join('');

// The semantic interaction illustrates dimensions, rather than claiming a live AI service.
$('#semantic-form').addEventListener('submit',e=>{e.preventDefault();const query=$('input',e.currentTarget).value.trim();const concepts=[['PERSON',/ahmed/i.test(query)?'Ahmed':/sarah/i.test(query)?'Sarah':'Anyone'],['ACTION',/talk|interview/i.test(query)?'Talking':/walk/i.test(query)?'Walking':'Any action'],['PLACE',/sea|coast|beach/i.test(query)?'Sea':/city|cairo/i.test(query)?'City':'Any place'],['LIGHT',/sunset|golden/i.test(query)?'Sunset':/night/i.test(query)?'Night':'Any light']];$('.semantic-dimensions').innerHTML=concepts.map(([type,value])=>`<div><small>${type}</small><span>${value}</span></div>`).join('');$('#semantic-caption').textContent='Concept preview: example keyword dimensions, not a live archive search.';if(!reduced.matches)gsap.fromTo('.semantic-dimensions>div',{y:16,opacity:.3},{y:0,opacity:1,stagger:.09,duration:.55});});

const queries={coast:[['coast','ATLAS_08TB','A0142.R3D','00:18:42:11'],['dunes','NOVA_12TB','COAST_B_0831.MOV','01:04:19:08'],['mountain','FIELD_07','DRONE_0042.MOV','00:07:11:02']],city:[['city','NOVA_12TB','CITY_EXT_008.BRAW','00:28:41:03'],['night','ARCHIVE_12','NIGHT_WIDE_019.MOV','00:09:33:07'],['city','ATLAS_08TB','ROOFTOP_002.MXF','00:02:15:21']],person:[['omar','ATLAS_08TB','INTERVIEW_A_042.MOV','00:13:08:21'],['maya','FIELD_07','BTS_DAY_06.MXF','00:08:52:02'],['leila','NOVA_12TB','PRESENTER_B_009.MOV','00:22:11:16']]};
function renderResults(key){$('.search-results').innerHTML=queries[key].map(([image,drive,file,time],i)=>`<article class="result"><div class="result-image"><img src="/assets/${image}.jpg" alt="${key==='person'?'Example presenter portrait':key==='city'?'Example city or night footage':'Example landscape footage'}" loading="lazy"><span>${time}</span></div><div class="result-meta"><span>${file}</span><span>0${i+1} / CATALOGUE</span></div><code>${drive} / INDEXED THUMBNAIL</code></article>`).join('');if(!reduced.matches)gsap.fromTo('.result',{opacity:.25,y:12},{opacity:1,y:0,stagger:.07,duration:.45});}
renderResults('coast');$$('[data-query]').forEach(b=>b.addEventListener('click',()=>{$$('[data-query]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderResults(b.dataset.query);}));

const drives={
  atlas:{name:'ATLAS_08TB',path:'/PROJECT_X/DAY_04/A0142.R3D',image:'coast',alt:'Indexed coastal footage at sunset',timecode:'00:18:42:11'},
  nova:{name:'NOVA_12TB',path:'/CITY_STORIES/B_CAM/CITY_EXT_008.BRAW',image:'city',alt:'Indexed city skyline footage',timecode:'00:28:41:03'},
  field:{name:'FIELD_07',path:'/FIELD_UNIT/DAY_02/MOUNTAIN_0042.MOV',image:'mountain',alt:'Indexed mountain landscape footage',timecode:'00:07:11:02'},
  archive:{name:'ARCHIVE_12',path:'/DOCUMENTARY/2021/FOREST_UNIT_B_072.MXF',image:'forest',alt:'Indexed documentary footage of a forest',timecode:'00:04:37:19'}
};
let selectedDrive='atlas',connected=false;
function updateDrive(){const {name,path,image,alt,timecode}=drives[selectedDrive];$('#found-drive').textContent=name;$('#found-path').textContent=path;const thumbnail=$('.retrieval-panel>img');thumbnail.src=`/assets/${image}.jpg`;thumbnail.alt=alt;$('.retrieval-panel .timecode').textContent=timecode;$$('[data-drive]').forEach(b=>{const chosen=b.dataset.drive===selectedDrive;b.classList.toggle('selected',chosen);b.classList.toggle('connected',chosen&&connected);b.setAttribute('aria-pressed',String(chosen));$('small',b).textContent=chosen&&connected?'CONNECTED':'DISCONNECTED';});$('.retrieval-panel .eyebrow').textContent=connected?'Demonstration / Source drive reconnected':'Catalogue match / Original disconnected';$('#reconnect').innerHTML=connected?'Reset demonstration <span>↺</span>':'Reconnection <span>↗</span>';$('#source-rule').textContent=connected?`Reconnection simulated. In the desktop app, you can now open or retrieve the original from ${name}. No hardware or source file is accessed in this demonstration.`:`The indexed thumbnail is available. Reconnect ${name} to open, preview at source quality, export or retrieve the original.`;}
$$('[data-drive]').forEach(b=>b.addEventListener('click',()=>{selectedDrive=b.dataset.drive;connected=false;updateDrive();}));$('#reconnect').addEventListener('click',()=>{connected=!connected;updateDrive();});updateDrive();
QRCode.toCanvas($('#qr'),`${location.origin}/#drive-label`,{width:150,margin:1,color:{dark:'#0a0b0c',light:'#efefed'}}).catch(()=>{$('#label-button').textContent='Example label unavailable';});$('.label-details').id='drive-label';
$('#label-button').addEventListener('click',()=>{$('#label-button').innerHTML='Example label generated <span>✓</span>';if(!reduced.matches){gsap.fromTo('.qr-label',{x:95,y:65,rotation:9,opacity:0},{x:0,y:0,rotation:0,opacity:1,duration:1,ease:'power3.out'});gsap.fromTo('.label-details',{opacity:.2,y:15},{opacity:1,y:0,duration:.6,delay:.5});}});
$('#scan-label').addEventListener('click',()=>{$('#scan-label').innerHTML='✓ &nbsp; ATLAS identified';$('.phone').classList.add('scanned');if(!reduced.matches)gsap.fromTo('.phone dl',{opacity:.2,y:12},{opacity:1,y:0,duration:.65});});
$$('[data-person]').forEach(b=>b.addEventListener('click',()=>{$$('[data-person]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#person-note').textContent=`Find the moments with ${b.dataset.person}.`;}));
const audiences=[['Directors','For the\nstory finders.','Directors finding the take, reference or archived moment that makes the next story work.','camera'],['Editors','For the\nperfect cut.','Find the exact shot without manually scrubbing hours of source footage.','city'],['Assistant editors','For the\narchive keepers.','Bring order to fragmented projects, camera cards, folders and removable drives.','forest'],['Production companies','For years\nof possibility.','Discover reusable footage across years of projects and shelves of physical storage.','camera'],['Post-production','For the\nnext delivery.','Locate media across large local archive systems and reconnect the original source.','night'],['Newsrooms','For the\nfull story.','Find historical interviews, events, people and B-roll in the catalogue.','city'],['Documentary filmmakers','For the\nlong story.','Return to years of interviews and observational footage with a clear route to the source.','mountain'],['Media teams','For your\nshared memory.','Discover the local video assets your team already has before starting again.','forest'],['Content creators','For the\nnext creation.','Rediscover reusable footage across personal projects and commercial archives.','coast'],['Photographers / Videographers','For every\npoint of view.','Explore visual archives across multiple drives, projects and years.','dunes']];
const audienceCarousel=$('.audience-carousel');
const audienceStage=$('.audience-stage');
const audienceTrack=$('#audience-track');
const audienceTabs=$('.audience-tabs');
const audienceTotal=audiences.length;
const audienceFraction=$('#audience-fraction');
const audiencePrevious=$('#audience-prev');
const audienceNext=$('#audience-next');
let audienceIndex=0,audienceScrollTrigger=null,audienceScrollTween=null;
audienceTrack.innerHTML=audiences.map(([role,title,copy,image],i)=>`<article class="audience-slide" id="audience-slide-${i}" data-audience-slide="${i}" aria-hidden="${i===0?'false':'true'}"><img src="/assets/${image}.jpg" alt="Illustrative footage for ${role.toLowerCase()}"${i===0?'':` loading="lazy"`}><div class="audience-content"><span class="audience-role mono">${String(i+1).padStart(2,'0')} / ${String(audienceTotal).padStart(2,'0')} &nbsp;—&nbsp; ${role.toUpperCase()}</span><h2>${title.split('\n').join('<br>')}</h2><p>${copy}</p></div></article>`).join('');
audienceTabs.innerHTML=audiences.map(([role],i)=>`<button type="button" role="tab" id="audience-tab-${i}" data-audience="${i}" aria-selected="${i===0}" aria-controls="audience-slide-${i}" tabindex="${i===0?'0':'-1'}">${role}</button>`).join('');
function syncAudienceTabs(index){
  $$('[data-audience]',audienceTabs).forEach(tab=>{
    const active=Number(tab.dataset.audience)===index;
    tab.setAttribute('aria-selected',String(active));
    tab.tabIndex=active?0:-1;
  });
  $$('[data-audience-slide]',audienceTrack).forEach(slide=>{
    slide.setAttribute('aria-hidden',String(Number(slide.dataset.audienceSlide)!==index));
  });
  audienceFraction.textContent=`${String(index+1).padStart(2,'0')} / ${String(audienceTotal).padStart(2,'0')}`;
  $('.audience-progress i').style.transform=`scaleX(${(index+1)/audienceTotal})`;
  audiencePrevious.disabled=index===0;
  audienceNext.disabled=index===audienceTotal-1;
  const activeTab=$(`[data-audience="${index}"]`,audienceTabs);
  if(activeTab){const tabBox=activeTab.getBoundingClientRect(),railBox=audienceTabs.getBoundingClientRect();audienceTabs.scrollTo({left:audienceTabs.scrollLeft+tabBox.left-railBox.left-(audienceTabs.clientWidth-tabBox.width)/2,behavior:reduced.matches?'instant':'smooth'});}
  audienceIndex=index;
}
function audienceSlideWidth(){return audienceStage.clientWidth||1;}
function setAudience(next,{instant=false}={}){
  const index=Math.max(0,Math.min(audienceTotal-1,next));
  if(audienceScrollTrigger&&innerWidth>760){
    const target=audienceScrollTrigger.start+(audienceScrollTrigger.end-audienceScrollTrigger.start)*(index/(audienceTotal-1));
    audienceScrollTween?.kill();
    const position={y:window.scrollY};
    audienceScrollTween=gsap.to(position,{
      y:target,
      duration:instant||reduced.matches?0:.9,
      ease:'power3.inOut',
      overwrite:true,
      onUpdate:()=>window.scrollTo({top:position.y,behavior:'instant'}),
      onComplete:()=>{audienceScrollTween=null;}
    });
  }else{
    audienceStage.scrollTo({left:index*audienceSlideWidth(),behavior:instant||reduced.matches?'instant':'smooth'});
  }
  syncAudienceTabs(index);
}
function readAudienceIndex(){return Math.max(0,Math.min(audienceTotal-1,Math.round(audienceStage.scrollLeft/audienceSlideWidth())));}
audienceStage.addEventListener('scroll',()=>{
  if(innerWidth>760)return;
  const index=readAudienceIndex();
  if(index!==audienceIndex)syncAudienceTabs(index);
},{passive:true});
$$('[data-audience]',audienceTabs).forEach(tab=>tab.addEventListener('click',()=>setAudience(Number(tab.dataset.audience))));
audienceTabs.addEventListener('keydown',e=>{
  const tabs=$$('[data-audience]',audienceTabs);
  const current=tabs.findIndex(tab=>Number(tab.dataset.audience)===audienceIndex);
  if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();const next=Math.min(current+1,tabs.length-1);tabs[next].focus();setAudience(next);}
  else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();const next=Math.max(current-1,0);tabs[next].focus();setAudience(next);}
  else if(e.key==='Home'){e.preventDefault();tabs[0].focus();setAudience(0);}
  else if(e.key==='End'){e.preventDefault();tabs.at(-1).focus();setAudience(tabs.length-1);}
});
audienceStage.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'){e.preventDefault();setAudience(audienceIndex+1);}
  else if(e.key==='ArrowLeft'){e.preventDefault();setAudience(audienceIndex-1);}
});
audiencePrevious.addEventListener('click',()=>setAudience(audienceIndex-1));
audienceNext.addEventListener('click',()=>setAudience(audienceIndex+1));
new ResizeObserver(()=>{if(innerWidth<=760)setAudience(audienceIndex,{instant:true});}).observe(audienceStage);
setAudience(0,{instant:true});

const steps=[["Your archive at a glance.", "See connected drives, indexing progress and the state of your media library.", "Dashboard"], ["Inside every drive.", "Inspect a drive’s identity, media counts, files and keyframe gallery.", "Drive Details"], ["Search what you remember.", "Explore text and image search, filters, result thumbnails and timecodes.", "Smart Search"], ["Explore by scene.", "Browse indexed footage by scene and visual context.", "Scenes"], ["The people in your stories.", "Explore the people index and the appearances associated with each person.", "People"], ["Review every match.", "Compare a detected face with its reference profile, then confirm, reject or skip.", "Pending Reviews"], ["Make it yours.", "Explore indexing preferences, connection settings, appearance and language controls.", "Settings"], ["Help when you need it.", "Open the app’s Help panel to explore guidance and language options.", "Help"], ["Welcome to FrameFinder.", "Explore the sign-in screen. This preview uses demonstration authentication.", "Sign In"]];
let step=0;
let guidedScrolling=true;
let demoScrollTrigger;
let stepScrollTween;
window.addEventListener('message',event=>{if(event.origin===location.origin&&event.source===$('#app-demo').contentWindow&&event.data?.type==='framefinder-exploring')guidedScrolling=false;if(event.origin===location.origin&&event.source===$('#app-demo').contentWindow&&event.data?.type==='framefinder-ready')setStep(step,{fromScroll:true});});
$('.demo-step-list').innerHTML=steps.map((s,i)=>`<button data-step="${i}" aria-label="Step ${i+1}: ${s[0]}"><span>${String(i+1).padStart(2,'0')}</span><span class="step-label">${s[2]}</span></button>`).join('');
function setStep(next,{fromScroll=false}={}){guidedScrolling=true;const changed=next!==step;step=Math.max(0,Math.min(8,next));$('#step-count').textContent=`STEP ${String(step+1).padStart(2,'0')} / 09`;$('#step-fraction').textContent=`${String(step+1).padStart(2,'0')} / 09`;$('#step-title').textContent=steps[step][0];$('#step-description').textContent=steps[step][1];$$('[data-step]').forEach(b=>{if(Number(b.dataset.step)===step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});$('#prev-step').disabled=step===0;$('#next-step').disabled=step===8;$('#app-demo').contentWindow?.postMessage({type:'framefinder-step',step},location.origin);if(changed&&!reduced.matches)gsap.fromTo('#step-title,#step-description',{opacity:.3,y:12},{opacity:1,y:0,duration:.45,stagger:.035,overwrite:true,ease:'power2.out'});if(!fromScroll&&demoScrollTrigger){stepScrollTween?.kill();const position={y:window.scrollY};const target=demoScrollTrigger.start+(demoScrollTrigger.end-demoScrollTrigger.start)*((step+.35)/9);stepScrollTween=gsap.to(position,{y:target,duration:reduced.matches?0:.65,ease:'power2.inOut',onUpdate:()=>window.scrollTo({top:position.y,behavior:'instant'}),onComplete:()=>{stepScrollTween=null;}});}}
$$('[data-step]').forEach(b=>b.addEventListener('click',()=>setStep(Number(b.dataset.step))));$('#prev-step').addEventListener('click',()=>setStep(step-1));$('#next-step').addEventListener('click',()=>setStep(step+1));$('#app-demo').addEventListener('load',()=>{setStep(step,{fromScroll:true});resizeApp();});setStep(0);
function resizeApp(){const iframe=$('#app-demo'),host=iframe?.parentElement;if(!iframe||!host)return;const expanded=$('#demo-expanded').open;host.style.position='relative';if(expanded){iframe.style.position='absolute';iframe.style.inset='0';iframe.style.width='100%';iframe.style.height='100%';iframe.style.minWidth='980px';iframe.style.transform='none';iframe.style.zoom='1';host.style.overflow='auto';return;}const width=host.clientWidth,height=host.clientHeight;if(width<1||height<1)return;const virtual=Math.max(width,980),scale=width/virtual;iframe.style.zoom='1';iframe.style.minWidth='0';iframe.style.position='absolute';iframe.style.left='0';iframe.style.top='0';iframe.style.right='auto';iframe.style.bottom='auto';iframe.style.width=`${virtual}px`;iframe.style.height=`${Math.ceil(height/scale)}px`;iframe.style.transform=`scale(${scale})`;iframe.style.transformOrigin='top left';host.style.overflow='hidden';}
new ResizeObserver(resizeApp).observe($('.demo-window-wrap'));resizeApp();
const demoDialog=$('#demo-expanded'),appWindow=$('.demo-window'),normalHost=$('.demo-window-wrap');$('#expand-demo').addEventListener('click',()=>{$('#expanded-host').append(appWindow);demoDialog.showModal();document.body.classList.add('modal-open');resizeApp();});$('.modal-close',demoDialog).addEventListener('click',()=>demoDialog.close());demoDialog.addEventListener('close',()=>{normalHost.prepend(appWindow);document.body.classList.remove('modal-open');resizeApp();});

const application=$('#application');let opener;
$$('[data-apply]').forEach(b=>b.addEventListener('click',()=>{opener=b;application.showModal();if(!reduced.matches)gsap.fromTo(application,{opacity:0,y:22},{opacity:1,y:0,duration:.4,ease:'power3.out'});document.body.classList.add('modal-open');requestAnimationFrame(()=>{const input=$('input[name=name]',application);if(!$('.application-content').hidden)input.focus();else $('.modal-done').focus();});}));$$('.modal-close,.modal-done',application).forEach(b=>b.addEventListener('click',()=>application.close()));application.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});[application,demoDialog].forEach(d=>d.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const focusable=$$('button:not(:disabled),input:not([tabindex="-1"]),select,a[href],iframe',d).filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&(document.activeElement===first||!d.contains(document.activeElement))){e.preventDefault();last?.focus();}else if(!e.shiftKey&&(document.activeElement===last||!d.contains(document.activeElement))){e.preventDefault();first?.focus();}}));
[application,demoDialog].forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
const roleSelect = $('#application-form select[name="role"]');
const otherRoleInput = $('#application-form input[name="otherRole"]');
function syncOtherRole() {
  const other = roleSelect.value === 'Other';
  $('#other-role-field').hidden = !other;
  otherRoleInput.disabled = !other;
  otherRoleInput.required = other;
  otherRoleInput.setCustomValidity('');
}
roleSelect.addEventListener('change', () => { syncOtherRole(); if (roleSelect.value === 'Other') otherRoleInput.focus(); });
otherRoleInput.addEventListener('input', () => otherRoleInput.setCustomValidity(otherRoleInput.value.trim() ? '' : 'Please specify your role.'));
$('#application-form').addEventListener('reset', () => requestAnimationFrame(syncOtherRole));
syncOtherRole();
$('#application-form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,button=$('button[type=submit]',form);if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));$('#form-error').textContent='';button.disabled=true;button.textContent='Sending your application…';try{const response=await fetch('/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});const data=await response.json();if(!response.ok)throw new Error(data.error||'We could not save your application. Please try again.');$('.application-content').hidden=true;$('.application-success').hidden=false;if(!reduced.matches)gsap.fromTo('.application-success',{opacity:0,y:14},{opacity:1,y:0,duration:.6});$('.modal-done').focus();form.reset();}catch(error){$('#form-error').textContent=error.message==='Failed to fetch'?'Unable to connect. Please check your connection and try again.':error.message;}finally{button.disabled=false;button.innerHTML='Apply for access <span>↗</span>';}});

// Story position remains native, with GSAP only controlling transforms and opacity.
const mm=gsap.matchMedia();mm.add({desktop:'(min-width: 761px)',mobile:'(max-width: 760px)',motion:'(prefers-reduced-motion: no-preference)'},context=>{if(!context.conditions.motion)return;const desktop=context.conditions.desktop;
gsap.from('.opening-copy .eyebrow,.opening h1,.opening-sub,.story-link',{y:22,opacity:0,duration:1.1,stagger:.12,ease:'power3.out',clearProps:'opacity'});
const hero=gsap.timeline({scrollTrigger:{trigger:'.opening',start:'top top',end:'bottom top',scrub:1}});hero.to('.fragment',{x:(i)=>(i%2?-1:1)*(desktop?120:35),y:(i)=>(i%3-1)*90,rotation:(i)=>(i%2?-1:1)*15,opacity:.12,stagger:.015},0).to('.opening-copy',{y:desktop?-90:-40,opacity:0},.12);ScrollTrigger.create({trigger:'.opening',start:'top top',end:'bottom top',onUpdate:self=>{$('.hero-time').textContent=`00:00:${String(Math.floor(self.progress*42)).padStart(2,'0')}:${String(Math.floor(self.progress*24)).padStart(2,'0')}`;}});
if(desktop&&innerHeight>=700){
  const audienceTrackTween=gsap.to(audienceTrack,{
    xPercent:-(audienceTotal-1)*100,
    ease:'none',
    paused:true
  });
  audienceScrollTrigger=ScrollTrigger.create({
    trigger:audienceCarousel,
    start:'top 92px',
    end:()=>`+=${(audienceTotal-1)*innerHeight*.62}`,
    pin:true,
    animation:audienceTrackTween,
    scrub:1.15,
    anticipatePin:1,
    invalidateOnRefresh:true,
    snap:{
      snapTo:1/(audienceTotal-1),
      duration:{min:.35,max:.8},
      delay:.12,
      ease:'power3.inOut',
      inertia:false
    },
    onUpdate:self=>{
      const progress=self.progress;
      const next=Math.round(progress*(audienceTotal-1));
      if(next!==audienceIndex)syncAudienceTabs(next);
      $('.audience-scroll-cue').style.opacity=String(Math.max(0,1-progress*10));
    }
  });
}
if(desktop&&innerHeight>=750&&innerWidth>=1100){demoScrollTrigger=ScrollTrigger.create({trigger:'.demo-layout',start:'top 100px',end:'+=3600',pin:true,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{const next=Math.min(8,Math.floor(self.progress*9));if(guidedScrolling&&!stepScrollTween&&next!==step)setStep(next,{fromScroll:true});}});}
if(desktop){gsap.from('.folder,.chaos-drive,.lost-frame',{x:(i)=>(i%2?90:-90),y:80,rotation:(i)=>(i%2?15:-15),stagger:.08,scrollTrigger:{trigger:'.archive-chaos',start:'top 85%',end:'bottom 55%',scrub:1}});gsap.from('.semantic-dimensions>div',{y:30,opacity:.15,stagger:.15,scrollTrigger:{trigger:'.semantic-stage',start:'top 80%',end:'center 55%',scrub:1}});}
gsap.from('.reveal-symbol',{scale:.6,opacity:0,scrollTrigger:{trigger:'.product-intro',start:'top 75%',end:'top 25%',scrub:1}});gsap.to('.intro-filmstrip',{x:desktop?-560:-140,ease:'none',scrollTrigger:{trigger:'.product-intro',start:'top bottom',end:'bottom top',scrub:1}});
$$('.feature-copy,.search-heading,.people-heading,.why-heading,.demo-heading').forEach(el=>gsap.from(el,{y:desktop?40:18,opacity:.35,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
gsap.fromTo('.scan-plane',{x:-130},{x:130,duration:2.8,repeat:-1,yoyo:true,ease:'none',scrollTrigger:{trigger:'.index-visual',start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});gsap.from('.index-meter i',{scaleX:0,transformOrigin:'left',scrollTrigger:{trigger:'.index-visual',start:'top 75%',end:'bottom 45%',scrub:1}});
if(desktop){gsap.from('.topology-drive',{x:(i)=>(i-1)*90,y:45,opacity:.15,stagger:.1,scrollTrigger:{trigger:'.local-topology',start:'top 85%',end:'bottom 65%',scrub:1}});gsap.from('.label-details',{x:55,y:40,opacity:.2,scrollTrigger:{trigger:'.label-scene',start:'top 80%',end:'bottom 70%',scrub:1}});}
const closing=$('.closing');$$('.closing-frames img').forEach(img=>gsap.fromTo(img,{opacity:1,filter:'brightness(1) saturate(1)'},{x:()=>closing.clientWidth/2-img.offsetLeft-img.clientWidth/2,y:()=>$('.closing-symbol').offsetTop-img.offsetTop,scale:.1,opacity:0,filter:'brightness(.2) saturate(.35)',scrollTrigger:{trigger:closing,start:'top 22%',end:'top -15%',scrub:1}}));
});
window.addEventListener('load',()=>ScrollTrigger.refresh());

const chaosPieces=$$('.archive-chaos .folder,.archive-chaos .chaos-drive,.archive-chaos .lost-frame');
const shelfDrives=$$('.shelf-drive');
const compactShelf=matchMedia('(max-width:760px)');

if(!reduced.matches){
  // These profiles give every drive its own resting depth, inertia and orbit.
  const shelfProfiles=[
    {x:0,y:0,z:10,rx:1.2,ry:-13,rz:-3.2,period:18.5,ax:2.2,ay:3.1,az:8,arx:.22,ary:.34,arz:.18,phase:.3},
    {x:0,y:0,z:42,rx:0,ry:-6,rz:0,period:21,ax:1.4,ay:2.5,az:11,arx:.16,ary:.22,arz:.12,phase:2.1},
    {x:0,y:1,z:18,rx:-.8,ry:-11,rz:-1.7,period:19.7,ax:1.9,ay:2.8,az:9,arx:.2,ary:.3,arz:.16,phase:4.4},
    {x:0,y:2,z:5,rx:1.1,ry:-15,rz:-2.4,period:22.5,ax:2.4,ay:3.2,az:7,arx:.24,ary:.36,arz:.2,phase:5.7},
  ];
  const frontPose={x:0,y:-12,z:58,rx:0,ry:-4,rz:0};
  const flatPose={x:0,y:0,z:0,rx:0,ry:0,rz:0};
  const shelfState=shelfDrives.map((el,index)=>{
    const profile=shelfProfiles[index];
    const base=compactShelf.matches?{...flatPose}:el.classList.contains('selected')?{...frontPose}:{...profile};
    return {
      el,profile,base,
      phase:profile.phase,
      speed:1,targetSpeed:1,
      energy:1,targetEnergy:1,
      force:{x:0,y:0,z:0,rx:0,ry:0,rz:0},
      targetForce:{x:0,y:0,z:0,rx:0,ry:0,rz:0},
    };
  });

  shelfState.forEach(item=>{
    const aim=event=>{
      if(compactShelf.matches)return;
      const box=item.el.getBoundingClientRect();
      const nx=((event.clientX-box.left)/Math.max(box.width,1))*2-1;
      const ny=((event.clientY-box.top)/Math.max(box.height,1))*2-1;
      const front=item.el.classList.contains('selected');
      item.targetSpeed=front?1.18:1.24;
      item.targetEnergy=front?1.3:1.42;
      item.targetForce={
        x:nx*(front?3.5:5),
        y:3+ny*2,
        z:front?18:12,
        rx:-ny*(front?.9:1.25),
        ry:nx*(front?1.15:1.8),
        rz:nx*(front?.28:.48),
      };
    };
    const release=()=>{
      item.targetSpeed=1;
      item.targetEnergy=1;
      item.targetForce={x:0,y:0,z:0,rx:0,ry:0,rz:0};
    };
    item.el.addEventListener('pointerenter',aim);
    item.el.addEventListener('pointermove',aim);
    item.el.addEventListener('pointerleave',release);
    item.el.addEventListener('blur',release);
  });

  // Keep the archive fragments softly suspended too, without touching their
  // authored rotate/position transforms.
  const chaosState=chaosPieces.map((el,index)=>({
    el,phase:index*1.17+.4,period:18+(index%4)*2.1,
  }));
  chaosPieces.forEach(el=>{if(!el.hasAttribute('tabindex'))el.tabIndex=0;});

  const setVar=(el,name,value,unit)=>el.style.setProperty(name,`${value.toFixed(3)}${unit}`);
  const approach=(current,target,dt,tau)=>current+(target-current)*(1-Math.exp(-dt/tau));
  let lastFloat=performance.now();
  const stepFloat=now=>{
    const dt=Math.min(.04,(now-lastFloat)/1000);
    lastFloat=now;
    const flat=compactShelf.matches;

    shelfState.forEach(item=>{
      const selected=item.el.classList.contains('selected');
      const targetBase=flat?flatPose:selected?frontPose:item.profile;
      const baseBlend=1-Math.exp(-dt/1.25);
      ['x','y','z','rx','ry','rz'].forEach(key=>{
        item.base[key]+=(targetBase[key]-item.base[key])*baseBlend;
        item.force[key]=approach(item.force[key],flat?0:item.targetForce[key],dt,1.05);
      });
      item.speed=approach(item.speed,flat?1:item.targetSpeed,dt,1.8);
      item.energy=approach(item.energy,flat?0:item.targetEnergy,dt,1.8);
      item.phase+=dt*item.speed*(Math.PI*2)/item.profile.period;

      const p=item.phase;
      const energy=item.energy;
      setVar(item.el,'--base-x',item.base.x,'px');
      setVar(item.el,'--base-y',item.base.y,'px');
      setVar(item.el,'--base-z',item.base.z,'px');
      setVar(item.el,'--base-rx',item.base.rx,'deg');
      setVar(item.el,'--base-ry',item.base.ry,'deg');
      setVar(item.el,'--base-rz',item.base.rz,'deg');
      setVar(item.el,'--motion-x',Math.sin(p*.73+.6)*item.profile.ax*energy+item.force.x,'px');
      setVar(item.el,'--motion-y',Math.sin(p)*item.profile.ay*energy+item.force.y,'px');
      setVar(item.el,'--motion-z',Math.cos(p*.61+.2)*item.profile.az*energy+item.force.z,'px');
      setVar(item.el,'--motion-rx',Math.sin(p*.47)*item.profile.arx*energy+item.force.rx,'deg');
      setVar(item.el,'--motion-ry',Math.cos(p*.39+.8)*item.profile.ary*energy+item.force.ry,'deg');
      setVar(item.el,'--motion-rz',Math.sin(p*.31+1.7)*item.profile.arz*energy+item.force.rz,'deg');
    });

    chaosState.forEach(item=>{
      item.phase+=dt*(Math.PI*2)/item.period;
      item.el.style.translate=`${(Math.sin(item.phase*.67)*1.3).toFixed(3)}px ${(Math.sin(item.phase)*2.6).toFixed(3)}px ${(Math.cos(item.phase*.53)*5).toFixed(3)}px`;
    });
    requestAnimationFrame(stepFloat);
  };
  requestAnimationFrame(stepFloat);
}

if(matchMedia('(hover: hover)').matches){$$('.apply-button').forEach(button=>{button.addEventListener('pointermove',event=>{if(reduced.matches)return;const box=button.getBoundingClientRect();gsap.to(button,{x:(event.clientX-box.left-box.width/2)*.035,y:(event.clientY-box.top-box.height/2)*.08,duration:.3});});button.addEventListener('pointerleave',()=>gsap.to(button,{x:0,y:0,duration:.35}));});}
