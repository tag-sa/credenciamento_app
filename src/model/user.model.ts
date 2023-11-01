export interface UserType {
  id: number
  name: string
  gender: string
  document: string
  birthdate?: string
  nickname: string
  email: string
  type: 'pf' | 'pj'
  score?: number
  about?: string
  avatarUrl?: string
}

export class User implements UserType {
  id: number
  name: string
  gender: string
  document: string
  birthdate?: string
  nickname: string
  email: string
  type: 'pf' | 'pj'
  score?: number
  about?: string
  avatarUrl?: string

  constructor(params?: UserType) {
    Object.assign(this, params)
  }

  static genders = [
    { id: 'm', name: 'Masculino' },
    { id: 'f', name: 'Feminino' },
    { id: 'o', name: 'Outros' },
    { id: 'n', name: 'Não informar' }
  ]
}
