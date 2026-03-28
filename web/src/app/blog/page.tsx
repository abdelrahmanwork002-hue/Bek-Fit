'use client';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Search, Calendar, Clock } from 'lucide-react';

export default function Blog() {
  const articles = [
    {
      id: '1',
      title: 'Understanding Lower Back Pain: Causes and Solutions',
      summary: 'Discover the most common causes of lower back pain and evidence-based approaches to managing and preventing it.',
      category: 'Pain Management',
      date: 'March 25, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYmxvZyUyMGhlYWx0aHxlbnwxfHx8fDE3NzQ2MzU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '2',
      title: 'The Science of Progressive Overload',
      summary: 'Learn how to systematically increase training demands to build strength and muscle over time.',
      category: 'Training',
      date: 'March 23, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYmxvZyUyMGhlYWx0aHxlbnwxfHx8fDE3NzQ2MzU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '3',
      title: 'Nutrition Timing: Does It Really Matter?',
      summary: 'Exploring the science behind meal timing and its impact on performance and body composition.',
      category: 'Nutrition',
      date: 'March 20, 2026',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1606859191214-25806e8e2423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbnV0cml0aW9uJTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzc0NjIyNzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '4',
      title: 'Mobility vs Flexibility: What\'s the Difference?',
      summary: 'Understanding the key differences between mobility and flexibility and why both matter for your health.',
      category: 'Mobility',
      date: 'March 18, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '5',
      title: 'Building Sustainable Fitness Habits',
      summary: 'Science-backed strategies for creating fitness habits that actually stick long-term.',
      category: 'Lifestyle',
      date: 'March 15, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYmxvZyUyMGhlYWx0aHxlbnwxfHx8fDE3NzQ2MzU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '6',
      title: 'Recovery Strategies for Better Performance',
      summary: 'Optimize your recovery with these evidence-based techniques to enhance your training results.',
      category: 'Recovery',
      date: 'March 12, 2026',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYmxvZyUyMGhlYWx0aHxlbnwxfHx8fDE3NzQ2MzU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl mb-4">Wellness Blog</h1>
            <p className="text-xl text-gray-400">
              Expert insights on fitness, nutrition, and healthy living
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
              />
            </div>
          </div>

          {/* Featured Article */}
          <Link
            href={`/blog/${articles[0].id}`}
            className="block mb-12 bg-[#0f0f0f] rounded-2xl border border-white/10 overflow-hidden hover:border-[#6dccc4]/50 transition-colors"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video md:aspect-auto">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-sm text-[#6dccc4] mb-2">{articles[0].category}</span>
                <h2 className="text-3xl mb-4">{articles[0].title}</h2>
                <p className="text-gray-400 mb-6">{articles[0].summary}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {articles[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {articles[0].readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="bg-[#0f0f0f] rounded-2xl border border-white/10 overflow-hidden hover:border-[#6dccc4]/50 transition-colors"
              >
                <div className="aspect-video">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-[#6dccc4] mb-2 block">{article.category}</span>
                  <h3 className="text-xl mb-3">{article.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{article.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
