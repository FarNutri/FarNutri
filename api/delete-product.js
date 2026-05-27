const { createClient } = require('@supabase/supabase-js')

module.exports = async (req, res) => {

  try {

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )

    const { id } = req.body

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      })
    }

    return res.status(200).json({
      success: true
    })

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    })

  }

}
