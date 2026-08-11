import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';

// Import Prisma dengan aman
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// Inisialisasi super simpel
const prisma = new PrismaClient();

const app = express();

const typeDefs = `#graphql
  type Institusi {
    id_institusi: Int!
    kode_institusi: String!
    nama_institusi: String!
    tipe: String!
  }

  type Query {
    getInstitusi: [Institusi]
    halo: String
  }
`;

const resolvers = {
  Query: {
    halo: () => 'Halo dari Backend SIP3MU!',
    getInstitusi: async () => {
      return await prisma.tb_institusi.findMany();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async () => ({ prisma }),
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server backend SIP3MU jalan di http://localhost:${PORT}/graphql`);
});