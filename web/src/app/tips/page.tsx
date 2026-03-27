'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Search, Filter, Sparkles, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function TipsFeedPage() {
  const [tips, setTips] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const categories = ['All', 'Ergonomics', 'Mobility', 'Stretching', 'Wellness']

  useEffect(() => {
    async function fetchTips() {
      const { data, error } = await supabase
        .from('movement_tips')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
         setTips(data)
      }
      setLoading(false)
    }
    fetchTips()
  }, [])

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(search.toLowerCase()) || 
                          tip.content.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || tip.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                   <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-4xl font-black tracking-tight leading-none">Movement Tips</h1>
             </div>
             <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
               Quick, actionable insights to improve your posture, mobility, and daily movement patterns.
             </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
             <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search mobility secrets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-card border border-border rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg shadow-sm"
                />
             </div>
             
             <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-8 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-300 border-2 ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                        : 'bg-card border-border hover:border-border/80 text-muted-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
             </div>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-card rounded-3xl h-80 animate-pulse border border-border" />
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {filteredTips.map((tip) => (
                <article
                  key={tip.id}
                  className="group bg-card rounded-[2.5rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={tip.image_url || 'https://images.unsplash.com/photo-1758599879927-f60878034fca'}
                      alt={tip.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {tip.is_new && (
                      <span className="absolute top-6 right-6 px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Latest
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                       <span className="text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full">{tip.category}</span>
                       <span className="h-0.5 w-4 bg-border" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-primary transition-colors">{tip.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium line-clamp-3 mb-8">{tip.content}</p>
                    
                    <div className="mt-auto pt-6 border-t border-border flex items-center justify-between group/btn">
                       <span className="text-sm font-bold text-muted-foreground">Read Duration: 2 min</span>
                       <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-primary-foreground transition-all duration-300">
                          <ChevronRight className="w-5 h-5" />
                       </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredTips.length === 0 && (
             <div className="text-center py-24">
                <div className="inline-flex w-20 h-20 rounded-full bg-muted items-center justify-center mb-6">
                   <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-3xl font-black mb-2">No Tips Found</h3>
                <p className="text-muted-foreground text-lg">Try adjusting your search or filters to find what you need.</p>
             </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
