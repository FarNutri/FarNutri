import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res){

  if(req.method !== 'POST'){

    return res.status(405).json({
      success:false,
      error:'Método não permitido'
    })

  }

  try{

    const {
      id,
      name,
      image,
      price,
      link
    } = req.body

    if(!id){

      return res.status(400).json({
        success:false,
        error:'ID não enviado'
      })

    }

    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        image,
        price,
        link
      })
      .eq('id', id)
      .select()

    if(error){

      return res.status(500).json({
        success:false,
        error:error.message
      })

    }

    return res.status(200).json({
      success:true,
      data
    })

  }catch(err){

    return res.status(500).json({
      success:false,
      error:err.message
    })

  }

}
