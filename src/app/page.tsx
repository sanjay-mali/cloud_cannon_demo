import Link from "next/link";

export default async function Home() {
  // const posts = await getPosts();
  
  const posts = [
    {
      title: "Hello World",
      slug: "hello-world",
      author: "John Doe",
      date: "2023-10-01"
    }
  ];


  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">Blog Posts</h1>
      <ul className="list-none p-0">
        {posts.map((post) => (
          <li key={post.slug} className="mb-6">
            <Link
              href={`/blog/${post.slug}`}
              className="text-2xl text-blue-600 hover:underline dark:text-blue-400"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <small>
                By {post.author} on {new Date(post.date).toLocaleDateString()}
              </small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
