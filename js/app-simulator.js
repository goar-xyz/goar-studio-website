/* ============================================================================
 * GOAR STUDIO 1-TO-1 INTERACTIVE HTML APP SIMULATOR ENGINE
 * Entirely mocked client-side runtime reproducing every primary screen,
 * interaction, popover, animation, and gesture of Goar Studio v2.1.0 (Build 31).
 * ============================================================================ */

(function () {
  const D = window.GOAR_DATA;
  const I = window.goarIcon;
  const W = window.goarSixBarWave;

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function hexToRgba(varName, alpha) {
    return `color-mix(in srgb, var(${varName}) ${Math.round(alpha * 100)}%, transparent)`;
  }

  function renderMarkdown(md) {
    if (!md) return '';
    let html = esc(md);
    // Code blocks ```lang\n...\n```
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, function (_, lang, code) {
      return `<div class="g-code-block"><div class="g-code-head"><span>${lang || 'code'}</span><button class="g-code-copy" data-copy-code="1">${I('copy', 12)} Copy</button></div><pre><code>${code.trim()}</code></pre></div>`;
    });
    // Inline code
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    // Headings
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Bullet lists
    html = html.replace(/(?:^- .+(?:\n|$))+/gm, function (block) {
      const items = block.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('');
      return `<ul>${items}</ul>`;
    });
    // Paragraphs
    const parts = html.split(/\n{2,}/).map(p => {
      const t = p.trim();
      if (!t || t.startsWith('<div') || t.startsWith('<ul') || t.startsWith('<h3')) return t;
      return `<p>${t.replace(/\n/g, '<br>')}</p>`;
    });
    return parts.join('');
  }

  function formatTokens(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  /* ── Custom Mini Web App Generator for Build Tab Prompt ── */
  function generateCustomMiniApp(prompt) {
    const title = prompt.trim().slice(0, 32) || 'Custom Web App';
    const lower = prompt.toLowerCase();
    if (lower.includes('pomodoro') || lower.includes('timer')) {
      return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{background:#000;color:#E8E2D6;font-family:system-ui,sans-serif;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}
.time{font-size:48px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:-1px}
.row{display:flex;gap:8px}button{background:#E8E2D6;color:#000;border:none;border-radius:999px;padding:8px 18px;font-weight:700;font-size:12px;cursor:pointer}
button.sec{background:#1c1c1c;color:#E8E2D6;border:1px solid #2a2a2a}
</style></head><body>
<div style="font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:1px">Focus Session</div>
<div class="time" id="t">25:00</div>
<div class="row"><button id="go">Start</button><button class="sec" id="rs">Reset</button></div>
<script>let s=1500,iv=null;const el=document.getElementById('t'),go=document.getElementById('go');
function draw(){el.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
go.onclick=()=>{if(iv){clearInterval(iv);iv=null;go.textContent='Start';}else{go.textContent='Pause';iv=setInterval(()=>{if(s>0){s--;draw();}},1000);}};
document.getElementById('rs').onclick=()=>{clearInterval(iv);iv=null;s=1500;go.textContent='Start';draw();};
</script></body></html>`;
    }
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}body{background:#09090b;color:#E8E2D6;font-family:system-ui,sans-serif;height:100vh;display:flex;align-items:center;justify-content:center;padding:18px}
.card{width:100%;max-width:300px;background:#141416;border:1px solid #27272a;border-radius:18px;padding:18px;text-align:center}
h2{font-size:16px;margin-bottom:6px}p{font-size:12px;color:#a1a1aa;margin-bottom:14px;line-height:1.45}
.pill{display:inline-flex;align-items:center;gap:6px;background:#1c1c1f;border:1px solid #2e2e33;border-radius:999px;padding:5px 12px;font-size:11px;margin-bottom:14px;color:#4ADE80}
button{width:100%;background:#E8E2D6;color:#000;border:none;border-radius:12px;padding:10px;font-weight:700;font-size:12.5px;cursor:pointer}
</style></head><body><div class="card">
<div class="pill">● Live via GoarSDK</div>
<h2>${esc(title)}</h2>
<p>Generated on-device with zero build step. Switch to Code to customize HTML/CSS/JS.</p>
<button id="b">Interact (0)</button>
</div><script>let n=0;document.getElementById('b').onclick=function(){this.textContent='Interact ('+(++n)+')';};</script></body></html>`;
  }

  /* ==========================================================================
   * Interactive Video Reels (Real-Time Touch Cursor, Typing, Ripples, Scroll)
   * Every chapter runs live user-like touch & typing choreography inside the
   * real 1-to-1 phone viewport — watching like a crisp 60fps product video,
   * while letting any real user click immediately to take over hands-on.
   * ========================================================================== */
  const VID_ABORT = '__GOAR_VID_ABORT__';

  const SCENARIO_CLIPS = {
    clip_ask: {
      steps: [
        {
          id: 'slash',
          label: 'Slash / Commands',
          duration: 5600,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'ask';
            sim.state.activeConvId = null;
            sim.state.draft = '';
            sim.render();
            await v.wait(420);
            await v.tap('.g-composer-textarea');
            await v.typeDraft('ask', '/', 110);
            await v.wait(950);
            await v.tap('[data-action="pick-slash"][data-insert="/plan "]');
            await v.wait(320);
            await v.typeDraft('ask', '/plan Audit edge p99 latency', 42, '/plan ');
            await v.wait(900);
          }
        },
        {
          id: 'model-picker',
          label: 'Switch Models',
          duration: 4600,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'ask';
            sim.state.activeConvId = null;
            sim.state.draft = '/plan Audit edge p99 latency';
            sim.render();
            await v.wait(320);
            await v.tap('[data-action="toggle-pop"][data-pop="model"]');
            await v.wait(1100);
            await v.moveTo('[data-action="select-model"][data-model="Google:gemini-2.5-pro"]');
            await v.wait(520);
            await v.tap('[data-action="select-model"][data-model="Anthropic:claude-sonnet-4-5"]');
            await v.wait(900);
          }
        },
        {
          id: 'thinking',
          label: 'Stream & Tools',
          duration: 6400,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'ask';
            sim.state.activeConvId = 'conv_arch';
            sim.state.draft = '';
            sim.state.expandedThoughts['conv_arch_1'] = false;
            sim.render();
            await v.wait(450);
            await v.scrollEl('[data-el="g-msg-scroll"]', 0, 480);
            await v.wait(280);
            await v.tap('[data-action="toggle-thought"]');
            await v.wait(1350);
            await v.scrollEl('[data-el="g-msg-scroll"]', 360, 1150);
            await v.wait(1400);
          }
        },
        {
          id: 'quick-tools',
          label: 'Autonomy & Tools',
          duration: 4800,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'ask';
            sim.state.activeConvId = 'conv_arch';
            sim.render();
            await v.wait(320);
            await v.tap('[data-action="toggle-pop"][data-pop="settings"]');
            await v.wait(950);
            await v.tap('[data-action="toggle-tool"][data-tool="googleSearch"]');
            await v.wait(850);
            await v.tap('[data-action="toggle-tool"][data-tool="googleSearch"]');
            await v.wait(1000);
          }
        }
      ]
    },
    clip_build: {
      steps: [
        {
          id: 'fourier',
          label: 'Fourier Live',
          duration: 5000,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'build';
            sim.state.builderPane = 'preview';
            sim._ensureBuilderTemplate('fourier-drawing');
            sim.render();
            await v.wait(1100);
            // Tap inside the live Fourier canvas ("Change Curve" button position)
            await v.tapIframeBtn('.g-builder-iframe', '#s', 0.42, 0.85);
            await v.wait(1450);
            await v.tapIframeBtn('.g-builder-iframe', '#v', 0.61, 0.85);
            await v.wait(1300);
          }
        },
        {
          id: 'code-view',
          label: 'Edit & Run Code',
          duration: 4800,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.screen = 'build';
            sim.state.builderPane = 'preview';
            sim._ensureBuilderTemplate('fourier-drawing');
            sim.render();
            await v.wait(350);
            await v.tap('[data-action="builder-pane"][data-pane="code"]');
            await v.wait(650);
            await v.scrollEl('[data-el="g-builder-code-editor"]', 260, 1200);
            await v.wait(700);
            await v.tap('[data-action="builder-apply-code"]');
            await v.wait(900);
          }
        },
        {
          id: 'gravity',
          label: 'Gravity Sim',
          duration: 5400,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.screen = 'build';
            sim.state.builderPane = 'preview';
            sim._ensureBuilderTemplate('fourier-drawing');
            sim.render();
            await v.wait(350);
            await v.tap('[data-action="builder-template"][data-slug="gravity-sim"]');
            await v.wait(950);
            // Spawn two orbiting planets live inside the Gravity canvas!
            await v.tapIframePoint('.g-builder-iframe', 0.30, 0.34);
            await v.wait(900);
            await v.tapIframePoint('.g-builder-iframe', 0.72, 0.66);
            await v.wait(1400);
          }
        },
        {
          id: 'solar',
          label: '3D Solar System',
          duration: 4600,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.screen = 'build';
            sim.state.builderPane = 'preview';
            sim.render();
            await v.wait(300);
            await v.scrollEl('.g-template-chips', 260, 550);
            await v.tap('[data-action="builder-template"][data-slug="solar-system-3d"]');
            await v.wait(2200);
          }
        }
      ]
    },
    clip_imagine: {
      steps: [
        {
          id: 'image',
          label: 'FLUX Image',
          duration: 4600,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'imagine';
            sim.state.imagineMode = 'image';
            sim.state.imagineRefAttached = false;
            sim.state.imaginePrompt = '';
            sim._ensureImagineDemoAsset('image', 'Obsidian studio sculpture in mist');
            sim.render();
            await v.wait(750);
            await v.tap('[data-action="imagine-cycle-aspect"]');
            await v.wait(950);
            await v.tap('[data-action="imagine-cycle-aspect"]');
            await v.wait(1100);
          }
        },
        {
          id: 'video',
          label: 'Veo 3.1 + Ref',
          duration: 5400,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.screen = 'imagine';
            sim.state.imagineMode = 'image';
            sim.state.imagineRefAttached = false;
            sim.state.imaginePrompt = '';
            sim.render();
            await v.wait(350);
            await v.tap('[data-action="imagine-mode"][data-imode="video"]');
            await v.wait(550);
            await v.tap('[data-action="imagine-ref"]');
            await v.wait(650);
            await v.typeDraft('imagine', 'Drone sweep over obsidian monolith', 38);
            await v.wait(320);
            await v.tap('[data-action="primary-send"]');
            await v.wait(1500);
          }
        },
        {
          id: 'providers',
          label: 'Model Switcher',
          duration: 4400,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.screen = 'imagine';
            sim.state.imagineMode = 'video';
            sim.render();
            await v.wait(350);
            await v.tap('[data-action="imagine-toggle-model"]');
            await v.wait(1350);
            await v.tap('[data-action="imagine-pick-model"]');
            await v.wait(1200);
          }
        },
        {
          id: 'audio',
          label: 'Eleven v3 Audio',
          duration: 4600,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.screen = 'imagine';
            sim.state.imagineMode = 'video';
            sim.render();
            await v.wait(350);
            await v.tap('[data-action="imagine-mode"][data-imode="audio"]');
            sim._ensureImagineDemoAsset('audio', 'Studio ambient voice narration');
            sim.render();
            await v.wait(950);
            await v.tap('[data-action="imagine-cycle-voice"]');
            await v.wait(1100);
            await v.tap('[data-action="imagine-cycle-voice"]');
            await v.wait(1100);
          }
        }
      ]
    },
    clip_agents_voice: {
      steps: [
        {
          id: 'agents',
          label: '6 SOUL.md Agents',
          duration: 5400,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.screen = 'ask';
            sim.state.activeConvId = null;
            sim.state.voiceOpen = false;
            sim.state.drawerOpen = false;
            sim.render();
            await v.wait(420);
            await v.tap('[data-action="open-drawer"]');
            await v.wait(550);
            await v.tap('[data-action="drawer-tab"][data-dtab="bots"]');
            await v.wait(1100);
            await v.scrollEl('.g-drawer-scroll', 150, 850);
            await v.wait(650);
            await v.tap('[data-action="open-bot"][data-bot="architect"]');
            await v.wait(950);
          }
        },
        {
          id: 'hold-voice',
          label: 'Hold -> Voice',
          duration: 4600,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'ask';
            sim.state.draft = '';
            sim.render();
            await v.wait(420);
            // Real glowing circular 1.3s hold animation on the 6-bar voice wave button!
            await v.holdVoice('[data-action="primary-send"]', 1250);
            await v.wait(1500);
          }
        },
        {
          id: 'thinking',
          label: 'Voice Thinking',
          duration: 3800,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.screen = 'ask';
            sim.state.voiceOpen = true;
            sim.state.voicePhase = 'listening';
            sim.state.voiceCaption = '“Hey Goar, inspect our API latency trace and summarize the bottleneck.”';
            sim.render();
            await v.wait(650);
            await v.tap('[data-action="voice-orb-tap"]');
            await v.wait(2200);
          }
        },
        {
          id: 'speaking',
          label: 'Voice Speaking',
          duration: 4600,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.screen = 'ask';
            sim.state.voiceOpen = true;
            sim.state.voicePhase = 'thinking';
            sim.state.voiceCaption = 'Inspecting worker-trace.json via @architect + Ubuntu PRoot sandbox…';
            sim.render();
            await v.wait(480);
            await v.tap('[data-action="voice-orb-tap"]');
            await v.wait(1400);
            await v.tap('[data-action="voice-preset"]');
            await v.wait(1700);
          }
        }
      ]
    },
    clip_workspaces: {
      steps: [
        {
          id: 'terminal',
          label: 'Linux PRoot',
          duration: 6200,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.voiceOpen = false;
            sim.state.screen = 'terminal';
            sim.state.termLines = [
              'Goar Studio VT100 · PRoot Ubuntu 24.04 LTS (arm64-v8a)',
              ''
            ];
            sim.state.termInput = '';
            sim.render();
            await v.wait(420);
            await v.typeTerminal('neofetch', 75);
            await v.wait(1100);
            await v.typeTerminal('uname -a', 68);
            await v.wait(1500);
          }
        },
        {
          id: 'docs',
          label: 'Revise .docx',
          duration: 4800,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.screen = 'docs';
            sim.state.docDiffs[0].status = 'pending';
            sim.render();
            await v.wait(1100);
            await v.tap('[data-action="doc-diff"][data-res="accepted"]');
            await v.wait(1800);
            sim.state.docDiffs[0].status = 'pending';
          }
        },
        {
          id: 'network',
          label: 'Network Tools',
          duration: 5000,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.screen = 'audit';
            sim.state.networkTab = 'lookup';
            sim.render();
            await v.wait(1100);
            await v.tap('[data-action="net-tab"][data-ntab="lan"]');
            await v.wait(1150);
            await v.tap('[data-action="net-tab"][data-ntab="trap"]');
            await v.wait(1150);
          }
        },
        {
          id: 'settings',
          label: 'Tiered Settings',
          duration: 5400,
          play: async function (sim, v) {
            sim.closePopovers();
            sim.state.drawerOpen = false;
            sim.state.screen = 'settings';
            sim.state.settingsSubpage = null;
            sim.state.settingsAdvancedOpen = false;
            sim.state.settingsSearch = '';
            sim.render();
            await v.wait(700);
            await v.tap('[data-action="settings-open"][data-skey="appearance"]');
            await v.wait(700);
            await v.tap('[data-action="set-palette"][data-pal="COBALT"]');
            await v.wait(900);
            await v.tap('[data-action="set-palette"][data-pal="TINTED"]');
            await v.wait(900);
            await v.tap('[data-action="set-palette"][data-pal="MONOCHROME"]');
            await v.wait(650);
          }
        }
      ]
    }
  };

  /* ==========================================================================
   * GoarAppSimulator Class
   * ========================================================================== */
  class GoarAppSimulator {
    constructor(mountEl, options = {}) {
      this.mountEl = mountEl;
      this.onTourChange = options.onTourChange || null;
      this.onThemeSync = options.onThemeSync || null;
      this.onClipStep = options.onClipStep || null;
      this.onClipStateChange = options.onClipStateChange || null;
      this._clipId = null;
      this._clipIndex = 0;
      this._clipTimer = null;
      this._clipPlaying = false;
      this._clipPausedByUser = false;
      this._videoRunId = 0;
      this._videoRunning = false;
      this._cursorLayer = null;
      this._cursorEl = null;
      this._visible = true;

      this.state = {
        screen: 'ask', // ask | imagine | build | browser | files | terminal | docs | tasks | settings
        drawerOpen: false,
        drawerTab: 'chats', // chats | bots
        drawerSearch: '',

        // Ask state
        conversations: JSON.parse(JSON.stringify(D.CONVERSATIONS)),
        activeConvId: null, // null = ChatWelcome centerpiece
        draft: '',
        composerExpanded: false,
        attachments: [],
        selectedModel: D.MODELS[0].id,
        popover: null, // null | attach | model | context | settings
        vibeMode: 'smart', // ask | smart | auto
        tools: {
          thinking: true,
          thinkingLevel: 'Medium',
          codeExec: true,
          googleSearch: false,
          webSearch: true,
          shell: true
        },
        isStreaming: false,
        streamTimer: null,
        expandedThoughts: {},

        // Live Voice Overlay
        voiceOpen: false,
        voicePhase: 'idle', // idle | listening | thinking | speaking
        voicePresetIdx: 0,
        voiceSpeedIdx: 0,
        voiceMicMuted: false,
        voiceSpeakerMuted: false,
        voiceCaption: 'Speak naturally. The orb stays still in silence and responds as you and Goar talk.',

        // Imagine Playground state
        imagineMode: 'video', // video | image | audio
        imagineModels: {
          video: D.PLAYGROUND_MODELS.video[0].id,
          image: D.PLAYGROUND_MODELS.image[0].id,
          audio: D.PLAYGROUND_MODELS.audio[0].id
        },
        imagineModelOpen: false,
        imagineRes: '1080p',
        imagineAspect: '16:9',
        imagineDuration: 10,
        imagineSound: true,
        imagineDraft: false,
        imagineVoice: 'alloy',
        imagineRefAttached: false,
        imaginePrompt: '',
        imagineGenerating: false,
        imagineAssets: [],
        imagineActiveAssetId: null,

        // Build state
        builderProjects: [
          {
            slug: D.BUILDER_TEMPLATES[0].slug,
            title: D.BUILDER_TEMPLATES[0].title,
            html: D.BUILDER_TEMPLATES[0].html,
            updated: 'Just now'
          }
        ],
        builderActiveSlug: D.BUILDER_TEMPLATES[0].slug,
        builderPane: 'preview', // preview | code
        builderTemplates: D.BUILDER_TEMPLATES.slice(),
        builderPrompt: '',
        builderSpinning: false,

        // Browser state
        browserEngine: 'google',
        browserUrl: '',
        browserLoadedUrl: '',
        browserDevToolsOpen: true,
        browserDevTab: 'network',
        browserSpoofDesktop: true,
        browserAiControl: true,

        // Files state
        filesSource: 'local', // local | ubuntu | ssh
        filesList: JSON.parse(JSON.stringify(D.WORKSPACE_FILES)),
        filesActiveName: null,

        // Terminal state
        termLines: [
          'Goar Studio VT100 · PRoot Ubuntu 24.04 LTS (arm64-v8a)',
          'Type "help" for built-in mocked commands (ls, neofetch, uname -a, git status, ps, clear).',
          ''
        ],
        termInput: '',

        // Document Editor state
        docTitle: 'Goar Architecture Brief',
        docFileMenu: false,
        docMode: 'Suggesting',
        docDiffs: [
          {
            id: 'd1',
            author: 'AI Assistant',
            reason: 'Clarify local-first encryption guarantee',
            original: 'API keys are stored on the phone for convenience.',
            revised: 'API keys, SSH secrets, and vault profiles are encrypted on-device via Android Keystore-backed EncryptedSharedPreferences.',
            status: 'pending' // pending | accepted | rejected
          }
        ],
        docPrompt: '',

        // Tasks state
        tasksHub: 'scheduled', // scheduled | watchtower | digest
        tasks: JSON.parse(JSON.stringify(D.TASKS)),
        calMonthOffset: 0,

        // Settings & v2.1.0 Palette / Network / OAuth / PiP state
        paletteStyle: 'MONOCHROME', // MONOCHROME | CHAMPAGNE | COBALT | TINTED
        settingsSearch: '',
        settingsSubpage: null, // null | appearance | provider | skills | api_hub | datacontrol | about
        settingsAdvancedOpen: false,
        legalModalKey: null,
        networkTab: 'lookup', // lookup | lan | traffic | trap
        oauthConnected: { Google: true, GitHub: true, Cloudflare: true, Notion: false, Linear: false, Vercel: false, Supabase: false, Stripe: false, Figma: false },
        pipOpen: false,
        pipTakeover: false,

        // Snackbar
        snackbar: null,
        snackbarTimer: null
      };

      this._rafId = null;
      this._voiceRafId = null;
      this._holdTimer = null;
      this._holdStart = 0;

      if (options.initialClip && SCENARIO_CLIPS[options.initialClip]) {
        this._clipId = options.initialClip;
        this._clipIndex = 0;
        // Pre-render an immediate rich initial frame on first paint before async video choreography ticks
        this._primeClipFirstFrame(options.initialClip);
        this.render();
        if (options.autoPlay !== false) {
          this.startClip(options.initialClip, 0);
        }
      } else {
        this.render();
      }
    }

    _primeClipFirstFrame(clipId) {
      if (clipId === 'clip_ask') {
        this.state.screen = 'ask';
        this.state.activeConvId = null;
        this.state.draft = '';
      } else if (clipId === 'clip_build') {
        this.state.screen = 'build';
        this.state.builderPane = 'preview';
        this._ensureBuilderTemplate('fourier-drawing');
      } else if (clipId === 'clip_imagine') {
        this.state.screen = 'imagine';
        this.state.imagineMode = 'image';
        this._ensureImagineDemoAsset('image', 'Obsidian studio sculpture in mist');
      } else if (clipId === 'clip_agents_voice') {
        this.state.screen = 'ask';
        this.state.drawerOpen = true;
        this.state.drawerTab = 'bots';
      } else if (clipId === 'clip_workspaces') {
        this.state.screen = 'terminal';
      }
    }

    /* ── Live Interaction Video Director (Gliding Fingertip, Tap Ripples, Live Typing, Scroll) ── */
    _ensureBuilderTemplate(slug) {
      const tpl = D.BUILDER_TEMPLATES.find(t => t.slug === slug);
      if (!tpl) return;
      if (!this.state.builderProjects.find(p => p.slug === tpl.slug)) {
        this.state.builderProjects.unshift({ slug: tpl.slug, title: tpl.title, html: tpl.html, updated: 'Just now' });
      }
      this.state.builderActiveSlug = tpl.slug;
    }

    _ensureImagineDemoAsset(mode, title) {
      let existing = this.state.imagineAssets.find(a => a.mode === mode);
      if (!existing) {
        this._createMockImagineAsset(title, mode);
        existing = this.state.imagineAssets[0];
      }
      this.state.imagineActiveAssetId = existing.id;
    }

    _ensureCursorLayer() {
      const host = this.mountEl.parentElement || this.mountEl;
      if (!this._cursorLayer || !this._cursorLayer.isConnected) {
        const layer = document.createElement('div');
        layer.className = 'g-vid-layer';
        const cur = document.createElement('div');
        cur.className = 'g-vid-cursor';
        layer.appendChild(cur);
        host.appendChild(layer);
        this._cursorLayer = layer;
        this._cursorEl = cur;
      }
      return { layer: this._cursorLayer, cur: this._cursorEl };
    }

    _hideCursor() {
      if (this._cursorEl) {
        this._cursorEl.classList.remove('visible', 'pressing');
      }
    }

    _spawnRipple(x, y) {
      const { layer } = this._ensureCursorLayer();
      const r = document.createElement('div');
      r.className = 'g-vid-ripple';
      r.style.left = x + 'px';
      r.style.top = y + 'px';
      layer.appendChild(r);
      setTimeout(() => r.remove(), 600);
    }

    _coordsOfElement(el, xRatio, yRatio) {
      const { layer } = this._ensureCursorLayer();
      const lr = layer.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const rx = typeof xRatio === 'number' ? xRatio : 0.5;
      const ry = typeof yRatio === 'number' ? yRatio : 0.5;
      return {
        x: Math.max(18, Math.min(lr.width - 18, (er.left - lr.left) + er.width * rx)),
        y: Math.max(24, Math.min(lr.height - 24, (er.top - lr.top) + er.height * ry))
      };
    }

    _createVideoAPI(runId) {
      const sim = this;
      const check = () => {
        if (runId !== sim._videoRunId || !sim._clipPlaying || !sim._visible) {
          throw VID_ABORT;
        }
      };

      const wait = (ms) => new Promise((resolve, reject) => {
        if (runId !== sim._videoRunId || !sim._clipPlaying || !sim._visible) {
          reject(VID_ABORT);
          return;
        }
        const id = setTimeout(() => {
          if (runId !== sim._videoRunId || !sim._clipPlaying || !sim._visible) {
            reject(VID_ABORT);
          } else {
            resolve();
          }
        }, ms);
        sim._clipTimer = id;
      });

      const moveToCoords = async (x, y) => {
        check();
        const { cur } = sim._ensureCursorLayer();
        cur.classList.add('visible');
        cur.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(1)`;
        await wait(540);
      };

      const moveTo = async (selector, xRatio, yRatio) => {
        check();
        const el = sim.mountEl.querySelector(selector);
        if (!el) return null;
        const pt = sim._coordsOfElement(el, xRatio, yRatio);
        await moveToCoords(pt.x, pt.y);
        return { el, pt };
      };

      const pressVisual = async (x, y) => {
        check();
        const { cur } = sim._ensureCursorLayer();
        cur.classList.add('pressing');
        cur.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(0.76)`;
        sim._spawnRipple(x, y);
        await wait(160);
        cur.classList.remove('pressing');
        cur.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(1)`;
      };

      const tap = async (selector) => {
        const res = await moveTo(selector);
        if (!res) return;
        await pressVisual(res.pt.x, res.pt.y);
        check();
        // Trigger the exact real element interaction cleanly (without firing user pointerdown pause)
        const el = sim.mountEl.querySelector(selector);
        if (!el) return;
        if (el.dataset.action === 'primary-send') {
          sim._handlePrimarySend(el.dataset.mode);
        } else if (el.matches('textarea, input')) {
          // Visual tap on input without scrolling browser window
        } else {
          el.click();
        }
        await wait(240);
      };

      const holdVoice = async (selector, holdMs) => {
        const res = await moveTo(selector);
        if (!res) return;
        const { cur } = sim._ensureCursorLayer();
        cur.classList.add('pressing');
        cur.style.transform = `translate3d(${res.pt.x.toFixed(1)}px, ${res.pt.y.toFixed(1)}px, 0) scale(0.8)`;
        sim._spawnRipple(res.pt.x, res.pt.y);

        const arc = res.el.querySelector('.g-hold-arc');
        const t0 = performance.now();
        const dur = holdMs || 1200;
        await new Promise((resolve, reject) => {
          const tick = (now) => {
            if (runId !== sim._videoRunId || !sim._clipPlaying || !sim._visible) {
              reject(VID_ABORT);
              return;
            }
            const p = Math.min(1, (now - t0) / dur);
            if (arc) arc.setAttribute('stroke-dashoffset', String(128.8 * (1 - p)));
            if (p >= 1) resolve();
            else requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
        cur.classList.remove('pressing');
        cur.style.transform = `translate3d(${res.pt.x.toFixed(1)}px, ${res.pt.y.toFixed(1)}px, 0) scale(1)`;
        sim.state.voiceOpen = true;
        sim.state.voicePhase = 'listening';
        sim.state.voiceCaption = '“Hey Goar, inspect our API latency trace and summarize the bottleneck.”';
        sim.render();
      };

      const typeDraft = async (mode, fullText, msPerChar, startPrefix) => {
        check();
        let curStr = startPrefix || '';
        const rem = fullText.slice(curStr.length);
        for (let i = 0; i < rem.length; i++) {
          check();
          curStr += rem[i];
          if (mode === 'ask') sim.state.draft = curStr;
          else if (mode === 'imagine') sim.state.imaginePrompt = curStr;
          else if (mode === 'build') sim.state.builderPrompt = curStr;
          sim.render();
          await wait(msPerChar || 48);
        }
      };

      const typeTerminal = async (cmd, msPerChar) => {
        check();
        const inp = sim.mountEl.querySelector('[data-el="g-term-input"]');
        if (inp) {
          const pt = sim._coordsOfElement(inp, 0.35, 0.5);
          await moveToCoords(pt.x, pt.y);
        }
        let buf = '';
        for (let i = 0; i < cmd.length; i++) {
          check();
          buf += cmd[i];
          sim.state.termInput = buf;
          const liveInp = sim.mountEl.querySelector('[data-el="g-term-input"]');
          if (liveInp) liveInp.value = buf;
          await wait(msPerChar || 70);
        }
        await wait(220);
        check();
        sim._runTerminalCommand(cmd);
      };

      const scrollEl = async (selector, toY, duration) => {
        check();
        const el = sim.mountEl.querySelector(selector);
        if (!el) return;
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const isHoriz = el.classList.contains('g-template-chips');
        const t0 = performance.now();
        const dur = duration || 800;
        await new Promise((resolve, reject) => {
          const tick = (now) => {
            if (runId !== sim._videoRunId || !sim._clipPlaying || !sim._visible) {
              reject(VID_ABORT);
              return;
            }
            const p = Math.min(1, (now - t0) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            if (isHoriz) el.scrollLeft = fromX + (toY - fromX) * ease;
            else el.scrollTop = fromY + (toY - fromY) * ease;
            if (p >= 1) resolve();
            else requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      };

      const tapIframeBtn = async (iframeSelector, innerBtnSelector, fallbackRx, fallbackRy) => {
        const res = await moveTo(iframeSelector, fallbackRx, fallbackRy);
        if (!res) return;
        await pressVisual(res.pt.x, res.pt.y);
        try {
          const doc = res.el.contentDocument;
          const btn = doc && doc.querySelector(innerBtnSelector);
          if (btn) btn.click();
        } catch (_) {}
      };

      const tapIframePoint = async (iframeSelector, rx, ry) => {
        const res = await moveTo(iframeSelector, rx, ry);
        if (!res) return;
        await pressVisual(res.pt.x, res.pt.y);
        try {
          const doc = res.el.contentDocument;
          const canvas = doc && doc.querySelector('canvas');
          if (canvas) {
            const cr = canvas.getBoundingClientRect();
            const evt = new MouseEvent('click', {
              bubbles: true,
              clientX: cr.left + cr.width * rx,
              clientY: cr.top + cr.height * ry
            });
            canvas.dispatchEvent(evt);
          }
        } catch (_) {}
      };

      return { wait, moveTo, tap, holdVoice, typeDraft, typeTerminal, scrollEl, tapIframeBtn, tapIframePoint };
    }

    async _runVideoLoop(startIdx) {
      const clip = SCENARIO_CLIPS[this._clipId];
      if (!clip) return;
      const runId = ++this._videoRunId;
      this._videoRunning = true;
      const v = this._createVideoAPI(runId);
      let idx = startIdx % clip.steps.length;

      try {
        while (runId === this._videoRunId && this._clipPlaying && this._visible) {
          const step = clip.steps[idx];
          this._clipIndex = idx;
          if (this.onClipStep) {
            this.onClipStep({ clipId: this._clipId, index: idx, step, total: clip.steps.length, playing: true });
          }
          await step.play(this, v);
          idx = (idx + 1) % clip.steps.length;
        }
      } catch (err) {
        if (err !== VID_ABORT) {
          // Graceful recovery without breaking simulator interactivity
        }
      } finally {
        if (runId === this._videoRunId) {
          this._videoRunning = false;
          if (!this._clipPlaying) this._hideCursor();
        }
      }
    }

    startClip(clipId, startIndex) {
      const clip = SCENARIO_CLIPS[clipId || this._clipId];
      if (!clip) return;
      clearTimeout(this._clipTimer);
      this._clipId = clipId || this._clipId;
      this._clipPlaying = true;
      this._clipPausedByUser = false;
      this._clipIndex = typeof startIndex === 'number' ? (startIndex % clip.steps.length) : 0;
      if (this.onClipStateChange) this.onClipStateChange({ playing: true, pausedByUser: false, clipId: this._clipId });
      if (this._visible) {
        this._runVideoLoop(this._clipIndex);
      }
    }

    jumpClipStep(index, keepPlaying) {
      const clip = SCENARIO_CLIPS[this._clipId];
      if (!clip) return;
      const idx = Math.max(0, Math.min(clip.steps.length - 1, index));
      clearTimeout(this._clipTimer);
      this._clipIndex = idx;
      if (keepPlaying === false) {
        this._clipPlaying = false;
        this._clipPausedByUser = true;
        this._videoRunId++;
        this._hideCursor();
        if (this.onClipStateChange) this.onClipStateChange({ playing: false, pausedByUser: true, clipId: this._clipId });
        return;
      }
      this._clipPlaying = true;
      this._clipPausedByUser = false;
      if (this.onClipStateChange) this.onClipStateChange({ playing: true, pausedByUser: false, clipId: this._clipId });
      this._runVideoLoop(idx);
    }

    pauseClip(byUser) {
      clearTimeout(this._clipTimer);
      this._clipTimer = null;
      this._clipPlaying = false;
      this._videoRunId++;
      this._videoRunning = false;
      this._hideCursor();
      if (byUser) this._clipPausedByUser = true;
      if (this.onClipStateChange) this.onClipStateChange({ playing: false, pausedByUser: this._clipPausedByUser, clipId: this._clipId });
    }

    resumeClip() {
      if (!this._clipId) return;
      this._clipPausedByUser = false;
      this._clipPlaying = true;
      if (this.onClipStateChange) this.onClipStateChange({ playing: true, pausedByUser: false, clipId: this._clipId });
      if (this._visible) {
        this._runVideoLoop(this._clipIndex);
      }
    }

    stopClip() {
      clearTimeout(this._clipTimer);
      this._clipTimer = null;
      this._clipPlaying = false;
      this._videoRunId++;
      this._videoRunning = false;
      this._hideCursor();
    }

    setVisible(isVisible) {
      if (this._visible === isVisible) return;
      this._visible = isVisible;
      if (!isVisible) {
        clearTimeout(this._clipTimer);
        this._videoRunId++;
        this._videoRunning = false;
        this._hideCursor();
        this._stopAnimations();
      } else {
        this._startAnimations();
        if (this._clipId && !this._clipPausedByUser && this._clipPlaying) {
          this._runVideoLoop(this._clipIndex);
        }
      }
    }

    /* ── Public API for Website Guided Tour Controls ── */
    navigateToDemo(demoId) {
      this.closePopovers();
      this.state.drawerOpen = false;
      this.state.voiceOpen = false;
      this.state.settingsSubpage = null;
      this.state.legalModalKey = null;

      switch (demoId) {
        case 'welcome':
          this.state.screen = 'ask';
          this.state.activeConvId = null;
          this.state.draft = '';
          break;
        case 'chat-thinking':
          this.state.screen = 'ask';
          this.state.activeConvId = 'conv_arch';
          this.state.expandedThoughts['conv_arch_1'] = true;
          break;
        case 'slash':
          this.state.screen = 'ask';
          this.state.activeConvId = null;
          this.state.draft = '/';
          break;
        case 'voice':
          this.state.screen = 'ask';
          this.state.voiceOpen = true;
          this.state.voicePhase = 'listening';
          this.state.voiceCaption = '“Summarize today’s Watchtower alerts and check my Ubuntu sandbox disk usage.”';
          break;
        case 'imagine':
          this.state.screen = 'imagine';
          this.state.imagineMode = 'image';
          if (this.state.imagineAssets.length === 0) {
            this._createMockImagineAsset('Monochrome obsidian architecture in warm studio fog', 'image');
          }
          break;
        case 'build':
          this.state.screen = 'build';
          this.state.builderPane = 'preview';
          break;
        case 'agents':
          this.state.screen = 'ask';
          this.state.drawerOpen = true;
          this.state.drawerTab = 'bots';
          break;
        case 'terminal':
          this.state.screen = 'terminal';
          break;
        case 'files':
          this.state.screen = 'files';
          this.state.filesActiveName = 'SOUL.md';
          break;
        case 'docs':
          this.state.screen = 'docs';
          break;
        case 'browser':
          this.state.screen = 'browser';
          this.state.browserLoadedUrl = 'https://goarxyz.com';
          this.state.browserDevToolsOpen = true;
          break;
        case 'tasks':
          this.state.screen = 'tasks';
          break;
        case 'network':
          this.state.screen = 'audit';
          this.state.networkTab = 'lookup';
          break;
        case 'oauth':
          this.state.screen = 'settings';
          this.state.settingsSubpage = 'api_hub';
          break;
        case 'settings':
          this.state.screen = 'settings';
          this.state.settingsSubpage = null;
          break;
        case 'about':
          this.state.screen = 'settings';
          this.state.settingsSubpage = 'about';
          break;
      }

      this.render();
      if (demoId === 'slash') {
        const ta = this.mountEl.querySelector('.g-composer-textarea');
        if (ta) { ta.focus(); ta.setSelectionRange(1, 1); }
      }
      if (this.onTourChange) this.onTourChange(demoId);
    }

    showSnackbar(msg) {
      this.state.snackbar = msg;
      clearTimeout(this.state.snackbarTimer);
      this.render();
      this.state.snackbarTimer = setTimeout(() => {
        this.state.snackbar = null;
        this.render();
      }, 2600);
    }

    closePopovers() {
      this.state.popover = null;
      this.state.imagineModelOpen = false;
      this.state.docFileMenu = false;
    }

    getCurrentConv() {
      return this.state.conversations.find(c => c.id === this.state.activeConvId) || null;
    }

    getSelectedModelObj() {
      return D.MODELS.find(m => m.id === this.state.selectedModel) || D.MODELS[0];
    }

    getContextStats() {
      const conv = this.getCurrentConv();
      const model = this.getSelectedModelObj();
      const used = conv ? conv.tokens : 480;
      const budget = Math.min(model.context, 128000);
      return { used, budget, pct: Math.min(1, used / budget) };
    }

    /* ── Main Render Pipeline ── */
    render() {
      this._stopAnimations();

      const s = this.state;
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

      let bodyHtml = '';
      if (s.screen === 'ask') bodyHtml = this._renderAskScreen();
      else if (s.screen === 'imagine') bodyHtml = this._renderImagineScreen();
      else if (s.screen === 'build') bodyHtml = this._renderBuildScreen();
      else if (s.screen === 'browser') bodyHtml = this._renderBrowserScreen();
      else if (s.screen === 'files') bodyHtml = this._renderFilesScreen();
      else if (s.screen === 'terminal') bodyHtml = this._renderTerminalScreen();
      else if (s.screen === 'docs') bodyHtml = this._renderDocsScreen();
      else if (s.screen === 'tasks') bodyHtml = this._renderTasksScreen();
      else if (s.screen === 'audit') bodyHtml = this._renderNetworkAuditScreen();
      else if (s.screen === 'settings') bodyHtml = this._renderSettingsScreen();

      const drawerHtml = s.drawerOpen ? this._renderDrawer() : '';
      const voiceHtml = s.voiceOpen ? this._renderVoiceOverlay() : '';
      const pipHtml = s.pipOpen ? this._renderManusPip() : '';
      const snackHtml = s.snackbar ? `<div class="g-snackbar">${esc(s.snackbar)}</div>` : '';
      const modalHtml = s.legalModalKey ? this._renderLegalModal() : '';

      this.mountEl.innerHTML = `
        <div class="goar-app-viewport" data-palette="${esc(s.paletteStyle)}">
          <div class="g-statusbar">
            <span>${timeStr}</span>
            <span class="g-statusbar-camera"></span>
            <span class="g-statusbar-right">
              <span>5G</span>
              <svg width="15" height="11" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
                <rect x="0.5" y="1" width="14" height="10" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/>
                <rect x="2.2" y="2.7" width="9.8" height="6.6" rx="1"/>
                <rect x="15.5" y="3.8" width="1.8" height="4.4" rx="0.8"/>
              </svg>
            </span>
          </div>
          <div class="g-screen-host">
            ${bodyHtml}
            ${pipHtml}
            ${drawerHtml}
            ${voiceHtml}
            ${snackHtml}
            ${modalHtml}
          </div>
          <div class="g-navbar-pill"><span></span></div>
        </div>
      `;

      this._bindEvents();
      this._startAnimations();
    }

    /* ── MainTopHeaderBar.kt v2.1.0 (Boxless monochrome chrome + MainTopTabSegmentedPill) ── */
    _renderMainTopHeaderBar(activeTab) {
      const rightIcon = activeTab === 'imagine' ? 'refresh' : 'edit';
      const rightLabel = activeTab === 'ask' ? 'New Chat' : activeTab === 'imagine' ? 'Attach Reference' : 'New App';
      const drawerGlyph = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h12M4 17h16"/></svg>';
      return `
        <div class="g-topbar">
          <button class="g-topbar-circle-btn" data-action="open-drawer" title="Open menu" aria-label="Open menu" style="color:var(--icon-chrome)">
            ${drawerGlyph}
          </button>
          <div class="g-topbar-tabs" role="tablist">
            <button class="g-topbar-tab ${activeTab === 'ask' ? 'active' : ''}" data-tab="ask" data-action="switch-tab">
              <span class="g-topbar-tab-label">Ask</span>
            </button>
            <button class="g-topbar-tab ${activeTab === 'imagine' ? 'active' : ''}" data-tab="imagine" data-action="switch-tab">
              <span class="g-topbar-tab-label">Imagine</span>
            </button>
            <button class="g-topbar-tab ${activeTab === 'build' ? 'active' : ''}" data-tab="build" data-action="switch-tab">
              <span class="g-topbar-tab-label">Build</span>
            </button>
          </div>
          <button class="g-topbar-circle-btn" data-action="top-right-action" title="${rightLabel}" aria-label="${rightLabel}" style="color:var(--icon-chrome)">
            ${I(rightIcon, 19, 'var(--icon-chrome)')}
          </button>
        </div>
      `;
    }

    /* ── Screen 1: Ask (ChatApp + ChatWelcome + MessageList + ChatBottomBar) ── */
    _renderAskScreen() {
      const conv = this.getCurrentConv();
      let centerHtml = '';
      if (!conv) {
        centerHtml = `
          <div class="g-chat-welcome">
            <div class="g-welcome-aura">
              <img src="assets/ic_goar_mark.png" alt="Goar Studio" class="goar-mark-img goar-mark-dark-only"/>
              <img src="assets/ic_goar_mark_black.png" alt="Goar Studio" class="goar-mark-img goar-mark-light-only"/>
            </div>
            <div class="g-welcome-title">Goar Studio</div>
          </div>
        `;
      } else {
        const msgsHtml = conv.messages.map((m, idx) => {
          if (m.role === 'user') {
            const attHtml = (m.attachments && m.attachments.length)
              ? `<div class="g-user-attach-row">${m.attachments.map(a => `<span class="g-user-attach-chip">${I('ic_goar_file', 12)} ${esc(a.name)}</span>`).join('')}</div>`
              : '';
            return `
              <div class="g-msg-row-user">
                <div class="g-user-bubble">${attHtml}${esc(m.text)}</div>
              </div>
            `;
          } else {
            const tKey = `${conv.id}_${idx}`;
            const exp = !!this.state.expandedThoughts[tKey];
            const toolCount = (m.tools && m.tools.length) ? ` · Called ${m.tools.length} tool${m.tools.length > 1 ? 's' : ''}` : '';
            const thoughtHtml = (m.thought || (m.tools && m.tools.length)) ? `
              <div class="g-thought-block ${exp ? 'expanded' : ''}">
                <button class="g-thought-header" data-action="toggle-thought" data-tkey="${tKey}">
                  ${I('ic_nav_think', 14, 'var(--primary)')}
                  <span>Thought for ${esc(m.thoughtTime || '1.8s')}${toolCount}</span>
                  <span class="g-thought-chevron">${I('chevron_right', 14)}</span>
                </button>
                <div class="g-thought-body">
                  ${m.thought ? `<div>${esc(m.thought)}</div>` : ''}
                  ${(m.tools && m.tools.length) ? `<div class="g-tool-pill-row">${m.tools.map(t => `<span class="g-tool-chip"><span class="g-tool-dot"></span><strong>${esc(t.name)}</strong> ${esc(t.detail)}</span>`).join('')}</div>` : ''}
                </div>
              </div>
            ` : '';
            const streamingDot = m.streaming ? `<span class="g-typing-dot"></span>` : '';
            return `
              <div class="g-msg-row-assistant">
                ${thoughtHtml}
                <div class="g-assistant-md">${renderMarkdown(m.markdown)}${streamingDot}</div>
                ${!m.streaming ? `
                  <div class="g-assistant-actions">
                    <button class="g-msg-action-btn" data-action="copy-msg" data-idx="${idx}" title="Copy">${I('copy', 15)}</button>
                    <button class="g-msg-action-btn" data-action="regen-msg" data-idx="${idx}" title="Regenerate">${I('refresh', 15)}</button>
                    <button class="g-msg-action-btn" data-action="fork-msg" title="Fork chat">${I('ic_nav_fork', 15)}</button>
                    <span class="g-model-tag-pill">${esc(m.model || this.getSelectedModelObj().label)}</span>
                  </div>
                ` : ''}
              </div>
            `;
          }
        }).join('');
        centerHtml = `<div class="g-messages-scroll" data-el="g-msg-scroll">${msgsHtml}</div>`;
      }

      return `
        ${this._renderMainTopHeaderBar('ask')}
        ${centerHtml}
        ${this._renderComposer({
          placeholder: 'Ask Goar',
          value: this.state.draft,
          mode: 'ask',
          isLoading: this.state.isStreaming
        })}
      `;
    }

    /* ── Unified Agora Composer Bar (ChatBottomBar.kt + GoarUnifiedComposerBar.kt) ── */
    _renderComposer({ placeholder, value, mode, isLoading }) {
      const s = this.state;
      const model = this.getSelectedModelObj();
      const ctx = this.getContextStats();
      const hasDraft = value.trim().length > 0 || s.attachments.length > 0;
      const circ = 2 * Math.PI * 8;
      const dashOffset = circ * (1 - ctx.pct);
      const ringColor = ctx.pct > 0.85 ? 'var(--error)' : 'var(--primary)';

      // Detect Slash Command Palette or @Mention Palette (only in Ask mode)
      let paletteHtml = '';
      if (mode === 'ask' && !s.popover) {
        const trimmed = value.trimStart();
        if (trimmed.startsWith('/') && !trimmed.includes('\n')) {
          paletteHtml = this._renderSlashPalette(trimmed);
        } else {
          const atMatch = value.match(/(?:^|\s)@([a-zA-Z0-9_-]*)$/);
          if (atMatch) {
            paletteHtml = this._renderMentionPalette(atMatch[1]);
          }
        }
      }

      const popoverHtml = s.popover ? this._renderComposerPopover() : '';

      const attachRow = s.attachments.length ? `
        <div class="g-composer-attach-preview">
          ${s.attachments.map((a, i) => `
            <span class="g-attach-chip">
              ${I(a.icon || 'ic_goar_file', 14, 'var(--m-cmp-plus)')}
              <span>${esc(a.name)}</span>
              <button class="g-attach-remove" data-action="remove-attach" data-idx="${i}">${I('close', 13)}</button>
            </span>
          `).join('')}
        </div>
      ` : '';

      let sendBtnClass = 'g-send-btn';
      let sendBtnInner = W(22, 'currentColor');
      let sendTitle = 'Hold 2s for Live Voice (or click for Voice preview)';
      if (isLoading) {
        sendBtnClass += ' mode-stop';
        sendBtnInner = '<span style="width:12px;height:12px;border-radius:2.5px;background:currentColor;display:block"></span>';
        sendTitle = 'Stop generation';
      } else if (hasDraft) {
        sendBtnClass += ' mode-send';
        sendBtnInner = I('arrow_upward', 20);
        sendTitle = 'Send message';
      }

      return `
        <div class="g-composer-wrap">
          ${paletteHtml}
          ${popoverHtml}
          <div class="g-composer-card ${s.composerExpanded ? 'expanded' : ''}">
            ${attachRow}
            <div class="g-composer-input-wrap">
              <textarea
                class="g-composer-textarea"
                rows="1"
                data-composer-mode="${mode}"
                placeholder="${esc(placeholder)}"
              >${esc(value)}</textarea>
              <button class="g-composer-expand-btn" data-action="toggle-expand" title="${s.composerExpanded ? 'Collapse' : 'Expand'}">
                ${I(s.composerExpanded ? 'chevron_down' : 'ic_goar_maximize', 16)}
              </button>
            </div>
            <div class="g-composer-action-row">
              <div class="g-control-pill">
                <button class="g-control-well" data-action="toggle-pop" data-pop="attach" title="Add attachment">
                  ${I('ic_goar_plus', 17, 'var(--icon-chrome)')}
                </button>
                <button class="g-composer-agents-btn ${s.activeConvId && s.activeConvId.startsWith('bot_conv_') ? 'active' : ''}" data-action="composer-agents" title="Agents">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M8.5 13h.01M15.5 13h.01M9 16.5h6"/></svg>
                </button>
                <button class="g-model-pill-btn" data-action="toggle-pop" data-pop="model" title="Select model">
                  ${I(model.icon, 14, 'var(--icon-primary)')}
                  <span class="g-model-pill-label">${esc(model.label)}</span>
                  ${I('ic_goar_chevron_down', 11, 'var(--on-surface-variant)')}
                </button>
                <button class="g-control-well" data-action="toggle-pop" data-pop="context" title="Context window usage">
                  <svg width="19" height="19" viewBox="0 0 20 20" class="g-ctx-ring-svg">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="var(--outline)" stroke-width="2.3"/>
                    <circle cx="10" cy="10" r="8" fill="none" stroke="${ringColor}" stroke-width="2.3" stroke-linecap="round" stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${dashOffset.toFixed(2)}"/>
                  </svg>
                </button>
                <button class="g-control-well" data-action="toggle-pop" data-pop="settings" title="Model & tool settings">
                  ${I('ic_goar_kebab', 16, 'var(--icon-chrome)')}
                </button>
              </div>
              <div class="g-composer-right">
                <button class="g-enhance-btn ${hasDraft && !isLoading ? '' : 'hidden'}" data-action="enhance-prompt" data-mode="${mode}" title="Enhance prompt">
                  ${I('ic_goar_sparkle', 17, 'var(--primary)')}
                </button>
                <button class="${sendBtnClass}" data-action="primary-send" data-mode="${mode}" title="${sendTitle}">
                  ${sendBtnInner}
                  <svg class="g-hold-ring" viewBox="0 0 46 46">
                    <circle class="g-hold-arc" cx="23" cy="23" r="20.5" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-dasharray="128.8" stroke-dashoffset="128.8"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    _renderSlashPalette(trimmed) {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (trimmed.startsWith('/skill ')) {
        const q = trimmed.slice(7).toLowerCase();
        const matches = D.SKILLS.filter(sk => sk.file.toLowerCase().includes(q) || sk.desc.toLowerCase().includes(q));
        return `
          <div class="g-popover">
            <div class="g-pop-head"><span>Installed Skills (${matches.length})</span><span>SKILL.md</span></div>
            ${matches.map(sk => `
              <button class="g-pop-item" data-action="pick-slash" data-insert="/skill ${sk.file} ">
                <span class="g-matte-badge-32" style="background:color-mix(in srgb, var(--m-cmp-model) 16%, transparent)">
                  ${I('ic_goar_sparkle', 16, 'var(--m-cmp-model)')}
                </span>
                <div style="min-width:0;flex:1">
                  <div style="font-family:var(--font-mono);font-size:12.5px;font-weight:600">${esc(sk.file)}</div>
                  <div class="g-pop-sub">${esc(sk.desc)}</div>
                </div>
              </button>
            `).join('')}
          </div>
        `;
      }
      if (trimmed.startsWith('/mode')) {
        const modes = [
          { id: 'ask', label: 'Ask First', desc: 'Inspect & propose before running mutating tools', col: isLight ? '#D9820B' : '#FFB74D' },
          { id: 'smart', label: 'Smart Approve', desc: 'Auto-run safe reads; confirm risky actions', col: isLight ? '#1971C2' : '#4DABF7' },
          { id: 'auto', label: 'Auto-Approve', desc: 'Full autonomous agent execution end-to-end', col: isLight ? '#2B8A3E' : '#51CF66' }
        ];
        return `
          <div class="g-popover">
            <div class="g-pop-head"><span>Vibe Autonomy Mode</span><span>Active: ${this.state.vibeMode.toUpperCase()}</span></div>
            ${modes.map(m => `
              <button class="g-pop-item ${this.state.vibeMode === m.id ? 'selected' : ''}" data-action="set-vibe-mode" data-vibe="${m.id}">
                <span class="g-matte-badge-32" style="background:${m.col}26">${I('tune', 16, m.col)}</span>
                <div style="flex:1">
                  <div>${m.label}</div>
                  <div class="g-pop-sub">${m.desc}</div>
                </div>
                ${this.state.vibeMode === m.id ? I('check', 16, 'var(--primary)') : ''}
              </button>
            `).join('')}
          </div>
        `;
      }

      const q = trimmed.toLowerCase();
      const cmds = D.SLASH_COMMANDS.filter(c => c.command.includes(q) || c.desc.toLowerCase().includes(q));
      if (!cmds.length) return '';
      return `
        <div class="g-popover">
          <div class="g-pop-head"><span>Vibe Slash Commands</span><span>Mode: ${this.state.vibeMode.toUpperCase()}</span></div>
          ${cmds.map(c => {
            const col = isLight ? c.light : c.dark;
            return `
              <button class="g-pop-item" data-action="pick-slash" data-insert="${esc(c.template)}" data-instant="${c.instant ? '1' : '0'}">
                <span class="g-matte-badge-32" style="background:${col}24">${I(c.icon, 16, col)}</span>
                <div style="min-width:0;flex:1">
                  <div><strong style="font-family:var(--font-mono);font-size:13px">${esc(c.command)}</strong> <span style="font-size:11.5px;color:var(--on-surface-variant)">${esc(c.args)}</span></div>
                  <div class="g-pop-sub">${esc(c.desc)}</div>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    _renderMentionPalette(query) {
      const q = query.toLowerCase();
      const bots = D.BOTS.filter(b => b.handle.includes(q) || b.name.toLowerCase().includes(q));
      if (!bots.length) return '';
      return `
        <div class="g-popover">
          <div class="g-pop-head"><span>Consult Autonomous Agents (@mention)</span><span>SOUL.md</span></div>
          ${bots.map(b => `
            <button class="g-pop-item" data-action="pick-mention" data-handle="@${b.handle}">
              <span class="g-matte-badge-32" style="background:${hexToRgba(b.colorVar, 0.16)}">${I(b.icon, 16, `var(${b.colorVar})`)}</span>
              <div style="flex:1">
                <div><strong>${esc(b.name)}</strong> <span style="font-family:var(--font-mono);font-size:11.5px;color:var(--on-surface-variant)">@${b.handle}</span></div>
                <div class="g-pop-sub">${esc(b.title)}</div>
              </div>
            </button>
          `).join('')}
        </div>
      `;
    }

    _renderComposerPopover() {
      const pop = this.state.popover;
      if (pop === 'attach') {
        const items = [
          { label: 'Camera', icon: 'ic_goar_camera', file: 'camera_capture_01.jpg' },
          { label: 'Photos', icon: 'ic_goar_image', file: 'architecture_diagram.png' },
          { label: 'Videos', icon: 'ic_videocam', file: 'screen_recording.mp4' },
          { label: 'Files', icon: 'ic_goar_add_file', file: 'edge-proxy.ts' }
        ];
        return `
          <div class="g-popover g-popover-narrow">
            ${items.map(it => `
              <button class="g-pop-item" data-action="add-attach" data-name="${it.file}" data-icon="${it.icon}">
                ${I(it.icon, 20, 'var(--on-surface-variant)')}
                <span>${it.label}</span>
              </button>
            `).join('')}
          </div>
        `;
      }
      if (pop === 'model') {
        const grouped = {};
        D.MODELS.forEach(m => { (grouped[m.provider] = grouped[m.provider] || []).push(m); });
        return `
          <div class="g-popover">
            ${Object.keys(grouped).map(prov => {
              const list = grouped[prov];
              return `
                <div class="g-pop-provider-hdr">${I(list[0].icon, 16, 'var(--primary)')} ${esc(prov)}</div>
                ${list.map(m => `
                  <button class="g-pop-item ${this.state.selectedModel === m.id ? 'selected' : ''}" data-action="select-model" data-model="${esc(m.id)}">
                    <span style="flex:1">${esc(m.label)}</span>
                    ${this.state.selectedModel === m.id ? I('check', 16, 'var(--primary)') : ''}
                  </button>
                `).join('')}
              `;
            }).join('')}
          </div>
        `;
      }
      if (pop === 'context') {
        const ctx = this.getContextStats();
        const circ = 2 * Math.PI * 16;
        return `
          <div class="g-popover g-popover-narrow" style="padding:14px 16px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center">
            <div style="font-size:13.5px;font-weight:600">Context &amp; Compaction</div>
            <svg width="44" height="44" viewBox="0 0 40 40" class="g-ctx-ring-svg">
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--outline)" stroke-width="3.8"/>
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--primary)" stroke-width="3.8" stroke-linecap="round" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${(circ * (1 - ctx.pct)).toFixed(1)}"/>
            </svg>
            <div style="font-size:13px;color:var(--on-surface-variant)">${formatTokens(ctx.used)} / ${formatTokens(ctx.budget)} tokens</div>
            <button class="g-hero-mini-btn" data-action="compact-now">${I('compress', 13)} Compact now</button>
          </div>
        `;
      }
      if (pop === 'settings') {
        const t = this.state.tools;
        const rows = [
          { key: 'thinking', label: 'Thinking', sub: t.thinking ? `Enabled · ${t.thinkingLevel}` : 'Off', icon: 'ic_goar_brain', val: t.thinking },
          { key: 'codeExec', label: 'Code execution', icon: 'ic_goar_shell', val: t.codeExec },
          { key: 'googleSearch', label: 'Google Search', icon: 'ic_nav_browser', val: t.googleSearch },
          { key: 'webSearch', label: 'Web Search', icon: 'ic_goar_search', val: t.webSearch },
          { key: 'shell', label: 'Shell & SSH', icon: 'ic_nav_terminal', val: t.shell }
        ];
        return `
          <div class="g-popover g-popover-right">
            ${rows.map(r => `
              <button class="g-pop-item" data-action="toggle-tool" data-tool="${r.key}">
                ${I(r.icon, 19, 'var(--on-surface-variant)')}
                <div style="flex:1">
                  <div>${r.label}</div>
                  ${r.sub ? `<div class="g-pop-sub">${r.sub}</div>` : ''}
                </div>
                <span class="g-switch ${r.val ? 'on' : ''}"></span>
              </button>
            `).join('')}
          </div>
        `;
      }
      return '';
    }

    /* ── Navigation Drawer (ChatDrawerContent.kt + GoarBotsDrawerSection.kt) ── */
    _renderDrawer() {
      const s = this.state;
      const q = s.drawerSearch.trim().toLowerCase();

      let contentHtml = '';
      if (s.drawerTab === 'bots') {
        const groups = {};
        D.BOTS.filter(b => !q || b.name.toLowerCase().includes(q) || b.title.toLowerCase().includes(q) || b.handle.includes(q))
          .forEach(b => { (groups[b.group] = groups[b.group] || []).push(b); });
        contentHtml = `
          <div class="g-bot-toolbar">
            <button class="g-bot-action-btn primary" data-action="bot-toast" data-msg="SOUL.md Agent Creator opened (Mocked)">${I('add', 15)} New Agent</button>
            <button class="g-bot-action-btn" data-action="open-conv" data-id="conv_council">${I('group', 15)} Multi-Agent</button>
          </div>
          ${Object.keys(groups).map(gName => `
            <div class="g-drawer-section-lbl">${esc(gName)}</div>
            ${groups[gName].map(b => `
              <button class="g-bot-card" data-action="open-bot" data-bot="${b.id}">
                <span class="g-matte-badge-32" style="background:${hexToRgba(b.colorVar, 0.16)}">${I(b.icon, 18, `var(${b.colorVar})`)}</span>
                <div style="min-width:0;flex:1">
                  <div><span class="g-bot-name">${esc(b.name)}</span><span class="g-bot-handle">@${b.handle}</span></div>
                  <div class="g-bot-role">${esc(b.title)}</div>
                </div>
              </button>
            `).join('')}
          `).join('')}
        `;
      } else {
        const filteredConvs = s.conversations.filter(c => !q || c.title.toLowerCase().includes(q));
        const isTinted = s.paletteStyle === 'TINTED';
        const dIcon = (ic, varName) => isTinted
          ? `<span class="g-matte-badge-32" style="background:${hexToRgba(varName, 0.16)}">${I(ic, 17, `var(${varName})`)}</span>`
          : `<span class="g-matte-badge-32" style="background:color-mix(in srgb, var(--on-surface) 7%, transparent)">${I(ic, 17, 'var(--icon-chrome)')}</span>`;
        contentHtml = `
          ${!q ? `
            <div class="g-drawer-section-lbl">Workspace</div>
            <button class="g-drawer-row" data-action="drawer-nav" data-dest="files">
              ${dIcon('ic_nav_files', '--m-drw-files')}
              <div><div>Files</div><div style="font-size:11px;color:var(--on-surface-variant)">Files, notes, terminal &amp; PDFs</div></div>
            </button>
            <button class="g-drawer-row" data-action="drawer-nav" data-dest="browser">
              ${dIcon('ic_nav_browser', '--m-drw-browser')}
              <div><div>Browser</div><div style="font-size:11px;color:var(--on-surface-variant)">Web browsing &amp; live research</div></div>
            </button>
            <button class="g-drawer-row" data-action="drawer-nav" data-dest="tasks">
              ${dIcon('ic_nav_tasks', '--m-drw-tasks')}
              <div><div>Tasks &amp; Calendar</div><div style="font-size:11px;color:var(--on-surface-variant)">Automations &amp; routines</div></div>
            </button>
            <button class="g-drawer-row" data-action="drawer-nav" data-dest="audit">
              ${dIcon('gsgs_actions_shield_check', '--m-drw-network')}
              <div><div>Network Tools</div><div style="font-size:11px;color:var(--on-surface-variant)">Unified target recon, LAN &amp; defense</div></div>
            </button>
            <button class="g-drawer-row" data-action="drawer-nav" data-dest="terminal">
              ${dIcon('ic_nav_terminal', '--m-drw-terminal')}
              <div><div>Linux Terminal</div><div style="font-size:11px;color:var(--on-surface-variant)">PRoot Ubuntu &amp; SSH shell</div></div>
            </button>
            <button class="g-drawer-row" data-action="drawer-nav" data-dest="docs">
              ${dIcon('article', '--m-drw-docs')}
              <div><div>Revise Docs</div><div style="font-size:11px;color:var(--on-surface-variant)">Word .docx redline editor</div></div>
            </button>
            <div class="g-drawer-section-lbl">History</div>
          ` : ''}
          ${filteredConvs.length ? filteredConvs.map(c => `
            <button class="g-conv-item ${s.activeConvId === c.id && s.screen === 'ask' ? 'selected' : ''}" data-action="open-conv" data-id="${c.id}">
              <span class="g-conv-title">${esc(c.title)}</span>
            </button>
          `).join('') : `<div style="padding:18px 10px;font-size:13px;color:var(--on-surface-variant)">No results found</div>`}
        `;
      }

      return `
        <div class="g-drawer-overlay">
          <div class="g-drawer-sheet">
            <div class="g-drawer-header">
              <img src="assets/ic_goar_mark.png" alt="" width="22" height="22" class="goar-mark-img goar-mark-dark-only"/>
              <img src="assets/ic_goar_mark_black.png" alt="" width="22" height="22" class="goar-mark-img goar-mark-light-only"/>
              <span class="g-drawer-header-title">Goar Studio</span>
              <button class="g-drawer-close-btn" data-action="close-drawer" aria-label="Collapse menu">
                ${I('chevron_left', 21)}
              </button>
            </div>
            <div class="g-drawer-search">
              ${I('search', 16)}
              <input type="text" data-el="g-drawer-search-input" placeholder="Search messages…" value="${esc(s.drawerSearch)}"/>
            </div>
            <div class="g-drawer-seg">
              <button class="g-drawer-seg-btn ${s.drawerTab === 'chats' ? 'active' : ''}" data-action="drawer-tab" data-dtab="chats">Chats</button>
              <button class="g-drawer-seg-btn ${s.drawerTab === 'bots' ? 'active' : ''}" data-action="drawer-tab" data-dtab="bots">Agents (${D.BOTS.length})</button>
            </div>
            <div class="g-drawer-scroll">${contentHtml}</div>
            <div class="g-drawer-footer">
              <button class="g-drawer-row" data-action="drawer-nav" data-dest="settings">
                <span class="g-matte-badge-32" style="background:${hexToRgba('--m-drw-settings', 0.16)}">${I('ic_set_gear', 18, 'var(--m-drw-settings)')}</span>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    /* ── Screen 2: Imagine (AiPlaygroundScreen.kt) ── */
    _renderImagineScreen() {
      const s = this.state;
      const mode = s.imagineMode;
      const models = D.PLAYGROUND_MODELS[mode];
      const curModel = models.find(m => m.id === s.imagineModels[mode]) || models[0];
      const activeAsset = s.imagineAssets.find(a => a.id === s.imagineActiveAssetId) || null;

      let badgeHtml = '';
      if (mode === 'video') {
        badgeHtml = `<span style="display:inline-flex;align-items:flex-end;gap:2px;height:14px"><span style="width:3px;height:8px;border-radius:1px;background:#38BDF8"></span><span style="width:3px;height:14px;border-radius:1px;background:#2DD4BF"></span><span style="width:3px;height:10px;border-radius:1px;background:#38BDF8"></span></span>`;
      } else if (mode === 'image') {
        badgeHtml = `<span style="width:18px;height:18px;border-radius:50%;background:#8B5CF6;color:#fff;font-size:10px;font-weight:700;display:inline-flex;align-items:center;justify-content:center">${curModel.name[0]}</span>`;
      } else {
        badgeHtml = `<span style="display:inline-flex;gap:3px"><span style="width:3px;height:12px;border-radius:1px;background:#EC4899"></span><span style="width:3px;height:12px;border-radius:1px;background:#EC4899"></span></span>`;
      }

      const modelMenuHtml = s.imagineModelOpen ? `
        <div class="g-popover" style="top:54px;bottom:auto;left:0;right:0">
          ${models.map(m => `
            <button class="g-pop-item ${m.id === curModel.id ? 'selected' : ''}" data-action="imagine-pick-model" data-mid="${esc(m.id)}">
              <div style="flex:1">
                <div>${esc(m.name)}</div>
                <div class="g-pop-sub">${esc(m.provider)} · ${esc(m.badge)}</div>
              </div>
              ${m.id === curModel.id ? I('check', 15, 'var(--primary)') : ''}
            </button>
          `).join('')}
        </div>
      ` : '';

      let paramsHtml = '';
      if (mode === 'video') {
        paramsHtml = `
          <div class="g-param-pill">
            <button class="g-param-seg" data-action="imagine-cycle-res">${s.imagineRes}</button>
            <span class="g-param-div"></span>
            <button class="g-param-seg" data-action="imagine-cycle-aspect">${I('crop', 13, 'var(--on-surface-variant)')} ${s.imagineAspect}</button>
            <span class="g-param-div"></span>
            <button class="g-param-seg" data-action="imagine-cycle-dur">${s.imagineDuration}s ${I('chevron_down', 13)}</button>
          </div>
          <button class="g-param-pill" style="width:38px;justify-content:center;cursor:pointer" data-action="imagine-toggle-sound" title="Toggle audio">
            ${I(s.imagineSound ? 'volume_up' : 'volume_off', 16)}
          </button>
          <button class="g-param-pill" style="padding:0 9px;gap:6px;cursor:pointer" data-action="imagine-toggle-draft">
            ${I('description', 14, 'var(--on-surface-variant)')}
            <span>Draft</span>
            <span class="g-switch ${s.imagineDraft ? 'on' : ''}" style="transform:scale(0.76)"></span>
          </button>
        `;
      } else if (mode === 'image') {
        paramsHtml = `
          <button class="g-param-pill" style="padding:0 12px;gap:6px;cursor:pointer" data-action="imagine-cycle-aspect">
            ${I('crop', 14, 'var(--on-surface-variant)')} <span>${s.imagineAspect}</span> ${I('chevron_down', 14)}
          </button>
        `;
      } else {
        paramsHtml = `
          <button class="g-param-pill" style="padding:0 12px;gap:6px;cursor:pointer" data-action="imagine-cycle-voice">
            ${I('record_voice', 14, 'var(--on-surface-variant)')} <span>Voice: ${s.imagineVoice[0].toUpperCase() + s.imagineVoice.slice(1)}</span> ${I('chevron_down', 14)}
          </button>
        `;
      }

      const modeDesc = mode === 'video'
        ? 'Generate video with your selected AI video model provider'
        : mode === 'image'
          ? 'Generate or attach a photo to edit with your selected AI image model'
          : 'Generate speech or sound effects with your selected AI audio model';

      const heroHtml = activeAsset ? `
        <div class="g-hero-canvas">
          <div class="g-hero-stage">
            <canvas data-el="g-imagine-canvas" data-seed="${activeAsset.seed}" data-kind="${activeAsset.mode}"></canvas>
            <button class="g-topbar-circle-btn" data-action="imagine-clear-asset" style="position:absolute;top:8px;right:8px;width:28px;height:28px;background:rgba(0,0,0,0.65);border-color:rgba(255,255,255,0.18)">
              ${I('close', 14, '#fff')}
            </button>
          </div>
          <div class="g-hero-footer">
            <span style="font-size:12.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${esc(activeAsset.title)}</span>
            <button class="g-hero-mini-btn" data-action="imagine-animate">${I('play', 12)} Animate</button>
            <button class="g-hero-mini-btn" data-action="imagine-ref">${I('auto_fix', 12)} Edit</button>
          </div>
        </div>
      ` : `
        <div class="g-hero-canvas">
          <div class="g-hero-empty">
            ${I(mode === 'video' ? 'movie' : mode === 'image' ? 'image' : 'graphic_eq', 42, 'var(--primary)')}
            <div>${modeDesc}</div>
            <button class="g-hero-mini-btn" data-action="imagine-demo-gen">Try Mock Render</button>
          </div>
        </div>
      `;

      const reelHtml = s.imagineAssets.length ? `
        <div class="g-media-reel">
          ${s.imagineAssets.map(a => `
            <button class="g-reel-thumb ${a.id === s.imagineActiveAssetId ? 'active' : ''}" data-action="imagine-select-asset" data-aid="${a.id}" style="background:${a.gradient}">
              <span>${a.mode.toUpperCase()}</span>
            </button>
          `).join('')}
        </div>
      ` : '';

      const ph = mode === 'video' ? 'Describe the video scene for the model…'
        : mode === 'image' ? (s.imagineRefAttached ? 'Describe how the AI model should edit this image…' : 'Describe an image to generate…')
        : 'Enter speech or audio prompt for the model…';

      return `
        ${this._renderMainTopHeaderBar('imagine')}
        <div class="g-scroll-body">
          <div class="g-imagine-seg">
            <button class="g-imagine-seg-btn ${mode === 'video' ? 'active' : ''}" data-action="imagine-mode" data-imode="video">${I('movie', 16)} Video</button>
            <button class="g-imagine-seg-btn ${mode === 'image' ? 'active' : ''}" data-action="imagine-mode" data-imode="image">${I('image', 16)} Image</button>
            <button class="g-imagine-seg-btn ${mode === 'audio' ? 'active' : ''}" data-action="imagine-mode" data-imode="audio">${I('graphic_eq', 16)} Audio</button>
          </div>

          <div style="position:relative">
            <div class="g-card-field" data-action="imagine-toggle-model">
              <div style="display:flex;align-items:center;gap:10px;min-width:0">
                ${badgeHtml}
                <span style="font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(curModel.name)}</span>
                <span style="font-size:11px;padding:2px 7px;border-radius:999px;background:var(--pill-sub-bg);color:var(--on-surface-variant)">${esc(curModel.badge)}</span>
              </div>
              ${I('chevron_down', 17, 'var(--on-surface-variant)')}
            </div>
            ${modelMenuHtml}
          </div>

          ${mode !== 'audio' ? `
            <div class="g-card-ref" data-action="imagine-ref">
              ${s.imagineRefAttached ? `
                <div style="width:100%;display:flex;align-items:center;justify-content:space-between">
                  <div style="display:flex;align-items:center;gap:10px">
                    <span style="width:32px;height:32px;border-radius:7px;background:linear-gradient(135deg,#38D0E8,#FF5E9C);display:block"></span>
                    <div style="text-align:left">
                      <div style="font-size:13px;font-weight:600">Reference attached</div>
                      <div style="font-size:11px;color:var(--on-surface-variant)">Tap to remove</div>
                    </div>
                  </div>
                  ${I('close', 16, 'var(--on-surface-variant)')}
                </div>
              ` : `
                <div style="display:flex;align-items:center;gap:7px;color:var(--on-surface-variant);font-size:11px;font-weight:700">
                  <span>|-&gt;</span><span>-&gt;|</span>${I('image', 13)}${I('movie', 13)}${I('music_note', 13)}${I('add', 13, 'var(--primary)')}
                </div>
                <div style="font-size:12px;font-weight:500">Add references</div>
              `}
            </div>
          ` : ''}

          <div class="g-param-row">${paramsHtml}</div>
          ${heroHtml}
          ${reelHtml}
        </div>
        ${this._renderComposer({
          placeholder: ph,
          value: s.imaginePrompt,
          mode: 'imagine',
          isLoading: s.imagineGenerating
        })}
      `;
    }

    /* ── Screen 3: Build (WebAppBuilderScreen.kt) ── */
    _renderBuildScreen() {
      const s = this.state;
      const proj = s.builderProjects.find(p => p.slug === s.builderActiveSlug) || s.builderProjects[0];

      return `
        ${this._renderMainTopHeaderBar('build')}
        <div class="g-scroll-body">
          <div>
            <div class="g-section-row">
              <h2 class="g-section-h2">Your apps</h2>
              <span style="font-size:12.5px;color:var(--on-surface-variant)">${s.builderProjects.length} ${s.builderProjects.length === 1 ? 'app' : 'apps'}</span>
            </div>

            <div class="g-builder-card">
              <div class="g-builder-head">
                <div class="g-preview-switch">
                  <button class="${s.builderPane === 'preview' ? 'active' : ''}" data-action="builder-pane" data-pane="preview">${I('visibility', 13)} Preview</button>
                  <button class="${s.builderPane === 'code' ? 'active' : ''}" data-action="builder-pane" data-pane="code">${I('code', 13)} Code</button>
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-size:11.5px;font-weight:600;color:var(--on-surface-variant)">${esc(proj.title)}</span>
                  ${s.builderPane === 'code' ? `<button class="g-hero-mini-btn" data-action="builder-apply-code">${I('play', 11)} Run</button>` : ''}
                </div>
              </div>
              ${s.builderPane === 'preview' ? `
                <div class="g-builder-viewport">
                  <iframe class="g-builder-iframe" sandbox="allow-scripts allow-same-origin" srcdoc="${esc(proj.html)}"></iframe>
                </div>
              ` : `
                <textarea class="g-builder-code" data-el="g-builder-code-editor" spellcheck="false">${esc(proj.html)}</textarea>
              `}
            </div>

            ${s.builderProjects.length > 1 ? `
              <div class="g-chip-scroll" style="margin-top:9px">
                ${s.builderProjects.map(p => `
                  <button class="g-engine-chip ${p.slug === proj.slug ? 'active' : ''}" data-action="builder-select-proj" data-slug="${esc(p.slug)}">${esc(p.title)}</button>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <div>
            <div style="font-size:15px;font-weight:600;margin-bottom:8px">Create from Template</div>
            <div class="g-template-chips">
              <button class="g-template-refresh" data-action="builder-shuffle" style="background:${hexToRgba('--m-cmp-expand', 0.14)};border:1px solid ${hexToRgba('--m-cmp-expand', 0.42)};${s.builderSpinning ? 'transform:rotate(360deg)' : ''}" title="Shuffle templates">
                ${I('refresh', 17, 'var(--m-cmp-expand)')}
              </button>
              ${s.builderTemplates.map(t => `
                <button class="g-template-chip" data-action="builder-template" data-slug="${esc(t.slug)}" style="border:1px solid ${hexToRgba(t.chipVar, 0.42)};color:var(${t.chipVar})">
                  ${I(t.icon, 15, `var(${t.chipVar})`)}
                  <span>${esc(t.title)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
        ${this._renderComposer({
          placeholder: 'Describe a web app to build… (e.g. Pomodoro timer)',
          value: s.builderPrompt,
          mode: 'build',
          isLoading: false
        })}
      `;
    }

    /* ── Workspace: Browser (BrowserScreen.kt + BrowserHomeScreen.kt) ── */
    _renderBrowserScreen() {
      const s = this.state;
      const engines = [
        ['Google', 'google'], ['DuckDuckGo', 'duckduckgo'], ['Bing', 'bing'],
        ['SearXNG', 'searxng'], ['Wikipedia', 'wikipedia'], ['GitHub', 'github'], ['ArXiv', 'arxiv']
      ];

      let devBody = '';
      if (s.browserDevTab === 'network') {
        devBody = D.BROWSER_NETWORK.map(r => `
          <div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid var(--outline-variant)">
            <span style="color:var(--m-top-build);font-weight:700">${r.status}</span>
            <span style="color:var(--m-top-ask)">${r.method}</span>
            <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.url)}</span>
            <span style="color:var(--on-surface-variant)">${r.ms}ms</span>
          </div>
        `).join('');
      } else if (s.browserDevTab === 'spoof') {
        devBody = `
          <div style="display:flex;flex-direction:column;gap:8px;font-family:var(--font-sans);font-size:12.5px">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span>Cloak Stealth Profile (Desktop UA)</span>
              <button class="g-switch ${s.browserSpoofDesktop ? 'on' : ''}" data-action="browser-toggle-spoof" style="border:none;cursor:pointer"></button>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span>Allow AI Agent DOM Control</span>
              <button class="g-switch ${s.browserAiControl ? 'on' : ''}" data-action="browser-toggle-ai" style="border:none;cursor:pointer"></button>
            </div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--on-surface-variant);padding:8px;background:var(--surface-container);border-radius:10px">
              navigator.platform: ${s.browserSpoofDesktop ? 'Linux x86_64' : 'Linux armv8l'}<br>
              WebRTC Leak Guard: Active · Timezone: UTC+10:30
            </div>
          </div>
        `;
      } else if (s.browserDevTab === 'console') {
        devBody = `
          <div style="color:var(--m-drw-browser)">[GoarSDK] Bridge attached (CORS-free OkHttp relay)</div>
          <div style="color:var(--m-top-build)">[Cloak] Fingerprint spoofing active · 0 trackers loaded</div>
          <div style="color:var(--on-surface-variant)">&gt; document.title =&gt; "Goar Studio — Local-First AI"</div>
        `;
      } else {
        devBody = `
          <div style="font-family:var(--font-sans);font-size:12.5px;color:var(--on-surface-variant)">
            Browser Agent shares this exact WebView session with full DOM read/click/fill parity.
          </div>
          <div style="margin-top:8px;display:flex;gap:6px">
            <button class="g-hero-mini-btn" data-action="browser-agent-run">Extract Page Links</button>
            <button class="g-hero-mini-btn" data-action="browser-agent-run">Audit TLS &amp; Headers</button>
          </div>
        `;
      }

      return `
        <div class="g-ws-header">
          <button class="g-topbar-circle-btn" data-action="open-drawer">${I('chevron_right', 22, 'var(--m-top-drawer)')}</button>
          <div class="g-omnibox" style="height:40px;flex:1;border-radius:999px">
            ${I('lock', 14, 'var(--m-top-build)')}
            <input data-el="g-browser-url" value="${esc(s.browserLoadedUrl || s.browserUrl)}" placeholder="Search or enter URL"/>
          </div>
          <button class="g-topbar-circle-btn" data-action="browser-toggle-dev" title="Toggle DevTools">
            ${I('code', 17, s.browserDevToolsOpen ? 'var(--m-drw-browser)' : 'var(--on-surface-variant)')}
          </button>
        </div>
        ${s.browserLoadedUrl ? `
          <div class="g-scroll-body" style="gap:10px">
            <div style="border-radius:16px;background:var(--surface-container);border:1px solid var(--outline-variant);padding:16px">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <img src="assets/ic_goar_mark.png" width="22" height="22" class="goar-mark-img goar-mark-dark-only"/>
                <img src="assets/ic_goar_mark_black.png" width="22" height="22" class="goar-mark-img goar-mark-light-only"/>
                <strong style="font-size:14px">${esc(s.browserLoadedUrl)}</strong>
              </div>
              <div style="font-size:13px;color:var(--on-surface-variant);line-height:1.5">
                Simulated shared WebView viewport. Trackers blocked via bundled <code>hosts.txt</code> &amp; <code>malware.txt</code>. Inspect live requests or spoof headers in the DevTools panel below.
              </div>
            </div>
          </div>
        ` : `
          <div class="g-browser-home">
            <img src="assets/ic_goar_mark.png" width="52" height="52" class="goar-mark-img goar-mark-dark-only"/>
            <img src="assets/ic_goar_mark_black.png" width="52" height="52" class="goar-mark-img goar-mark-light-only"/>
            <div style="font-size:21px;font-weight:600;margin-top:12px">Browser</div>
            <div style="font-size:13px;color:var(--on-surface-variant);margin:4px 0 16px">Enter a URL or search query to start browsing</div>
            <div class="g-chip-scroll" style="margin-bottom:14px">
              ${engines.map(([lbl, k]) => `<button class="g-engine-chip ${s.browserEngine === k ? 'active' : ''}" data-action="browser-engine" data-eng="${k}">${lbl}</button>`).join('')}
            </div>
            <button class="g-hero-mini-btn" data-action="browser-go" data-url="https://goarxyz.com">Open goarxyz.com</button>
          </div>
        `}
        ${s.browserDevToolsOpen ? `
          <div class="g-devtools-panel">
            <div class="g-devtools-tabs">
              ${[['agent','Agent'], ['console','Console'], ['network','Network'], ['spoof','Spoof']].map(([k, l]) => `
                <button class="g-devtools-tab ${s.browserDevTab === k ? 'active' : ''}" data-action="browser-devtab" data-dtab="${k}">${l}</button>
              `).join('')}
            </div>
            <div class="g-devtools-body">${devBody}</div>
          </div>
        ` : ''}
      `;
    }

    /* ── Workspace: File Browser (WorkspaceScreen.kt + WorkspaceChrome.kt) ── */
    _renderFilesScreen() {
      const s = this.state;
      const activeFile = s.filesList.find(f => f.name === s.filesActiveName);
      const sources = [
        { id: 'local', label: 'Local Workspace', icon: 'ic_nav_files' },
        { id: 'ubuntu', label: 'Ubuntu 24.04', icon: 'ic_distro_ubuntu' },
        { id: 'ssh', label: 'Prod VPS (SSH)', icon: 'ic_nav_ssh' }
      ];

      return `
        <div class="g-ws-header">
          <button class="g-topbar-circle-btn" data-action="open-drawer">${I('chevron_right', 22, 'var(--m-top-drawer)')}</button>
          <span class="g-ws-title">${activeFile ? esc(activeFile.name) : 'File Browser'}</span>
          ${activeFile ? `<button class="g-hero-mini-btn" data-action="files-close">All Files</button>` : ''}
        </div>
        <div class="g-chip-scroll" style="padding:0 12px 8px">
          ${sources.map(src => `
            <button class="g-engine-chip ${s.filesSource === src.id ? 'active' : ''}" data-action="files-source" data-src="${src.id}" style="display:inline-flex;align-items:center;gap:6px">
              ${I(src.icon, 14)} ${src.label}
            </button>
          `).join('')}
        </div>
        ${activeFile ? `
          <div style="flex:1;display:flex;flex-direction:column;min-height:0;padding:0 12px 12px">
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--on-surface-variant);margin-bottom:6px">${esc(activeFile.folder + activeFile.name)} · ${activeFile.size}</div>
            <textarea class="g-builder-code" style="flex:1;height:auto;border-radius:16px;border:1px solid var(--outline-variant)" spellcheck="false">${esc(activeFile.content)}</textarea>
          </div>
        ` : `
          <div class="g-scroll-body" style="gap:2px">
            <div class="goar-split-stack">
              ${s.filesList.map(f => `
                <button class="goar-split-card g-settings-row" data-action="files-open" data-fname="${esc(f.name)}">
                  <span class="g-matte-badge-38" style="background:${hexToRgba('--m-drw-files', 0.16)}">${I(f.icon, 20, 'var(--m-drw-files)')}</span>
                  <div style="flex:1;min-width:0">
                    <div class="g-settings-row-title">${esc(f.name)}</div>
                    <div class="g-settings-row-desc">${esc(f.folder)} · ${f.size}</div>
                  </div>
                  ${I('chevron_right', 18, 'var(--on-surface-variant)')}
                </button>
              `).join('')}
            </div>
          </div>
        `}
      `;
    }

    /* ── Workspace: Pure Black VT100 Terminal (WorkspaceTerminal.kt) ── */
    _renderTerminalScreen() {
      const s = this.state;
      const extraKeys = ['ESC', 'TAB', 'CTRL', 'ALT', '↑', '↓', '|', '~'];
      return `
        <div class="g-term-wrap">
          <div class="g-term-topbar">
            <button class="g-topbar-circle-btn" data-action="open-drawer" style="width:32px;height:32px;background:#161618;border-color:#26262a">${I('chevron_right', 19, 'var(--m-top-drawer)')}</button>
            <span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:12px;font-weight:600;flex:1">
              ${I('ic_distro_ubuntu', 15, '#FF7A45')} tty1 · Ubuntu 24.04 (PRoot)
            </span>
            <button class="g-extrakey" data-action="term-quick" data-cmd="neofetch">neofetch</button>
          </div>
          <div class="g-term-output" data-el="g-term-out">${esc(s.termLines.join('\n'))}</div>
          <form class="g-term-input-row" data-el="g-term-form">
            <span style="color:#4ADE80;font-weight:700">root@goar:~$</span>
            <input type="text" data-el="g-term-input" value="${esc(s.termInput)}" placeholder="Type command (ls, neofetch, help)..." autocomplete="off"/>
          </form>
          <div class="g-term-extrakeys">
            ${extraKeys.map(k => `<button class="g-extrakey" data-action="term-extrakey" data-key="${k}">${k}</button>`).join('')}
          </div>
        </div>
      `;
    }

    /* ── Workspace: Revise Document Editor (ReviseDocEditorScreen.kt) ── */
    _renderDocsScreen() {
      const s = this.state;
      const diff = s.docDiffs[0];
      return `
        <div class="g-doc-bar">
          <div style="display:flex;align-items:center;gap:10px">
            <button class="g-topbar-circle-btn" data-action="open-drawer" style="width:34px;height:34px">${I('chevron_right', 19, 'var(--m-top-drawer)')}</button>
            <button class="g-doc-fmt-btn" data-action="doc-export" data-fmt=".docx" style="color:var(--doc-muted)">File</button>
            <span style="font-weight:700;border-bottom:2px solid var(--doc-text);padding:2px 0">Edit</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button class="g-hero-mini-btn" data-action="doc-toggle-mode">${I('edit', 12, 'var(--m-drw-docs)')} ${s.docMode}</button>
            <button class="g-hero-mini-btn" data-action="doc-export" data-fmt=".docx">${I('history', 12, 'var(--m-top-imagine)')} .docx</button>
          </div>
        </div>
        <div class="g-doc-toolbar">
          <button class="g-doc-fmt-btn"><strong>B</strong></button>
          <button class="g-doc-fmt-btn"><em>I</em></button>
          <button class="g-doc-fmt-btn"><u>U</u></button>
          <button class="g-doc-fmt-btn">H1</button>
          <button class="g-doc-fmt-btn">H2</button>
          <button class="g-doc-fmt-btn">• List</button>
          <button class="g-doc-fmt-btn" data-action="doc-reset-diff" style="margin-left:auto;color:var(--m-drw-docs)">AI Redline</button>
        </div>
        <div class="g-doc-canvas">
          <h3 style="margin:0 0 10px;font-size:19px">${esc(s.docTitle)}</h3>
          <p style="font-size:14px;line-height:1.65;color:var(--on-surface)">
            Goar Studio executes AI reasoning, code builds, and autonomous browser sessions in a single local-first Android workspace.
          </p>
          <p style="font-size:14px;line-height:1.7;color:var(--on-surface)">
            ${diff.status === 'pending'
              ? `<span class="g-redline-del">${esc(diff.original)}</span> <span class="g-redline-ins">${esc(diff.revised)}</span>`
              : diff.status === 'accepted' ? esc(diff.revised) : esc(diff.original)}
          </p>
          ${diff.status === 'pending' ? `
            <div class="g-diff-card">
              <div style="font-size:12px;font-weight:700;margin-bottom:4px;color:var(--on-surface)">Tracked Revision · ${esc(diff.author)}</div>
              <div style="font-size:12px;color:var(--on-surface-variant);margin-bottom:10px">${esc(diff.reason)}</div>
              <div style="display:flex;gap:8px">
                <button class="g-hero-mini-btn" style="background:var(--primary);color:var(--on-primary);border-color:var(--primary)" data-action="doc-diff" data-res="accepted">${I('check', 12)} Accept</button>
                <button class="g-hero-mini-btn" data-action="doc-diff" data-res="rejected">${I('close', 12)} Reject</button>
              </div>
            </div>
          ` : `
            <div style="margin-top:10px;font-size:12px;color:var(--accent-emerald)">âœ“ Revision ${diff.status}. Ready for Word (.docx) export.</div>
          `}
        </div>
        ${this._renderComposer({
          placeholder: 'Ask AI to rewrite or propose Word redlines…',
          value: s.docPrompt,
          mode: 'docs',
          isLoading: false
        })}
      `;
    }

    /* ── Tasks & Automation Screen (TasksScreen.kt + AutomationCalendarCard.kt) ── */
    _renderTasksScreen() {
      const s = this.state;
      const base = new Date(2026, 10 + s.calMonthOffset, 1); // Nov 2026
      const monthName = base.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
      const startDow = (base.getDay() + 6) % 7;
      const taskDays = new Set(s.tasks.filter(t => t.enabled).map(t => t.day));

      let calCells = '';
      for (let i = 0; i < startDow; i++) calCells += '<span></span>';
      for (let d = 1; d <= daysInMonth; d++) {
        const isToday = s.calMonthOffset === 0 && d === 22;
        const hasTask = s.calMonthOffset === 0 && taskDays.has(d);
        calCells += `<button class="g-cal-day ${isToday ? 'today' : ''} ${hasTask ? 'has-task' : ''}">${d}</button>`;
      }

      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="go-home">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">Tasks</div>
        </div>
        <div class="g-scroll-body" style="padding-top:0">
          <div class="g-cal-card">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <strong style="font-size:15px">${monthName}</strong>
              <div style="display:flex;gap:4px">
                <button class="g-msg-action-btn" data-action="cal-shift" data-delta="-1">${I('chevron_left', 18)}</button>
                <button class="g-msg-action-btn" data-action="cal-shift" data-delta="1">${I('chevron_right', 18)}</button>
              </div>
            </div>
            <div class="g-cal-grid">
              ${['M','T','W','T','F','S','S'].map(h => `<span class="g-cal-dow">${h}</span>`).join('')}
              ${calCells}
            </div>
          </div>

          <div class="g-drawer-seg" style="margin-top:0">
            <button class="g-drawer-seg-btn ${s.tasksHub === 'scheduled' ? 'active' : ''}" data-action="tasks-hub" data-hub="scheduled">Scheduled</button>
            <button class="g-drawer-seg-btn ${s.tasksHub === 'watchtower' ? 'active' : ''}" data-action="tasks-hub" data-hub="watchtower">Watchtower</button>
            <button class="g-drawer-seg-btn ${s.tasksHub === 'digest' ? 'active' : ''}" data-action="tasks-hub" data-hub="digest">Digest</button>
          </div>

          ${s.tasksHub === 'digest' ? `
            <div class="goar-split-stack">
              <div class="goar-split-card" style="padding:16px">
                <div style="font-size:12px;font-family:var(--font-mono);color:var(--m-drw-tasks);margin-bottom:4px">MORNING DIGEST · 07:00</div>
                <div style="font-size:15px;font-weight:600;margin-bottom:6px">Daily Executive Summary</div>
                <div style="font-size:13px;color:var(--on-surface-variant);line-height:1.55">
                  • 4 VPS nodes healthy (p99 edge latency down to 39ms)<br>
                  • Zero unauthorized TLS or DNS changes detected<br>
                  • Next encrypted local backup scheduled Sunday 02:00
                </div>
              </div>
            </div>
          ` : `
            <div class="goar-split-stack">
              ${s.tasks.map(t => `
                <div class="goar-split-card g-settings-row" style="cursor:default">
                  <div style="flex:1;min-width:0">
                    <div class="g-settings-row-title">${esc(t.name)}</div>
                    <div class="g-settings-row-desc">${esc(t.nextRun)} · <code>${esc(t.cron)}</code> · ${esc(t.lastStatus)}</div>
                  </div>
                  <button class="g-msg-action-btn" data-action="task-run" data-tid="${t.id}" title="Run now">${I('play', 16, 'var(--primary)')}</button>
                  <button class="g-switch ${t.enabled ? 'on' : ''}" data-action="task-toggle" data-tid="${t.id}" style="border:none;cursor:pointer"></button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }

    /* ── Network Tools (NetworkAuditScreen.kt v2.1.0 — 4-Tab Recon & Defense Suite) ── */
    _renderNetworkAuditScreen() {
      const s = this.state;
      const net = D.NETWORK_RECON;
      const tab = s.networkTab;

      let tabBody = '';
      if (tab === 'lookup') {
        tabBody = `
          <div class="goar-split-stack">
            <div class="goar-split-card" style="padding:14px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                <strong style="font-family:var(--font-mono);font-size:13px">${esc(net.target)}</strong>
                <span style="font-size:10.5px;font-weight:700;color:var(--accent-emerald)">6 / 6 STAGES OK</span>
              </div>
              <div class="g-net-stage-pills" style="margin-bottom:12px">
                ${net.stages.map(st => `<span class="g-net-stage-pill">✓ ${st}</span>`).join('')}
              </div>
              ${net.summary.map(row => `
                <div style="display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-top:1px solid var(--outline-variant);font-size:11.5px">
                  <span style="color:var(--on-surface-variant);font-family:var(--font-mono)">${esc(row.k)}</span>
                  <span style="text-align:right;font-weight:500">${esc(row.v)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (tab === 'lan') {
        tabBody = `
          <div class="g-settings-group-title">Local /24 Subnet Discovery (192.168.1.0/24)</div>
          <div class="goar-split-stack">
            ${net.lanHosts.map(h => `
              <div class="goar-split-card g-settings-row" style="cursor:default">
                <div style="flex:1;min-width:0">
                  <div class="g-settings-row-title" style="font-family:var(--font-mono);font-size:12.5px">${esc(h.ip)} · ${esc(h.host)}</div>
                  <div class="g-settings-row-desc">${esc(h.vendor)} · Open: ${esc(h.ports)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      } else if (tab === 'traffic') {
        tabBody = `
          <div class="g-settings-group-title">In-App Live HTTP &amp; API Proxy Inspector</div>
          <div class="goar-split-stack">
            ${D.BROWSER_NETWORK.map(r => `
              <div class="goar-split-card g-settings-row" style="cursor:default;font-family:var(--font-mono);font-size:11.5px">
                <span style="color:var(--accent-emerald);font-weight:700">${r.status}</span>
                <div style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.method)} ${esc(r.url)}</div>
                <span style="color:var(--on-surface-variant)">${r.ms}ms</span>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        tabBody = `
          <div class="g-settings-group-title">Shadow Trap · Honeyport Deception Daemon</div>
          <div class="goar-split-stack">
            ${net.traps.map(tr => `
              <div class="goar-split-card g-settings-row" style="cursor:default">
                <div style="flex:1">
                  <div class="g-settings-row-title">Port ${tr.port} · ${esc(tr.service)}</div>
                  <div class="g-settings-row-desc">Hits captured: ${tr.hits} · Local deception listener</div>
                </div>
                <span style="font-size:11px;font-weight:700;color:var(--accent-emerald)">${esc(tr.status)}</span>
              </div>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="go-home">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">Network Tools</div>
        </div>
        <div class="g-net-tabs">
          <button class="g-net-tab ${tab === 'lookup' ? 'active' : ''}" data-action="net-tab" data-ntab="lookup">Target Lookup</button>
          <button class="g-net-tab ${tab === 'lan' ? 'active' : ''}" data-action="net-tab" data-ntab="lan">LAN Scan</button>
          <button class="g-net-tab ${tab === 'traffic' ? 'active' : ''}" data-action="net-tab" data-ntab="traffic">Live Traffic</button>
          <button class="g-net-tab ${tab === 'trap' ? 'active' : ''}" data-action="net-tab" data-ntab="trap">Shadow Trap</button>
        </div>
        <div class="g-scroll-body" style="padding-top:4px">${tabBody}</div>
      `;
    }

    /* ── Manus Glass Live Agent PiP Window (ManusGlassPipOverlay.kt v2.1.0) ── */
    _renderManusPip() {
      const s = this.state;
      return `
        <div class="g-pip-window">
          <div class="g-pip-head">
            <span style="display:inline-flex;align-items:center;gap:6px">
              <span style="width:7px;height:7px;border-radius:50%;background:${s.pipTakeover ? '#F59E0B' : '#10B981'}"></span>
              <span>Manus Glass · Live</span>
            </span>
            <button style="background:none;border:none;color:var(--on-surface-variant);cursor:pointer;padding:2px" data-action="pip-close">${I('close', 14)}</button>
          </div>
          <div class="g-pip-body">
            ${s.pipTakeover
              ? '<strong>Manual Takeover Active:</strong> Complete 2FA, login, or checkout directly, then hand control back to Goar.'
              : '<strong>Autonomous Browser:</strong> Inspecting live DOM &amp; verifying deployment headers on <code>goarxyz.com</code>.'}
          </div>
          <div class="g-pip-foot">
            <span style="font-size:10px;font-family:var(--font-mono);color:var(--on-surface-variant)">SmartCookieWeb</span>
            <button class="g-hero-mini-btn" style="padding:3px 9px;font-size:10.5px" data-action="pip-takeover">${s.pipTakeover ? 'Hand Back' : 'Take Over'}</button>
          </div>
        </div>
      `;
    }

    /* ── Settings Screen (SettingsScreen.kt v2.1.0 — Consumer Quick Controls + Tier 1 & Tier 2) ── */
    _renderSettingsScreen() {
      const s = this.state;
      if (s.settingsSubpage === 'about') return this._renderSettingsAbout();
      if (s.settingsSubpage === 'appearance') return this._renderSettingsAppearance();
      if (s.settingsSubpage === 'provider') return this._renderSettingsProviders();
      if (s.settingsSubpage === 'skills') return this._renderSettingsSkills();
      if (s.settingsSubpage === 'api_hub' || s.settingsSubpage === 'mcp') return this._renderSettingsApiHub();
      if (s.settingsSubpage === 'audit') return this._renderNetworkAuditScreen();
      if (s.settingsSubpage) return this._renderSettingsGenericSub(s.settingsSubpage);

      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      const q = s.settingsSearch.trim().toLowerCase();
      const isTinted = s.paletteStyle === 'TINTED';
      const model = this.getSelectedModelObj();

      const filteredGroups = D.SETTINGS_GROUPS.map(g => ({
        title: g.title,
        items: g.items.filter(it => !q || it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q) || it.key.includes(q))
      })).filter(g => g.items.length > 0);

      const filteredAdvanced = D.SETTINGS_ADVANCED_ITEMS.filter(it =>
        !q || it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q) || it.key.includes(q)
      );
      const showAdv = q.length > 0 || s.settingsAdvancedOpen;

      const renderRow = (it) => `
        <button class="goar-split-card g-settings-row" data-action="settings-open" data-skey="${it.key}">
          <span class="g-matte-badge-38" style="background:${isTinted ? hexToRgba(it.colorVar, 0.16) : 'color-mix(in srgb, var(--on-surface) 7%, transparent)'}">
            ${I(it.icon, 19, isTinted ? `var(${it.colorVar})` : 'var(--icon-category)')}
          </span>
          <div style="flex:1;min-width:0">
            <div class="g-settings-row-title">${esc(it.title)}</div>
            <div class="g-settings-row-desc">${esc(it.desc)}</div>
          </div>
        </button>
      `;

      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="go-home">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">Settings</div>
        </div>
        <div class="g-scroll-body" style="padding-top:2px;gap:10px">
          <div class="g-settings-search">
            ${I('search', 17)}
            <input type="text" data-el="g-settings-search-input" value="${esc(s.settingsSearch)}" placeholder="Search settings, OAuth, network tools, models..."/>
            ${s.settingsSearch ? `<button class="g-attach-remove" data-action="settings-clear-search">${I('close', 16)}</button>` : ''}
          </div>

          ${!q ? `
            <div class="g-quick-controls-card">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
                <span style="font-size:13.5px;font-weight:600">Theme</span>
                <div class="g-quick-theme-seg">
                  <button class="g-quick-theme-btn ${theme === 'light' ? 'active' : ''}" data-action="set-theme" data-theme-val="light">Light</button>
                  <button class="g-quick-theme-btn ${theme === 'dark' ? 'active' : ''}" data-action="set-theme" data-theme-val="dark">Dark</button>
                </div>
              </div>
              <div style="height:1px;background:var(--outline-variant);opacity:.7"></div>
              <div style="display:flex;align-items:center;gap:10px;cursor:pointer" data-action="settings-open" data-skey="provider">
                ${I(model.icon, 20, 'var(--icon-primary)')}
                <div style="flex:1;min-width:0">
                  <div style="font-size:11px;color:var(--on-surface-variant)">Active AI Engine</div>
                  <div style="font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(model.provider)} · ${esc(model.label)}</div>
                </div>
                <span style="font-size:11.5px;font-weight:600;padding:4px 10px;border-radius:999px;background:var(--surface-high);border:1px solid var(--outline-variant)">Change</span>
              </div>
            </div>
          ` : ''}

          ${filteredGroups.map(g => `
            <div>
              <div class="g-settings-group-title">${esc(g.title)}</div>
              <div class="goar-split-stack">${g.items.map(renderRow).join('')}</div>
            </div>
          `).join('')}

          ${filteredAdvanced.length ? `
            <div>
              <button class="goar-split-card g-settings-row" style="width:100%;border-radius:16px;margin-bottom:${showAdv ? '6px' : '0'}" data-action="settings-toggle-advanced">
                <div style="flex:1">
                  <div class="g-settings-row-title">Advanced &amp; Developer Studio (${filteredAdvanced.length})</div>
                  <div class="g-settings-row-desc">Linux PRoot, SSH, OAuth MCP servers, Network Tools &amp; WebUI</div>
                </div>
                ${I(showAdv ? 'chevron_up' : 'chevron_down', 18, 'var(--on-surface-variant)')}
              </button>
              ${showAdv ? `<div class="goar-split-stack">${filteredAdvanced.map(renderRow).join('')}</div>` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }

    _renderSettingsApiHub() {
      const s = this.state;
      const connectors = [
        { name: 'Google', sub: 'Drive, Gmail & Calendar · Native Android Identity', icon: 'ic_mcp_gdrive' },
        { name: 'GitHub', sub: 'Repos, PRs, Issues & Actions · OAuth 2.1 PKCE', icon: 'ic_mcp_github' },
        { name: 'Notion', sub: 'Workspace pages & databases · OAuth 2.1 PKCE', icon: 'ic_mcp_notion' },
        { name: 'Linear', sub: 'Issues, cycles & triage · OAuth 2.1 PKCE', icon: 'ic_mcp_linear' },
        { name: 'Cloudflare', sub: 'Workers, KV, D1, R2 & DNS · OAuth 2.1 PKCE', icon: 'ic_brand_cloudflare' },
        { name: 'Vercel', sub: 'Projects, builds & logs · OAuth 2.1 PKCE', icon: 'ic_brand_vercel' },
        { name: 'Supabase', sub: 'Postgres schemas & Edge Functions · OAuth 2.1', icon: 'ic_brand_supabase' },
        { name: 'Stripe', sub: 'Customers, invoices & checkout · OAuth 2.1', icon: 'provider_stripe' },
        { name: 'Figma', sub: 'Dev Mode tokens & components · OAuth 2.1', icon: 'ic_brand_figma' }
      ];
      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="settings-back">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">OAuth 2.1 &amp; MCP Hub</div>
        </div>
        <div class="g-scroll-body">
          <div class="g-settings-group-title">One-Tap Consumer Sign-In (RFC 7636 PKCE · Zero Key Copy-Paste)</div>
          <div class="goar-split-stack">
            ${connectors.map(c => {
              const on = !!s.oauthConnected[c.name];
              return `
                <button class="goar-split-card g-settings-row" data-action="oauth-toggle" data-provider="${esc(c.name)}">
                  ${I(c.icon, 20, 'var(--icon-chrome)')}
                  <div style="flex:1;min-width:0">
                    <div class="g-settings-row-title">${esc(c.name)}</div>
                    <div class="g-settings-row-desc">${esc(c.sub)}</div>
                  </div>
                  <span style="font-size:11px;font-weight:700;padding:4px 9px;border-radius:999px;background:${on ? 'color-mix(in srgb, var(--accent-emerald) 16%, transparent)' : 'var(--surface-high)'};color:${on ? 'var(--accent-emerald)' : 'var(--on-surface)'}">${on ? 'Connected' : 'Sign In'}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    _renderSettingsAbout() {
      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="settings-back">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">About &amp; Legal</div>
        </div>
        <div class="g-scroll-body" style="padding-top:4px;gap:14px">
          <div style="display:flex;flex-direction:column;align-items:center;padding:8px 0">
            <div style="width:84px;height:84px;border-radius:50%;background:var(--surface-high);display:flex;align-items:center;justify-content:center">
              <img src="assets/ic_goar_mark.png" width="52" height="52" class="goar-mark-img goar-mark-dark-only"/>
              <img src="assets/ic_goar_mark_black.png" width="52" height="52" class="goar-mark-img goar-mark-light-only"/>
            </div>
            <div style="font-size:19px;font-weight:700;margin-top:10px">Goar Studio</div>
            <div style="font-size:13px;color:var(--on-surface-variant)">Version 2.1.0 (Build 31)</div>
          </div>

          <div>
            <div class="g-settings-group-title">Guides &amp; Support</div>
            <div class="goar-split-stack">
              <div class="goar-split-card g-settings-row" style="cursor:default">
                ${I('ic_set_email', 20, 'var(--icon-chrome)')}
                <div><div class="g-settings-row-title">Support</div><div class="g-settings-row-desc">admin@goarxyz.com</div></div>
              </div>
              <div class="goar-split-card g-settings-row" style="cursor:default">
                ${I('public', 20, 'var(--icon-chrome)')}
                <div><div class="g-settings-row-title">Official Website</div><div class="g-settings-row-desc">https://goarxyz.com</div></div>
              </div>
            </div>
          </div>

          <div>
            <div class="g-settings-group-title">Legal &amp; Privacy</div>
            <div class="goar-split-stack">
              <button class="goar-split-card g-settings-row" data-action="open-legal" data-doc="privacy_policy">
                ${I('privacy_tip', 20, 'var(--icon-chrome)')}
                <div><div class="g-settings-row-title">Privacy Policy</div><div class="g-settings-row-desc">Local storage, encrypted keystore protection, and network rules</div></div>
              </button>
              <button class="goar-split-card g-settings-row" data-action="open-legal" data-doc="terms_of_service">
                ${I('description', 20, 'var(--icon-chrome)')}
                <div><div class="g-settings-row-title">Terms of Service</div><div class="g-settings-row-desc">Application usage terms</div></div>
              </button>
              <button class="goar-split-card g-settings-row" data-action="open-legal" data-doc="license">
                ${I('ic_set_info', 20, 'var(--icon-chrome)')}
                <div><div class="g-settings-row-title">Software License</div><div class="g-settings-row-desc">Application and open source licenses</div></div>
              </button>
              <button class="goar-split-card g-settings-row" data-action="open-legal" data-doc="privacy_act">
                ${I('verified', 20, 'var(--icon-chrome)')}
                <div><div class="g-settings-row-title">Data Protection</div><div class="g-settings-row-desc">On-device storage, encryption, and export/deletion controls</div></div>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    _renderSettingsAppearance() {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      const isDark = theme !== 'light';
      const curPal = this.state.paletteStyle;
      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="settings-back">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">Appearance</div>
        </div>
        <div class="g-scroll-body">
          <div class="g-settings-group-title">Surface Mode</div>
          <div class="goar-split-stack">
            <button class="goar-split-card g-settings-row" data-action="set-theme" data-theme-val="dark">
              ${I('moon', 20, 'var(--icon-chrome)')}
              <div style="flex:1"><div class="g-settings-row-title">Obsidian Dark</div><div class="g-settings-row-desc">#060608 obsidian surfaces · #F4F4F6 bone ink</div></div>
              ${isDark ? I('check', 18, 'var(--primary)') : ''}
            </button>
            <button class="goar-split-card g-settings-row" data-action="set-theme" data-theme-val="light">
              ${I('sun', 20, 'var(--icon-chrome)')}
              <div style="flex:1"><div class="g-settings-row-title">Crisp Alabaster Light</div><div class="g-settings-row-desc">#FAFAFB alabaster surfaces · #0B0B0E deep ink</div></div>
              ${!isDark ? I('check', 18, 'var(--primary)') : ''}
            </button>
          </div>

          <div class="g-settings-group-title" style="margin-top:8px">Color &amp; Accent Style (GoarPaletteStyle)</div>
          <div class="g-palette-grid">
            ${D.PALETTE_STYLES.map(p => `
              <button class="g-palette-card ${curPal === p.key ? 'active' : ''}" data-action="set-palette" data-pal="${p.key}">
                <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
                  <span class="g-palette-swatch" style="background:${isDark ? p.swatchDark : p.swatchLight}"></span>
                  ${curPal === p.key ? I('check', 15, 'var(--primary)') : ''}
                </div>
                <div style="font-size:12.5px;font-weight:600;color:var(--on-surface)">${esc(p.title)}</div>
                <div style="font-size:11px;color:var(--on-surface-variant);line-height:1.35">${esc(p.subtitle)}</div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    _renderSettingsProviders() {
      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="settings-back">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">Providers</div>
        </div>
        <div class="g-scroll-body">
          <div class="g-settings-group-title">Encrypted On-Device Vault</div>
          <div class="goar-split-stack">
            ${D.PROVIDERS_SHOWCASE.slice(0, 10).map((p, i) => `
              <div class="goar-split-card g-settings-row" style="cursor:default">
                ${I(p.icon, 20, 'var(--primary)')}
                <div style="flex:1">
                  <div class="g-settings-row-title">${esc(p.name)}</div>
                  <div class="g-settings-row-desc">${i < 4 ? 'Configured · Keystore AES-256' : 'Ready for BYOK key or custom endpoint'}</div>
                </div>
                <span style="font-size:11px;font-weight:600;color:${i < 4 ? 'var(--accent-emerald)' : 'var(--on-surface-variant)'}">${i < 4 ? 'Active' : 'Setup'}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    _renderSettingsSkills() {
      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="settings-back">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">Skills &amp; Tools</div>
        </div>
        <div class="g-scroll-body">
          <div class="g-settings-group-title">Bundled SKILL.md Playbooks (${D.SKILLS.length})</div>
          <div class="goar-split-stack">
            ${D.SKILLS.map(sk => `
              <div class="goar-split-card g-settings-row" style="cursor:default">
                <span class="g-matte-badge-32" style="background:${hexToRgba('--m-set-skills', 0.16)}">${I('ic_set_skills', 17, 'var(--m-set-skills)')}</span>
                <div style="flex:1;min-width:0">
                  <div class="g-settings-row-title" style="font-family:var(--font-mono);font-size:13px">${esc(sk.file)}</div>
                  <div class="g-settings-row-desc">${esc(sk.desc)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    _renderSettingsGenericSub(key) {
      let item = null;
      D.SETTINGS_GROUPS.forEach(g => g.items.forEach(it => { if (it.key === key) item = it; }));
      if (!item && D.SETTINGS_ADVANCED_ITEMS) {
        item = D.SETTINGS_ADVANCED_ITEMS.find(it => it.key === key) || null;
      }
      const title = item ? item.title : 'Settings';
      const desc = item ? item.desc : '';
      return `
        <div class="g-settings-header">
          <button class="g-circ-back" data-action="settings-back">${I('chevron_left', 22)}</button>
          <div class="g-settings-large-title">${esc(title)}</div>
        </div>
        <div class="g-scroll-body">
          <div class="goar-split-stack">
            <div class="goar-split-card" style="padding:18px">
              <div style="font-size:14.5px;font-weight:600;margin-bottom:6px">${esc(title)}</div>
              <div style="font-size:13px;color:var(--on-surface-variant);line-height:1.55">${esc(desc)}. All configuration values persist locally in Jetpack DataStore and Android Keystore-backed EncryptedSharedPreferences on Android.</div>
            </div>
          </div>
        </div>
      `;
    }

    _renderLegalModal() {
      const doc = D.LEGAL_DOCS[this.state.legalModalKey];
      if (!doc) return '';
      return `
        <div class="g-modal-scrim" data-action="close-legal">
          <div class="g-modal-dialog" onclick="event.stopPropagation()">
            <div style="font-size:18px;font-weight:700">${esc(doc.title)}</div>
            <div class="g-modal-body">${esc(doc.raw)}</div>
            <div style="display:flex;justify-content:flex-end">
              <button class="g-hero-mini-btn" data-action="close-legal">Close</button>
            </div>
          </div>
        </div>
      `;
    }

    /* ── Live Voice Fluid Blob Overlay (GoarVoiceChatOverlay.kt) ── */
    _renderVoiceOverlay() {
      const s = this.state;
      const presets = ['Nova', 'Alloy', 'Echo', 'Onyx', 'Sage'];
      const speeds = ['1x', '1.25x', '1.5x'];
      const statusText = s.voicePhase === 'speaking'
        ? 'Speaking · Tap orb to interrupt'
        : s.voicePhase === 'thinking'
          ? 'Thinking…'
          : s.voicePhase === 'listening'
            ? 'Listening…'
            : 'Tap the orb to speak';

      return `
        <div class="g-voice-overlay">
          <div class="g-voice-topbar">
            <span class="g-voice-pill">${esc(this.getSelectedModelObj().label)}</span>
            <div style="display:flex;gap:6px">
              <button class="g-voice-pill" data-action="voice-preset">${I('record_voice', 14, 'var(--primary)')} ${presets[s.voicePresetIdx]}</button>
              <button class="g-voice-pill" data-action="voice-speed" style="color:var(--primary)">${speeds[s.voiceSpeedIdx]}</button>
            </div>
          </div>

          <div class="g-voice-center">
            <canvas data-el="g-voice-blob" class="g-voice-blob-canvas" style="width:214px;height:214px" width="428" height="428" data-action="voice-orb-tap" role="button" aria-label="Cycle Live Voice State"></canvas>
            <button type="button" data-action="voice-orb-tap" style="background:none;border:none;color:var(--on-surface);font-size:14px;font-weight:600;margin-top:8px;cursor:pointer">${statusText}</button>
            <div style="font-size:11.5px;color:var(--on-surface-variant);margin-top:3px">Whisper.cpp On-Device STT · Neural TTS (Mocked)</div>
            <div class="g-voice-caption-card">${esc(s.voiceCaption)}</div>
          </div>

          <div class="g-voice-controls">
            <div class="g-voice-ctrl-col">
              <button class="g-voice-round-btn" data-action="voice-mute-mic" aria-label="${s.voiceMicMuted ? 'Unmute' : 'Mute'}">${I(s.voiceMicMuted ? 'mic_off' : 'mic', 22)}</button>
              <span>${s.voiceMicMuted ? 'Unmute' : 'Mute'}</span>
            </div>
            <div class="g-voice-ctrl-col">
              <button class="g-voice-round-btn" data-action="voice-mute-spk" aria-label="${s.voiceSpeakerMuted ? 'Audio Off' : 'Audio'}">${I(s.voiceSpeakerMuted ? 'volume_off' : 'volume_up', 22)}</button>
              <span>${s.voiceSpeakerMuted ? 'Audio Off' : 'Audio'}</span>
            </div>
            <div class="g-voice-ctrl-col">
              <button class="g-voice-round-btn end" data-action="voice-close" aria-label="End">${I('close', 22, '#fff')}</button>
              <span style="color:#D93848">End</span>
            </div>
          </div>
        </div>
      `;
    }

    /* ── Event Binding ── */
    _bindEvents() {
      const root = this.mountEl;

      // Scroll chat & terminal to bottom
      const msgScroll = root.querySelector('[data-el="g-msg-scroll"]');
      if (msgScroll) msgScroll.scrollTop = msgScroll.scrollHeight;
      const termOut = root.querySelector('[data-el="g-term-out"]');
      if (termOut) termOut.scrollTop = termOut.scrollHeight;

      // Composer textareas
      root.querySelectorAll('.g-composer-textarea').forEach(ta => {
        ta.addEventListener('input', () => {
          const mode = ta.dataset.composerMode;
          if (mode === 'ask') this.state.draft = ta.value;
          else if (mode === 'imagine') this.state.imaginePrompt = ta.value;
          else if (mode === 'build') this.state.builderPrompt = ta.value;
          else if (mode === 'docs') this.state.docPrompt = ta.value;

          const start = ta.selectionStart;
          const end = ta.selectionEnd;
          this.render();
          const newTa = this.mountEl.querySelector('.g-composer-textarea');
          if (newTa) { newTa.focus(); newTa.setSelectionRange(start, end); }
        });
        ta.addEventListener('keydown', e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this._handlePrimarySend(ta.dataset.composerMode);
          }
        });
      });

      // Drawer & Settings live search inputs
      const dSearch = root.querySelector('[data-el="g-drawer-search-input"]');
      if (dSearch) {
        dSearch.addEventListener('input', () => {
          const pos = dSearch.selectionStart;
          this.state.drawerSearch = dSearch.value;
          this.render();
          const el = this.mountEl.querySelector('[data-el="g-drawer-search-input"]');
          if (el) { el.focus(); el.setSelectionRange(pos, pos); }
        });
      }
      const sSearch = root.querySelector('[data-el="g-settings-search-input"]');
      if (sSearch) {
        sSearch.addEventListener('input', () => {
          const pos = sSearch.selectionStart;
          this.state.settingsSearch = sSearch.value;
          this.render();
          const el = this.mountEl.querySelector('[data-el="g-settings-search-input"]');
          if (el) { el.focus(); el.setSelectionRange(pos, pos); }
        });
      }

      // Browser URL input
      const bUrl = root.querySelector('[data-el="g-browser-url"]');
      if (bUrl) {
        bUrl.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const val = bUrl.value.trim();
            if (val) {
              this.state.browserLoadedUrl = val.startsWith('http') ? val : 'https://' + val;
              this.render();
            }
          }
        });
      }

      // Terminal form
      const tForm = root.querySelector('[data-el="g-term-form"]');
      if (tForm) {
        tForm.addEventListener('submit', e => {
          e.preventDefault();
          const inp = root.querySelector('[data-el="g-term-input"]');
          if (!inp) return;
          this._runTerminalCommand(inp.value);
        });
      }

      // Primary Send / 2-Second Hold for Live Voice Gesture
      const sendBtn = root.querySelector('[data-action="primary-send"]');
      if (sendBtn) {
        let holdTriggered = false;
        let holdRaf = null;
        const arc = sendBtn.querySelector('.g-hold-arc');

        const cancelHold = () => {
          if (holdRaf) cancelAnimationFrame(holdRaf);
          holdRaf = null;
          if (arc) arc.setAttribute('stroke-dashoffset', '128.8');
        };

        const startHold = () => {
          holdTriggered = false;
          const mode = sendBtn.dataset.mode;
          if (this.state.isStreaming || mode !== 'ask') return;
          const t0 = performance.now();
          const tick = now => {
            const p = Math.min(1, (now - t0) / 1400); // snappy 1.4s web hold feel
            if (arc && p > 0.08) arc.setAttribute('stroke-dashoffset', String(128.8 * (1 - p)));
            if (p >= 1) {
              holdTriggered = true;
              cancelHold();
              this.state.voiceOpen = true;
              this.state.voicePhase = 'listening';
              this.state.voiceCaption = '“Ready — tap the orb to simulate live full-duplex conversation.”';
              this.render();
              return;
            }
            holdRaf = requestAnimationFrame(tick);
          };
          holdRaf = requestAnimationFrame(tick);
        };

        sendBtn.addEventListener('pointerdown', startHold);
        sendBtn.addEventListener('pointerup', () => {
          cancelHold();
          if (!holdTriggered) this._handlePrimarySend(sendBtn.dataset.mode);
        });
        sendBtn.addEventListener('pointerleave', cancelHold);
      }

      // Delegated Click Handler (bound to freshly rendered viewport so listeners never stack)
      const vp = root.querySelector('.goar-app-viewport');
      if (vp) {
        // Any real user touch or typing inside a scenario clip phone seamlessly pauses auto-play
        // so the user gets full 1-to-1 hands-on control of the app immediately.
        vp.addEventListener('pointerdown', () => {
          if (this._clipPlaying) this.pauseClip(true);
        }, { capture: true });
        vp.addEventListener('keydown', () => {
          if (this._clipPlaying) this.pauseClip(true);
        }, { capture: true });
      }
      if (vp) vp.addEventListener('click', e => {
        const copyCodeBtn = e.target.closest('[data-copy-code]');
        if (copyCodeBtn) {
          const code = copyCodeBtn.closest('.g-code-block').querySelector('code').textContent;
          navigator.clipboard && navigator.clipboard.writeText(code).catch(() => {});
          this.showSnackbar('Code copied to clipboard');
          return;
        }

        const btn = e.target.closest('[data-action]');
        if (!btn) {
          if (this.state.popover || this.state.imagineModelOpen) {
            this.closePopovers();
            this.render();
          }
          return;
        }

        const act = btn.dataset.action;
        if (act === 'primary-send') return; // handled via pointerup

        e.stopPropagation();

        switch (act) {
          case 'open-drawer':
            this.closePopovers();
            this.state.drawerOpen = true;
            this.render();
            break;
          case 'close-drawer':
            this.state.drawerOpen = false;
            this.render();
            break;
          case 'drawer-tab':
            this.state.drawerTab = btn.dataset.dtab;
            this.render();
            break;
          case 'switch-tab':
            this.closePopovers();
            this.state.screen = btn.dataset.tab;
            this.render();
            break;
          case 'top-right-action':
            if (this.state.screen === 'ask') {
              this.state.activeConvId = null;
              this.state.draft = '';
              this.showSnackbar('Started new chat');
            } else if (this.state.screen === 'imagine') {
              this.state.imagineRefAttached = !this.state.imagineRefAttached;
              this.showSnackbar(this.state.imagineRefAttached ? 'Reference image attached' : 'Reference cleared');
            } else if (this.state.screen === 'build') {
              this._createBuilderProject('New App ' + (this.state.builderProjects.length + 1), generateCustomMiniApp('Interactive Counter App'));
            }
            break;
          case 'go-home':
            this.state.screen = 'ask';
            this.render();
            break;
          case 'drawer-nav': {
            const dest = btn.dataset.dest;
            this.state.drawerOpen = false;
            if (dest === 'new-chat') {
              this.state.screen = 'ask';
              this.state.activeConvId = null;
              this.state.draft = '';
            } else {
              this.state.screen = dest;
              this.state.settingsSubpage = null;
            }
            this.render();
            break;
          }
          case 'open-conv':
            this.state.drawerOpen = false;
            this.state.screen = 'ask';
            this.state.activeConvId = btn.dataset.id;
            this.render();
            break;
          case 'open-bot': {
            const bot = D.BOTS.find(b => b.id === btn.dataset.bot);
            if (bot) {
              const cid = 'bot_conv_' + bot.id;
              if (!this.state.conversations.find(c => c.id === cid)) {
                this.state.conversations.unshift({
                  id: cid,
                  title: `${bot.name} (@${bot.handle})`,
                  model: this.state.selectedModel,
                  tokens: 2150,
                  messages: [
                    {
                      role: 'assistant',
                      model: `${bot.name} · @${bot.handle}`,
                      thoughtTime: '0.6s',
                      thought: `Loaded ${bot.id}.md SOUL profile and prioritized skills: ${bot.skills.join(', ')}.`,
                      tools: bot.skills.map(s => ({ name: 'skill_load', detail: s })),
                      markdown: `**${bot.name} (@${bot.handle}) — ${bot.title}**\n\n${bot.soul}\n\nSend a directive or mention a peer bot like \`@architect\` or \`@aegis\` to start multi-agent deliberation.`
                    }
                  ]
                });
              }
              this.state.activeConvId = cid;
              this.state.drawerOpen = false;
              this.state.screen = 'ask';
              this.render();
            }
            break;
          }
          case 'bot-toast':
            this.showSnackbar(btn.dataset.msg);
            break;
          case 'toggle-thought':
            this.state.expandedThoughts[btn.dataset.tkey] = !this.state.expandedThoughts[btn.dataset.tkey];
            this.render();
            break;
          case 'copy-msg':
            this.showSnackbar('Response copied to clipboard');
            break;
          case 'regen-msg':
            this.showSnackbar('Regenerating branch 2 / 2 (Mocked)');
            break;
          case 'fork-msg':
            this.showSnackbar('Forked conversation into new thread');
            break;
          case 'toggle-expand':
            this.state.composerExpanded = !this.state.composerExpanded;
            this.render();
            break;
          case 'toggle-pop':
            this.state.popover = this.state.popover === btn.dataset.pop ? null : btn.dataset.pop;
            this.render();
            break;
          case 'add-attach':
            this.state.attachments.push({ name: btn.dataset.name, icon: btn.dataset.icon });
            this.state.popover = null;
            this.render();
            break;
          case 'remove-attach':
            this.state.attachments.splice(Number(btn.dataset.idx), 1);
            this.render();
            break;
          case 'select-model':
            this.state.selectedModel = btn.dataset.model;
            this.state.popover = null;
            this.showSnackbar('Model: ' + this.getSelectedModelObj().label);
            break;
          case 'toggle-tool':
            this.state.tools[btn.dataset.tool] = !this.state.tools[btn.dataset.tool];
            this.render();
            break;
          case 'compact-now':
            this.state.popover = null;
            this._runCompact();
            break;
          case 'enhance-prompt': {
            const m = btn.dataset.mode;
            if (m === 'ask' && this.state.draft.trim()) {
              this.state.draft = `Analyze thoroughly with step-by-step verification and concrete code/tool output: ${this.state.draft.trim()}`;
            } else if (m === 'imagine' && this.state.imaginePrompt.trim()) {
              this.state.imaginePrompt = `Cinematic editorial composition, warm volumetric lighting, 35mm anamorphic lens, ultra-crisp tactile textures: ${this.state.imaginePrompt.trim()}`;
            } else if (m === 'build' && this.state.builderPrompt.trim()) {
              this.state.builderPrompt = `Build a responsive monochrome interactive web app using GoarSDK with crisp animations: ${this.state.builderPrompt.trim()}`;
            }
            this.showSnackbar('Prompt enhanced');
            break;
          }
          case 'pick-slash':
            if (btn.dataset.instant === '1') {
              this._executeSlashCommand(btn.dataset.insert);
            } else {
              this.state.draft = btn.dataset.insert;
              this.render();
              if (!this._videoRunning) {
                const ta = this.mountEl.querySelector('.g-composer-textarea');
                if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
              }
            }
            break;
          case 'set-vibe-mode':
            this.state.vibeMode = btn.dataset.vibe;
            this.state.draft = '';
            this.showSnackbar(`Vibe execution mode: ${btn.dataset.vibe.toUpperCase()}`);
            break;
          case 'pick-mention':
            this.state.draft = this.state.draft.replace(/@[a-zA-Z0-9_-]*$/, btn.dataset.handle + ' ');
            this.render();
            break;

          // Live Voice Overlay Actions
          case 'voice-preset':
            this.state.voicePresetIdx = (this.state.voicePresetIdx + 1) % 5;
            this.render();
            break;
          case 'voice-speed':
            this.state.voiceSpeedIdx = (this.state.voiceSpeedIdx + 1) % 3;
            this.render();
            break;
          case 'voice-mute-mic':
            this.state.voiceMicMuted = !this.state.voiceMicMuted;
            this.render();
            break;
          case 'voice-mute-spk':
            this.state.voiceSpeakerMuted = !this.state.voiceSpeakerMuted;
            this.render();
            break;
          case 'voice-close':
            this.state.voiceOpen = false;
            this.state.voicePhase = 'idle';
            this.render();
            break;
          case 'voice-orb-tap':
            this._cycleVoiceDemo();
            break;

          // Imagine Playground Actions
          case 'imagine-mode':
            this.state.imagineMode = btn.dataset.imode;
            this.state.imagineModelOpen = false;
            this.render();
            break;
          case 'imagine-toggle-model':
            this.state.imagineModelOpen = !this.state.imagineModelOpen;
            this.render();
            break;
          case 'imagine-pick-model':
            this.state.imagineModels[this.state.imagineMode] = btn.dataset.mid;
            this.state.imagineModelOpen = false;
            this.render();
            break;
          case 'imagine-cycle-res': {
            const list = ['720p', '1080p', '4K'];
            this.state.imagineRes = list[(list.indexOf(this.state.imagineRes) + 1) % list.length];
            this.render();
            break;
          }
          case 'imagine-cycle-aspect': {
            const list = ['16:9', '1:1', '9:16', '4:5', '21:9'];
            this.state.imagineAspect = list[(list.indexOf(this.state.imagineAspect) + 1) % list.length];
            this.render();
            break;
          }
          case 'imagine-cycle-dur': {
            const list = [5, 10, 15];
            this.state.imagineDuration = list[(list.indexOf(this.state.imagineDuration) + 1) % list.length];
            this.render();
            break;
          }
          case 'imagine-toggle-sound':
            this.state.imagineSound = !this.state.imagineSound;
            this.render();
            break;
          case 'imagine-toggle-draft':
            this.state.imagineDraft = !this.state.imagineDraft;
            this.render();
            break;
          case 'imagine-cycle-voice': {
            const list = ['alloy', 'nova', 'echo', 'onyx', 'shimmer', 'sage'];
            this.state.imagineVoice = list[(list.indexOf(this.state.imagineVoice) + 1) % list.length];
            this.render();
            break;
          }
          case 'imagine-ref':
            this.state.imagineRefAttached = !this.state.imagineRefAttached;
            this.render();
            break;
          case 'imagine-demo-gen':
            this._createMockImagineAsset(
              this.state.imagineMode === 'video' ? 'Kinetic monochrome studio light sweep'
                : this.state.imagineMode === 'image' ? 'Obsidian monolith in warm fog'
                : 'Calm studio narration · Goar v2.0',
              this.state.imagineMode
            );
            this.render();
            break;
          case 'imagine-select-asset':
            this.state.imagineActiveAssetId = btn.dataset.aid;
            this.render();
            break;
          case 'imagine-clear-asset':
            this.state.imagineActiveAssetId = null;
            this.render();
            break;
          case 'imagine-animate':
            this.state.imagineMode = 'video';
            this.state.imagineRefAttached = true;
            this.showSnackbar('Image attached as video start frame');
            break;

          // Build Actions
          case 'builder-pane':
            this.state.builderPane = btn.dataset.pane;
            this.render();
            break;
          case 'builder-apply-code': {
            const ed = this.mountEl.querySelector('[data-el="g-builder-code-editor"]');
            const p = this.state.builderProjects.find(x => x.slug === this.state.builderActiveSlug);
            if (ed && p) {
              p.html = ed.value;
              this.state.builderPane = 'preview';
              this.showSnackbar('Saved & reloaded live preview');
            }
            break;
          }
          case 'builder-template': {
            const tpl = D.BUILDER_TEMPLATES.find(t => t.slug === btn.dataset.slug);
            if (tpl) {
              this._createBuilderProject(tpl.title, tpl.html, tpl.slug);
              this.showSnackbar(`Loaded '${tpl.title}'`);
            }
            break;
          }
          case 'builder-select-proj':
            this.state.builderActiveSlug = btn.dataset.slug;
            this.state.builderPane = 'preview';
            this.render();
            break;
          case 'builder-shuffle':
            this.state.builderSpinning = true;
            this.state.builderTemplates.push(this.state.builderTemplates.shift());
            this.render();
            setTimeout(() => { this.state.builderSpinning = false; this.render(); }, 460);
            break;

          // Browser Actions
          case 'browser-engine':
            this.state.browserEngine = btn.dataset.eng;
            this.render();
            break;
          case 'browser-go':
            this.state.browserLoadedUrl = btn.dataset.url;
            this.render();
            break;
          case 'browser-toggle-dev':
            this.state.browserDevToolsOpen = !this.state.browserDevToolsOpen;
            this.render();
            break;
          case 'browser-devtab':
            this.state.browserDevTab = btn.dataset.dtab;
            this.render();
            break;
          case 'browser-toggle-spoof':
            this.state.browserSpoofDesktop = !this.state.browserSpoofDesktop;
            this.render();
            break;
          case 'browser-toggle-ai':
            this.state.browserAiControl = !this.state.browserAiControl;
            this.render();
            break;
          case 'browser-agent-run':
            this.showSnackbar('Browser Agent executed DOM inspection (Mocked)');
            break;

          // Files Actions
          case 'files-source':
            this.state.filesSource = btn.dataset.src;
            this.render();
            break;
          case 'files-open':
            this.state.filesActiveName = btn.dataset.fname;
            this.render();
            break;
          case 'files-close':
            this.state.filesActiveName = null;
            this.render();
            break;

          // Terminal Actions
          case 'term-quick':
            this._runTerminalCommand(btn.dataset.cmd);
            break;
          case 'term-extrakey':
            if (btn.dataset.key === 'TAB') this._runTerminalCommand('ls');
            else this.showSnackbar(`Sent VT100 key: ${btn.dataset.key}`);
            break;

          // Document Editor Actions
          case 'doc-toggle-mode':
            this.state.docMode = this.state.docMode === 'Suggesting' ? 'Editing' : 'Suggesting';
            this.render();
            break;
          case 'doc-diff':
            this.state.docDiffs[0].status = btn.dataset.res;
            this.showSnackbar(`Tracked revision ${btn.dataset.res}`);
            break;
          case 'doc-reset-diff':
            this.state.docDiffs[0].status = 'pending';
            this.showSnackbar('Proposed AI Word redline revision');
            break;
          case 'doc-export':
            this.showSnackbar(`Exported Goar_Architecture_Brief${btn.dataset.fmt} (Mocked)`);
            break;

          // Tasks Actions
          case 'cal-shift':
            this.state.calMonthOffset += Number(btn.dataset.delta);
            this.render();
            break;
          case 'tasks-hub':
            this.state.tasksHub = btn.dataset.hub;
            this.render();
            break;
          case 'task-toggle': {
            const t = this.state.tasks.find(x => x.id === btn.dataset.tid);
            if (t) { t.enabled = !t.enabled; this.render(); }
            break;
          }
          case 'task-run': {
            const t = this.state.tasks.find(x => x.id === btn.dataset.tid);
            if (t) { t.lastStatus = 'Ran just now · OK'; this.showSnackbar(`Executed '${t.name}'`); }
            break;
          }

          // Settings & v2.1.0 Actions
          case 'composer-agents':
            this.closePopovers();
            this.state.drawerOpen = true;
            this.state.drawerTab = 'bots';
            this.render();
            break;
          case 'net-tab':
            this.state.networkTab = btn.dataset.ntab;
            this.render();
            break;
          case 'pip-close':
            this.state.pipOpen = false;
            this.render();
            break;
          case 'pip-takeover':
            this.state.pipTakeover = !this.state.pipTakeover;
            this.render();
            break;
          case 'settings-toggle-advanced':
            this.state.settingsAdvancedOpen = !this.state.settingsAdvancedOpen;
            this.render();
            break;
          case 'set-palette':
            this.state.paletteStyle = btn.dataset.pal;
            this.render();
            break;
          case 'oauth-toggle': {
            const p = btn.dataset.provider;
            this.state.oauthConnected[p] = !this.state.oauthConnected[p];
            this.showSnackbar(this.state.oauthConnected[p] ? `${p} connected via OAuth 2.1 PKCE` : `${p} disconnected`);
            break;
          }
          case 'settings-open':
            this.state.settingsSubpage = btn.dataset.skey;
            this.render();
            break;
          case 'settings-back':
            this.state.settingsSubpage = null;
            this.render();
            break;
          case 'settings-clear-search':
            this.state.settingsSearch = '';
            this.render();
            break;
          case 'set-theme':
            document.documentElement.setAttribute('data-theme', btn.dataset.themeVal);
            if (this.onThemeSync) this.onThemeSync(btn.dataset.themeVal);
            this.render();
            break;
          case 'open-legal':
            this.state.legalModalKey = btn.dataset.doc;
            this.render();
            break;
          case 'close-legal':
            this.state.legalModalKey = null;
            this.render();
            break;
        }
      });
    }

    _handlePrimarySend(mode) {
      if (mode === 'ask') {
        if (this.state.isStreaming) {
          clearInterval(this.state.streamTimer);
          this.state.isStreaming = false;
          const conv = this.getCurrentConv();
          if (conv && conv.messages.length) conv.messages[conv.messages.length - 1].streaming = false;
          this.showSnackbar('Generation stopped');
          return;
        }
        const text = this.state.draft.trim();
        if (!text && !this.state.attachments.length) {
          // Idle waveform tap opens Live Voice overlay directly on web too!
          this.state.voiceOpen = true;
          this.state.voicePhase = 'listening';
          this.state.voiceCaption = '“Tap the orb to test Live Voice listening, thinking, and speaking waveforms.”';
          this.render();
          return;
        }
        if (text.startsWith('/')) {
          this._executeSlashCommand(text);
          return;
        }
        this._sendMockChatMessage(text);
      } else if (mode === 'imagine') {
        const prompt = this.state.imaginePrompt.trim() || 'Editorial monochrome architectural study';
        this.state.imaginePrompt = '';
        this._createMockImagineAsset(prompt, this.state.imagineMode);
        this.showSnackbar(`Rendered via ${D.PLAYGROUND_MODELS[this.state.imagineMode].find(m => m.id === this.state.imagineModels[this.state.imagineMode]).name}`);
      } else if (mode === 'build') {
        const prompt = this.state.builderPrompt.trim();
        if (!prompt) return;
        this.state.builderPrompt = '';
        const slug = prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 22) || 'custom-app';
        this._createBuilderProject(prompt.slice(0, 24), generateCustomMiniApp(prompt), slug);
        this.showSnackbar(`Built '${prompt.slice(0, 24)}'`);
      } else if (mode === 'docs') {
        const prompt = this.state.docPrompt.trim();
        if (!prompt) return;
        this.state.docPrompt = '';
        this.state.docDiffs[0] = {
          id: 'd_' + Date.now(),
          author: 'AI Assistant',
          reason: prompt,
          original: this.state.docDiffs[0].revised,
          revised: `Updated per "${prompt}": Goar Studio encrypts all local Room databases, workspace archives, and Keystore API credentials strictly on-device with zero third-party ad SDKs.`,
          status: 'pending'
        };
        this.showSnackbar('AI proposed tracked redline change');
      }
    }

    _executeSlashCommand(cmd) {
      const lower = cmd.trim().toLowerCase();
      this.state.draft = '';
      if (lower === '/clear') {
        this.state.activeConvId = null;
        this.showSnackbar('Started fresh conversation');
      } else if (lower === '/compact') {
        this._runCompact();
      } else if (lower === '/help') {
        this._sendMockChatMessage('/help', `### Goar Vibe Slash Commands (v2.1.0)\n- \`/skill <name>\` — Attach any of the 16 bundled \`SKILL.md\` playbooks (incl. NVIDIA NIM, CUDA & NeMo)\n- \`/subagent <task>\` — Spawn an isolated background worker\n- \`/plan <goal>\` — Step-by-step architecture plan before tool calls\n- \`/mode <ask|smart|auto>\` — Switch autonomy guardrail\n- \`/build <idea>\` — Generate a self-healing live web app or Three.js 3D game in Build Studio\n- \`/drop <product | $price>\` — Launch an autonomous Stripe/Gumroad/Vercel commerce drop\n- \`/compact\` — Reclaim context window budget`);
      } else if (lower.startsWith('/build ')) {
        const idea = cmd.slice(7).trim();
        this.state.screen = 'build';
        this._createBuilderProject(idea.slice(0, 24), generateCustomMiniApp(idea));
        this.showSnackbar(`Switched to Build Studio · Created '${idea.slice(0, 20)}'`);
      } else {
        this._sendMockChatMessage(cmd);
      }
    }

    _runCompact() {
      const conv = this.getCurrentConv();
      if (conv) {
        conv.tokens = Math.max(1200, Math.round(conv.tokens * 0.35));
        this.showSnackbar(`Context compacted → ${formatTokens(conv.tokens)} tokens`);
      } else {
        this.showSnackbar('Open a conversation to compact context');
      }
    }

    _sendMockChatMessage(userText, overrideReply) {
      let conv = this.getCurrentConv();
      if (!conv) {
        conv = {
          id: 'conv_' + Date.now(),
          title: userText.slice(0, 34),
          model: this.state.selectedModel,
          tokens: 1840,
          messages: []
        };
        this.state.conversations.unshift(conv);
        this.state.activeConvId = conv.id;
      }

      const attachments = this.state.attachments.slice();
      this.state.draft = '';
      this.state.attachments = [];
      this.state.composerExpanded = false;
      this.closePopovers();

      conv.messages.push({ role: 'user', text: userText, attachments });
      const model = this.getSelectedModelObj();

      const fullReply = overrideReply || `Here is a live simulated response from **${model.label}** inside the 1-to-1 Goar Studio web preview.

- **Active Autonomy Mode**: \`${this.state.vibeMode.toUpperCase()}\`
- **Enabled Tools**: ${Object.entries(this.state.tools).filter(([k, v]) => v && k !== 'thinkingLevel').map(([k]) => `\`${k}\``).join(', ') || 'none'}
- **Storage**: Local Android Room + EncryptedSharedPreferences (mocked in browser)

Try typing \`/\` for Vibe commands, \`@\` to consult \`@architect\` or \`@aegis\`, holding the round voice button for the **Live Voice Orb**, or switching to **Imagine** and **Build** in the top bar!`;

      const aiMsg = {
        role: 'assistant',
        model: model.label,
        thoughtTime: '1.4s',
        thought: `Evaluating request in ${this.state.vibeMode.toUpperCase()} autonomy mode using ${model.label}. Verifying enabled local tools and formatting response cleanly.`,
        tools: this.state.tools.webSearch ? [{ name: 'local_context', detail: 'workspace + SOUL.md' }] : [],
        markdown: '',
        streaming: true
      };
      conv.messages.push(aiMsg);
      conv.tokens += 920;
      this.state.isStreaming = true;
      this.render();

      let pos = 0;
      clearInterval(this.state.streamTimer);
      this.state.streamTimer = setInterval(() => {
        pos += 14;
        if (pos >= fullReply.length) {
          aiMsg.markdown = fullReply;
          aiMsg.streaming = false;
          this.state.isStreaming = false;
          clearInterval(this.state.streamTimer);
          this.render();
        } else {
          aiMsg.markdown = fullReply.slice(0, pos);
          const scroll = this.mountEl.querySelector('[data-el="g-msg-scroll"]');
          const lastMd = scroll && scroll.querySelector('.g-msg-row-assistant:last-child .g-assistant-md');
          if (lastMd) {
            lastMd.innerHTML = renderMarkdown(aiMsg.markdown) + '<span class="g-typing-dot"></span>';
            scroll.scrollTop = scroll.scrollHeight;
          }
        }
      }, 28);
    }

    _createMockImagineAsset(prompt, mode) {
      const seed = Math.floor(Math.random() * 9999);
      const gradients = [
        'linear-gradient(135deg,#1d4ed8,#0e7490)',
        'linear-gradient(135deg,#9d174d,#d9480f)',
        'linear-gradient(135deg,#15803d,#0b7285)',
        'linear-gradient(135deg,#5f3dc4,#c2255c)'
      ];
      const asset = {
        id: 'ast_' + Date.now(),
        title: prompt.slice(0, 34),
        mode,
        seed,
        gradient: gradients[this.state.imagineAssets.length % gradients.length]
      };
      this.state.imagineAssets.unshift(asset);
      this.state.imagineActiveAssetId = asset.id;
    }

    _createBuilderProject(title, html, slug) {
      const s = slug || ('app-' + Date.now().toString().slice(-4));
      const existing = this.state.builderProjects.find(p => p.slug === s);
      if (existing) {
        existing.html = html;
      } else {
        this.state.builderProjects.unshift({ slug: s, title, html, updated: 'Just now' });
      }
      this.state.builderActiveSlug = s;
      this.state.builderPane = 'preview';
      this.render();
    }

    _runTerminalCommand(raw) {
      const cmd = raw.trim();
      this.state.termInput = '';
      if (!cmd) return;
      this.state.termLines.push(`root@goar:~$ ${cmd}`);
      if (cmd === 'clear') {
        this.state.termLines = [];
      } else if (cmd === 'help') {
        this.state.termLines.push('Available simulated commands: ls, uname -a, neofetch, whoami, ps, git status, date, clear');
      } else if (cmd === 'ls') {
        this.state.termLines.push('SOUL.md   edge-proxy.ts   cohort_retention.py   projects/   skills/');
      } else if (cmd === 'uname -a') {
        this.state.termLines.push('Linux goar-ubuntu 6.6.30-android15-proot #1 SMP PREEMPT aarch64 GNU/Linux');
      } else if (cmd === 'whoami') {
        this.state.termLines.push('root (PRoot user-space sandbox · zero root required)');
      } else if (cmd === 'git status') {
        this.state.termLines.push('On branch main\nnothing to commit, working tree clean');
      } else if (cmd === 'ps') {
        this.state.termLines.push('  PID TTY      CMD\n    1 pts/0    /bin/bash\n   42 pts/0    llama-server --ctx 32768\n   89 pts/0    node local-dev-server.js');
      } else if (cmd === 'date') {
        this.state.termLines.push(new Date().toUTCString());
      } else if (cmd === 'neofetch') {
        this.state.termLines.push('   .-""""-.    root@goar-ubuntu');
        this.state.termLines.push('  /  GOAR  \\   ----------------');
        this.state.termLines.push(' |  STUDIO  |  OS: Ubuntu 24.04 LTS (PRoot)');
        this.state.termLines.push('  \\  v2.1  /   Kernel: Android JNI Sandbox');
        this.state.termLines.push('   `-____-`    LLM: llama.cpp + whisper.cpp');
      } else {
        this.state.termLines.push(`bash: ${cmd}: simulated sandbox (type "help")`);
      }
      this.render();
      if (!this._videoRunning) {
        const inp = this.mountEl.querySelector('[data-el="g-term-input"]');
        if (inp) inp.focus();
      }
    }

    _cycleVoiceDemo() {
      const next = {
        idle: { p: 'listening', cap: '“Hey Goar, inspect our API latency trace and summarize the bottleneck.”' },
        listening: { p: 'thinking', cap: '“Hey Goar, inspect our API latency trace and summarize the bottleneck.”' },
        thinking: { p: 'speaking', cap: 'Your p99 latency spiked to 180ms due to unpooled TLS handshakes. Enabling HTTP keep-alive brings it down to 39ms.' },
        speaking: { p: 'idle', cap: 'Speak naturally. The orb stays still in silence and responds as you and Goar talk.' }
      }[this.state.voicePhase];
      this.state.voicePhase = next.p;
      this.state.voiceCaption = next.cap;
      this.render();
    }

    /* ── Canvas Animations (Live Voice Fluid Blob + Imagine Generative Canvas) ── */
    _stopAnimations() {
      if (this._rafId) cancelAnimationFrame(this._rafId);
      if (this._voiceRafId) cancelAnimationFrame(this._voiceRafId);
      this._rafId = null;
      this._voiceRafId = null;
    }

    _startAnimations() {
      if (!this._visible) return;
      const voiceCanvas = this.mountEl.querySelector('[data-el="g-voice-blob"]');
      if (voiceCanvas) this._animateVoiceBlob(voiceCanvas);

      const imgCanvas = this.mountEl.querySelector('[data-el="g-imagine-canvas"]');
      if (imgCanvas) this._animateImagineCanvas(imgCanvas);
    }

    /* Exact port of GoarVoiceFluidBlob + buildOrganicBlobPath from GoarVoiceChatOverlay.kt */
    _animateVoiceBlob(canvas) {
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2, baseR = Math.min(W, H) * 0.31;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const phaseMode = this.state.voicePhase;
      let phase = 0;

      const palette = phaseMode === 'speaking'
        ? (isDark ? ['#7CB7FF', '#38D0E8'] : ['#1D4ED8', '#0E7490'])
        : phaseMode === 'listening'
          ? (isDark ? ['#4ADE80', '#2DD4BF'] : ['#15803D', '#0B7285'])
          : phaseMode === 'thinking'
            ? (isDark ? ['#B197FC', '#63B3FF'] : ['#5F3DC4', '#1864AB'])
            : (isDark ? ['#E5E7EB', '#9CA3AF'] : ['#1C2028', '#3A4150']);

      const traceBlob = (r, amp, ph, hA, hB) => {
        ctx.beginPath();
        const segs = 96;
        for (let i = 0; i <= segs; i++) {
          const th = (i / segs) * Math.PI * 2;
          let dist = 1;
          if (amp > 0.001) {
            const w1 = Math.sin(hA * th + ph) * 0.54;
            const w2 = Math.sin(hB * th - ph * 1.35) * 0.31;
            const w3 = Math.cos(2 * th + ph * 0.75) * 0.15;
            dist = 1 + amp * (w1 + w2 + w3);
          }
          const x = cx + Math.cos(th) * r * dist;
          const y = cy + Math.sin(th) * r * dist;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
      };

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        const active = phaseMode === 'speaking' || phaseMode === 'listening';
        const energy = active ? (0.48 + 0.32 * Math.sin(phase * 1.4)) : 0;

        if (energy > 0.02 || phaseMode === 'thinking') {
          const hr = baseR * (energy > 0.02 ? 1.38 + energy * 0.34 : 1.24);
          const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, hr);
          hg.addColorStop(0, palette[0] + '44');
          hg.addColorStop(0.55, palette[1] + '1c');
          hg.addColorStop(1, 'transparent');
          ctx.fillStyle = hg;
          ctx.beginPath(); ctx.arc(cx, cy, hr, 0, Math.PI * 2); ctx.fill();
        }

        if (energy > 0.015) {
          traceBlob(baseR * (1.03 + energy * 0.14), energy * 0.14, phase * 0.85 + 1.2, 3, 5);
          ctx.fillStyle = palette[1] + '38';
          ctx.fill();

          traceBlob(baseR * (1.01 + energy * 0.09), energy * 0.105, -phase * 1.05 + 2.4, 4, 2);
          ctx.fillStyle = palette[0] + '55';
          ctx.fill();
        }

        traceBlob(baseR * (1 + energy * 0.06), energy * 0.075, phase, 3, 5);
        const hAng = (phaseMode === 'thinking' || energy > 0.02) ? phase * 0.7 : -0.8;
        const hx = cx + Math.cos(hAng) * baseR * 0.34;
        const hy = cy + Math.sin(hAng) * baseR * 0.34;
        const cg = ctx.createRadialGradient(hx, hy, 4, cx, cy, baseR * 1.45);
        cg.addColorStop(0, isDark ? 'rgba(255,255,255,0.95)' : palette[0]);
        cg.addColorStop(0.45, palette[0]);
        cg.addColorStop(1, palette[1]);
        ctx.fillStyle = cg;
        ctx.fill();
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (active || phaseMode === 'thinking') {
          phase += active ? 0.055 : 0.022;
          this._voiceRafId = requestAnimationFrame(draw);
        }
      };
      draw();
    }

    _animateImagineCanvas(canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth * 2 || 680;
      canvas.height = canvas.offsetHeight * 2 || 440;
      const W = canvas.width, H = canvas.height;
      const seed = Number(canvas.dataset.seed) || 42;
      const kind = canvas.dataset.kind;
      let t = seed * 0.01;

      const draw = () => {
        ctx.fillStyle = '#0B0C0F';
        ctx.fillRect(0, 0, W, H);
        if (kind === 'audio') {
          const bars = 36, bw = (W - 80) / bars;
          for (let i = 0; i < bars; i++) {
            const v = 0.15 + 0.7 * Math.abs(Math.sin(t * 2 + i * 0.38));
            const bh = v * (H * 0.62);
            ctx.fillStyle = i % 2 ? '#FF5E9C' : '#5B9BFF';
            ctx.beginPath();
            ctx.roundRect(40 + i * bw, (H - bh) / 2, bw - 5, bh, 6);
            ctx.fill();
          }
        } else {
          // Architectural / Volumetric generative render
          for (let i = 0; i < 4; i++) {
            const ox = W * (0.25 + 0.5 * Math.sin(t * 0.5 + i * 1.7));
            const oy = H * (0.3 + 0.4 * Math.cos(t * 0.4 + i * 2.1));
            const rad = W * (0.28 + 0.1 * Math.sin(t + i));
            const cols = ['rgba(212,155,85,0.34)', 'rgba(91,164,181,0.30)', 'rgba(255,94,156,0.22)', 'rgba(232,226,214,0.18)'];
            const g = ctx.createRadialGradient(ox, oy, 10, ox, oy, rad);
            g.addColorStop(0, cols[i]);
            g.addColorStop(1, 'transparent');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
          }
          // Monolith geometry
          ctx.strokeStyle = 'rgba(232,226,214,0.26)';
          ctx.lineWidth = 2;
          ctx.strokeRect(W * 0.36, H * 0.18, W * 0.28, H * 0.64);
          ctx.fillStyle = 'rgba(232,226,214,0.65)';
          ctx.font = '600 18px JetBrains Mono, monospace';
          ctx.fillText(kind === 'video' ? '▶ 1080p · 24fps · PREVIEW' : '◆ FLUX · RENDERED', 24, H - 24);
        }
        t += 0.025;
        this._rafId = requestAnimationFrame(draw);
      };
      draw();
    }
  }

  GoarAppSimulator.SCENARIO_CLIPS = SCENARIO_CLIPS;
  window.GoarAppSimulator = GoarAppSimulator;
})();

