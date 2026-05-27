const uniqueProducts = [];
const seen = new Set();

for (const item of products) {
  if (!seen.has(item.productName)) {
    seen.add(item.productName);

    uniqueProducts.push({
      name: item.productName,
      image: item.imageUrl,
      price: item.price || 0,
      original_price: item.originalPrice || 0,
      category: "Proteína",
      affiliate_link: item.productLink,
      store: item.shopName || "FarNutri",
      updated_at: new Date()
    });
  }

  if (uniqueProducts.length >= 8) break;
}
