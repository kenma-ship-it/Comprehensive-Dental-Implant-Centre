# Gates — Pearlstone Dental (demo)

G1. TypeScript compiles with no errors.
    CHECK: npx tsc --noEmit && echo GATE_OK
    EXPECT: GATE_OK

G2. ESLint reports no errors or warnings (vendored React Bits components are excluded).
    CHECK: npx eslint src && echo GATE_OK
    EXPECT: GATE_OK

G3. Production build succeeds and prerenders every route.
    CHECK: npm run build >/dev/null 2>&1 && echo GATE_OK
    EXPECT: GATE_OK

G4. No text from the earlier real-clinic build remains.
    CHECK: grep -rniE "comprehensive dental|navaneetham|doddala|poornima|bangalore|bengaluru|richmond circle|cornwell|langford|kolkata|en-IN" src public README.md | wc -l
    EXPECT: 0

G5. The site is multi-page: home, about, dentists index, 4 dentist profiles, services index, 15 treatment pages, contact.
    CHECK: node -e "const{services}=require('./scripts/read-services.cjs');const fs=require('fs');const p=['src/app/page.tsx','src/app/about/page.tsx','src/app/dentists/page.tsx','src/app/dentists/[id]/page.tsx','src/app/services/page.tsx','src/app/services/[slug]/page.tsx','src/app/contact/page.tsx'];const miss=p.filter(f=>!fs.existsSync(f));console.log(miss.length?'MISSING '+miss:(services===15?'GATE_OK':'SERVICES='+services))"
    EXPECT: GATE_OK

G6. Every dentist has a photo, education with institution and year, and a career history.
    CHECK: node -e "const fs=require('fs');const s=fs.readFileSync('src/data/team.ts','utf8');const photos=[...s.matchAll(/photo: \"([^\"]+)\"/g)].map(m=>m[1]);const missing=photos.filter(p=>!fs.existsSync('public'+p));const years=(s.match(/year: \"\d{4}\"/g)||[]).length;console.log(photos.length===4&&!missing.length&&years>=8&&(s.match(/years: \"/g)||[]).length>=8?'GATE_OK':'MISSING '+missing+' years='+years)"
    EXPECT: GATE_OK

G7. No horizontal scrolling at 320, 375, 414 and 768 px, in light and dark, on every page.
    CHECK: node scripts/check-responsive.mjs
    EXPECT: GATE_OK

G8. Every page exposes exactly one h1 and a reachable skip link (a11y floor).
    CHECK: node scripts/check-a11y.mjs
    EXPECT: GATE_OK

G9. (manual) Booking works end to end: a dentist link pre-fills the form, the dentist's off days show as "Off", a booking returns a reference, WhatsApp and calendar links.
