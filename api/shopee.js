import crypto from 'crypto'

const APP_ID = process.env.SHOPEE_APP_ID
const SECRET = process.env.SHOPEE_SECRET

export default async function handler(req, res) {

  try {

    const timestamp = Math.floor(Date.now() / 1000)

    const query = {
      query: `
      {
        productOfferV2(
          listType: 2,
          limit: 20,
          page: 1
        ) {
          nodes {
            productName
            imageUrl
            priceMin
            priceMax
            productLink
            ratingStar
            sales
            shopName
            discount
          }
        }
      }
      `
    }

    const payload = JSON.stringify(query)

    const signString =
      `${APP_ID}${timestamp}${payload}`

    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(signString)
      .digest('hex')

    const response = await fetch(
      'https://open-api.affiliate.shopee.com.br/graphql',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          'Authorization':
            `SHA256 app_id=${APP_ID}&timestamp=${timestamp}&payload_digest=${signature}`
        },

        body: payload
      }
    )

    const data = await response.json()

    const products =
      data?.data?.productOfferV2?.nodes || []

    res.status(200).json({
      products
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}
