import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      throw error
    }

    const products = data.map(product => ({
      productName: product.name,
      imageUrl: product.image,
      priceMin: product.price,
      priceMax: product.original_price,
      ratingStar: 4.9,
      sales: Math.floor(Math.random() * 5000),
      shopName: product.store || 'FarNutri',
      productLink: product.affiliate_link,
      category: product.category
    }))

    res.status(200).json({
      products
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}
