export default async function handler(req, res){

  if(req.method !== 'POST'){

    return res.status(405).json({
      success:false
    });

  }

  const {

    id,

    name,
    description,
    badge,
    image,
    category,

    shopee_link,
    mercadolivre_link,
    amazon_link,
    tiktok_link

  } = req.body;

  try{

    const response = await fetch(

      `${process.env.SUPABASE_URL}/rest/v1/products?id=eq.${id}`,

      {

        method:'PATCH',

        headers:{

          apikey:
          process.env.SUPABASE_SERVICE_KEY,

          Authorization:
          `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,

          'Content-Type':'application/json',

          Prefer:'return=minimal'

        },

        body:JSON.stringify({

          name,
          description,
          badge,
          image,
          category,

          shopee_link,
          mercadolivre_link,
          amazon_link,
          tiktok_link

        })

      }

    );

    if(!response.ok){

      const error =
      await response.text();

      return res.status(500).json({
        success:false,
        error
      });

    }

    return res.status(200).json({
      success:true
    });

  }catch(error){

    return res.status(500).json({
      success:false,
      error:error.message
    });

  }

}
