//test
export interface LoginResponse {
    tokens: {
        access: {
            token: string,
            expires: string // Puedes ajustar el tipo de dato según el formato de fecha y hora que estés utilizando
        },
        refresh: {
            token: string,
            expires: string // Puedes ajustar el tipo de dato según el formato de fecha y hora que estés utilizando
        }
    },
    user: UserProps
}

export interface UserProps {
    id: number,
    email: string,
    role: string,
    username: string
}