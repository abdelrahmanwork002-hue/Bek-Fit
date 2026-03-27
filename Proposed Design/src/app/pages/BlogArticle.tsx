import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

export function BlogArticle() {
  const { id } = useParams();

  // Mock article data
  const article = {
    title: 'Understanding Lower Back Pain: Causes and Solutions',
    category: 'Pain Management',
    date: 'March 25, 2026',
    readTime: '8 min read',
    author: 'Dr. Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1678724357812-74f239cd1620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYmxvZyUyMGhlYWx0aHxlbnwxfHx8fDE3NzQ2MzU3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content: `
      <p>Lower back pain affects millions of people worldwide and is one of the leading causes of disability. Understanding the root causes and implementing evidence-based solutions can make a significant difference in managing and preventing this common condition.</p>

      <h2>Common Causes of Lower Back Pain</h2>
      
      <p>Lower back pain can stem from various factors, including:</p>
      
      <ul>
        <li><strong>Poor posture:</strong> Prolonged sitting or standing with incorrect alignment puts excessive strain on the lower back muscles and spine.</li>
        <li><strong>Muscle imbalances:</strong> Weak core muscles and tight hip flexors can lead to compensatory movements that stress the lower back.</li>
        <li><strong>Acute injuries:</strong> Sudden movements, heavy lifting, or accidents can cause strains or sprains in the lower back region.</li>
        <li><strong>Degenerative conditions:</strong> Age-related wear and tear, such as disc degeneration or arthritis, can contribute to chronic pain.</li>
      </ul>

      <h2>Evidence-Based Solutions</h2>

      <p>Research shows that a multi-faceted approach is most effective for managing lower back pain:</p>

      <h3>1. Movement and Exercise</h3>
      <p>Contrary to old beliefs about complete rest, staying active is crucial. Low-impact exercises like walking, swimming, and specific strengthening routines help maintain mobility and build supporting muscles.</p>

      <h3>2. Core Strengthening</h3>
      <p>A strong core provides essential support for your spine. Focus on exercises that target the deep stabilizing muscles, including planks, bird dogs, and dead bugs.</p>

      <h3>3. Flexibility and Mobility</h3>
      <p>Regular stretching of the hamstrings, hip flexors, and lower back muscles can reduce tension and improve range of motion. Yoga and dedicated mobility work are excellent options.</p>

      <h3>4. Ergonomic Adjustments</h3>
      <p>Optimize your workspace and daily activities to reduce strain. This includes proper desk setup, supportive seating, and mindful lifting techniques.</p>

      <h2>When to Seek Professional Help</h2>

      <p>While many cases of lower back pain improve with self-care, certain symptoms warrant immediate medical attention:</p>

      <ul>
        <li>Severe pain that doesn't improve with rest</li>
        <li>Numbness or tingling in the legs</li>
        <li>Loss of bladder or bowel control</li>
        <li>Unexplained weight loss accompanying back pain</li>
      </ul>

      <h2>Long-Term Prevention</h2>

      <p>The best approach to lower back pain is prevention. Maintaining a healthy weight, staying physically active, practicing good posture, and addressing muscle imbalances early can significantly reduce your risk of developing chronic back problems.</p>

      <p>Remember, everyone's body is different. What works for one person may not work for another. If you're struggling with persistent back pain, consider working with a qualified healthcare professional to develop a personalized treatment plan.</p>
    `,
  };

  const relatedArticles = [
    { id: '2', title: 'The Science of Progressive Overload', category: 'Training' },
    { id: '4', title: "Mobility vs Flexibility: What's the Difference?", category: 'Mobility' },
    { id: '6', title: 'Recovery Strategies for Better Performance', category: 'Recovery' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <span className="text-sm text-[#6dccc4] mb-2 block">{article.category}</span>
            <h1 className="text-5xl mb-6">{article.title}</h1>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span>By {article.author}</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Featured Image */}
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              color: '#e5e5e5',
            }}
          />

          {/* Related Articles */}
          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="bg-[#0f0f0f] rounded-lg border border-white/10 p-6 hover:border-[#6dccc4]/50 transition-colors"
                >
                  <span className="text-sm text-[#6dccc4] mb-2 block">{related.category}</span>
                  <h3 className="text-lg">{related.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .prose h2 {
          font-size: 2rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #6dccc4;
        }
        .prose h3 {
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #6dccc4;
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        .prose ul, .prose ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }
        .prose strong {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
