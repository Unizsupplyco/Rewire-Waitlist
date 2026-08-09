import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, ExternalLink, Flame, Heart, LockKeyhole,
  Menu, ShieldCheck, Sparkles, Target, TimerReset, TrendingUp, Users, X
} from 'lucide-react';
import './styles.css';

const HERO_PHONES = '/hero-phone-trio-transparent.png';
const TESTER_GROUP_URL = 'https://groups.google.com/g/rewire-testers';
const TESTER_OPT_IN_URL = 'https://play.google.com/apps/testing/uk.co.rewireapp.rewire';
const TESTER_INSTALL_URL = 'https://play.google.com/store/apps/details?id=uk.co.rewireapp.rewire';

function Brand() {
  return <a className="brand" href="/" aria-label="Rewire home"><img src="/app-logo-square.png" alt="Rewire logo" className="brand-logo" /><span>REWIRE</span></a>;
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
        <a href="/#achievements">Achievements</a><a href="/#how">How it works</a><a href="/#stories">Stories</a><a href="/#faq">FAQ</a>
        <details className="nav-dropdown">
          <summary>Manage Account <ChevronDown /></summary>
          <div className="nav-dropdown-menu">
            <a href="/delete-account">Delete Account</a>
          </div>
        </details>
      </nav>
      <a className="nav-cta" href="/download">Download Now</a>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function Hero() {
  const [phoneLoaded, setPhoneLoaded] = useState(false);

  return <main>
    <section className="hero">
      <div className="hero-inner shell">
        <div className="hero-copy">
          <h1>Quit Porn.<br/>Rebuild Discipline.<br/><span>Starting Today</span></h1>
          <p>Build better habits, take your control back<br className="desktop"/> and rebuild discipline <strong>one day at a time.</strong></p>
          <div className="hero-proof">Join 200+ users</div>
          <div className="hero-store-row" aria-label="App store downloads">
            <a className="store-badge-link google-play" href={TESTER_INSTALL_URL} target="_blank" rel="noreferrer" aria-label="Download Rewire on Google Play">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.94 1.94 0 0 1-.61-1.396V3.21a1.94 1.94 0 0 1 .609-1.396zm11.3 9.072l2.67-2.67-12.82-7.398 10.15 10.068zm0 2.228L4.76 23.182l12.819-7.398-2.67-2.67zm1.114-1.114l3.197-1.846a1.2 1.2 0 0 0 0-2.08l-3.197-1.846-2.58 2.58 2.58 2.58z"/></svg>
              <div className="badge-text">
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </div>
            </a>
            <div className="store-badge-link app-store disabled" title="App Store release coming soon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.56-.68.95-1.62.84-2.57-.82.03-1.83.55-2.42 1.24-.52.6-.98 1.56-.86 2.49.92.07 1.88-.47 2.44-1.16z"/></svg>
              <div className="badge-text">
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
              <span className="coming-soon-pill">Coming Soon</span>
            </div>
          </div>
          <div className="hero-tester-cta">
            <a className="tester-button" href="/download">Download Now <ArrowRight /></a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            <a className="tiktok-link" href="https://www.tiktok.com/@rewire.app0" aria-label="Follow Rewire on TikTok">
              <img src="/tiktok-icon.png" alt="" />
              <span>Join us on TikTok</span>
            </a>
          </div>
        </div>
        <div className={phoneLoaded ? 'hero-device-wrap phone-ready' : 'hero-device-wrap'}>
          <img src={HERO_PHONES} onLoad={() => setPhoneLoaded(true)} alt="Rewire app screens on three iPhones" />
        </div>
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
  ['/achievement-wheel/broken-chain.png', 'Break the Cycle achievement'],
  ['/achievement-wheel/clock-wings.png', 'Momentum achievement'],
  ['/achievement-wheel/sun-steps.png', 'New Dawn achievement'],
  ['/achievement-wheel/crown.png', 'Crown of Discipline achievement'],
  ['/achievement-wheel/peace-dove.png', 'Dove of Peace achievement'],
  ['/achievement-wheel/medal-3.png', '3 Month Milestone achievement'],
  ['/achievement-wheel/blossom-tree.png', 'Growth Tree achievement'],
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
  ['Is REWIRE free?', 'REWIRE is currently available to Android testers. Launch pricing will be shared as the app moves toward public release.'],
  ['How do I access REWIRE?', 'Become a tester by joining the Rewire Google Group, opting in on Google Play, then installing the Android app.'],
  ['What features does REWIRE include?', 'REWIRE includes urge logging, streak tracking, trigger awareness, analytics, emergency tools, distraction games, breathing resets, and progress milestones.'],
  ['What does the urge button do?', 'The urge button gives you a fast way to log an urge, identify what caused it, and choose a positive response before the cycle takes over.'],
  ['How does REWIRE track progress?', 'REWIRE turns your clean days, logged urges, triggers, responses, and daily missions into simple analytics so you can see what is improving.'],
  ['How does the achievement system work?', 'Achievements mark consistency milestones such as 7 days, 14 days, 1 month, and longer streaks so progress feels visible and rewarding.'],
  ['Is REWIRE private?', 'Yes. Rewire is designed around private, practical recovery support, including tester access through Google Play.']
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

function formatInlinePolicyText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return part;
  });
}

function PrivacyPolicyPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/privacy-policy.md')
      .then(response => response.text())
      .then(setContent)
      .catch(() => setContent(''));
  }, []);

  const lines = content
    .replace(/^# Privacy Policy for Rewire\s*/i, '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  return <div className="policy-page" id="top">
    <Header />
    <main className="policy-main shell">
      <div className="policy-hero">
        <div className="pill-label">Legal</div>
        <h1>Privacy Policy</h1>
        <p>How Rewire handles your information, privacy, and data rights.</p>
      </div>
      <article className="policy-card">
        {lines.map((line, index) => {
          if (line.startsWith('## ')) return <h2 key={index}>{line.replace(/^##\s+/, '')}</h2>;
          if (line.startsWith('# ')) return null;
          if (line.startsWith('* ')) return <ul key={index}><li>{formatInlinePolicyText(line.replace(/^\*\s+/, ''))}</li></ul>;
          return <p key={index}>{formatInlinePolicyText(line)}</p>;
        })}
      </article>
    </main>
    <Footer />
  </div>;
}

function DeleteAccountPage() {
  const [form, setForm] = useState({
    accountEmail: '',
    confirmEmail: '',
    reason: '',
    additionalInfo: '',
    confirmed: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm(current => ({ ...current, [field]: value }));
    setErrorMessage('');
  };

  async function submitDeletionRequest(e) {
    e.preventDefault();
    const accountEmail = form.accountEmail.trim();
    const confirmEmail = form.confirmEmail.trim();
    const reason = form.reason.trim();
    const additionalInfo = form.additionalInfo.trim();
    const normalizedAccountEmail = accountEmail.toLowerCase();
    const normalizedConfirmEmail = confirmEmail.toLowerCase();

    if (!accountEmail || !confirmEmail || !reason) {
      setErrorMessage('Please complete the required fields.');
      setSubmitted(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedAccountEmail)) {
      setErrorMessage('Enter a valid Rewire account email address.');
      setSubmitted(false);
      return;
    }
    if (normalizedAccountEmail !== normalizedConfirmEmail) {
      setErrorMessage('Both email fields must match.');
      setSubmitted(false);
      return;
    }
    if (!form.confirmed) {
      setErrorMessage('Please confirm that you understand the account deletion request.');
      setSubmitted(false);
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountEmail: normalizedAccountEmail,
          confirmEmail: normalizedConfirmEmail,
          reason,
          additionalInfo
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok && data.error) {
        setErrorMessage(data.error);
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      setSubmitted(true);
      setSubmitting(false);
    }
  }

  return <div className="delete-account-page" id="top">
    <Header />
    <main className="policy-main shell">
      <div className="policy-hero">
        <div className="pill-label">Account</div>
        <h1>Delete your Rewire account</h1>
        <p>You can request deletion of your Rewire account and associated personal data using this page.</p>
      </div>
      <section className="delete-account-card" aria-labelledby="delete-account-title">
        <div className="delete-copy">
          <h2 id="delete-account-title">Delete your Rewire account</h2>
          <p>You can request deletion of your Rewire account and associated personal data using this page.</p>
          <p>To delete your account, please complete the form below using the same email address connected to your Rewire account.</p>
          <p>Once we receive your request, we will verify the account and delete the account and associated personal data, unless we are required to keep limited information for legal, security, or fraud-prevention reasons.</p>
          <p>Some anonymous or non-identifying data may remain if it cannot be linked back to your account.</p>
        </div>
        <form className="delete-form" onSubmit={submitDeletionRequest} noValidate>
          <label>
            <span>Email address used for the Rewire account</span>
            <input
              type="email"
              required
              value={form.accountEmail}
              onChange={e => updateField('accountEmail', e.target.value)}
              placeholder="Enter the email used for your Rewire account"
            />
          </label>
          <label>
            <span>Confirm email address</span>
            <input
              type="email"
              required
              value={form.confirmEmail}
              onChange={e => updateField('confirmEmail', e.target.value)}
              placeholder="Confirm your account email"
            />
          </label>
          <label>
            <span>Reason for deleting account</span>
            <textarea
              required
              value={form.reason}
              onChange={e => updateField('reason', e.target.value)}
              placeholder="Tell us why you want to delete your account"
            />
          </label>
          <label>
            <span>Additional information</span>
            <textarea
              value={form.additionalInfo}
              onChange={e => updateField('additionalInfo', e.target.value)}
              placeholder="Add anything else we should know"
            />
          </label>
          <label className="delete-checkbox">
            <input
              type="checkbox"
              checked={form.confirmed}
              onChange={e => updateField('confirmed', e.target.checked)}
            />
            <span>I understand that deleting my Rewire account may permanently remove my account and associated data.</span>
          </label>
          {errorMessage && <p className="delete-form-message error" role="alert">{errorMessage}</p>}
          {submitted && <p className="delete-form-message success" role="status">Your deletion request has been submitted to unizsupplyco@gmail.com. We will verify your account and process your request shortly.</p>}
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Delete my account'}</button>
        </form>
      </section>
    </main>
    <Footer />
  </div>;
}

function DownloadPage() {
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent || '');
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent || '');

  return <div className="download-page" id="top">
    <Header />
    <main className="download-main shell">
      <div className="download-card">
        <img src="/app-logo-square.png" alt="Rewire app icon" className="download-app-icon" />
        <div className="download-os-pill">
          {isAndroid ? 'Android Ready' : isIOS ? 'App Store Coming Soon' : 'Google Play Available'}
        </div>
        <h1>Get Rewire</h1>
        <p>Break cycles, beat urges, and rebuild control with your private discipline system.</p>
        <a className="download-cta-btn" href={TESTER_INSTALL_URL} target="_blank" rel="noreferrer">
          Download Rewire <ArrowRight />
        </a>
        <div className="download-fallback">
          <p>If Rewire is already installed on your device, opening this link directly will launch the app. If not, tap above to view Rewire on Google Play.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>;
}

function Waitlist() {
  return <section className="cta shell" id="waitlist">
    <div className="cta-copy"><h2>One private app.<br/>A stronger you.</h2><p>Testing is open on Android. Join the Rewire tester group, opt in through Google Play, then install the app on your device.</p>
      <div className="tester-cta-row">
        <span className="cta-arrow light" aria-hidden="true"></span>
        <a className="tester-button dark" href="/download">Download Now <ArrowRight/></a>
      </div>
      <div className="privacy"><ShieldCheck/> Private by design. <a href="/privacy-policy">Privacy policy</a>.</div>
    </div>
    <div className="cta-phone"><img className="cta-device-art" src="/cta-two-phones.png" alt="Rewire streak and distraction games app screens"/></div>
  </section>;
}

function Footer() { return <footer id="privacy"><div className="shell footer-grid"><div><Brand/><p>Private tools for breaking cycles,<br/>beating urges, and rebuilding discipline.</p><div className="socials"><span>●</span><span>●</span><span>●</span></div></div><div><b>Product</b><a href="/features">Features</a><a href="/#how">How it works</a><a href="/download">Download App</a></div><div><b>Company</b><a href="/#stories">Stories</a><a href="#">About</a><a href="#">Contact</a></div><div><b>Legal</b><a href="/privacy-policy">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div></div><div className="shell footer-bottom"><span>© 2026 Rewire. All rights reserved.</span><span>Made for better days.</span></div></footer>; }

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
      <a className="features-cta" href="/download">Download Now <ArrowRight /></a>
    </main>
    <Footer />
  </div>;
}

