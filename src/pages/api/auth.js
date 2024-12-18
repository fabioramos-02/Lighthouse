import ldap from "ldapjs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido, use POST" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }

  const client = ldap.createClient({
    url: process.env.LDAP_URL, // URL do servidor LDAP
  });

  // Formata o DN do usuário (Distinguished Name)
  const userDN = `uid=${username},${process.env.LDAP_BASE_DN}`;

  client.bind(userDN, password, (err) => {
    if (err) {
      console.error("Erro ao autenticar:", err);
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    // Desconecta do servidor LDAP
    client.unbind();
    return res.status(200).json({ message: "Autenticação bem-sucedida" });
  });
}
