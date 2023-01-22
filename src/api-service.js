import axios from 'axios'
const URL = 'https://pixabay.com/api/'
const API_KEY = '33012964-d2f02498e1834ade0e55f92fd'

export default class ApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1
    }
    
    async fetchImages() {
        const response = await axios.get(`${URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        const data = await response.data;

        this.page += 1;
            
        return data;       
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    } 
}