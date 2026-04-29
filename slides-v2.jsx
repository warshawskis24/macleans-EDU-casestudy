// slides-v2.jsx — Maclean's Education case study, V2 remix
// Structure follows the V2 brief: Cover w/ stats → Challenge → Users → Role → Scope → Process → Outcomes → Reflection → End

const { useMemo: useMemoV2 } = React;

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const TYPE_SCALE_V2 = {
  display: 132,
  title: 72,
  subtitle: 44,
  lead: 38,
  body: 28,
  small: 24,
  micro: 22,
};

const SPACING_V2 = {
  paddingTop: 110,
  paddingBottom: 110,
  paddingX: 140,
  titleGap: 56,
  itemGap: 28,
};

const PALETTES_V2 = {
  studio: { bg: '#F7F5F1', surface: '#FFFFFF', ink: '#1A1A1A', inkSoft: '#5C5953', rule: '#E4DFD5', accent: '#1A1A1A' },
  editorial: { bg: '#FBFBFB', surface: '#FFFFFF', ink: '#0E1A2B', inkSoft: '#5B6878', rule: '#E4E7EC', accent: '#1F3A68' },
  bold: { bg: '#FFF1F6', surface: '#FFFFFF', ink: '#1A1A1A', inkSoft: '#5C5953', rule: '#F0D9E2', accent: '#E5197F' },
};

const DENSITY_MULT_V2 = { compact: 0.85, regular: 1, comfy: 1.15 };

function useTokensV2(tweaks) {
  return useMemoV2(() => {
    const palette = PALETTES_V2[tweaks.aesthetic] || PALETTES_V2.studio;
    const accent = tweaks.accent || palette.accent;
    const m = DENSITY_MULT_V2[tweaks.density] || 1;
    const scale = Object.fromEntries(
      Object.entries(TYPE_SCALE_V2).map(([k, v]) => {
        const scaled = Math.round(v * m);
        const floor = k === 'micro' ? 22 : 24;
        return [k, Math.max(scaled, floor)];
      })
    );
    const space = Object.fromEntries(
      Object.entries(SPACING_V2).map(([k, v]) => [k, Math.round(v * m)])
    );
    return { palette: { ...palette, accent }, type: scale, space };
  }, [tweaks.aesthetic, tweaks.accent, tweaks.density]);
}

// ─── PRIMITIVES ─────────────────────────────────────────────────────────────
function FrameV2({ tokens, children, style, padded = true, bg }) {
  const { palette, space } = tokens;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: bg || palette.bg,
        color: palette.ink,
        fontFamily: '"Inter Tight", "Inter", system-ui, sans-serif',
        position: 'relative',
        boxSizing: 'border-box',
        padding: padded ? `${space.paddingTop}px ${space.paddingX}px ${space.paddingBottom}px` : 0,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function EyebrowV2({ tokens, children, color }) {
  const { palette, type } = tokens;
  return (
    <div style={{ fontSize: type.small, letterSpacing: '0.18em', textTransform: 'uppercase', color: color || palette.inkSoft, fontWeight: 600 }}>
      {children}
    </div>
  );
}

function SerifV2({ tokens, children, size, style }) {
  const { type } = tokens;
  return (
    <h1 style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: size || type.title, lineHeight: 1.02, letterSpacing: '-0.02em', fontWeight: 400, margin: 0, textWrap: 'balance', ...style }}>
      {children}
    </h1>
  );
}

