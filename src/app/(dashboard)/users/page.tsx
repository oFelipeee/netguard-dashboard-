"use client";

import { SecureCard } from "../../../components/ui/SecureCard";
import { User, Shield, Search, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserForm = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

const initialFormState: UserForm = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserForm>(initialFormState);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Verificar se é admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        
        if (!data.user || data.user.role !== "admin") {
          toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
          router.push("/");
        } else {
          setIsAdmin(true);
          setCheckingAuth(false);
        }
      } catch (error) {
        router.push("/");
      }
    };

    checkAdmin();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/users/${editingId}` : "/api/users";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Usuário atualizado!" : "Usuário criado!");
        setShowForm(false);
        setEditingId(null);
        setFormData(initialFormState);
        fetchUsers();
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao salvar usuário");
      }
    } catch (error) {
      toast.error("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: any) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Usuário removido!");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mostrar loading enquanto verifica autenticação
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-trust-green/30 border-t-trust-green rounded-full animate-spin" />
      </div>
    );
  }

  // Se não for admin, não renderiza nada (já foi redirecionado)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Gerenciamento de Usuários</h1>
          <p className="text-slate-400 text-sm mt-1">Controle de acesso e permissões</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData(initialFormState);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-trust-green hover:bg-trust-green/90 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Usuário
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-blue/10 border border-trust-blue/30">
              <User className="w-5 h-5 text-trust-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">{users.length}</div>
              <div className="text-xs text-slate-400">Total de Usuários</div>
            </div>
          </div>
        </SecureCard>
        <SecureCard secured={false}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-trust-amber/10 border border-trust-amber/30">
              <Shield className="w-5 h-5 text-trust-amber" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-100">
                {users.filter((u) => u.role === "admin").length}
              </div>
              <div className="text-xs text-slate-400">Administradores</div>
            </div>
          </div>
        </SecureCard>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-100">
                {editingId ? "Editar Usuário" : "Novo Usuário"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Nome</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">
                    Senha {editingId && "(deixe vazio para manter)"}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Função</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full bg-navy-800 border border-navy-700 rounded p-2 text-sm text-white"
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-navy-800 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-trust-green text-white rounded hover:bg-trust-green/90"
                >
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela */}
      <SecureCard title="Todos os Usuários">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-navy-900/50 border border-navy-700/50 text-sm text-slate-200 focus:outline-none focus:border-trust-green/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700/50">
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Nome</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Email</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Função</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-2">Criado em</th>
                <th className="text-right text-xs font-medium text-slate-400 uppercase py-3 px-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-navy-700/30 hover:bg-navy-800/30 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-navy-800 border border-navy-700/50">
                        <User className="w-4 h-4 text-slate-300" />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-slate-300">{user.email}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-trust-amber/10 text-trust-amber border border-trust-amber/30"
                          : "bg-trust-blue/10 text-trust-blue border border-trust-blue/30"
                      }`}
                    >
                      {user.role === "admin" ? "Admin" : "Usuário"}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1.5 text-slate-400 hover:text-trust-blue hover:bg-trust-blue/10 rounded transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 text-slate-400 hover:text-trust-red hover:bg-trust-red/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SecureCard>
    </div>
  );
}