"use client"

import { useActionState } from "react"
import { loginAction } from "../actions"

const initialState: { error?: string } = {}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="password">Mot de passe administrateur</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
        />
        {state?.error ? <p className="error-text">{state.error}</p> : null}
      </div>
      <button className="btn btn-primary btn-block" type="submit" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  )
}
