export default async function handler(req, res) {

  try {

    const response = await fetch('https://dummyjson.com/products')

    const data = await response.json()

    const products = data.products.map(product => ({

      productName: product.title,

      imageUrl: product.thumbnail,

      priceMin: product.price,

      priceMax: product.price + 20,

      ratingStar: product.rating,

      sales: Math.floor(Math.random() * 5000),

      shopName: 'FarNutri Store',

      productLink: 'https://shopee.com.br'

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
