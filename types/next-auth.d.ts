import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
      lastName1: string
      lastName2: string
    }
  }

  interface User {
    id: string
    email: string
    firstName: string
    lastName1: string
    lastName2: string
  }
}
