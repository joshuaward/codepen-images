import axios from 'axios';

import { trackErrorInfo } from './digitalData';
import { checkErrorCode } from '../utils/validators';

import { version } from '../../package.json';

export const setupInterceptors = (history) => {
    const errorHandler = (error) => {
        const response = error.response;

        if (response) {
            // This is wrapped in a try catch so error logging
            // does not prevent the promise from being rejected
            // Ex. This could occur if an error code is not returned from services
            try {
                const { data: { code }, status } = error.response;
                trackErrorInfo({
                    name: code,
                    code: status,
                    action: `${code} action`,
                    message: checkErrorCode(code),
                    type: 'Application Error'

                });
            } catch {
                console.log('An error occured while logging error.');
            }

            // Unauthorized response statuses from service
            // Kick the user to the timeout page
            if (response.status === 401 && !(window.location.href.indexOf('login') > -1)) {
                let timeoutUrl = '/timeout';
                if (sessionStorage.getItem('userTypeMtf') === 'true') {
                    timeoutUrl = '/mtfTimeout';
                }
                return history.push(timeoutUrl);
            }

            // F5 blocked the request using Shape
            if (response.status === 403 && response.headers['shape-security']) {
                console.log('response iss', response);
                const doc = document.createElement('div');
                    doc.innerHTML = response.data;
                const id = doc.querySelector('span').innerHTML;

                return history.push(`/security/${id}`);
            }
        }

        return Promise.reject(error);
    };

    axios.interceptors.request.use((request) => {
        // const accessToken = authClient.getAccessToken();

        // console.log('axios.interceptors.request accessToken', accessToken);

        // const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

        // request.headers.common.Authorization = `Bearer ${accessToken}`;
        request.headers.common.Accept = 'application/json'; // eslint-disable-line no-param-reassign
        return request;
    }, (error) => Promise.reject(error));

    axios.interceptors.response.use(
        (response) => response,
        errorHandler
    );
};

const query = ({
    endpoint,
    data = null,
    method = 'POST',
    headers = {},
    opts = { retry: true },
    type = 'json'
}) => {
    const requestObj = {
        method,
        url: endpoint,
        withCredentials: true,
        retry: opts.retry,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        data,
        responseType: type
    };

    if (version.includes('alpha')) {
        requestObj.headers['Cigna-Synthetic'] = 'CignaScanning';
    }

    return axios(requestObj);
};

export default query;
