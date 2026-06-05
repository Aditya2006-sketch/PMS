import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id:1, name:"Aditya Sharma",   branch:"Computer Science", cgpa:8.9, skills:["React","Python","ML"],           status:"Placed",    company:"Infosys",          package:"12 LPA", year:2024, phone:"9876543210", email:"aditya@college.edu" },
  { id:2, name:"Priya Patel",     branch:"Electronics",      cgpa:8.2, skills:["VLSI","Embedded C","IoT"],       status:"Interview", company:"Texas Instruments", package:"—",      year:2024, phone:"9123456789", email:"priya@college.edu" },
  { id:3, name:"Rahul Desai",     branch:"Mechanical",       cgpa:7.5, skills:["AutoCAD","SolidWorks","MATLAB"], status:"Eligible",  company:"—",                package:"—",      year:2024, phone:"9988776655", email:"rahul@college.edu" },
  { id:4, name:"Sneha Kulkarni", branch:"Computer Science", cgpa:9.1, skills:["Java","Spring Boot","AWS"],      status:"Placed",    company:"TCS",              package:"15 LPA", year:2024, phone:"9871234560", email:"sneha@college.edu" },
  { id:5, name:"Vikram Nair",    branch:"IT",               cgpa:7.8, skills:["Angular","Node.js","MongoDB"],   status:"Applied",   company:"Wipro",            package:"—",      year:2024, phone:"9765432100", email:"vikram@college.edu" },
  { id:6, name:"Anjali Mehta",   branch:"Civil",            cgpa:7.1, skills:["AutoCAD","Staad Pro","PM"],      status:"Eligible",  company:"—",                package:"—",      year:2024, phone:"9654321098", email:"anjali@college.edu" },
];
const COMPANIES = [
  { id:1, name:"Infosys",          sector:"IT Services",   roles:["Software Engineer","Systems Engineer"], package:"10–12 LPA", eligibility:"CGPA ≥ 7.0", deadline:"2024-12-15", slots:25, applied:18, status:"Open",   logo:"IN" },
  { id:2, name:"TCS",              sector:"IT Services",   roles:["Developer","Business Analyst"],         package:"12–16 LPA", eligibility:"CGPA ≥ 7.5", deadline:"2024-12-20", slots:30, applied:22, status:"Open",   logo:"TC" },
  { id:3, name:"Texas Instruments",sector:"Semiconductor", roles:["VLSI Design Engineer"],                 package:"14–18 LPA", eligibility:"CGPA ≥ 8.0", deadline:"2024-12-10", slots:8,  applied:12, status:"Closed", logo:"TI" },
  { id:4, name:"Wipro",            sector:"IT Services",   roles:["Project Engineer","QA Engineer"],       package:"8–11 LPA",  eligibility:"CGPA ≥ 6.5", deadline:"2025-01-05", slots:40, applied:30, status:"Open",   logo:"WI" },
  { id:5, name:"L&T Construction", sector:"Infrastructure",roles:["Graduate Engineer Trainee"],            package:"7–9 LPA",   eligibility:"CGPA ≥ 6.5", deadline:"2025-01-10", slots:15, applied:8,  status:"Open",   logo:"LT" },
];
const SEED_ACCOUNTS = [
  { id:1, name:"Dr. Ramesh Patil",  email:"admin@college.edu",  password:"admin123", role:"TPO Head" },
  { id:2, name:"Prof. Sunita Joshi",email:"sunita@college.edu", password:"coord123", role:"Coordinator" },
];

// ─── THEME ─────────────────────────────────────────────────────────────────
const T = {
  bg:       "#040d1a",
  bgPanel:  "#070f1f",
  bgCard:   "rgba(10,20,40,0.85)",
  bgGlass:  "rgba(0,200,255,0.04)",
  cyan:     "#00e5ff",
  cyanDim:  "#00b8cc",
  cyanFade: "rgba(0,229,255,0.12)",
  purple:   "#bf5af2",
  purpleFade:"rgba(191,90,242,0.12)",
  green:    "#30d158",
  greenFade:"rgba(48,209,88,0.12)",
  amber:    "#ffd60a",
  amberFade:"rgba(255,214,10,0.12)",
  red:      "#ff453a",
  redFade:  "rgba(255,69,58,0.12)",
  text:     "#e2f4ff",
  textMid:  "#7ab8d4",
  textDim:  "#3a6a80",
  border:   "rgba(0,229,255,0.12)",
  borderMid:"rgba(0,229,255,0.25)",
  borderHi: "rgba(0,229,255,0.5)",
};

const STATUS = {
  Placed:    { color:T.green,  fade:T.greenFade,  label:"PLACED" },
  Interview: { color:T.amber,  fade:T.amberFade,  label:"INTERVIEW" },
  Applied:   { color:T.cyan,   fade:T.cyanFade,   label:"APPLIED" },
  Eligible:  { color:T.purple, fade:T.purpleFade, label:"ELIGIBLE" },
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&family=Inter:wght@300;400;500;600&display=swap');

  *{box-sizing:border-box;margin:0;padding:0;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:rgba(0,229,255,0.25);border-radius:2px;}

  @keyframes scanline{0%{transform:translateY(-100%);}100%{transform:translateY(100vh);}}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
  @keyframes glow{0%,100%{text-shadow:0 0 8px currentColor;}50%{text-shadow:0 0 22px currentColor,0 0 40px currentColor;}}
  @keyframes gridFly{0%{background-position:0 0;}100%{background-position:0 60px;}}
  @keyframes fadeSlideUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
  @keyframes rotateRing{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes dash{to{stroke-dashoffset:-20;}}
  @keyframes blink{0%,100%{opacity:1;}49%{opacity:1;}50%,98%{opacity:0;}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
  @keyframes holo{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}

  .auth-card{animation:fadeSlideUp .5s cubic-bezier(.22,1,.36,1) forwards;}
  .nav-item:hover{background:rgba(0,229,255,0.07)!important;border-color:rgba(0,229,255,0.25)!important;}
  .stat-card:hover{border-color:rgba(0,229,255,0.4)!important;transform:translateY(-2px);}
  .stat-card{transition:all .2s cubic-bezier(.22,1,.36,1);}
  .row-card:hover{border-color:rgba(0,229,255,0.3)!important;background:rgba(0,229,255,0.04)!important;}
  .co-card:hover{border-color:rgba(0,229,255,0.35)!important;}
  .co-card{transition:border-color .2s;}
  .btn-p{transition:all .18s;} .btn-p:hover{filter:brightness(1.15);transform:translateY(-1px);}
  .btn-s:hover{border-color:rgba(0,229,255,0.5)!important;color:#00e5ff!important;}
  .btn-s{transition:all .18s;}
  .filter-btn:hover{border-color:rgba(0,229,255,0.4)!important;}
  .hint-row:hover{background:rgba(0,229,255,0.06)!important;}
  input,select,textarea{transition:border-color .15s,box-shadow .15s;}
  input:focus,select:focus,textarea:focus{border-color:rgba(0,229,255,0.6)!important;box-shadow:0 0 0 3px rgba(0,229,255,0.1)!important;outline:none;}
`;

// ─── TINY ATOMS ────────────────────────────────────────────────────────────
function HexGrid() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
      {/* Animated grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)`, backgroundSize:"60px 60px", animation:"gridFly 4s linear infinite" }} />
      {/* Scan line */}
      <div style={{ position:"absolute", left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.08),transparent)", animation:"scanline 8s linear infinite", top:0 }} />
      {/* Corner brackets */}
      {[[0,0],[0,1],[1,0],[1,1]].map(([r,c],i)=>( <div key={i} style={{ position:"absolute", top:r?"auto":"24px", bottom:r?"24px":"auto", left:c?"auto":"24px", right:c?"24px":"auto", width:40, height:40, borderTop:r?"none":`2px solid rgba(0,229,255,0.3)`, borderBottom:r?`2px solid rgba(0,229,255,0.3)`:"none", borderLeft:c?"none":`2px solid rgba(0,229,255,0.3)`, borderRight:c?`2px solid rgba(0,229,255,0.3)`:"none" }} /> ))}
    </div>
  );
}

