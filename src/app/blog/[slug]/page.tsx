import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Post() {

  const post = {
    title: 'Hello World',
    author: 'John Doe',
    date: '2021-10-01',
    content: `
      # Hello World

      This is a blog post about.
    `,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-8">
        <small>
          By {post.author} on {new Date(post.date).toLocaleDateString()}
        </small>
      </p>
      <div className="prose prose-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}
