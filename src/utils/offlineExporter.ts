import { KARNATAKA_FACTS, LAST_VERIFIED_DATE, MYTHS_FACTS, QUALIFYING_DATES } from '../data/constants';

export function downloadStandaloneOfflineHtml(): void {
  const htmlContent = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Matadaan Mitra – Offline Karnataka Civic Pocket Guide</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; line-height: 1.5; }
  header { background: #0f172a; color: #fff; padding: 16px 24px; }
  main { max-width: 960px; margin: 24px auto; padding: 0 16px; }
  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 16px; }
  h1 { margin: 0; font-size: 20px; }
  h2 { font-size: 17px; margin-top: 0; }
  .banner { background: #fef3c7; border: 1px solid #f59e0b; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
  button { background: #1d4ed8; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 600; }
</style>
</head>
<body>
<header>
  <h1>Matadaan Mitra – Offline Karnataka Election Pocket Guide</h1>
</header>
<main>
  <div class="banner">Educational simulation – fictional reference – verify current schedules on eci.gov.in (Last verified: ${LAST_VERIFIED_DATE}).</div>
  <div class="card">
    <h2>Karnataka Key Facts (Verify on eci.gov.in)</h2>
    <p>Assembly Seats: ${KARNATAKA_FACTS.assemblySeats} · Lok Sabha Seats: ${KARNATAKA_FACTS.lokSabhaSeats} · Assembly Majority Mark: ${KARNATAKA_FACTS.assemblyMajorityMark}</p>
    <p>Four Qualifying Dates: ${QUALIFYING_DATES.map((q) => q.date).join(', ')} (17+ advance applications supported).</p>
  </div>
  <div class="card">
    <h2>Key Forms & Helplines</h2>
    <ul>
      <li><strong>Form 6:</strong> New voter registration</li>
      <li><strong>Form 8:</strong> Shifting residence / corrections / replacement EPIC</li>
      <li><strong>Form 7:</strong> Objections / deletion</li>
      <li><strong>Form 6A:</strong> Overseas (NRI) voter registration</li>
      <li><strong>Helpline:</strong> 1950 · voters.eci.gov.in · cVIGIL App · KYC App</li>
    </ul>
  </div>
  <div class="card">
    <h2>Quick Offline EVM Beep Test (Web Audio)</h2>
    <button onclick="try{var c=new (window.AudioContext||window.webkitAudioContext)();var o=c.createOscillator();o.frequency.value=2000;o.connect(c.destination);o.start();o.stop(c.currentTime+1.2);document.getElementById('beepMsg').textContent='BEEP (2000 Hz)';}catch(e){}">Test EVM Beep</button>
    <span id="beepMsg" style="margin-left:10px;font-weight:bold;"></span>
  </div>
  <div class="card">
    <h2>Myth vs Fact Quick Reference</h2>
    ${MYTHS_FACTS.slice(0, 6)
      .map((m) => `<p><strong>${m.myth.en}</strong><br/>${m.fact.en}</p>`)
      .join('')}
  </div>
</main>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'matadaan-mitra-offline.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
