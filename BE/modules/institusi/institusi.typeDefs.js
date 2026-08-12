export const institusiTypeDefs = `#graphql
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

  type Mutation {
    tambahInstitusi(
      kode_institusi: String!
      nama_institusi: String!
      tipe: String!
    ): Institusi
  }
`;