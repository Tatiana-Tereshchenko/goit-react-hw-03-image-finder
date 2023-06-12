import axios from 'axios';

const API_KEY = '35750052-8f7833963258536162b8e8fdc';
const BASE_URL = 'https://pixabay.com/api/';

export class ApiService {
    static fetchImages(searchQuery, currentPage) {
    return axios.get(BASE_URL, {
        params: {
        key: API_KEY,
        q: searchQuery,
        page: currentPage,
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
        },
    });
    }
}

