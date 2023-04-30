import axios from "axios";

const questionsApi = axios.create({
    baseURL: `https://opentdb.com/api.php`
})

export default questionsApi