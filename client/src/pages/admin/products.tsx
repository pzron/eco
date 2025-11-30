import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit2, Trash2, Plus, Package, TrendingUp, AlertCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "electronics",
    images: "",
    status: "active"
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price) {
      alert("Please fill required fields");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        description: formData.description,
        categoryId: formData.category,
        images: formData.images ? [formData.images] : [],
        isActive: formData.status === "active"
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Product added successfully!");
        setFormData({ name: "", price: "", stock: "", description: "", category: "electronics", images: "", status: "active" });
        setShowForm(false);
        fetchProducts();
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  const handleEditProduct = async () => {
    if (!editingId || !formData.name || !formData.price) {
      alert("Please fill required fields");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        description: formData.description,
        categoryId: formData.category,
        images: formData.images ? [formData.images] : [],
        isActive: formData.status === "active"
      };

      const res = await fetch(`/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Product updated successfully!");
        setFormData({ name: "", price: "", stock: "", description: "", category: "electronics", images: "", status: "active" });
        setEditingId(null);
        setShowForm(false);
        fetchProducts();
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const startEdit = (product: any) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock || 0,
      description: product.description || "",
      category: product.categoryId || "electronics",
      images: product.images?.[0] || "",
      status: product.isActive ? "active" : "inactive"
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || 
      (filter === "lowstock" && p.stock < 10) ||
      (filter === "active" && p.isActive) ||
      (filter === "inactive" && !p.isActive);
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div className="text-white text-center py-12">Loading...</div>;

  const stats = {
    total: products.length,
    active: products.filter((p: any) => p.isActive).length,
    lowStock: products.filter((p: any) => p.stock < 10).length,
    totalValue: products.reduce((sum: number, p: any) => sum + (parseFloat(p.price) * p.stock || 0), 0)
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Product Management</h1>
            <p className="text-white/60 mt-1">Manage catalog, prices, and inventory</p>
          </div>
          <button 
            onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: "", price: "", stock: "", description: "", category: "electronics", images: "", status: "active" }); }}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <Package className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-400 mt-1">{stats.active}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Low Stock</p>
                <p className="text-2xl font-bold text-orange-400 mt-1">{stats.lowStock}</p>
              </div>
              <AlertCircle className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Inventory Value</p>
                <p className="text-2xl font-bold text-blue-400 mt-1">৳{(stats.totalValue / 1000).toFixed(0)}K</p>
              </div>
              <Upload className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">{editingId ? "Edit Product" : "Add New Product"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40"
              />
              <input 
                type="number"
                placeholder="Price (৳)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40"
              />
              <input 
                type="number"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40"
              />
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Living</option>
              </select>
              <input 
                type="text"
                placeholder="Image URL"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 md:col-span-2"
              />
              <textarea 
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 md:col-span-2 h-20"
              />
              <div className="flex gap-2">
                <button 
                  onClick={editingId ? handleEditProduct : handleAddProduct}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold"
                >
                  {editingId ? "Update" : "Add"}
                </button>
                <button 
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {["all", "active", "inactive", "lowstock"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                filter === f 
                  ? "bg-purple-500 text-white" 
                  : "bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              {f === "lowstock" ? "Low Stock" : f}
            </button>
          ))}
        </div>

        {/* Products Table */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-md">
          <CardHeader className="border-b border-white/10 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Products ({filteredProducts.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input 
                  placeholder="Search products..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-black/20 border-white/10" 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-white/5 text-xs uppercase text-white/60">
                <tr>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((product: any, i: number) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-white/70 text-sm">{product.categoryId || "N/A"}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold">৳{parseFloat(product.price).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${
                        product.stock > 10 ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
                      }`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={product.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <button 
                        onClick={() => startEdit(product)}
                        className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
