import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WatchlistGrid from './components/WatchlistGrid';
import AddProductModal from './components/AddProductModal';
import FooterBanner from './components/FooterBanner';

export default function App() {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checksCount, setChecksCount] = useState(0);
  const [dropsCount, setDropsCount] = useState(0);

  // Fetch initial tracked products and stats from the Express backend
  // Auto-poll the backend every 30 seconds for live price fluctuations
  useEffect(() => {
    const fetchTracked = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tracked');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          if (data.stats) {
            setChecksCount(data.stats.checksCount);
            setDropsCount(data.stats.dropsCount);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    fetchTracked(); // Fetch immediately on mount
    const interval = setInterval(fetchTracked, 30000); // Repeat every 30s
    return () => clearInterval(interval);
  }, []);

  const trackedCount = products.length;

  const handleAddProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/tracked', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tracked/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleRefreshProduct = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, lastChecked: 'Just now' };
      }
      return p;
    }));
    setChecksCount(prev => prev + 1);
  };

  const handleExportCsv = () => {
    window.location.href = 'http://localhost:5000/api/export-csv';
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col justify-between">
      <div>
        <Navbar 
          stats={{ tracked: trackedCount, drops: dropsCount, checks: checksCount }}
          currency={currency}
          onCurrencyChange={setCurrency}
          onExportCsv={handleExportCsv}
          onOpenModal={() => setIsModalOpen(true)}
        />
        
        <WatchlistGrid 
          products={products}
          currency={currency}
          onDeleteProduct={handleDeleteProduct}
          onRefreshProduct={handleRefreshProduct}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </div>

      <FooterBanner />

      <AddProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}