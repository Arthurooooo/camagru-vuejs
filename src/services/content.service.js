import axios from 'axios';
import store from '../store'


const API_URL = 'http://localhost:8080/api';

class ContentService{

    getUserLastPosts = (post) => {
        axios.get(API_URL + '/get-image',{
        })
        .then((res) => {
            //console.log(res)
            //console.log(this)
            this.img = res
            return(res)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    savePost = (postImg) => {
    var imagePath
    var postData = {
        img : postImg,
        author: store.state.auth.user.id,
        date: Date.now()
    }
    console.log(store.state.auth.user.id)
    axios.post(API_URL + '/upload-image',{
        postData
         })
         .then(res => {
            imagePath = res.data.path
             });
    }
}

export default new ContentService();