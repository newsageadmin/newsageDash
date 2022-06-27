import axios from 'axios';

class MyUploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        const formData = new FormData();
        const url = 'http://apilan.news-age.tw/imgUpload/';

      //  .post(`http://apilan.news-age.tw/imgUpload/`, formData)
        return new Promise((resolve) => {
            this.loader.file
                .then((loadFile) => {
                        formData.append("imgSingle", loadFile);
                        return axios.post(url, formData)
                            .then((res) => {
                                // this.tempProduct.imageUrl = res.data.imageUrl;
                                console.log(res.data);
                                resolve({
                                    default: res.data,
                                })
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }


                )

        })



    }


    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }


}


export default MyUploadAdapter;