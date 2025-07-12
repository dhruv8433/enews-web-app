'use client';

import { useArticle } from '@/app/hooks/useArticles';
import { formatPublishedDate } from '@/app/util/dateFormatter';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import { useSearchArticles } from '@/app/hooks/useSearchArticles';
import VerticalCard from '@/app/common/VerticalCard';
import { FavoriteButton } from '@/app/common/FavoriteButton';
import { useFavorites } from '@/app/hooks/useFavorites';

import { FaThumbsUp, FaEye, FaShareAlt, FaPrint } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { ShareButton } from '@/app/common/ShareButton';
import { httpAxios } from '@/app/httpAxios';
import { useComments } from '@/app/hooks/useComments';
import { useState } from 'react';
import CommentCard from '@/app/common/CommentCard';

const ArticleDetailPage = () => {
  const { id } = useParams() as { id: string };
  const { data, loading, error } = useArticle(id);
  const article = data?.article;
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { comments, loading: commentsLoading, error: commentsError, addComment } = useComments(id);

  const [newComment, setNewComment] = useState('');


  const isFavorited = favorites.some(fav => fav?._id === article?._id);

  const toggleFavorite = (articleId: string) => {
    if (isFavorited) {
      removeFromFavorites(articleId);
    } else {
      addToFavorites(articleId);
    }
  };

  const {
    data: relatedArticles,
    loading: relatedLoading,
    error: relatedError,
  } = useSearchArticles(article?.tags?.[0]?.name || '');

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error || !article) return <div className="text-center py-10 text-red-500">Failed to load article.</div>;

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.error("Comment cannot be empty");
    try {
      await addComment(newComment);
      setNewComment('');
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.title,
          url: window.location.href,
        })
      // -------- share ---------
      await httpAxios.put(`/articles/${article._id}/share`).then(() => article.total_shares++)
    } else {
      toast('Share not supported in this browser.');
    }
  };

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Main Article */}
      <div className="lg:col-span-9 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 heading">{article.title}</h1>
        <div className="text-sm text-secondary mb-2">
          Published on {formatPublishedDate(article.published_at)} · {article.read_time} min read
        </div>

        {/* Stats: Likes, Reads, Shares - outside the image */}
        <div className="flex justify-between  mb-4">
          <div className='flex items-center gap-6 text-sm'><div className="flex items-center gap-1">
            <FaThumbsUp className="text-blue-600" />
            <span>{article.total_likes}</span>
          </div>
            <div className="flex items-center gap-1">
              <FaEye className="text-green-600" />
              <span>{article.total_reads}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaShareAlt className="text-purple-600" />
              <span>{article.total_shares}</span>
            </div>
          </div>
          {/* New Print Icon */}
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-gray-800"
            onClick={() => window.print()}
            title="Print Article"
          >
            <FaPrint className='text-heading' />
          </div>

        </div>

        {/* Image with top overlay action buttons */}
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg max-h-[500px]">
          {/* Overlay bar with action buttons */}
          <div className="absolute top-0 left-0 right-0 z-20 flex justify-end gap-4 px-4 py-2 ">
            <FavoriteButton
              articleId={article._id}
              isFavorited={isFavorited}
              onToggleFavorite={toggleFavorite}
            />
            <ShareButton onShare={handleShare} />
          </div>

          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag) => (
            <span
              key={tag._id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Content */}
        <div
          className="prose max-w-none text-secondary"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
        />

        {/* Category and Subcategory */}
        <div className="mt-10 text-sm text-gray-600 border-t pt-6">
          <p>
            <strong>Category:</strong> {article.category.name}
          </p>
          <p>
            <strong>Subcategory:</strong> {article.subcategory.name}
          </p>
        </div>

        {/* ----------------- Comments ----------------- */}
        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-2 text-black bg-trasparent"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={commentsLoading}
            >
              {commentsLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>

          {commentsLoading && <p>Loading comments...</p>}
          {commentsError && <p className="text-red-500">Failed to load comments.</p>}

          {comments.length === 0 && !commentsLoading && (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}

          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment._id}>
                <CommentCard comment={comment} />
              </li>
            ))}
          </ul>

        </section>
      </div>




      {/* ----------------- Related Articles ----------------------- */}
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
    </div >
  );
};

export default ArticleDetailPage;
