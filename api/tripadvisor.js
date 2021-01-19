import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.tripadvisor.com/api/partner/2.0/',
});
