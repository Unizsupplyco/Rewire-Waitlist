import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, Check, ChevronLeft, ChevronRight, CircleCheck, Flame, Heart, LockKeyhole,
  Menu, ShieldCheck, Sparkles, Target, TimerReset, TrendingUp, X
} from 'lucide-react';
import './styles.css';
import { supabase } from './supabase';

const PHONE = '/rewire-phone-transparent.png';

function Brand() {
  return <a className="brand" href="/" aria-label="Rewire home">REWIRE</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);
  return <header className={scrolled ? 'header scrolled' : 'header'} id="top">
    <div className="nav shell">
      <Brand />
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <a href="#features">Features</a><a href="#how">How it works</a><a href="#stories">Stories</a><a href="#privacy">Privacy</a>
      </nav>
      <a className="nav-cta" href="/#waitlist">Join waitlist</a>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function Hero() {
  const [loadedPhones, setLoadedPhones] = useState([]);
  const markPhoneLoaded = (phone) => setLoadedPhones(current => current.includes(phone) ? current : [...current, phone]);
  return <main>
    <section className="hero shell">
      <svg className="hero-waitlist-arrow" viewBox="0 0 100 150" aria-hidden="true">
        <path className="arrow-line" d="M27 145 C15 128 43 115 29 97 C17 81 48 67 37 50 C29 37 54 27 72 8" />
        <path className="arrow-head" d="M60 12 L72 8 L69 21" />
      </svg>
      <h1>Your Trusted Partner<br/>for <span>Breaking the Cycle</span></h1>
      <p>Build better habits, take your control back<br className="desktop"/> and rebuild discipline — <strong>one day at a time.</strong></p>
      <a className="store-row" href="#waitlist" aria-label="Join the Rewire launch waitlist">
        <img src="/store-badges.png" alt="Coming soon on Google Play and the App Store" />
      </a>
      <div className={loadedPhones.length === 3 ? 'hero-art phones-ready' : 'hero-art'}>
        <img className="phone-left" src="/distraction-games-phone.png" onLoad={() => markPhoneLoaded('left')} alt="Rewire distraction games screen" />
        <img className="phone-secondary" src="/rewire-success-phone.png" onLoad={() => markPhoneLoaded('right')} alt="Rewire successfully logged screen" />
        <img className="hero-phone main-phone" src={PHONE} onLoad={() => markPhoneLoaded('main')} alt="Rewire app clean streak screen" />
      </div>
    </section>
  </main>;
}

function FeatureShowcase() {
  const [activeMedia, setActiveMedia] = useState(0);
  const mediaSlides = [
    ['/urge-intensity-phone.png', 'Rewire urge intensity screen'],
    ['/urge-triggers-phone.png', 'Rewire urge triggers screen'],
    ['/rewire-success-phone.png', 'Rewire successfully logged urge screen'],
  ];
  const moveMedia = (direction) => setActiveMedia(current => (current + direction + mediaSlides.length) % mediaSlides.length);
  return <section className="section shell feature-split" id="features">
    <div className="orange-stage">
      <div className="feature-media" aria-live="polite">
        <img
          key={activeMedia}
          className="urge-carousel-phone"
          src={mediaSlides[activeMedia][0]}
          alt={mediaSlides[activeMedia][1]}
        />
      </div>
      <div className="media-controls" aria-label="Feature media controls">
        <button type="button" onClick={() => moveMedia(-1)} aria-label="Show previous media"><ChevronLeft /></button>
        <div className="media-dots" aria-hidden="true">{mediaSlides.map((_, index) => <i key={index} className={activeMedia === index ? 'active' : ''}></i>)}</div>
        <button type="button" onClick={() => moveMedia(1)} aria-label="Show next media"><ChevronRight /></button>
      </div>
    </div>
    <div className="section-copy">
      <h2>Respond with control</h2>
      <p>Choose a response like a cold shower, walk, prayer, breathing reset, or emergency mode — then build proof that you can interrupt the cycle.</p>
      <div className="response-steps" aria-label="Three-step response process">
        <div><span><TimerReset /></span><b>Log the urge</b><small>Notice the moment</small></div>
        <div><span><CircleCheck /></span><b>Respond positively</b><small>Choose your reset</small></div>
        <div><span><TrendingUp /></span><b>Build discipline</b><small>Strengthen the pattern</small></div>
      </div>
    </div>
  </section>;
}

