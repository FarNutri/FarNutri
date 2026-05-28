import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res){

  if(req.method !== 'POST'){

    return res.status(405).json({
      error:'Método não permitido'
    })

  }

  try{

    const {

      id,
      name,
      image,
      description,
      category,
      badge,
      shopee_link,
      mercadolivre_link,
      amazon_link,
      tiktok_link

    } = req.body

    // ─────────────────────────
    // EDITAR PRODUTO
    // ─────────────────────────

    if(id){

      const { error } = await supabase

        .from('products')

        .update({

          name,
          image,
          description,
          category,
          badge,
          shopee_link,
          mercadolivre_link,
          amazon_link,
          tiktok_link

        })

        .eq('id', id)

      if(error){

        console.log(error)

        throw error

      }

      return res.status(200).json({

        success:true,
        updated:true

      })

    }

    // ─────────────────────────
    // CRIAR PRODUTO
    // ─────────────────────────

    const { error } = await supabase

      .from('products')

      .insert([{

        name,
        image,
        description,
        category,
        badge,
        shopee_link,
        mercadolivre_link,
        amazon_link,
        tiktok_link

      }])

    if(error){

      console.log(error)

      throw error

    }

    return res.status(200).json({

      success:true,
      created:true

    })

catch(error){

  console.log('ERRO UPDATE:', error)

  return res.status(500).json({
    error:error.message
  })

}

    })

  }

}
