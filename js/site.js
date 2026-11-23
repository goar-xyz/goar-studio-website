/* ============================================================================
 * GOAR STUDIO v2.1.0 WEBSITE CONTROLLER
 * Orchestrates:
 *   - Obsidian Dark / Crisp Alabaster Light theme sync across ALL phone instances
 *   - Framer-style scroll reveals (IntersectionObserver + immediate fold check)
 *   - 5 viewport-aware Interactive Video Reels + synchronized Chapter Scrubbers
 *   - Well-Known Companies Brand Strip (OAuth 2.1 / Frontier Labs) & 5-Star Cards
 *   - Tabbed Open Ecosystem + 16-Screen Hands-On Interactive Sandbox
 *   - Verbatim Legal & Compliance Hub
 * ============================================================================ */

(function () {
  const TOUR_STOPS = [
    {
      id: 'welcome',
      label: 'Ask · Home',
      dot: 'var(--m-top-ask)',
      caption: '<strong>Architectural Monochrome v2.1.0:</strong> Boxless top drawer &amp; edit icons, sleek <code>[ Ask | Imagine | Build ]</code> segmented capsule pill, inline <strong>Agents</strong> toggle, Model Picker, Context Ring, and 6-bar voice button.'
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
      caption: '<strong>Vibe Command Palette (v2.1.0):</strong> Type <code>/</code> for 10 commands including <code>/drop</code> (Autonomous Commerce Drop), <code>/skill</code>, <code>/subagent</code>, <code>/plan</code>, <code>/build</code>, and <code>/compact</code>.'
    },
    {
      id: 'voice',
      label: 'Live Voice Orb',
      dot: 'var(--m-cmp-mic)',
      caption: '<strong>Static-Until-Talking Fluid Blob:</strong> Hold the round 6-bar voice button for 1.4s (or tap the orb now) to cycle silent pearl → emerald Listening → plum Thinking → azure Speaking.'
    },
    {
      id: 'imagine',
      label: 'Imagine Studio',
      dot: 'var(--m-top-imagine)',
      caption: '<strong>On-Device &amp; BYOK Media Studio:</strong> Switch Video / Image / Audio across Goar On-Device Creative Engine, Veo 3.1, Kling, FLUX.1, NVIDIA NIM, Imagen 3, and Eleven v3.'
    },
    {
      id: 'build',
      label: 'Build & 3D Games',
      dot: 'var(--m-top-build)',
      caption: '<strong>Self-Healing Web &amp; Game Studio:</strong> Toggle <code>Preview | Code</code> on live HTML5/Canvas &amp; Three.js templates, validate automatically, or publish via Google Drive Website Sync.'
    },
    {
      id: 'agents',
      label: '6 SOUL.md Agents',
      dot: 'var(--m-drw-newchat)',
      caption: '<strong>Autonomous Specialist Roster:</strong> Tap the inline Agents button or slide open the drawer for <code>@goar</code>, <code>@architect</code>, <code>@aegis</code>, <code>@quant</code>, <code>@atlas</code>, and <code>@muse</code>.'
    },
    {
      id: 'network',
      label: 'Network Tools',
      dot: 'var(--m-drw-network)',
      caption: '<strong>NEW v2.1.0 · 4-Tab Recon &amp; Defense Suite:</strong> Unified Target Lookup (DNS/TLS/HTTP/Passive/ASN/Shodan CVEs), /24 LAN Scan, Live HTTP Traffic Inspector, and Shadow Trap honeyport daemon.'
    },
    {
      id: 'oauth',
      label: 'OAuth 2.1 Hub',
      dot: 'var(--m-set-apihub)',
      caption: '<strong>NEW v2.1.0 · One-Tap OAuth 2.1 PKCE Sign-In:</strong> Connect Google Drive/Gmail/Calendar, GitHub, Notion, Linear, Cloudflare, Vercel, Supabase, Stripe &amp; Figma with zero manual API key copy-paste.'
    },
    {
      id: 'terminal',
      label: 'VT100 Terminal',
      dot: 'var(--m-drw-terminal)',
      caption: '<strong>Pure #000000 Linux PRoot Terminal:</strong> Full VT100 shell across 15 rootless distros + SSH + atomic JNI file transfer. Try typing <code>neofetch</code>, <code>ls</code>, or <code>uname -a</code>!'
    },
    {
      id: 'files',
      label: 'File Browser',
      dot: 'var(--m-drw-files)',
      caption: '<strong>Multi-Source Workspace Explorer:</strong> Browse, inspect sandbox storage metrics, and edit files across Local Workspace, Ubuntu PRoot, and SSH hosts.'
    },
    {
      id: 'docs',
      label: 'Revise Docs',
      dot: 'var(--m-drw-docs)',
      caption: '<strong>Word-Style Tracked Changes:</strong> Review green insertions &amp; red strikethrough redlines, Accept/Reject AI revisions inline, and export clean <code>.docx</code>, <code>.md</code>, or <code>.csv</code>.'
    },
    {
      id: 'browser',
      label: 'AI Browser',
      dot: 'var(--m-drw-browser)',
      caption: '<strong>SmartCookie WebView + DevTools:</strong> Shared user/agent browser with live Network/Console inspector, Cloak fingerprint spoofing, and Manus Glass PiP takeover.'
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
      caption: '<strong>NEW v2.1.0 · Consumer Quick Controls + 4 Palettes:</strong> One-tap theme &amp; active model card, collapsible Advanced Studio, 16 skills (incl. NVIDIA NIM/CUDA/NeMo), and 4 Color &amp; Accent Styles.'
    },
    {
      id: 'about',
      label: 'About & Legal',
      dot: 'var(--m-set-about)',
      caption: '<strong>Built-In Transparency (v2.1.0 Build 31):</strong> Inspect version details, support contacts, and read verbatim Privacy Policy, Terms of Service, License, and Data Protection notices.'
    }
  ];

  const WELL_KNOWN_BRANDS = [
    { name: 'Anthropic', icon: 'provider_anthropic', accent: '#E8A87C', rating: '5.0' },
    { name: 'OpenAI', icon: 'provider_openai', accent: '#4ADE80', rating: '5.0' },
    { name: 'Google Gemini', icon: 'provider_gemini', accent: '#60A5FA', rating: '5.0' },
    { name: 'NVIDIA NIM', icon: 'provider_nvidia', accent: '#76B900', rating: '5.0' },
    { name: 'GitHub', icon: 'ic_mcp_github', accent: '#F4F4F6', rating: '5.0' },
    { name: 'Cloudflare', icon: 'ic_brand_cloudflare', accent: '#FF7A45', rating: '5.0' },
    { name: 'Vercel', icon: 'ic_brand_vercel', accent: '#F4F4F6', rating: '5.0' },
    { name: 'Supabase', icon: 'ic_brand_supabase', accent: '#3ECF8E', rating: '5.0' },
    { name: 'Stripe', icon: 'provider_stripe', accent: '#8B7CF6', rating: '5.0' },
    { name: 'Figma', icon: 'ic_brand_figma', accent: '#F472B6', rating: '5.0' },
    { name: 'Linear', icon: 'ic_mcp_linear', accent: '#818CF8', rating: '5.0' },
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
      color: '#60A5FA',
      score: '5.0',
      quote: '“One-tap <strong>OAuth 2.1 PKCE sign-in</strong> connects GitHub, Vercel, and Supabase MCP servers in seconds — no hunting for tokens — right beside a real <strong>Ubuntu 24.04 PRoot</strong> shell.”',
      tag: 'OAuth 2.1 PKCE · PRoot Linux',
      role: 'Principal Platform Engineer'
    },
    {
      brand: 'OpenAI + Gemini',
      icon: 'provider_openai',
      color: '#10B981',
      score: '5.0',
      quote: '“One architectural monochrome studio unifying <strong>GPT-4.1</strong>, <strong>Gemini 2.5 Pro</strong>, <strong>Veo 3.1</strong>, on-device Creative Engine, and offline <strong>llama.cpp</strong>. Replaced four separate apps on day one.”',
      tag: '19+ Cloud & Local Models',
      role: 'Product Design Founder'
    },
    {
      brand: 'Cloudflare + Stripe',
      icon: 'ic_brand_cloudflare',
      color: '#FF7A45',
      score: '5.0',
      quote: '“Between <strong>Cloudflare &amp; Stripe OAuth MCP</strong>, the autonomous <code>/drop</code> orchestrator, and the 4-tab <strong>Network Tools</strong> recon &amp; Shadow Trap suite, nothing else on Android comes close.”',
      tag: 'Network Recon · Keystore Vault',
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

    /* ── 1. Mount 5 Choreographed Scenario Interactive Video Phones ── */
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

    /* ── 2. Mount Full Hands-On 16-Screen Interactive Sandbox Phone ── */
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

    /* ── 4. Populate Tabbed Ecosystem Strip (Providers / Distros / OAuth MCP) ── */
    const ecoWrap = document.getElementById('eco-pills-wrap');
    const ecoTabBtns = document.querySelectorAll('[data-eco-tab]');
    function renderEcoTab(kind) {
      if (!ecoWrap) return;
      ecoTabBtns.forEach(b => b.classList.toggle('active', b.dataset.ecoTab === kind));
      if (kind === 'providers') {
        ecoWrap.innerHTML = D.PROVIDERS_SHOWCASE.map(p =>
          `<span class="eco-pill">${I(p.icon, 16, 'var(--on-bg)')} ${p.name}</span>`
        ).join('');
      } else if (kind === 'distros') {
        ecoWrap.innerHTML = D.DISTROS_SHOWCASE.map(d =>
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

    /* ── 5. Populate Hands-On 16-Screen Sandbox Controls ── */
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
        summary: `<h4>Zero Cloud Intermediaries</h4><p>Goar Studio runs as a local-first studio on your Android device (v2.1.0 Build 31). Your conversations, system prompts, agent memories, workspace projects, tasks, OAuth tokens, and API keys are stored strictly on-device via Android Room (SQLite), Jetpack DataStore, and Android Keystore-backed <code>EncryptedSharedPreferences</code>.</p><h4>Direct Provider &amp; OAuth 2.1 Routing</h4><p>Outbound requests travel directly from your device only to the model providers, OAuth 2.1 PKCE MCP servers, search backends, or SSH hosts you explicitly configure. Diagnostic logs stay local unless you explicitly export a bundle.</p>`
      },
      terms_of_service: {
        href: 'terms.html',
        summary: `<h4>Local-First Software License &amp; Operator Responsibility</h4><p>Goar Studio is provided as-is as a local-first multi-model AI studio, web/game builder, browser, network toolkit, and workspace environment. Because you connect your own API keys, OAuth 2.1 tokens, SSH hosts, MCP servers, and scheduled automations, you retain full ownership and responsibility for all credentials, external calls, and generated outputs.</p>`
      },
      privacy_act: {
        href: 'data-protection.html',
        summary: `<h4>4-Layer Local Privacy Architecture &amp; App Integrity Shield</h4><p>Protected by Android Keystore encryption and App Integrity Shield. From <strong>Settings → Data &amp; Backups</strong>, export encrypted-optional ZIP archives, import ChatGPT or Claude conversation histories, configure local backups, or wipe stored databases and keys immediately.</p>`
      },
      license: {
        href: 'licenses.html',
        summary: `<h4>Open-Source Ecosystem Transparency</h4><p>Goar Studio builds on MIT and Apache 2.0 compatible libraries including Jetpack Compose, Material 3, OkHttp, Room, Media3, Coil, Sora Editor, Three.js, JLaTeXMath, JSch, Apache Commons Compress, llama.cpp, and whisper.cpp.</p>`
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
