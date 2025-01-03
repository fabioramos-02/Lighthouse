import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const usuarios = await prisma.usuario.findMany();
        return res.status(200).json(usuarios);
      } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuários." });
      }

    case "POST":
      try {
        const { nome, email, senha, role } = req.body;

        // Criptografar a senha
        const saltRounds = 10; // Número de rounds para gerar o salt
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        const novoUsuario = await prisma.usuario.create({
          data: {
            nome,
            email,
            senha: senhaCriptografada, // Salvar senha criptografada
            role: role || "user",
          },
        });

        return res.status(200).json(novoUsuario);
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ error: "Erro ao criar usuário." });
      }

    case "PUT":
      try {
        const { id, senha, ...dadosAtualizados } = req.body;

        let senhaCriptografada;
        if (senha) {
          const saltRounds = 10;
          senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        }

        const usuarioAtualizado = await prisma.usuario.update({
          where: { id },
          data: {
            ...dadosAtualizados,
            ...(senha && { senha: senhaCriptografada }), // Atualiza a senha apenas se fornecida
          },
        });

        return res.status(200).json(usuarioAtualizado);
      } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar usuário." });
      }

    case "DELETE":
      try {
        const { id } = req.body;
        await prisma.usuario.delete({ where: { id } });
        return res.status(204).send();
      } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar usuário." });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Método ${method} não permitido`);
  }
}
