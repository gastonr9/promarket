"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setFormError("Email o contraseña incorrectos");
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setFormError("Error de conexión. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show URL error if present
  if (error && !formError) {
    setFormError(error === "CredentialsSignin" ? "Credenciales inválidas" : "Error de autenticación");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6" aria-label="Promarket Logística, inicio">
            <span className="w-12 h-12 grid place-items-center rounded-[12px_12px_12px_4px] bg-coral text-white font-extrabold text-2xl -rotate-3">
              P
            </span>
          </Link>
          <h1 className="font-heading font-extrabold text-3xl">Acceso Administrador</h1>
          <p className="text-muted-foreground mt-2">Inicie sesión para gestionar el catálogo</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Iniciar sesión</CardTitle>
            <CardDescription>Use sus credenciales de administrador</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div className={cn(
                  "flex items-center gap-2 p-3 rounded-lg text-sm",
                  "bg-red-50 text-red-700 border border-red-200"
                )} role="alert">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>{formError}</span>
                </div>
              )}

              <Input
                id="email"
                type="email"
                label="Email"
                autoComplete="email"
                placeholder="admin@promarket.com.ar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                startIcon={<Mail className="h-5 w-5" />}
              />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                startIcon={<Lock className="h-5 w-5" />}
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-hidden="true"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                }
              />

              <Button
                type="submit"
                className="w-full gap-2"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>

              <div className="mt-6 pt-6 border-t border-border">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Volver al sitio público
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Promarket Logística - Panel de administración seguro
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral" /></div>}>
      <AdminLoginForm />
    </Suspense>
  );
}