function ContentV2({ tokens, kicker, title, children }) {
  const { space } = tokens;
  return (
    <FrameV2 tokens={tokens}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <EyebrowV2 tokens={tokens}>{kicker}</EyebrowV2>
        <SerifV2 tokens={tokens} style={{ marginTop: 24, maxWidth: '22em' }}>{title}</SerifV2>
        <div style={{ marginTop: space.titleGap, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {children}
        </div>
      </div>
    </FrameV2>
  );
}

// ─── COVER ──────────────────────────────────────────────────────────────────
function CoverV2({ tokens }) {
  const { palette, type } = tokens;
  return (
    <FrameV2 tokens={tokens} padded={false} style={{ overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 0 }}>
        <div style={{ padding: '72px 88px 64px', display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 32, minHeight: 0 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontWeight: 600 }}>
            <span style={{ fontSize: 24, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '7px 14px', border: `1px solid ${palette.rule}`, borderRadius: 999, color: palette.inkSoft }}>Case Study · 03</span>
            <span style={{ fontSize: 24, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.inkSoft }}>UX · IA · Sub-brand · Product</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
            <EyebrowV2 tokens={tokens}>Maclean's Education</EyebrowV2>
            <SerifV2 tokens={tokens} size={84} style={{ marginTop: 22, fontWeight: 350, lineHeight: 1.0 }}>
              From <em style={{ fontStyle: 'italic', fontWeight: 300 }}>buried</em> content<br/>
              to a destination.
            </SerifV2>
            <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.45, maxWidth: '26em', color: palette.inkSoft, fontStyle: 'italic', fontFamily: '"Fraunces", Georgia, serif', fontWeight: 350 }}>
              "Canada's most trusted education rankings had an audience problem — not with their content, but with where it lived."
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, borderTop: `1px solid ${palette.rule}`, paddingTop: 24 }}>
            <CoverStat tokens={tokens} v="+35%" l="Pageviews & ad impressions" />
            <CoverStat tokens={tokens} v="2.2 → 3+" l="Pages per session" />
            <CoverStat tokens={tokens} v="0 → 1" l="Dedicated education destination" />
          </div>
        </div>

        <div style={{ background: palette.ink, position: 'relative', overflow: 'hidden' }}>
          <img src="assets/cover-hero.png" alt="Maclean's Education hub" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
      </div>
    </FrameV2>
  );
}

function CoverStat({ tokens, v, l }) {
  const { palette } = tokens;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 56, fontFamily: '"Fraunces", Georgia, serif', color: palette.ink, lineHeight: 1, fontWeight: 350, letterSpacing: '-0.02em' }}>{v}</span>
      <span style={{ fontSize: 24, color: palette.inkSoft, lineHeight: 1.3 }}>{l}</span>
    </div>
  );
}

// ─── DIVIDER ────────────────────────────────────────────────────────────────
function DividerV2({ tokens, number, kicker, label }) {
  const { palette, type } = tokens;
  return (
    <FrameV2 tokens={tokens}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.4fr', gap: 80, alignItems: 'center', width: '100%' }}>
          <div style={{ fontFamily: '"Fraunces", Georgia, serif', fontSize: 360, lineHeight: 0.85, letterSpacing: '-0.04em', fontWeight: 300, color: palette.ink }}>{number}</div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <EyebrowV2 tokens={tokens}>{kicker}</EyebrowV2>
            <SerifV2 tokens={tokens} size={type.title * 1.1} style={{ marginTop: 32, fontWeight: 350 }}>{label}</SerifV2>
          </div>
        </div>
      </div>
    </FrameV2>
  );
}

