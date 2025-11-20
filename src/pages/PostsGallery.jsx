import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api/postsApi';
import { searchItems } from '../utils/searchUtils';
import Card from '../components/Card';
import Button from '../components/Button';

const PostsGallery = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 6;

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const { data, error } = await fetchPosts();
    if (data) {
      setPosts(data);
      setError(null);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  const filteredPosts = searchItems(posts, searchTerm, ['title', 'body']);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  if (loading) {
    return (
      <Card>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <p className="ml-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <Button onClick={loadPosts}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card title="API Data">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Fetched {posts.length} posts from JSONPlaceholder API. Use the search box to filter results.
        </p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          placeholder="Search posts by title or body..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map(post => (
          <Card key={post.id}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold capitalize flex-1 pr-2">
                {post.title}
              </h3>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full whitespace-nowrap">
                #{post.id}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {post.body}
            </p>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400">
            No posts found matching your search.
          </p>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostsGallery;