export const authTypeDefs = `#graphql
  type User {
    id_user: Int!
    username: String!
    nama: String
    email: String
    roles: [String] # Tambahan agar frontend tahu role user ini
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type Query {
    # Endpoint untuk mengambil data profil user yang sedang login
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse
  }
`;