// ─── 01 · CHALLENGE ─────────────────────────────────────────────────────────
function ChallengeV2({ tokens }) {
  const { palette, type } = tokens;
  return (
    <ContentV2 tokens={tokens} kicker="01 — The Challenge" title={<>Great traffic. <em style={{ fontStyle: 'italic' }}>Zero</em> retention.</>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, flex: 1, alignItems: 'start', minHeight: 0 }}>
        <div style={{ fontSize: type.body, lineHeight: 1.5, color: palette.inkSoft }}>
          <p style={{ margin: 0 }}>
            Maclean's Education rankings are Canada's most trusted — and they get traffic. But students who arrived for rankings left immediately. High bounce rates. Low pages per session. No pathway forward.
          </p>
          <p style={{ margin: '1.2em 0 0' }}>
            The content was living inside the main Maclean's feed: competing with politics and pop culture, competing for attention it couldn't win with a student audience. No connective tissue. No reason to stay.
          </p>
          <p style={{ margin: '1.2em 0 0', color: palette.ink, fontWeight: 500 }}>
            The sub-brand itself was ambiguous. Was this "Maclean's Education"? Students called it "the Maclean's Guide." That gap was the signal.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <EyebrowV2 tokens={tokens}>Before — buried in the main feed</EyebrowV2>
          <div style={{ background: '#fff', border: `1px solid ${palette.rule}`, borderRadius: 4, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <img src="assets/old-home.png" alt="Maclean's homepage before" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <span style={{ fontSize: 24, color: palette.inkSoft, letterSpacing: '0.04em' }}>macleans.ca — education content mixed into the general feed</span>
        </div>
      </div>
    </ContentV2>
  );
}

// ─── 02 · USERS ─────────────────────────────────────────────────────────────
function UsersV2({ tokens }) {
  const { palette, type } = tokens;
  const tiers = [
    { tier: 'Primary', name: 'Maya Chen', role: 'Grade 11–12 student', desc: 'High-stakes university decision mode. High intent. Seasonal.', color: '#E8C9A7' },
    { tier: 'Secondary', name: 'David Tremblay', role: 'Parent', desc: 'Researching options alongside their kids. Wants structure and credibility.', color: '#A7C4E8' },
    { tier: 'Tertiary', name: 'Priya Sharma', role: 'Institutions + advertisers', desc: 'Tracking brand presence and demographic targeting.', color: '#C9A7E8' },
  ];
  return (
    <ContentV2 tokens={tokens} kicker="02 — Users & Audience" title={<>One primary user. <em style={{ fontStyle: 'italic' }}>High intent.</em> Seasonal.</>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 12 }}>
        {tiers.map((a, i) => (
          <div key={a.tier} style={{ borderTop: `2px solid ${i === 0 ? palette.ink : palette.rule}`, paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 16, opacity: i === 0 ? 1 : 0.95 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Fraunces", Georgia, serif', fontSize: 28, fontWeight: 400, color: '#1A1A1A', flexShrink: 0 }}>
                {a.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: type.micro, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === 0 ? palette.ink : palette.inkSoft, fontWeight: 700 }}>{a.tier}</span>
                <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', letterSpacing: '-0.01em', color: palette.ink, lineHeight: 1.1 }}>{a.name}</span>
              </div>
            </div>
            <span style={{ fontSize: type.lead, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.1, letterSpacing: '-0.01em' }}>{a.role}</span>
            <span style={{ fontSize: type.small, lineHeight: 1.5, color: palette.inkSoft }}>{a.desc}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 56, background: palette.ink, color: '#fff', padding: '36px 44px', borderRadius: 4, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 36, alignItems: 'center' }}>
        <span style={{ fontSize: type.micro, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, whiteSpace: 'nowrap' }}>Method</span>
        <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.3, letterSpacing: '-0.01em', fontWeight: 350 }}>
          With limited research budget, I used <em style={{ fontStyle: 'italic' }}>synthetic personas</em> anchored to behavioral analytics — traffic patterns, engagement data, seasonal spikes. The data confirmed: students arrive with intent. The experience wasn't meeting them.
        </span>
      </div>
    </ContentV2>
  );
}

// ─── 03 · ROLE ──────────────────────────────────────────────────────────────
function RoleV2({ tokens }) {
  const { palette, type } = tokens;
  const owned = [
    'User research (synthetic + behavioral analytics)',
    'Information architecture',
    'Sub-brand visual strategy',
    'Hub design & content taxonomy',
    'Component design + dev alignment',
    'Editorial buy-in & prioritization workshops',
  ];
  const collab = [
    { k: 'Head of Product', v: 'Scope, prioritization, stakeholder management' },
    { k: 'One developer', v: 'Staging environment & WordPress template architecture' },
    { k: 'Editorial team', v: 'Content taxonomy, art direction, operational buy-in' },
  ];
  return (
    <ContentV2 tokens={tokens} kicker="03 — My Role" title={<>Sole UX designer. <em style={{ fontStyle: 'italic' }}>End to end.</em></>}>
      <div style={{ fontSize: type.body, lineHeight: 1.45, color: palette.inkSoft, maxWidth: '50em' }}>
        Led a 0→1 microsite initiative — UX research, IA, sub-brand strategy, and product design — turning scattered education content into a navigable destination that grew engagement <strong style={{ color: palette.ink }}>35%</strong> while navigating a simultaneous backend migration.
      </div>
      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, flex: 1, alignItems: 'start' }}>
        <div>
          <EyebrowV2 tokens={tokens}>What I owned</EyebrowV2>
          <ul style={{ margin: '24px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {owned.map((r) => (
              <li key={r} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 16, alignItems: 'baseline', fontSize: type.body, color: palette.ink, lineHeight: 1.4 }}>
                <span style={{ fontSize: type.micro, color: palette.inkSoft }}>—</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <EyebrowV2 tokens={tokens}>Collaborated with</EyebrowV2>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' }}>
            {collab.map((c, i) => (
              <div key={c.k} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, padding: '20px 0', borderTop: i === 0 ? `1px solid ${palette.rule}` : 'none', borderBottom: `1px solid ${palette.rule}`, alignItems: 'baseline' }}>
                <span style={{ fontSize: type.small, color: palette.ink, fontWeight: 600 }}>{c.k}</span>
                <span style={{ fontSize: type.small, color: palette.inkSoft, lineHeight: 1.5 }}>{c.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentV2>
  );
}

