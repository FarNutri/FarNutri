import axios from "axios";

export default async function handler(req, res) {

    try {

        console.log("Iniciando função...");

        const SUPABASE_URL =
            process.env.SUPABASE_URL;

        const SUPABASE_KEY =
            process.env.SUPABASE_KEY;

        console.log("SUPABASE_URL:", !!SUPABASE_URL);
        console.log("SUPABASE_KEY:", !!SUPABASE_KEY);

        if (!SUPABASE_URL || !SUPABASE_KEY) {

            return res.status(500).json({
                success: false,
                error: "Variáveis não encontradas"
            });

        }

        // TESTE SUPABASE
        const test = await axios.get(

            `${SUPABASE_URL}/rest/v1/products?select=*`,

            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization:
                        `Bearer ${SUPABASE_KEY}`
                }
            }

        );

        console.log(
            "Supabase conectado:",
            test.data.length
        );

        return res.status(200).json({

            success: true,

            message:
                "Supabase conectado com sucesso",

            total:
                test.data.length

        });

    } catch (error) {

        console.log(
            "ERRO COMPLETO:",
            error.response?.data ||
            error.message
        );

        return res.status(500).json({

            success: false,

            error:
                error.response?.data ||
                error.message

        });

    }

}
