/*!
MIT License

Copyright (c) 2026 Past the Expiration Date contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/* Past the Expiration Date — scrollytelling app
   Fixed MapLibre map behind scroll steps; each step sets a map state.
   Bilingual (EN/PL) via window.COPY. Decade chart is inline SVG. */

const AGE = { lt25:'#35b0c9', b25:'#3d7fe0', b50:'#f0842e', b75:'#e5352b', unknown:'#6b7280' };
const PAST = '#d03b3b', NOTYET = '#2f7fd6';
const REF_YEAR = 2026, ALERT = 50;
const BRIEF_URL = 'https://www.clientearth.org/latest/documents/past-the-expiration-date-how-europe-extends-the-life-of-ageing-dams-without-environmental-assessments/';

let lang = (new URLSearchParams(location.search).get('lang') === 'pl') ? 'pl' : 'en';
const isEmbed = new URLSearchParams(location.search).get('embed') === '1';
let stats = null, countedOnce = false;

/* ---------------- i18n ---------------- */
function t(key) { return (window.COPY[lang] && window.COPY[lang][key]) || window.COPY.en[key] || ''; }

function applyI18n() {
  document.documentElement.lang = lang;
  const fill = (val) => stats ? val.replace('{dated}', stats.dated_dams.toLocaleString(lang === 'pl' ? 'pl-PL' : 'en-US'))
                                   .replace('{n}', '') : val;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = fill(t(el.dataset.i18n));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = fill(t(el.dataset.i18nHtml));
  });
  document.querySelectorAll('[data-methodology-link]').forEach(el => {
    el.href = `methodology.html?lang=${lang}`;
  });
  document.getElementById('link-brief').href = BRIEF_URL;
  if (isEmbed) {
    const storyUrl = new URL(location.href);
    storyUrl.searchParams.delete('embed');
    storyUrl.searchParams.set('lang', lang);
    document.getElementById('embed-story').href = storyUrl.href;
    document.getElementById('embed-mode').setAttribute('aria-label', t('embed_colours'));
    document.querySelectorAll('[data-methodology-link]').forEach(el => {
      el.target = '_blank';
      el.rel = 'noopener';
    });
  }
  buildCountryCards();
  buildTiles();
  renderDecadeChart();
}

/* ---------------- map ---------------- */
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  center: [12, 50], zoom: 3.4, minZoom: isEmbed ? 0 : 2.5, maxZoom: 12,
  attributionControl: false, preserveDrawingBuffer: true,
});
map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
if (isEmbed) {
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  // Preserve scrolling of the article containing the iframe.
  map.scrollZoom.disable();
  document.getElementById('embed-mode').addEventListener('change', e => paint(e.target.value));
  document.getElementById('embed-reset').addEventListener('click', fitEmbed);
}

function fitEmbed() {
  map.fitBounds([[-12, 34], [35, 71]], { padding: { top: 110, bottom: 35, left: 25, right: 45 }, duration: 0 });
}

function ageBucket(age) {
  if (age == null) return 'unknown';
  if (age < 25) return 'lt25';
  if (age < 50) return 'b25';
  if (age < 75) return 'b50';
  return 'b75';
}

const colorExpr = {
  age: ['match', ['get', 'bucket'],
    'lt25', AGE.lt25, 'b25', AGE.b25, 'b50', AGE.b50, 'b75', AGE.b75, AGE.unknown],
  decade: ['case',
    ['==', ['get', 'year'], null], AGE.unknown,
    ['<=', ['get', 'year'], REF_YEAR - ALERT], PAST, NOTYET],
  threshold: ['case', ['get', 'over10'], AGE.b75, AGE.unknown],
};

const LEGENDS = {
  age: () => ({ title: t('s3_eyebrow'), items: [
    ['< 25', AGE.lt25], ['25–50', AGE.b25], ['50–75', AGE.b50], ['75+', AGE.b75], ['—', AGE.unknown] ] }),
  decade: () => ({ title: t('s2_eyebrow'), items: [
    [t('chart_past'), PAST], [t('chart_notyet'), NOTYET] ] }),
  threshold: () => ({ title: t('threshold_legend'), items: [
    [t('threshold_yes'), AGE.b75], [t('threshold_unknown'), AGE.unknown] ] }),
};
let legendMode = 'age';
function renderLegend(mode) {
  legendMode = mode;
  const L = LEGENDS[mode]();
  document.getElementById('legend-title').textContent = L.title;
  document.getElementById('legend-items').innerHTML = L.items
    .map(([lab, c]) => `<div class="li"><span class="sw" style="background:${c}"></span>${lab}</div>`).join('');
}