function GlowOrb({ x, y, color, size=300 }) {
  return <div style={{ position:"fixed", left:`${x}%`, top:`${y}%`, width:size, height:size, borderRadius:"50%", background:`radial-gradient(circle, ${color}18 0%, transparent 70%)`, transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:0 }} />;
}

function Avatar({ name, size=40 }) {
  const ini = name.split(" ").map(n=>n[0]).join("").slice(0,2);
  return (
    <div style={{ width:size, height:size, borderRadius:size*0.25, background:`linear-gradient(135deg,${T.cyan}30,${T.purple}30)`, border:`1px solid ${T.cyanDim}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Orbitron',monospace", fontWeight:700, fontSize:size*0.28, color:T.cyan, flexShrink:0, letterSpacing:1 }}>
      {ini}
    </div>
  );
}

function Badge({ status }) {
  const s = STATUS[status] || STATUS.Eligible;
  return (
    <span style={{ fontFamily:"'Orbitron',monospace", fontSize:9, fontWeight:700, letterSpacing:2, padding:"3px 10px", borderRadius:3, background:s.fade, color:s.color, border:`1px solid ${s.color}50`, textTransform:"uppercase" }}>
      {s.label}
    </span>
  );
}

function CyberBar({ pct, color=T.cyan }) {
  return (
    <div style={{ height:4, borderRadius:2, background:"rgba(255,255,255,0.05)", overflow:"hidden", position:"relative" }}>
      <div style={{ height:"100%", width:`${Math.min(pct,100)}%`, background:`linear-gradient(90deg,${color},${color}aa)`, transition:"width .6s cubic-bezier(.22,1,.36,1)", position:"relative", borderRadius:2 }}>
        <div style={{ position:"absolute", right:0, top:0, bottom:0, width:8, background:`${color}`, filter:"blur(3px)" }} />
      </div>
    </div>
  );
}

function PulsingDot({ color }) {
  return (
    <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:color, animation:"pulse 2s infinite", boxShadow:`0 0 6px ${color}` }} />
  );
}

function Toast({ msg, type, onClose }) {
  const color = type==="error" ? T.red : type==="success" ? T.green : T.cyan;
  return (
    <div style={{ position:"fixed", bottom:28, right:28, zIndex:9999, background:T.bgPanel, border:`1px solid ${color}60`, color, borderRadius:8, padding:"13px 20px", fontSize:12, fontFamily:"'Share Tech Mono',monospace", display:"flex", alignItems:"center", gap:12, minWidth:280, boxShadow:`0 0 30px ${color}20,0 8px 32px rgba(0,0,0,0.6)`, letterSpacing:1 }}>
      <PulsingDot color={color}/>
      <span style={{ flex:1 }}>{msg}</span>
      <span onClick={onClose} style={{ cursor:"pointer", opacity:.5, fontSize:16 }}>×</span>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,5,15,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:20, backdropFilter:"blur(8px)" }}>
      <div style={{ background:T.bgPanel, borderRadius:12, padding:28, width:"100%", maxWidth:460, border:`1px solid ${T.borderMid}`, maxHeight:"90vh", overflowY:"auto", boxShadow:`0 0 60px rgba(0,229,255,0.08),0 20px 60px rgba(0,0,0,0.8)`, position:"relative" }}>
        {/* Top accent */}
        <div style={{ position:"absolute", top:0, left:32, right:32, height:1, background:`linear-gradient(90deg,transparent,${T.cyan},transparent)` }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:13, fontWeight:700, color:T.cyan, letterSpacing:2, textTransform:"uppercase" }}>{title}</h2>
          <button onClick={onClose} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:6, color:T.textMid, fontSize:16, cursor:"pointer", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inputStyle = { width:"100%", boxSizing:"border-box", background:"rgba(0,229,255,0.04)", border:`1px solid ${T.border}`, borderRadius:6, padding:"9px 12px", color:T.text, fontSize:13, fontFamily:"'Inter',sans-serif", outline:"none" };
const labelStyle = { fontSize:10, color:T.textMid, display:"block", marginBottom:5, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2, textTransform:"uppercase" };

function Field({ label, value, onChange, type="text", options, placeholder }) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={labelStyle}>{label}</label>
      {options
        ? <select value={value} onChange={e=>onChange(e.target.value)} style={{ ...inputStyle, appearance:"none" }}>
            {options.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={inputStyle}/>
      }
    </div>
  );
}

// ─── LOGO ──────────────────────────────────────────────────────────────────
function LogoMark({ size=36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <polygon points="18,3 33,12 33,24 18,33 3,24 3,12" fill="none" stroke={T.cyan} strokeWidth="1.5" opacity=".6"/>
      <polygon points="18,8 28,14 28,22 18,28 8,22 8,14" fill="none" stroke={T.cyan} strokeWidth="1" opacity=".4"/>
      <circle cx="18" cy="18" r="5" fill={T.cyan} opacity=".8"/>
      <circle cx="18" cy="18" r="3" fill={T.bg}/>
      <circle cx="18" cy="18" r="1.5" fill={T.cyan}/>
    </svg>
  );
}

// ─── STAT CARD ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="stat-card" style={{ background:T.bgCard, borderRadius:10, padding:"18px 20px", border:`1px solid ${T.border}`, position:"relative", overflow:"hidden", cursor:"default" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${color}80,transparent)` }} />
      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:1, background:`linear-gradient(180deg,${color}60,transparent)` }} />
      <div style={{ fontSize:10, color:T.textMid, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2, marginBottom:8, textTransform:"uppercase" }}>{label}</div>
      <div style={{ fontSize:28, fontWeight:700, fontFamily:"'Orbitron',monospace", color, letterSpacing:-1, animation:"glow 3s ease-in-out infinite" }}>{value}</div>
      <div style={{ fontSize:11, color:T.textDim, marginTop:6, fontFamily:"'Inter',sans-serif" }}>{sub}</div>
      <div style={{ position:"absolute", bottom:14, right:16, fontSize:20, opacity:.25 }}>{icon}</div>
    </div>
  );
}

