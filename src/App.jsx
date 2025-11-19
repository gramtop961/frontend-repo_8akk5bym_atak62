import React, { useMemo, useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'

function useQuery() {
  const q = new URLSearchParams(window.location.search)
  return Object.fromEntries(q.entries())
}

function App() {
  const query = useQuery()
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar cartCount={0} onSearch={setSearch} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <Hero />
        <ProductGrid initialCategory={query.category} searchQuery={search} />
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-slate-600 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="font-semibold mb-2">About</div>
            <p>Curated marketplace for handmade artisan goods.</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Customer</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Legal</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Newsletter</div>
            <form className="flex gap-2">
              <input placeholder="Email address" className="flex-1 border rounded px-3 py-2" />
              <button className="px-4 py-2 bg-slate-900 text-white rounded">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App