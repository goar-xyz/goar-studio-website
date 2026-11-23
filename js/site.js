/* ============================================================================
 * GOAR STUDIO v2.1.0 (Build 31) WEBSITE CONTROLLER
 * Orchestrates:
 *   - Obsidian Dark / Crisp Alabaster Light theme sync across ALL phone instances
 *   - Live 4-Palette GoarPaletteStyle sync (MONOCHROME / CHAMPAGNE / COBALT / TINTED)
 *   - Smooth scroll reveals (IntersectionObserver + immediate fold check)
 *   - 4 balanced alternating Right -> Left -> Right -> Left live interactive phone reels
 *   - Well-Known Companies Brand Strip (12) & 5-Star Highlights (4)
 *   - Tabbed Open Ecosystem + 17-Screen Hands-On Interactive Sandbox
 *   - Curated 98-Skill GitHub SKILL.md Hub (skills.html)
 *   - Verbatim & Enterprise Legal Hub
 * ============================================================================ */

(function () {
  const TOUR_STOPS = [
    {
      id: 'welcome',
      label: 'Ask · Home',
      dot: 'var(--m-top-ask)',
      caption: '<strong>Architectural Monochrome v2.1.0:</strong> Boxless top drawer &amp; edit icons, centered <code>[ Ask | Imagine | Build ]</code> segmented capsule pill, radial zinc watermark aura, and 3 starter pills (<code>Summarize</code>, <code>Write code</code>, <code>Brainstorm</code>).'
    },
    {
      id: 'chat-thinking',
      label: 'Thinking & Tools',
      dot: 'var(--m-cmp-model)',
      caption: '<strong>Collapsible Reasoning &amp; Tool Timeline:</strong> Audit multi-step reasoning blocks, executed local tools (<code>workspace_read</code>, <code>shell_exec</code>), syntax code blocks, and one-tap context compaction.'
    },
    {
      id: 'slash',
      label: '10 Slash Commands',
      dot: 'var(--m-cmp-sparkle)',
      caption: '<strong>Vibe Command Palette (v2.1.0):</strong> Type <code>/</code> for 10 commands including <code>/drop</code> (Autonomous Product Drop), <code>/skill</code>, <code>/subagent</code>, <code>/plan</code>, <code>/build</code>, and <code>/compact</code>.'
    },
    {
      id: 'voice',
      label: 'Live Voice Orb',
      dot: 'var(--m-cmp-mic)',
      caption: '<strong>Static-Until-Talking Fluid Blob:</strong> Hold the round 6-bar voice button (or tap the orb now) to cycle silent pearl → emerald Listening → plum Thinking → azure Speaking backed by <code>whisper.cpp</code>.'
    },
    {
      id: 'imagine',
      label: 'Imagine Studio',
      dot: 'var(--m-top-imagine)',
      caption: '<strong>On-Device &amp; Cloud Media Studio:</strong> Switch Coral Video / Amber Image / Cyan Audio across Goar On-Device Creative Engine, Veo 3.1, Kling, FLUX.1, NVIDIA NIM, Imagen 3, and Eleven v3.'
    },
    {
      id: 'build',
      label: 'Build & 3D IDE',
      dot: 'var(--m-top-build)',
      caption: '<strong>Self-Healing Web &amp; 3D Game Studio:</strong> Toggle <code>Preview | Code</code> on live HTML5/Canvas &amp; Three.js templates, auto-validate runtime DOM/JS errors, or sync via Google Drive.'
    },
    {
      id: 'apphub',
      label: 'App Screen',
      dot: 'var(--accent-cobalt)',
      caption: '<strong>NEW · Full-Screen App Screen Hub:</strong> 3-column squircle app launcher with <code>Build | Import | Terminal</code> chips, built-in Palette Icon Studio, and multi-resolution <code>.ICO</code> export.'
    },
    {
      id: 'agents',
      label: '6 SOUL.md Agents',
      dot: 'var(--m-drw-newchat)',
      caption: '<strong>Inline Composer Agents Sheet:</strong> Tap the composer Agents icon to deploy <code>@goar</code>, <code>@architect</code>, <code>@aegis</code>, <code>@quant</code>, <code>@atlas</code>, and <code>@muse</code> with dedicated memory &amp; skills.'
    },
    {
      id: 'network',
      label: 'Network Tools',
      dot: 'var(--m-drw-network)',
      caption: '<strong>Streamlined 3-Tab Recon &amp; Traffic Suite:</strong> Unified Target Lookup (DNS/TLS/HTTP/Passive/ASN/Shodan CVEs), /24 LAN Scan with 1-tap inspect, Live HTTP Traffic Inspector, and inline Goar AI analysis.'
    },
    {
      id: 'oauth',
      label: 'OAuth 2.1 Hub',
      dot: 'var(--m-set-apihub)',
      caption: '<strong>48 Native Connectors &amp; OAuth 2.1 PKCE:</strong> One-tap device-native sign-in for Google Drive/Gmail/Calendar, GitHub, Cloudflare, Vercel, Supabase, Stripe, Notion, Linear &amp; Figma.'
    },
    {
      id: 'terminal',
      label: 'Alpine 3.21 Shell',
      dot: 'var(--m-drw-terminal)',
      caption: '<strong>Offline APK-Bundled Alpine Linux 3.21:</strong> SHA-256 verified 3.7 MB minirootfs (BusyBox + musl libc, zero external binary downloads) + SSH/SFTP. Try typing <code>neofetch</code>, <code>ls</code>, or <code>uname -a</code>!'
    },
    {
      id: 'files',
      label: 'File Browser',
      dot: 'var(--m-drw-files)',
      caption: '<strong>Multi-Source Workspace Explorer:</strong> Browse and edit files across Local Workspace, Alpine 3.21 PRoot, and SSH hosts — exposed cleanly to Android Files via <code>DocumentsProvider</code>.'
    },
    {
      id: 'docs',
      label: 'Revise Docs',
      dot: 'var(--m-drw-docs)',
      caption: '<strong>Word-Style Tracked Changes:</strong> Review green insertions &amp; red strikethrough redlines, Accept/Reject AI revisions inline, and export clean <code>.docx</code>, <code>.md</code>, or <code>.csv</code>.'
    },
    {
      id: 'browser',
      label: 'SmartCookieWeb',
      dot: 'var(--m-drw-browser)',
      caption: '<strong>Privacy Shield Browser + Manus Glass PiP:</strong> Shared user/agent browser with per-host Ad/Tracker Shield, <code>Sec-GPC: 1</code>, DevTools Network/Console inspector, and 1-tap takeover.'
    },
    {
      id: 'tasks',
      label: 'Tasks & Digest',
      dot: 'var(--m-drw-tasks)',
      caption: '<strong>Automation Calendar &amp; Watchtower:</strong> Cron-scheduled exact alarms, website DOM monitors, and automated Morning Digest executive briefings.'
    },
    {
      id: 'settings',
      label: 'Tiered Settings',
      dot: 'var(--m-drw-settings)',
      caption: '<strong>Exact v2.1.0 Settings Hierarchy:</strong> Quick <code>Auto | Light | Dark</code> switcher, Model card, boxless monochrome rows (<code>Models &amp; Voice</code>, <code>Assistant</code>, <code>General &amp; Privacy</code>), collapsible <code>Advanced</code>, and 4 Palettes.'
    },
    {
      id: 'about',
      label: 'About & Legal',
      dot: 'var(--m-set-about)',
      caption: '<strong>Built-In Transparency (v2.1.0 Build 31):</strong> Inspect package verification, support desk routing, and read verbatim Privacy Policy, Terms of Service, License, and Data Protection notices.'
    }
  ];

  const WELL_KNOWN_BRANDS = [
    { name: 'Anthropic', icon: 'provider_anthropic', accent: '#E59A69', rating: '5.0' },
    { name: 'OpenAI', icon: 'provider_openai', accent: '#10B981', rating: '5.0' },
    { name: 'Google Gemini', icon: 'provider_gemini', accent: '#3B82F6', rating: '5.0' },
    { name: 'NVIDIA NIM', icon: 'provider_nvidia', accent: '#76B900', rating: '5.0' },
    { name: 'GitHub', icon: 'ic_mcp_github', accent: '#F4F4F6', rating: '5.0' },
    { name: 'Cloudflare', icon: 'ic_brand_cloudflare', accent: '#F59E0B', rating: '5.0' },
    { name: 'Vercel', icon: 'ic_brand_vercel', accent: '#F4F4F6', rating: '5.0' },
    { name: 'Supabase', icon: 'ic_brand_supabase', accent: '#10B981', rating: '5.0' },
    { name: 'Stripe', icon: 'provider_stripe', accent: '#818CF8', rating: '5.0' },
    { name: 'Figma', icon: 'ic_brand_figma', accent: '#F472B6', rating: '5.0' },
    { name: 'Linear', icon: 'ic_mcp_linear', accent: '#60A5FA', rating: '5.0' },
    { name: 'Notion', icon: 'ic_mcp_notion', accent: '#F4F4F6', rating: '5.0' }
  ];

  const FIVE_STAR_HIGHLIGHTS = [
    {
      brand: 'Anthropic + NVIDIA',
      icon: 'provider_nvidia',
      color: '#76B900',
      score: '5.0',
      quote: '“Combining <strong>Claude Sonnet 4.5</strong> with v2.1.0’s bundled <strong>NVIDIA NIM, CUDA TensorRT-LLM &amp; NeMo Guardrails</strong> skills directly on Android — zero middleman proxy — feels like carrying a workstation.”',
      tag: 'Direct API · NVIDIA AI Skills',
      role: 'Staff ML Infrastructure Lead'
    },
    {
      brand: 'GitHub + Vercel',
      icon: 'ic_mcp_github',
      color: '#3B82F6',
      score: '5.0',
      quote: '“One-tap <strong>OAuth 2.1 PKCE sign-in</strong> connects GitHub, Vercel, and Supabase MCP servers in seconds — right beside an offline SHA-256 verified <strong>Alpine Linux 3.21</strong> shell.”',
      tag: 'OAuth 2.1 · Alpine 3.21 PRoot',
      role: 'Principal Platform Engineer'
    },
    {
      brand: 'OpenAI + Gemini',
      icon: 'provider_openai',
      color: '#10B981',
      score: '5.0',
      quote: '“One architectural monochrome studio unifying <strong>GPT-4.1</strong>, <strong>Gemini 2.5 Pro</strong>, <strong>Veo 3.1</strong>, App Screen squircle hub, and offline <strong>llama.cpp</strong>. Replaced four separate apps on day one.”',
      tag: '18+ Providers & On-Device C++',
      role: 'Product Design Founder'
    },
    {
      brand: 'Cloudflare + Stripe',
      icon: 'ic_brand_cloudflare',
      color: '#F59E0B',
      score: '5.0',
      quote: '“Between <strong>Cloudflare &amp; Stripe OAuth</strong>, the autonomous <code>/drop</code> commerce orchestrator, and 3-tab <strong>Network Tools</strong> recon &amp; traffic auditing, nothing else on Android comes close.”',
      tag: '3-Tab Recon · AES-256-GCM',
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
      el.textContent = theme === 'dark' ? 'Alabaster Light' : 'Obsidian Dark';
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

    /* ── 1. Mount Balanced Alternating Scenario Interactive Video Phones ── */
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
            void btn.offsetWidth;
            btn.classList.add('active');
            if (info.playing) {
              btn.style.setProperty('--step-dur', ((info.step && info.step.duration) || 4800) + 'ms');
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

        stepBtns.forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            sim.jumpClipStep(idx, true);
          });
        });

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

    /* ── 2. Mount Full Hands-On 17-Screen Interactive Sandbox Phone ── */
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

    if ('IntersectionObserver' in window && visibilityTargets.size) {
      const visObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const sim = visibilityTargets.get(entry.target);
          if (sim) sim.setVisible(entry.isIntersecting);
        });
      }, { threshold: 0.12 });
      visibilityTargets.forEach((_, el) => visObserver.observe(el));
    }

    window.goarInitTheme(() => {
      allSims.forEach(instance => instance.render());
    });

    /* ── Live 4-Palette GoarPaletteStyle Switcher (Syncs all Phones!) ── */
    const palBtns = document.querySelectorAll('[data-site-palette]');
    palBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const pal = btn.dataset.sitePalette;
        palBtns.forEach(b => b.classList.toggle('active', b.dataset.sitePalette === pal));
        allSims.forEach(sim => {
          sim.state.paletteStyle = pal;
          sim.render();
        });
      });
    });

    /* ── 3. Populate Well-Known Companies + 5-Star Showcase ── */
    const brandGrid = document.getElementById('brand-logos-grid');
    if (brandGrid) {
      const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';
      const renderBrands = () => {
        brandGrid.innerHTML = WELL_KNOWN_BRANDS.map(b => {
          const col = (b.accent === '#F4F4F6' && !isDark()) ? '#0B0B0E' : b.accent;
          return `
            <div class="brand-logo-tile">
              <div class="brand-logo-top">
                ${I(b.icon, 20, col)}
                <span>${b.name}</span>
              </div>
              <div class="brand-logo-stars">
                <span class="s" aria-label="5 out of 5 stars">★★★★★</span>
                <span>${b.rating}</span>
              </div>
            </div>
          `;
        }).join('');
      };
      renderBrands();
      document.querySelectorAll('[data-action="toggle-site-theme"]').forEach(btn => {
        btn.addEventListener('click', () => setTimeout(renderBrands, 0));
      });
    }

    const fiveStarEl = document.getElementById('five-star-cards');
    if (fiveStarEl) {
      fiveStarEl.innerHTML = FIVE_STAR_HIGHLIGHTS.map(c => `
        <article class="five-star-card">
          <div class="five-star-head">
            <div class="five-star-brand">
              <span class="five-star-brand-icon" style="background:color-mix(in srgb, ${c.color} 15%, transparent);border:1px solid color-mix(in srgb, ${c.color} 30%, transparent)">
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

    /* ── 4. Populate Tabbed Ecosystem Strip (Providers / On-Device Runtime / 48 OAuth MCP) ── */
    const ecoWrap = document.getElementById('eco-pills-wrap');
    const ecoTabBtns = document.querySelectorAll('[data-eco-tab]');
    function renderEcoTab(kind) {
      if (!ecoWrap) return;
      ecoTabBtns.forEach(b => b.classList.toggle('active', b.dataset.ecoTab === kind));
      if (kind === 'providers') {
        ecoWrap.innerHTML = D.PROVIDERS_SHOWCASE.map(p =>
          `<span class="eco-pill">${I(p.icon, 16, 'var(--on-bg)')} ${p.name}</span>`
        ).join('');
      } else if (kind === 'runtime') {
        ecoWrap.innerHTML = D.RUNTIME_STACK_SHOWCASE.map(d =>
          `<span class="eco-pill">${I(d.icon, 16, 'var(--accent-emerald)')} ${d.name}</span>`
        ).join('');
      } else {
        ecoWrap.innerHTML = D.MCP_SHOWCASE.map(m =>
          `<span class="eco-pill">${I(m.icon, 16, 'var(--accent-cobalt)')} ${m.name}</span>`
        ).join('');
      }
    }
    ecoTabBtns.forEach(btn => {
      btn.addEventListener('click', () => renderEcoTab(btn.dataset.ecoTab));
    });
    if (ecoWrap) renderEcoTab('providers');

    /* ── 5. Populate Hands-On 17-Screen Sandbox Controls ── */
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
        summary: `<h4>Zero Cloud Intermediaries &amp; Google Play Data Safety</h4><p>Goar Studio runs as a local-first studio on your Android device (v2.1.0 Build 31). Conversations, system prompts, agent memories, workspaces, OAuth 2.1 tokens, and API keys stay encrypted on-device via Android Room SQLite and hardware-backed Android Keystore (AES-256-GCM). Zero Advertising ID (<code>AD_ID</code>) and zero broad storage permissions.</p><h4>Google Drive OAuth Limited Use Compliance</h4><p>Optional Google Drive access uses device-native Google Identity Services strictly when you initiate a website sync or workspace import, adhering to the Google API Services User Data Policy (Limited Use).</p>`
      },
      terms_of_service: {
        href: 'terms.html',
        summary: `<h4>100% Creator Ownership &amp; BYOK Responsibility</h4><p>Goar Studio claims zero ownership or royalties over the web applications, 2D/3D WebGL games, media creatives, documents, or <code>SKILL.md</code> playbooks you build. You retain full control and responsibility for your API keys, OAuth grants, external MCP tools, and automated workflows.</p>`
      },
      privacy_act: {
        href: 'data-protection.html',
        summary: `<h4>AES-256-GCM Security, SSRF Defense &amp; Instant Data Erasure</h4><p>Protected by Android Keystore AES-256-GCM, SSRF DNS-rebinding guards, zero Dynamic Code Loading (DCL), 16 KB page-aligned stripped NDK libraries, and startup <code>AppIntegrityShield</code> verification. Wipe granular chats, revoke OAuth grants, or clear all device data instantaneously.</p>`
      },
      license: {
        href: 'licenses.html',
        summary: `<h4>Open-Source Ecosystem Transparency</h4><p>Built on MIT and Apache 2.0 compatible components including Jetpack Compose, Material 3, OkHttp, Room, Media3, Coil, Sora Editor, Three.js, Alpine Linux 3.21 minirootfs (SHA-256 verified), JSch, Apache Commons Compress, llama.cpp, and whisper.cpp.</p>`
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

    /* ── 7. Activate Scroll Reveals ── */
    initScrollReveals();
  };

  /* ============================================================================
   * GITHUB SKILLS HUB CONTROLLER (skills.html — 98+ Real Imported SKILL.md Files)
   * ============================================================================ */
  window.goarInitSkillsHub = function () {
    window.goarInitTheme();
    const hub = window.GOAR_SKILLS_HUB;
    const I = window.goarIcon;
    if (!hub) return;

    const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const fmtStars = (n) => n ? (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n)) : '';

    const catBar = document.getElementById('skills-cat-bar');
    const gridEl = document.getElementById('skills-grid');
    const searchEl = document.getElementById('skills-search');
    const repoFilterEl = document.getElementById('skills-repo-filter');
    const sortEl = document.getElementById('skills-sort');
    const countLabel = document.getElementById('skills-result-count');
    const catDescEl = document.getElementById('skills-cat-desc');
    const totalEl = document.getElementById('kpi-total-skills');
    const reposEl = document.getElementById('kpi-total-repos');
    const modalBackdrop = document.getElementById('skill-modal-backdrop');

    if (totalEl) totalEl.textContent = String(hub.totalCount);
    if (reposEl) reposEl.textContent = String(hub.repoCount);

    let activeCat = 'all';
    let query = '';
    let repoFilter = 'all';
    let sortBy = 'featured';
    let modalSkill = null;

    // Populate repo dropdown
    if (repoFilterEl) {
      const repos = Array.from(new Set(hub.skills.map(s => s.repo)));
      repoFilterEl.innerHTML = `<option value="all">All Repositories (${repos.length})</option>` +
        repos.map(r => `<option value="${esc(r)}">${esc(r)}</option>`).join('');
    }

    function catCount(catId) {
      if (catId === 'all') return hub.skills.length;
      return hub.skills.filter(s => s.category === catId).length;
    }

    function renderCats() {
      if (!catBar) return;
      catBar.innerHTML = hub.categories.map(c => `
        <button class="skills-cat-btn ${activeCat === c.id ? 'active' : ''}" data-cat="${c.id}" type="button">
          <span>${esc(c.label)}</span>
          <span class="skills-cat-count">${catCount(c.id)}</span>
        </button>
      `).join('');
    }

    function getFiltered() {
      const q = query.trim().toLowerCase();
      let list = hub.skills.filter(s => {
        if (activeCat !== 'all' && s.category !== activeCat) return false;
        if (repoFilter !== 'all' && s.repo !== repoFilter) return false;
        if (q) {
          const hay = `${s.title} ${s.slug} ${s.description} ${s.repo} ${s.category}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
      if (sortBy === 'stars') {
        list = list.slice().sort((a, b) => (b.stars || 999999) - (a.stars || 999999));
      } else if (sortBy === 'name') {
        list = list.slice().sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'bundled') {
        list = list.slice().sort((a, b) => (b.bundled ? 1 : 0) - (a.bundled ? 1 : 0));
      }
      return list;
    }

    function downloadSkill(skill) {
      const blob = new Blob([skill.markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = skill.file || (skill.slug + '.md');
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function copySkill(skill, btnEl) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(skill.markdown).catch(() => {});
      }
      if (btnEl) {
        const prev = btnEl.innerHTML;
        btnEl.innerHTML = `${I('check', 13)} Copied`;
        setTimeout(() => { btnEl.innerHTML = prev; }, 1400);
      }
    }

    function openModal(skill) {
      modalSkill = skill;
      if (!modalBackdrop) return;
      document.getElementById('skill-modal-title').textContent = skill.title;
      document.getElementById('skill-modal-meta').textContent = `${skill.repo} · ${skill.license}${skill.stars ? ' · ★ ' + fmtStars(skill.stars) : ' · Bundled in Goar v2.1.0'}`;
      document.getElementById('skill-modal-code').textContent = skill.markdown;
      const ghLink = document.getElementById('skill-modal-gh');
      if (ghLink) ghLink.setAttribute('href', skill.sourceUrl);
      modalBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modalBackdrop) return;
      modalBackdrop.hidden = true;
      document.body.style.overflow = '';
    }

    function renderGrid() {
      const items = getFiltered();
      const catObj = hub.categories.find(c => c.id === activeCat) || hub.categories[0];
      if (catDescEl) catDescEl.textContent = catObj.desc;
      if (countLabel) countLabel.textContent = `Showing ${items.length} of ${hub.totalCount} skills`;
      if (!gridEl) return;

      if (!items.length) {
        gridEl.innerHTML = `
          <div style="grid-column:1/-1;padding:48px 24px;text-align:center;border-radius:20px;background:var(--surface-container);border:1px solid var(--outline-variant)">
            <strong style="font-size:16px">No matching skills found</strong>
            <p style="margin:8px 0 0;color:var(--on-surface-variant);font-size:14px">Try clearing your search or choosing another GitHub repository.</p>
          </div>
        `;
        return;
      }

      gridEl.innerHTML = items.map(s => `
        <article class="skill-card">
          <div class="skill-card-head">
            <span class="skill-repo-badge" title="${esc(s.repo)}">${esc(s.repo)}</span>
            ${s.bundled
              ? `<span class="skill-bundled-tag">Built-In v2.1</span>`
              : `<span class="skill-stars-tag">★ ${fmtStars(s.stars)}</span>`}
          </div>
          <h3 class="skill-card-title">${esc(s.title)}</h3>
          <div class="skill-card-slug">/${esc(s.slug)} · ${esc(s.license)}</div>
          <p class="skill-card-desc">${esc(s.description)}</p>
          <div class="skill-card-foot">
            <a class="skill-mini-btn" href="${esc(s.sourceUrl)}" target="_blank" rel="noopener noreferrer" title="View source on GitHub">
              ${I('ic_mcp_github', 13)} Source
            </a>
            <div class="skill-card-actions">
              <button class="skill-mini-btn" type="button" data-skill-copy="${esc(s.id)}">${I('copy', 13)} Copy</button>
              <button class="skill-mini-btn primary" type="button" data-skill-view="${esc(s.id)}">Inspect</button>
            </div>
          </div>
        </article>
      `).join('');
    }

    if (catBar) {
      catBar.addEventListener('click', e => {
        const btn = e.target.closest('[data-cat]');
        if (!btn) return;
        activeCat = btn.dataset.cat;
        renderCats();
        renderGrid();
      });
    }
    if (searchEl) searchEl.addEventListener('input', () => { query = searchEl.value; renderGrid(); });
    if (repoFilterEl) repoFilterEl.addEventListener('change', () => { repoFilter = repoFilterEl.value; renderGrid(); });
    if (sortEl) sortEl.addEventListener('change', () => { sortBy = sortEl.value; renderGrid(); });

    if (gridEl) {
      gridEl.addEventListener('click', e => {
        const vBtn = e.target.closest('[data-skill-view]');
        if (vBtn) {
          const sk = hub.skills.find(x => x.id === vBtn.dataset.skillView);
          if (sk) openModal(sk);
          return;
        }
        const cBtn = e.target.closest('[data-skill-copy]');
        if (cBtn) {
          const sk = hub.skills.find(x => x.id === cBtn.dataset.skillCopy);
          if (sk) copySkill(sk, cBtn);
        }
      });
    }

    const closeBtn = document.getElementById('skill-modal-close');
    const copyModalBtn = document.getElementById('skill-modal-copy');
    const dlModalBtn = document.getElementById('skill-modal-dl');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', e => {
        if (e.target === modalBackdrop) closeModal();
      });
    }
    if (copyModalBtn) copyModalBtn.addEventListener('click', () => { if (modalSkill) copySkill(modalSkill, copyModalBtn); });
    if (dlModalBtn) dlModalBtn.addEventListener('click', () => { if (modalSkill) downloadSkill(modalSkill); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    renderCats();
    renderGrid();
  };
})();
