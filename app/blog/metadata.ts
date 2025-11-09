import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - AI Publishing Insights & Tips',
  description: 'Explore insights, tips, and stories about AI-powered publishing, writing excellence, manuscript editing, and the future of content creation. Learn from industry experts.',
  keywords: 'AI publishing blog, manuscript editing tips, book writing advice, AI proofreading, publishing industry news, content creation, writing tips, author resources',
  openGraph: {
    title: 'Blog - AI Publishing Insights & Tips | PagePerfect AI',
    description: 'Explore insights, tips, and stories about AI-powered publishing, writing excellence, and the future of content creation.',
    type: 'website',
    url: 'https://wrytflow.com/blog',
    images: [
      {
        url: 'https://i.postimg.cc/MTSkJFFH/page-perfect-dashboard.png',
        width: 1200,
        height: 630,
        alt: 'PagePerfect AI Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - AI Publishing Insights & Tips | PagePerfect AI',
    description: 'Explore insights, tips, and stories about AI-powered publishing and writing excellence.',
    images: ['https://i.postimg.cc/MTSkJFFH/page-perfect-dashboard.png'],
  },
  alternates: {
    canonical: 'https://wrytflow.com/blog',
  },
};

