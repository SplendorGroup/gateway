import { Request } from "express"

export type User = {
    id: string
    name: string
    email: string
    roles:  string[]
    permissions: string[]
}

export type RequestWithAuthUser = {
    user: User
} & Request