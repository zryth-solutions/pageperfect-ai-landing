import { Metadata } from 'next';
import { blogs } from '@/data/blogs';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/components/SEOHead';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = 'https://wrytflow.com';
  const blogUrl = `${baseUrl}/blog/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: [...blog.tags, 'AI book auditing', 'manuscript review', 'PagePerfect AI'].join(', '),
    authors: [{ name: blog.author }],
    openGraph: {
      type: 'article',
      url: blogUrl,
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.date,
      authors: [blog.author],
      section: blog.category,
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
      creator: '@ZrythSolutions',
    },
    alternates: {
      canonical: blogUrl,
    },
  };
}

export function generateBlogStructuredData(slug: string) {
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) return null;

  const blogPostSchema = generateBlogPostSchema(
    blog.title,
    blog.excerpt,
    blog.author,
    blog.date,
    blog.image,
    blog.slug
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://wrytflow.com' },
    { name: 'Blog', url: 'https://wrytflow.com/blog' },
    { name: blog.title, url: `https://wrytflow.com/blog/${blog.slug}` },
  ]);

  return { blogPostSchema, breadcrumbSchema };
}

