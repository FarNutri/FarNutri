import crypto from 'crypto'

const APP_ID = process.env.SHOPEE_APP_ID
const SECRET = process.env.SHOPEE_SECRET

export default async function handler(req, res) {

  try {

    const timestamp = Math.floor(Date.now() / 1000)

    const path = '/api/v1/item_list'

    const baseString =
      `${APP_ID}${path}${timestamp}`

    const sign = crypto
      .createHmac('sha256', SECRET)
      .update(baseString)
      .digest('hex')

    const url =
      `https://open-api.affiliate.shopee.com.br${path}?` +
      `app_id=${APP_ID}&timestamp=${timestamp}&sign=${sign}`

    const response = await fetch(url)

    const data = await response.json()

    console.log(data)

    const items = data?.data?.list || []

    const products = items.map((item) => ({

      productName: item.item_name,

      imageUrl: item.image,

      priceMin: item.price / 100000,

      priceMax: item.price_before_discount / 100000,

      ratingStar: 4.8,

      sales: item.sales,

      shopName: item.shop_name || 'Shopee',

      productLink: item.offer_link

    }))

    res.status(200).json({
      products
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: error.message
    })

  }

}
