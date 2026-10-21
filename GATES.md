# Gates — Comprehensive Dental & Implant Centre (demo rebuild)

G1. TypeScript compiles with no errors.
    CHECK: npx tsc --noEmit && echo GATE_OK
    EXPECT: GATE_OK

G2. ESLint reports no errors or warnings.
    CHECK: npx eslint src && echo GATE_OK
    EXPECT: GATE_OK

G3. Production build succeeds and prerenders every route.
    CHECK: npm run build >/dev/null 2>&1 && echo GATE_OK
    EXPECT: GATE_OK

G4. No text from any previous client remains in the source.
    CHECK: grep -rniE "neil|narvekar|ghansoli|nova|smile arc|janhavi|parab|ruchika|ankita|kandivali|lalbaug|mishra" src public README.md | wc -l
    EXPECT: 0

G5. The site is multi-page: home, about, services index, 11 treatment pages, contact.
    CHECK: node -e "const{services}=require('./scripts/read-services.cjs');const fs=require('fs');const p=['src/app/page.tsx','src/app/about/page.tsx','src/app/services/page.tsx','src/app/services/[slug]/page.tsx','src/app/contact/page.tsx'];const miss=p.filter(f=>!fs.existsSync(f));console.log(miss.length?'MISSING '+miss:(services===15?'GATE_OK':'SERVICES='+services))"
    EXPECT: GATE_OK

G6. Every verified clinic fact is present in the data layer, and nothing is invented.
    CHECK: node -e "const s=require('fs').readFileSync('src/data/clinic.ts','utf8');const want=['080-42114432','Cornwell Road','Langford Garden','560025','9:30','19:30','Dentistry Goes Digital'];const miss=want.filter(w=>!s.includes(w));console.log(miss.length?'MISSING '+miss:'GATE_OK')"
    EXPECT: GATE_OK

G7. Unreadable details are left null rather than guessed (email + mobile numbers).
    CHECK: node -e "const s=require('fs').readFileSync('src/data/clinic.ts','utf8');const ok=/email: null/.test(s)&&/mobiles: \[\]/.test(s);console.log(ok?'GATE_OK':'INVENTED CONTACT DETAIL')"
    EXPECT: GATE_OK

G8. All four dentists appear with the credentials the clinic lists.
    CHECK: node -e "const s=require('fs').readFileSync('src/data/team.ts','utf8');const want=['Anuradha Navaneetham','Romir Navaneetham','Rachana Doddala','Pranav Poornima Pradeep','ICOI (USA)','MDS Endodontics'];const miss=want.filter(w=>!s.includes(w));console.log(miss.length?'MISSING '+miss:'GATE_OK')"
    EXPECT: GATE_OK

G9. The three published reviews are reproduced word for word.
    CHECK: node -e "const s=require('fs').readFileSync('src/data/reviews.ts','utf8');const want=['Syed Sufi','Aashish Chandra','Jeet Kumar'];const miss=want.filter(w=>!s.includes(w));console.log(miss.length?'MISSING '+miss:'GATE_OK')"
    EXPECT: GATE_OK

G10. No horizontal scrolling at 320, 375, 414 and 768 px, in light and dark, on every page.
    CHECK: node scripts/check-responsive.mjs
    EXPECT: GATE_OK

G11. Every page exposes exactly one h1 and a reachable skip link (a11y floor).
    CHECK: node scripts/check-a11y.mjs
    EXPECT: GATE_OK

G12. (manual) Logo redraw reads as the clinic's badge: red heart, tooth, implant post, ring of type.
     Evidence: rendered comparison against the site's own logo.

G13. (manual) Light and dark both render correctly; every token pair meets WCAG AA.
     Evidence: computed contrast table (lowest pair) + screenshots of both themes.

---

## Evidence — run 2026-10-21

| Gate | Result | Evidence |
|------|--------|----------|
| G1 TypeScript | met | `npx tsc --noEmit` → exit 0 |
| G2 ESLint | met | `npx eslint src` → exit 0 |
| G3 Build | met | `npm run build` → exit 0; 20 routes prerendered (5 pages + 15 treatment pages + sitemap/robots/OG) |
| G4 No previous-client text | met | grep over src, public, README.md → 0 matches (after fixing a stale name in the booking placeholder and rewriting README.md) |
| G5 Multi-page | met | GATE_OK — all five route files present, 15 treatments |
| G6 Verified clinic facts | met | GATE_OK |
| G7 Nothing invented | met | GATE_OK — email and mobiles left null; both were illegible in the screenshots |
| G8 Four dentists | met | GATE_OK |
| G9 Reviews verbatim | met | GATE_OK |
| G10 No horizontal scroll | met | `node scripts/check-responsive.mjs` → GATE_OK across 320/375/414/768 px × light/dark × 5 routes (40 checks) |
| G11 A11y floor | met | `node scripts/check-a11y.mjs` → GATE_OK: one h1 per page, skip-link target present, every field labelled, no img without alt |
| G12 Logo redraw (manual) | met | Rendered beside the clinic's own badge: red heart, white tooth, threaded implant post, ring of set type; legible at favicon size |
| G13 Themes + contrast (manual) | met | Light and dark screenshots of all five routes; computed token contrast, lowest pair 4.63:1 (AA) after lifting `--color-mist` from 60% to 54% lightness |

Defects found and fixed during verification: a shared stroke object overrode each
SVG shape's own `fill`; `SessionId` was hard-coded to morning/evening and broke on
this clinic's single continuous session; the sticky mobile bar linked to a WhatsApp
number the clinic does not publish; the nav overflowed by 38 px at 320 px because of
the long wordmark; and the services page still read "Eleven treatments" after the
list grew to fifteen.
