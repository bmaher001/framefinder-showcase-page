import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const base=process.env.TEST_URL||'http://127.0.0.1:5182';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();const errors=[];
page.on('pageerror',error=>errors.push(error.message));
await mkdir('output',{recursive:true});
try{
 await page.goto(base,{waitUntil:'networkidle'});
 assert.deepEqual(await page.locator('section.chapter').evaluateAll(nodes=>nodes.map(n=>n.id)),['challenges','solution','framefinder','who','how-it-works','why','apply']);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.locator('[data-query="city"]').click();assert.match(await page.locator('.search-results').innerText(),/CITY_EXT_008/);
 await page.locator('[data-drive="nova"]').click();assert.equal(await page.locator('#found-drive').innerText(),'NOVA_12TB');
 assert.match(await page.locator('#source-rule').innerText(),/Reconnect/);
 await page.locator('#reconnect').click();assert.match(await page.locator('#source-rule').innerText(),/Reconnection simulated/);
 await page.locator('#reconnect').click();assert.match(await page.locator('#source-rule').innerText(),/Reconnect/);
 await page.locator('#label-button').click();await page.locator('#scan-label').click();assert.match(await page.locator('#scan-label').innerText(),/ATLAS identified/);
 await page.locator('[data-audience="6"]').click();assert.match(await page.locator('#audience-copy').innerText(),/observational footage/);
 await page.locator('[data-step="6"]').click();const frame=page.frameLocator('#app-demo');await frame.locator('.showcase-source').waitFor();assert.equal(await frame.getByRole('button',{name:'Open original'}).isDisabled(),true);
 await frame.getByRole('button',{name:'Simulate reconnection'}).click();assert.equal(await frame.getByRole('button',{name:'Open original'}).isEnabled(),true);
 await frame.getByRole('button',{name:'Open original'}).click();assert.match(await frame.locator('.showcase-source').innerText(),/No file has been opened/);
 await page.locator('#expand-demo').click();assert.equal(await page.locator('#demo-expanded').evaluate(d=>d.open),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#demo-expanded').evaluate(d=>d.open),false);
 await page.locator('.apply-button').click();await page.locator('input[name="name"]').fill('Showcase QA');await page.locator('input[name="email"]').fill('showcase-qa@example.invalid');await page.locator('select[name="role"]').selectOption('Director');
 for(let i=0;i<9;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.querySelector('#application').contains(document.activeElement)),true);}
 await page.route('**/api/applications',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Test service unavailable. Please retry.'})}));
 await page.locator('#application-form button[type="submit"]').click();await page.locator('#form-error').filter({hasText:'Test service unavailable'}).waitFor();assert.equal(await page.locator('.application-success').isVisible(),false);
 await page.unroute('**/api/applications');await page.locator('#application-form button[type="submit"]').click();await page.locator('.application-success').waitFor({state:'visible'});assert.match(await page.locator('.application-success').innerText(),/Application\s+received/);await page.screenshot({path:'output/form-confirmation.png'});await page.keyboard.press('Escape');
 const invalid=await page.request.post(base+'/api/applications',{data:{name:'X',email:'bad',role:''}});assert.equal(invalid.status(),400);
 const crossOrigin=await page.request.post(base+'/api/applications',{headers:{Origin:'https://unrelated.example'},data:{name:'Test User',email:'test@example.invalid',role:'Editor'}});assert.equal(crossOrigin.status(),403);
 for(const width of [390,768,1440]){await page.setViewportSize({width,height:900});await page.goto(base,{waitUntil:'networkidle'});for(const id of ['challenges','solution','framefinder','who','how-it-works','why','apply']){await page.locator('#'+id).scrollIntoViewIfNeeded();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Overflow ${width} ${id}`);}await page.locator('#how-it-works').scrollIntoViewIfNeeded();await page.screenshot({path:`output/demo-${width}.png`});}
 assert.deepEqual(errors,[]);console.log('PASS: section order; responsive overflow at 390/768/1440; search and audience states; QR interaction; disconnected source lock; reconnection and source simulation; modal Escape/focus containment; form error and persisted success; server validation and origin rejection.');
 await context.close();const motion=await browser.newContext({viewport:{width:1440,height:1000}});const motionPage=await motion.newPage();await motionPage.goto(base,{waitUntil:'networkidle'});await motionPage.screenshot({path:'output/final-desktop-hero.png'});await motionPage.locator('#how-it-works').scrollIntoViewIfNeeded();await motionPage.waitForTimeout(500);const initial=await motionPage.locator('#step-count').innerText();await motionPage.mouse.wheel(0,1300);await motionPage.waitForTimeout(600);const after=await motionPage.locator('#step-count').innerText();assert.notEqual(initial,after,'Scroll must advance the app walkthrough');await motionPage.screenshot({path:'output/final-pinned-demo.png'});console.log('PASS: desktop scroll advances real app demo states.');await motion.close();
}finally{await browser.close()}
