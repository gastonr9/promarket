import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getSettings } from "@/lib/data";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "admin";
    };
  }
  interface User {
    id: string;
    name: string;
    email: string;
    role: "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "admin";
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@promarket.com.ar" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("[AUTH] authorize function called with:", credentials ? { email: credentials.email, hasPassword: !!credentials.password } : "no credentials");
        console.log("[AUTH] Request object:", req ? Object.keys(req) : "null");
        console.log("[AUTH] req.body:", req?.body);
        
        // If credentials are empty, try to use req.body (already parsed by Next.js)
        let parsedCredentials = credentials;
        if ((!credentials?.email || !credentials?.password) && req?.body) {
          console.log("[AUTH] Using credentials from req.body");
          parsedCredentials = {
            email: req.body.email,
            password: req.body.password,
          };
          console.log("[AUTH] Parsed credentials from body:", { email: parsedCredentials.email, hasPassword: !!parsedCredentials.password });
        }
        
        if (!parsedCredentials?.email || !parsedCredentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          console.log("[AUTH] Attempting login for:", parsedCredentials.email);
          const settings = await getSettings();
          console.log("[AUTH] Settings loaded:", { 
            adminEmail: settings.adminEmail, 
            hasHash: !!settings.adminPasswordHash,
            hashPreview: settings.adminPasswordHash?.substring(0, 20)
          });
          
          // Check if admin credentials are configured
          if (!settings.adminEmail || !settings.adminPasswordHash) {
            console.error("Admin credentials not configured in settings");
            throw new Error("Sistema no configurado. Contacte al administrador.");
          }

          // Verify email
          console.log("[AUTH] Comparing email:", parsedCredentials.email, "vs", settings.adminEmail);
          if (parsedCredentials.email !== settings.adminEmail) {
            throw new Error("Credenciales inválidas");
          }

          // Verify password hash
          console.log("[AUTH] Comparing password hash");
          const isValid = await compare(parsedCredentials.password, settings.adminPasswordHash);
          console.log("[AUTH] Password valid:", isValid);
          if (!isValid) {
            throw new Error("Credenciales inválidas");
          }

          return {
            id: "admin",
            name: "Administrador",
            email: settings.adminEmail,
            role: "admin",
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Error de autenticación");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
    updateAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};