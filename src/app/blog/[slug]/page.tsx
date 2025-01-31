import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

interface Post {
  title: string;
  author: string;
  date: string;
  content: string;
}

async function getPost(slug: string): Promise<Post | null> {
  const postsDirectory = path.join(process.cwd(), '_posts');
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
    <div>
      <h1>{post.title}</h1>
      <p><small>By {post.author} on {new Date(post.date).toLocaleDateString()}</small></p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
