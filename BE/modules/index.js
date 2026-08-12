import { authTypeDefs } from './auth/auth.typeDefs.js';
import { authResolvers } from './auth/auth.resolvers.js';
import { institusiTypeDefs } from './institusi/institusi.typeDefs.js';
import { institusiResolvers } from './institusi/institusi.resolvers.js';
import { usulanTypeDefs } from './usulan/usulan.typeDefs.js';
import { usulanResolvers } from './usulan/usulan.resolvers.js';

// BARU: Import modul review
import { reviewTypeDefs } from './review/review.typeDefs.js';
import { reviewResolvers } from './review/review.resolvers.js';

export const typeDefs = [authTypeDefs, institusiTypeDefs, usulanTypeDefs, reviewTypeDefs];
export const resolvers = [authResolvers, institusiResolvers, usulanResolvers, reviewResolvers];