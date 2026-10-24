import { useEffect, useState } from 'react'
import { ArrowRight, Check, LogOut, ShieldCheck } from 'lucide-react'
import './App.css'

const tokenKey = 'cras-auth-token'
const userKey = 'cras-auth-user'

function App() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' })
  const [session, setSession] = useState(() => {
    const token = sessionStorage.getItem(tokenKey)
    const savedUser = sessionStorage.getItem(userKey)
    return token && savedUser ? { token, user: JSON.parse(savedUser) } : null
  })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!session?.token) return

    fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${session.token}` },
    }).then(async (response) => {
      if (!response.ok) throw new Error('Your session expired. Please sign in again.')
      const data = await response.json()
      sessionStorage.setItem(userKey, JSON.stringify(data.user))
      setSession((current) => current ? { ...current, user: data.user } : current)
    }).catch((error) => {
      sessionStorage.removeItem(tokenKey)
      sessionStorage.removeItem(userKey)
      setSession(null)
      setMessage(error.message)
    })
  }, [session?.token])

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setMessage('')

    try {
      const endpoint = mode === 'login' ? '/api/users/login' : '/api/users'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Authentication failed')

      sessionStorage.setItem(tokenKey, data.token)
      sessionStorage.setItem(userKey, JSON.stringify(data.user))
      setSession({ token: data.token, user: data.user })
    } catch (error) {
      setMessage(error.message || 'Unable to reach the server. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const signOut = () => {
    sessionStorage.removeItem(tokenKey)
    sessionStorage.removeItem(userKey)
    setSession(null)
    setForm({ name: '', username: '', email: '', password: '' })
    setMessage('You have signed out.')
  }

  return (
    <main className="auth-shell">
      <section className="story-panel" aria-label="Career readiness">
        <header className="brand-lockup">
          <span className="brand-mark">C</span>
          <span>CRAS <span className="brand-divider">/</span> CAREER READINESS</span>
        </header>

        <div className="story-copy">
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h1>Know where you stand.<br /><span>See where you can go.</span></h1>
          <p className="story-description">
            One clear view of your strengths, your skill gaps, and the steps that move you forward.
          </p>
        </div>

        <div className="readiness-visual" aria-label="Career readiness score illustration">
          <div className="visual-topline">
            <span>READINESS SNAPSHOT</span>
            <span className="live-dot">● SAMPLE</span>
          </div>
          <div className="visual-score">
            <div><strong>78</strong><span>/ 100</span></div>
            <span className="score-label">CAREER READINESS</span>
          </div>
          <div className="score-track"><span /></div>
          <div className="visual-bottomline">
            <span><i className="legend-dot teal-dot" /> Skills in motion</span>
            <span>+12 this month</span>
          </div>
        </div>

        <footer className="story-footer">
          <span>ASSESS <b>→</b> UNDERSTAND <b>→</b> GROW</span>
          <span>01 / 03</span>
        </footer>
      </section>

      <section className="form-panel">
        {session ? (
          <div className="signed-in" aria-live="polite">
            <span className="success-icon"><Check size={24} /></span>
            <p className="eyebrow">AUTHENTICATION COMPLETE</p>
            <h2>Good to have you,<br />{session.user.name}.</h2>
            <p className="welcome-copy">You’re signed in as <strong>@{session.user.username}</strong>.</p>
            <div className="account-row">
              <span className="account-avatar">{session.user.name?.charAt(0).toUpperCase()}</span>
              <span><strong>{session.user.name}</strong><small>{session.user.email}</small></span>
              <ShieldCheck className="verified-icon" size={20} aria-label="Verified session" />
            </div>
            <button className="secondary-button" type="button" onClick={signOut}>
              <LogOut size={17} /> Sign out
            </button>
          </div>
        ) : (
          <div className="form-content">
            <div className="form-heading">
              <p className="eyebrow">STUDENT PORTAL</p>
              <h2>{mode === 'login' ? 'Welcome back.' : 'Create your account.'}</h2>
              <p>{mode === 'login' ? 'Sign in to continue your readiness journey.' : 'Start building your career readiness profile.'}</p>
            </div>

            <div className="mode-switch" role="tablist" aria-label="Account access">
              <button className={mode === 'login' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'login'} onClick={() => { setMode('login'); setMessage('') }}>Sign in</button>
              <button className={mode === 'register' ? 'active' : ''} type="button" role="tab" aria-selected={mode === 'register'} onClick={() => { setMode('register'); setMessage('') }}>Create account</button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'register' && (
                <label>
                  Full name
                  <input autoComplete="name" name="name" value={form.name} onChange={updateField} placeholder="e.g. Asha Kumar" required />
                </label>
              )}
              <label>
                Username
                <input autoComplete="username" name="username" value={form.username} onChange={updateField} placeholder="Your username" minLength={3} maxLength={30} pattern="[A-Za-z0-9_]+" required />
              </label>
              {mode === 'register' && (
                <label>
                  Email address
                  <input autoComplete="email" name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required />
                </label>
              )}
              <label>
                Password
                <input autoComplete={mode === 'login' ? 'current-password' : 'new-password'} name="password" type="password" value={form.password} onChange={updateField} placeholder="At least 8 characters" minLength={8} required />
              </label>

              {message && <p className="form-message" role="alert">{message}</p>}
              <button className="submit-button" type="submit" disabled={busy}>
                {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
                {!busy && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="form-footnote">Your password is encrypted before it is stored.</p>
          </div>
        )}
        <footer className="form-footer"><span>© 2026 CRAS</span><span>CAREER READINESS, MADE CLEAR.</span></footer>
      </section>
    </main>
  )
}

export default App
