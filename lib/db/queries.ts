import { createClient } from "@/lib/supabase/server"

export type Vaga = {
  id: string
  titulo: string
  empresa: string
  descricao: string
  tipo: "estagio" | "jovem-aprendiz" | "primeiro-emprego"
  localizacao: string
  requisitos: string | null
  beneficios: string | null
  salario: string | null
  link_candidatura: string | null
  data_publicacao: string
  data_expiracao: string | null
  ativo: boolean
  created_at: string
  updated_at: string
}

export type Curso = {
  id: string
  titulo: string
  descricao: string
  plataforma: string
  categoria: string
  duracao: string | null
  nivel: "iniciante" | "intermediario" | "avancado" | null
  link: string
  imagem_url: string | null
  ativo: boolean
  created_at: string
  updated_at: string
}

export type Dica = {
  id: string
  titulo: string
  descricao: string
  conteudo: string
  categoria: string
  imagem_url: string | null
  ativo: boolean
  created_at: string
  updated_at: string
}

// Vagas queries
export async function getVagas() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("vagas")
    .select("*")
    .eq("ativo", true)
    .order("data_publicacao", { ascending: false })

  if (error) throw error
  return data as Vaga[]
}

export async function getVagaById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("vagas").select("*").eq("id", id).eq("ativo", true).single()

  if (error) throw error
  return data as Vaga
}

export async function getVagasByTipo(tipo: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("vagas")
    .select("*")
    .eq("tipo", tipo)
    .eq("ativo", true)
    .order("data_publicacao", { ascending: false })

  if (error) throw error
  return data as Vaga[]
}

// Cursos queries
export async function getCursos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Curso[]
}

export async function getCursoById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("cursos").select("*").eq("id", id).eq("ativo", true).single()

  if (error) throw error
  return data as Curso
}

export async function getCursosByCategoria(categoria: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .eq("categoria", categoria)
    .eq("ativo", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Curso[]
}

// Dicas queries
export async function getDicas() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("dicas")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Dica[]
}

export async function getDicaById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("dicas").select("*").eq("id", id).eq("ativo", true).single()

  if (error) throw error
  return data as Dica
}

export async function getDicasByCategoria(categoria: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("dicas")
    .select("*")
    .eq("categoria", categoria)
    .eq("ativo", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Dica[]
}
