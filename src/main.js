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
$('.intro-filmstrip').innerHTML=[...clipNames,...clipNames].map(n=>`<img src="/assets/${n}.jpg" alt="" loading="lazy">`).join('');

// The semantic interaction illustrates dimensions, rather than claiming a live AI service.
$('#semantic-form').addEventListener('submit',e=>{e.preventDefault();const query=$('input',e.currentTarget).value.trim();const concepts=[['PERSON',/ahmed/i.test(query)?'Ahmed':/sarah/i.test(query)?'Sarah':'Anyone'],['ACTION',/talk|interview/i.test(query)?'Talking':/walk/i.test(query)?'Walking':'Any action'],['PLACE',/sea|coast|beach/i.test(query)?'Sea':/city|cairo/i.test(query)?'City':'Any place'],['LIGHT',/sunset|golden/i.test(query)?'Sunset':/night/i.test(query)?'Night':'Any light']];$('.semantic-dimensions').innerHTML=concepts.map(([type,value])=>`<div><small>${type}</small><span>${value}</span></div>`).join('');$('#semantic-caption').textContent='Concept preview: example keyword dimensions, not a live archive search.';if(!reduced.matches)gsap.fromTo('.semantic-dimensions>div',{y:16,opacity:.3},{y:0,opacity:1,stagger:.09,duration:.55});});

