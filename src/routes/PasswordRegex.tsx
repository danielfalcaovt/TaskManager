export default function PasswordRegex(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm
    return passwordRegex.test(password)
}