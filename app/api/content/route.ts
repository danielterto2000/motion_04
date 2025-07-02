
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const section = searchParams.get('section');

    if (section === 'homepage') {
      // Buscar todos os dados da homepage
      const [contents, heroSlides, features, statistics, testimonials, siteSettings] = await Promise.all([
        prisma.content.findMany({
          where: { 
            isActive: true,
            type: {
              in: ['HOMEPAGE_HERO', 'HOMEPAGE_FEATURES', 'HOMEPAGE_STATS', 'HOMEPAGE_TESTIMONIALS', 'HOMEPAGE_CTA']
            }
          }
        }),
        prisma.heroSlide.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }),
        prisma.feature.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }),
        prisma.statistic.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }),
        prisma.testimonial.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }),
        prisma.siteSettings.findFirst()
      ]);

      return NextResponse.json({
        contents: contents.reduce((acc, content) => {
          acc[content.type] = content;
          return acc;
        }, {} as any),
        heroSlides,
        features,
        statistics,
        testimonials,
        siteSettings
      });
    }

    if (type) {
      // Buscar conteúdo específico por tipo
      const content = await prisma.content.findUnique({
        where: { 
          type: type as any,
          isActive: true 
        }
      });

      return NextResponse.json({ content });
    }

    // Buscar configurações do site
    const siteSettings = await prisma.siteSettings.findFirst();
    return NextResponse.json({ siteSettings });

  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