// ─── AUTH ──────────────────────────────────────────────────────────────────
function AuthPage({ onLogin, accounts, setAccounts }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"", role:"Coordinator" });
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const tagline = "PLACEMENT · MANAGEMENT · SYSTEM";

  // Typewriter
  useEffect(() => {
    let i = 0, t;
    setTyped("");
    const tick = () => { if(i<=tagline.length){ setTyped(tagline.slice(0,i)); i++; t=setTimeout(tick,60); } };
    t = setTimeout(tick,600);
    return ()=>clearTimeout(t);
  }, []);

  const f=(k,v)=>{ setForm(p=>({...p,[k]:v})); setErr(""); };

  const doLogin = () => {
    if(!form.email||!form.password){ setErr("All fields required."); return; }
    const u = accounts.find(a=>a.email.toLowerCase()===form.email.toLowerCase()&&a.password===form.password);
    if(!u){ setErr("ACCESS DENIED — Invalid credentials."); return; }
    setLoading(true); setTimeout(()=>{ setLoading(false); onLogin(u); },1000);
  };
  const doSignup = () => {
    if(!form.name.trim()||!form.email.trim()||!form.password||!form.confirm){ setErr("All fields required."); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){ setErr("Invalid email format."); return; }
    if(form.password.length<6){ setErr("Password min 6 characters."); return; }
    if(form.password!==form.confirm){ setErr("Passwords do not match."); return; }
    if(accounts.find(a=>a.email.toLowerCase()===form.email.toLowerCase())){ setErr("Account already exists."); return; }
    const nu={ id:Date.now(), name:form.name.trim(), email:form.email.trim(), password:form.password, role:form.role };
    setAccounts(p=>[...p,nu]);
    setLoading(true); setTimeout(()=>{ setLoading(false); onLogin(nu); },1000);
  };

  const aiStyle = { ...inputStyle, fontFamily:"'Share Tech Mono',monospace", fontSize:12, letterSpacing:1, paddingRight:40 };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", fontFamily:"'Inter',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <HexGrid/>
      <GlowOrb x={20} y={30} color={T.cyan} size={500}/>
      <GlowOrb x={80} y={70} color={T.purple} size={400}/>
      <GlowOrb x={60} y={10} color={T.cyanDim} size={250}/>

      <div className="auth-card" style={{ position:"relative", zIndex:1, width:"100%", maxWidth:420, margin:"0 16px" }}>
        {/* Logo / header */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14, animation:"float 3s ease-in-out infinite" }}>
            <LogoMark size={56}/>
          </div>
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:20, fontWeight:900, color:T.cyan, letterSpacing:4, animation:"glow 3s ease-in-out infinite" }}>
            PLACETRACK
          </div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:T.textMid, letterSpacing:3, marginTop:6, minHeight:18 }}>
            {typed}<span style={{ animation:"blink 1s step-end infinite", color:T.cyan }}>|</span>
          </div>
        </div>

        {/* Card */}
        <div style={{ background:"rgba(7,15,31,0.95)", borderRadius:12, border:`1px solid ${T.borderMid}`, boxShadow:`0 0 60px rgba(0,229,255,0.06),0 20px 60px rgba(0,0,0,0.9)`, overflow:"hidden", position:"relative" }}>
          {/* Top glow strip */}
          <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.cyan},transparent)` }}/>

          {/* Tab row */}
          <div style={{ display:"flex", borderBottom:`1px solid ${T.border}` }}>
            {[["login","SIGN IN"],["signup","REGISTER"]].map(([m,lbl])=>(
              <button key={m} onClick={()=>{ setMode(m); setErr(""); setForm({name:"",email:"",password:"",confirm:"",role:"Coordinator"}); }} style={{ flex:1, padding:"14px 0", border:"none", cursor:"pointer", fontFamily:"'Orbitron',monospace", fontSize:10, fontWeight:700, letterSpacing:3, background:mode===m?"rgba(0,229,255,0.07)":"transparent", color:mode===m?T.cyan:T.textDim, borderBottom:mode===m?`2px solid ${T.cyan}`:"2px solid transparent", transition:"all .2s" }}>
                {lbl}
              </button>
            ))}
          </div>

          <div style={{ padding:28 }}>
            {mode==="login" ? (
              <>
                <p style={{ color:T.textMid, fontSize:12, marginBottom:22, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>
                  &gt; AUTHENTICATE TO ACCESS SYSTEM
                </p>

                <div style={{ marginBottom:16 }}>
                  <label style={labelStyle}>// EMAIL ADDRESS</label>
                  <input style={aiStyle} type="email" placeholder="user@institution.edu" value={form.email} onChange={e=>f("email",e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={labelStyle}>// PASSWORD</label>
                  <div style={{ position:"relative" }}>
                    <input style={aiStyle} type={showPass?"text":"password"} placeholder="••••••••" value={form.password} onChange={e=>f("password",e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
                    <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:T.textMid, fontSize:14 }}>{showPass?"🙈":"👁"}</button>
                  </div>
                </div>

                {err && <div style={{ background:T.redFade, border:`1px solid ${T.red}40`, borderRadius:6, padding:"9px 12px", color:T.red, fontSize:11, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1, marginBottom:14 }}>⚠ {err}</div>}

                <button className="btn-p" onClick={doLogin} disabled={loading} style={{ width:"100%", marginTop:8, padding:"12px 0", background:loading?`rgba(0,229,255,0.1)`:`linear-gradient(90deg,${T.cyanDim},${T.cyan})`, color:T.bg, border:"none", borderRadius:7, fontSize:12, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"'Orbitron',monospace", letterSpacing:3, boxShadow:loading?"none":`0 0 20px ${T.cyan}40` }}>
                  {loading?"AUTHENTICATING...":"INITIATE ACCESS →"}
                </button>

                {/* Demo */}
                <div style={{ marginTop:20, background:"rgba(0,229,255,0.03)", borderRadius:8, padding:"12px 14px", border:`1px solid ${T.border}` }}>
                  <div style={{ fontSize:9, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2, marginBottom:10 }}>// DEMO CREDENTIALS</div>
                  {[["admin@college.edu","admin123","TPO HEAD"],["sunita@college.edu","coord123","COORDINATOR"]].map(([em,pw,role])=>(
                    <div key={em} className="hint-row" onClick={()=>{ f("email",em); f("password",pw); }} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 8px", borderRadius:6, cursor:"pointer", marginBottom:4, transition:"background .15s" }}>
                      <div>
                        <div style={{ fontSize:11, color:T.textMid, fontFamily:"'Share Tech Mono',monospace" }}>{em}</div>
                        <div style={{ fontSize:10, color:T.textDim, marginTop:2 }}>{role} · {pw}</div>
                      </div>
                      <span style={{ fontSize:10, color:T.cyan }}>USE →</span>
                    </div>
                  ))}
                </div>

                <p style={{ textAlign:"center", marginTop:16, fontSize:11, color:T.textDim, fontFamily:"'Share Tech Mono',monospace" }}>
                  NO ACCOUNT? <span onClick={()=>{ setMode("signup"); setErr(""); }} style={{ color:T.cyan, cursor:"pointer", letterSpacing:1 }}>REGISTER</span>
                </p>
              </>
            ):(
              <>
                <p style={{ color:T.textMid, fontSize:12, marginBottom:22, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>
                  &gt; CREATE NEW COORDINATOR ACCOUNT
                </p>
                <div style={{ marginBottom:14 }}>
                  <label style={labelStyle}>// FULL NAME</label>
                  <input style={aiStyle} type="text" placeholder="Dr. Jane Smith" value={form.name} onChange={e=>f("name",e.target.value)}/>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={labelStyle}>// EMAIL</label>
                  <input style={aiStyle} type="email" placeholder="you@college.edu" value={form.email} onChange={e=>f("email",e.target.value)}/>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={labelStyle}>// ROLE</label>
                  <select style={{ ...aiStyle, appearance:"none" }} value={form.role} onChange={e=>f("role",e.target.value)}>
                    {["TPO Head","Coordinator","Assistant Coordinator"].map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={labelStyle}>// PASSWORD</label>
                  <div style={{ position:"relative" }}>
                    <input style={aiStyle} type={showPass?"text":"password"} placeholder="Min 6 characters" value={form.password} onChange={e=>f("password",e.target.value)}/>
                    <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:T.textMid, fontSize:14 }}>{showPass?"🙈":"👁"}</button>
                  </div>
                </div>
                <div style={{ marginBottom:8 }}>
                  <label style={labelStyle}>// CONFIRM PASSWORD</label>
                  <div style={{ position:"relative" }}>
                    <input style={{ ...aiStyle, borderColor:form.confirm&&form.password!==form.confirm?`${T.red}60`:T.border }} type={showConf?"text":"password"} placeholder="Re-enter password" value={form.confirm} onChange={e=>f("confirm",e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSignup()}/>
                    <button onClick={()=>setShowConf(p=>!p)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:T.textMid, fontSize:14 }}>{showConf?"🙈":"👁"}</button>
                  </div>
                  {form.confirm&&form.password!==form.confirm&&<div style={{ fontSize:10, color:T.red, marginTop:4, fontFamily:"'Share Tech Mono',monospace" }}>⚠ MISMATCH</div>}
                </div>
                {err&&<div style={{ background:T.redFade, border:`1px solid ${T.red}40`, borderRadius:6, padding:"9px 12px", color:T.red, fontSize:11, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1, marginBottom:10 }}>⚠ {err}</div>}
                <button className="btn-p" onClick={doSignup} disabled={loading} style={{ width:"100%", marginTop:8, padding:"12px 0", background:loading?`rgba(0,229,255,0.1)`:`linear-gradient(90deg,${T.purple},${T.cyan})`, color:"white", border:"none", borderRadius:7, fontSize:12, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"'Orbitron',monospace", letterSpacing:3, boxShadow:loading?"none":`0 0 20px ${T.cyan}30` }}>
                  {loading?"INITIALIZING...":"CREATE ACCOUNT →"}
                </button>
                <p style={{ textAlign:"center", marginTop:16, fontSize:11, color:T.textDim, fontFamily:"'Share Tech Mono',monospace" }}>
                  HAVE ACCOUNT? <span onClick={()=>{ setMode("login"); setErr(""); }} style={{ color:T.cyan, cursor:"pointer" }}>SIGN IN</span>
                </p>
              </>
            )}
          </div>
          <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.purple}60,transparent)` }}/>
        </div>
        <p style={{ textAlign:"center", marginTop:16, fontSize:10, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2 }}>MIT COLLEGE OF ENGINEERING · v2.4.1</p>
      </div>
    </div>
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────
const NAV=[
  {id:"Dashboard",icon:"◈",label:"DASHBOARD"},
  {id:"Students",icon:"◉",label:"STUDENTS"},
  {id:"Companies",icon:"◆",label:"COMPANIES"},
  {id:"Admin",icon:"⬡",label:"ADMIN"},
];

