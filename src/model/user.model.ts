export interface UserType {
  id: number
  name: string
  document: string
  birthdate?: string
  nickname: string
  email: string
  type: 'pf' | 'pj'
  score?: number
  about?: string
}

class User implements UserType {
  id: number
  name: string
  document: string
  birthdate?: string
  nickname: string
  email: string
  type: 'pf' | 'pj'
  score?: number

  constructor(params?: UserType) {
    Object.assign(this, params)
  }
}
