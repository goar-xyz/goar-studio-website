/* ============================================================================
 * GOAR STUDIO WEBSITE CONTROLLER
 * Orchestrates:
 *   - Ink Dark / Paper Light theme sync across ALL mounted 1-to-1 phone instances
 *   - Framer-style scroll reveals (IntersectionObserver + immediate fold check)
 *   - 5 viewport-aware Animated Clip Scenario Phones + synchronized Step Storyboards
 *   - Well-Known Companies Brand Strip & 5-Star Showcase Cards
 *   - Tabbed Open Ecosystem Drawer + 14-Screen Hands-On Interactive Sandbox
 *   - Verbatim Legal & Compliance Hub
 * ============================================================================ */

(function () {
  const TOUR_STOPS = [
    {
      id: 'welcome',
      label: 'Ask · Home',
      dot: 'var(--m-top-ask)',
      caption: '<strong>Empty Centerpiece &amp; Agora Composer:</strong> Pure Monochrome Ink &amp; Bone surface with the authentic Goar mark, 4-control left pill (<code>+</code>, Model Picker, Context Ring, Quick Settings <code>⋮</code>), and 6-bar voice waveform button.'
    },
    {
      id: 'chat-thinking',
      label: 'Thinking & Tools',
      dot: 'var(--m-cmp-model)',
      caption: '<strong>Collapsible Reasoning &amp; Tool Timeline:</strong> Watch multi-step thinking blocks, live tool badges (<code>workspace_read</code>, <code>shell_exec</code>), syntax code blocks, and one-tap context compaction.'
    },
    {
      id: 'slash',
      label: 'Slash Commands /',
      dot: 'var(--m-cmp-sparkle)',
      caption: '<strong>Vibe Command Palette:</strong> Type <code>/</code> for 9 Matte Bold Pop commands (<code>/skill</code>, <code>/subagent</code>, <code>/plan</code>, <code>/mode</code>, <code>/build</code>, <code>/compact</code>) or <code>@</code> to consult specialized agents.'
    },
    {
      id: 'voice',
      label: 'Live Voice Orb',
      dot: 'var(--m-cmp-mic)',
      caption: '<strong>Static-Until-Talking Fluid Blob:</strong> Hold the round voice button for 2 seconds in the app (or click the orb now) to cycle silent pearl sphere → listening ripples → thinking drift → speaking waves.'
    },
    {
      id: 'imagine',
      label: 'Imagine Studio',
      dot: 'var(--m-top-imagine)',
      caption: '<strong>Multi-Provider Media Holster:</strong> Switch Video / Image / Audio across Veo 3.1, Kling, Luma, FLUX.1, Imagen 3, and Eleven v3 with aspect ratio, resolution, sound, and reference-frame controls.'
    },
    {
      id: 'build',
      label: 'Build Live Apps',
      dot: 'var(--m-top-build)',
      caption: '<strong>Zero-Build Web App Studio:</strong> Toggle <code>Preview | Code</code> on live HTML5/Canvas templates (Fourier drawing, Gravity sim, Matrix rain, Solar system) or type any prompt to build a new app live.'
    },
    {
      id: 'agents',
      label: 'Agents & Drawer',
      dot: 'var(--m-drw-newchat)',
      caption: '<strong>6 Autonomous SOUL.md Agents:</strong> Slide open the drawer to switch between Chats and Agents (<code>@goar</code>, <code>@architect</code>, <code>@aegis</code>, <code>@quant</code>, <code>@atlas</code>, <code>@muse</code>) or launch Multi-Agent councils.'
    },
    {
      id: 'terminal',
      label: 'VT100 Terminal',
      dot: 'var(--m-drw-terminal)',
      caption: '<strong>Pure #000000 Linux PRoot Terminal:</strong> Full-bleed VT100 shell across 15 Linux distros and SSH servers with touch extra-keys bar. Try typing <code>neofetch</code>, <code>ls</code>, or <code>uname -a</code>!'
    },
    {
      id: 'files',
      label: 'File Browser',
      dot: 'var(--m-drw-files)',
      caption: '<strong>Multi-Source Workspace Explorer:</strong> Browse and edit files seamlessly across Local Workspace, Ubuntu PRoot Sandbox, and remote SSH servers.'
    },
    {
      id: 'docs',
      label: 'Revise Docs',
      dot: 'var(--m-drw-docs)',
      caption: '<strong>Word-Style Tracked Changes:</strong> Review green insertions &amp; red strikethrough redlines, Accept/Reject AI revisions inline, and export clean <code>.docx</code>, <code>.md</code>, or <code>.txt</code>.'
    },
    {
      id: 'browser',
      label: 'AI Browser',
      dot: 'var(--m-drw-browser)',
      caption: '<strong>Shared User/AI WebView + DevTools:</strong> 8 search engines, live Network/Console inspector, Cloak fingerprint spoofing, and tracker blocking.'
    },
    {
      id: 'tasks',
      label: 'Tasks & Digest',
      dot: 'var(--m-drw-tasks)',
      caption: '<strong>Automation Calendar &amp; Watchtower:</strong> Cron-scheduled exact alarms, website DOM monitors, and automated Morning Digest executive briefings.'
    },
    {
      id: 'settings',
      label: 'Settings (26)',
      dot: 'var(--m-drw-settings)',
      caption: '<strong>26 Unique Matte Bold Pop Categories:</strong> Search every setting live, toggle Ink/Paper appearance, inspect 12 bundled skills, and manage encrypted backups.'
    },
    {
      id: 'about',
      label: 'About & Legal',
      dot: 'var(--m-set-about)',
      caption: '<strong>Built-In Transparency:</strong> Inspect Version 2.0.0 (Build 30), support contacts, and tap Privacy Policy, Terms of Service, License, or Data Protection right inside the app.'
    }
  ];

  const WELL_KNOWN_BRANDS = [
    { name: 'Anthropic', icon: 'provider_anthropic', accent: '#E8A87C', rating: '5.0' },
    { name: 'OpenAI', icon: 'provider_openai', accent: '#4ADE80', rating: '5.0' },
    { name: 'Google Gemini', icon: 'provider_gemini', accent: '#5B9BFF', rating: '5.0' },
    { name: 'GitHub', icon: 'ic_mcp_github', accent: '#E8E2D6', rating: '5.0' },
    { name: 'Cloudflare', icon: 'ic_mcp_cloudflare', accent: '#FF7A45', rating: '5.0' },
    { name: 'Stripe', icon: 'provider_stripe', accent: '#8B7CF6', rating: '5.0' },
    { name: 'NVIDIA', icon: 'provider_nvidia', accent: '#76B900', rating: '5.0' },
    { name: 'Docker', icon: 'ic_mcp_docker', accent: '#38BDF8', rating: '5.0' },
    { name: 'Mistral AI', icon: 'provider_mistral', accent: '#FFB830', rating: '5.0' },
    { name: 'Linear', icon: 'ic_mcp_linear', accent: '#818CF8', rating: '5.0' },
    { name: 'Shopify', icon: 'ic_mcp_shopify', accent: '#4ADE80', rating: '5.0' },
    { name: 'Slack', icon: 'ic_mcp_slack', accent: '#FF5E9C', rating: '5.0' }
  ];

  const FIVE_STAR_HIGHLIGHTS = [
    {
      brand: 'Anthropic Claude',
      icon: 'provider_anthropic',
      color: '#E8A87C',
      score: '5.0',
      quote: '“Switching between <strong>Claude Sonnet 4.5</strong>, extended thinking budgets, and native MCP connectors directly from Android — with zero proxy server in the middle — feels like carrying a desktop engineering studio.”',
      tag: 'Direct API · Zero Markup',
      role: 'Staff Infrastructure Lead'
    },
    {
      brand: 'GitHub + Docker',
      icon: 'ic_mcp_github',
      color: '#5B9BFF',
      score: '5.0',
      quote: '“Reviewing pull requests via <strong>GitHub MCP</strong>, running scripts inside a real <strong>Ubuntu 24.04 PRoot</strong> shell, and inspecting builds without touching a laptop cut our incident response time in half.”',
      tag: 'PRoot VT100 · SSH Ready',
      role: 'Principal Platform Engineer'
    },
    {
      brand: 'OpenAI + Gemini',
      icon: 'provider_openai',
      color: '#4ADE80',
      score: '5.0',
      quote: '“One unified workspace where <strong>GPT-4.1</strong>, <strong>Gemini 2.5 Pro</strong>, <strong>Veo 3.1</strong>, and offline <strong>llama.cpp</strong> live side-by-side. We cancelled three separate monthly mobile subscriptions on day one.”',
      tag: '20+ Frontier & Local Models',
      role: 'Product Design Founder'
    },
    {
      brand: 'Cloudflare + Stripe',
      icon: 'ic_mcp_cloudflare',
      color: '#FF7A45',
      score: '5.0',
      quote: '“Our ops team connects <strong>Cloudflare</strong>, <strong>Stripe</strong>, and <strong>Linear</strong> through local Keystore-encrypted tokens and runs scheduled Watchtower digests with total data sovereignty.”',
      tag: 'Android Keystore Encrypted',
      role: 'CTO · SaaS Operations'
    }
  ];

  function getSavedTheme() {
    try {
      return localStorage.getItem('goar_site_theme') || 'dark';
    } catch (_) {
      return 'dark';
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('goar_site_theme', theme); } catch (_) {}
    document.querySelectorAll('[data-theme-toggle-icon]').forEach(el => {
      el.innerHTML = window.goarIcon(theme === 'dark' ? 'sun' : 'moon', 17);
    });
    document.querySelectorAll('[data-theme-toggle-label]').forEach(el => {
      el.textContent = theme === 'dark' ? 'Paper Light' : 'Ink Dark';
    });
  }

  window.goarInitTheme = function (onAfterSwitch) {
    applyTheme(getSavedTheme());
    document.querySelectorAll('[data-action="toggle-site-theme"]').forEach(btn => {
      if (btn.dataset.themeBound === '1') return;
      btn.dataset.themeBound = '1';
      btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        if (onAfterSwitch) onAfterSwitch(next);
      });
    });
  };

  function initScrollReveals() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.96) {
        el.classList.add('in-view');
      } else {
        io.observe(el);
      }
    });
  }

  window.goarInitLanding = function () {
    const D = window.GOAR_DATA;
    const I = window.goarIcon;
    const allSims = [];

    function syncThemeFromSim(nextTheme) {
      applyTheme(nextTheme);
      allSims.forEach(instance => instance.render());
    }

    /* ── 1. Mount 5 Choreographed Scenario Animated Clip Phones ── */
    const clipMounts = document.querySelectorAll('[data-scenario-clip]');
    const visibilityTargets = new Map();

    clipMounts.forEach(mount => {
      const clipId = mount.dataset.scenarioClip;
      const section = mount.closest('.scenario-section');
      const hudBar = section && section.querySelector('[data-clip-hud]');
      const hudStatusText = section && section.querySelector('[data-clip-status-text]');
      const hudActionBtn = section && section.querySelector('[data-clip-toggle]');
      const stepBtns = section ? Array.from(section.querySelectorAll('[data-clip-step]')) : [];

      const updateStepUI = (info) => {
        stepBtns.forEach((btn, idx) => {
          const isActive = idx === info.index;
          btn.classList.remove('active', 'is-playing');
          if (isActive) {
            // Force reflow so the bottom progress bar animation restarts cleanly
            void btn.offsetWidth;
            btn.classList.add('active');
            if (info.playing) {
              btn.style.setProperty('--step-dur', ((info.step && info.step.duration) || 3800) + 'ms');
              btn.classList.add('is-playing');
            }
          }
        });
      };

      const updateHudUI = (st) => {
        if (!hudBar) return;
        const playing = st.playing;
        hudBar.classList.toggle('is-interactive', !playing);
        if (hudStatusText) {
          hudStatusText.textContent = playing
            ? 'Playing live demo · Tap phone to take over'
            : 'Interactive · You control this phone';
        }
        if (hudActionBtn) {
          hudActionBtn.innerHTML = playing
            ? `${I('pause', 12)} Pause`
            : `${I('play', 12)} Replay Demo`;
        }
        stepBtns.forEach(btn => {
          if (btn.classList.contains('active')) {
            btn.classList.toggle('is-playing', playing);
          }
        });
      };

      if (window.GoarAppSimulator) {
        const sim = new window.GoarAppSimulator(mount, {
          initialClip: clipId,
          autoPlay: true,
          onThemeSync: syncThemeFromSim,
          onClipStep: updateStepUI,
          onClipStateChange: updateHudUI
        });
        allSims.push(sim);
        visibilityTargets.set(mount, sim);

        // Bind Step Cards next to the phone
        stepBtns.forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            sim.jumpClipStep(idx, true);
          });
        });

        // Bind Pause / Replay button in the outside-the-bezel HUD bar
        if (hudActionBtn) {
          hudActionBtn.addEventListener('click', () => {
            if (sim._clipPlaying) {
              sim.pauseClip(true);
            } else {
              sim.resumeClip();
            }
          });
        }
      }
    });

    /* ── 2. Mount Full Hands-On 14-Screen Interactive Sandbox Phone ── */
    const sandboxMount = document.getElementById('goar-sim-mount');
    let sandboxSim = null;

    if (sandboxMount && window.GoarAppSimulator) {
      sandboxSim = new window.GoarAppSimulator(sandboxMount, {
        onTourChange: function (id) {
          highlightTour(id);
        },
        onThemeSync: syncThemeFromSim
      });
      allSims.push(sandboxSim);
      visibilityTargets.set(sandboxMount, sandboxSim);
    }

    // Viewport Visibility Observer so offscreen phones sleep cleanly at 0% CPU
    if ('IntersectionObserver' in window && visibilityTargets.size) {
      const visObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const sim = visibilityTargets.get(entry.target);
          if (sim) sim.setVisible(entry.isIntersecting);
        });
      }, { threshold: 0.12 });
      visibilityTargets.forEach((_, el) => visObserver.observe(el));
    }

    // Theme toggle syncs EVERY mounted phone bezel across the entire website
    window.goarInitTheme(() => {
      allSims.forEach(instance => instance.render());
    });

    /* ── 3. Populate Well-Known Companies + 5-Star Showcase ── */
    const brandGrid = document.getElementById('brand-logos-grid');
    if (brandGrid) {
      brandGrid.innerHTML = WELL_KNOWN_BRANDS.map(b => `
        <div class="brand-logo-tile">
          <div class="brand-logo-top">
            ${I(b.icon, 20, b.accent)}
            <span>${b.name}</span>
          </div>
          <div class="brand-logo-stars">
            <span class="s" aria-label="5 out of 5 stars">★★★★★</span>
            <span>${b.rating}</span>
          </div>
        </div>
      `).join('');
    }

    const fiveStarEl = document.getElementById('five-star-cards');
    if (fiveStarEl) {
      fiveStarEl.innerHTML = FIVE_STAR_HIGHLIGHTS.map(c => `
        <article class="five-star-card">
          <div class="five-star-head">
            <div class="five-star-brand">
              <span class="five-star-brand-icon" style="background:color-mix(in srgb, ${c.color} 16%, transparent);border:1px solid color-mix(in srgb, ${c.color} 32%, transparent)">
                ${I(c.icon, 18, c.color)}
              </span>
              <span>${c.brand}</span>
            </div>
            <span class="five-star-score">★★★★★ ${c.score}</span>
          </div>
          <p class="five-star-quote">${c.quote}</p>
          <div class="five-star-foot">
            <strong style="color:var(--on-bg)">${c.role}</strong>
            <span>${c.tag}</span>
          </div>
        </article>
      `).join('');
    }

    /* ── 4. Populate Tabbed Ecosystem Strip (Providers / Distros / MCP) ── */
    const ecoWrap = document.getElementById('eco-pills-wrap');
    const ecoTabBtns = document.querySelectorAll('[data-eco-tab]');
    function renderEcoTab(kind) {
      if (!ecoWrap) return;
      ecoTabBtns.forEach(b => b.classList.toggle('active', b.dataset.ecoTab === kind));
      if (kind === 'providers') {
        ecoWrap.innerHTML = D.PROVIDERS_SHOWCASE.map(p =>
          `<span class="eco-pill">${I(p.icon, 16, 'var(--primary)')} ${p.name}</span>`
        ).join('');
      } else if (kind === 'distros') {
        ecoWrap.innerHTML = D.DISTROS_SHOWCASE.map(d =>
          `<span class="eco-pill">${I(d.icon, 16, 'var(--m-drw-terminal)')} ${d.name}</span>`
        ).join('');
      } else {
        ecoWrap.innerHTML = D.MCP_SHOWCASE.map(m =>
          `<span class="eco-pill">${I(m.icon, 16, 'var(--m-set-mcp)')} ${m.name}</span>`
        ).join('');
      }
    }
    ecoTabBtns.forEach(btn => {
      btn.addEventListener('click', () => renderEcoTab(btn.dataset.ecoTab));
    });
    if (ecoWrap) renderEcoTab('providers');

    /* ── 5. Populate Hands-On 14-Screen Sandbox Controls ── */
    const tourChipsEl = document.getElementById('tour-chips');
    const tourCaptionEl = document.getElementById('tour-caption');

    function highlightTour(id) {
      const stop = TOUR_STOPS.find(t => t.id === id) || TOUR_STOPS[0];
      if (tourChipsEl) {
        tourChipsEl.querySelectorAll('.tour-chip').forEach(ch => {
          ch.classList.toggle('active', ch.dataset.tour === stop.id);
        });
      }
      if (tourCaptionEl) tourCaptionEl.innerHTML = stop.caption;
    }

    if (tourChipsEl) {
      tourChipsEl.innerHTML = TOUR_STOPS.map((t, i) => `
        <button class="tour-chip ${i === 0 ? 'active' : ''}" data-tour="${t.id}">
          <span class="dot" style="background:${t.dot}"></span>
          <span>${t.label}</span>
        </button>
      `).join('');
      tourChipsEl.addEventListener('click', e => {
        const chip = e.target.closest('.tour-chip');
        if (!chip) return;
        if (sandboxSim) sandboxSim.navigateToDemo(chip.dataset.tour);
        highlightTour(chip.dataset.tour);
      });
      highlightTour('welcome');
    }

    /* ── 6. Legal & Compliance Hub Tabs ── */
    const legalBtns = document.querySelectorAll('[data-legal-tab]');
    const legalBody = document.getElementById('legal-hub-content');
    const legalTitle = document.getElementById('legal-hub-title');
    const legalLink = document.getElementById('legal-hub-permalink');

    const legalMeta = {
      privacy_policy: {
        href: 'privacy.html',
        summary: `<h4>Zero Cloud Intermediaries</h4><p>Goar Studio runs as a local-first studio on your Android device. Your conversations, system prompts, agent memories, workspace projects, tasks, and API keys are stored strictly on-device via Android Room (SQLite), Jetpack DataStore, and Android Keystore-backed <code>EncryptedSharedPreferences</code>.</p><h4>Direct Provider Routing</h4><p>Outbound requests travel directly from your device only to the model providers, MCP servers, search backends, or SSH hosts you explicitly configure. Diagnostic logs stay on-device unless you explicitly export a bundle.</p>`
      },
      terms_of_service: {
        href: 'terms.html',
        summary: `<h4>Local-First Software License &amp; Operator Responsibility</h4><p>Goar Studio is provided as-is as a local-first multi-model AI studio, web builder, browser, and workspace environment. Because you connect your own API keys, SSH hosts, MCP servers, and scheduled automations, you retain full ownership and responsibility for all credentials, external calls, automated tasks, and generated outputs.</p>`
      },
      privacy_act: {
        href: 'data-protection.html',
        summary: `<h4>4-Layer Local Privacy Architecture</h4><p>From <strong>Settings → Data &amp; Backups</strong>, you hold total custody over your data: export encrypted-optional ZIP archives, import ChatGPT or Claude conversation histories, configure scheduled local folder backups, set retention auto-delete windows, or wipe stored databases and Keystore keys immediately.</p>`
      },
      license: {
        href: 'licenses.html',
        summary: `<h4>Open-Source Ecosystem Transparency</h4><p>Goar Studio builds on MIT and Apache 2.0 compatible libraries including Jetpack Compose, Material 3, OkHttp, Room, Media3, Coil, Sora Editor, JLaTeXMath, JSch, Apache Commons Compress, llama.cpp, and whisper.cpp.</p>`
      }
    };

    function showLegalTab(key) {
      const doc = D.LEGAL_DOCS[key];
      const meta = legalMeta[key];
      if (!doc || !meta) return;
      legalBtns.forEach(b => b.classList.toggle('active', b.dataset.legalTab === key));
      if (legalTitle) legalTitle.textContent = doc.title;
      if (legalLink) legalLink.setAttribute('href', meta.href);
      if (legalBody) {
        legalBody.innerHTML = `
          ${meta.summary}
          <div style="font-size:11.5px;font-family:var(--font-mono);color:var(--on-surface-variant);margin-top:16px">VERBATIM IN-APP NOTICE (app/src/main/res/raw/${key}.txt)</div>
          <div class="legal-verbatim-box">${doc.raw.replace(/</g, '&lt;')}</div>
        `;
      }
    }

    legalBtns.forEach(b => {
      b.addEventListener('click', () => showLegalTab(b.dataset.legalTab));
    });
    if (legalBody) showLegalTab('privacy_policy');

    /* ── 7. Activate Framer Scroll Reveals ── */
    initScrollReveals();
  };
})();
