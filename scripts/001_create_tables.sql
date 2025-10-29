-- Create vagas (job opportunities) table
CREATE TABLE IF NOT EXISTS public.vagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  empresa TEXT NOT NULL,
  descricao TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('estagio', 'jovem-aprendiz', 'primeiro-emprego')),
  localizacao TEXT NOT NULL,
  requisitos TEXT,
  beneficios TEXT,
  salario TEXT,
  link_candidatura TEXT,
  data_publicacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_expiracao TIMESTAMP WITH TIME ZONE,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cursos (courses) table
CREATE TABLE IF NOT EXISTS public.cursos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  plataforma TEXT NOT NULL,
  categoria TEXT NOT NULL,
  duracao TEXT,
  nivel TEXT CHECK (nivel IN ('iniciante', 'intermediario', 'avancado')),
  link TEXT NOT NULL,
  imagem_url TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dicas (tips) table
CREATE TABLE IF NOT EXISTS public.dicas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  imagem_url TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vagas_tipo ON public.vagas(tipo);
CREATE INDEX IF NOT EXISTS idx_vagas_ativo ON public.vagas(ativo);
CREATE INDEX IF NOT EXISTS idx_vagas_data_publicacao ON public.vagas(data_publicacao DESC);
CREATE INDEX IF NOT EXISTS idx_cursos_categoria ON public.cursos(categoria);
CREATE INDEX IF NOT EXISTS idx_cursos_ativo ON public.cursos(ativo);
CREATE INDEX IF NOT EXISTS idx_dicas_categoria ON public.dicas(categoria);
CREATE INDEX IF NOT EXISTS idx_dicas_ativo ON public.dicas(ativo);

-- Enable Row Level Security (RLS)
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dicas ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view)
CREATE POLICY "Allow public read access to active vagas"
  ON public.vagas FOR SELECT
  USING (ativo = TRUE);

CREATE POLICY "Allow public read access to active cursos"
  ON public.cursos FOR SELECT
  USING (ativo = TRUE);

CREATE POLICY "Allow public read access to active dicas"
  ON public.dicas FOR SELECT
  USING (ativo = TRUE);
