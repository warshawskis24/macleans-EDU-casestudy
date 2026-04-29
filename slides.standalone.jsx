// slides.jsx — Maclean's Education case study
// Studio-portfolio aesthetic. Numbered dividers (label voice) + declarative content slides.

const { useMemo } = React;

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const TYPE_SCALE = {
  display: 132, // cover hero
  title: 72,    // content slide title
  subtitle: 44, // section divider title
  lead: 38,     // intro/lede paragraphs
  body: 28,     // body copy
  small: 24,    // labels, captions, metadata
  micro: 22,    // ultra-small labels (only with letter-spacing) — kept at 22 for badge eyebrows
};

const SPACING = {
  paddingTop: 110,
  paddingBottom: 110,
  paddingX: 140,
  titleGap: 56,
  itemGap: 28,
};

// PALETTES — one of these is selected via tweaks "aesthetic"
const PALETTES = {
  studio: {
    bg: '#F7F5F1',
    surface: '#FFFFFF',
    ink: '#1A1A1A',
    inkSoft: '#5C5953',
    rule: '#E4DFD5',
    accent: '#1A1A1A', // neutral first
  },
  editorial: {
    bg: '#FBFBFB',
    surface: '#FFFFFF',
    ink: '#0E1A2B',
    inkSoft: '#5B6878',
    rule: '#E4E7EC',
    accent: '#1F3A68', // Maclean's blue
  },
  bold: {
    bg: '#FFF1F6',
    surface: '#FFFFFF',
    ink: '#1A1A1A',
    inkSoft: '#5C5953',
    rule: '#F0D9E2',
    accent: '#E5197F', // Maclean's pink
  },
};

const DENSITY_MULT = { compact: 0.85, regular: 1, comfy: 1.15 };

function useTokens(tweaks) {
  return useMemo(() => {
    const palette = PALETTES[tweaks.aesthetic] || PALETTES.studio;
    const accent = tweaks.accent || palette.accent;
    const m = DENSITY_MULT[tweaks.density] || 1;
    // Apply density to type, but enforce 24px minimum so projection stays legible.
    const scale = Object.fromEntries(
      Object.entries(TYPE_SCALE).map(([k, v]) => {
        const scaled = Math.round(v * m);
        // micro is the only key permitted below 24 (badge/eyebrow letter-spaced labels)
        const floor = k === 'micro' ? 22 : 24;
        return [k, Math.max(scaled, floor)];
      })
    );
    const space = Object.fromEntries(
      Object.entries(SPACING).map(([k, v]) => [k, Math.round(v * m)])
    );
    return { palette: { ...palette, accent }, type: scale, space };
  }, [tweaks.aesthetic, tweaks.accent, tweaks.density]);
}

