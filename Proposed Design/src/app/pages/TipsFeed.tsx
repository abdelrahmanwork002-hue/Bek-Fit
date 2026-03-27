import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Search, Filter } from 'lucide-react';

export function TipsFeed() {
  const tips = [
    {
      id: 1,
      title: 'Perfect Your Posture at Your Desk',
      category: 'Ergonomics',
      image: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Keep your screen at eye level, feet flat on the floor, and take breaks every 30 minutes.',
      new: true,
    },
    {
      id: 2,
      title: '5-Minute Morning Mobility Routine',
      category: 'Mobility',
      image: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Start your day with cat-cow stretches, hip circles, and shoulder rolls to wake up your body.',
      new: false,
    },
    {
      id: 3,
      title: 'The 20-20-20 Rule for Eye Health',
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.',
      new: false,
    },
    {
      id: 4,
      title: 'Quick Desk Stretches',
      category: 'Stretching',
      image: 'https://images.unsplash.com/photo-1758599879927-f60878034fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3RyZXRjaGluZyUyMG1vYmlsaXR5fGVufDF8fHx8MTc3NDYzNTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      content: 'Neck rolls, wrist circles, and seated spinal twists can be done right at your desk.',
      new: true,
    },
  ];

  const categories = ['All', 'Ergonomics', 'Mobility', 'Stretching', 'Wellness'];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl mb-2">Movement Tips & Reminders</h1>
            <p className="text-gray-400">
              Quick tips to improve your posture, mobility, and daily movement
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tips..."
                className="w-full pl-12 pr-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg focus:border-[#6dccc4] focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-[#0f0f0f] border border-white/10 rounded-full hover:border-[#6dccc4] hover:bg-[#6dccc4]/10 transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-[#0f0f0f] rounded-2xl border border-white/10 overflow-hidden hover:border-[#6dccc4]/50 transition-colors cursor-pointer"
              >
                <div className="relative aspect-video">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover"
                  />
                  {tip.new && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-[#6dccc4] text-[#1a1a1a] rounded-full text-sm">
                      New
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-sm text-[#6dccc4] mb-2 block">{tip.category}</span>
                  <h3 className="text-xl mb-3">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
