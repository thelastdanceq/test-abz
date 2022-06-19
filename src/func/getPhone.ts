export const getPhone = (num: string) => {
    const time = num.match(/(\+38)(\d{3})(\d{3})(\d{2})(\d{2})/)

    return time ? `${time[1]} (${time[2]}) ${time[3]} ${time[4]} ${time[5]}` : "none"
}   