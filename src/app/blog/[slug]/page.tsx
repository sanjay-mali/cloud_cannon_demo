import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Post {
  title: string;
  author: string;
  date: string;
  content: string;
}

async function getPost(slug: string): Promise<Post | null> {
  const postsDirectory = path.join(process.cwd(), 'src/_posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...data,
    content,
  } as Post;
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/_posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));
}

interface Params {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: Params) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-8">
        <small>
          By {post.author} on {new Date(post.date).toLocaleDateString()}
        </small>
      </p>
      <div className="prose prose-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