function DistractionSection() {
  return <section className="section shell distraction-section">
    <div className="section-copy">
      <h2>Distract the urge.<br/>Regain control</h2>
      <p>Redirect your attention when an urge hits. Learn through short lessons, play focus-building games, use breathing exercises, sound therapy, and emergency tools until the moment passes.</p>
    </div>
    <div className="distraction-art">
      <img src="/emergency-tools.png" alt="Rewire emergency tools including games, breathing, and sound therapy" />
    </div>
  </section>;
}

function Effortless() {
  return <section className="section shell effortless">
    <div className="section-copy">
      <h2>Track your analytics<br/>in real-time</h2>
      <p>See your streaks, urges, triggers, and progress update as you log — so you always know what’s improving and what needs attention.</p>
      <a className="orange-button" href="/features">Explore Rewire <ArrowRight/></a>
    </div>
    <div className="photo-card analytics-card">
      <img className="analytics-phone analytics-stats" src="/analytics-stats-phone.png" alt="Rewire analytics stats screen" />
      <img className="analytics-phone analytics-overview" src="/analytics-overview-phone.png" alt="Rewire recovery growth analytics screen" />
    </div>
  </section>;
}

const steps = [
  ['Track your streak', 'Choose your goals and keep your clean-day progress visible.', <Sparkles/>],
  ['Block your urge', 'Use practical tools built for moments when urges feel strongest.', <Target/>],
  ['Stay on track', 'Complete small daily missions and keep your momentum visible.', <Check/>],
  ['See real progress', 'Watch consistency become confidence, discipline, and control.', <TrendingUp/>]
];

function HowItWorks() {
  return <section className="how" id="how">
    <div className="shell">
      <div className="center-heading"><div className="pill-label">How it works</div><h2>From first reset to<br/>lasting change</h2><p>Rewire turns recovery into a clear daily system — practical,<br/>private, and designed to move with you.</p></div>
      <div className="steps-grid">
        <div className="step-column"><span className="connector-hub" aria-hidden="true"></span>{steps.slice(0,2).map((s,i)=><Step key={s[0]} item={s} n={i+1}/>)}</div>
        <div className="how-phone"><img src="/streak-73-phone.png" alt="Rewire 73-day clean streak dashboard"/></div>
        <div className="step-column"><span className="connector-hub" aria-hidden="true"></span>{steps.slice(2).map((s,i)=><Step key={s[0]} item={s} n={i+3}/>)}</div>
      </div>
    </div>
  </section>;
}

function Step({item,n}) { return <div className="step-card"><div className="step-icon">{item[2]}</div><small>0{n}</small><h3>{item[0]}</h3><p>{item[1]}</p></div>; }

const testimonials = [
  ['“For the first time, I don’t feel like I’m fighting alone. The urge plan gets me through the hardest ten minutes.”','J','James, 28'],
  ['“The daily missions are simple enough to do, but they’ve completely changed how I think about discipline.”','M','Marcus, 31'],
  ['“Private, calm, and actually useful. Seeing my clean days build up has restored my confidence.”','A','Adam, 25']
];

function Testimonials() {
  return <section className="section shell testimonials" id="stories">
    <div className="center-heading"><h2>Real change, built one<br/>day at a time</h2><p>Honest words from people rebuilding control with Rewire.</p></div>
    <div className="testimonial-row">{testimonials.map(([q,a,n])=><article className="quote" key={n}><div className="stars">★★★★★</div><p>{q}</p><div className="person-row"><span>{a}</span><div><b>{n}</b><small>Early Rewire member</small></div></div></article>)}</div>
  </section>;
}

