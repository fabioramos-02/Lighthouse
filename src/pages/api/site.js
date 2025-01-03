import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      return res.status(405).json({ error: `Método ${method} não permitido.` });
  }
}

// GET: Lista todos os sites ou busca por ID
async function handleGet(req, res) {
  const { id } = req.query;

  try {
    if (id) {
      const site = await prisma.site.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!site) {
        return res.status(404).json({ error: "Site não encontrado." });
      }

      return res.status(200).json(site);
    } else {
      const sites = await prisma.site.findMany();
      return res.status(200).json(sites);
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar sites.", details: error.message });
  }
}

// POST: Cria um novo site
async function handlePost(req, res) {
  const { nome, url, orgao, ativo } = req.body;

  if (!nome || !url || !orgao) {
    return res.status(400).json({ error: "Campos 'nome', 'url' e 'orgao' são obrigatórios." });
  }

  try {
    const newSite = await prisma.site.create({
      data: {
        nome,
        url,
        orgao,
        ativo: ativo ?? true,
      },
    });

    return res.status(201).json(newSite);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar site.", details: error.message });
  }
}

// PUT: Atualiza um site existente
async function handlePut(req, res) {
  const { id } = req.query;
  const { nome, url, orgao, ativo } = req.body;

  if (!id) {
    return res.status(400).json({ error: "O parâmetro 'id' é obrigatório." });
  }

  try {
    const updatedSite = await prisma.site.update({
      where: { id: parseInt(id, 10) },
      data: { nome, url, orgao, ativo },
    });

    return res.status(200).json(updatedSite);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar site.", details: error.message });
  }
}

// DELETE: Remove um site pelo ID
async function handleDelete(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "O parâmetro 'id' é obrigatório." });
  }

  try {
    await prisma.site.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.status(200).json({ message: "Site removido com sucesso." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover site.", details: error.message });
  }
}
