import httpService from "./http.service";

const qualityEndpoint = "quality/";

const qualityService = {
    get: async (id) => {
        const { data } = await httpService.get(qualityEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    }
};
export default qualityService;