// ─── 04 · SCOPE & CONSTRAINTS ───────────────────────────────────────────────
function ScopeV2({ tokens }) {
  const { palette, type } = tokens;
  const items = [
    { k: 'Timeline', v: '5 months — November to April.' },
    { k: 'Budget', v: 'Tight. Most editorial budget consumed by twice-yearly guide production.' },
    { k: 'Tech', v: 'Simultaneous backend migration. WordPress constraints. One new component allowed.' },
    { k: 'Legacy', v: 'Team PTSD from a prior failed rebrand — inherited Figma files that were "just Maclean\u2019s but a different blue."' },
  ];
  return (
    <ContentV2 tokens={tokens} kicker="04 — Scope & Constraints" title={<>Everything. <em style={{ fontStyle: 'italic' }}>With nothing.</em></>}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((c, i) => (
            <div key={c.k} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, padding: '24px 0', borderTop: i === 0 ? `1px solid ${palette.rule}` : 'none', borderBottom: `1px solid ${palette.rule}`, alignItems: 'baseline' }}>
              <span style={{ fontSize: type.lead, fontFamily: '"Fraunces", Georgia, serif', color: palette.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{c.k}</span>
              <span style={{ fontSize: type.body, color: palette.inkSoft, lineHeight: 1.45 }}>{c.v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, padding: '32px 40px', background: palette.ink, color: '#fff', borderRadius: 4, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center' }}>
          <span style={{ fontSize: type.micro, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, whiteSpace: 'nowrap' }}>Early lesson</span>
          <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.3, letterSpacing: '-0.01em', fontWeight: 350 }}>
            Never say "redesign." Never say "microsite." Call it what it is for the team in front of you: <em style={{ fontStyle: 'italic' }}>a new home for their audience.</em>
          </span>
        </div>
      </div>
    </ContentV2>
  );
}

// ─── 05 · PROCESS ───────────────────────────────────────────────────────────
function ProcessV2({ tokens }) {
  const { palette, type } = tokens;
  const findings = [
    { n: '01', t: 'Research said "stay." The experience said "go."', d: 'Behavioral data showed rankings driving strong seasonal spikes with near-zero recirculation. High intent — zero pathway forward. Students weren\u2019t bouncing because content was bad. They were bouncing because the experience ended.' },
    { n: '02', t: 'The naming question revealed the real problem.', d: 'I tested "Maclean\u2019s Education" as a standalone identity — and killed it. Students said "the Maclean\u2019s Guide." That wasn\u2019t a brand. That was a habit. The sub-brand needed to feel purposeful and distinct, not relabeled.' },
    { n: '03', t: 'Skipping wireframes was the right call.', d: 'Given the team\u2019s history with failed redesigns, I moved straight from research to low-fi Maclean\u2019s variations — working inside the existing system. Editorial buy-in came from seeing it in context, not from abstract wireframes.' },
    { n: '04', t: 'One new component. One big unlock.', d: 'Within constraints allowing one new component build, I designed a flexible CTA hero — pointing to subscribe, newsletter, or guide gateway. A small change that shifted the mental model: from news feed to destination.' },
  ];
  return (
    <ContentV2 tokens={tokens} kicker="05 — The Process" title={<>Research said 'stay.' The experience said <em style={{ fontStyle: 'italic' }}>'go.'</em></>}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 12 }}>
        {findings.map((f) => (
          <div key={f.n} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 28, paddingTop: 24, borderTop: `1px solid ${palette.rule}` }}>
            <span style={{ fontSize: type.lead, fontFamily: '"Fraunces", Georgia, serif', color: palette.ink, lineHeight: 1, fontWeight: 400 }}>{f.n}</span>
            <div>
              <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', color: palette.ink, lineHeight: 1.2, letterSpacing: '-0.01em', display: 'block' }}>{f.t}</span>
              <span style={{ fontSize: type.small, color: palette.inkSoft, lineHeight: 1.5, marginTop: 12, display: 'block' }}>{f.d}</span>
            </div>
          </div>
        ))}
      </div>
    </ContentV2>
  );
}

