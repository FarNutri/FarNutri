export default async function handler(req,res){

  try{

    const response = await fetch(

      `${process.env.SUPABASE_URL}/rest/v1/products?select=*`,

      {

        headers:{

          apikey:
          process.env.SUPABASE_SERVICE_KEY,

          Authorization:
          `Bearer ${process.env.SUPABASE_SERVICE_KEY}`

        }

      }

    );

    const data = await response.json();

    return res.status(200).json(data);

  }catch(error){

    return res.status(500).json({
      success:false,
      error:error.message
    });

  }

}
