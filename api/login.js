export default async function handler(req, res) {

  // Permite apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Método não permitido'
    });
  }

  try {

    // Senha enviada pelo frontend
    const { password } = req.body;

    // Senha salva na Vercel
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Verifica se existe
    if (!adminPassword) {

      return res.status(500).json({
        success: false,
        message: 'ADMIN_PASSWORD não configurada'
      });

    }

    // Compara senha
    if (password === adminPassword) {

      return res.status(200).json({
        success: true
      });

    }

    // Senha inválida
    return res.status(401).json({
      success: false,
      message: 'Senha incorreta'
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });

  }

}