/* ---------------- step → map state ---------------- */
const countryBounds = {}; // filled after data load
function setState(step, country) {
  const legend = document.getElementById('legend');
  const mapEl = document.getElementById('map');
  legend.classList.remove('hide');
  mapEl.classList.remove('dimmed');

  if (step === 'hero')      { paint('age'); filterCountry(null); flyEurope(); legend.classList.add('hide'); }
  else if (step === 'decade'){ paint('decade'); filterCountry(null); flyEurope(); }
  else if (step === 'alert') { paint('age'); filterCountry(null); flyEurope(); }
  else if (step === 'loophole'){ paint('threshold'); filterCountry(null); flyEurope(); }
  else if (step === 'country'){ paint('age'); filterCountry(country); flyCountry(country); }
  else if (step === 'payload'){ paint('age'); filterCountry(null); flyEurope(); mapEl.classList.add('dimmed'); legend.classList.add('hide'); }
  else if (step === 'whatnow'){ legend.classList.add('hide'); mapEl.classList.add('dimmed'); }
}
function paint(mode) { if (map.getLayer('dams')) { map.setPaintProperty('dams', 'circle-color', colorExpr[mode]); renderLegend(mode); } }
function filterCountry(c) { if (map.getLayer('dams')) map.setFilter('dams', c ? ['==', ['get', 'country'], c] : null); }
function flyEurope() { map.easeTo({ center: [12, 50], zoom: 3.4, duration: 1100 }); }
function flyCountry(c) { const b = countryBounds[c]; if (b) map.fitBounds(b, { padding: 70, maxZoom: 7.5, duration: 1100 }); }

