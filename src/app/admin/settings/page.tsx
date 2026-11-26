"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Image as ImageIcon, Type, Save, Lock, User, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { SessionProvider } from "@/components/providers/SessionProvider";

const initialSettings = {
  whatsappNumber: "",
  announcementText: "Atención a comercios · Consultá disponibilidad y zona de entrega por WhatsApp",
  heroTitle: "Tu negocio siempre <em>en movimiento.</em>",
  heroSubtitle: "Todo lo que tu kiosco o almacén necesita, en un solo lugar. Encontrá tus productos y pedinos precio directo por WhatsApp.",
  heroImage: "",
  adminEmail: "admin@promarket.com.ar",
  adminPasswordHash: "",
};

function AdminSettingsPageContent() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch {
      showToast("No se pudo cargar la configuración", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => fetchSettings(), 0);
  }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Hash new password if provided
      const settingsToSave = { ...settings };
      if (newPassword.trim()) {
        const bcrypt = await import("bcryptjs");
        settingsToSave.adminPasswordHash = bcrypt.hashSync(newPassword, 12);
      }
      
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateSettings", settings: settingsToSave }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Configuración actualizada correctamente", "success");
      setNewPassword(""); // Clear password field on success
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-heading font-extrabold text-3xl lg:text-4xl">Configuración del sitio</h1>
          <p className="text-muted-foreground mt-1">WhatsApp, Hero, Anuncio y ajustes generales</p>
        </div>

        {/* WhatsApp */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-coral" />
              WhatsApp Business
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">Número de WhatsApp (formato internacional sin +)</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                placeholder="5491123456789"
                value={settings.whatsappNumber}
                onChange={e => setSettings({...settings, whatsappNumber: e.target.value})}
                maxLength={15}
              />
              <p className="text-sm text-muted-foreground">Ejemplo: 5491123456789 (Argentina: 54 + 9 + código de área + número)</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm"><strong>Link de prueba:</strong></p>
              <code className="text-xs text-muted-foreground break-all">
                {settings.whatsappNumber
                  ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=Hola%2C%20quiero%20consultar%20precio%20y%20disponibilidad.`
                  : "Configurá el número para ver el link"}
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5 text-coral" />
              Sección Hero (Inicio)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Título principal (HTML permitido)</Label>
              <textarea
                id="heroTitle"
                className="min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                value={settings.heroTitle}
                onChange={e => setSettings({...settings, heroTitle: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">{"Podés usar <em>, <strong>, <span class=\"text-coral\">, etc."}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Subtítulo</Label>
              <textarea
                id="heroSubtitle"
                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={settings.heroSubtitle}
                onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroImage">Imagen del Hero (URL)</Label>
              <Input
                id="heroImage"
                placeholder="https://ejemplo.com/hero.jpg"
                value={settings.heroImage}
                onChange={e => setSettings({...settings, heroImage: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Announcement Bar */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-coral" />
              Barra de anuncio (Top bar)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="announcementText">Texto del anuncio</Label>
              <Input
                id="announcementText"
                value={settings.announcementText}
                onChange={e => setSettings({...settings, announcementText: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">Aparece en la barra superior del sitio</p>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <p className="text-sm"><strong>Vista previa:</strong></p>
              <div className="mt-2 px-4 py-2 bg-slate-900 text-white text-center text-sm font-medium rounded">
                {settings.announcementText}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Credentials */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-coral" />
              Credenciales de Administrador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-sm text-muted-foreground">
              Cambiá el email y contraseña para acceder al panel de administración. La contraseña se guarda de forma segura (hash bcrypt).
            </CardDescription>
            
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email de administrador</Label>
              <Input
                id="adminEmail"
                type="email"
                autoComplete="email"
                placeholder="admin@promarket.com.ar"
                value={settings.adminEmail || ""}
                onChange={e => setSettings({...settings, adminEmail: e.target.value})}
                required
                startIcon={<User className="h-4 w-4" aria-hidden="true" />}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword">Nueva contraseña (dejar vacío para no cambiar)</Label>
              <Input
                id="adminPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="•••••••• (mín. 8 caracteres)"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                minLength={8}
                startIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              <p className="text-xs text-muted-foreground">
                La contraseña se hasheará con bcrypt (costo 12) antes de guardarse.
              </p>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--warning-bg)", borderColor: "var(--warning-border)" }}>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--warning-fg)" }} aria-hidden="true" />
                <div className="text-sm" style={{ color: "var(--warning-fg)" }}>
                  <strong>Importante:</strong> Tras cambiar las credenciales, tu sesión actual seguirá válida hasta que expire (8 horas).
                  Para forzar el cierre de sesión, cerrá sesión manualmente o esperá a que expire el token.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="gap-2 w-full sm:w-auto">
            <Save className="h-4 w-4" />
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminSettingsPage() {
  return (
    <SessionProvider>
      <ToastProvider>
        <AdminSettingsPageContent />
      </ToastProvider>
    </SessionProvider>
  );
}