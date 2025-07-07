export type SignUpType = {
    fullname: string,
    email: string,
    password: string
}

export type ApiResponse = {
    success: boolean,
    message: string,
    data: Object
}

export type LoginType = {
    email: string,
    password: string
}