function Dashboard({ user, onLogout }) {
  const [activeNav,setActiveNav]=useState("Dashboard");
  const [students,setStudents]=useState(STUDENTS);
  const [companies,setCompanies]=useState(COMPANIES);
  const [toast,setToast]=useState(null);
  const [expandedId,setExpandedId]=useState(null);
  const [filter,setFilter]=useState("All");
  const [searchQ,setSearchQ]=useState("");
  const [modal,setModal]=useState(null);
  const [modalData,setModalData]=useState({});
  const [sForm,setSForm]=useState({name:"",branch:"Computer Science",cgpa:"",skills:"",phone:"",email:"",year:"2024"});
  const [cForm,setCForm]=useState({name:"",sector:"IT Services",roles:"",package:"",eligibility:"",deadline:"",slots:""});
  const [statusForm,setStatusForm]=useState({status:"Eligible",company:"",package:""});
  const [notifMsg,setNotifMsg]=useState("");
  const [coordForm,setCoordForm]=useState({name:"",role:"Coordinator",email:"",phone:""});
  const [coords,setCoords]=useState([{id:1,name:"Dr. Ramesh Patil",role:"TPO Head",email:"ramesh@college.edu"},{id:2,name:"Prof. Sunita Joshi",role:"Coordinator",email:"sunita@college.edu"}]);
  const [deleteTarget,setDeleteTarget]=useState(null);
  const [userMenu,setUserMenu]=useState(false);
  const [tick,setTick]=useState(0);

  // Live clock tick for animation feel
  useEffect(()=>{ const t=setInterval(()=>setTick(p=>p+1),1000); return()=>clearInterval(t); },[]);

  const showT=(msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3000); };
  const closeM=()=>{ setModal(null); setModalData({}); };

  const placed=students.filter(s=>s.status==="Placed").length;
  const pkgArr=students.filter(s=>s.status==="Placed"&&s.package!=="—");
  const avgPkg=pkgArr.length?(pkgArr.reduce((a,s)=>a+parseFloat(s.package),0)/pkgArr.length).toFixed(1)+" LPA":"—";
  const openCo=companies.filter(c=>c.status==="Open").length;
  const filtered=students.filter(s=>(filter==="All"||s.status===filter)&&(s.name.toLowerCase().includes(searchQ.toLowerCase())||s.branch.toLowerCase().includes(searchQ.toLowerCase())));

  const addStudent=()=>{ if(!sForm.name.trim()||!sForm.cgpa){showT("Name & CGPA required","error");return;} setStudents(p=>[...p,{id:Date.now(),...sForm,cgpa:parseFloat(sForm.cgpa),skills:sForm.skills.split(",").map(x=>x.trim()).filter(Boolean),status:"Eligible",company:"—",package:"—"}]); showT(`${sForm.name} registered!`); closeM(); };
  const editStudent=()=>{ if(!sForm.name.trim()){showT("Name required","error");return;} setStudents(p=>p.map(s=>s.id===modalData.id?{...s,...sForm,cgpa:parseFloat(sForm.cgpa),skills:sForm.skills.split(",").map(x=>x.trim()).filter(Boolean)}:s)); showT("Profile updated"); closeM(); };
  const deleteStudent=()=>{ setStudents(p=>p.filter(s=>s.id!==deleteTarget.id)); showT(`${deleteTarget.name} removed`); closeM(); };
  const saveStatus=()=>{ setStudents(p=>p.map(s=>s.id===modalData.id?{...s,status:statusForm.status,company:statusForm.company||"—",package:statusForm.package||"—"}:s)); showT("Status updated"); closeM(); };
  const addCompany=()=>{ if(!cForm.name.trim()){showT("Name required","error");return;} setCompanies(p=>[...p,{id:Date.now(),...cForm,roles:cForm.roles.split(",").map(x=>x.trim()).filter(Boolean),slots:parseInt(cForm.slots)||10,applied:0,status:"Open",logo:cForm.name.substring(0,2).toUpperCase()}]); showT(`${cForm.name} added!`); closeM(); };
  const editCompany=()=>{ setCompanies(p=>p.map(c=>c.id===modalData.id?{...c,...cForm,roles:cForm.roles.split(",").map(x=>x.trim()).filter(Boolean),slots:parseInt(cForm.slots)||c.slots,logo:cForm.name.substring(0,2).toUpperCase()}:c)); showT("Company updated"); closeM(); };
  const deleteCompany=()=>{ setCompanies(p=>p.filter(c=>c.id!==deleteTarget.id)); showT(`${deleteTarget.name} removed`); closeM(); };
  const applyToDrive=(sid)=>{ const c=modalData.company,s=students.find(x=>x.id===sid); if(!s)return; const req=parseFloat((c.eligibility.match(/[\d.]+/)||[0])[0]); if(s.cgpa<req){showT(`${s.name} doesn't meet CGPA criteria`,"error");return;} if(s.status==="Placed"){showT(`Already placed`,"error");return;} setStudents(p=>p.map(x=>x.id===sid?{...x,status:"Applied",company:c.name}:x)); setCompanies(p=>p.map(x=>x.id===c.id?{...x,applied:x.applied+1}:x)); showT(`${s.name} applied to ${c.name}!`); closeM(); };
  const toggleCo=(id)=>{ setCompanies(p=>p.map(c=>c.id===id?{...c,status:c.status==="Open"?"Closed":"Open"}:c)); showT("Drive status toggled"); };
  const exportCSV=()=>{ const r=[["ID","Name","Branch","CGPA","Status","Company","Package"],...students.map(s=>[s.id,s.name,s.branch,s.cgpa,s.status,s.company,s.package])]; const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([r.map(x=>x.join(",")).join("\n")],{type:"text/csv"})); a.download="placement.csv"; a.click(); showT("CSV exported!"); };
  const genReport=()=>{ const p=students.filter(s=>s.status==="Placed"); const txt=`PLACETRACK REPORT\n${"=".repeat(40)}\nPlaced: ${p.length}/${students.length}\n${p.map(s=>`  ${s.name} → ${s.company} @ ${s.package}`).join("\n")}\n\n${new Date().toLocaleString()}`; const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain"})); a.download="report.txt"; a.click(); showT("Report downloaded!"); };
  const sendNotif=()=>{ if(!notifMsg.trim()){showT("Empty message","error");return;} showT(`Notified ${students.filter(s=>s.status==="Eligible"||s.status==="Applied").length} students`); setNotifMsg(""); closeM(); };
  const addCoord=()=>{ if(!coordForm.name.trim()||!coordForm.email.trim()){showT("Name & email required","error");return;} setCoords(p=>[...p,{id:Date.now(),...coordForm}]); showT(`${coordForm.name} added`); setCoordForm({name:"",role:"Coordinator",email:"",phone:""}); };

  const BtnP=({children,onClick,disabled,style={}})=><button className="btn-p" onClick={onClick} disabled={disabled} style={{ background:`linear-gradient(90deg,${T.cyanDim},${T.cyan})`, color:T.bg, border:"none", borderRadius:7, padding:"9px 16px", fontSize:11, fontWeight:700, cursor:disabled?"not-allowed":"pointer", fontFamily:"'Orbitron',monospace", letterSpacing:2, opacity:disabled?.4:1, ...style }}>
    {children}
  </button>;
  const BtnS=({children,onClick,style={}})=><button className="btn-s" onClick={onClick} style={{ background:"transparent", color:T.textMid, border:`1px solid ${T.border}`, borderRadius:7, padding:"8px 14px", fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", letterSpacing:1, ...style }}>
    {children}
  </button>;
  const BtnD=({children,onClick})=><button onClick={onClick} style={{ background:T.redFade, color:T.red, border:`1px solid ${T.red}30`, borderRadius:7, padding:"8px 14px", fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>
    {children}
  </button>;

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'Inter',sans-serif", color:T.text, position:"relative", overflow:"hidden" }}>
      <style>{GLOBAL_CSS}</style>
      <HexGrid/>
      <GlowOrb x={85} y={20} color={T.purple} size={400}/>
      <GlowOrb x={10} y={80} color={T.cyan} size={350}/>

      {/* SIDEBAR */}
      <div style={{ position:"fixed", left:0, top:0, bottom:0, width:220, background:"rgba(7,15,31,0.95)", backdropFilter:"blur(20px)", borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", zIndex:100 }}>
        {/* Top accent */}
        <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.cyan},transparent)` }}/>

        {/* Logo */}
        <div style={{ padding:"22px 20px 18px", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <LogoMark size={32}/>
            <div>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, fontWeight:900, color:T.cyan, letterSpacing:3, animation:"glow 3s ease-in-out infinite" }}>PLACE</div>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, fontWeight:900, color:T.textMid, letterSpacing:3 }}>TRACK</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding:"12px 10px", flex:1 }}>
          {NAV.map(n=>{
            const a=activeNav===n.id;
            return (
              <button key={n.id} className="nav-item" onClick={()=>setActiveNav(n.id)} style={{ width:"100%", textAlign:"left", padding:"11px 14px", marginBottom:4, borderRadius:7, border:a?`1px solid ${T.borderMid}`:"1px solid transparent", cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:2, background:a?`rgba(0,229,255,0.08)`:"transparent", color:a?T.cyan:T.textDim, transition:"all .18s", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:14 }}>{n.icon}</span>{n.label}
                {a&&<span style={{ marginLeft:"auto", width:5, height:5, borderRadius:"50%", background:T.cyan, animation:"pulse 2s infinite", boxShadow:`0 0 6px ${T.cyan}` }}/>}
              </button>
            );
          })}
        </div>

        {/* Stats strip */}
        <div style={{ padding:"10px 14px", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ fontSize:9, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2, marginBottom:8 }}>// PLACEMENT RATE</div>
          <CyberBar pct={students.length?Math.round(placed/students.length*100):0} color={T.cyan}/>
          <div style={{ fontSize:10, color:T.textMid, marginTop:5, fontFamily:"'Orbitron',monospace", fontWeight:700 }}>{students.length?Math.round(placed/students.length*100):0}%</div>
        </div>

        {/* User */}
        <div style={{ padding:"10px 12px 14px", position:"relative" }}>
          <div onClick={()=>setUserMenu(p=>!p)} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:7, background:"rgba(0,229,255,0.04)", border:`1px solid ${T.border}`, cursor:"pointer" }}>
            <Avatar name={user.name} size={28}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:11, fontWeight:600, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</div>
              <div style={{ fontSize:9, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1, marginTop:1 }}>{user.role.toUpperCase()}</div>
            </div>
            <span style={{ fontSize:9, color:T.textDim }}>▾</span>
          </div>
          {userMenu&&(
            <div style={{ position:"absolute", bottom:"110%", left:12, right:12, background:T.bgPanel, border:`1px solid ${T.borderMid}`, borderRadius:8, overflow:"hidden", zIndex:200, boxShadow:`0 0 30px rgba(0,229,255,0.1)` }}>
              <div style={{ padding:"10px 12px", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ fontSize:11, color:T.text }}>{user.name}</div>
                <div style={{ fontSize:10, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", marginTop:2 }}>{user.email}</div>
              </div>
              <button onClick={()=>{ setUserMenu(false); onLogout(); }} style={{ width:"100%", textAlign:"left", background:"none", border:"none", padding:"10px 12px", color:T.red, fontSize:11, fontFamily:"'Share Tech Mono',monospace", cursor:"pointer", letterSpacing:1 }}>
                ⏻ SIGN OUT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft:220, padding:"28px 32px 56px", minHeight:"100vh", position:"relative", zIndex:1 }}>

        {/* ── DASHBOARD ── */}
        {activeNav==="Dashboard"&&(
          <div style={{ animation:"fadeSlideUp .4s ease forwards" }}>
            <div style={{ marginBottom:28, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:T.textDim, letterSpacing:3, marginBottom:6 }}>// SYSTEM DASHBOARD</div>
                <h1 style={{ fontFamily:"'Orbitron',monospace", fontSize:22, fontWeight:900, color:T.cyan, margin:0, letterSpacing:2, animation:"glow 3s ease-in-out infinite" }}>CONTROL CENTER</h1>
                <p style={{ color:T.textMid, fontSize:12, marginTop:5, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>BATCH 2024–25 · WELCOME, {user.name.split(" ")[0].toUpperCase()}</p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <BtnS onClick={()=>setActiveNav("Students")}>VIEW STUDENTS</BtnS>
                <BtnS onClick={()=>setActiveNav("Companies")}>OPEN DRIVES</BtnS>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
              <StatCard label="TOTAL STUDENTS" value={students.length} sub="Registered this batch" color={T.cyan} icon="🎓"/>
              <StatCard label="PLACED" value={placed} sub={`${students.length?Math.round(placed/students.length*100):0}% placement rate`} color={T.green} icon="✅"/>
              <StatCard label="AVG PACKAGE" value={avgPkg} sub="Among placed students" color={T.purple} icon="💎"/>
              <StatCard label="OPEN DRIVES" value={openCo} sub="Companies hiring now" color={T.amber} icon="🏢"/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:18 }}>
              {/* Branch breakdown */}
              <div style={{ background:T.bgCard, borderRadius:10, padding:22, border:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${T.cyan}60,transparent)` }}/>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:T.textDim, letterSpacing:3, marginBottom:16 }}>// BRANCH-WISE PLACEMENT</div>
                {[["Computer Science",T.cyan],["IT",T.purple],["Electronics",T.amber],["Mechanical",T.green],["Civil","#ff6b9d"]].map(([b,col])=>{
                  const tot=students.filter(s=>s.branch===b).length;
                  const p=students.filter(s=>s.branch===b&&s.status==="Placed").length;
                  return (
                    <div key={b} style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:5 }}>
                        <span style={{ color:T.textMid, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{b.toUpperCase()}</span>
                        <span style={{ color:col, fontFamily:"'Orbitron',monospace", fontWeight:700, fontSize:11 }}>{p}/{tot||"—"}</span>
                      </div>
                      <CyberBar pct={tot?(p/tot)*100:0} color={col}/>
                    </div>
                  );
                })}
              </div>

              {/* Status summary */}
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  {label:"PLACED",    count:students.filter(s=>s.status==="Placed").length,    color:T.green,  fade:T.greenFade,  icon:"🎉"},
                  {label:"INTERVIEW", count:students.filter(s=>s.status==="Interview").length, color:T.amber,  fade:T.amberFade,  icon:"🤝"},
                  {label:"APPLIED",   count:students.filter(s=>s.status==="Applied").length,   color:T.cyan,   fade:T.cyanFade,   icon:"📋"},
                  {label:"ELIGIBLE",  count:students.filter(s=>s.status==="Eligible").length,  color:T.purple, fade:T.purpleFade, icon:"⭐"},
                ].map(item=>(
                  <div key={item.label} style={{ background:item.fade, borderRadius:9, padding:"13px 16px", border:`1px solid ${item.color}30`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <PulsingDot color={item.color}/>
                      <span style={{ fontSize:11, color:item.color, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2 }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize:24, fontWeight:700, fontFamily:"'Orbitron',monospace", color:item.color }}>{item.count}</span>
                  </div>
                ))}
                <BtnP onClick={()=>setActiveNav("Companies")} style={{ textAlign:"center" }}>EXPLORE DRIVES →</BtnP>
              </div>
            </div>

            {/* Recently placed */}
            <div style={{ background:T.bgCard, borderRadius:10, padding:22, border:`1px solid ${T.border}`, marginTop:18, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${T.green}60,transparent)` }}/>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:T.textDim, letterSpacing:3, marginBottom:14 }}>// RECENTLY PLACED</div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {students.filter(s=>s.status==="Placed").map(s=>(
                  <div key={s.id} style={{ background:T.greenFade, borderRadius:8, padding:"10px 14px", border:`1px solid ${T.green}30`, display:"flex", alignItems:"center", gap:10 }}>
                    <Avatar name={s.name} size={32}/>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{s.name}</div>
                      <div style={{ fontSize:10, color:T.green, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1, marginTop:2 }}>{s.company} · {s.package}</div>
                    </div>
                  </div>
                ))}
                {students.filter(s=>s.status==="Placed").length===0&&<div style={{ color:T.textDim, fontSize:12, fontFamily:"'Share Tech Mono',monospace" }}>NO PLACEMENTS YET</div>}
              </div>
            </div>
          </div>
        )}

        {/* ── STUDENTS ── */}
        {activeNav==="Students"&&(
          <div style={{ animation:"fadeSlideUp .4s ease forwards" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
              <div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:T.textDim, letterSpacing:3, marginBottom:5 }}>// STUDENT DATABASE</div>
                <h1 style={{ fontFamily:"'Orbitron',monospace", fontSize:20, fontWeight:900, color:T.cyan, margin:0, letterSpacing:2 }}>PROFILES</h1>
                <p style={{ color:T.textMid, fontSize:11, marginTop:4, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{filtered.length} OF {students.length} RECORDS</p>
              </div>
              <BtnP onClick={()=>{ setSForm({name:"",branch:"Computer Science",cgpa:"",skills:"",phone:"",email:"",year:"2024"}); setModal("addStudent"); }}>+ REGISTER</BtnP>
            </div>

            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="SEARCH NAME / BRANCH…" style={{ flex:1, minWidth:180, background:"rgba(0,229,255,0.03)", border:`1px solid ${T.border}`, borderRadius:7, padding:"9px 14px", color:T.text, fontSize:12, outline:"none", fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}/>
              {["All","Placed","Interview","Applied","Eligible"].map(f=>(
                <button key={f} className="filter-btn" onClick={()=>setFilter(f)} style={{ padding:"8px 14px", borderRadius:7, border:`1px solid ${filter===f?T.cyanDim:T.border}`, fontSize:10, fontWeight:700, cursor:"pointer", background:filter===f?`rgba(0,229,255,0.1)`:"transparent", color:filter===f?T.cyan:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2, transition:"all .15s" }}>{f.toUpperCase()}</button>
              ))}
            </div>

            <div style={{ display:"grid", gap:8 }}>
              {filtered.length===0&&<div style={{ textAlign:"center", color:T.textDim, padding:48, background:T.bgCard, borderRadius:10, border:`1px solid ${T.border}`, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2 }}>NO RECORDS FOUND</div>}
              {filtered.map(s=>{
                const exp=expandedId===s.id;
                return (
                  <div key={s.id} className="row-card" style={{ background:exp?"rgba(0,229,255,0.04)":T.bgCard, borderRadius:10, border:`1px solid ${exp?T.borderMid:T.border}`, overflow:"hidden", transition:"all .2s" }}>
                    <div onClick={()=>setExpandedId(exp?null:s.id)} style={{ padding:"14px 18px", display:"flex", alignItems:"center", gap:14, cursor:"pointer" }}>
                      <Avatar name={s.name}/>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:13, fontWeight:600, color:T.text }}>{s.name}</span>
                          <Badge status={s.status}/>
                        </div>
                        <div style={{ fontSize:11, color:T.textDim, marginTop:3, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{s.branch.toUpperCase()} · CGPA <span style={{ color:T.cyan }}>{s.cgpa}</span></div>
                      </div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"flex-end", maxWidth:180 }}>
                        {s.skills.slice(0,3).map(sk=><span key={sk} style={{ fontSize:9, padding:"3px 8px", borderRadius:4, background:"rgba(0,229,255,0.06)", color:T.textMid, border:`1px solid ${T.border}`, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{sk}</span>)}
                      </div>
                      <div style={{ minWidth:100, textAlign:"right" }}>
                        <div style={{ fontSize:12, fontWeight:600, color:s.company!=="—"?T.green:T.textDim }}>{s.company}</div>
                        <div style={{ fontSize:10, color:T.textDim, fontFamily:"'Orbitron',monospace", marginTop:2 }}>{s.package}</div>
                      </div>
                      <span style={{ color:T.textDim, fontSize:12, marginLeft:8 }}>{exp?"▲":"▼"}</span>
                    </div>
                    {exp&&(
                      <div style={{ padding:"0 18px 16px", borderTop:`1px solid ${T.border}` }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, margin:"14px 0 14px" }}>
                          {[["EMAIL",s.email||"—"],["PHONE",s.phone||"—"],["BATCH",s.year]].map(([k,v])=>(
                            <div key={k} style={{ background:"rgba(0,229,255,0.03)", borderRadius:7, padding:"9px 12px", border:`1px solid ${T.border}` }}>
                              <div style={{ fontSize:9, color:T.textDim, marginBottom:4, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2 }}>{k}</div>
                              <div style={{ fontSize:11, color:T.textMid }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          <BtnS onClick={()=>{ setSForm({name:s.name,branch:s.branch,cgpa:String(s.cgpa),skills:s.skills.join(", "),phone:s.phone,email:s.email,year:String(s.year)}); setModalData({id:s.id}); setModal("editStudent"); }}>✏ EDIT</BtnS>
                          <BtnS onClick={()=>{ setStatusForm({status:s.status,company:s.company==="—"?"":s.company,package:s.package==="—"?"":s.package}); setModalData({id:s.id}); setModal("updateStatus"); }}>⟳ STATUS</BtnS>
                          <BtnD onClick={()=>{ setDeleteTarget({type:"student",id:s.id,name:s.name}); setModal("deleteConfirm"); }}>✕ DELETE</BtnD>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── COMPANIES ── */}
        {activeNav==="Companies"&&(
          <div style={{ animation:"fadeSlideUp .4s ease forwards" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:T.textDim, letterSpacing:3, marginBottom:5 }}>// RECRUITMENT DRIVES</div>
                <h1 style={{ fontFamily:"'Orbitron',monospace", fontSize:20, fontWeight:900, color:T.cyan, margin:0, letterSpacing:2 }}>COMPANIES</h1>
                <p style={{ color:T.textMid, fontSize:11, marginTop:4, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{companies.length} PARTNERS · {openCo} ACTIVE</p>
              </div>
              <BtnP onClick={()=>{ setCForm({name:"",sector:"IT Services",roles:"",package:"",eligibility:"",deadline:"",slots:""}); setModal("addCompany"); }}>+ ADD COMPANY</BtnP>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
              {companies.map(c=>(
                <div key={c.id} className="co-card" style={{ background:T.bgCard, borderRadius:10, padding:20, border:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${c.status==="Open"?T.green:T.red}60,transparent)` }}/>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:8, background:`rgba(0,229,255,0.08)`, border:`1px solid ${T.borderMid}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Orbitron',monospace", fontWeight:900, fontSize:12, color:T.cyan, flexShrink:0, letterSpacing:1 }}>{c.logo}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:14, fontWeight:600, color:T.text }}>{c.name}</span>
                        <span style={{ fontSize:9, padding:"2px 8px", borderRadius:3, background:c.status==="Open"?T.greenFade:T.redFade, color:c.status==="Open"?T.green:T.red, border:`1px solid ${c.status==="Open"?T.green:T.red}40`, fontFamily:"'Orbitron',monospace", letterSpacing:2, fontWeight:700 }}>{c.status.toUpperCase()}</span>
                      </div>
                      <div style={{ fontSize:10, color:T.textDim, marginTop:2, fontFamily:"'Share Tech Mono',monospace" }}>{c.sector.toUpperCase()}</div>
                    </div>
                    <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, fontWeight:700, color:T.purple }}>{c.package}</div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                    {[["ROLES",Array.isArray(c.roles)?c.roles.join(", "):c.roles],["ELIGIBILITY",c.eligibility],["DEADLINE",c.deadline],["SLOTS",`${c.applied}/${c.slots} FILLED`]].map(([k,v])=>(
                      <div key={k} style={{ background:"rgba(0,229,255,0.03)", borderRadius:6, padding:"8px 10px", border:`1px solid ${T.border}` }}>
                        <div style={{ fontSize:9, color:T.textDim, marginBottom:3, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2 }}>{k}</div>
                        <div style={{ fontSize:11, color:T.textMid }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <CyberBar pct={(c.applied/c.slots)*100} color={c.status==="Open"?T.green:T.red}/>
                  <div style={{ fontSize:9, color:T.textDim, marginTop:4, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{Math.round((c.applied/c.slots)*100)}% CAPACITY</div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:14 }}>
                    <BtnP onClick={()=>{ setModalData({company:c}); setModal("applyDrive"); }} disabled={c.status==="Closed"} style={{ padding:"7px 12px", fontSize:10 }}>APPLY STUDENTS</BtnP>
                    <BtnS onClick={()=>{ setCForm({name:c.name,sector:c.sector,roles:Array.isArray(c.roles)?c.roles.join(", "):c.roles,package:c.package,eligibility:c.eligibility,deadline:c.deadline,slots:String(c.slots)}); setModalData({id:c.id}); setModal("editCompany"); }}>✏ EDIT</BtnS>
                    <BtnS onClick={()=>toggleCo(c.id)}>{c.status==="Open"?"🔒 CLOSE":"🔓 OPEN"}</BtnS>
                    <BtnD onClick={()=>{ setDeleteTarget({type:"company",id:c.id,name:c.name}); setModal("deleteConfirm"); }}>✕</BtnD>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ADMIN ── */}
        {activeNav==="Admin"&&(
          <div style={{ animation:"fadeSlideUp .4s ease forwards" }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:T.textDim, letterSpacing:3, marginBottom:5 }}>// ADMIN PANEL</div>
              <h1 style={{ fontFamily:"'Orbitron',monospace", fontSize:20, fontWeight:900, color:T.cyan, margin:0, letterSpacing:2 }}>CONTROL OPS</h1>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginBottom:18 }}>
              {[
                {title:"EXPORT DATA",     desc:"Download full student list as CSV",      icon:"⬇",  btn:"EXPORT CSV",    action:exportCSV,          color:T.cyan},
                {title:"GEN REPORT",      desc:"Download placement summary report",       icon:"📊", btn:"DOWNLOAD REPORT",action:genReport,          color:T.purple},
                {title:"NOTIFICATIONS",   desc:"Alert eligible & applied students",       icon:"◈",  btn:"COMPOSE",       action:()=>setModal("sendNotif"), color:T.amber},
                {title:"COORDINATORS",    desc:"Manage TPO coordinator accounts",         icon:"◉",  btn:"MANAGE",        action:()=>setModal("manageCoord"),color:T.green},
              ].map(a=>(
                <div key={a.title} style={{ background:T.bgCard, borderRadius:10, padding:22, border:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${a.color}50,transparent)` }}/>
                  <div style={{ fontSize:24, marginBottom:10, color:a.color }}>{a.icon}</div>
                  <div style={{ fontFamily:"'Orbitron',monospace", fontSize:11, fontWeight:700, color:T.text, letterSpacing:2, marginBottom:6 }}>{a.title}</div>
                  <div style={{ fontSize:11, color:T.textDim, marginBottom:16, lineHeight:1.6 }}>{a.desc}</div>
                  <button className="btn-s" onClick={a.action} style={{ background:"transparent", color:a.color, border:`1px solid ${a.color}40`, borderRadius:7, padding:"8px 14px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", letterSpacing:2 }}>{a.btn}</button>
                </div>
              ))}
            </div>
            <div style={{ background:T.bgCard, borderRadius:10, padding:22, border:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${T.cyan}40,transparent)` }}/>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:T.textDim, letterSpacing:3, marginBottom:16 }}>// LIVE SYSTEM STATS</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
                {[["STUDENTS",students.length,T.cyan],["PLACED",placed,T.green],["COMPANIES",companies.length,T.purple],["OPEN DRIVES",openCo,T.amber]].map(([k,v,col])=>(
                  <div key={k} style={{ background:"rgba(0,229,255,0.03)", borderRadius:8, padding:"14px", border:`1px solid ${T.border}`, textAlign:"center" }}>
                    <div style={{ fontFamily:"'Orbitron',monospace", fontSize:26, fontWeight:700, color:col, animation:"glow 3s ease-in-out infinite" }}>{v}</div>
                    <div style={{ fontSize:9, color:T.textDim, marginTop:6, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2 }}>{k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {modal==="addStudent"&&<Modal title="// REGISTER STUDENT" onClose={closeM}>
        <Field label="// FULL NAME *" value={sForm.name} onChange={v=>setSForm({...sForm,name:v})}/>
        <Field label="// BRANCH *" value={sForm.branch} onChange={v=>setSForm({...sForm,branch:v})} options={["Computer Science","IT","Electronics","Mechanical","Civil","Chemical","Other"]}/>
        <Field label="// CGPA *" value={sForm.cgpa} onChange={v=>setSForm({...sForm,cgpa:v})} type="number"/>
        <Field label="// SKILLS (COMMA SEP)" value={sForm.skills} onChange={v=>setSForm({...sForm,skills:v})}/>
        <Field label="// EMAIL" value={sForm.email} onChange={v=>setSForm({...sForm,email:v})} type="email"/>
        <Field label="// PHONE" value={sForm.phone} onChange={v=>setSForm({...sForm,phone:v})}/>
        <Field label="// BATCH YEAR" value={sForm.year} onChange={v=>setSForm({...sForm,year:v})} options={["2023","2024","2025"]}/>
        <div style={{display:"flex",gap:10,marginTop:8}}><BtnP onClick={addStudent} style={{flex:1,textAlign:"center"}}>REGISTER</BtnP><BtnS onClick={closeM} style={{flex:1,textAlign:"center"}}>CANCEL</BtnS></div>
      </Modal>}

      {modal==="editStudent"&&<Modal title="// EDIT PROFILE" onClose={closeM}>
        <Field label="// FULL NAME *" value={sForm.name} onChange={v=>setSForm({...sForm,name:v})}/>
        <Field label="// BRANCH *" value={sForm.branch} onChange={v=>setSForm({...sForm,branch:v})} options={["Computer Science","IT","Electronics","Mechanical","Civil","Chemical","Other"]}/>
        <Field label="// CGPA *" value={sForm.cgpa} onChange={v=>setSForm({...sForm,cgpa:v})} type="number"/>
        <Field label="// SKILLS" value={sForm.skills} onChange={v=>setSForm({...sForm,skills:v})}/>
        <Field label="// EMAIL" value={sForm.email} onChange={v=>setSForm({...sForm,email:v})} type="email"/>
        <Field label="// PHONE" value={sForm.phone} onChange={v=>setSForm({...sForm,phone:v})}/>
        <div style={{display:"flex",gap:10,marginTop:8}}><BtnP onClick={editStudent} style={{flex:1,textAlign:"center"}}>SAVE</BtnP><BtnS onClick={closeM} style={{flex:1,textAlign:"center"}}>CANCEL</BtnS></div>
      </Modal>}

      {modal==="updateStatus"&&<Modal title="// UPDATE STATUS" onClose={closeM}>
        <Field label="// STATUS" value={statusForm.status} onChange={v=>setStatusForm({...statusForm,status:v})} options={["Eligible","Applied","Interview","Placed"]}/>
        <Field label="// COMPANY" value={statusForm.company} onChange={v=>setStatusForm({...statusForm,company:v})}/>
        <Field label="// PACKAGE (e.g. 12 LPA)" value={statusForm.package} onChange={v=>setStatusForm({...statusForm,package:v})}/>
        <div style={{display:"flex",gap:10,marginTop:8}}><BtnP onClick={saveStatus} style={{flex:1,textAlign:"center"}}>SAVE</BtnP><BtnS onClick={closeM} style={{flex:1,textAlign:"center"}}>CANCEL</BtnS></div>
      </Modal>}

      {modal==="addCompany"&&<Modal title="// ADD COMPANY" onClose={closeM}>
        <Field label="// COMPANY NAME *" value={cForm.name} onChange={v=>setCForm({...cForm,name:v})}/>
        <Field label="// SECTOR" value={cForm.sector} onChange={v=>setCForm({...cForm,sector:v})} options={["IT Services","Product","Semiconductor","Infrastructure","Finance","Healthcare","Other"]}/>
        <Field label="// ROLES (COMMA SEP)" value={cForm.roles} onChange={v=>setCForm({...cForm,roles:v})}/>
        <Field label="// PACKAGE RANGE" value={cForm.package} onChange={v=>setCForm({...cForm,package:v})}/>
        <Field label="// ELIGIBILITY" value={cForm.eligibility} onChange={v=>setCForm({...cForm,eligibility:v})}/>
        <Field label="// DEADLINE" value={cForm.deadline} onChange={v=>setCForm({...cForm,deadline:v})} type="date"/>
        <Field label="// SLOTS" value={cForm.slots} onChange={v=>setCForm({...cForm,slots:v})} type="number"/>
        <div style={{display:"flex",gap:10,marginTop:8}}><BtnP onClick={addCompany} style={{flex:1,textAlign:"center"}}>ADD</BtnP><BtnS onClick={closeM} style={{flex:1,textAlign:"center"}}>CANCEL</BtnS></div>
      </Modal>}

      {modal==="editCompany"&&<Modal title="// EDIT COMPANY" onClose={closeM}>
        <Field label="// COMPANY NAME *" value={cForm.name} onChange={v=>setCForm({...cForm,name:v})}/>
        <Field label="// SECTOR" value={cForm.sector} onChange={v=>setCForm({...cForm,sector:v})} options={["IT Services","Product","Semiconductor","Infrastructure","Finance","Healthcare","Other"]}/>
        <Field label="// ROLES" value={cForm.roles} onChange={v=>setCForm({...cForm,roles:v})}/>
        <Field label="// PACKAGE" value={cForm.package} onChange={v=>setCForm({...cForm,package:v})}/>
        <Field label="// ELIGIBILITY" value={cForm.eligibility} onChange={v=>setCForm({...cForm,eligibility:v})}/>
        <Field label="// DEADLINE" value={cForm.deadline} onChange={v=>setCForm({...cForm,deadline:v})} type="date"/>
        <Field label="// SLOTS" value={cForm.slots} onChange={v=>setCForm({...cForm,slots:v})} type="number"/>
        <div style={{display:"flex",gap:10,marginTop:8}}><BtnP onClick={editCompany} style={{flex:1,textAlign:"center"}}>SAVE</BtnP><BtnS onClick={closeM} style={{flex:1,textAlign:"center"}}>CANCEL</BtnS></div>
      </Modal>}

      {modal==="applyDrive"&&modalData.company&&<Modal title={`// APPLY TO ${modalData.company.name.toUpperCase()}`} onClose={closeM}>
        <div style={{ background:"rgba(0,229,255,0.04)", borderRadius:8, padding:12, marginBottom:16, fontSize:11, border:`1px solid ${T.border}`, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1, color:T.textMid }}>
          ELIGIBILITY: <span style={{color:T.cyan}}>{modalData.company.eligibility}</span> &nbsp;·&nbsp; PKG: <span style={{color:T.purple}}>{modalData.company.package}</span>
        </div>
        <div style={{ maxHeight:300, overflowY:"auto", display:"grid", gap:8 }}>
          {students.filter(s=>s.status!=="Placed").map(s=>{
            const req=parseFloat((modalData.company.eligibility.match(/[\d.]+/)||[0])[0]);
            const ok=s.cgpa>=req;
            return (
              <div key={s.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:8, background:ok?"rgba(0,229,255,0.03)":T.redFade, border:`1px solid ${ok?T.border:`${T.red}30`}`, opacity:ok?1:.55 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Avatar name={s.name} size={30}/>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{s.name}</div>
                    <div style={{ fontSize:10, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{s.branch} · {s.cgpa} · {s.status.toUpperCase()}</div>
                  </div>
                </div>
                <BtnP onClick={()=>applyToDrive(s.id)} disabled={!ok} style={{ padding:"5px 12px", fontSize:9 }}>APPLY</BtnP>
              </div>
            );
          })}
          {students.filter(s=>s.status!=="Placed").length===0&&<div style={{textAlign:"center",color:T.textDim,padding:20,fontFamily:"'Share Tech Mono',monospace"}}>ALL PLACED</div>}
        </div>
        <BtnS onClick={closeM} style={{width:"100%",textAlign:"center",marginTop:12}}>CLOSE</BtnS>
      </Modal>}

      {modal==="sendNotif"&&<Modal title="// BROADCAST NOTIFICATION" onClose={closeM}>
        <div style={{ background:T.cyanFade, borderRadius:8, padding:12, marginBottom:14, fontSize:11, border:`1px solid ${T.borderMid}`, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1, color:T.cyan }}>
          TARGET: {students.filter(s=>s.status==="Eligible"||s.status==="Applied").length} RECIPIENTS
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={labelStyle}>// MESSAGE</label>
          <textarea value={notifMsg} onChange={e=>setNotifMsg(e.target.value)} rows={5} style={{ ...inputStyle, resize:"vertical", fontFamily:"'Share Tech Mono',monospace", fontSize:12, letterSpacing:1 }}/>
        </div>
        <div style={{display:"flex",gap:10}}><BtnP onClick={sendNotif} style={{flex:1,textAlign:"center"}}>BROADCAST</BtnP><BtnS onClick={closeM} style={{flex:1,textAlign:"center"}}>CANCEL</BtnS></div>
      </Modal>}

      {modal==="manageCoord"&&<Modal title="// MANAGE COORDINATORS" onClose={closeM}>
        <div style={{ marginBottom:18 }}>
          {coords.map(co=>(
            <div key={co.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:8, background:"rgba(0,229,255,0.03)", marginBottom:8, border:`1px solid ${T.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <Avatar name={co.name} size={32}/>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{co.name}</div>
                  <div style={{ fontSize:10, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:1 }}>{co.role.toUpperCase()} · {co.email}</div>
                </div>
              </div>
              <BtnD onClick={()=>{ setCoords(p=>p.filter(x=>x.id!==co.id)); showT(`${co.name} removed`); }}>✕</BtnD>
            </div>
          ))}
          {coords.length===0&&<div style={{color:T.textDim,textAlign:"center",padding:16,fontFamily:"'Share Tech Mono',monospace",fontSize:11}}>NO COORDINATORS</div>}
        </div>
        <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:16 }}>
          <div style={{ fontSize:9, color:T.textDim, fontFamily:"'Share Tech Mono',monospace", letterSpacing:2, marginBottom:12 }}>// ADD NEW COORDINATOR</div>
          <Field label="// NAME *" value={coordForm.name} onChange={v=>setCoordForm({...coordForm,name:v})}/>
          <Field label="// ROLE" value={coordForm.role} onChange={v=>setCoordForm({...coordForm,role:v})} options={["TPO Head","Coordinator","Assistant Coordinator"]}/>
          <Field label="// EMAIL *" value={coordForm.email} onChange={v=>setCoordForm({...coordForm,email:v})} type="email"/>
          <Field label="// PHONE" value={coordForm.phone} onChange={v=>setCoordForm({...coordForm,phone:v})}/>
          <BtnP onClick={addCoord} style={{width:"100%",textAlign:"center"}}>+ ADD</BtnP>
        </div>
        <BtnS onClick={closeM} style={{width:"100%",textAlign:"center",marginTop:10}}>DONE</BtnS>
      </Modal>}

      {modal==="deleteConfirm"&&deleteTarget&&<Modal title="// CONFIRM DELETE" onClose={closeM}>
        <div style={{ textAlign:"center", padding:"10px 0 22px" }}>
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:36, color:T.red, animation:"pulse 1s infinite", marginBottom:12 }}>⚠</div>
          <div style={{ fontSize:14, color:T.text, marginBottom:8 }}>Delete <span style={{color:T.cyan,fontWeight:600}}>{deleteTarget.name}</span>?</div>
          <div style={{ fontSize:11, color:T.textDim, fontFamily:"'Share Tech Mono',monospace" }}>THIS ACTION CANNOT BE UNDONE</div>
        </div>
        <div style={{display:"flex",gap:10}}><BtnD onClick={deleteTarget.type==="student"?deleteStudent:deleteCompany}>YES, DELETE</BtnD><BtnS onClick={closeM} style={{flex:1,textAlign:"center"}}>CANCEL</BtnS></div>
      </Modal>}

      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [accounts,setAccounts]=useState(SEED_ACCOUNTS);
  const [user,setUser]=useState(null);
  if(!user) return <AuthPage onLogin={setUser} accounts={accounts} setAccounts={setAccounts}/>;
  return <Dashboard user={user} onLogout={()=>setUser(null)}/>;
}