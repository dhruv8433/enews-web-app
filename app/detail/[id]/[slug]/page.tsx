'use client';
import { useArticle } from '@/app/hooks/useArticles';
import { formatPublishedDate } from '@/app/util/dateFormatter';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import { useSearchArticles } from '@/app/hooks/useSearchArticles';
import VerticalCard from '@/app/common/VerticalCard';

const ArticleDetailPage = () => {
  const { id } = useParams() as { id: string };
  const { data, loading, error } = useArticle(id);
  const article = data?.article;

  const {
    data: relatedArticles,
    loading: relatedLoading,
    error: relatedError,
  } = useSearchArticles(article?.tags?.[0]?.name || '');

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error || !article) return <div className="text-center py-10 text-red-500">Failed to load article.</div>;

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Main Article */}
      <div className="lg:col-span-9 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 heading">{article.title}</h1>
        <div className="text-sm text-secondary mb-6">
          Published on {formatPublishedDate(article.published_at)} · {article.read_time} min read
        </div>

        <div className="mb-8">
          <img
            src={article.image_url}
            alt={article.title}
            className="rounded-xl shadow-lg w-full object-cover max-h-[500px]"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag) => (
            <span key={tag._id} className="tag px-3 py-1 rounded-full text-xs font-semibold">
              {tag.name}
            </span>
          ))}
        </div>

        <div
          className="prose max-w-none text-secondary"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
        />

        <div className="mt-10 text-sm text-gray-600 border-t pt-6">
          <p>
            <strong>Category:</strong> {article.category.name}
          </p>
          <p>
            <strong>Subcategory:</strong> {article.subcategory.name}
          </p>
          <div className="flex gap-4 mt-4 text-sm">
            <span>👍 {article.total_likes} Likes</span>
            <span>👁️ {article.total_reads} Reads</span>
            <span>🔁 {article.total_shares} Shares</span>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="lg:col-span-3 space-y-6 mt-10">
        <h2 className="text-xl font-semibold mb-4 heading">Related Articles</h2>

        {relatedLoading && <p>Loading related articles...</p>}
        {relatedError && <p className="text-red-500 text-sm">Failed to load related articles.</p>}

        {!relatedLoading && relatedArticles?.length === 0 && (
          <p className="text-sm text-gray-500">No related articles found.</p>
        )}

        {relatedArticles?.slice(0, 4).map((related) => (
          <VerticalCard news={related} key={related._id} />
        ))}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
