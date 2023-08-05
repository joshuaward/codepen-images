import SERVICE_ENDPOINTS from '../constants/serviceEndpoints';
import query from './../utils/query';

// eslint-disable-next-line import/prefer-default-export
export const getCmsContent = (data) => query({
    endpoint: SERVICE_ENDPOINTS.APW_CMS_CONTENT,
    data
});
