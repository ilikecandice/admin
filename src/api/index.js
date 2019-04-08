import request from '@/util/request';
export default {
    getAccessTokenAPI: (code) => {
        let grant_type = process.env.GRANT_TYPE,
            client_id = process.env.CLIENT_ID,
            client_secret = process.env.CLIENT_SECRET,
            redirect_uri = process.env.REDIRECT_URI
        const data = {
            grant_type: process.env.GRANT_TYPE,
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri
        }
        const url = `${process.env.TOKEN_URL}?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`;
        return request({
            url: url,
            method: 'post',
            data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

}
