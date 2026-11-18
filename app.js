/* Amelia Tomescu — portfolio interactions + RO/EN content */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* contact: fill in the public email when ready; empty = button opens Instagram */
  const EMAIL = 'tomescuamelia@gmail.com';

  /* ---------- static strings ---------- */
  const T = {
    ro: {
      'nav.work': 'Proiecte', 'nav.ai': 'AI Lab', 'nav.ads': 'Reclame', 'nav.cases': 'Studii de caz', 'nav.contact': 'Contact',
      'hero.kicker': 'Content Creator · AI Content Creator',
      'hero.f1': 'Cărți & lifestyle · @ca.la.carte', 'hero.f2': 'UGC, reels, TikTok, carusele',
      'hero.f3': 'Scripturi, montaj și design asistate de AI', 'hero.f4': 'Română & engleză',
      'hero.cta1': 'Vezi proiectele', 'hero.cta2': 'Hai să lucrăm împreună', 'hero.badge': 'disponibilă<br>pentru<br>colaborări',
      'vid.title': 'Exemple video', 'vid.lede': 'Reels și TikTok-uri create, filmate și montate de mine. Atinge un clip ca să pornești sunetul.', 'vid.hint': '← trage sau derulează →',
      'ai.lede': 'Folosesc AI ca pe o echipă de producție: idee, script, montaj, design și analiză. Mai jos, unelte reale din munca mea.',
      'ai.before': 'Înainte', 'ai.after': 'După · decupare AI',
      'ai.ba.t': 'Decupare cu AI, folosită în reels',
      'ai.ba.p': 'Separ persoana de fundal cadru cu cadru, ca textul și elementele grafice să treacă <em>în spatele</em> meu. Același efect îl folosesc pe site-ul clubului și în reels-urile de recomandări.',
      'pipe.1': 'Idee & trend research', 'pipe.2': 'Script & hook-uri cu AI', 'pipe.3': 'Filmare', 'pipe.4': 'Montaj, subtitrări, decupare', 'pipe.5': 'Design & copertă', 'pipe.6': 'Programare & analiză',
      'ads.title': '7 reclame, 7 contexte', 'ads.lede': 'O serie creată pentru portofoliu: branduri diferite, formate diferite, unelte diferite. Fiecare arată un alt mod de a lucra.',
      'cases.title': 'Studii de caz', 'brands.title': 'Am colaborat cu',
      'contact.title': 'Hai să vorbim', 'contact.lede': 'Pentru colaborări, UGC, campanii pentru edituri sau un proiect cu AI, scrie-mi.',
      'contact.mail': 'Scrie-mi un email', 'contact.dm': 'Scrie-mi pe Instagram',
      sound: 'Pornește sunetul', mute: 'Oprește sunetul',
      st: { done: 'Gata', prod: 'În producție', soon: 'Colaborare · în curând' }, spec: 'spec ad',
      dl: { ctx: 'Context', did: 'Ce am făcut', tools: 'Unelte', out: 'Rezultat' },
      ctaT: 'Reclama #8', ctaP: 'poate fi pentru brandul tău.', ctaB: 'Hai să vorbim',
      marquee: ['UGC', 'Reels & TikTok', 'Scripturi cu AI', 'Montaj', 'Carusele', 'Campanii pentru edituri', 'Branduri', 'Română & engleză'],
    },
    en: {
      'nav.work': 'Work', 'nav.ai': 'AI Lab', 'nav.ads': 'Ads', 'nav.cases': 'Case studies', 'nav.contact': 'Contact',
      'hero.kicker': 'Content Creator · AI Content Creator',
      'hero.f1': 'Books & lifestyle · @ca.la.carte', 'hero.f2': 'UGC, Reels, TikTok, carousels',
      'hero.f3': 'AI-assisted scripting, editing and design', 'hero.f4': 'Romanian & English',
      'hero.cta1': 'See my work', 'hero.cta2': "Let's work together", 'hero.badge': 'open<br>for<br>collabs',
      'vid.title': 'Video examples', 'vid.lede': 'Reels and TikToks I concept, film and edit myself. Tap a clip to turn the sound on.', 'vid.hint': '← drag or scroll →',
      'ai.lede': 'I use AI like a production team: idea, script, edit, design and analytics. Below are the real tools behind my work.',
      'ai.before': 'Before', 'ai.after': 'After · AI cut-out',
      'ai.ba.t': 'AI cut-outs, used in my Reels',
      'ai.ba.p': 'I separate the person from the background frame by frame, so titles and graphics can sit <em>behind</em> me. The same effect powers my book club website and my recommendation Reels.',
      'pipe.1': 'Idea & trend research', 'pipe.2': 'AI-assisted script & hooks', 'pipe.3': 'Filming', 'pipe.4': 'Edit, captions, cut-outs', 'pipe.5': 'Design & cover', 'pipe.6': 'Scheduling & analytics',
      'ads.title': '7 ads, 7 contexts', 'ads.lede': 'A series made for this portfolio: different brands, formats and tools. Each one shows a different way of working.',
      'cases.title': 'Case studies', 'brands.title': "I've collaborated with",
      'contact.title': "Let's talk", 'contact.lede': 'For collaborations, UGC, publishing campaigns or an AI-driven project, get in touch.',
      'contact.mail': 'Send me an email', 'contact.dm': 'Message me on Instagram',
      sound: 'Turn sound on', mute: 'Turn sound off',
      st: { done: 'Ready', prod: 'In production', soon: 'Collab · coming soon' }, spec: 'spec ad',
      dl: { ctx: 'Context', did: 'What I did', tools: 'Tools', out: 'Outcome' },
      ctaT: 'Ad #8', ctaP: 'could be for your brand.', ctaB: "Let's talk",
      marquee: ['UGC', 'Reels & TikTok', 'AI scripting', 'Video editing', 'Carousels', 'Publishing campaigns', 'Brands', 'Romanian & English'],
    },
  };

  /* ---------- content ---------- */
  const VIDEOS = [
    { id: 'video-cv', ro: ['Video CV', 'Povestea mea, de la marketing la content creator'], en: ['Video CV', 'My story, from marketing to content creator'] },
    { id: 'arbusto', ro: ['Arbusto Coffee', 'Reclamă cinematică'], en: ['Arbusto Coffee', 'Cinematic ad'] },
    { id: 'minti', ro: ['Recenzie', 'Vorbit la cameră, text în spate'], en: ['Book review', 'Talking head, text behind me'] },
    { id: 'trend-coperti', ro: ['Trend', 'Coperți pe beat'], en: ['Trend', 'Covers on the beat'] },
    { id: 'fiori', ro: ['Recomandări', 'Thriller cu hook puternic'], en: ['Recommendations', 'Thriller with a strong hook'] },
    { id: 'november', ro: ['Lifestyle', 'Atmosferă de sezon'], en: ['Lifestyle', 'Seasonal mood'] },
  ];

  const TOOLS = [
    { n: 'Claude', ai: 1, ro: 'Scripturi, hook-uri, traduceri RO/EN, idei de serii și texte pentru postări.', en: 'Scripts, hooks, RO/EN translation, series ideas and post copy.' },
    { n: 'Claude Code', ai: 1, ro: 'Site-urile mele construite și publicate, decupare AI, subtitrări și montaje automatizate.', en: 'My websites built and shipped, AI cut-outs, captions and automated video edits.' },
    { n: 'Decupare AI', en_n: 'AI cut-out', ai: 1, ro: 'Persoana separată de fundal, pentru text în spatele meu și pop-out-uri.', en: 'Subject separated from the background for text-behind and pop-out effects.' },
    { n: 'Subtitrări AI', en_n: 'AI captions', ai: 1, ro: 'Transcriere automată din voce, corectată și stilizată pe brand.', en: 'Automatic speech-to-text captions, proofread and styled on-brand.' },
    { n: 'Canva AI', ai: 1, ro: 'Carusele, coperți, imagini și fundaluri generate.', en: 'Carousels, covers, generated images and backgrounds.' },
    { n: 'CapCut', ro: 'Montaj, tranziții, sound design, color matching, export 1080p.', en: 'Editing, transitions, sound design, colour matching, 1080p export.' },
    { n: 'Metricool', ro: 'Programare, ore optime de postare și rapoarte de performanță.', en: 'Scheduling, best posting times and performance reports.' },
    { n: 'Vercel + Supabase', ro: 'Site-uri publicate, cu formulare de înscriere și panou de admin.', en: 'Live websites with sign-up forms and an admin panel.' },
  ];

  const g = (a, b, c) => `linear-gradient(160deg,${a},${b} 55%,${c})`;
  const ADS = [
    { no: 1, st: 'prod', g: g('#f6b8c6', '#c2183a', '#4d0d1b'), brand: 'Nemira',
      ro: ['Editură', 'Cartea care iese din ecran: pop-out cu text în spatele meu'], en: ['Publisher', 'The book that jumps out of the screen: pop-out with text behind me'],
      tools: ['Decupare AI|AI cut-out', 'Claude', 'CapCut'] },
    { no: 2, st: 'prod', g: g('#f7e2c8', '#c98a5e', '#5a2a1a'), brand: 'Cărturești',
      ro: ['Librărie', 'O seară la book club, vlog scurt cu ritm'], en: ['Bookstore', 'An evening at book club, a short paced vlog'],
      tools: ['Subtitrări AI|AI captions', 'CapCut', 'Color grading'] },
    { no: 3, st: 'done', g: g('#e9cfb4', '#8a5a3c', '#2e1a10'), brand: 'Arbusto Coffee', video: 'arbusto',
      ro: ['Cafenea', 'Reclamă cinematică, slow-motion, doar muzică'], en: ['Café', 'Cinematic slow-motion ad, music only'],
      tools: ['CapCut', 'Sound design', 'Speed ramp'] },
    { no: 4, st: 'prod', spec: 1, g: g('#fde7ef', '#f0a6bd', '#b4486a'), brand: 'Beauty',
      ro: ['Skincare', 'UGC clasic: „3 motive pentru care…”, vorbit la cameră'], en: ['Skincare', 'Classic UGC: “3 reasons why…”, talking to camera'],
      tools: ['Hook-uri cu Claude|Claude hooks', 'Subtitrări AI|AI captions', 'CapCut'] },
    { no: 5, st: 'prod', spec: 1, g: g('#e4e6ff', '#8f93e8', '#2f2a6e'), brand: 'App',
      ro: ['Aplicație', 'Ecran + creator: cum îmi organizez lectura'], en: ['App / tech', 'Screen + creator: how I organise my reading'],
      tools: ['Screen recording', 'Voice-over', 'Text cinetic|Kinetic type', 'Canva'] },
    { no: 6, st: 'prod', spec: 1, g: g('#f3e9e1', '#b9a08c', '#3a2a22'), brand: 'Fashion',
      ro: ['Modă & accesorii', 'Lookbook cu tranziții pe beat'], en: ['Fashion & accessories', 'Lookbook with on-beat transitions'],
      tools: ['Fundaluri AI|AI backgrounds', 'Decupare AI|AI cut-out', 'CapCut'] },
    { no: 7, st: 'soon', g: g('#ffe9f0', '#f39ab2', '#9c1f45'), brand: 'Cofetărie · Patisserie',
      ro: ['Cofetărie', 'De la vitrină la prima linguriță: macro, slow-motion, ASMR'], en: ['Patisserie', 'From the display case to the first spoonful: macro, slow-mo, ASMR'],
      tools: ['Script cu Claude|Claude script', 'Sunet ASMR|ASMR sound', 'Canva AI'] },
  ];

  const CASES = [
    { media: { type: 'shot', src: 'media/case-club.jpg' }, link: 'https://calacarteclub.com',
      ro: { t: 'Ca la Carte Book Club', ctx: 'Un club de carte lunar la Cărturești Râmnicu Vâlcea, pornit de la comunitatea @ca.la.carte.', did: 'Identitate vizuală, conținut lunar, evenimente cu autori și un site cu înscrieri, arhivă, recenzii și panou de admin, construit cu Claude Code.', out: 'O comunitate care se întâlnește în fiecare lună și un site pe care îl administrez singură.' },
      en: { t: 'Ca la Carte Book Club', ctx: 'A monthly book club at Cărturești bookstore, grown from the @ca.la.carte community.', did: 'Visual identity, monthly content, author events and a website with sign-ups, archive, reviews and an admin panel, built with Claude Code.', out: 'A community that meets every month, and a website I run on my own.' },
      tools: ['Claude', 'Claude Code', 'Canva', 'Vercel', 'Supabase'] },
    { media: { type: 'video', id: 'arbusto' },
      ro: { t: 'Arbusto Coffee', ctx: 'O cafenea care voia un clip cald, fără voce, care să transmită atmosfera locului.', did: 'Filmare, selecție de cadre lungi în slow-motion, ritm pe muzică și o corecție de culoare caldă.', out: 'Un reel cinematic de 25 de secunde, gata de postat.' },
      en: { t: 'Arbusto Coffee', ctx: 'A café that wanted a warm, voice-free clip capturing the feel of the place.', did: 'Filming, long slow-motion shots, music-led pacing and a warm colour grade.', out: 'A 25-second cinematic Reel, ready to post.' },
      tools: ['CapCut', 'Color grading', 'Sound design'] },
    { media: { type: 'video', id: 'minti' },
      ro: { t: 'Recomandări cu text în spatele meu', ctx: 'Reels de recomandări de carte care trebuie să oprească scroll-ul în prima secundă.', did: 'Script cu hook, filmare la cameră, decupare AI ca titlul să stea în spatele meu, subtitrări automate stilizate și coperțile animate.', out: 'Un format recognoscibil pe care îl pot adapta pentru orice editură.' },
      en: { t: 'Recommendations with text behind me', ctx: 'Book recommendation Reels that have to stop the scroll in the first second.', did: 'Hook-first script, talking-head filming, AI cut-out so the title sits behind me, styled auto-captions and animated covers.', out: 'A recognisable format I can adapt for any publisher.' },
      tools: ['Claude', 'Decupare AI|AI cut-out', 'Subtitrări AI|AI captions', 'CapCut'] },
  ];

  /* ---------- language ---------- */
  let lang = 'ro';
  try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('lang') || (navigator.language || '').slice(0, 2); } catch (e) { }
  if (!T[lang]) lang = 'ro';
  const tr = s => { const [ro, en] = String(s).split('|'); return lang === 'en' && en ? en : ro; };

  function applyLang(l) {
    lang = l; const t = T[l];
    document.documentElement.lang = l;
    try { localStorage.setItem('lang', l); } catch (e) { }
    $$('[data-i18n]').forEach(el => { if (t[el.dataset.i18n]) el.textContent = t[el.dataset.i18n]; });
    $$('[data-i18n-html]').forEach(el => { if (t[el.dataset.i18nHtml]) el.innerHTML = t[el.dataset.i18nHtml]; });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
    $('#mailBtn span').textContent = EMAIL ? t['contact.mail'] : t['contact.dm'];
    $('#mq').innerHTML = [...t.marquee, ...t.marquee].map(x => `<span>${esc(x)}</span>`).join('');
    $$('h1.script .write, h2.script, .ad h3').forEach(twoTone);
    renderVideos(); renderTools(); renderAds(); renderCases(); watch();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  const mail = $('#mailBtn');
  if (EMAIL) mail.href = 'mailto:' + EMAIL; else { mail.href = 'https://ig.me/m/ca.la.carte'; mail.target = '_blank'; mail.rel = 'noopener noreferrer'; }

  /* headline in two voices: italic serif + heavy sans (like the font-combo reference) */
  function twoTone(el) {
    const w = el.textContent.trim().split(/\s+/); if (w.length < 2) return;
    const n = w[0].length < 3 && w.length > 2 ? 2 : 1;
    el.innerHTML = `<span class="w1">${esc(w.slice(0, n).join(' '))}</span> <span class="w2">${esc(w.slice(n).join(' '))}</span>`;
  }

  /* ---------- renderers ---------- */
  const vid = (id, cls = '') => `<video class="${cls}" data-src="media/${id}.mp4" poster="media/${id}.jpg" muted loop playsinline autoplay preload="none"></video>`;
  // Videos are loaded as in-memory blobs: some phones (iPhone/Safari) can't stream mp4 from the artifact frame directly.
  const blobs = {};
  function mediaURL(u) {
    if (!blobs[u]) blobs[u] = fetch(u).then(r => { if (!r.ok) throw 0; return r.blob(); })
      .then(b => URL.createObjectURL(new Blob([b], { type: 'video/mp4' }))).catch(() => u);
    return blobs[u];
  }
  function ensureSrc(v) {
    if (v.getAttribute('src') || !v.dataset.src) return Promise.resolve();
    return mediaURL(v.dataset.src).then(u => { if (!v.getAttribute('src')) { v.src = u; v.load(); } });
  }

  function renderVideos() {
    $('#vrail').innerHTML = VIDEOS.map(v => {
      const [k, t] = v[lang];
      const note = v.id === 'video-cv' ? `<span class="cv-note" aria-hidden="true"><em>${lang === 'en' ? 'who I am' : 'cine sunt eu'}</em><svg viewBox="0 0 28 34"><path d="M26 4 C 14 4, 7 12, 7 30"/><path d="M3 25 L7 31 L11 25"/></svg></span>` : '';
      return `<figure class="clip${note ? ' has-note' : ''}">${note}<div class="phone">${vid(v.id)}<button type="button" class="sound" aria-label="${esc(T[lang].sound)}">🔇</button></div>
        <figcaption><small>${esc(k)}</small><b>${esc(t)}</b></figcaption></figure>`;
    }).join('');
    $$('#vrail .clip').forEach(c => { autoplay(c.querySelector('video')); });
  }

  function renderTools() {
    $('#tools').innerHTML = TOOLS.map(x => `<article class="tool"><header><h4>${esc(lang === 'en' && x.en_n ? x.en_n : x.n)}</h4>${x.ai ? '<span class="tag ai">AI</span>' : '<span class="tag">Pro</span>'}</header><p>${esc(x[lang])}</p></article>`).join('');
  }

  function renderAds() {
    const t = T[lang];
    $('#adsGrid').innerHTML = ADS.map(a => {
      const [cat, fmt] = a[lang];
      return `<article class="ad" style="--g:${a.g}">${a.video ? vid(a.video) + '<span class="shade"></span>' : ''}
        <div class="ad-top"><span class="ad-no">${String(a.no).padStart(2, '0')}</span><span class="status ${a.st === 'done' ? 'done' : ''}">${esc(t.st[a.st])}${a.spec ? ' · ' + t.spec : ''}</span></div>
        <div><span class="brand">${esc(a.brand)}</span><h3>${esc(cat)}</h3><p class="fmt">${esc(fmt)}</p>
        <div class="chips">${a.tools.map(x => `<span>${esc(tr(x))}</span>`).join('')}</div></div></article>`;
    }).join('') + `<a class="ad cta" href="#contact"><h3>${esc(t.ctaT)}</h3><p>${esc(t.ctaP)}</p><span class="btn">${esc(t.ctaB)} <i>→</i></span></a>`;
    $$('#adsGrid video').forEach(autoplay);
    tiltAll();
  }

  function renderCases() {
    const d = T[lang].dl;
    $('#caseList').innerHTML = CASES.map((c, i) => {
      const x = c[lang];
      const media = c.media.type === 'video'
        ? `<div class="case-media"><div class="phone">${vid(c.media.id)}<button type="button" class="sound" aria-label="${esc(T[lang].sound)}">🔇</button></div></div>`
        : `<div class="case-media wide"><img class="shot" src="${c.media.src}" alt="${esc(x.t)}" loading="lazy"></div>`;
      return `<article class="case reveal">${media}<div><span class="case-no">${String(i + 1).padStart(2, '0')}</span><h3>${esc(x.t)}</h3>
        <dl><dt>${d.ctx}</dt><dd>${esc(x.ctx)}</dd><dt>${d.did}</dt><dd>${esc(x.did)}</dd><dt>${d.out}</dt><dd>${esc(x.out)}</dd>
        <dt>${d.tools}</dt><dd><div class="chips">${c.tools.map(y => `<span>${esc(tr(y))}</span>`).join('')}</div></dd></dl>
        ${c.link ? `<a class="case-link" href="${c.link}" target="_blank" rel="noopener noreferrer">${esc(c.link.replace('https://', ''))} ↗</a>` : ''}</div></article>`;
    }).join('');
    $$('#caseList video').forEach(autoplay);
  }

  /* ---------- video: play only while visible; tap the speaker for sound ---------- */
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) { ensureSrc(v).then(() => { if (!reduce && v.dataset.vis === '1') v.play().catch(() => { }); }); v.dataset.vis = '1'; }
    else { v.dataset.vis = '0'; v.pause(); }
  }), { threshold: 0.35 });
  function autoplay(v) { if (v) vio.observe(v); }
  document.addEventListener('click', e => {
    const b = e.target.closest('.sound'); if (!b) return;
    const v = b.parentElement.querySelector('video'), on = v.muted;
    $$('video').forEach(o => { o.muted = true; }); $$('.sound').forEach(s => { s.textContent = '🔇'; s.setAttribute('aria-label', T[lang].sound); });
    if (on) { v.muted = false; ensureSrc(v).then(() => v.play().catch(() => { })); b.textContent = '🔊'; b.setAttribute('aria-label', T[lang].mute); }
  });

  /* ---------- drag-to-scroll rail ---------- */
  const rail = $('#vrail'); let down = null;
  rail.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.target.closest('.sound')) return; down = { x: e.clientX, s: rail.scrollLeft, moved: false }; });
  addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - down.x; if (Math.abs(dx) > 4) { down.moved = true; rail.classList.add('dragging'); } rail.scrollLeft = down.s - dx; });
  let wasDrag = false;
  addEventListener('pointerup', () => { wasDrag = !!(down && down.moved); down = null; rail.classList.remove('dragging'); });

  /* ---------- tap a phone: it grows big right where it is (no jump), with sound ---------- */
  // positioned in page coordinates, so it also works when the page is shown in an auto-height frame
  const dim = document.createElement('div'); dim.className = 'vdim'; dim.hidden = true;
  const box = document.createElement('div'); box.className = 'vzoom'; box.hidden = true;
  box.innerHTML = '<video controls playsinline></video><button type="button" class="vbox-x" aria-label="Close">×</button>';
  document.body.append(dim, box);
  const bv = box.querySelector('video');
  let from = null;
  const place = r => Object.assign(box.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' });
  function openBox(ph) {
    const v = ph.querySelector('video'); if (!v) return;
    $$('video').forEach(o => { if (o !== bv) o.muted = true; }); $$('.sound').forEach(s => { s.textContent = '🔇'; });
    const r = ph.getBoundingClientRect(), sx = scrollX, sy = scrollY;
    from = { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height };
    const maxH = Math.min(640, (screen.availHeight || 800) * .62, innerHeight * .8);
    let h = Math.min(maxH, r.height * 1.55), w = h * 9 / 16;
    const docW = document.documentElement.clientWidth;
    if (w > docW - 24) { w = docW - 24; h = w * 16 / 9; }
    const cx = from.x + from.w / 2, cy = from.y + from.h / 2;
    const to = { x: sx + (docW - w) / 2, y: Math.max(cy - h / 2, 12), w, h };   // centred across the screen, at the phone's height
    dim.style.height = document.documentElement.scrollHeight + 'px';
    bv.poster = v.getAttribute('poster') || ''; bv.muted = false;
    mediaURL(v.dataset.src || v.getAttribute('src')).then(u => { bv.src = u; bv.currentTime = 0; bv.play().catch(() => { }); });
    box.querySelector('.vbox-x').setAttribute('aria-label', lang === 'en' ? 'Close' : 'Închide');
    dim.hidden = box.hidden = false; box.classList.remove('on'); dim.classList.remove('on'); place(from);
    requestAnimationFrame(() => requestAnimationFrame(() => { box.classList.add('on'); dim.classList.add('on'); place(to); }));
  }
  function closeBox() {
    if (box.hidden) return;
    bv.pause(); box.classList.remove('on'); dim.classList.remove('on'); if (from) place(from);
    setTimeout(() => { box.hidden = dim.hidden = true; bv.removeAttribute('src'); bv.load(); }, 380);
  }
  document.addEventListener('click', e => {
    if (e.target.closest('.sound') || box.contains(e.target)) return;
    const ph = e.target.closest('.phone'); if (!ph || wasDrag) { wasDrag = false; return; }
    openBox(ph);
  });
  box.querySelector('.vbox-x').addEventListener('click', closeBox);
  dim.addEventListener('click', closeBox);
  addEventListener('keydown', e => { if (e.key === 'Escape') closeBox(); });

  /* ---------- before / after ---------- */
  const ba = $('#ba'), range = $('#baRange');
  const setX = v => ba.style.setProperty('--x', v + '%');
  range.addEventListener('input', () => setX(range.value));
  new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting || reduce) return; o.disconnect();
    const t0 = performance.now();
    (function sweep(t) {
      const p = Math.min(1, (t - t0) / 2600), v = 50 + Math.sin(p * Math.PI * 2) * 38 * (1 - p);
      setX(v); range.value = v; if (p < 1) requestAnimationFrame(sweep);
    })(t0);
  }), { threshold: 0.5 }).observe(ba);

  /* ---------- hero: photo steps out of the arch, depth on pointer move ---------- */
  const art = $('.hero-art');
  if (art && !reduce && matchMedia('(hover: hover)').matches) {
    const arch = $('.arch', art), me = $('.pop img', art), inner = $('.arch img', art);
    art.addEventListener('pointermove', e => {
      const r = art.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      arch.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
      me.style.transform = inner.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
    });
    art.addEventListener('pointerleave', () => { arch.style.transform = me.style.transform = inner.style.transform = ''; });
  }

  /* ---------- charms hooked onto an edge ---------- */
  const HOOK_X = .418, HOOK_Y = .024; // where the clasp rests, as a share of the image box
  function hang(sel, anchor, hy = HOOK_Y) {
    const imgs = $$(sel); if (!imgs.length) return;
    const p = anchor(); if (!p) return;
    imgs.forEach(im => {
      const w = im.offsetWidth, h = w * 840 / 582;
      im.style.left = (p.x - w * HOOK_X) + 'px';
      im.style.top = (p.y - h * hy) + 'px';
      im.classList.add('hung');
    });
  }
  function hangAll() {
    hang('.c1', () => { const l = $('.lang'); return l && { x: l.offsetLeft + l.offsetWidth * .72, y: l.offsetTop + l.offsetHeight - .5 }; }, .05);
    hang('.c3', () => { const m = $('.mail-line'); return m && { x: m.offsetLeft + m.offsetWidth - 10, y: m.offsetTop + m.offsetHeight - .5 }; }, .05);
  }
  hangAll();
  addEventListener('resize', hangAll);
  addEventListener('load', hangAll);
  if (document.fonts) document.fonts.ready.then(hangAll);

  /* ---------- 3D tilt + glare on ad cards ---------- */
  function tiltAll() {
    if (reduce || !matchMedia('(hover: hover)').matches) return;
    $$('.ad').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `rotateY(${(x - .5) * 14}deg) rotateX(${(.5 - y) * 10}deg) translateZ(10px)`;
        card.style.setProperty('--mx', x * 100 + '%'); card.style.setProperty('--my', y * 100 + '%');
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- scroll: nav, progress, pipeline, active link ---------- */
  const nav = $('.nav'), bar = $('.progress'), pipe = $('#pipe'), steps = $$('#pipe li');
  const secs = $$('main section[id]'), links = $$('.links a');
  function onScroll() {
    nav.classList.toggle('scrolled', scrollY > 30);
    const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    const r = pipe.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .8 - r.top) / (innerHeight * .5)));
    pipe.style.setProperty('--p', p); steps.forEach((s, i) => s.classList.toggle('on', p >= (i + .5) / steps.length));
    let cur = ''; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    links.forEach(a => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + cur));
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const t = e.target; t.classList.add('in'); io.unobserve(t); setTimeout(() => { t.style.transitionDelay = ''; }, 1400); } }), { threshold: .12, rootMargin: '0px 0px -30px' });
  function watch() {
    $$('.head, .ba-wrap, .brands h2, .logos, .contact h2, .contact p, .contact-cta').forEach(el => el.classList.add('reveal'));
    $$('.reveal:not(.in), .clip:not(.in), .tool:not(.in), .ad:not(.in)').forEach((el, i) => {
      if (el.matches('.clip, .tool, .ad')) el.style.transitionDelay = (i % 8) * 70 + 'ms';
      io.observe(el);
    });
  }

  applyLang(lang); onScroll();
})();
