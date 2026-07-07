import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Começando o seed...');

  // usuário Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@netguard.io' },
    update: {},
    create: {
      email: 'admin@netguard.io',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin criado:', admin.email);

  // Dispositivos
  const devices = await Promise.all([
    prisma.device.create({ 
      data: { 
        name: 'Firewall Principal', 
        ip: '192.168.1.1', 
        type: 'router', 
        status: 'online', 
        uptime: '45d 12h', 
        location: 'Data Center A' 
      } 
    }),
    prisma.device.create({ 
      data: { 
        name: 'Servidor Web', 
        ip: '192.168.1.10', 
        type: 'server', 
        status: 'online', 
        uptime: '30d 8h', 
        location: 'Data Center A' 
      } 
    }),
    prisma.device.create({ 
      data: { 
        name: 'Switch Core', 
        ip: '192.168.1.2', 
        type: 'switch', 
        status: 'online', 
        uptime: '60d 3h', 
        location: 'Data Center B' 
      } 
    }),
    prisma.device.create({ 
      data: { 
        name: 'Access Point', 
        ip: '192.168.1.50', 
        type: 'ap', 
        status: 'warning', 
        uptime: '12d 5h', 
        location: 'Escritório 2F' 
      } 
    }),
  ]);
  console.log(`✅ ${devices.length} dispositivos criados.`);

  // Eventos de Segurança
  const events = await Promise.all([
    prisma.securityEvent.create({ 
      data: { 
        type: 'blocked', 
        message: 'Tentativa de acesso não autorizado bloqueada', 
        ip: '203.0.113.42', 
        severity: 'high' 
      } 
    }),
    prisma.securityEvent.create({ 
      data: { 
        type: 'warning', 
        message: 'Múltiplas falhas de login detectadas', 
        ip: '198.51.100.23', 
        severity: 'medium' 
      } 
    }),
  ]);
  console.log(`✅ ${events.length} eventos de segurança criados.`);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });