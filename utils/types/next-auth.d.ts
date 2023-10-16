import "next-auth"

declare module "next-auth" {
  export interface JWT {
    isGuest?: boolean
    id: string
  }

  export interface User {
    isGuest?: boolean
    id: string
  }
  
  export interface Session {
    isGuest?: boolean
    user: User
  }
}
