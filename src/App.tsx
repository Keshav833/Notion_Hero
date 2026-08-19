import { useEffect, useState } from 'react'
import './App.css'

const changingWords = [
  { text: 'create', color: '#db4b3f', background: '#f9d8d1' },
  { text: 'think', color: '#2675bc', background: '#d9eafb' },
  { text: 'build', color: '#268c54', background: '#d9f0dc' },
  { text: 'scale', color: '#9a6418', background: '#f8e8b5' },
  { text: 'jam', color: '#a0449e', background: '#f1d9ef' },
]

type IconName = 'arrow' | 'chevron' | 'menu' | 'close' | 'notion' | 'sparkle' | 'face' | 'sign' | 'folder' | 'search' | 'bolt'

function Icon({ name }: { name: IconName }) {
  if (name === 'notion') {
    return <img className="notion-logo" src="/notion_logo.png" alt="" />
  }

  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    sparkle: <path d="m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3Z" />,
    face: <><circle cx="12" cy="12" r="8" /><path d="M9 10h.01M15 10h.01M9 15c1.8 1 4.2 1 6 0" /></>,
    sign: <><path d="M12 20V5m0 0H5l3.5 3L5 11h7" /><path d="M12 5h7l-3.5 3 3.5 3h-7" /></>,
    folder: <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h4l2 2h7A1.5 1.5 0 0 1 20 9.5v7A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    bolt: <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" />,
  }

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function App() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex((current) => (current + 1) % changingWords.length), 2200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = (menu: string) => {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  return (
    <main className="page-shell">
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Notion home">
          <Icon name="notion" />
        </a>

        <button className="mobile-toggle" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? 'close' : 'menu'} />
        </button>

        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {['Product', 'Solutions', 'Resources'].map((item) => (
            <div className="nav-menu" key={item}>
              <button type="button" className="nav-link" onClick={() => toggleMenu(item)} aria-expanded={openMenu === item}>
                {item} <Icon name="chevron" />
              </button>
              {openMenu === item && <div className="dropdown"><a href={`#${item.toLowerCase()}`}>Explore {item}</a><a href="#teams">For teams</a></div>}
            </div>
          ))}
          <a className="nav-link" href="#developers">Developers</a>
          <a className="nav-link" href="#enterprise">Enterprise</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a className="nav-link" href="#demo">Request a demo</a>
          <div className="mobile-actions">
            <a className="nav-link" href="#logout">Log out</a>
            <a className="open-button" href="#app">Open Notion <Icon name="arrow" /></a>
          </div>
        </nav>

        <div className="header-actions">
          <a className="nav-link" href="#logout">Log out</a>
          <a className="open-button" href="#app">Open Notion <Icon name="arrow" /></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="avatar-row" aria-label="A team working together">
          <img className="avatar" src="/h1.webp" alt="" />
          <img className="avatar" src="/h2.webp" alt="" />
          <img className="avatar" src="/h3.webp" alt="" />
          <img className="avatar" src="/h4.webp" alt="" />
          <img className="avatar" src="/h5.webp" alt="" />
          <img className="avatar" src="/h6.webp" alt="" />
          <img className="avatar" src="/h7.webp" alt="" />
        </div>
        <h1><span className="hero-line">Where teams and</span><span className="hero-line">agents <span className="headline-accent" style={{ backgroundColor: changingWords[wordIndex].background, color: changingWords[wordIndex].color }}><i style={{ backgroundColor: changingWords[wordIndex].color }} /><span className="word-slide" key={changingWords[wordIndex].text}>{changingWords[wordIndex].text}</span></span> together.</span></h1>
        <p className="hero-subtitle">Capture context, find answers, and automate tasks with AI built for your team.</p>
        <div className="hero-actions"><a className="hero-cta" href="#get-started">Get Notion free <Icon name="arrow" /></a><a className="hero-secondary" href="#demo">Request a demo</a></div>
        <div className="hero-product"><video className="hero-video" src="/web-homepage-hero-1920x1200_final.mp4" autoPlay muted loop playsInline aria-label="Notion workspace preview" /></div>
      </section>

      <section className="logo-strip" aria-label="Trusted by teams at">
        <p className="logo-eyebrow">Trusted by 98% of the Forbes Cloud 100</p>
        <div className="logo-wall">
          <span className="brand-logo"><img src="/OpenAI.svg" alt="OpenAI" /></span>
          <span className="brand-logo"><img src="/Figma.svg" alt="Figma" /></span>
          <span className="brand-logo"><img src="/Ramp.svg" alt="Ramp" /></span>
          <span className="brand-logo"><img src="/cursor.svg" alt="Cursor" /></span>
          <span className="brand-logo"><img src="/Vercel.svg" alt="Vercel" /></span>
          <span className="brand-name brand-nvidia">NVIDIA</span>
          <span className="brand-name brand-volvo">VOLVO</span>
          <span className="brand-name brand-loreal">L'ORÉAL</span>
          <span className="brand-name brand-discord">Discord</span>
          <span className="brand-name brand-lovable">Lovable</span>
          <span className="brand-name brand-password">1Password</span>
          <span className="brand-name brand-affirm">affirm</span>
          <span className="brand-name brand-riot">Riot Games</span>
          <span className="brand-name brand-clay">clay</span>
          <span className="brand-name brand-remote">remote</span>
          <span className="brand-name brand-faire">FAIRE</span>
          <span className="brand-name brand-toyota">TOYOTA</span>
        </div>
      </section>

      <section className="content-section" id="features"><div className="section-heading"><span className="eyebrow">ONE WORKSPACE, MANY WAYS TO WORK</span><h2>AI where your team works.</h2><p>Bring your knowledge, projects, and conversations together, then let AI help with the busywork.</p></div><div className="bento-grid"><article className="bento-card capture"><div><span className="eyebrow">CAPTURE KNOWLEDGE</span><h3>Bring everything into one system of record.</h3><a href="#get-started">Explore <Icon name="arrow" /></a></div><div className="visual capture-visual"><span className="note note-one">Meeting notes</span><span className="note note-two">Launch brief</span><span className="note note-three">Customer insights</span><div className="capture-orbit">+</div></div></article><article className="bento-card find"><div><span className="eyebrow">FIND ANSWERS</span><h3>Get answers, instantly, with citations.</h3><a href="#get-started">Explore <Icon name="arrow" /></a></div><div className="visual find-visual"><div className="search-box"><Icon name="search" /> Where is the latest roadmap?</div><div className="result"><span>AI answer</span><strong>The latest roadmap is in Product / Q3 Launch.</strong><small>2 sources found in your workspace</small></div></div></article><article className="bento-card automate"><div><span className="eyebrow">AUTOMATE BUSYWORK</span><h3>Keep work moving 24/7 with agents.</h3><a href="#get-started">Explore <Icon name="arrow" /></a></div><div className="visual automate-visual"><span className="agent-chip"><Icon name="bolt" /> Weekly reporting agent <b>ON</b></span><span className="flow-line" /><span className="agent-chip muted">Slack <b>→</b> Notion</span><span className="agent-chip muted">Inbox <b>→</b> Action items</span></div></article></div></section>
      <section className="agent-section" id="teams"><div className="section-heading"><span className="eyebrow">CUSTOM AGENTS</span><h2>See what Notion can do.</h2><p>Start with a workflow your team runs every week.</p></div><div className="prompt-grid">{[['mailbox', 'Triage product feedback'], ['folder', 'Resolve support tickets in Slack'], ['sign', 'Respond to security alerts faster'], ['bolt', 'Automate weekly reporting']].map(([icon, title]) => <a className="prompt-card" href="#get-started" key={title}><span className={`prompt-icon ${icon}`}><Icon name={icon as IconName} /></span><strong>{title}</strong><Icon name="arrow" /></a>)}</div></section>
      <section className="proof-section"><div className="section-heading"><span className="eyebrow">BUILT FOR TEAMS THAT SHIP</span><h2>Trusted by teams that ship.</h2></div><div className="proof-grid"><article className="proof-card proof-blue"><span className="proof-brand">cursor</span><blockquote>“Notion helps us stay small while doing a lot.”</blockquote><small>Michael Truell · Co-founder &amp; CEO</small></article><article className="proof-card proof-red"><span className="proof-brand">faire</span><blockquote>“Thoughtful design speeds up collaboration and decisions.”</blockquote><small>Renee Solorzano · Director of Product Design</small></article><article className="proof-card proof-orange"><span className="proof-brand">ramp</span><blockquote>“Custom Agents help us build AI tools that do the work.”</blockquote><small>Ben Levick · Head of Internal AI</small></article></div></section>
      <section className="endcap" id="get-started"><span className="eyebrow">READY WHEN YOU ARE</span><h2>Get started today.</h2><div className="hero-actions"><a className="hero-cta" href="#top">Get Notion free <Icon name="arrow" /></a><a className="hero-secondary" href="#demo">Request a demo</a></div></section>
      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#top"><Icon name="notion" /><strong>Notion</strong></a><p>One workspace. Every team.</p><div className="footer-social"><a href="#instagram">◎</a><a href="#x">𝕏</a><a href="#linkedin">in</a><a href="#youtube">▶</a></div></div><div className="footer-links"><div><strong>Company</strong><a href="#about">About us</a><a href="#careers">Careers</a><a href="#security">Security</a></div><div><strong>Download</strong><a href="#ios">iOS &amp; Android</a><a href="#desktop">Mac &amp; Windows</a><a href="#calendar">Calendar</a></div><div><strong>Resources</strong><a href="#help">Help center</a><a href="#pricing">Pricing</a><a href="#blog">Blog</a><a href="#templates">Templates</a></div><div><strong>Notion for</strong><a href="#enterprise">Enterprise</a><a href="#startups">Startups</a><a href="#personal">Personal</a></div></div><small className="copyright">© 2026 Notion Labs, Inc.</small></footer>
    </main>
  )
}

export default App
