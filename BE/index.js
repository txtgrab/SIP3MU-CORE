import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import pkg from '@prisma/client';
import jwt from 'jsonwebtoken';

// 1. IMPORT MODUL YANG SUDAH DIGABUNG
import { typeDefs, resolvers } from './modules/index.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();

// 2. SETUP APOLLO SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

// 3. SETUP EXPRESS & CONTEXT
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || '';
      let currentUser = null;

      if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
          currentUser = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          console.log('Token tidak valid atau sudah kedaluwarsa');
        }
      }

      return { prisma, currentUser };
    },
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server backend SIP3MU jalan di http://localhost:${PORT}/graphql`);
});