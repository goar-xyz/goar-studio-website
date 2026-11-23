/* ============================================================================
 * GOAR STUDIO MOCK DATA & AUTHENTIC CATALOGS
 * Mirrors GoarBotManager.kt, SettingsScreen.kt, GoarMatteIconColors.kt,
 * ChatSlashCommandPalette.kt, PlaygroundParameters.kt, WebAppBuilderTemplates.kt,
 * skills_catalog.json, and app/src/main/res/raw/*.txt verbatim.
 * ============================================================================ */

window.GOAR_DATA = (function () {
  const LEGAL_DOCS = {
    privacy_policy: {
      title: 'Privacy Policy',
      updated: 'November 2026',
      raw: `Goar Studio Privacy Policy

Goar Studio stores conversations, workspace files, task schedules, and provider API keys locally on your device using Android Room and EncryptedSharedPreferences.

Network Requests:
Network traffic is sent only to the model providers, search backends, MCP servers, or endpoints that you explicitly configure and invoke.

Telemetry:
Diagnostic logging remains local unless you explicitly export a diagnostic bundle.`
    },
    terms_of_service: {
      title: 'Terms of Service',
      updated: 'November 2026',
      raw: `Goar Studio Terms of Service

Goar Studio is provided as-is as a local-first multi-model AI studio, web builder, browser, and workspace environment.

You are responsible for all API keys, credentials, external integrations, automated tasks, and content generated through third-party endpoints configured in the application.`
    },
    privacy_act: {
      title: 'Data Protection & Local Privacy',
      updated: 'November 2026',
      raw: `Goar Studio — Data Protection & Local Privacy Overview

1. Local-First Storage Architecture
Goar Studio stores your conversations, system prompts, agent memories, tasks, notes, calendar events, and browser data locally on your device using Android Room (SQLite) and Jetpack DataStore.

2. Credential Protection
Provider API keys, gateway credentials, and SSH secrets are encrypted on device using Android Keystore-backed EncryptedSharedPreferences.

3. Network Connections
Outbound requests are sent directly from your device only to the AI model providers, MCP servers, web search engines, SSH hosts, or API endpoints that you configure and enable. Goar Studio does not bundle third-party advertising SDKs or hidden analytics trackers in this build.

4. Your Data Controls
From Settings → Data Control, you can export encrypted-optional backups (ZIP), import conversation archives, configure automatic local backups, or delete stored histories and keys at any time.`
    },
    license: {
      title: 'Software License',
      updated: 'November 2026',
      raw: `Goar Studio License

MIT / Apache 2.0 compatible open-source components are used across Jetpack Compose, OkHttp, Room, Media3, Coil, Sora Editor, and Apache Commons Compress.`
    }
  };

  const MODELS = [
    { id: 'Anthropic:claude-sonnet-4-5', provider: 'Anthropic', icon: 'provider_anthropic', label: 'Claude Sonnet 4.5', context: 200000 },
    { id: 'Anthropic:claude-opus-4-1', provider: 'Anthropic', icon: 'provider_anthropic', label: 'Claude Opus 4.1', context: 200000 },
    { id: 'Google:gemini-2.5-pro', provider: 'Google', icon: 'provider_gemini', label: 'Gemini 2.5 Pro', context: 1000000 },
    { id: 'Google:gemini-2.5-flash', provider: 'Google', icon: 'provider_gemini', label: 'Gemini 2.5 Flash', context: 1000000 },
    { id: 'OpenAI:gpt-5', provider: 'OpenAI', icon: 'provider_openai', label: 'GPT-5', context: 128000 },
    { id: 'OpenAI:o3-mini', provider: 'OpenAI', icon: 'provider_openai', label: 'o3-mini', context: 200000 },
    { id: 'DeepSeek:deepseek-r1', provider: 'DeepSeek', icon: 'provider_deepseek', label: 'DeepSeek R1', context: 128000 },
    { id: 'xAI:grok-3', provider: 'xAI', icon: 'provider_xai', label: 'Grok 3', context: 131072 },
    { id: 'Mistral:mistral-large-latest', provider: 'Mistral AI', icon: 'provider_mistral', label: 'Mistral Large', context: 128000 },
    { id: 'Local:llama-3.3-8b-q4', provider: 'Local (GGUF)', icon: 'ic_goar_mark_mono', label: 'Llama 3.3 8B (On-Device)', context: 32768 }
  ];

  const BOTS = [
    {
      id: 'bot_goar_prime',
      name: 'Goar',
      handle: 'goar',
      title: 'Lead Autonomous Operator',
      description: 'Primary multi-domain operator for orchestration, system execution, and end-to-end task delivery.',
      group: 'Core',
      icon: 'ic_goar_sparkle',
      colorVar: '--m-drw-newchat',
      skills: ['execution-substrate.md', 'subagents-and-memory.md'],
      soul: 'Doctrine: ASSESS -> PLAN -> VALIDATE -> EXECUTE -> REVIEW -> VERIFY -> DELIVER. Direct, high-signal, zero filler.'
    },
    {
      id: 'bot_architect',
      name: 'Architect',
      handle: 'architect',
      title: 'Full-Stack & Web App Builder',
      description: 'Builds, compiles, and verifies production web apps, 2D/3D games, APIs, and software architectures.',
      group: 'Engineering',
      icon: 'ic_nav_build',
      colorVar: '--m-top-build',
      skills: ['fullstack-web-app-builder.md', 'webgl-3d-game-engine-architect.md', 'api-and-mcp-integration.md'],
      soul: 'Principal Systems & Full-Stack Software Architect. Zero-placeholder codebases verified on local dev server.'
    },
    {
      id: 'bot_aegis',
      name: 'Aegis',
      handle: 'aegis',
      title: 'Systems, Linux & SecOps',
      description: 'Autonomous Linux distro operator, SSH fleet administrator, VPS health monitor, and OWASP security auditor.',
      group: 'Engineering',
      icon: 'ic_nav_ssh',
      colorVar: '--m-drw-terminal',
      skills: ['devops-linux-workbench.md', 'security-owasp-pentest.md', 'api-and-mcp-integration.md'],
      soul: 'Principal Infrastructure, Linux Sandbox & Security Engineer. Inspects exit codes, open ports, and live logs.'
    },
    {
      id: 'bot_quant',
      name: 'Quant',
      handle: 'quant',
      title: 'Finance, Quant & Commerce',
      description: 'Financial modeling, data science, Stripe/PayPal/Shopify operations, and automated executive reporting.',
      group: 'Operations',
      icon: 'ic_nav_tasks',
      colorVar: '--m-drw-tasks',
      skills: ['quant-finance-and-commerce.md', 'document-office-studio.md'],
      soul: 'Quantitative Analyst & Commercial Operations Lead. Rigorous Python modeling and board-ready CSV/PDF reports.'
    },
    {
      id: 'bot_atlas',
      name: 'Atlas',
      handle: 'atlas',
      title: 'Deep Research & OSINT',
      description: 'Multi-source web intelligence, primary source verification, autonomous browser automation, and briefings.',
      group: 'Intelligence & Media',
      icon: 'ic_nav_browser',
      colorVar: '--m-drw-browser',
      skills: ['deep-research-osint.md', 'autonomous-browser-operator.md', 'document-office-studio.md'],
      soul: 'Principal Research & Intelligence Analyst. Cross-verifies primary sources with exact URLs and citations.'
    },
    {
      id: 'bot_muse',
      name: 'Muse',
      handle: 'muse',
      title: 'Creative & Document Studio',
      description: 'High-craft visual generation, video synthesis, procedural WebGL art, and formatted PDF/DOCX deliverables.',
      group: 'Intelligence & Media',
      icon: 'ic_nav_files',
      colorVar: '--m-drw-docs',
      skills: ['creative-media-studio.md', 'document-office-studio.md', 'webgl-3d-game-engine-architect.md'],
      soul: 'Creative Director & Executive Publication Designer. Publication-grade DOCX, PDF, and visual synthesis.'
    }
  ];

  const SLASH_COMMANDS = [
    { command: '/skill', args: '<name> [prompt]', desc: 'Attach an installed skill playbook to this turn', icon: 'ic_goar_sparkle', light: '#0E7490', dark: '#38D0E8', template: '/skill ' },
    { command: '/new-skill', args: '<name> | <rules>', desc: 'Create & save a new portable SKILL.md playbook', icon: 'add', light: '#15803D', dark: '#4ADE80', template: '/new-skill ' },
    { command: '/subagent', args: '[role:] <task>', desc: 'Deploy an isolated background subagent for a task', icon: 'account_tree', light: '#D9480F', dark: '#FF854D', template: '/subagent ' },
    { command: '/plan', args: '<goal>', desc: 'Plan step-by-step before making changes', icon: 'map', light: '#5F3DC4', dark: '#A388FF', template: '/plan ' },
    { command: '/mode', args: '<ask|smart|auto>', desc: 'Switch execution mode', icon: 'tune', light: '#C2255C', dark: '#FF6B9D', template: '/mode ' },
    { command: '/build', args: '<app idea>', desc: 'Build a self-healing web app or 3D game', icon: 'apps', light: '#C99700', dark: '#FFD43B', template: '/build ' },
    { command: '/drop', args: '<product | $price>', desc: 'Autonomous Drop: Store + Stripe + 1:1/9:16 Ads + 7-Day Socials', icon: 'ic_goar_sparkle', light: '#E65100', dark: '#FF9800', template: '/drop ' },
    { command: '/compact', args: '', desc: 'Summarize context to free token space', icon: 'compress', light: '#1864AB', dark: '#5AA8FF', instant: true, template: '/compact' },
    { command: '/clear', args: '', desc: 'Start a new conversation', icon: 'clean', light: '#B02A37', dark: '#E84A5F', instant: true, template: '/clear' },
    { command: '/help', args: '', desc: 'Show all commands', icon: 'help', light: '#862E9C', dark: '#DA77F2', instant: true, template: '/help' }
  ];

  const SKILLS = [
    { file: 'execution-substrate.md', cat: 'Core Architecture', desc: 'Deterministic engineering substrate & verification loop' },
    { file: 'subagents-and-memory.md', cat: 'Core Architecture', desc: 'Background subagents, @bot delegation & persistent memory' },
    { file: 'skill-creator.md', cat: 'Core Architecture', desc: 'Progressive-disclosure SKILL.md authoring (/skill-creator)' },
    { file: 'nvidia-nim-blueprint-architect.md', cat: 'NVIDIA AI Engineering', desc: 'NVIDIA NIM microservices & FLUX / NV-EmbedQA blueprints' },
    { file: 'nvidia-cuda-tensorrt-llm.md', cat: 'NVIDIA AI Engineering', desc: 'CUDA/Triton GPU kernels & TensorRT-LLM FP8/AWQ tuning' },
    { file: 'nvidia-nemo-guardrails-rag.md', cat: 'NVIDIA AI Engineering', desc: 'NeMo Guardrails Colang 2.0 & hybrid RAG safety rails' },
    { file: 'fullstack-web-app-builder.md', cat: 'Web & Game Studio', desc: 'Zero-build self-healing web apps & Google Drive sync' },
    { file: 'webgl-3d-game-engine-architect.md', cat: 'Web & Game Studio', desc: 'Three.js 3D WebGL, Phaser 3 2D & Playgama Bridge SDK' },
    { file: 'devops-linux-workbench.md', cat: 'Systems & Security', desc: 'PRoot Linux sandbox, atomic JNI transfers & SSH fleets' },
    { file: 'security-owasp-pentest.md', cat: 'Systems & Security', desc: 'Unified network recon, LAN scan, TLS & Shadow Trap' },
    { file: 'api-and-mcp-integration.md', cat: 'Systems & Security', desc: 'OAuth 2.1 PKCE MCP servers, OpenAPI & Postman SDK' },
    { file: 'deep-research-osint.md', cat: 'Intelligence & Browser', desc: 'Multi-source primary web verification & briefings' },
    { file: 'autonomous-browser-operator.md', cat: 'Intelligence & Browser', desc: 'SmartCookie WebView DOM automation & Manus Glass PiP' },
    { file: 'quant-finance-and-commerce.md', cat: 'Finance & Commerce', desc: 'Python quant modeling, Stripe/PayPal/Shopify & /drop ops' },
    { file: 'document-office-studio.md', cat: 'Creative & Office', desc: 'Publication-grade Word DOCX redlines, PDF & CSV' },
    { file: 'creative-media-studio.md', cat: 'Creative & Office', desc: 'On-device & BYOK Veo video, FLUX imagery & Eleven v3 audio' }
  ];

  const PALETTE_STYLES = [
    { key: 'MONOCHROME', title: 'Pure Monochrome', subtitle: 'Crisp obsidian & alabaster', swatchDark: '#F4F4F6', swatchLight: '#0B0B0E' },
    { key: 'CHAMPAGNE', title: 'Warm Terracotta', subtitle: 'Editorial warm accent', swatchDark: '#E59A69', swatchLight: '#C26D3A' },
    { key: 'COBALT', title: 'Precision Cobalt', subtitle: 'Crisp sapphire accent', swatchDark: '#60A5FA', swatchLight: '#2563EB' },
    { key: 'TINTED', title: 'Tinted Categories', subtitle: 'Semantic category tints', swatchDark: '#34D399', swatchLight: '#059669' }
  ];

  const PLAYGROUND_MODELS = {
    video: [
      { id: 'OnDevice:goar-motion', name: 'Goar On-Device Motion', provider: 'On-Device Engine', badge: 'Local' },
      { id: 'Pollinations:veo', name: 'Veo 3.1 Fast', provider: 'Google / BYOK', badge: 'Veo' },
      { id: 'Pollinations:kling', name: 'Kling 1.6 Pro', provider: 'Kuaishou', badge: 'Pro' },
      { id: 'Pollinations:luma', name: 'Luma Ray 2', provider: 'Luma AI', badge: 'Ray 2' },
      { id: 'Pollinations:seedance-pro', name: 'Seedance Pro', provider: 'ByteDance', badge: 'Pro' }
    ],
    image: [
      { id: 'OnDevice:goar-canvas', name: 'Goar On-Device Creative', provider: 'On-Device Engine', badge: 'Local' },
      { id: 'Pollinations:flux', name: 'FLUX.1 Schnell', provider: 'Pollinations / NIM', badge: 'Fast' },
      { id: 'Pollinations:kontext', name: 'FLUX Kontext (Edit)', provider: 'Edit Model', badge: 'Edit' },
      { id: 'OpenAI:gpt-image-1', name: 'GPT Image 1', provider: 'OpenAI', badge: 'BYOK' },
      { id: 'Google:imagen-3.0-generate-002', name: 'Imagen 3', provider: 'Google', badge: 'BYOK' },
      { id: 'NVIDIA:flux-dev-nim', name: 'NVIDIA NIM FLUX.1-dev', provider: 'NVIDIA NIM', badge: 'NIM' }
    ],
    audio: [
      { id: 'OnDevice:goar-tts', name: 'Goar On-Device Speech', provider: 'Local Neural TTS', badge: 'Local' },
      { id: 'OpenAI:gpt-4o-mini-tts', name: 'GPT-4o Mini TTS', provider: 'OpenAI', badge: 'BYOK' },
      { id: 'ElevenLabs:eleven_v3', name: 'Eleven v3', provider: 'ElevenLabs', badge: 'v3' },
      { id: 'ElevenLabs:sound-generation', name: 'ElevenLabs Sound Effects', provider: 'ElevenLabs', badge: 'SFX' }
    ]
  };

  /* ── Real Runnable Built-in Web App Builder Templates (mirroring WebAppBuilderTemplates.kt) ── */
  const BUILDER_TEMPLATES = [
    {
      slug: 'fourier-drawing',
      title: 'Fourier drawing',
      subtitle: 'Epicycle curve generator',
      icon: 'add',
      chipVar: '--m-chip-0',
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#000;color:#E8E2D6;font-family:system-ui,sans-serif;overflow:hidden;height:100vh;display:flex;align-items:center;justify-content:center}
.badge{position:fixed;top:10px;left:10px;background:rgba(24,24,27,.85);border:1px solid #27272a;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600}
.ctrls{position:fixed;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:8px;background:rgba(24,24,27,.85);border:1px solid #27272a;padding:5px 10px;border-radius:999px}
button{background:#E8E2D6;color:#000;border:none;border-radius:999px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer}
canvas{width:100%;height:100%;display:block}
</style></head><body>
<div class="badge">Fourier Epicycles</div>
<canvas id="c"></canvas>
<div class="ctrls"><button id="s">Change Curve</button><button id="v">Speed 1x</button></div>
<script>
const c=document.getElementById('c'),x=c.getContext('2d');
let w=0,h=0,t=0,path=[],mode=0,spd=1;
function rz(){const nw=innerWidth||340,nh=innerHeight||248;if(nw!==w||nh!==h){w=c.width=nw;h=c.height=nh;path=[];}}
addEventListener('resize',rz);rz();
function pts(m){const a=[],N=96;for(let i=0;i<N;i++){const th=i/N*Math.PI*2;let px,py;
if(m===0){const r=62*(1+.38*Math.sin(3*th));px=r*Math.cos(th);py=r*Math.sin(th);}
else if(m===1){px=55*Math.pow(Math.sin(th),3);py=-46*(13*Math.cos(th)-5*Math.cos(2*th)-2*Math.cos(3*th)-Math.cos(4*th))/16;}
else{px=68*Math.pow(Math.cos(th),3);py=68*Math.pow(Math.sin(th),3);}
a.push({x:px,y:py});}return a;}
function dft(p){const X=[],N=p.length;for(let k=0;k<N;k++){let re=0,im=0;for(let n=0;n<N;n++){const ph=2*Math.PI*k*n/N;re+=p[n].x*Math.cos(ph)+p[n].y*Math.sin(ph);im+=-p[n].x*Math.sin(ph)+p[n].y*Math.cos(ph);}re/=N;im/=N;X.push({freq:k,amp:Math.hypot(re,im),phase:Math.atan2(im,re)});}return X.sort((a,b)=>b.amp-a.amp);}
let F=dft(pts(0));
document.getElementById('s').onclick=()=>{mode=(mode+1)%3;F=dft(pts(mode));path=[];t=0;};
document.getElementById('v').onclick=(e)=>{spd=spd===1?2:1;e.target.textContent='Speed '+spd+'x';};
function step(){
  if(w<10||h<10)rz();
  let cx=w/2,cy=h/2;
  for(let i=0;i<Math.min(18,F.length);i++){const f=F[i];cx+=f.amp*Math.cos(f.freq*t+f.phase);cy+=f.amp*Math.sin(f.freq*t+f.phase);}
  path.unshift({x:cx,y:cy});if(path.length>220)path.pop();
  t+=0.03*spd;if(t>Math.PI*2){t=0;path=[];}
}
for(let k=0;k<55;k++)step();
(function loop(){
  rz();
  x.fillStyle='#000';x.fillRect(0,0,w,h);
  let cx=w/2,cy=h/2;
  for(let i=0;i<Math.min(18,F.length);i++){
    const f=F[i],px=cx,py=cy;
    cx+=f.amp*Math.cos(f.freq*t+f.phase);cy+=f.amp*Math.sin(f.freq*t+f.phase);
    x.strokeStyle='rgba(232,226,214,0.2)';x.lineWidth=1;x.beginPath();x.arc(px,py,f.amp,0,Math.PI*2);x.stroke();
    x.strokeStyle='rgba(91,155,255,0.65)';x.beginPath();x.moveTo(px,py);x.lineTo(cx,cy);x.stroke();
  }
  path.unshift({x:cx,y:cy});if(path.length>220)path.pop();
  x.strokeStyle='#FF7A45';x.lineWidth=2.5;x.beginPath();
  path.forEach((p,i)=>i?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y));x.stroke();
  t+=0.025*spd;if(t>Math.PI*2){t=0;path=[];}
  requestAnimationFrame(loop);
})();
</script></body></html>`
    },
    {
      slug: 'gravity-sim',
      title: 'Gravity sim',
      subtitle: 'N-body orbital mechanics',
      icon: 'science',
      chipVar: '--m-chip-1',
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#05070b;color:#E8E2D6;font-family:system-ui,sans-serif;overflow:hidden;height:100vh}
.hud{position:fixed;top:10px;left:10px;font-size:11px;background:rgba(20,20,24,.8);border:1px solid #27272a;padding:4px 10px;border-radius:999px}
canvas{width:100%;height:100%;display:block;cursor:crosshair}
</style></head><body>
<div class="hud">Tap anywhere to spawn planet</div>
<canvas id="c"></canvas>
<script>
const c=document.getElementById('c'),x=c.getContext('2d');
let w=0,h=0;
function rz(){const nw=innerWidth||340,nh=innerHeight||248;if(nw!==w||nh!==h){w=c.width=nw;h=c.height=nh;}}
rz();
const cols=['#38D0E8','#FF7A45','#4ADE80','#DA77F2','#FFD43B'];
const bodies=[
  {x:w/2,y:h/2,vx:0,vy:0,m:420,r:12,col:'#FFD43B',star:true},
  {x:w/2+68,y:h/2,vx:0,vy:2.45,m:8,r:4.5,col:'#38D0E8'},
  {x:w/2-96,y:h/2,vx:0,vy:-2.05,m:12,r:5.5,col:'#FF7A45'},
  {x:w/2,y:h/2-52,vx:2.8,vy:0,m:6,r:3.8,col:'#4ADE80'}
];
c.addEventListener('click',e=>{
  const r=c.getBoundingClientRect(),px=e.clientX-r.left,py=e.clientY-r.top;
  const dx=px-w/2,dy=py-h/2,d=Math.max(28,Math.hypot(dx,dy)),v=Math.sqrt(420/d)*1.02;
  bodies.push({x:px,y:py,vx:-dy/d*v,vy:dx/d*v,m:7,r:4,col:cols[bodies.length%cols.length]});
});
(function loop(){
  rz();
  bodies[0].x=w/2;bodies[0].y=h/2;
  x.fillStyle='rgba(5,7,11,0.16)';x.fillRect(0,0,w,h);
  for(let i=0;i<bodies.length;i++){
    const a=bodies[i];
    if(!a.star){
      for(let j=0;j<bodies.length;j++){if(i===j)continue;const b=bodies[j];const dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy+48,f=b.m/d2;const d=Math.sqrt(d2);a.vx+=f*dx/d;a.vy+=f*dy/d;}
      a.x+=a.vx;a.y+=a.vy;
    }
    x.beginPath();x.fillStyle=a.col;x.arc(a.x,a.y,a.r,0,Math.PI*2);x.fill();
  }
  requestAnimationFrame(loop);
})();
</script></body></html>`
    },
    {
      slug: 'matrix-rain',
      title: 'Matrix rain',
      subtitle: 'Digital terminal stream',
      icon: 'ic_nav_terminal',
      chipVar: '--m-chip-2',
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0}body{background:#000;overflow:hidden;height:100vh}canvas{display:block;width:100%;height:100%}
</style></head><body><canvas id="c"></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');
let w=c.width=innerWidth||340,h=c.height=innerHeight||248;
const fs=13,cols=Math.max(16,Math.floor(w/fs));
const drops=Array.from({length:cols},()=>Math.floor(Math.random()*14)+1),chars='01GOARSTUDIOアイウエオカキクケコ';
function tick(){
  if(innerWidth>10&&(innerWidth!==w||innerHeight!==h)){w=c.width=innerWidth;h=c.height=innerHeight;}
  x.fillStyle='rgba(0,0,0,0.09)';x.fillRect(0,0,w,h);
  x.fillStyle='#4ADE80';x.font=fs+'px monospace';
  for(let i=0;i<drops.length;i++){
    const ch=chars[Math.floor(Math.random()*chars.length)];
    x.fillText(ch,i*fs,drops[i]*fs);
    if(drops[i]*fs>h&&Math.random()>0.95)drops[i]=0;
    drops[i]++;
  }
}
for(let k=0;k<12;k++)tick();
setInterval(tick,48);
</script></body></html>`
    },
    {
      slug: 'audio-visualizer',
      title: 'Audio visualizer',
      subtitle: 'Web Audio reactive spectrum',
      icon: 'graphic_eq',
      chipVar: '--m-chip-3',
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0}body{background:#06070a;color:#E8E2D6;font-family:system-ui,sans-serif;overflow:hidden;height:100vh}
.b{position:fixed;top:10px;left:10px;background:rgba(20,20,24,.82);border:1px solid #2a2a2f;border-radius:999px;padding:4px 10px;font-size:11px}
canvas{width:100%;height:100%;display:block}
</style></head><body><div class="b">Reactive Spectrum · 32-Band</div><canvas id="c"></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');
let w=c.width=innerWidth||340,h=c.height=innerHeight||248,t=0;
(function loop(){
  if(innerWidth>10&&(innerWidth!==w||innerHeight!==h)){w=c.width=innerWidth;h=c.height=innerHeight;}
  x.fillStyle='#06070a';x.fillRect(0,0,w,h);
  const bars=32,bw=(w-40)/bars;
  for(let i=0;i<bars;i++){
    const v=0.2+0.68*Math.abs(Math.sin(t*1.8+i*0.34)*Math.cos(t*0.7-i*0.18));
    const bh=v*(h*0.65),px=20+i*bw+2,py=(h-bh)/2;
    const g=x.createLinearGradient(0,py,0,py+bh);
    g.addColorStop(0,'#5B9BFF');g.addColorStop(0.5,'#38D0E8');g.addColorStop(1,'#4ADE80');
    x.fillStyle=g;x.beginPath();x.roundRect(px,py,Math.max(3,bw-4),bh,4);x.fill();
  }
  t+=0.035;requestAnimationFrame(loop);
})();
</script></body></html>`
    },
    {
      slug: 'solar-system-3d',
      title: '3D solar system',
      subtitle: 'Elliptical planetary orbits',
      icon: 'public',
      chipVar: '--m-chip-4',
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0}body{background:#030408;overflow:hidden;height:100vh}canvas{width:100%;height:100%;display:block}
</style></head><body><canvas id="c"></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');
let w=c.width=innerWidth||340,h=c.height=innerHeight||248,t=0.8;
const pl=[{r:30,s:2.1,sz:3,c:'#D4CDBF'},{r:48,s:1.4,sz:4.5,c:'#FF7A45'},{r:68,s:1,sz:5,c:'#5B9BFF'},{r:90,s:.72,sz:4,c:'#C76D6D'},{r:118,s:.45,sz:7,c:'#D49B55'}];
(function loop(){
  if(innerWidth>10&&(innerWidth!==w||innerHeight!==h)){w=c.width=innerWidth;h=c.height=innerHeight;}
  x.fillStyle='#030408';x.fillRect(0,0,w,h);
  const cx=w/2,cy=h/2;
  pl.forEach(p=>{x.strokeStyle='rgba(232,226,214,0.14)';x.beginPath();x.ellipse(cx,cy,p.r,p.r*0.48,0,0,Math.PI*2);x.stroke();});
  x.fillStyle='#FFD43B';x.beginPath();x.arc(cx,cy,13,0,Math.PI*2);x.fill();
  pl.forEach(p=>{
    const px=cx+Math.cos(t*p.s)*p.r,py=cy+Math.sin(t*p.s)*p.r*0.48;
    x.fillStyle=p.c;x.beginPath();x.arc(px,py,p.sz,0,Math.PI*2);x.fill();
  });
  t+=0.018;requestAnimationFrame(loop);
})();
</script></body></html>`
    },
    {
      slug: 'particle-life',
      title: 'Particle life',
      subtitle: 'Primordial cellular physics',
      icon: 'grain',
      chipVar: '--m-chip-5',
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0}body{background:#050507;overflow:hidden;height:100vh}canvas{width:100%;height:100%;display:block}
</style></head><body><canvas id="c"></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');
let w=c.width=innerWidth||340,h=c.height=innerHeight||248;
const cols=['#4ADE80','#FF5E9C','#5B9BFF','#FFB830'];
const ps=Array.from({length:75},(_,i)=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*1.4,vy:(Math.random()-.5)*1.4,c:cols[i%4]}));
(function loop(){
  if(innerWidth>10&&(innerWidth!==w||innerHeight!==h)){w=c.width=innerWidth;h=c.height=innerHeight;}
  x.fillStyle='rgba(5,5,7,0.18)';x.fillRect(0,0,w,h);
  for(const p of ps){
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<6||p.x>w-6)p.vx*=-1;if(p.y<6||p.y>h-6)p.vy*=-1;
    x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,3,0,Math.PI*2);x.fill();
  }
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){
    const d=Math.hypot(ps[i].x-ps[j].x,ps[i].y-ps[j].y);
    if(d<42){x.strokeStyle='rgba(232,226,214,0.09)';x.beginPath();x.moveTo(ps[i].x,ps[i].y);x.lineTo(ps[j].x,ps[j].y);x.stroke();}
  }
  requestAnimationFrame(loop);
})();
</script></body></html>`
    }
  ];

  /* ── Pre-seeded Interactive Conversations (Drawer History) ── */
  const CONVERSATIONS = [
    {
      id: 'conv_arch',
      title: 'Audit API latency & PRoot build',
      model: 'Anthropic:claude-sonnet-4-5',
      tokens: 14280,
      messages: [
        {
          role: 'user',
          text: 'Check the local PRoot Ubuntu workspace and profile why our edge worker p99 jumped to 180ms.',
          attachments: [{ name: 'worker-trace.json', type: 'file' }]
        },
        {
          role: 'assistant',
          model: 'Claude Sonnet 4.5',
          thoughtTime: '2.4s',
          thought: 'Inspecting workspace/worker-trace.json and running latency breakdown via shell_exec in the Ubuntu 24.04 PRoot sandbox. Two cold-start TLS handshakes account for 74% of p99 tail.',
          tools: [
            { name: 'workspace_read', detail: 'worker-trace.json (4.2 KB)' },
            { name: 'shell_exec', detail: 'python3 scripts/p99_profile.py' }
          ],
          markdown: `I profiled \`worker-trace.json\` inside your **Ubuntu 24.04 PRoot** sandbox. The p99 spike comes from unpooled upstream TLS handshakes on cache misses:

- **DNS + TLS handshake**: \`132 ms\` (73.4% of p99)
- **Upstream JSON decode**: \`31 ms\`
- **Local SQLite cache lookup**: \`4.1 ms\`

\`\`\`ts
const pool = new Agent({
  keepAliveTimeout: 30_000,
  connections: 16,
  pipelining: 1
});
\`\`\`

Applying HTTP keep-alive connection pooling drops p99 from **180 ms → 39 ms**. Want me to patch \`edge-proxy.ts\` and run \`vitest\`?`
        }
      ]
    },
    {
      id: 'conv_council',
      title: '@architect @aegis Zero-Trust Plan',
      model: 'Google:gemini-2.5-pro',
      tokens: 9640,
      messages: [
        {
          role: 'user',
          text: '@architect @aegis Design a local-first encrypted backup pipeline for Android Room + Keystore.'
        },
        {
          role: 'assistant',
          model: 'Gemini 2.5 Pro',
          thoughtTime: '1.9s',
          thought: 'Coordinating Multi-Agent consultation between @architect (storage schema & ZIP stream) and @aegis (Android Keystore AES-256-GCM envelope).',
          tools: [
            { name: 'bot_consult', detail: '@architect + @aegis' }
          ],
          markdown: `**[Architect — Full-Stack & Systems]**
Snapshot the Room WAL checkpoint cleanly inside a transaction, then stream SQLite tables + \`workspace/\` manifests through Apache Commons Compress into a deterministic ZIP archive.

**[Aegis — Linux & SecOps]**
Derive a per-backup AES-256-GCM key via Argon2id from user passphrase, seal API keys separately from Android Keystore-backed \`EncryptedSharedPreferences\`, and emit a SHA-256 integrity manifest before writing to Storage Access Framework.`
        }
      ]
    },
    {
      id: 'conv_research',
      title: 'Deep Research: WebGPU on Android',
      model: 'DeepSeek:deepseek-r1',
      tokens: 18420,
      messages: [
        {
          role: 'user',
          text: 'Compare on-device llama.cpp Vulkan vs CPU NEON throughput for Q4_K_M 8B models.'
        },
        {
          role: 'assistant',
          model: 'DeepSeek R1',
          thoughtTime: '3.1s',
          thought: 'Synthesizing benchmark telemetry across Snapdragon 8 Elite and Tensor G4 mobile SoCs for GGUF Q4_K_M quantization.',
          tools: [
            { name: 'web_search', detail: 'llama.cpp android vulkan neon Q4_K_M' }
          ],
          markdown: `### Mobile GGUF Q4_K_M (8B) Benchmark Summary

- **ARMv9 CPU (i8mm + dotprod)**: \`14–19 tok/s\` decode · \`95 tok/s\` prompt prefill
- **Vulkan GPU Offload**: \`24–34 tok/s\` decode · \`280+ tok/s\` prompt prefill
- **Memory footprint**: ~\`4.9 GB\` RSS with 8K KV cache quantized to \`q8_0\`

Goar Studio binds **llama.cpp** and **whisper.cpp** natively via JNI (\`arm64-v8a\`) so offline chat and local Whisper dictation run with zero cloud dependency.`
        }
      ]
    },
    {
      id: 'conv_quant',
      title: 'Q4 Revenue & Stripe Cohort Audit',
      model: 'OpenAI:gpt-5',
      tokens: 7110,
      messages: [
        {
          role: 'user',
          text: 'Summarize MRR retention and failed renewal recovery from last 30 days.'
        },
        {
          role: 'assistant',
          model: 'GPT-5',
          thoughtTime: '1.6s',
          thought: 'Aggregating mocked cohort metrics and computing net dollar retention.',
          tools: [
            { name: 'python_exec', detail: 'cohort_retention.py' }
          ],
          markdown: `**30-Day Cohort Snapshot (Simulated)**
- **Net Dollar Retention**: \`108.4%\`
- **Smart Retry Recovery**: \`64.2%\` of soft declines recovered within 72h
- **Recommended Action**: Schedule a Watchtower webhook digest every Monday at \`08:00\` in **Tasks**.`
        }
      ]
    }
  ];

  /* ── Tiered Settings Catalog (SettingsScreen.kt v2.1.0: Tier 1 Everyday + Tier 2 Collapsible Advanced) ── */
  const SETTINGS_GROUPS = [
    {
      title: 'Everyday AI',
      items: [
        { key: 'provider', title: 'Providers & API Keys', desc: 'Cloud endpoints, API keys, and local hosts', icon: 'ic_set_cloud', colorVar: '--m-set-provider' },
        { key: 'models', title: 'Models', desc: 'Sync catalogs, set defaults, and add custom IDs', icon: 'ic_set_boxes', colorVar: '--m-set-models' },
        { key: 'imagegen', title: 'Media Generation', desc: 'On-device & BYOK Veo video, FLUX & Imagen 3', icon: 'gsgs_actions_aiimage', colorVar: '--m-set-imagegen' },
        { key: 'transcription', title: 'Voice & Speech', desc: 'Local whisper.cpp STT and neural voice output', icon: 'ic_set_mic', colorVar: '--m-set-transcription' }
      ]
    },
    {
      title: 'Personalization',
      items: [
        { key: 'appearance', title: 'Appearance', desc: 'Theme, 4 Color & Accent Styles, and fonts', icon: 'ic_set_palette', colorVar: '--m-set-appearance' },
        { key: 'skills', title: 'Skills & Tools', desc: '16 playbooks (NVIDIA NIM/CUDA/NeMo + /skill-creator)', icon: 'ic_set_skills', colorVar: '--m-set-skills' },
        { key: 'prompts', title: 'System Prompts', desc: 'Reusable personas and custom templates', icon: 'ic_set_file', colorVar: '--m-set-prompts' },
        { key: 'memory', title: 'Memory', desc: 'Saved facts, active context, and agent recall', icon: 'ic_set_database', colorVar: '--m-set-memory' },
        { key: 'websearch', title: 'Web Search', desc: 'Tavily, Brave, Serper, Kagi, or SearXNG', icon: 'ic_nav_browser', colorVar: '--m-set-websearch' }
      ]
    },
    {
      title: 'Privacy & General',
      items: [
        { key: 'api_hub', title: 'API Hub & OAuth 2.1', desc: '1-tap Google, Notion, Linear, Vercel, Cloudflare & Stripe sign-in', icon: 'gsgs_actions_publish_data', colorVar: '--m-set-apihub' },
        { key: 'security', title: 'Security & App Lock', desc: 'App Integrity Shield, PIN, biometrics & Keystore', icon: 'ic_set_lock', colorVar: '--m-set-security' },
        { key: 'datacontrol', title: 'Data & Backups', desc: 'Encrypted ZIP export, ChatGPT/Claude import & wipe', icon: 'ic_set_archive', colorVar: '--m-set-datacontrol' },
        { key: 'language', title: 'Language', desc: 'Select app display language', icon: 'ic_set_languages', colorVar: '--m-set-language' },
        { key: 'about', title: 'About & Legal', desc: 'Version 2.1.0 (Build 31), guide, support & licenses', icon: 'ic_set_info', colorVar: '--m-set-about' }
      ]
    }
  ];

  const SETTINGS_ADVANCED_ITEMS = [
    { key: 'sandbox', title: 'Linux Sandbox (PRoot)', desc: '15 rootless distros, storage metrics & package manager', icon: 'ic_distro_ubuntu', colorVar: '--m-set-sandbox' },
    { key: 'shell', title: 'Shell & SSH', desc: 'Remote SSH hosts, atomic JNI transfers & VT100 shell', icon: 'ic_nav_terminal', colorVar: '--m-set-shell' },
    { key: 'mcp', title: 'MCP Servers (OAuth 2.1)', desc: '20+ Streamable HTTP & SSE servers with PKCE sign-in', icon: 'gsgs_actions_connector', colorVar: '--m-set-mcp' },
    { key: 'generation', title: 'Model Parameters', desc: 'Temperature, top-p, max tokens, and reasoning defaults', icon: 'ic_set_sliders', colorVar: '--m-set-generation' },
    { key: 'context', title: 'Context & Compaction', desc: 'Context window budget, compaction & token telemetry', icon: 'ic_set_book', colorVar: '--m-set-context' },
    { key: 'titlegen', title: 'Title Generation', desc: 'Automatic chat titling model and prompt rules', icon: 'ic_set_sparkles', colorVar: '--m-set-titlegen' },
    { key: 'search', title: 'Conversation Search', desc: 'Keyword & semantic RAG conversation search', icon: 'ic_set_search', colorVar: '--m-set-search' },
    { key: 'automation', title: 'Automation & Digests', desc: 'Schedules, exact alarms, and Watchtower alerts', icon: 'ic_set_timer', colorVar: '--m-set-automation' },
    { key: 'email', title: 'Email & Campaigns', desc: 'IMAP inbox, SMTP sender, and mailing lists', icon: 'ic_set_email', colorVar: '--m-set-email' },
    { key: 'payments', title: 'Payments & Cards', desc: 'Encrypted card vault and Stripe/PayPal ops', icon: 'gsgs_actions_card', colorVar: '--m-set-payments' },
    { key: 'audit', title: 'Network Tools', desc: 'Target Lookup recon, LAN Scan, Live Traffic & Shadow Trap', icon: 'gsgs_actions_shield_check', colorVar: '--m-set-audit' },
    { key: 'proxy', title: 'Proxy', desc: 'HTTP/SOCKS proxy routing and bypass rules', icon: 'ic_set_server', colorVar: '--m-set-proxy' },
    { key: 'webui', title: 'WebUI & Phone SDK', desc: 'Companion browser server and Android phone tools', icon: 'devices', colorVar: '--m-set-webui' }
  ];

  const NETWORK_RECON = {
    target: 'goarxyz.com',
    stages: ['DNS', 'TLS', 'HTTP', 'Passive', 'ASN/RDAP', 'Ports/CVE'],
    summary: [
      { k: 'A / AAAA', v: '104.21.48.92 · Cloudflare Edge (AS13335)' },
      { k: 'TLS 1.3', v: 'Valid · ECDSA P-256 · HSTS max-age=31536000' },
      { k: 'DMARC / SPF', v: 'v=DMARC1; p=reject · Strict alignment' },
      { k: 'Open Ports', v: '80 (HTTP→HTTPS), 443 (TLS 1.3 · HTTP/3)' },
      { k: 'Shodan CVEs', v: '0 critical CVEs detected' }
    ],
    lanHosts: [
      { ip: '192.168.1.1', host: 'gateway.lan', vendor: 'Ubiquiti UniFi', ports: '53, 80, 443' },
      { ip: '192.168.1.14', host: 'ollama-rig.local', vendor: 'NVIDIA RTX Node', ports: '22, 11434' },
      { ip: '192.168.1.42', host: 'goar-pixel9', vendor: 'Local Android Host', ports: '8080 (WebUI)' }
    ],
    traps: [
      { port: 2222, service: 'Fake OpenSSH 9.6 Honeyport', hits: 0, status: 'Armed' },
      { port: 8443, service: 'Decoy Admin Login Banner', hits: 0, status: 'Armed' }
    ]
  };

  /* ── Ecosystem Showcase Lists for Website (v2.1.0) ── */
  const PROVIDERS_SHOWCASE = [
    { name: 'Anthropic Claude', icon: 'provider_anthropic' },
    { name: 'OpenAI', icon: 'provider_openai' },
    { name: 'Google Gemini', icon: 'provider_gemini' },
    { name: 'NVIDIA NIM', icon: 'provider_nvidia' },
    { name: 'DeepSeek', icon: 'provider_deepseek' },
    { name: 'xAI Grok', icon: 'provider_xai' },
    { name: 'Mistral AI', icon: 'provider_mistral' },
    { name: 'Groq', icon: 'provider_groq' },
    { name: 'OpenRouter', icon: 'provider_openrouter' },
    { name: 'Ollama', icon: 'provider_ollama' },
    { name: 'Qwen', icon: 'provider_qwen' },
    { name: 'Cerebras', icon: 'provider_cerebras' },
    { name: 'Together AI', icon: 'provider_together' },
    { name: 'Fireworks AI', icon: 'provider_fireworks' },
    { name: 'Perplexity', icon: 'provider_perplexity' },
    { name: 'Cohere', icon: 'provider_cohere' },
    { name: 'Venice AI', icon: 'provider_venice' },
    { name: 'Pollinations', icon: 'provider_pollinations' },
    { name: 'Local GGUF (llama.cpp)', icon: 'ic_goar_mark_mono' }
  ];

  const DISTROS_SHOWCASE = [
    { name: 'Ubuntu', icon: 'ic_distro_ubuntu' },
    { name: 'Debian', icon: 'ic_debian' },
    { name: 'Alpine Linux', icon: 'ic_alpine_linux' },
    { name: 'Arch Linux', icon: 'ic_distro_arch' },
    { name: 'Kali Linux', icon: 'ic_distro_kali' },
    { name: 'Fedora', icon: 'ic_distro_fedora' },
    { name: 'NixOS', icon: 'ic_distro_nixos' },
    { name: 'openSUSE', icon: 'ic_distro_opensuse' },
    { name: 'Manjaro', icon: 'ic_distro_manjaro' },
    { name: 'Gentoo', icon: 'ic_distro_gentoo' },
    { name: 'Void Linux', icon: 'ic_distro_void' },
    { name: 'Rocky Linux', icon: 'ic_distro_rocky' },
    { name: 'AlmaLinux', icon: 'ic_distro_alma' },
    { name: 'CentOS', icon: 'ic_distro_centos' },
    { name: 'Parrot OS', icon: 'ic_distro_parrot' }
  ];

  const MCP_SHOWCASE = [
    { name: 'GitHub MCP · OAuth 2.1', icon: 'ic_mcp_github' },
    { name: 'Notion MCP · OAuth 2.1', icon: 'ic_mcp_notion' },
    { name: 'Linear MCP · OAuth 2.1', icon: 'ic_mcp_linear' },
    { name: 'Vercel MCP · OAuth 2.1', icon: 'ic_brand_vercel' },
    { name: 'Supabase MCP · OAuth 2.1', icon: 'ic_brand_supabase' },
    { name: 'Cloudflare MCP · OAuth 2.1', icon: 'ic_brand_cloudflare' },
    { name: 'Stripe MCP · OAuth 2.1', icon: 'provider_stripe' },
    { name: 'Figma Dev MCP · OAuth 2.1', icon: 'ic_brand_figma' },
    { name: 'Sentry MCP · OAuth 2.1', icon: 'ic_mcp_sentry' },
    { name: 'Postman Official MCP', icon: 'ic_brand_postman' },
    { name: 'HubSpot CRM MCP', icon: 'ic_brand_hubspot' },
    { name: 'Google Drive & Gmail', icon: 'ic_mcp_gdrive' },
    { name: 'Google Calendar', icon: 'ic_mcp_gcalendar' },
    { name: 'Shopify Storefront MCP', icon: 'ic_mcp_shopify' },
    { name: 'PayPal Official MCP', icon: 'provider_paypal' },
    { name: 'Slack', icon: 'ic_mcp_slack' },
    { name: 'PostgreSQL / SQLite', icon: 'ic_mcp_postgres' },
    { name: 'Docker', icon: 'ic_mcp_docker' }
  ];

  const WORKSPACE_FILES = [
    {
      name: 'SOUL.md',
      folder: 'goar_bots/',
      size: '1.2 KB',
      icon: 'gsgs_files_txt',
      content: `# SOUL.md — Goar (Lead Autonomous Operator)\n- Identity: Chief Operator of the private on-device AI workbench.\n- Doctrine: ASSESS -> PLAN -> VALIDATE -> EXECUTE -> REVIEW -> VERIFY -> DELIVER.\n- Privacy: Zero cloud sync. EncryptedSharedPreferences + Room SQLite.\n- Consultation: @architect, @aegis, @quant, @atlas, @muse.`
    },
    {
      name: 'edge-proxy.ts',
      folder: 'workspace/src/',
      size: '2.8 KB',
      icon: 'gsgs_files_ts',
      content: `import { Agent } from 'undici';\n\nexport const pool = new Agent({\n  keepAliveTimeout: 30_000,\n  connections: 16,\n  pipelining: 1\n});\n\nexport async function forward(url: string) {\n  const res = await fetch(url, { dispatcher: pool });\n  return res.json();\n}`
    },
    {
      name: 'cohort_retention.py',
      folder: 'workspace/scripts/',
      size: '1.9 KB',
      icon: 'gsgs_files_txt',
      content: `import statistics\n\ncohorts = [104.2, 106.8, 108.4, 109.1]\nprint(f"Net Dollar Retention: {statistics.mean(cohorts):.1f}%")\nprint("Status: Verified in local Ubuntu 24.04 PRoot")`
    },
    {
      name: 'skills_catalog.json',
      folder: 'assets/bundled_skills/',
      size: '1.6 KB',
      icon: 'gsgs_files_js',
      content: `{\n  "version": "3.1.0",\n  "bundled_skills": 16,\n  "runtime": "local-first",\n  "engine": "Goar Studio 2.1.0"\n}`
    }
  ];

  const TASKS = [
    { id: 't1', name: 'Morning Executive Digest', cron: '0 7 * * *', nextRun: 'Tomorrow, 07:00', model: 'Claude Sonnet 4.5', enabled: true, lastStatus: 'Success · 14s', day: 23 },
    { id: 't2', name: 'VPS Fleet Health & TLS Audit', cron: '0 */6 * * *', nextRun: 'In 2h 14m', model: 'DeepSeek R1', enabled: true, lastStatus: 'All 4 hosts healthy', day: 22 },
    { id: 't3', name: 'GitHub Release Watchtower', cron: '*/30 * * * *', nextRun: 'In 18m', model: 'Gemini 2.5 Flash', enabled: true, lastStatus: 'No DOM diff', day: 25 },
    { id: 't4', name: 'Weekly Encrypted ZIP Backup', cron: '0 2 * * 0', nextRun: 'Sun, 02:00', model: 'Local Utility', enabled: false, lastStatus: 'Paused', day: 29 }
  ];

  const BROWSER_NETWORK = [
    { method: 'GET', status: 200, url: 'https://goarxyz.com/api/v2/status', ms: 42, size: '1.4 KB' },
    { method: 'POST', status: 200, url: 'https://api.anthropic.com/v1/messages', ms: 318, size: '8.9 KB' },
    { method: 'GET', status: 200, url: 'https://api.github.com/repos/goar/studio', ms: 96, size: '14.2 KB' },
    { method: 'GET', status: 304, url: 'https://fonts.local/outfit.ttf', ms: 4, size: 'Cached' }
  ];

  return {
    LEGAL_DOCS,
    MODELS,
    BOTS,
    SLASH_COMMANDS,
    SKILLS,
    PALETTE_STYLES,
    PLAYGROUND_MODELS,
    BUILDER_TEMPLATES,
    CONVERSATIONS,
    SETTINGS_GROUPS,
    SETTINGS_ADVANCED_ITEMS,
    NETWORK_RECON,
    PROVIDERS_SHOWCASE,
    DISTROS_SHOWCASE,
    MCP_SHOWCASE,
    WORKSPACE_FILES,
    TASKS,
    BROWSER_NETWORK
  };
})();
