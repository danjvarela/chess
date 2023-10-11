import "next-auth"

declare module "next-auth" {
  export interface Session {
    isGuest?: boolean
  }

  export interface JWT {
    isGuest?: boolean
  }

  export interface User {
    isGuest?: boolean
  }
}
