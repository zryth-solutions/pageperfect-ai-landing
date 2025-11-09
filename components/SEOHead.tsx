import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = 'AI book auditing, manuscript review, AI proofreading, book editing, publishing tools, content quality, AI writing assistant, PagePerfect AI',
  ogImage = 'https://i.postimg.cc/MTSkJFFH/page-perfect-dashboard.png',
  ogType = 'website',
  canonicalUrl,
  author,
  publishedTime,
  modifiedTime,
  noindex = false,
}: SEOProps): Metadata {
  const baseUrl = 'https://wrytflow.com';
  const fullTitle = `${title} | PagePerfect AI`;
  const canonical = canonicalUrl || baseUrl;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
    authors: author ? [{ name: author }] : [{ name: 'PagePerfect AI Team' }],
    creator: 'Zryth Solutions',
    publisher: 'Zryth Solutions',
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: 'PagePerfect AI',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@ZrythSolutions',
    },
    verification: {
      google: 'your-google-verification-code',
      // Add other verification codes as needed
    },
  };

  // Add article-specific metadata
  if (ogType === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
    };
  }

  return metadata;
}

// Structured Data Generator
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PagePerfect AI',
    description: 'Professional AI-powered book auditing and manuscript review platform',
    url: 'https://wrytflow.com',
    logo: 'https://wrytflow.com/logo.png',
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Organization',
        name: 'Zryth Solutions',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9870661438',
      contactType: 'Customer Service',
      email: 'contact@zryth.com',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/zryth/',
      'https://github.com/zryth-solutions',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PagePerfect AI',
    description: 'Professional AI Book Auditing for Authors & Publishers',
    url: 'https://wrytflow.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wrytflow.com/blog?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PagePerfect AI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Custom pricing available - Contact for details',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    description: 'AI-powered book auditing platform with 99.9% accuracy, custom knowledge bases, and agentic workflows that 10x your content quality efficiency.',
    featureList: [
      'AI-powered Book Proofreader',
      'Multilingual Publishing AI Agent',
      'AI Book Writing Agent',
      'AI Template and Style Sheet Generator',
      'Book Cover Generator',
      'Interactive Learning Generators',
    ],
  };
}

export function generateBlogPostSchema(
  title: string,
  description: string,
  author: string,
  publishedDate: string,
  imageUrl: string,
  slug: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PagePerfect AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wrytflow.com/logo.png',
      },
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wrytflow.com/blog/${slug}`,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