function Waitlist() {
  const [email,setEmail]=useState('');
  const [promoCode,setPromoCode]=useState('');
  const [status,setStatus]=useState('idle');
  const [errorMessage,setErrorMessage]=useState('');
  async function submit(e){
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)){
      setStatus('error');
      setErrorMessage('Enter a valid email address.');
      return;
    }
    if(!supabase){
      setStatus('error');
      setErrorMessage('Waitlist setup is incomplete. Add the Supabase environment variables.');
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    const normalizedPromoCode = promoCode.trim() || null;
    const { error } = await supabase.from('waitlist').insert({ email: normalizedEmail, promo_code: normalizedPromoCode, source: 'website' });
    if(error && error.code !== '23505'){
      setStatus('error');
      setErrorMessage('We could not add you right now. Please try again.');
      return;
    }
    window.location.assign('/success');
  }
  return <section className="cta shell" id="waitlist">
    <div className="cta-copy"><h2>One private app.<br/>A stronger you.</h2><p>Be first to know when Rewire launches. Get early access and practical updates — never spam.</p>
      <form onSubmit={submit} noValidate>
        <label><span className="sr-only">Email address</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" aria-invalid={status==='error'} /></label>
        <label><span className="sr-only">Promo code</span><input value={promoCode} onChange={e=>setPromoCode(e.target.value)} placeholder="Promo code (optional)" maxLength={50} /></label>
        <button disabled={status==='loading'}>{status==='loading'?'Joining…':'Join waitlist'} <ArrowRight/></button>
        {status==='error' && <small className="error" role="alert">{errorMessage}</small>}
      </form>
      <div className="privacy"><ShieldCheck/> Private by design. Unsubscribe anytime.</div>
    </div>
    <div className="cta-phone"><img className="cta-device-art" src="/cta-two-phones.png" alt="Rewire streak and distraction games app screens"/></div>
  </section>;
}

function Footer() { return <footer id="privacy"><div className="shell footer-grid"><div><Brand/><p>Private tools for breaking cycles,<br/>beating urges, and rebuilding discipline.</p><div className="socials"><span>●</span><span>●</span><span>●</span></div></div><div><b>Product</b><a href="#features">Features</a><a href="#how">How it works</a><a href="#waitlist">Waitlist</a></div><div><b>Company</b><a href="#stories">Stories</a><a href="#">About</a><a href="#">Contact</a></div><div><b>Legal</b><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div></div><div className="shell footer-bottom"><span>© 2026 Rewire. All rights reserved.</span><span>Made for better days.</span></div></footer>; }

const appFeatures = [
  ['Block the urge', 'Interrupt the moment immediately, then choose a positive response before the urge takes control.', '/feature-block-urge.png'],
  ['Distraction tools', 'Use focused games, breathing resets, sound therapy, and emergency tools to redirect attention.', '/feature-distraction-games.png'],
  ['Real-time analytics', 'Understand your streaks, urges, recovery growth, and the patterns that need attention.', '/feature-real-time-analytics.png'],
  ['Trigger awareness', 'Identify what caused an urge and build a clearer picture of your personal patterns.', '/feature-trigger-awareness.png'],
  ['Clean streak tracking', 'Make progress visible and turn each clean day into proof that change is happening.', '/feature-clean-streak.png'],
  ['Emergency support', 'Access practical tools immediately when an urge feels strongest and you need a next step.', '/emergency-tools.png'],
];

function AppFeaturesPage() {
  return <div className="features-page" id="top">
    <Header />
    <main className="features-main shell">
      <div className="features-heading"><div className="pill-label">App Features</div><h1>Explore the features</h1><p>Private, practical tools designed to help you interrupt urges, understand your patterns, and rebuild control.</p></div>
      <div className="features-gallery">{appFeatures.map(([title, copy, image], index) =>
        <article className={`app-feature-card feature-${index + 1}`} key={title}>
          <div className="app-feature-visual"><img src={image} alt={`${title} in the Rewire app`} /></div>
          <div className="app-feature-copy"><h2>{title}</h2><p>{copy}</p></div>
        </article>)}
      </div>
      <a className="features-cta" href="/#waitlist">Join the waitlist <ArrowRight /></a>
    </main>
    <Footer />
  </div>;
}

function SuccessPage(){
  return <div className="success-page" id="top"><Header/><main className="success-panel"><div className="success-icon"><CircleCheck/></div><div className="pill-label">Waitlist confirmed</div><h1>You’re on the list.</h1><p>Rewire is launching soon. We’ll let you know when early access is ready.</p><a href="/">Back to Rewire <ArrowRight/></a></main></div>;
}

function App(){
  const path = window.location.pathname.replace(/\/$/,'');
  if(path === '/features') return <AppFeaturesPage/>;
  if(path === '/success') return <SuccessPage/>;
  return <><Header/><Hero/><FeatureShowcase/><DistractionSection/><Effortless/><HowItWorks/><Testimonials/><Waitlist/><Footer/></>;
}

createRoot(document.getElementById('root')).render(<App/>);
