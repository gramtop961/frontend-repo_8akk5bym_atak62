import React, { useEffect, useState } from 'react'

const slides = [
  {
    title: 'Discover Handmade Masterpieces',
    subtitle: 'Unique creations by independent artisans',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=60'
  },
  {
    title: 'Jewelry, Pottery, Textiles & More',
    subtitle: 'Curated collections updated weekly',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=60'
  },
  {
    title: 'Support Local Artists',
    subtitle: 'Shop small. Make a big impact.',
    image: 'https://images.unsplash.com/photo-1518953277267-fcc6b654b1f9?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdXBwb3J0JTIwTG9jYWwlMjBBcnRpc3RzfGVufDB8MHx8fDE3NjM1NzY0NzF8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
  }
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])

  const s = slides[index]

  return (
    <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden rounded-xl">
      <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
        <h1 className="text-white text-3xl sm:text-5xl font-bold max-w-3xl drop-shadow">{s.title}</h1>
        <p className="text-white/90 text-lg sm:text-2xl mt-3 max-w-2xl drop-shadow">{s.subtitle}</p>
        <div className="mt-6 flex gap-3">
          <a href="#catalog" className="inline-block bg-white text-slate-900 px-5 py-3 rounded-md font-medium hover:bg-slate-100">Shop Now</a>
          <a href="/artists" className="inline-block bg-transparent text-white border border-white/80 px-5 py-3 rounded-md font-medium hover:bg-white/10">Meet the Artists</a>
        </div>
      </div>
    </section>
  )
}
