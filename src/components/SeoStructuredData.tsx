import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Article } from '../types';

interface SeoStructuredDataProps {
  article?: Article | null;
}

export const SeoStructuredData: React.FC<SeoStructuredDataProps> = ({ article }) => {
  useEffect(() => {
    // Clean any existing injected json-ld scripts with id 'seo-structured-data'
    const existing = document.getElementById('seo-structured-data');
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.id = 'seo-structured-data';
    script.type = 'application/ld+json';

    if (article) {
      // Dynamic Rich Article Schema with FAQ & Medical WebPage
      const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'MedicalWebPage',
            '@id': `${window.location.origin}/artigo/${article.slug}#webpage`,
            'url': `${window.location.origin}/artigo/${article.slug}`,
            'name': article.title,
            'headline': article.title,
            'description': article.excerpt,
            'inLanguage': 'pt-BR',
            'datePublished': '2026-08-01',
            'dateModified': '2026-08-16',
            'image': article.imageUrl,
            'author': {
              '@type': 'Person',
              'name': article.author.name,
              'jobTitle': article.author.role,
              'description': article.author.crmOrBio || 'Comitê Científico Vital Hormonal'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Vital Hormonal',
              'url': window.location.origin,
              'logo': {
                '@type': 'ImageObject',
                'url': `${window.location.origin}/vite.svg`
              }
            },
            'medicalAudience': {
              '@type': 'MedicalAudience',
              'audienceType': 'Mulheres de 35 a 65 anos em transição hormonal, perimenopausa e climatério'
            },
            'aspect': 'Diagnosis, Symptoms, Nutrition, Lifestyle and Hormone Therapy'
          },
          ...(article.faqs && article.faqs.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  '@id': `${window.location.origin}/artigo/${article.slug}#faq`,
                  'mainEntity': article.faqs.map((faq) => ({
                    '@type': 'Question',
                    'name': faq.question,
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': faq.answer
                    }
                  }))
                }
              ]
            : []),
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Início',
                'item': window.location.origin
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': article.categoryLabel,
                'item': `${window.location.origin}/#${article.category}`
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': article.title,
                'item': `${window.location.origin}/artigo/${article.slug}`
              }
            ]
          }
        ]
      };

      script.text = JSON.stringify(schemaData);
    } else {
      // Main Portal Schema
      const mainPortalSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${window.location.origin}/#website`,
            'url': window.location.origin,
            'name': 'Vital Hormonal | Saúde, Longevidade & Hormônios da Mulher 35+',
            'description': 'Portal científico de referência em perimenopausa, menopausa, longevidade feminina, nutrição funcional e modulação hormonal baseada em evidências.',
            'inLanguage': 'pt-BR',
            'publisher': {
              '@type': 'Organization',
              'name': 'Vital Hormonal',
              'url': window.location.origin
            }
          },
          {
            '@type': 'Organization',
            '@id': `${window.location.origin}/#organization`,
            'name': 'Vital Hormonal',
            'url': window.location.origin,
            'sameAs': [
              'https://instagram.com/vitalhormonal',
              'https://youtube.com/@vitalhormonal'
            ],
            'knowsAbout': [
              'Perimenopausa',
              'Menopausa',
              'Terapia de Reposição Hormonal (TRH)',
              'Sarcopenia feminina',
              'Gordura visceral pós-40',
              'Névoa mental e estrogênio',
              'Saúde cardiovascular da mulher'
            ]
          }
        ]
      };

      script.text = JSON.stringify(mainPortalSchema);
    }

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('seo-structured-data');
      if (el) el.remove();
    };
  }, [article]);

  const title = article 
    ? `${article.title} | Vital Hormonal` 
    : 'Vital Hormonal | Saúde Funcional, Autonomia e Longevidade Feminina';
  
  const description = article 
    ? article.excerpt 
    : 'Portal científico de referência em perimenopausa, menopausa, longevidade feminina, nutrição funcional e reposição hormonal baseada em evidências.';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={article ? "article" : "website"} />
      {article && <meta property="og:image" content={article.imageUrl} />}
      <link rel="canonical" href={article ? `${window.location.origin}/artigo/${article.slug}` : window.location.origin} />
    </Helmet>
  );
};
