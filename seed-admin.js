const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário administrador
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@broadcastmotion.com' },
    update: {},
    create: {
      email: 'admin@broadcastmotion.com',
      name: 'Administrador',
      password: adminPassword,
      userType: 'ADMIN',
      isActive: true,
      emailVerified: new Date(),
    },
  });

  // Criar alguns usuários de exemplo
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const userPassword = await bcrypt.hash('123456', 12);
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        email: `user${i}@example.com`,
        name: `Usuário ${i}`,
        password: userPassword,
        userType: i <= 2 ? 'CRIADOR' : 'CLIENTE',
        isActive: true,
        emailVerified: new Date(),
      },
    });
    users.push(user);
  }

  // Criar categorias
  const categories = [
    { name: 'Lower Thirds', slug: 'lower-thirds', description: 'Elementos gráficos para identificação', color: '#3B82F6' },
    { name: 'Transições', slug: 'transicoes', description: 'Efeitos de transição entre cenas', color: '#10B981' },
    { name: 'Logos', slug: 'logos', description: 'Animações de logotipos', color: '#F59E0B' },
    { name: 'Intros', slug: 'intros', description: 'Vinhetas de abertura', color: '#EF4444' },
    { name: 'Outros', slug: 'outros', description: 'Outros elementos gráficos', color: '#8B5CF6' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Criar tags
  const tags = [
    { name: 'Moderno', slug: 'moderno', color: '#3B82F6' },
    { name: 'Elegante', slug: 'elegante', color: '#10B981' },
    { name: 'Corporativo', slug: 'corporativo', color: '#F59E0B' },
    { name: 'Criativo', slug: 'criativo', color: '#EF4444' },
    { name: 'Minimalista', slug: 'minimalista', color: '#8B5CF6' },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  // Criar templates de exemplo
  const templates = [
    {
      title: 'Lower Third Moderno',
      description: 'Lower third elegante e moderno para identificação de pessoas',
      slug: 'lower-third-moderno',
      price: 29.90,
      category: 'LOWER_THIRDS',
      tags: ['moderno', 'elegante'],
      software: ['After Effects'],
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      fileSize: '15 MB',
      duration: '5 segundos',
      resolution: '1920x1080',
      fps: '30 fps',
      creatorId: users[0].id,
    },
    {
      title: 'Transição Suave',
      description: 'Transição suave e elegante entre cenas',
      slug: 'transicao-suave',
      price: 19.90,
      category: 'TRANSITIONS',
      tags: ['elegante', 'minimalista'],
      software: ['After Effects', 'Premiere Pro'],
      status: 'PUBLISHED',
      isActive: true,
      fileSize: '8 MB',
      duration: '2 segundos',
      resolution: '1920x1080',
      fps: '30 fps',
      creatorId: users[1].id,
    },
    {
      title: 'Logo Reveal Corporativo',
      description: 'Animação profissional para revelação de logotipo',
      slug: 'logo-reveal-corporativo',
      price: 49.90,
      category: 'LOGOS',
      tags: ['corporativo', 'elegante'],
      software: ['After Effects'],
      status: 'PUBLISHED',
      isActive: true,
      isFeatured: true,
      fileSize: '25 MB',
      duration: '8 segundos',
      resolution: '1920x1080',
      fps: '30 fps',
      creatorId: users[0].id,
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {},
      create: template,
    });
  }

  // Criar configurações do sistema
  const settings = [
    { key: 'site_name', value: 'Broadcast Motion', type: 'string', description: 'Nome do site', isPublic: true },
    { key: 'site_description', value: 'Marketplace de templates para motion graphics', type: 'string', description: 'Descrição do site', isPublic: true },
    { key: 'contact_email', value: 'contato@broadcastmotion.com', type: 'string', description: 'Email de contato', isPublic: true },
    { key: 'maintenance_mode', value: 'false', type: 'boolean', description: 'Modo de manutenção', isPublic: false },
    { key: 'commission_rate', value: '10', type: 'number', description: 'Taxa de comissão (%)', isPublic: false },
    { key: 'max_login_attempts', value: '5', type: 'number', description: 'Máximo de tentativas de login', isPublic: false },
    { key: 'session_timeout', value: '60', type: 'number', description: 'Timeout de sessão (minutos)', isPublic: false },
  ];

  for (const setting of settings) {
    await prisma.systemSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  // Criar conteúdos dinâmicos
  const contents = [
    {
      type: 'HOMEPAGE_HERO',
      title: 'Templates Profissionais para Motion Graphics',
      content: 'Descubra nossa coleção exclusiva de templates para After Effects, Premiere Pro e muito mais. Eleve seus projetos ao próximo nível com designs profissionais.',
      isActive: true,
    },
    {
      type: 'HOMEPAGE_FEATURES',
      title: 'Por que escolher nossos templates?',
      content: 'Qualidade profissional, fácil customização, suporte completo e atualizações constantes. Tudo que você precisa para criar projetos incríveis.',
      isActive: true,
    },
    {
      type: 'HOMEPAGE_CTA',
      title: 'Pronto para começar?',
      content: 'Explore nossa biblioteca de templates e transforme suas ideias em realidade. Cadastre-se agora e tenha acesso a conteúdo exclusivo.',
      isActive: true,
    },
  ];

  for (const content of contents) {
    await prisma.content.upsert({
      where: { type: content.type },
      update: {},
      create: content,
    });
  }

  // Criar algumas atividades de exemplo
  const activities = [
    {
      type: 'USER_LOGIN',
      description: 'Administrador fez login no sistema',
      userId: admin.id,
      metadata: { userAgent: 'Mozilla/5.0', ipAddress: '127.0.0.1' },
    },
    {
      type: 'TEMPLATE_CREATED',
      description: 'Template "Lower Third Moderno" foi criado',
      userId: users[0].id,
      metadata: { templateId: 'template-1' },
    },
    {
      type: 'ADMIN_ACTION',
      description: 'Sistema inicializado com dados de exemplo',
      userId: admin.id,
      metadata: { action: 'seed_database' },
    },
  ];

  for (const activity of activities) {
    await prisma.activityLog.create({
      data: activity,
    });
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log('📧 Admin: admin@broadcastmotion.com');
  console.log('🔑 Senha: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
