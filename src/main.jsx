import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
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
        <a href="#purpose">Purpose</a><a href="#control">Control</a><a href="#distract">Distract</a><a href="#analytics">Analytics</a><a href="#achievements">Achievements</a><a href="#how">How it works</a><a href="#stories">Stories</a><a href="#faq">FAQ</a>
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

function ScrollStatement() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const words = 'We built Rewire to help you interrupt urges, understand your patterns, reclaim control, and become the disciplined version of yourself you know is possible.'.split(' ');

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return <section className="scroll-statement" ref={sectionRef} id="purpose" aria-label="Why Rewire exists">
    <div className="scroll-statement-inner shell">
      <p>{words.map((word, index) => {
        const wordProgress = Math.min(1, Math.max(0, progress * words.length - index));
        return <span key={`${word}-${index}`} style={{ '--word-progress': wordProgress }}>{word}{' '}</span>;
      })}</p>
    </div>
  </section>;
}

function FeatureShowcase() {
  const [activeMedia, setActiveMedia] = useState(0);
  const mediaSlides = [
    ['/urge-intensity-phone.png', 'Rewire urge intensity screen'],
    ['/urge-triggers-phone.png', 'Rewire urge triggers screen'],
    ['/rewire-success-phone.png', 'Rewire successfully logged urge screen'],
  ];
  const moveMedia = (direction) => setActiveMedia(current => (current + direction + mediaSlides.length) % mediaSlides.length);
  return <section className="section shell feature-split" id="control">
    <div className="orange-stage">
      <div className="feature-media" aria-live="polite">
        <img
          key={activeMedia}
          className={`urge-carousel-phone urge-slide-${activeMedia + 1}`}
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
  return <section className="section shell distraction-section" id="distract">
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
  return <section className="section shell effortless" id="analytics">
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

const achievementBadges = [
  ['/achievement-wheel/7-days.png', '7 Days achievement'],
  ['/achievement-wheel/14-days.png', '14 Days achievement'],
  ['/achievement-wheel/1-month.png', '1 Month achievement'],
  ['/achievement-wheel/3-months.png', '3 Months achievement'],
  ['/achievement-wheel/4-months.png', '4 Months achievement'],
  ['/achievement-wheel/freedom.png', 'Freedom achievement'],
];

function Achievements() {
  const wheelRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    const track = trackRef.current;
    if (!wheel || !track) return;
    let frame;
    let lastTime = performance.now();
    let offset = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const positionBadges = () => {
      const firstGroup = track.querySelector('.achievement-wheel-group');
      if (!firstGroup) return;
      const groupWidth = firstGroup.offsetWidth;
      if (!offset) offset = -groupWidth;
      const center = wheel.clientWidth / 2;
      [...track.querySelectorAll('.achievement-wheel-item')].forEach(item => {
        const itemCenter = item.offsetLeft + offset + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - center);
        const focus = Math.max(0, 1 - distance / (wheel.clientWidth * .46));
        item.style.transform = `translateY(${10 - focus * 30}px) scale(${.72 + focus * .28})`;
        item.style.opacity = `${.38 + focus * .62}`;
        item.style.zIndex = `${Math.round(focus * 10)}`;
      });
      track.style.transform = `translate3d(${offset}px,0,0)`;
      return groupWidth;
    };

    const animate = time => {
      const groupWidth = positionBadges();
      if (groupWidth && !reducedMotion) {
        offset -= Math.min(40, time - lastTime) * .032;
        if (offset <= -groupWidth * 2) offset += groupWidth;
      }
      lastTime = time;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <section className="achievements-section" id="achievements">
    <div className="achievements-heading shell">
      <div className="pill-label">Achievements</div>
      <h2>Unlock unique achievements</h2>
      <p>Turn every milestone into visible proof of the discipline you’re building.</p>
    </div>
    <div className="achievement-wheel" ref={wheelRef} aria-label="Achievement badge conveyor">
      <div className="achievement-wheel-track" ref={trackRef}>
        {[0, 1, 2, 3].map(group => <div className="achievement-wheel-group" aria-hidden={group === 1 ? undefined : 'true'} key={group}>
          {achievementBadges.map(([image, alt]) => <div className="achievement-wheel-item" key={`${group}-${image}`}>
            <img src={image} alt={group === 0 ? alt : ''} />
          </div>)}
        </div>)}
      </div>
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

const faqs = [
  ['What is REWIRE?', 'REWIRE is a private self-control app that helps you track clean streaks, log urges, understand triggers, and choose healthier responses in the moment.'],
  ['Is REWIRE free?', 'REWIRE is currently in waitlist mode. Early access details and launch pricing will be shared with people who join the waitlist first.'],
  ['How do I access REWIRE?', 'Join the waitlist with your email address. When early access opens, you will receive the next steps directly by email.'],
  ['What features does REWIRE include?', 'REWIRE includes urge logging, streak tracking, trigger awareness, analytics, emergency tools, distraction games, breathing resets, and progress milestones.'],
  ['What does the urge button do?', 'The urge button gives you a fast way to log an urge, identify what caused it, and choose a positive response before the cycle takes over.'],
  ['How does REWIRE track progress?', 'REWIRE turns your clean days, logged urges, triggers, responses, and daily missions into simple analytics so you can see what is improving.'],
  ['How does the achievement system work?', 'Achievements mark consistency milestones such as 7 days, 14 days, 1 month, and longer streaks so progress feels visible and rewarding.'],
  ['Is REWIRE private?', 'Yes. The landing page waitlist only collects your email and optional approved promo code. The product is designed around private, practical recovery support.']
];

function FAQ() {
  return <section className="faq-section shell" id="faq">
    <div className="faq-heading">
      <div className="pill-label">FAQ</div>
      <h2>Frequently asked questions</h2>
      <p>Quick answers about REWIRE, early access, privacy, and how the app helps you rebuild control.</p>
    </div>
    <div className="faq-list">
      {faqs.map(([question, answer]) =>
        <details className="faq-item" key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      )}
    </div>
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
    const normalizedPromoCode = promoCode.trim().toUpperCase();
    if(normalizedPromoCode && normalizedPromoCode !== 'PRAISEFRED'){
      setStatus('error');
      setErrorMessage('That promo code is not valid.');
      return;
    }
    if(!supabase){
      setStatus('error');
      setErrorMessage('Waitlist setup is incomplete. Add the Supabase environment variables.');
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    const { error } = await supabase.from('waitlist').insert({ email: normalizedEmail, promo_code: normalizedPromoCode || null, source: 'website' });
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
        <label><span className="sr-only">Promo code</span><input value={promoCode} onChange={e=>setPromoCode(e.target.value.toUpperCase())} placeholder="Promo code (optional)" autoCapitalize="characters" autoCorrect="off" spellCheck="false" maxLength={50} /></label>
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
  return <><Header/><Hero/><ScrollStatement/><FeatureShowcase/><DistractionSection/><Effortless/><Achievements/><HowItWorks/><Testimonials/><FAQ/><Waitlist/><Footer/></>;
}

createRoot(document.getElementById('root')).render(<><App/><Analytics/></>);
