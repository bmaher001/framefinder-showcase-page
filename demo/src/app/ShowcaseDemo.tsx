import { useEffect, useState } from 'react'
import { AppShell } from './AppShell'
import { createScreenRegistry } from './screenRegistry'
import type { Screen } from '../types'

const stepScreens: Screen[] = ['dashboard','dashboard','dashboard','drive','search','search','search','search','search']
export default function ShowcaseDemo() {
 const [step,setStep] = useState(0)
 const [screen,setScreen] = useState<Screen>('dashboard')
 const [connected,setConnected] = useState(false)
 const [retrieved,setRetrieved] = useState(false)
 useEffect(()=>{
  document.documentElement.classList.add('dark')
  const receive=(e:MessageEvent)=>{if(e.origin!==location.origin||e.source!==window.parent||e.data?.type!=='framefinder-step')return;const next=Math.max(0,Math.min(8,Number(e.data.step)||0));setStep(next);setScreen(stepScreens[next]);setConnected(next===8);setRetrieved(false)}
  window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive)
 },[])
 const registry=createScreenRegistry({language:'en',onLanguage:()=>{},onNavigate:setScreen,onTheme:()=>{},theme:'dark'})
 return <><AppShell activeScreen={screen} onNavigate={setScreen} onHelp={()=>setScreen('dashboard')} onLogout={()=>setScreen('dashboard')}>{registry[screen]}</AppShell>
 {step<4&&<div className="showcase-status"><span className="showcase-dot"/>{['DEMO / Connect a source drive to begin','DRIVE IDENTIFIED / Archive North · FF-A7C2-91D4','INDEXING / Field Unit 03 · 68% · Example progress','DRIVE IDENTITY / Archive North · Catalogue details'][step]}</div>}
 {step>=6&&<div className="showcase-source" role="region" aria-label="Demonstration source retrieval"><div className="showcase-source-top"><b>{retrieved?'SOURCE HANDOFF SIMULATED':connected?'SOURCE CONNECTED · DEMO':'ORIGINAL DISCONNECTED'}</b><span>CATALOGUE THUMBNAIL AVAILABLE</span></div><h2>Cold Storage 2024</h2><code>/Volumes/COLD_2024/DRONE/MOUNTAIN_DRONE_103.r3d</code><p>00:00:19:22 <span>· Indexed moment</span></p><div className="showcase-source-actions"><button onClick={()=>{setConnected(v=>!v);setRetrieved(false)}}>{connected?'Disconnect demo drive':'Simulate reconnection'}</button><button disabled={!connected} onClick={()=>setRetrieved(true)}>Open original ↗</button></div><small>{retrieved?'In the desktop workflow, this hands the connected original back to your work. No file has been opened here.':connected?'Reconnection is simulated. No hardware is accessed.':'Reconnect the correct physical drive before opening or exporting the original.'}</small></div>}
 <div className="showcase-demo-label">FRONTEND DEMONSTRATION · SAMPLE CATALOGUE</div></>
}
