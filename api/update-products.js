import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://open-api.affiliate.shopee.com.br/graphql"
    );

    const data = await response.json();

    const products = data?.products || [];

    const uniqueProducts = [];
    const seen = new Set();

    for (const item of products) {
      if (!seen.has(item.productName)) {
        seen.add(item.productName);

        uniqueProducts.push({
          name: item.productName || "Produto",
          image: item.imageUrl || "",
          price:
            item.finalPrice ||
            item.priceMin ||
            item.price ||
            0,
          original_price:
            item.originalPrice ||
            item.price ||
            0,
          category: "Proteína",
          affiliate_link: item.productLink || "#",
          store: item.shopName || "FarNutri",
          updated_at: new Date()
        });
      }

      if (uniqueProducts.length >= 8) break;
    }

    const { error } = await supabase
      .from("products")
      .upsert(uniqueProducts);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      total: uniqueProducts.length
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