const testerSteps = [
  ['Join the Google Group', 'Use the same Google account you use on your Android device. This gives your account access to the private test.', TESTER_GROUP_URL, 'Join group', <Users />],
  ['Opt in on Google Play', 'After joining the group, open the testing page and choose to become a tester for Rewire.', TESTER_OPT_IN_URL, 'Opt in', <Check />],
  ['Install on Android', 'Once opted in, install Rewire from Google Play on your Android phone and start testing.', TESTER_INSTALL_URL, 'Install app', <ArrowRight />],
];

function TesterPage() {
  return <div className="tester-page" id="top">
    <Header />
    <main className="tester-main shell">
      <section className="tester-hero">
        <div className="pill-label">Android testing</div>
        <h1>Become a Rewire tester</h1>
        <p>Follow these three steps in order so Google Play can give your account access to the Android test build.</p>
        <a className="tester-button" href={TESTER_GROUP_URL} target="_blank" rel="noreferrer">Start with the Google Group <ExternalLink /></a>
      </section>
      <section className="tester-steps" aria-label="Tester setup steps">
        {testerSteps.map(([title, copy, href, label, icon], index) =>
          <article className="tester-step" key={title}>
            <div className="tester-step-number">0{index + 1}</div>
            <div className="tester-step-icon">{icon}</div>
            <h2>{title}</h2>
            <p>{copy}</p>
            <a href={href} target="_blank" rel="noreferrer">{label} <ExternalLink /></a>
          </article>
        )}
      </section>
      <section className="tester-note">
        <ShieldCheck />
        <p>Complete the Google Group step first. If you skip it, Google Play may not recognize you as an approved tester.</p>
      </section>
    </main>
    <Footer />
  </div>;
}

function SuccessPage(){
  return <div className="success-page" id="top"><Header/><main className="success-panel"><div className="success-icon"><CircleCheck/></div><div className="pill-label">Waitlist confirmed</div><h1>You’re on the list.</h1><p>Rewire is launching soon. We’ll let you know when early access is ready.</p><a href="/">Back to Rewire <ArrowRight/></a></main></div>;
}

function App(){
  const path = window.location.pathname.replace(/\/$/,'');
  if(path === '/download') return <DownloadPage/>;
  if(path === '/features') return <AppFeaturesPage/>;
  if(path === '/become-a-tester') return <TesterPage/>;
  if(path === '/privacy-policy') return <PrivacyPolicyPage/>;
  if(path === '/delete-account') return <DeleteAccountPage/>;
  if(path === '/success') return <SuccessPage/>;
  return <><Header/><Hero/><ScrollStatement/><FeatureShowcase/><DistractionSection/><Effortless/><Achievements/><HowItWorks/><Testimonials/><FAQ/><Waitlist/><Footer/></>;
}

createRoot(document.getElementById('root')).render(<><App/><Analytics/></>);