const queries={coast:[['coast','ATLAS_08TB','A0142.R3D','00:18:42:11'],['dunes','NOVA_12TB','COAST_B_0831.MOV','01:04:19:08'],['mountain','FIELD_07','DRONE_0042.MOV','00:07:11:02']],city:[['city','NOVA_12TB','CITY_EXT_008.BRAW','00:28:41:03'],['night','ARCHIVE_12','NIGHT_WIDE_019.MOV','00:09:33:07'],['city','ATLAS_08TB','ROOFTOP_002.MXF','00:02:15:21']],person:[['omar','ATLAS_08TB','INTERVIEW_A_042.MOV','00:13:08:21'],['omar','FIELD_07','BTS_DAY_06.MXF','00:08:52:02'],['omar','NOVA_12TB','PRESENTER_B_009.MOV','00:22:11:16']]};
function renderResults(key){$('.search-results').innerHTML=queries[key].map(([image,drive,file,time],i)=>`<article class="result"><div class="result-image"><img src="/assets/${image}.jpg" alt="${key==='person'?'Example presenter portrait':key==='city'?'Example city or night footage':'Example landscape footage'}" loading="lazy"><span>${time}</span></div><div><span>${file}</span><span>0${i+1} / CATALOGUE</span></div><code>${drive} / INDEXED THUMBNAIL</code></article>`).join('');if(!reduced.matches)gsap.fromTo('.result',{opacity:.25,y:12},{opacity:1,y:0,stagger:.07,duration:.45});}
renderResults('coast');$$('[data-query]').forEach(b=>b.addEventListener('click',()=>{$$('[data-query]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderResults(b.dataset.query);}));

const drives={atlas:['ATLAS_08TB','/PROJECT_X/DAY_04/A0142.R3D'],nova:['NOVA_12TB','/COASTAL_STORIES/B_CAM/COAST_B_0831.MOV'],field:['FIELD_07','/FIELD_UNIT/DAY_02/DRONE_0042.MOV'],archive:['ARCHIVE_12','/DOCUMENTARY/2021/A0142_BACKUP.R3D']};
let selectedDrive='atlas',connected=false;
function updateDrive(){const [name,path]=drives[selectedDrive];$('#found-drive').textContent=name;$('#found-path').textContent=path;$$('[data-drive]').forEach(b=>{const chosen=b.dataset.drive===selectedDrive;b.classList.toggle('selected',chosen);b.classList.toggle('connected',chosen&&connected);b.setAttribute('aria-pressed',String(chosen));$('small',b).textContent=chosen&&connected?'CONNECTED':'DISCONNECTED';});$('.retrieval-panel .eyebrow').textContent=connected?'Demonstration / Source drive reconnected':'Catalogue match / Original disconnected';$('#reconnect').innerHTML=connected?'Reset demonstration <span>↺</span>':'Reconnection <span>↗</span>';$('#source-rule').textContent=connected?`Reconnection simulated. In the desktop app, you can now open or retrieve the original from ${name}. No hardware or source file is accessed in this demonstration.`:`The indexed thumbnail is available. Reconnect ${name} to open, preview at source quality, export or retrieve the original.`;}
$$('[data-drive]').forEach(b=>b.addEventListener('click',()=>{selectedDrive=b.dataset.drive;connected=false;updateDrive();}));$('#reconnect').addEventListener('click',()=>{connected=!connected;updateDrive();});updateDrive();
QRCode.toCanvas($('#qr'),`${location.origin}/#drive-label`,{width:150,margin:1,color:{dark:'#0a0b0c',light:'#efefed'}}).catch(()=>{$('#label-button').textContent='Example label unavailable';});$('.label-details').id='drive-label';
$('#label-button').addEventListener('click',()=>{$('#label-button').innerHTML='Example label generated <span>✓</span>';if(!reduced.matches){gsap.fromTo('.qr-label',{x:95,y:65,rotation:9,opacity:0},{x:0,y:0,rotation:0,opacity:1,duration:1,ease:'power3.out'});gsap.fromTo('.label-details',{opacity:.2,y:15},{opacity:1,y:0,duration:.6,delay:.5});}});
$('#scan-label').addEventListener('click',()=>{$('#scan-label').innerHTML='✓ &nbsp; ATLAS identified';$('.phone').classList.add('scanned');if(!reduced.matches)gsap.fromTo('.phone dl',{opacity:.2,y:12},{opacity:1,y:0,duration:.65});});
$$('[data-person]').forEach(b=>b.addEventListener('click',()=>{$$('[data-person]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#person-note').textContent=`Find the moments with ${b.dataset.person}.`;}));
const audiences=[['Directors','For the\nstory finders.','Directors finding the take, reference or archived moment that makes the next story work.','camera'],['Editors','For the\nperfect cut.','Find the exact shot without manually scrubbing hours of source footage.','city'],['Assistant editors','For the\narchive keepers.','Bring order to fragmented projects, camera cards, folders and removable drives.','forest'],['Production companies','For years\nof possibility.','Discover reusable footage across years of projects and shelves of physical storage.','camera'],['Post-production','For the\nnext delivery.','Locate media across large local archive systems and reconnect the original source.','night'],['Newsrooms','For the\nfull story.','Find historical interviews, events, people and B-roll in the catalogue.','city'],['Documentary filmmakers','For the\nlong story.','Return to years of interviews and observational footage with a clear route to the source.','mountain'],['Media teams','For your\nshared memory.','Discover the local video assets your team already has before starting again.','forest'],['Content creators','For the\nnext creation.','Rediscover reusable footage across personal projects and commercial archives.','coast'],['Photographers / Videographers','For every\npoint of view.','Explore visual archives across multiple drives, projects and years.','dunes']];
$('.audience-tabs').innerHTML=audiences.map((a,i)=>`<button data-audience="${i}" aria-pressed="${i===0}">${a[0]}</button>`).join('');
$$('[data-audience]').forEach(b=>b.addEventListener('click',()=>{const index=Number(b.dataset.audience),[role,title,copy,image]=audiences[index];$('#audience-title').replaceChildren(...title.split('\n').flatMap((s,i)=>i?[document.createElement('br'),document.createTextNode(s)]:[document.createTextNode(s)]));$('#audience-copy').textContent=copy;$('#audience-number').textContent=`${String(index+1).padStart(2,'0')} / 10`;$('#audience-image').src=`/assets/${image}.jpg`;$('#audience-image').alt=`Illustrative footage for ${role.toLowerCase()}`;$$('[data-audience]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(!reduced.matches)gsap.fromTo('.audience-content',{y:15,opacity:.3},{y:0,opacity:1,duration:.5});}));

const steps=[['Connect a drive.','Start with footage exactly where it is. Connect your local or removable storage.','Connect'],['Let it introduce itself.','FrameFinder identifies the connected drive and brings its status into your catalogue.','Identify'],['Build the catalogue.','Index media into searchable keyframes and metadata. Progress shown here is demonstration data.','Index'],['Give it an identity.','Review the drive’s contents and details. Organize the physical archive with a name and label.','Organize'],['Search naturally.','Try “sunset” in the real search interface, or explore the example metadata. This frontend uses a fixed sample catalogue.','Search'],['Review the moments.','Browse the indexed results and inspect their filenames, thumbnails and timecodes.','Review'],['Locate the original.','The result connects a moment to a specific drive, path and timecode. A catalogue thumbnail is not the original.','Locate'],['Reconnect the source.','Simulate reconnecting Cold Storage 2024. Original access stays blocked while that source is disconnected.','Reconnect'],['Return to your work.','Once the right drive is connected, the desktop workflow can open or retrieve the source. This demo never accesses real media.','Retrieve']];
let step=0;
$('.demo-step-list').innerHTML=steps.map((s,i)=>`<button data-step="${i}" aria-label="Step ${i+1}: ${s[0]}"><span>${String(i+1).padStart(2,'0')}</span><span class="step-label">${s[2]}</span></button>`).join('');
function setStep(next){step=Math.max(0,Math.min(8,next));$('#step-count').textContent=`STEP ${String(step+1).padStart(2,'0')} / 09`;$('#step-fraction').textContent=`${String(step+1).padStart(2,'0')} / 09`;$('#step-title').textContent=steps[step][0];$('#step-description').textContent=steps[step][1];$$('[data-step]').forEach(b=>{if(Number(b.dataset.step)===step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});$('#prev-step').disabled=step===0;$('#next-step').disabled=step===8;$('#app-demo').contentWindow?.postMessage({type:'framefinder-step',step},location.origin);if(innerWidth<=760)$('.demo-window')?.scrollTo({left:step>=6?440:20,behavior:'instant'});}
$$('[data-step]').forEach(b=>b.addEventListener('click',()=>setStep(Number(b.dataset.step))));$('#prev-step').addEventListener('click',()=>setStep(step-1));$('#next-step').addEventListener('click',()=>setStep(step+1));$('#app-demo').addEventListener('load',()=>{setStep(step);resizeApp();});setStep(0);
function resizeApp(){const iframe=$('#app-demo'),host=iframe.parentElement,expanded=$('#demo-expanded').open;if(expanded){iframe.style.width='100%';iframe.style.height='100%';iframe.style.transform='none';iframe.style.minWidth='980px';iframe.style.zoom='1';return;}const width=host.clientWidth,mobile=innerWidth<=760,virtual=Math.max(width,980),scale=mobile?.78:width/virtual;iframe.style.minWidth='0';iframe.style.width=`${virtual}px`;iframe.style.height=`${host.clientHeight/scale}px`;iframe.style.zoom=mobile?String(scale):'1';iframe.style.transform=mobile?'none':`scale(${scale})`;iframe.style.transformOrigin='top left';host.style.overflow=mobile?'auto':'hidden';}
new ResizeObserver(resizeApp).observe($('.demo-window-wrap'));resizeApp();
const demoDialog=$('#demo-expanded'),appWindow=$('.demo-window'),normalHost=$('.demo-window-wrap');$('#expand-demo').addEventListener('click',()=>{$('#expanded-host').append(appWindow);demoDialog.showModal();document.body.classList.add('modal-open');resizeApp();});$('.modal-close',demoDialog).addEventListener('click',()=>demoDialog.close());demoDialog.addEventListener('close',()=>{normalHost.prepend(appWindow);document.body.classList.remove('modal-open');resizeApp();});

const application=$('#application');let opener;
$$('[data-apply]').forEach(b=>b.addEventListener('click',()=>{opener=b;application.showModal();if(!reduced.matches)gsap.fromTo(application,{opacity:0,y:22},{opacity:1,y:0,duration:.4,ease:'power3.out'});document.body.classList.add('modal-open');requestAnimationFrame(()=>{const input=$('input[name=name]',application);if(!$('.application-content').hidden)input.focus();else $('.modal-done').focus();});}));$$('.modal-close,.modal-done',application).forEach(b=>b.addEventListener('click',()=>application.close()));application.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});[application,demoDialog].forEach(d=>d.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const focusable=$$('button:not(:disabled),input:not([tabindex="-1"]),select,a[href],iframe',d).filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&(document.activeElement===first||!d.contains(document.activeElement))){e.preventDefault();last?.focus();}else if(!e.shiftKey&&(document.activeElement===last||!d.contains(document.activeElement))){e.preventDefault();first?.focus();}}));
[application,demoDialog].forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
$('#application-form').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,button=$('button[type=submit]',form);if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));$('#form-error').textContent='';button.disabled=true;button.textContent='Sending your application…';try{const response=await fetch('/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});const data=await response.json();if(!response.ok)throw new Error(data.error||'We could not save your application. Please try again.');$('.application-content').hidden=true;$('.application-success').hidden=false;if(!reduced.matches)gsap.fromTo('.application-success',{opacity:0,y:14},{opacity:1,y:0,duration:.6});$('.modal-done').focus();form.reset();}catch(error){$('#form-error').textContent=error.message==='Failed to fetch'?'Unable to connect. Please check your connection and try again.':error.message;}finally{button.disabled=false;button.innerHTML='Apply for access <span>↗</span>';}});

// Story position remains native, with GSAP only controlling transforms and opacity.
const mm=gsap.matchMedia();mm.add({desktop:'(min-width: 761px)',mobile:'(max-width: 760px)',motion:'(prefers-reduced-motion: no-preference)'},context=>{if(!context.conditions.motion)return;const desktop=context.conditions.desktop;
gsap.from('.opening-copy .eyebrow,.opening h1,.opening-sub,.story-link',{y:22,opacity:0,duration:1.1,stagger:.12,ease:'power3.out',clearProps:'opacity'});
const hero=gsap.timeline({scrollTrigger:{trigger:'.opening',start:'top top',end:'bottom top',scrub:1}});hero.to('.fragment',{x:(i)=>(i%2?-1:1)*(desktop?120:35),y:(i)=>(i%3-1)*90,rotation:(i)=>(i%2?-1:1)*15,opacity:.12,stagger:.015},0).to('.opening-copy',{y:desktop?-90:-40,opacity:0},.12);ScrollTrigger.create({trigger:'.opening',start:'top top',end:'bottom top',onUpdate:self=>{$('.hero-time').textContent=`00:00:${String(Math.floor(self.progress*42)).padStart(2,'0')}:${String(Math.floor(self.progress*24)).padStart(2,'0')}`;}});
if(desktop&&innerHeight>=750&&innerWidth>=1100){ScrollTrigger.create({trigger:'.demo-layout',start:'top 90px',end:'+=2200',pin:true,anticipatePin:1,onUpdate:self=>{const next=Math.min(8,Math.floor(self.progress*9));if(next!==step)setStep(next);}});}
if(desktop){gsap.from('.folder,.chaos-drive,.lost-frame',{x:(i)=>(i%2?90:-90),y:80,rotation:(i)=>(i%2?15:-15),stagger:.08,scrollTrigger:{trigger:'.archive-chaos',start:'top 85%',end:'bottom 55%',scrub:1}});gsap.from('.semantic-dimensions>div',{y:30,opacity:.15,stagger:.15,scrollTrigger:{trigger:'.semantic-stage',start:'top 80%',end:'center 55%',scrub:1}});}
gsap.from('.reveal-symbol',{scale:.6,opacity:0,scrollTrigger:{trigger:'.product-intro',start:'top 75%',end:'top 25%',scrub:1}});gsap.to('.intro-filmstrip',{x:desktop?-420:-160,ease:'none',scrollTrigger:{trigger:'.product-intro',start:'top bottom',end:'bottom top',scrub:1}});
$$('.feature-copy,.search-heading,.people-heading,.why-heading,.demo-heading').forEach(el=>gsap.from(el,{y:desktop?40:18,opacity:.35,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
gsap.fromTo('.scan-plane',{x:-130},{x:130,duration:2.8,repeat:-1,yoyo:true,ease:'none',scrollTrigger:{trigger:'.index-visual',start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});gsap.from('.index-meter i',{scaleX:0,transformOrigin:'left',scrollTrigger:{trigger:'.index-visual',start:'top 75%',end:'bottom 45%',scrub:1}});
if(desktop){gsap.from('.topology-drive',{x:(i)=>(i-1)*90,y:45,opacity:.15,stagger:.1,scrollTrigger:{trigger:'.local-topology',start:'top 85%',end:'bottom 65%',scrub:1}});gsap.from('.label-details',{x:55,y:40,opacity:.2,scrollTrigger:{trigger:'.label-scene',start:'top 80%',end:'bottom 70%',scrub:1}});}
const closing=$('.closing');$$('.closing-frames img').forEach(img=>gsap.to(img,{x:()=>closing.clientWidth/2-img.offsetLeft-img.clientWidth/2,y:()=>$('.closing-symbol').offsetTop-img.offsetTop,scale:.1,opacity:0,scrollTrigger:{trigger:closing,start:'top 70%',end:'top 5%',scrub:1}}));
});
window.addEventListener('load',()=>ScrollTrigger.refresh());

const chaosPieces=$$('.archive-chaos .folder,.archive-chaos .chaos-drive,.archive-chaos .lost-frame');
const shelfDrives=$$('.shelf-drive');

if(!reduced.matches){
  // These profiles give every drive its own resting depth, inertia and orbit.
  const shelfProfiles=[
    {x:0,y:0,z:10,rx:1.2,ry:-13,rz:-3.2,period:18.5,ax:2.2,ay:3.1,az:8,arx:.22,ary:.34,arz:.18,phase:.3},
    {x:0,y:0,z:42,rx:0,ry:-6,rz:0,period:21,ax:1.4,ay:2.5,az:11,arx:.16,ary:.22,arz:.12,phase:2.1},
    {x:0,y:1,z:18,rx:-.8,ry:-11,rz:-1.7,period:19.7,ax:1.9,ay:2.8,az:9,arx:.2,ary:.3,arz:.16,phase:4.4},
    {x:0,y:2,z:5,rx:1.1,ry:-15,rz:-2.4,period:22.5,ax:2.4,ay:3.2,az:7,arx:.24,ary:.36,arz:.2,phase:5.7},
  ];
  const frontPose={x:0,y:-12,z:58,rx:0,ry:-4,rz:0};
  const shelfState=shelfDrives.map((el,index)=>{
    const profile=shelfProfiles[index];
    const base=el.classList.contains('selected')?{...frontPose}:{...profile};
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

    shelfState.forEach(item=>{
      const selected=item.el.classList.contains('selected');
      const targetBase=selected?frontPose:item.profile;
      const baseBlend=1-Math.exp(-dt/1.25);
      ['x','y','z','rx','ry','rz'].forEach(key=>{
        item.base[key]+=(targetBase[key]-item.base[key])*baseBlend;
        item.force[key]=approach(item.force[key],item.targetForce[key],dt,1.05);
      });
      item.speed=approach(item.speed,item.targetSpeed,dt,1.8);
      item.energy=approach(item.energy,item.targetEnergy,dt,1.8);
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
