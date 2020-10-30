export interface Message {
    firstName: string,
    lastName: string, 
    email: string,
    message: string,
    date: Date,
    seen: boolean,
    key?: string
}