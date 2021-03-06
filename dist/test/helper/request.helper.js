const axios = require('axios');
async function apiRequest(packet) {
    try {
        const response = await axios(packet);
        const { status, data } = response;
        return { status, data };
    }
    catch (error) {
        return {
            status: error.response.data.status || 500,
            data: {
                error: error.response.data.message || 'unknown server issue'
            }
        };
    }
}
async function formattedApiRequest(packet) {
    //packet.host = packet.host || config.HOST
    packet.path = packet.path || '';
    packet.headers = packet.headers || {};
    //packet.url = packet.host+config.API_BASE+packet.path
    packet.method = packet.method || 'get';
    if (packet.token) {
        packet.headers["authorization"] = packet.token.type + " " + packet.token.value;
    }
    if (packet.params) {
        for (const k of Object.keys(packet.params)) {
            packet.url = packet.url.replace(':' + k, packet.params[k] + '');
        }
        delete packet.params;
    }
    if (packet.query) {
        const q = [];
        for (const k of Object.keys(packet.query)) {
            q.push(k + '=' + packet.query[k]);
        }
        packet.url += '?' + q.join('&');
        delete packet.query;
    }
    return await apiRequest(packet);
}
export { apiRequest, formattedApiRequest };
//# sourceMappingURL=request.helper.js.map