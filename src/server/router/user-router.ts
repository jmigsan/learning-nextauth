import { createProtectedRouter } from './protected-router';

// Example router with queries that can only be hit if the user requesting is signed in
export const userRouter = createProtectedRouter()
  .query('getRole', {
    async resolve({ ctx }) {
      const userRole = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      return userRole?.role;
    },
  })
  .query('getName', {
    async resolve({ ctx }) {
      const userRole = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
        select: { name: true },
      });

      return userRole?.name;
    },
  })
  .mutation('changeRole', {
    async resolve({ ctx }) {
      const userRole = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
        select: { role: true },
      });

      if (userRole?.role === 'USER') {
        const toAdmin = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            role: 'MOD',
          },
        });
      }
      if (userRole?.role === 'MOD') {
        const toAdmin = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            role: 'ADMIN',
          },
        });
      }
      if (userRole?.role === 'ADMIN') {
        const toAdmin = await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            role: 'USER',
          },
        });
      }

      return { success: true };
    },
  });
