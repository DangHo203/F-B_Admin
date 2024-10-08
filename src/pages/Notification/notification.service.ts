import axios from "../../axios"
export const getAllNotificationsAPI = async () => {
    return await axios({
        method: "GET",
        url: "/notification",
    })
}

export const sendNotificationAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/notification",
        params: data
    })
}

export const changeIsReadAPI = async (id: number) => {
    return await axios({
        method: "PUT",
        url: "/notification/isRead",
        params: {
            nof_id: id
        }
    })
}