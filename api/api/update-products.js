export default async function handler(req, res) {

  try {

    const shopeeResponse = await fetch(
      "https://far-nutri.vercel.app/api/shopee"
    );

    const shopeeData = await shopeeResponse.json();

    const products = shopeeData.products || [];

    for (const product of products) {

      await fetch(
        "https://qmdpnbbwtqsaabxmumot.supabase.co/rest/v1/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "apikey":
              process.env.SUPABASE_ANON_KEY,

            "Authorization":
              `Bearer ${process.env.SUPABASE_ANON_KEY}`,

            "Prefer":
              "resolution=merge-duplicates"
          },

          body: JSON.stringify({
            name:
              product.productName,

            image:
              product.imageUrl,

            price:
              product.price ||

              product.salePrice ||

              product.priceMin ||

              0,

            affiliate_link:
              product.productLink,

            store:
              product.shopName,

            updated_at:
              new Date().toISOString()
          })
        }
      );
    }

    return res.status(200).json({
      success: true,
      total: products.length
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });
  }
}
