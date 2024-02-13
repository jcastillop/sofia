
import axios from 'axios';


const spaxionApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_RESTSERVER}/api`,
    headers: {'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGRlODVkOWZiOWJiOTU0NjI1NWNmMzMiLCJpYXQiOjE3MDE4MDU5NDcsImV4cCI6MTcwMTg5MjM0N30.Forbj5PNGqhI_pQOmO2IomK3coBy8M8afa7R-YtbJLQ'}
});


export default spaxionApi;