/* ---------------- counter ---------------- */
function animateCounter(target) {
  const el = document.getElementById('count');
  const dur = 1700, t0 = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(e * target).toLocaleString('en-US');
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------------- country cards / tiles ---------------- */
function buildCountryCards() {
  const data = window.COUNTRIES[lang];
  ['Poland','Italy','Bulgaria','Romania'].forEach(c => {
    const el = document.getElementById('cc-' + c); if (!el || !data[c]) return;
    const d = data[c];
    const flag = { Poland:'🇵🇱', Italy:'🇮🇹', Bulgaria:'🇧🇬', Romania:'🇷🇴' }[c];
    el.innerHTML =
      `<p class="ccount">${flag} ${d.name || c} · <span data-nonloc>${idx(c)}/4</span></p>
       <div class="flag-row"><span class="cnum">${d.over}<small> ${d.of}</small></span></div>
       <p class="cnote">${d.note}</p>
       ${d.note2 ? `<p class="cnote">${d.note2}</p>` : ''}`;
  });
}
function idx(c){ return {Poland:1,Italy:2,Bulgaria:3,Romania:4}[c]; }

function buildTiles() {
  const wrap = document.getElementById('payload-tiles');
  wrap.innerHTML = window.TILES[lang].map(x =>
    `<div class="tile"><div class="v${x.red?' red':''}">${x.v}</div><div class="l">${x.l}</div></div>`).join('');
}

/* ---------------- decade chart (inline SVG) ---------------- */
function renderDecadeChart() {
  const svg = document.getElementById('decade-chart');
  if (!svg || !stats) return;
  const W = svg.clientWidth || 380, H = 150, padB = 20, padT = 8;
  const dec = stats.decade_all; // {decadeStr: count}
  const decades = Object.keys(dec).map(Number).filter(d => d >= 1900).sort((a,b)=>a-b);
  const max = Math.max(...decades.map(d => dec[d]));
  const n = decades.length, gap = 3;
  const bw = (W - (n - 1) * gap) / n;
  const cutoff = REF_YEAR - ALERT; // 1976 → decades <= 1970s are "past alert"
  let bars = '', labels = '';
  decades.forEach((d, i) => {
    const h = Math.max(2, (dec[d] / max) * (H - padB - padT));
    const x = i * (bw + gap), y = H - padB - h;
    const col = d <= (Math.floor(cutoff/10)*10) ? PAST : NOTYET;
    bars += `<rect class="bar" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${col}"><title>${d}s: ${dec[d]} dams</title></rect>`;
    if (d % 20 === 0) labels += `<text x="${(x+bw/2).toFixed(1)}" y="${H-6}" text-anchor="middle">${String(d).slice(2)}s</text>`;
  });
  // alert-line annotation between last past-alert bar and first not-yet bar
  const splitIdx = decades.findIndex(d => d > (Math.floor(cutoff/10)*10));
  let ann = '';
  if (splitIdx > 0) {
    const lx = splitIdx * (bw + gap) - gap/2;
    ann = `<line x1="${lx.toFixed(1)}" y1="${padT}" x2="${lx.toFixed(1)}" y2="${H-padB}" stroke="#c3c2b7" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>`;
  }
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = ann + bars + labels;
}

/* ---------------- boot ---------------- */
Promise.all([
  fetch('data/dams.json').then(r => r.json()),
  fetch('data/stats.json').then(r => r.json()),
]).then(([dams, s]) => {
  stats = s;
  document.getElementById('alert-num').textContent = s.past_alert_over10.toLocaleString();

  const fc = { type: 'FeatureCollection', features: dams.map(d => ({
    type: 'Feature', geometry: { type: 'Point', coordinates: [d.lon, d.lat] },
    properties: { id:d.id, name:d.name, river:d.river||'', country:d.country, year:d.year,
      age:d.age, height_m:d.height_m, cap_mcm:d.cap_mcm, over10:d.over10, use:d.use||'',
      bucket: ageBucket(d.age) },
  })) };

  // per-country bounds for fly-to
  fc.features.forEach(f => {
    const c = f.properties.country;
    (countryBounds[c] = countryBounds[c] || new maplibregl.LngLatBounds()).extend(f.geometry.coordinates);
  });

  applyI18n(); // needs stats

  // Headline counter is decoupled from the map so it always runs (hero is first in view).
  if (!isEmbed && !countedOnce) { countedOnce = true; animateCounter(stats.past_alert_over10); }

  const initializeMap = () => {
    map.addSource('dams', { type: 'geojson', data: fc, attribution: 'Dams: Global Dam Watch v1.0' });
    map.addLayer({ id: 'dams', type: 'circle', source: 'dams', paint: {
      'circle-color': colorExpr.age,
      'circle-radius': ['interpolate', ['linear'], ['zoom'],
        3, ['case', ['get','over10'], 3.2, 1.8],
        6, ['case', ['get','over10'], 6, 3],
        10, ['case', ['get','over10'], 11, 6]],
      'circle-stroke-width': 0.4, 'circle-stroke-color': 'rgba(0,0,0,.5)', 'circle-opacity': 0.92,
    }});
    renderLegend('age');
    if (isEmbed) {
      document.getElementById('legend').classList.remove('hide');
      document.getElementById('embed-mode').disabled = false;
      document.getElementById('embed-reset').disabled = false;
      fitEmbed();
    } else {
      setupScroll();
      setState('hero', null); // guarantee initial map state
    }

    // popup
    const fmt = (v,u) => v==null ? '—' : `${v.toLocaleString('en-US')}${u||''}`;
    map.on('click', 'dams', e => {
      const p = e.features[0].properties;
      const over = p.over10 === true || p.over10 === 'true';
      const flag = over
        ? `<div class="pop-flag over">${t('popup_capacity_over')}</div>`
        : `<div class="pop-flag under">${t('popup_capacity_under')}</div>`;
      new maplibregl.Popup({ offset: 10 }).setLngLat(e.lngLat).setHTML(
        `<p class="pop-name">${p.name}</p>
         <p class="pop-sub">${p.river ? p.river+' · ' : ''}${p.country}</p>
         <div class="pop-row"><span>Built</span><b>${p.year||'unknown'}</b></div>
         <div class="pop-row"><span>Age</span><b>${p.age?p.age+' yrs':'—'}</b></div>
         <div class="pop-row"><span>Height</span><b>${fmt(p.height_m,' m')}</b></div>
         <div class="pop-row"><span>Capacity</span><b>${fmt(p.cap_mcm,' M m³')}</b></div>
         ${p.use?`<div class="pop-row"><span>Use</span><b>${p.use}</b></div>`:''}${flag}`
      ).addTo(map);
    });
    map.on('mouseenter', 'dams', () => map.getCanvas().style.cursor = 'pointer');
    map.on('mouseleave', 'dams', () => map.getCanvas().style.cursor = '');
  };
  // Data can arrive after the map's load event, especially inside a lazy iframe.
  if (map.loaded()) initializeMap();
  else map.once('load', initializeMap);
}).catch(err => { console.error('Load failed', err); document.getElementById('count').textContent = '—'; });

/* ---------------- scrollama ---------------- */
function setupScroll() {
  const scroller = scrollama();
  scroller.setup({ step: '[data-step]', offset: 0.6 }).onStepEnter(({ element }) => {
    const step = element.dataset.step;
    setState(step, element.dataset.country);
    if (step === 'hero' && !countedOnce) { countedOnce = true; animateCounter(stats.past_alert_over10); }
  });
  window.addEventListener('resize', () => { scroller.resize(); renderDecadeChart(); });
}

/* ---------------- language toggle ---------------- */
// reflect initial ?lang=pl in the toggle
document.querySelectorAll('#lang button').forEach(x => x.classList.toggle('active', x.dataset.lang === lang));
document.getElementById('lang').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  lang = b.dataset.lang;
  document.querySelectorAll('#lang button').forEach(x => x.classList.toggle('active', x === b));
  applyI18n();
  if (map.getLayer('dams')) renderLegend(legendMode);
});
