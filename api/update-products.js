import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {

  try {

    // BUSCA PRODUTOS DA API SHOPEE
    const response = await fetch(
      "https://open-api.affiliate.shopee.com.br/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SHOPEE_TOKEN}`
        },
        body: JSON.stringify({
          query: `
            query {
              productOfferV2(
                keyword: "whey protein"
                limit: 30
              ) {
                nodes {
                  productName
                  imageUrl
                  price
                  originalPrice
                  productLink
                  shopName
                }
              }
            }
          `
        })
      }
    );

    const result = await response.json();

    const products =
      result?.data?.productOfferV2?.nodes || [];

    // REMOVE DUPLICADOS
    const uniqueProducts = [];
    const seen = new Set();

    for (const item of products) {

      if (!seen.has(item.productLink)) {

        seen.add(item.productLink);

        uniqueProducts.push({
          name: item.productName,
          image: item.imageUrl,
          price: Number(item.price) || 0,
          original_price: Number(item.originalPrice) || 0,
          category: "Proteína",
          affiliate_link: item.productLink,
          store: item.shopName || "FarNutri",
          updated_at: new Date()
        });

      }

      // LIMITA A 8 PRODUTOS
      if (uniqueProducts.length >= 8) break;
    }

    // UPSERT = ATUALIZA SE JÁ EXISTIR
    const { error } = await supabase
      .from("products")
      .upsert(uniqueProducts, {
        onConflict: "affiliate_link"
      });

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      total: uniqueProducts.length
    });

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}
