import { useState, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');`;

const styles = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0b;
    --surface: #111114;
    --surface2: #1a1a1f;
    --border: #2a2a32;
    --border-bright: #3d3d4a;
    --amber: #f5a623;
    --amber-dim: #c4851c;
    --amber-glow: rgba(245,166,35,0.12);
    --green: #4ade80;
    --red: #f87171;
    --yellow: #fbbf24;
    --text: #e8e8ee;
    --text-muted: #6b6b7e;
    --text-dim: #9999aa;
    --mono: 'IBM Plex Mono', monospace;
    --head: 'Syne', sans-serif;
    --body: 'Lora', serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--body); min-height: 100vh; }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* HEADER */
  .header {
    border-bottom: 1px solid var(--border);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--surface);
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .logo-mark {
    width: 36px;
    height: 36px;
    background: var(--amber);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--mono);
    font-weight: 500;
    font-size: 14px;
    color: #000;
    letter-spacing: -0.5px;
  }
  .logo-text {
    font-family: var(--head);
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.3px;
  }
  .logo-text span { color: var(--amber); }
  .badge {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--amber);
    border: 1px solid var(--amber-dim);
    background: var(--amber-glow);
    padding: 4px 10px;
    border-radius: 20px;
    letter-spacing: 0.5px;
  }

  /* MAIN LAYOUT */
  .main {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  /* INPUT PANEL */
  .input-panel {
    border-right: 1px solid var(--border);
    padding: 36px 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .panel-title {
    font-family: var(--head);
    font-weight: 800;
    font-size: 24px;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }
  .panel-subtitle {
    font-size: 14px;
    color: var(--text-muted);
    margin-top: 6px;
    font-family: var(--mono);
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .field-label {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    color: var(--amber);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .field-label .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--amber);
    display: inline-block;
  }

  .upload-zone {
    border: 1.5px dashed var(--border-bright);
    border-radius: 12px;
    padding: 28px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background: var(--surface);
    position: relative;
    overflow: hidden;
  }
  .upload-zone:hover, .upload-zone.drag-over {
    border-color: var(--amber);
    background: var(--amber-glow);
  }
  .upload-zone.has-file {
    border-style: solid;
    border-color: var(--amber-dim);
    background: var(--amber-glow);
  }
  .upload-icon {
    font-size: 28px;
    margin-bottom: 10px;
    display: block;
  }
  .upload-text {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--text-dim);
  }
  .upload-text strong {
    color: var(--amber);
    font-weight: 500;
  }
  .upload-hint {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 6px;
    font-family: var(--mono);
  }
  .file-name {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--amber);
    font-weight: 500;
    word-break: break-all;
  }

  textarea {
    width: 100%;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    color: var(--text);
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.7;
    resize: vertical;
    min-height: 160px;
    outline: none;
    transition: border-color 0.2s ease;
  }
  textarea:focus {
    border-color: var(--amber-dim);
  }
  textarea::placeholder { color: var(--text-muted); }

  .analyze-btn {
    width: 100%;
    padding: 16px;
    background: var(--amber);
    color: #000;
    border: none;
    border-radius: 12px;
    font-family: var(--head);
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.3px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .analyze-btn:hover:not(:disabled) {
    background: #ffbc44;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(245,166,35,0.3);
  }
  .analyze-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* OUTPUT PANEL */
  .output-panel {
    padding: 36px 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;
    overflow-y: auto;
  }

  /* EMPTY STATE */
  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 16px;
    padding: 40px;
  }
  .empty-icon {
    font-size: 48px;
    opacity: 0.3;
  }
  .empty-text {
    font-family: var(--head);
    font-size: 20px;
    font-weight: 700;
    color: var(--text-muted);
  }
  .empty-sub {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--text-muted);
    max-width: 300px;
    line-height: 1.6;
  }

  /* LOADING */
  .loading-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .spinner-wrap {
    position: relative;
    width: 60px; height: 60px;
  }
  .spinner {
    width: 60px; height: 60px;
    border: 2px solid var(--border);
    border-top-color: var(--amber);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--text-muted);
  }
  .loading-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 240px;
  }
  .loading-step {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fadeSlide 0.4s forwards;
  }
  .loading-step.active { color: var(--amber); }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateX(-8px); }
    to { opacity: 1; transform: translateX(0); }
  }

  /* RESULTS */
  .results { display: flex; flex-direction: column; gap: 24px; animation: fadeIn 0.5s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  /* SCORE CARD */
  .score-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    display: flex;
    align-items: center;
    gap: 28px;
    position: relative;
    overflow: hidden;
  }
  .score-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 0% 50%, var(--amber-glow) 0%, transparent 70%);
    pointer-events: none;
  }
  .score-ring {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  .score-ring svg {
    transform: rotate(-90deg);
    width: 100px; height: 100px;
  }
  .score-ring .track { fill: none; stroke: var(--border); stroke-width: 6; }
  .score-ring .fill { fill: none; stroke-width: 6; stroke-linecap: round; transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1); }
  .score-number {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .score-val {
    font-family: var(--head);
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
  }
  .score-pct {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
  }
  .score-info { flex: 1; }
  .score-label {
    font-family: var(--head);
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.3px;
    margin-bottom: 6px;
  }
  .score-verdict {
    font-size: 14px;
    color: var(--text-dim);
    line-height: 1.6;
  }
  .score-tier {
    display: inline-block;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* SECTION CARDS */
  .section-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .section-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface2);
  }
  .section-icon { font-size: 16px; }
  .section-title {
    font-family: var(--head);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.2px;
    flex: 1;
  }
  .section-count {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    background: var(--border);
    padding: 2px 8px;
    border-radius: 10px;
  }
  .section-body { padding: 20px; display: flex; flex-direction: column; gap: 12px; }

  /* ITEMS */
  .item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 14px;
    border-radius: 10px;
    background: var(--surface2);
    border: 1px solid var(--border);
    transition: border-color 0.2s;
  }
  .item:hover { border-color: var(--border-bright); }
  .item-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .item-text { font-size: 14px; line-height: 1.6; color: var(--text-dim); }
  .item-text strong { color: var(--text); font-weight: 600; font-family: var(--head); }

  /* SKILL TAGS */
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; padding: 16px 20px; }
  .tag {
    font-family: var(--mono);
    font-size: 12px;
    padding: 5px 12px;
    border-radius: 6px;
    border: 1px solid;
  }
  .tag.match { color: var(--green); border-color: rgba(74,222,128,0.3); background: rgba(74,222,128,0.08); }
  .tag.missing { color: var(--red); border-color: rgba(248,113,113,0.3); background: rgba(248,113,113,0.08); }

  /* QUICK STATS */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .stat-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .stat-val {
    font-family: var(--head);
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  /* RESET BTN */
  .reset-btn {
    width: 100%;
    padding: 12px;
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-family: var(--mono);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .reset-btn:hover {
    border-color: var(--border-bright);
    color: var(--text);
  }

  @media (max-width: 900px) {
    .main { grid-template-columns: 1fr; }
    .input-panel { border-right: none; border-bottom: 1px solid var(--border); }
    .header { padding: 16px 20px; }
    .input-panel, .output-panel { padding: 24px 20px; }
  }
`;

function ScoreRing({ score }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const color = score >= 75 ? "#4ade80" : score >= 50 ? "#f5a623" : "#f87171";
  const offset = circ - (score / 100) * circ;
  return (
    <div className="score-ring">
      <svg viewBox="0 0 100 100">
        <circle className="track" cx="50" cy="50" r={r} />
        <circle
          className="fill"
          cx="50" cy="50" r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-number">
        <span className="score-val" style={{ color }}>{score}</span>
        <span className="score-pct">/ 100</span>
      </div>
    </div>
  );
}

function getTier(score) {
  if (score >= 85) return { label: "Excellent Match", bg: "rgba(74,222,128,0.12)", color: "#4ade80" };
  if (score >= 70) return { label: "Good Match", bg: "rgba(245,166,35,0.12)", color: "#f5a623" };
  if (score >= 50) return { label: "Partial Match", bg: "rgba(251,191,36,0.12)", color: "#fbbf24" };
  return { label: "Weak Match", bg: "rgba(248,113,113,0.12)", color: "#f87171" };
}

const LOADING_STEPS = [
  "Parsing resume content...",
  "Analyzing job requirements...",
  "Matching skills & keywords...",
  "Generating improvement tips...",
  "Preparing your report...",
];

export default function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();
  const stepTimer = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    setResumeFile(file);

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      try {
        if (!window.pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          fullText += content.items.map((item) => item.str).join(" ") + " ";
        }
        setResumeText(fullText);
      } catch (e) {
        setError("Failed to read PDF. Please paste your resume text instead.");
        setResumeFile(null);
      }
    } else {
      const text = await file.text();
      setResumeText(text);
    }
  };

  const analyze = async () => {
    if ((!resumeText && !resumeFile) || !jobDesc.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    setLoadStep(0);

    let step = 0;
    stepTimer.current = setInterval(() => {
      step++;
      if (step < LOADING_STEPS.length) setLoadStep(step);
    }, 900);

    const prompt = `You are an expert resume analyst and career coach. Analyze the following resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDesc}

Return ONLY a JSON object (no markdown, no backticks) with exactly this structure:
{
  "score": <integer 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "matchedSkills": ["skill1", "skill2", ...],
  "missingSkills": ["skill1", "skill2", ...],
  "strengths": [
    {"title": "...", "detail": "..."},
    ...
  ],
  "improvements": [
    {"title": "...", "detail": "..."},
    ...
  ],
  "keywordGaps": ["keyword1", "keyword2", ...],
  "quickWins": [
    {"title": "...", "detail": "..."},
    ...
  ]
}
Provide 3-5 items per array. Be specific, actionable, and honest.`;

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.4,
          max_tokens: 1500,
        }),
      });
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "";
      const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      const json = JSON.parse(jsonMatch[0]);
      clearInterval(stepTimer.current);
      setResult(json);
    } catch (e) {
      clearInterval(stepTimer.current);
      setError("Analysis failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setResumeFile(null);
    setResumeText("");
    setJobDesc("");
  };

  const canAnalyze = (resumeText || resumeFile) && jobDesc.trim().length > 20 && !loading;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="logo">
            <div className="logo-mark">RA</div>
            <div className="logo-text">Resume<span>AI</span></div>
          </div>
          <div className="badge">AI-POWERED</div>
        </header>

        <div className="main">
          {/* INPUT PANEL */}
          <div className="input-panel">
            <div>
              <h1 className="panel-title">Analyze Your<br />Resume Match</h1>
              <p className="panel-subtitle">Upload resume + paste job description → get scored</p>
            </div>

            {/* Resume Upload */}
            <div className="field-group">
              <div className="field-label"><span className="dot" />Resume</div>
              <div
                className={`upload-zone ${drag ? "drag-over" : ""} ${resumeFile ? "has-file" : ""}`}
                onClick={() => fileRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".txt,.pdf,.doc,.docx,.md"
                  style={{ display: "none" }}
                  onChange={e => handleFile(e.target.files[0])}
                />
                {resumeFile ? (
                  <>
                    <span className="upload-icon">✅</span>
                    <div className="file-name">{resumeFile.name}</div>
                    <div className="upload-hint">Click to replace</div>
                  </>
                ) : (
                  <>
                    <span className="upload-icon">📄</span>
                    <div className="upload-text"><strong>Click to upload</strong> or drag & drop</div>
                    <div className="upload-hint">TXT, PDF, DOC, DOCX — or paste below</div>
                  </>
                )}
              </div>
              <textarea
                placeholder="Or paste your resume text here..."
                value={resumeText}
                onChange={e => { setResumeText(e.target.value); if (e.target.value) setResumeFile(null); }}
                style={{ minHeight: "120px" }}
              />
            </div>

            {/* Job Description */}
            <div className="field-group">
              <div className="field-label"><span className="dot" />Job Description</div>
              <textarea
                placeholder="Paste the full job description here — requirements, responsibilities, qualifications..."
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                style={{ minHeight: "180px" }}
              />
            </div>

            <button className="analyze-btn" onClick={analyze} disabled={!canAnalyze}>
              {loading ? (
                <>
                  <span style={{ fontSize: 16 }}>⟳</span> Analyzing...
                </>
              ) : (
                <>
                  <span>⚡</span> Analyze Match
                </>
              )}
            </button>

            {error && (
              <div style={{ color: "#f87171", fontFamily: "var(--mono)", fontSize: 13, padding: "12px", background: "rgba(248,113,113,0.08)", borderRadius: 8, border: "1px solid rgba(248,113,113,0.2)" }}>
                {error}
              </div>
            )}
          </div>

          {/* OUTPUT PANEL */}
          <div className="output-panel">
            {loading ? (
              <div className="loading-state">
                <div className="spinner-wrap">
                  <div className="spinner" />
                </div>
                <div className="loading-steps">
                  {LOADING_STEPS.map((s, i) => (
                    <div
                      key={i}
                      className={`loading-step ${i <= loadStep ? "active" : ""}`}
                      style={{ animationDelay: `${i * 0.9}s` }}
                    >
                      <span>{i < loadStep ? "✓" : i === loadStep ? "›" : "·"}</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ) : result ? (
              <div className="results">
                {/* Score Card */}
                {(() => {
                  const tier = getTier(result.score);
                  return (
                    <div className="score-card">
                      <ScoreRing score={result.score} />
                      <div className="score-info">
                        <span className="score-tier" style={{ background: tier.bg, color: tier.color }}>{tier.label}</span>
                        <div className="score-label" style={{ color: tier.color }}>Match Score: {result.score}/100</div>
                        <div className="score-verdict">{result.summary}</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Quick Stats */}
                <div className="stats-row">
                  <div className="stat-box">
                    <div className="stat-val" style={{ color: "#4ade80" }}>{result.matchedSkills?.length || 0}</div>
                    <div className="stat-label">Skills Matched</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val" style={{ color: "#f87171" }}>{result.missingSkills?.length || 0}</div>
                    <div className="stat-label">Skills Missing</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-val" style={{ color: "#f5a623" }}>{result.quickWins?.length || 0}</div>
                    <div className="stat-label">Quick Wins</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="section-card">
                  <div className="section-header">
                    <span className="section-icon">🎯</span>
                    <span className="section-title">Skills Analysis</span>
                  </div>
                  <div className="tags-wrap">
                    {result.matchedSkills?.map((s, i) => <span key={i} className="tag match">✓ {s}</span>)}
                    {result.missingSkills?.map((s, i) => <span key={i} className="tag missing">✗ {s}</span>)}
                  </div>
                </div>

                {/* Strengths */}
                <div className="section-card">
                  <div className="section-header">
                    <span className="section-icon">💪</span>
                    <span className="section-title">Strengths</span>
                    <span className="section-count">{result.strengths?.length}</span>
                  </div>
                  <div className="section-body">
                    {result.strengths?.map((s, i) => (
                      <div key={i} className="item">
                        <span className="item-icon">✦</span>
                        <div className="item-text"><strong>{s.title}.</strong> {s.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div className="section-card">
                  <div className="section-header">
                    <span className="section-icon">🔧</span>
                    <span className="section-title">Areas to Improve</span>
                    <span className="section-count">{result.improvements?.length}</span>
                  </div>
                  <div className="section-body">
                    {result.improvements?.map((s, i) => (
                      <div key={i} className="item">
                        <span className="item-icon">↗</span>
                        <div className="item-text"><strong>{s.title}.</strong> {s.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Wins */}
                <div className="section-card">
                  <div className="section-header">
                    <span className="section-icon">⚡</span>
                    <span className="section-title">Quick Wins</span>
                    <span className="section-count">{result.quickWins?.length}</span>
                  </div>
                  <div className="section-body">
                    {result.quickWins?.map((s, i) => (
                      <div key={i} className="item">
                        <span className="item-icon">→</span>
                        <div className="item-text"><strong>{s.title}.</strong> {s.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keyword Gaps */}
                {result.keywordGaps?.length > 0 && (
                  <div className="section-card">
                    <div className="section-header">
                      <span className="section-icon">🔍</span>
                      <span className="section-title">Missing Keywords (for ATS)</span>
                    </div>
                    <div className="tags-wrap">
                      {result.keywordGaps?.map((k, i) => (
                        <span key={i} className="tag missing">{k}</span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="reset-btn" onClick={reset}>← Start New Analysis</button>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <div className="empty-text">Your analysis will<br />appear here</div>
                <div className="empty-sub">Upload your resume and paste a job description, then hit Analyze Match to get your score and tips.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