// ─── 05b · ARTIFACTS ────────────────────────────────────────────────────────
function ArtifactsV2({ tokens }) {
  const { palette } = tokens;
  return (
    <ContentV2 tokens={tokens} kicker="05 — Artifacts" title={<>From low-fi <em style={{ fontStyle: 'italic' }}>in-context</em> to a destination.</>}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 0.55fr', gap: 28, minHeight: 0, maxHeight: 640 }}>
        {[
          { src: 'assets/homepage-early-concept.png', label: 'Concept exploration' },
          { src: 'assets/home-v1-final.png', label: 'Final hub design' },
          { src: 'assets/mobile-medical-rankings.jpg', label: 'Mobile hub' },
        ].map((a) => (
          <div key={a.src} style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            <div style={{ background: '#fff', border: `1px solid ${palette.rule}`, borderRadius: 3, overflow: 'hidden', flex: 1, minHeight: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <img src={a.src} alt={a.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            </div>
            <span style={{ fontSize: 24, color: palette.inkSoft, letterSpacing: '0.06em' }}>{a.label}</span>
          </div>
        ))}
      </div>
    </ContentV2>
  );
}

// ─── 06 · OUTCOMES ──────────────────────────────────────────────────────────
function OutcomesV2({ tokens }) {
  const { palette, type } = tokens;
  const rows = [
    { cat: 'Business', metric: 'Pageviews & ad impressions', result: '+35%' },
    { cat: 'Engagement', metric: 'Pages per session (overall)', result: '2.2' },
    { cat: 'Engagement', metric: 'Pages per session (school exploration)', result: '3+' },
    { cat: 'Retention', metric: 'Student Hub return visitors', result: 'Growing YoY' },
    { cat: 'Reach', metric: 'Canadians reached via Maclean\u2019s Education', result: 'Millions (seasonal)' },
  ];
  return (
    <ContentV2 tokens={tokens} kicker="06 — Outcomes" title={<>Buried content became a <em style={{ fontStyle: 'italic' }}>destination.</em></>}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 280px', gap: 32, padding: '14px 0', borderBottom: `2px solid ${palette.ink}` }}>
          <span style={{ fontSize: type.micro, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.inkSoft, fontWeight: 700 }}>Category</span>
          <span style={{ fontSize: type.micro, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.inkSoft, fontWeight: 700 }}>Metric</span>
          <span style={{ fontSize: type.micro, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.inkSoft, fontWeight: 700, textAlign: 'right' }}>Result</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 280px', gap: 32, padding: '24px 0', borderBottom: `1px solid ${palette.rule}`, alignItems: 'baseline' }}>
            <span style={{ fontSize: type.small, color: palette.inkSoft, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>{r.cat}</span>
            <span style={{ fontSize: type.body, color: palette.ink, lineHeight: 1.3 }}>{r.metric}</span>
            <span style={{ fontSize: 44, fontFamily: '"Fraunces", Georgia, serif', color: '#D7263D', fontWeight: 400, lineHeight: 1, textAlign: 'right', letterSpacing: '-0.01em' }}>{r.result}</span>
          </div>
        ))}
        <div style={{ marginTop: 32, padding: '24px 32px', background: palette.ink, color: '#fff', borderRadius: 4, display: 'flex', alignItems: 'baseline', gap: 28 }}>
          <span style={{ fontSize: 56, fontFamily: '"Fraunces", Georgia, serif', fontWeight: 350, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>600,000</span>
          <span style={{ fontSize: type.body, lineHeight: 1.4, color: 'rgba(255,255,255,0.75)' }}>visitors in a single week — the biggest traffic week in the site's history, within a year of launch.</span>
        </div>
        <div style={{ marginTop: 28, fontSize: type.body, lineHeight: 1.5, color: palette.inkSoft, maxWidth: '46em' }}>
          The 35% pageview lift is a direct business story: better IA = more ad inventory for a high-value B2B vertical. The 3+ PPS on school exploration confirmed the architecture was working — students weren't just arriving, they were exploring.
        </div>
      </div>
    </ContentV2>
  );
}

// ─── 07 · REFLECTION ────────────────────────────────────────────────────────
function ReflectionV2({ tokens }) {
  const { palette, type } = tokens;
  const lessons = [
    { n: '01', t: 'Art direction belongs to editorial. UX behaviour belongs to product.', d: 'Establishing that split early saves weeks of misaligned effort.' },
    { n: '02', t: 'Team trauma is a real constraint.', d: 'Naming, framing, and process language all carry baggage. Read the room before you open Figma.' },
    { n: '03', t: 'Synthetic personas are legitimate research.', d: 'Anchored to strong behavioral data, they\u2019re a real method when budget doesn\u2019t allow primary research.' },
  ];
  return (
    <ContentV2 tokens={tokens} kicker="07 — Reflection" title={<>What I\u2019d <em style={{ fontStyle: 'italic' }}>do differently.</em></>}>
      <div style={{ background: palette.ink, color: '#fff', padding: '36px 44px', borderRadius: 4, marginTop: 8 }}>
        <span style={{ fontSize: type.micro, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>What I'd do differently</span>
        <div style={{ marginTop: 16, fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.3, letterSpacing: '-0.01em', fontWeight: 350 }}>
          Fight harder for the school profile filter in v1. It was the right cut given constraints — but it was the highest-value descoped feature for our primary user, directly serving students at the most critical point of their decision.
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <EyebrowV2 tokens={tokens}>What this project confirmed</EyebrowV2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 28 }}>
          {lessons.map((l) => (
            <div key={l.n} style={{ borderTop: `2px solid ${palette.ink}`, paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: type.micro, letterSpacing: '0.14em', color: palette.inkSoft, fontWeight: 700 }}>{l.n}</span>
              <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{l.t}</span>
              <span style={{ fontSize: type.small, color: palette.inkSoft, lineHeight: 1.5 }}>{l.d}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 32, fontSize: type.small, lineHeight: 1.5, color: palette.inkSoft, fontStyle: 'italic', fontFamily: '"Fraunces", Georgia, serif', maxWidth: '50em' }}>
        The framework gives Maclean's Education room to grow into personalization, in-article rankings, and deeper return-visitor features. The destination exists. The next phase is making it sticky.
      </div>
    </ContentV2>
  );
}

// ─── END ────────────────────────────────────────────────────────────────────
function EndV2({ tokens }) {
  const { palette, type } = tokens;
  return (
    <FrameV2 tokens={tokens}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px' }}>
        <EyebrowV2 tokens={tokens}>Thank you</EyebrowV2>
        <SerifV2 tokens={tokens} size={type.display * 0.95} style={{ marginTop: 32, fontWeight: 350 }}>Let's talk.</SerifV2>
        <a href="https://macleans.ca/education" target="_blank" rel="noopener noreferrer" style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 16, padding: '22px 36px', background: palette.ink, color: '#fff', fontSize: type.body, fontWeight: 500, letterSpacing: '0.02em', textDecoration: 'none', borderRadius: 4 }}>
          <span>Visit the site</span>
          <span style={{ fontSize: type.body, lineHeight: 1 }}>→</span>
        </a>
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '24px 80px', fontSize: type.small, color: palette.inkSoft, borderTop: `1px solid ${palette.rule}`, paddingTop: 32 }}>
          <ColField tokens={tokens} k="Designer" v="Amos Shaw" />
          <ColField tokens={tokens} k="Role" v="UX Design Lead, SJC Media" />
          <ColField tokens={tokens} k="Studio" v="warshawskis.com" />
          <ColField tokens={tokens} k="Email" v="amos@warshawskis.com" />
        </div>
      </div>
    </FrameV2>
  );
}

function ColField({ tokens, k, v }) {
  const { palette, type } = tokens;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span style={{ fontSize: 24, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.inkSoft, opacity: 0.75, fontWeight: 600 }}>{k}</span>
      <span style={{ fontSize: 26, color: palette.ink, fontWeight: 500 }}>{v}</span>
    </div>
  );
}

// ─── EXPORT ─────────────────────────────────────────────────────────────────
Object.assign(window, {
  useTokensV2,
  CoverV2,
  DividerV2,
  ChallengeV2,
  UsersV2,
  RoleV2,
  ScopeV2,
  ProcessV2,
  ArtifactsV2,
  OutcomesV2,
  ReflectionV2,
  EndV2,
});
