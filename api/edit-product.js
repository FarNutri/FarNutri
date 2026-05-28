<!DOCTYPE html>
<html lang="pt-BR">

<head>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Editar Produto • FarNutri</title>

  <link
    rel="icon"
    type="image/png"
    href="/favicon.png"
  />

  <link
    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
    rel="stylesheet"
  />

  <style>

    :root{
      --verde-floresta:#0D3B1A;
      --verde-logo:#1A5C2A;
      --verde-marca:#2E7D3F;
      --verde-medio:#4CAF65;
      --verde-menta:#B8E4BC;
      --branco:#F4FAF5;
      --grafite:#3D4D3E;
      --cinza:#8A9E8C;
      --card:#FFFFFF;
      --danger:#E53935;
    }

    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
      font-family:'Nunito',sans-serif;
    }

    body{
      background:var(--branco);
      padding:24px 16px 60px;
      color:var(--grafite);
    }

    .hero{
      background:
      linear-gradient(
        135deg,
        var(--verde-logo),
        var(--verde-marca)
      );

      padding:24px;

      border-radius:24px;

      color:white;

      display:flex;

      align-items:center;

      gap:14px;

      margin-bottom:24px;

      box-shadow:
      0 10px 30px rgba(0,0,0,.12);

    }

    .hero-icon{

      width:52px;
      height:52px;

      border-radius:16px;

      background:
      rgba(255,255,255,.15);

      display:flex;

      align-items:center;

      justify-content:center;

      font-size:24px;

      flex-shrink:0;

    }

    .hero h1{
      font-size:26px;
      font-weight:900;
    }

    .hero p{
      margin-top:3px;
      opacity:.85;
      font-size:14px;
    }

    .form-card{

      background:white;

      border-radius:22px;

      padding:20px;

      box-shadow:
      0 6px 20px rgba(0,0,0,.06);

    }

    .form-title{

      font-size:20px;

      font-weight:900;

      color:var(--verde-logo);

      margin-bottom:18px;

    }

    .image-preview{

      width:100%;

      height:150px;

      background:#F2F7F3;

      border-radius:18px;

      border:2px dashed #C8E6CB;

      display:flex;

      align-items:center;

      justify-content:center;

      overflow:hidden;

      margin-bottom:18px;

    }

    .image-preview img{

      width:100%;
      height:100%;

      object-fit:contain;

    }

    .field{
      margin-bottom:14px;
    }

    .field label{

      display:block;

      margin-bottom:6px;

      font-size:13px;

      font-weight:800;

    }

    .field input,
    .field textarea,
    .field select{

      width:100%;

      border:1.5px solid #E2EEE5;

      border-radius:14px;

      padding:13px 14px;

      outline:none;

      background:#F7FBF8;

      font-size:14px;

    }

    .field textarea{
      resize:none;
      min-height:80px;
    }

    .field input:focus,
    .field textarea:focus,
    .field select:focus{

      border-color:var(--verde-medio);

      box-shadow:
      0 0 0 3px rgba(76,175,101,.12);

    }

    .fields-row{

      display:grid;

      grid-template-columns:1fr 1fr;

      gap:12px;

    }

    .submit-btn{

      width:100%;

      border:none;

      background:
      linear-gradient(
        135deg,
        var(--verde-logo),
        var(--verde-marca)
      );

      color:white;

      padding:15px;

      border-radius:16px;

      font-size:15px;

      font-weight:900;

      cursor:pointer;

      margin-top:6px;

      box-shadow:
      0 6px 18px rgba(46,125,63,.22);

    }

    .submit-btn:active{
      transform:scale(.98);
    }

    .back-btn{

      display:block;

      text-align:center;

      margin-top:14px;

      text-decoration:none;

      color:var(--verde-logo);

      font-weight:800;

    }

    .status{

      margin-top:14px;

      padding:12px;

      border-radius:12px;

      font-size:13px;

      font-weight:700;

      text-align:center;

      display:none;

    }

    .success{
      background:#DDF5E3;
      color:#1B5E20;
    }

    .error{
      background:#FFE1E1;
      color:#B71C1C;
    }

  </style>

</head>