// ─── PRIMITIVES ─────────────────────────────────────────────────────────────
function SlideFrame({ tokens, children, style, padded = true, bg }) {
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
        padding: padded
          ? `${space.paddingTop}px ${space.paddingX}px ${space.paddingBottom}px`
          : 0,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SlideChrome({ tokens, label, page, total }) {
  // Header chrome removed per direction — clean top edge.
  return null;
}

function Eyebrow({ tokens, children, color }) {
  const { palette, type } = tokens;
  return (
    <div
      style={{
        fontSize: type.small,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: color || palette.inkSoft,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

function SerifTitle({ tokens, children, size, style }) {
  const { type } = tokens;
  return (
    <h1
      style={{
        fontFamily: '"Fraunces", "Source Serif Pro", Georgia, serif',
        fontSize: size || type.title,
        lineHeight: 1.02,
        letterSpacing: '-0.02em',
        fontWeight: 400,
        margin: 0,
        textWrap: 'balance',
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

// ─── SLIDE: COVER ──────────────────────────────────────────────────────────
function CoverSlide({ tokens }) {
  const { palette, type, space } = tokens;
  return (
    <SlideFrame tokens={tokens} padded={false} style={{ overflow: 'hidden' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: 0,
        }}
      >
        {/* Left: Title block */}
        <div
          style={{
            padding: `64px 88px 56px`,
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            gap: 32,
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 22, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '7px 14px', border: `1px solid ${palette.rule}`, borderRadius: 999, color: palette.inkSoft }}>
              Case Study · 03
            </span>
            <span style={{ fontSize: 22, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.inkSoft }}>2024 — 2025</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
            <Eyebrow tokens={tokens}>SJC Media · Maclean's Education</Eyebrow>
            <SerifTitle
              tokens={tokens}
              size={76}
              style={{ marginTop: 22, fontWeight: 350, lineHeight: 1.0 }}
            >
              Making Canada's<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>most-cited</em> education<br/>
              content findable.
            </SerifTitle>
            <div
              style={{
                marginTop: 28,
                fontSize: 24,
                lineHeight: 1.45,
                maxWidth: '32em',
                color: palette.inkSoft,
              }}
            >
              UX research and sub-brand design to transform Maclean's Education
              into Canada's go-to post-secondary destination.
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
              borderTop: `1px solid ${palette.rule}`,
              paddingTop: 22,
            }}
          >
            <Field label="Role" value="UX Design Lead" tokens={tokens} />
            <Field label="Team" value="Lead + PM + Dev" tokens={tokens} />
            <Field label="Timeline" value="4–6 months" tokens={tokens} />
            <Field label="Live at" value="macleans.ca/edu" tokens={tokens} />
          </div>
        </div>

        {/* Right: Hero image */}
        <div
          style={{
            background: palette.ink,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={window.__resources.coverHero}
            alt="Students researching Canadian universities with Maclean's guide and the new Education hub"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      </div>
    </SlideFrame>
  );
}

function Field({ label, value, tokens }) {
  const { type, palette } = tokens;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
      <span style={{ fontSize: 24, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.inkSoft, opacity: 0.75, fontWeight: 600, lineHeight: 1.2 }}>{label}</span>
      <span style={{ fontSize: 26, color: palette.ink, fontWeight: 500, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</span>
    </div>
  );
}

// ─── SLIDE: SECTION DIVIDER ─────────────────────────────────────────────────
function DividerSlide({ tokens, number, label, kicker, total = 7 }) {
  const { palette, type, space } = tokens;
  return (
    <SlideFrame tokens={tokens}>
      <SlideChrome tokens={tokens} label="Section" page={parseInt(number, 10)} total={total} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.4fr', gap: 80, alignItems: 'center', width: '100%' }}>
          <div
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: 360,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              fontWeight: 300,
              color: palette.ink,
            }}
          >
            {number}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Eyebrow tokens={tokens}>{kicker}</Eyebrow>
            <SerifTitle
              tokens={tokens}
              size={type.title * 1.1}
              style={{ marginTop: 32, fontWeight: 350 }}
            >
              {label}
            </SerifTitle>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ─── SLIDE: CONTENT (declarative title + supporting body) ───────────────────
function ContentSlide({ tokens, kicker, title, children, page, total }) {
  const { palette, type, space } = tokens;
  return (
    <SlideFrame tokens={tokens}>
      <SlideChrome tokens={tokens} label={kicker} page={page} total={total} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Eyebrow tokens={tokens}>{kicker}</Eyebrow>
        <SerifTitle tokens={tokens} style={{ marginTop: 24, maxWidth: '22em' }}>
          {title}
        </SerifTitle>
        <div style={{ marginTop: space.titleGap, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </SlideFrame>
  );
}

// ─── SLIDE 02: OVERVIEW ─────────────────────────────────────────────────────
function OverviewSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  return (
    <ContentSlide
      tokens={tokens}
      kicker="01 — Overview"
      title={<>SJC's most strategically valuable property had no <em style={{ fontStyle: 'italic' }}>home</em>.</>}
      page={page}
      total={total}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: type.body, lineHeight: 1.5, color: palette.inkSoft }}>
            <p style={{ margin: 0 }}>
              Maclean's, founded in 1905, is Canada's flagship current-affairs brand and
              the authoritative home of the country's most-cited university rankings.
            </p>
            <p style={{ margin: '1.2em 0 0' }}>
              The Education section housed those rankings alongside guides, student
              stories, and institutional profiles — making it one of the most
              strategically valuable properties in the entire SJC portfolio.
            </p>
            <p style={{ margin: '1.2em 0 0', color: palette.ink, fontWeight: 500 }}>
              The goal was to take that value and make it visible.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, borderTop: `1px solid ${palette.rule}`, paddingTop: 16 }}>
            <FactMini tokens={tokens} k="Publisher" v="SJC Media" />
            <FactMini tokens={tokens} k="Brand" v="Maclean's" />
            <FactMini tokens={tokens} k="Property" v="Education" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Eyebrow tokens={tokens}>Before — buried in the main feed</Eyebrow>
          <div style={{
            background: '#fff',
            border: `1px solid ${palette.rule}`,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          }}>
            <img
              src={window.__resources.oldHome}
              alt="Maclean's homepage before — education content mixed in with politics and pop culture"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <span style={{ fontSize: 24, color: palette.inkSoft, letterSpacing: '0.04em' }}>
            macleans.ca — education content mixed into the general feed
          </span>
        </div>
      </div>
    </ContentSlide>
  );
}

function FactMini({ tokens, k, v }) {
  const { palette, type } = tokens;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 24, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.inkSoft, fontWeight: 600 }}>{k}</span>
      <span style={{ fontSize: 30, fontFamily: '"Fraunces", Georgia, serif', color: palette.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{v}</span>
    </div>
  );
}

function FactCard({ tokens, k, v, sub }) {
  const { palette, type } = tokens;
  return (
    <div style={{ borderTop: `1px solid ${palette.rule}`, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: type.micro, letterSpacing: '0.14em', textTransform: 'uppercase', color: palette.inkSoft, fontWeight: 600 }}>{k}</span>
      <span style={{ fontSize: type.lead, fontFamily: '"Fraunces", Georgia, serif', fontWeight: 400, color: palette.ink, letterSpacing: '-0.01em' }}>{v}</span>
      <span style={{ fontSize: type.small, color: palette.inkSoft }}>{sub}</span>
    </div>
  );
}

// ─── SLIDE 03: PROBLEM ──────────────────────────────────────────────────────
function ProblemSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  return (
    <ContentSlide
      tokens={tokens}
      kicker="02 — Problem & Purpose"
      title={<>Canada's best education content was <em style={{ fontStyle: 'italic' }}>invisible</em>.</>}
      page={page}
      total={total}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, flex: 1, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: type.body, lineHeight: 1.5, color: palette.inkSoft }}>
            <p style={{ margin: 0 }}>
              The content was getting published. Nobody could find it. Rankings, guides,
              and student stories were scattered inside the main Maclean's feed
              alongside politics and pop culture, with no dedicated home and no clear
              navigation pathway.
            </p>
            <p style={{ margin: '1.2em 0 0' }}>
              Three distinct audiences depended on this content. None of them could
              reliably find it, navigate it, or return to it.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            <Eyebrow tokens={tokens}>Analytics — the disconnect</Eyebrow>
            <div style={{
              background: '#fff',
              border: `1px solid ${palette.rule}`,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              width: '85%',
              alignSelf: 'flex-start',
            }}>
              <img src={window.__resources.bounceRate} alt="Google Analytics overview — 83.68% bounce rate magnified" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: `1px solid ${palette.rule}` }}>
          <BeforeStat tokens={tokens} label="Pages per session" before="1.5" />
          <BeforeStat tokens={tokens} label="Avg. engagement time" before="< 1 min" />
          <BeforeStat tokens={tokens} label="Recirculation from rankings" before="Near zero" />
          <BeforeStat tokens={tokens} label="Dedicated education hub" before="None" last />
        </div>
      </div>
    </ContentSlide>
  );
}

function BeforeStat({ tokens, label, before, last }) {
  const { palette, type } = tokens;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: 24,
      alignItems: 'baseline',
      padding: '22px 0',
      borderBottom: last ? 'none' : `1px solid ${palette.rule}`,
    }}>
      <span style={{ fontSize: 26, color: palette.inkSoft }}>{label}</span>
      <span style={{ fontSize: 44, fontFamily: '"Fraunces", Georgia, serif', color: '#D7263D', fontWeight: 400, lineHeight: 1, whiteSpace: 'nowrap' }}>{before}</span>
    </div>
  );
}

