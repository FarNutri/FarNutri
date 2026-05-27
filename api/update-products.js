import axios from "axios";

export default async function handler(req, res) {

    try {

        const SUPABASE_URL =
            process.env.SUPABASE_URL;

        const SUPABASE_KEY =
            process.env.SUPABASE_KEY;

        // VALIDAÇÃO
        if (!SUPABASE_URL || !SUPABASE_KEY) {

            return res.status(500).json({
                success: false,
                error: "Variáveis não encontradas"
            });

        }

        // BUSCA PRODUTOS DA API SHOPEE
        const response = await axios.get(
            "https://far-nutri.vercel.app/api/shopee"
        );

        const products = response.data || [];

        // REMOVE DUPLICADOS
        const uniqueProducts = [];
        const seen = new Set();

        for (const item of products) {

            const cleanLink =
                item.productLink
                    ?.split("?")[0]
                    ?.trim();

            if (!cleanLink) continue;

            if (seen.has(cleanLink)) continue;

            seen.add(cleanLink);

            uniqueProducts.push({

                name:
                    item.productName || "Produto",

                image:
                    item.imageUrl || "",

                price:
                    Number(
                        item.price ||
                        item.priceMin ||
                        0
                    ),

                original_price:
                    Number(
                        item.originalPrice ||
                        item.price ||
                        0
                    ),

                category:
                    "Suplementos",

                affiliate_link:
                    cleanLink,

                store:
                    item.shopName || "Shopee",

                updated_at:
                    new Date().toISOString()

            });

        }

        // LIMPA TABELA
        await axios.delete(

            `${SUPABASE_URL}/rest/v1/products?id=gt.0`,

            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization:
                        `Bearer ${SUPABASE_KEY}`
                }
            }

        );

        // INSERE NOVOS PRODUTOS
        await axios.post(

            `${SUPABASE_URL}/rest/v1/products`,

            uniqueProducts,

            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization:
                        `Bearer ${SUPABASE_KEY}`,
                    "Content-Type":
                        "application/json",
                    Prefer:
                        "return=minimal"
                }
            }

        );

        return res.status(200).json({

            success: true,

            total:
                uniqueProducts.length

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            error:
                error.response?.data ||
                error.message

        });

    }

}
