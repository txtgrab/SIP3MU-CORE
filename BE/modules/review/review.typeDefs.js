export const reviewTypeDefs = `#graphql
  input InputDeskPenelitian {
    id_usulan: Int!
    skor_1: Int!
    skor_2: Int!
    skor_3: Int!
    skor_4: Int!
    skor_5: Int!
    skor_6: Int!
    rekom_dana: Int!
    komentar: String!
    ketetapan: String! # Isi dengan: 'didanai', 'tidak_didanai', atau 'revisi'
  }

  type DeskPenelitian {
    id_desk: Int!
    total: Int!
    komentar: String!
    ketetapan: String!
  }

  type Mutation {
    nilaiDeskPenelitian(input: InputDeskPenelitian!): DeskPenelitian
  }
`;