<body>

  <section class="hero">

    <div class="hero-icon">
      ✏️
    </div>

    <div>

      <h1>Editar Produto</h1>

      <p>
        Atualize as informações do produto
      </p>

    </div>

  </section>

  <section class="form-card">

    <h2 class="form-title">
      Atualizar produto
    </h2>

    <div class="image-preview">

      <img
        id="previewImg"
        src=""
      />

    </div>

    <form id="editForm">

      <div class="fields-row">

        <div class="field">

          <label>Nome</label>

          <input
            type="text"
            id="name"
            required
          />

        </div>

        <div class="field">

          <label>Categoria</label>

          <input
            type="text"
            id="category"
          />

        </div>

      </div>

      <div class="field">

        <label>Imagem</label>

        <input
          type="url"
          id="image"
          oninput="prevImg(this.value)"
          required
        />

      </div>

      <div class="field">

        <label>Descrição</label>

        <textarea
          id="description"
        ></textarea>

      </div>

      <div class="field">

        <label>Badge</label>

        <select id="badge">

          <option value="">
            Nenhum
          </option>

          <option>
            🔥 Mais Vendido
          </option>

          <option>
            ✅ Verificado
          </option>

          <option>
            ⭐ Melhor Avaliado
          </option>

          <option>
            💪 Alta Performance
          </option>

          <option>
            ⚡ Energia Extra
          </option>

          <option>
            🚀 Envio Rápido
          </option>

        </select>

      </div>

      <div class="fields-row">

        <div class="field">

          <label>Shopee</label>

          <input
            type="url"
            id="shopee_link"
          />

        </div>

        <div class="field">

          <label>Mercado Livre</label>

          <input
            type="url"
            id="mercadolivre_link"
          />

        </div>

      </div>

      <div class="fields-row">

        <div class="field">

          <label>Amazon</label>

          <input
            type="url"
            id="amazon_link"
          />

        </div>

        <div class="field">

          <label>TikTok Shop</label>

          <input
            type="url"
            id="tiktok_link"
          />

        </div>

      </div>

      <button
        type="submit"
        class="submit-btn"
      >

        Salvar Alterações

      </button>

      <div
        class="status"
        id="status"
      ></div>

    </form>

    <a
      href="/painel-farnutri.html"
      class="back-btn"
    >

      ← Voltar ao painel

    </a>

  </section>

  <script>

    // proteção painel

    const auth =
    localStorage.getItem('adminAuth');

    if(
      !auth ||
      !auth.startsWith('fn_')
    ){

      window.location.href =
      '/entrar-farnutri.html';

    }

    const params =
    new URLSearchParams(
      window.location.search
    );

    const productId =
    params.get('id');

    // preview imagem

    function prevImg(url){

      document
      .getElementById('previewImg')
      .src = url;

    }

    // carregar produto

    async function carregarProduto(){

      try{

        const response =
        await fetch('/api/products');

        const produtos =
        await response.json();

        const produto =
        produtos.find(
          p => p.id == productId
        );

        if(!produto){

          alert('Produto não encontrado');

          window.location.href =
          '/painel-farnutri.html';

          return;

        }

        document.getElementById('name').value =
        produto.name || '';

        document.getElementById('category').value =
        produto.category || '';

        document.getElementById('image').value =
        produto.image || '';

        document.getElementById('description').value =
        produto.description || '';

        document.getElementById('badge').value =
        produto.badge || '';

        document.getElementById('shopee_link').value =
        produto.shopee_link || '';

        document.getElementById('mercadolivre_link').value =
        produto.mercadolivre_link || '';

        document.getElementById('amazon_link').value =
        produto.amazon_link || '';

        document.getElementById('tiktok_link').value =
        produto.tiktok_link || '';

        prevImg(produto.image);

      }catch(error){

        alert('Erro ao carregar produto');

      }

    }

    // salvar edição

    document
    .getElementById('editForm')

    .addEventListener('submit', async (e) => {

      e.preventDefault();

      const status =
      document.getElementById('status');

      const data = {

        id: productId,

        name:
        document.getElementById('name').value,

        category:
        document.getElementById('category').value,

        image:
        document.getElementById('image').value,

        description:
        document.getElementById('description').value,

        badge:
        document.getElementById('badge').value,

        shopee_link:
        document.getElementById('shopee_link').value,

        mercadolivre_link:
        document.getElementById('mercadolivre_link').value,

        amazon_link:
        document.getElementById('amazon_link').value,

        tiktok_link:
        document.getElementById('tiktok_link').value

      };

      try{

        const response =
        await fetch('/api/update-products',{

          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body:JSON.stringify(data)

        });

        if(response.ok){

          status.style.display =
          'block';

          status.className =
          'status success';

          status.innerHTML =
          '✅ Produto atualizado com sucesso';

          setTimeout(() => {

            window.location.href =
            '/painel-farnutri.html';

          },1200);

        }else{

          throw new Error();

        }

      }catch(error){

        status.style.display =
        'block';

        status.className =
        'status error';

        status.innerHTML =
        '❌ Erro ao atualizar produto';

      }

    });

    carregarProduto();

  </script>

</body>

</html>
