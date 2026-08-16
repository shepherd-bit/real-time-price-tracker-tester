const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store for the skill demo
let trackedProducts = [];
let totalChecks = 0;
let totalDrops = 0;

// Helper: Fetch catalogs from external public endpoints with structured properties
async function fetchCatalog() {
  try {
    const [dummyRes, fakeRes] = await Promise.all([
      fetch('https://dummyjson.com/products?limit=12'),
      fetch('https://fakestoreapi.com/products')
    ]);

    const dummyData = await dummyRes.json();
    const fakeData = await fakeRes.json();

    const dummyProducts = (dummyData.products || []).map(p => {
      // Establish a realistic initial original price (slightly higher than base price)
      const originalPrice = Number((p.price * 1.25).toFixed(2));
      return {
        id: `dummy-${p.id}`,
        title: p.title,
        store: 'DummyJSON',
        price: p.price,
        originalPrice: originalPrice,
        currencySymbol: '$',
        category: p.category || 'Electronics',
        image: p.thumbnail,
        priceChange: Number((((originalPrice - p.price) / originalPrice) * 100).toFixed(1)),
        history: [p.price],
        lastChecked: new Date().toLocaleTimeString()
      };
    });

    const fakeProducts = (fakeData || []).map(p => {
      const originalPrice = Number((p.price * 1.25).toFixed(2));
      return {
        id: `fake-${p.id}`,
        title: p.title,
        store: 'FakeStoreAPI',
        price: p.price,
        originalPrice: originalPrice,
        currencySymbol: '$',
        category: 'Electronics',
        image: p.image,
        priceChange: Number((((originalPrice - p.price) / originalPrice) * 100).toFixed(1)),
        history: [p.price],
        lastChecked: new Date().toLocaleTimeString()
      };
    });

    return [...dummyProducts, ...fakeProducts];
  } catch (error) {
    console.error('Error fetching catalog:', error);
    return [];
  }
}

// 1. GET Full Public Catalog (for the popup library modal)
app.get('/api/catalog', async (req, res) => {
  const catalog = await fetchCatalog();
  res.json({ success: true, count: catalog.length, products: catalog });
});

// 2. GET Tracked Watchlist
app.get('/api/tracked', (req, res) => {
  res.json({
    success: true,
    stats: {
      trackedCount: trackedProducts.length,
      dropsCount: totalDrops,
      checksCount: totalChecks
    },
    products: trackedProducts
  });
});

// 3. POST Add Product to Watchlist
app.post('/api/tracked', async (req, res) => {
  const { productId } = req.body;
  const catalog = await fetchCatalog();
  const productToAdd = catalog.find(p => p.id === productId);

  if (!productToAdd) {
    return res.status(404).json({ success: false, message: 'Product not found in catalog' });
  }

  if (!trackedProducts.some(p => p.id === productId)) {
    trackedProducts.push(productToAdd);
  }

  res.json({ success: true, products: trackedProducts });
});

// 4. DELETE Remove Product from Watchlist
app.delete('/api/tracked/:id', (req, res) => {
  const { id } = req.params;
  trackedProducts = trackedProducts.filter(p => p.id !== id);
  res.json({ success: true, products: trackedProducts });
});

// 5. GET Export CSV Log
app.get('/api/export-csv', (req, res) => {
  let csv = 'ID,Title,Store,Original Price,Current Price,Price Drop %,Last Checked\n';
  trackedProducts.forEach(p => {
    csv += `"${p.id}","${p.title}","${p.store}",${p.originalPrice},${p.price},${p.priceChange}%,"${p.lastChecked}"\n`;
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('watchlist-export.csv');
  res.send(csv);
});

// Background Polling Engine: Simulate price fluctuations every 30 seconds
setInterval(() => {
  if (trackedProducts.length === 0) return;
  totalChecks++;

  trackedProducts = trackedProducts.map(product => {
    // Random fluctuation between -3% and +3%
    const changeFactor = 1 + (Math.random() * 0.06 - 0.03);
    const newPrice = Number((product.price * changeFactor).toFixed(2));

    if (newPrice < product.price) {
      totalDrops++;
    }

    // Recalculate unique percentage drop relative to its original starting price
    const priceChange = Number((((product.originalPrice - newPrice) / product.originalPrice) * 100).toFixed(1));
    const updatedHistory = [...product.history, newPrice].slice(-10); // Keep last 10 points

    return {
      ...product,
      price: newPrice,
      priceChange: priceChange,
      history: updatedHistory,
      lastChecked: new Date().toLocaleTimeString()
    };
  });
  console.log(`[Polling Engine] Checked prices. Total checks: ${totalChecks}`);
}, 30000);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});