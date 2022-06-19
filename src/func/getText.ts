export const getText = (str: string) => {
    return str.length < 33 ? str : str.slice(0, 33) + "..."
}