
import { prisma } from '@/lib/db';
import { ActivityType } from '@prisma/client';

interface LogActivityParams {
  type: ActivityType;
  description: string;
  userId?: string;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
}

export async function logActivity({
  type,
  description,
  userId,
  metadata,
  ipAddress,
  userAgent
}: LogActivityParams) {
  try {
    await prisma.activityLog.create({
      data: {
        type,
        description,
        userId,
        metadata,
        ipAddress,
        userAgent
      }
    });
  } catch (error) {
    console.error('Erro ao registrar atividade:', error);
  }
}

// Funções auxiliares para tipos específicos de atividades
export const ActivityLogger = {
  userLogin: (userId: string, ipAddress?: string, userAgent?: string) =>
    logActivity({
      type: 'USER_LOGIN',
      description: 'Usuário fez login no sistema',
      userId,
      ipAddress,
      userAgent
    }),

  userLogout: (userId: string, ipAddress?: string, userAgent?: string) =>
    logActivity({
      type: 'USER_LOGOUT',
      description: 'Usuário fez logout do sistema',
      userId,
      ipAddress,
      userAgent
    }),

  templateCreated: (userId: string, templateTitle: string, templateId: string) =>
    logActivity({
      type: 'TEMPLATE_CREATED',
      description: `Template "${templateTitle}" foi criado`,
      userId,
      metadata: { templateId, templateTitle }
    }),

  templateUpdated: (userId: string, templateTitle: string, templateId: string) =>
    logActivity({
      type: 'TEMPLATE_UPDATED',
      description: `Template "${templateTitle}" foi atualizado`,
      userId,
      metadata: { templateId, templateTitle }
    }),

  templateDeleted: (userId: string, templateTitle: string, templateId: string) =>
    logActivity({
      type: 'TEMPLATE_DELETED',
      description: `Template "${templateTitle}" foi excluído`,
      userId,
      metadata: { templateId, templateTitle }
    }),

  fileUploaded: (userId: string, fileName: string, fileSize: number) =>
    logActivity({
      type: 'FILE_UPLOADED',
      description: `Arquivo "${fileName}" foi enviado`,
      userId,
      metadata: { fileName, fileSize }
    }),

  downloadGenerated: (userId: string, templateTitle: string, downloadId: string) =>
    logActivity({
      type: 'DOWNLOAD_GENERATED',
      description: `Link de download gerado para "${templateTitle}"`,
      userId,
      metadata: { downloadId, templateTitle }
    }),

  paymentReceived: (userId: string, amount: number, templateTitle: string) =>
    logActivity({
      type: 'PAYMENT_RECEIVED',
      description: `Pagamento de R$ ${amount.toFixed(2)} recebido para "${templateTitle}"`,
      userId,
      metadata: { amount, templateTitle }
    }),

  userCreated: (adminId: string, newUserEmail: string, newUserId: string) =>
    logActivity({
      type: 'USER_CREATED',
      description: `Novo usuário criado: ${newUserEmail}`,
      userId: adminId,
      metadata: { newUserEmail, newUserId }
    }),

  userUpdated: (adminId: string, targetUserEmail: string, targetUserId: string) =>
    logActivity({
      type: 'USER_UPDATED',
      description: `Usuário ${targetUserEmail} foi atualizado`,
      userId: adminId,
      metadata: { targetUserEmail, targetUserId }
    }),

  userDeleted: (adminId: string, targetUserEmail: string, targetUserId: string) =>
    logActivity({
      type: 'USER_DELETED',
      description: `Usuário ${targetUserEmail} foi excluído`,
      userId: adminId,
      metadata: { targetUserEmail, targetUserId }
    }),

  adminAction: (adminId: string, action: string, details?: any) =>
    logActivity({
      type: 'ADMIN_ACTION',
      description: `Ação administrativa: ${action}`,
      userId: adminId,
      metadata: details
    })
};
