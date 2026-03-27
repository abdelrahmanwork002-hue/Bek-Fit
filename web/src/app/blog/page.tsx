'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowUpRight, BookOpen, Clock, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogFeedPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

      if (!error && data) {
         setArticles(data)
      }
      setLoading(false)
    }
    fetchArticles()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-16 px-4 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                   <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-5xl font-black tracking-tight italic">Journal</h1>
             </div>
             <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic border-l-4 border-primary pl-6">
               In-depth intelligence on performance architecture, movement mechanics, and recovery protocols.
             </p>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-card rounded-[2.5rem] h-96 animate-pulse border border-border" />
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-card rounded-[2.5rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={article.thumbnail_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                       <div className="px-4 py-1.5 bg-background/95 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-foreground shadow-lg">
                          Insight
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-primary/20 scale-90 group-hover:scale-100">
                          <ArrowUpRight className="w-6 h-6" />
                       </div>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="flex items-center gap-3 text-white/80 text-[10px] font-black uppercase tracking-widest mb-2 no-scrollbar">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(article.published_at).toLocaleDateString()}</span>
                          <span className="opacity-30">•</span>
                          <span>6 Min Read</span>
                       </div>
                       <h3 className="text-2xl font-black text-white leading-tight group-hover:text-primary transition-colors line-clamp-2 italic">{article.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <p className="text-muted-foreground leading-relaxed font-medium line-clamp-3 italic mb-8">
                       Explore the internal mechanics and scientific foundation of {article.title.toLowerCase()}. This intelligence report covers the latest protocols for elite optimization.
                    </p>
                    
                    <div className="flex items-center justify-between group/link">
                       <span className="text-sm font-black text-foreground uppercase tracking-widest border-b-2 border-primary/20 group-hover:border-primary transition-colors">Access Brief</span>
                       <span className="text-muted-foreground opacity-50 font-black italic">B-F v1.0</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
