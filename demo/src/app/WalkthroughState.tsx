import { useEffect, useState } from 'react'
const stages = [
 ['Connect a drive', 'Choose a local or removable drive to add its media to your catalogue.'],
 ['Drive identified', 'Archive North · /Volumes/ARCHIVE_NORTH · FF-A7C2-91D4'],
 ['Indexing media', 'Field Unit 03 · 68% indexed · 9,271 keyframes · Sample progress'],
 ['Organize your drive', 'Review Archive North’s files, catalogue details and QR-label action.'],
 ['Search naturally', 'Try “sunset” in Smart Search to explore the sample catalogue.'],
 ['Review your results', 'Compare thumbnails, filenames, relevance and timecodes before choosing a moment.'],
 ['Original located', 'Cold Storage 2024 · /Volumes/COLD_2024/DRONE/MOUNTAIN_DRONE_103.r3d'],
 ['Reconnect the source', 'The catalogue is available. Reconnect Cold Storage 2024 to access its original media.'],
 ['Return to your work', 'Source connection simulated. You can now demonstrate the original-file handoff.'],
]
export function WalkthroughState({ step }: { step: number }) {
 const [connected, setConnected] = useState(step === 8)
 const [opened, setOpened] = useState(false)
 useEffect(() => { setConnected(step === 8); setOpened(false) }, [step])
 return <section className="walkthrough-state" aria-label="Guided workflow state" aria-live="polite" data-guide-step={step}>
  {step >= 6 && <img src="/assets/snow.jpg" alt="Indexed mountain footage thumbnail" />}
  <div className="walkthrough-state-copy"><span>GUIDED DEMONSTRATION · {String(step + 1).padStart(2, '0')} / 09</span><strong>{opened ? 'Source handoff demonstrated' : stages[step][0]}</strong><p>{opened ? 'No file was opened. In the desktop app, this action retrieves the original from the connected drive.' : stages[step][1]}</p>{step >= 6 && <code>00:00:19:22 · {connected ? 'SOURCE CONNECTED · SIMULATED' : 'ORIGINAL DISCONNECTED'}</code>}{step === 2 && <div className="walkthrough-index"><i /></div>}</div>
  {step >= 6 && <div className="walkthrough-actions"><button onClick={() => { setConnected(!connected); setOpened(false) }}>{connected ? 'Disconnect demo drive' : 'Simulate reconnection'}</button><button disabled={!connected} onClick={() => setOpened(true)}>Open original ↗</button></div>}
 </section>
}
