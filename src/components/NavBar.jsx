import React, { useState, useEffect } from 'react'
import { ShoppingCart, User, ChevronDown, Search } from 'lucide-react'

const CATEGORIES = [
  'Jewelry','Pottery','Textiles','Woodwork','Metalcraft','Glasswork','Paintings','Sculptures'
]

export default function NavBar({ cartCount = 0, onSearch }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [openCat, setOpenCat] = useState(false)

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query) { setSuggestions([]); return }
      try {
        const base = import.meta.env.VITE_BACKEND_URL || ''
        const res = await fetch(`${base}/api/search/suggest?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setSuggestions(data.suggestions || [])
      } catch(e) {
        // ignore
      }
    }, 200)
    return () => clearTimeout(handler)
  }, [query])

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 gap-4">
        <a href="/" className="text-xl font-bold tracking-tight">Artisan</a>
        <nav className="hidden md:flex items-center gap-4">
          <div className="relative">
            <button className="inline-flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100" onClick={() => setOpenCat(v=>!v)}>
              Categories <ChevronDown size={16} />
            </button>
            {openCat && (
              <div className="absolute mt-2 w-64 bg-white border rounded-md shadow-lg p-2 grid grid-cols-1">
                {CATEGORIES.map(c => (
                  <a key={c} href={`/?category=${encodeURIComponent(c)}`} className="px-3 py-2 rounded hover:bg-slate-100 text-sm" onClick={()=>setOpenCat(false)}>{c}</a>
                ))}
              </div>
            )}
          </div>
          {CATEGORIES.slice(0,4).map(c => (
            <a key={c} href={`/?category=${encodeURIComponent(c)}`} className="text-slate-600 hover:text-slate-900 text-sm">{c}</a>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="relative w-full max-w-lg">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white focus-within:ring-2 ring-slate-300">
            <Search size={18} className="text-slate-500" />
            <input value={query} onChange={e=>{setQuery(e.target.value); onSearch?.(e.target.value)}} placeholder="Search artisan goods, artists, materials..." className="w-full px-2 outline-none text-sm" />
          </div>
          {query && suggestions.length>0 && (
            <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-auto">
              {suggestions.map(s => (
                <a key={s.id} href={`/product/${s.id}`} className="block px-3 py-2 hover:bg-slate-100 text-sm">
                  <span className="font-medium">{s.title}</span>
                  {s.artist_name && <span className="text-slate-500"> · {s.artist_name}</span>}
                </a>
              ))}
            </div>
          )}
        </div>

        <a href="/cart" className="relative inline-flex items-center px-3 py-2 rounded-md hover:bg-slate-100">
          <ShoppingCart />
          {cartCount>0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full px-1.5">{cartCount}</span>}
        </a>

        <div className="relative">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100">
            <User />
            <ChevronDown size={16} />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-1">
            <a className="block px-3 py-2 hover:bg-slate-100 text-sm" href="/login">Login</a>
            <a className="block px-3 py-2 hover:bg-slate-100 text-sm" href="/register">Register</a>
          </div>
        </div>
      </div>
    </header>
  )
}
