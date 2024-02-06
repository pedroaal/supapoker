export interface IUser {
  id: string
  name: string
  owner: boolean
}

export interface ICreateUser {
  name: string
  owner?: boolean
}

export interface IUserRes {
  id: string
  name: string
  owner: boolean
}
