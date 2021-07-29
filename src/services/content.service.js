import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class ContentService{

    getPost = (post) => {
        axios.get(API_URL + '/get-image',{
        })
        .then((res) => {
            //console.log(res)
            // console.log(this)
            this.img = res
            return(res)
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    savePost = (postImg) => {
    var imagePath
    var formData = new FormData();
    formData.append('author', JSON.parse(localStorage.getItem('user')).username);
    formData.append('img', postImg);
    var postData = {
        img : postImg,
        author: JSON.parse(localStorage.getItem('user')).username
    }
    axios.post(API_URL + '/upload-image',{
        postData
         }).then(res => {
            imagePath = res.data.path
             });
  

}
}

export default new ContentService();