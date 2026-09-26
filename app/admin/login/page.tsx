import { redirect } from "next/navigation"
import { isAuthenticated, isAdminConfigured } from "@/lib/auth"
import { LoginForm } from "./login-form"

export const dynamic = "force-dynamic"

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin")
  const configured = isAdminConfigured()

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="brand">
          <img src="/images/logo.png" alt="" />
          <span>
            <span className="brand-name">ONGD SALAAM</span>
            <span className="brand-sub">Espace administration</span>
          </span>
        </div>
        {configured ? (
          <LoginForm />
        ) : (
          <div className="notice notice-info">
            L&apos;authentification administrateur n&apos;est pas configurée dans cet environnement
            (variable <code>ADMIN_PASSWORD</code> absente). Elle sera active sur le site déployé.
          </div>
        )}
      </div>
    </div>
  )
}
