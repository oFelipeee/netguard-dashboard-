import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("🔍 Tentativa de login...");
        console.log("📥 Credentials:", credentials);
        
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(credentials);
        
        if (!parsed.success) {
          console.log("❌ Validação falhou");
          return null;
        }

        const { email, password } = parsed.data;
        console.log("📧 Email:", email);

        // Buscar usuário no banco
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("❌ Usuário NÃO encontrado:", email);
          return null;
        }

        console.log("✅ Usuário encontrado:", user.email);

        // Comparar senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("🔑 Senha válida?", isPasswordValid);

        if (!isPasswordValid) {
          console.log("❌ Senha inválida para:", email);
          return null;
        }

        console.log("✅ Login bem-sucedido:", email, "| Role:", user.role);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);