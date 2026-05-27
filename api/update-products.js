import axios from "axios";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export default async function handler(req, res) {

    try {

        // BUSCA PRODUTOS DA API LOCAL
        const response = await axios.get(
            `${req.headers.origin || "https://far-nutri.vercel.app"}/api/shopee`
        );

        const products = response.data || [];

        console.log("Produtos recebidos:", products.length);

        // REMOVE DUPLICADOS
        const uniqueProducts = [];
        const seen = new Set();

        for (const item of products) {

            // LINK LIMPO
            const cleanLink = item.productLink
                ?.split("?")[0]
                ?.trim();

            // IGNORA SEM LINK
            if (!cleanLink) continue;

            // VERIFICA DUPLICADO
            if (seen.has(cleanLink)) continue;

            seen.add(cleanLink);

            uniqueProducts.push({

                name: item.productName || "Produto",

                image: item.imageUrl || "",

                price: Number(item.price) || 0,

                original_price:
                    Number(item.originalPrice) || 0,

                category: "Proteína",

                affiliate_link: cleanLink,

                store: item.shopName || "FarNutri",

                updated_at: new Date()

            });

        }

        console.log(
            "Produtos únicos:",
            uniqueProducts.length
        );

        // SEM PRODUTOS
        if (uniqueProducts.length === 0) {

            return res.status(200).json({
                success: true,
                total: 0,
                message: "Nenhum produto encontrado"
            });

        }

        // REMOVE DUPLICADOS DO SUPABASE
        for (const product of uniqueProducts) {

            await axios.delete(
                `${SUPABASE_URL}/rest/v1/products?affiliate_link=eq.${encodeURIComponent(product.affiliate_link)}`,
                {
                    headers: {
                        apikey: SUPABASE_KEY,
                        Authorization:
                            `Bearer ${SUPABASE_KEY}`
                    }
                }
            );

        }

        // INSERE NOVOS PRODUTOS
        const insertResponse = await axios.post(

            `${SUPABASE_URL}/rest/v1/products`,

            uniqueProducts,

            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization:
                        `Bearer ${SUPABASE_KEY}`,
                    "Content-Type":
                        "application/json",
                    Prefer: "return=minimal"
                }
            }

        );

        console.log(
            "Produtos inseridos:",
            uniqueProducts.length
        );

        return res.status(200).json({

            success: true,

            total: uniqueProducts.length

        });

    } catch (error) {

        console.log(
            "ERRO UPDATE PRODUCTS:",
            error.response?.data || error.message
        );

        return res.status(500).json({

            success: false,

            error:
                error.response?.data || error.message

        });

    }

}