// ─── SLIDE 04: AUDIENCES ────────────────────────────────────────────────────
function AudiencesSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  const audiences = [
    {
      tag: '01',
      name: 'Maya Chen',
      role: 'Prospective student',
      label: 'Prospective students',
      desc: 'Researching universities, comparing rankings, reading guides. High intent, time-sensitive decisions tied to enrollment cycles.',
      color: '#E8C9A7',
    },
    {
      tag: '02',
      name: 'David Tremblay',
      role: 'Guidance counsellor',
      label: 'Educators & guidance counsellors',
      desc: 'Using rankings and profiles as reference material when advising students. Need structure and credibility above all.',
      color: '#A7C4E8',
    },
    {
      tag: '03',
      name: 'Priya Sharma',
      role: 'University admin',
      label: 'University admins & comms',
      desc: 'Monitoring how their institutions are represented. Care deeply about accuracy and visibility.',
      color: '#C9A7E8',
    },
  ];
  return (
    <ContentSlide
      tokens={tokens}
      kicker="03 — Users & Audience"
      title={<>Three audiences. <em style={{ fontStyle: 'italic' }}>One</em> architecture.</>}
      page={page}
      total={total}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 12 }}>
        {audiences.map((a) => (
          <div
            key={a.tag}
            style={{
              borderTop: `2px solid ${palette.ink}`,
              paddingTop: 22,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minHeight: 360,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <PersonaAvatar initials={a.name.split(' ').map(n => n[0]).join('')} bg={a.color} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: type.micro, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.inkSoft, fontWeight: 600 }}>Audience · {a.tag}</span>
                <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', letterSpacing: '-0.01em', color: palette.ink, lineHeight: 1.1 }}>{a.name}</span>
              </div>
            </div>
            <span style={{ fontSize: type.lead, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.1, letterSpacing: '-0.01em' }}>{a.label}</span>
            <span style={{ fontSize: type.small, lineHeight: 1.5, color: palette.inkSoft }}>{a.desc}</span>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 64,
        background: palette.ink,
        color: '#fff',
        padding: '40px 48px',
        borderRadius: 4,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 40,
        alignItems: 'center',
      }}>
        <span style={{ fontSize: type.micro, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, whiteSpace: 'nowrap' }}>Key finding</span>
        <span style={{ fontSize: type.lead, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1.2, letterSpacing: '-0.01em', fontWeight: 350 }}>
          All three groups navigated more naturally by <em style={{ fontStyle: 'italic' }}>content type</em> — rankings, guides, profiles — than by audience label. This single insight drove the entire IA.
        </span>
      </div>
    </ContentSlide>
  );
}

