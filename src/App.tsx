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
        <div className="hero-media-wrap"><img className="video-float video-float-left-top" src="/d1.1.svg" alt="" /><img className="video-float video-float-left-mid" src="/d1.2.webp" alt="" /><img className="video-float video-float-left-bottom" src="/gmail.svg" alt="" /><img className="video-float video-float-right-top" src="/light_bulb.webp" alt="" /><img className="video-float video-float-right-mid" src="/mailbox.webp" alt="" /><img className="video-float video-float-right-bottom" src="/apple.webp" alt="" /><div className="hero-product"><video className="hero-video" src="/web-homepage-hero-1920x1200_final.mp4" autoPlay muted loop playsInline aria-label="Notion workspace preview" /></div></div>
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

      <section className="content-section" id="features"><div className="section-heading"><span className="eyebrow">ONE WORKSPACE, MANY WAYS TO WORK</span><h2>AI where your team works.</h2><p>Bring your knowledge, projects, and conversations together, then let AI help with the busywork.</p></div><div className="bento-grid"><article className="bento-card capture"><header><span className="eyebrow">CAPTURE KNOWLEDGE</span><h3>Bring everything into one system of record.</h3><a className="bento-arrow" href="#get-started" aria-label="Explore capture"><Icon name="arrow" /></a></header><div className="bento-art"><img src="/1capture_mobile.webp" alt="Notion meeting notes workspace" /><img className="bento-layer layer-capture" src="/1.2Mini_AIMN.webp" alt="" /></div></article><article className="bento-card find"><header><span className="eyebrow">FIND ANSWERS</span><h3>Get answers, instantly—with citations.</h3><a className="bento-arrow" href="#get-started" aria-label="Explore find"><Icon name="arrow" /></a></header><div className="bento-art"><img src="/2.1find_mobile.webp" alt="Notion search answers workspace" /><img className="bento-layer layer-find" src="/2.3image.webp" alt="" /></div></article><article className="bento-card automate"><header><span className="eyebrow">AUTOMATE BUSYWORK</span><h3>Keep work moving 24/7 with agents.</h3><a className="bento-arrow" href="#get-started" aria-label="Explore automate"><Icon name="arrow" /></a></header><div className="bento-art"><img src="/3.1automate_front_desktop.webp" alt="Notion engineering tasks workspace" /><img className="bento-layer layer-automate" src="/3.2image.webp" alt="" /></div></article></div></section>
      <section className="agent-section" id="teams"><div className="section-heading"><h2>See what Notion can do</h2></div><div className="prompt-grid">{[['mailbox.webp', 'Triage product feedback'], ['rock.webp', 'Resolve support tickets in Slack'], ['sign.webp', 'Respond to security alerts faster'], ['apple.webp', 'Automate weekly reporting'], ['light_bulb.webp', 'Create your own developer tools']].map(([image, title]) => <a className="prompt-card" href="#get-started" key={title}><img className="prompt-image" src={`/${image}`} alt="" /><strong>{title}<span className="prompt-arrow"><Icon name="arrow" /></span></strong></a>)}</div></section>
      <section className="proof-section"><div className="section-heading"><span className="eyebrow">BUILT FOR TEAMS THAT SHIP</span><h2>Trusted by teams that ship.</h2></div><div className="proof-grid"><article className="proof-card proof-blue"><img className="proof-portrait" src="/cursor_funder.webp" alt="Michael Truell, co-founder and CEO of Cursor" /><div className="proof-content"><span className="proof-brand"><img src="/cursor.svg" alt="Cursor" /></span><blockquote>“Notion helps us stay small while doing a lot.”</blockquote><small>Michael Truell · Co-founder &amp; CEO</small></div></article><article className="proof-card proof-red"><img className="proof-portrait" src="/faire_founder.webp" alt="Renee Solorzano, Director of Product Design at Faire" /><div className="proof-content"><span className="proof-brand"><i>F</i>faire</span><blockquote>“Thoughtful design speeds up collaboration and decisions.”</blockquote><small>Renee Solorzano · Director of Product Design</small></div></article><article className="proof-card proof-orange"><img className="proof-portrait" src="/ramp_founder.webp" alt="Ben Levick, Head of Internal AI at Ramp" /><div className="proof-content"><span className="proof-brand"><img src="/Ramp.svg" alt="Ramp" /></span><blockquote>“Custom Agents help us build AI tools that do the work.”</blockquote><small>Ben Levick · Head of Internal AI</small></div></article></div></section>
      <section className="endcap" id="get-started"><span className="eyebrow">READY WHEN YOU ARE</span><h2>Get started today.</h2><div className="hero-actions"><a className="hero-cta" href="#top">Get Notion free <Icon name="arrow" /></a><a className="hero-secondary" href="#demo">Request a demo</a></div></section>
      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#top"><Icon name="notion" /><strong>Notion</strong></a><p>One workspace. Every team.</p><div className="footer-social"><a href="#instagram" aria-label="Instagram">◎</a><a href="#x" aria-label="X">𝕏</a><a href="#linkedin" aria-label="LinkedIn">in</a><a href="#youtube" aria-label="YouTube">▶</a></div><div className="footer-meta"><button type="button" className="language-button">◉&nbsp; English (US) <span>⌄</span></button><a href="#cookies">Cookie settings</a><small>© 2026 Notion Labs, Inc.</small></div></div><div className="footer-links"><div><strong>Company</strong><a href="#about">About us</a><a href="#careers">Careers</a><a href="#security">Security</a><a href="#status">Status</a><a href="#terms">Terms &amp; privacy</a><a href="#privacy">Your privacy rights</a></div><div><strong>Download</strong><a href="#ios">iOS &amp; Android</a><a href="#desktop">Mac &amp; Windows</a><a href="#calendar">Calendar</a><a href="#clipper">Web Clipper</a></div><div><strong>Resources</strong><a href="#help">Help center</a><a href="#pricing">Pricing</a><a href="#blog">Blog</a><a href="#community">Community</a><a href="#connections">Connections</a><a href="#templates">Templates</a><a href="#partners">Partner programs</a></div><div><strong>Notion for</strong><a href="#enterprise">Enterprise</a><a href="#startups">Startups</a><a href="#teams">Small business</a><a href="#personal">Personal</a><a className="explore-link" href="#explore">Explore more <Icon name="arrow" /></a></div></div></footer>
    </main>
  )
}

export default App
