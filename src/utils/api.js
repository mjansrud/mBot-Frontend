import axios from 'axios';
import { getAccessToken } from './AuthService';

//Compile for spesific environment
var env = process.env.REACT_APP_ENVIRONMENT || 'development';

//Constants
const BASE_URL = (env == 'development') ? process.env.REACT_APP_PRODUCTION_URL_API : process.env.process.env.REACT_APP_DEVELOPMENT_URL_API;

export {getTickerData, getChartData, getTradesData};

//Functions
function getTickerData() {
    const url = `${BASE_URL}/api/ticker`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

function getChartData(pair, period, start, end) {
    const url = `${BASE_URL}/api/chart/${pair}/${period}/${start}/${end}`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

function getTradesData(pair, start, end) {
    const url = `${BASE_URL}/api/trades/${pair}/${start}/${end}`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}