function PersonaAvatar({ initials, bg }) {
  return (
    <div style={{
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Fraunces", Georgia, serif',
      fontSize: 28,
      fontWeight: 400,
      color: '#1A1A1A',
      letterSpacing: '0.02em',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// ─── SLIDE 05: CARD SORTING / IA ────────────────────────────────────────────
function ResearchSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  return (
    <ContentSlide
      tokens={tokens}
      kicker="03 — Information Architecture"
      title={<>Card sorting <em style={{ fontStyle: 'italic' }}>settled</em> the IA debate.</>}
      page={page}
      total={total}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, flex: 1, alignItems: 'start' }}>
        <div style={{ fontSize: type.body, lineHeight: 1.5, color: palette.inkSoft }}>
          <p style={{ margin: 0 }}>
            Two competing IA approaches: organize by audience or organize by content
            type. We tested both with open and closed card sorts across all three user
            groups.
          </p>
          <p style={{ margin: '1.2em 0 0', color: palette.ink, fontWeight: 500 }}>
            The data was decisive. Content type won across all three groups, regardless of who they were.
          </p>
          <p style={{ margin: '1.2em 0 0' }}>
            That gave us the confidence to make opinionated structural decisions —
            and defend them to stakeholders — instead of defaulting to generic
            audience-segmented labels.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Eyebrow tokens={tokens}>Final IA — Four Pillars</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 6 }}>
            {[
              { n: '01', t: 'Rankings', d: 'Medical · Undergrad · Comprehensive' },
              { n: '02', t: 'University Profiles', d: 'School-by-school · filterable' },
              { n: '03', t: 'Best Programs', d: 'List of 9 programs' },
              { n: '04', t: 'Student Hub', d: 'How to get in · pay · prepare' },
            ].map((p) => (
              <div
                key={p.n}
                style={{
                  background: palette.surface,
                  border: `1px solid ${palette.rule}`,
                  padding: '24px 26px',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  minHeight: 140,
                }}
              >
                <span style={{ fontSize: type.micro, letterSpacing: '0.14em', color: palette.inkSoft, fontWeight: 600 }}>{p.n}</span>
                <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', letterSpacing: '-0.01em' }}>{p.t}</span>
                <span style={{ fontSize: type.small, color: palette.inkSoft, lineHeight: 1.4 }}>{p.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}

// ─── SLIDE 06: ROLE & SCOPE ─────────────────────────────────────────────────
function RoleSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  const responsibilities = [
    'User research & stakeholder interviews',
    'Competitive audit (CA & international)',
    'Card sorting facilitation & analysis',
    'Information architecture definition',
    'Sub-brand visual system design',
    'Hub, rankings, profile & guide templates',
    'Dev handoff and QA',
  ];
  const constraints = [
    { k: 'Existing CMS', v: 'No greenfield. Live within Maclean\'s system, extend the design language.' },
    { k: 'Brand tension', v: 'Distinctly "Education" — without undermining the Maclean\'s masthead.' },
    { k: 'Editorial reality', v: 'Templates intuitive enough for a publishing team not trained in UX.' },
    { k: 'Lean dev', v: 'School-profile filters descoped mid-project to protect launch.' },
  ];
  return (
    <ContentSlide
      tokens={tokens}
      kicker="04 — Role & Scope"
      title={<>I owned the project <em style={{ fontStyle: 'italic' }}>end-to-end</em>.</>}
      page={page}
      total={total}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, flex: 1, alignItems: 'start' }}>
        <div>
          <Eyebrow tokens={tokens}>What I led</Eyebrow>
          <ul style={{ margin: '24px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {responsibilities.map((r) => (
              <li key={r} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 16, alignItems: 'baseline', fontSize: type.body, color: palette.ink, lineHeight: 1.4 }}>
                <span style={{ fontSize: type.micro, color: palette.inkSoft, fontVariantNumeric: 'tabular-nums' }}>—</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow tokens={tokens}>Constraints that shaped decisions</Eyebrow>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' }}>
            {constraints.map((c, i) => (
              <div key={c.k} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, padding: '20px 0', borderTop: i === 0 ? `1px solid ${palette.rule}` : 'none', borderBottom: `1px solid ${palette.rule}`, alignItems: 'baseline' }}>
                <span style={{ fontSize: type.small, color: palette.ink, fontWeight: 600 }}>{c.k}</span>
                <span style={{ fontSize: type.small, color: palette.inkSoft, lineHeight: 1.5 }}>{c.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}

// ─── SLIDE 07: PROCESS ──────────────────────────────────────────────────────
function ProcessSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  const phases = [
    { n: '01', t: 'Discover', d: 'Analytics review surfaced the disconnect: highest time-on-page, zero recirculation.' },
    { n: '02', t: 'Research', d: 'Interviews + competitive audit. Three distinct mental models. Nobody had built education as a destination.' },
    { n: '03', t: 'Define', d: 'Card sorting decided IA. Four pillars: rankings, profiles, guides, student stories.' },
    { n: '04', t: 'Design', d: 'Sub-brand system. Hub, rankings, profile templates, guide templates, feature article layouts.' },
    { n: '05', t: 'Validate', d: 'Prototype testing across all three user groups before launch. Post-launch review.' },
    { n: '06', t: 'Ship', d: 'Annotated specs, dev handoff, QA through to launch. Live at macleans.ca/education.' },
  ];
  return (
    <ContentSlide
      tokens={tokens}
      kicker="05 — Process"
      title={<>From discovery to launch in <em style={{ fontStyle: 'italic' }}>six</em> months.</>}
      page={page}
      total={total}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 24,
        marginTop: 8,
      }}>
        {phases.map((p, i) => (
          <div key={p.n} style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: palette.ink, display: 'inline-block' }} />
              <span style={{ height: 1, flex: 1, background: i === phases.length - 1 ? 'transparent' : palette.rule }} />
            </div>
            <span style={{ fontSize: type.micro, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.inkSoft, fontWeight: 600 }}>Phase {p.n}</span>
            <span style={{ fontSize: type.lead, fontFamily: '"Fraunces", Georgia, serif', lineHeight: 1, letterSpacing: '-0.01em' }}>{p.t}</span>
            <span style={{ fontSize: type.small, color: palette.inkSoft, lineHeight: 1.5 }}>{p.d}</span>
          </div>
        ))}
      </div>

      {/* Artifacts strip — 3 images, no label */}
      <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr 0.6fr', gap: 24, alignItems: 'end' }}>
        {[
          { src: window.__resources.earlyConcept, label: 'Concept exploration', kind: 'desktop' },
          { src: window.__resources.homepageDesktop, label: 'Final hub design', kind: 'desktop' },
          { src: window.__resources.homepageMobile, label: 'Mobile hub', kind: 'mobile' },
        ].map((a) => (
          <div key={a.src} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              background: '#fff',
              border: `1px solid ${palette.rule}`,
              borderRadius: 3,
              overflow: 'hidden',
              height: a.kind === 'mobile' ? 360 : 220,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
              <img
                src={a.src}
                alt={a.label}
                style={{
                  width: '100%',
                  height: a.kind === 'mobile' ? 'auto' : '100%',
                  objectFit: a.kind === 'mobile' ? 'cover' : 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
            <span style={{ fontSize: 24, color: palette.inkSoft, letterSpacing: '0.06em' }}>{a.label}</span>
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}

// ─── SLIDE 08: OUTCOMES (big numbers) ───────────────────────────────────────
function OutcomesSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  const stats = [
    { v: '+47%', l: 'Pages per session', s: '1.5 → 2.2', em: true },
    { v: '~2×', l: 'Avg. engagement time', s: '< 1 min → ~2 min' },
    { v: '+30%', l: 'Total impressions', s: 'within first months' },
    { v: '+', l: 'Ad revenue', s: 'grew alongside traffic' },
  ];
  return (
    <ContentSlide
      tokens={tokens}
      kicker="06 — Outcomes"
      title={<>Engagement nearly <em style={{ fontStyle: 'italic' }}>doubled</em> within months.</>}
      page={page}
      total={total}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 24 }}>
          {stats.map((s, i) => (
            <div key={s.l} style={{
              padding: '32px 28px 32px 0',
              borderTop: `2px solid ${palette.ink}`,
              borderRight: i === stats.length - 1 ? 'none' : `1px solid ${palette.rule}`,
              paddingLeft: i === 0 ? 0 : 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}>
              <span style={{
                fontSize: 132,
                fontFamily: '"Fraunces", Georgia, serif',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontWeight: 350,
                color: palette.ink,
              }}>{s.v}</span>
              <span style={{ fontSize: type.body, color: palette.ink, fontWeight: 500, lineHeight: 1.2 }}>{s.l}</span>
              <span style={{ fontSize: type.small, color: palette.inkSoft }}>{s.s}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 56,
          padding: '32px 0 0',
          borderTop: `1px solid ${palette.rule}`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
        }}>
          <div style={{ fontSize: type.body, lineHeight: 1.5, color: palette.inkSoft }}>
            The structured hub also created new commercial opportunities. Custom ad
            packages and dedicated sponsorship placements became possible for the
            first time — directly supporting revenue growth and giving the sales
            team a product they could actually sell against.
          </div>
          <div style={{ fontSize: type.body, lineHeight: 1.5, color: palette.inkSoft }}>
            Within a year of launch, Maclean's Education had its highest traffic week
            in the site's history — over <strong style={{ color: palette.ink, fontWeight: 600 }}>600,000 visitors in a single week</strong>.
          </div>
        </div>
      </div>
    </ContentSlide>
  );
}

// ─── SLIDE 09: HEADLINE NUMBER ──────────────────────────────────────────────
function HeadlineNumberSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  return (
    <SlideFrame tokens={tokens} bg={palette.ink} style={{ color: '#fff' }}>
      <SlideChrome tokens={tokens} label="06 — Outcomes" page={page} total={total} />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: type.small, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
            Within a year of launch
          </div>
          <div style={{
            marginTop: 24,
            fontSize: 360,
            fontFamily: '"Fraunces", Georgia, serif',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            fontWeight: 300,
          }}>
            600k
          </div>
          <div style={{
            marginTop: 32,
            fontSize: type.subtitle,
            fontFamily: '"Fraunces", Georgia, serif',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.92)',
            fontWeight: 350,
            maxWidth: '14em',
          }}>
            visitors in a single week — the biggest traffic week in the site's history.
          </div>
        </div>
        <div style={{
          aspectRatio: '3/4',
          background: '#000',
          borderRadius: 4,
          overflow: 'hidden',
          maxHeight: '100%',
          alignSelf: 'stretch',
          marginTop: 40,
          marginBottom: 40,
        }}>
          <img
            src={window.__resources.homepageMobile}
            alt="Mobile hub"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
    </SlideFrame>
  );
}

// ─── SLIDE 10: LESSONS ──────────────────────────────────────────────────────
function LessonsSlide({ tokens, page, total }) {
  const { palette, type } = tokens;
  const lessons = [
    { n: '01', t: 'Sub-brand design is a trust problem first.', d: '"Is this part of Maclean\'s or something separate?" is the first question every user asks. Get that relationship wrong and no amount of polish fixes it.' },
    { n: '02', t: 'Card sorting beats assumptions.', d: 'The research gave us the confidence to make opinionated structural decisions — and defend them to stakeholders.' },
    { n: '03', t: 'Ship coherent over complete.', d: 'A focused hub with some gaps beats a delayed "perfect" one. The descoped profile filter didn\'t hold us back.' },
    { n: '04', t: 'Editorial buy-in is part of the UX.', d: 'The best-designed hub degrades if the team publishing to it doesn\'t believe in the architecture. That now shapes how I approach every content-heavy project.' },
  ];
  return (
    <ContentSlide
      tokens={tokens}
      kicker="07 — Lessons Learned"
      title={<>Four things this project <em style={{ fontStyle: 'italic' }}>taught</em> me.</>}
      page={page}
      total={total}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 56, marginTop: 12 }}>
        {lessons.map((l) => (
          <div key={l.n} style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr',
            gap: 28,
            paddingTop: 24,
            borderTop: `1px solid ${palette.rule}`,
          }}>
            <span style={{
              fontSize: type.lead,
              fontFamily: '"Fraunces", Georgia, serif',
              color: palette.ink,
              lineHeight: 1,
              fontWeight: 400,
            }}>{l.n}</span>
            <div>
              <span style={{ fontSize: type.body, fontFamily: '"Fraunces", Georgia, serif', color: palette.ink, lineHeight: 1.2, letterSpacing: '-0.01em', display: 'block' }}>{l.t}</span>
              <span style={{ fontSize: type.small, color: palette.inkSoft, lineHeight: 1.5, marginTop: 12, display: 'block' }}>{l.d}</span>
            </div>
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}

// ─── SLIDE 11: END / COLOPHON ───────────────────────────────────────────────
function EndSlide({ tokens }) {
  const { palette, type, space } = tokens;
  return (
    <SlideFrame tokens={tokens}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1100px' }}>
        <Eyebrow tokens={tokens}>Thank you</Eyebrow>
        <SerifTitle tokens={tokens} size={type.display * 0.95} style={{ marginTop: 32, fontWeight: 350 }}>
          Let's talk.
        </SerifTitle>
        <a
          href="https://macleans.ca/education"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 56,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '22px 36px',
            background: palette.ink,
            color: '#fff',
            fontSize: type.body,
            fontWeight: 500,
            letterSpacing: '0.02em',
            textDecoration: 'none',
            borderRadius: 4,
          }}
        >
          <span>Visit the site</span>
          <span style={{ fontSize: type.body, lineHeight: 1 }}>→</span>
        </a>
        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '24px 80px', fontSize: type.small, color: palette.inkSoft, borderTop: `1px solid ${palette.rule}`, paddingTop: 32 }}>
          <Field tokens={tokens} label="Designer" value="Amos Shaw" />
          <Field tokens={tokens} label="Studio" value="Warshawskis Design Studio" />
          <Field tokens={tokens} label="Live work" value="macleans.ca/education" />
          <Field tokens={tokens} label="Case study" value="03 of 07" />
        </div>
      </div>
    </SlideFrame>
  );
}

// ─── SLIDE INDEX (export to window) ─────────────────────────────────────────
Object.assign(window, {
  useTokens,
  PersonaAvatar,
  CoverSlide,
  DividerSlide,
  OverviewSlide,
  ProblemSlide,
  AudiencesSlide,
  ResearchSlide,
  RoleSlide,
  ProcessSlide,
  OutcomesSlide,
  HeadlineNumberSlide,
  LessonsSlide,
  EndSlide,
});
