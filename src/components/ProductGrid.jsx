import React, { useEffect, useState, useMemo } from 'react'

export default function ProductGrid({ initialCategory, searchQuery }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('new')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  const base = import.meta.env.VITE_BACKEND_URL || ''

  const fetchProducts = async (reset=false) => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', '16')
    params.set('sort', sort)
    if (initialCategory) params.set('category', initialCategory)
    if (searchQuery) params.set('q', searchQuery)
    if (priceMin) params.set('price_min', priceMin)
    if (priceMax) params.set('price_max', priceMax)
    const res = await fetch(`${base}/api/products?${params.toString()}`)
    const data = await res.json()
    setItems(data.items || [])
    setTotal(data.total || 0)
    setLoading(false)
  }

  useEffect(() => { setPage(1) }, [initialCategory, searchQuery, sort, priceMin, priceMax])
  useEffect(() => { fetchProducts(true) }, [page, sort, initialCategory, searchQuery, priceMin, priceMax])

  const totalPages = Math.ceil(total / 16)

  return (
    <section id="catalog" className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 bg-white rounded-xl border p-4 h-fit sticky top-24">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-600">Price min</label>
            <input value={priceMin} onChange={(e)=>setPriceMin(e.target.value)} type="number" className="w-full border rounded px-2 py-1"/>
          </div>
          <div>
            <label className="text-sm text-slate-600">Price max</label>
            <input value={priceMax} onChange={(e)=>setPriceMax(e.target.value)} type="number" className="w-full border rounded px-2 py-1"/>
          </div>
          <button onClick={()=>{setPriceMin('');setPriceMax('')}} className="text-sm text-blue-700">Clear filters</button>
        </div>
      </aside>

      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded px-2 py-1">
            <option value="new">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="best">Best Rated</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({length:8}).map((_,i)=> (
              <div key={i} className="aspect-[4/5] bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(p => (
              <a key={p.id} href={`/product/${p.id}`} className="group block bg-white border rounded-lg overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden bg-slate-50">
                  <img src={p.images?.[0]?.url || 'https://via.placeholder.com/400x500?text=Artisan'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
                </div>
                <div className="p-3">
                  <div className="text-sm text-slate-500">{p.artist_name || 'Unknown Artist'}</div>
                  <div className="font-medium truncate">{p.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-blue-700 font-semibold">${'{'}p.price.toFixed(2){'}'}</div>
                    <div className="text-amber-500 text-sm">★ {p.rating_average?.toFixed?.(1) || '0.0'}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            <div className="text-sm">Page {page} of {totalPages}</div>
            <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </section>
  )
}
