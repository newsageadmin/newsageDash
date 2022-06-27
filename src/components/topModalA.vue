<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <!-- Modal表頭背景色會隨「新增產品」或「修改產品」不同而變色 -->
        <div
          :class="isNew ? 'bg-primary' : 'bg-warning'"
          class="modal-header text-white"
        >
          <h5 id="productModalLabel" class="modal-title text-center">
            <span v-if="isNew">新增文章</span>
            <span v-else style="color: #000">編輯文章</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="uploadImg" class="form-label"
                  >新增圖片<span class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1"
                    >請上傳440x440 (px)</span
                  ></label
                >
                <input
                  type="file"
                  class="form-control mb-3"
                  id="uploadImg"
                  ref="pathClear"
                  @change="upload('main2', $event)"
                />
                <img class="img-fluid mb-3" :src="tempProduct.imageSqu" />
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempProduct.imageSqu"
                  @click="tempProduct.imageSqu = ''"
                >
                  刪除檔案
                </button>
              </div>
              <div class="mb-3">
                <label
                  for="uploadImg"
                  class="form-label"
                  v-if="tempProduct.imageSqu"
                  >新增圖片<span class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1"
                    >請上傳1300x500 (px)</span
                  ></label
                >
                <input
                  v-if="tempProduct.imageSqu"
                  type="file"
                  class="form-control mb-3"
                  id="uploadImg"
                  ref="pathClear"
                  @change="upload('main', $event)"
                />
                <img class="img-fluid mb-3" :src="tempProduct.imageRec" />
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempProduct.imageRec"
                  @click="tempProduct.imageRec = ''"
                >
                  刪除檔案
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-floating mb-3">
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
                <label for="title" class="form-label">標題</label>
              </div>

              <hr />
              <div class="mb-3">
                <div class="form-floating">
                  <!-- v-model 綁定 tempProduct.description -->
                  <textarea
                    id="description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入簡短敘述文"
                    v-model="tempProduct.subtext"
                    style="height: 150px"
                  ></textarea>
                  <label for="description" class="form-label">簡短描述文</label>
                </div>
              </div>
            </div>

            <!-- button end -->
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="updateProduct"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import { ElMessage } from "element-plus";

export default {
  props: ["product", "isNew"],
  emits: ["get-data"],
  data() {
    return {
      modal: "",
      tempProduct: {},
      imageLoaded: false,
      apiimageUrl: "",
      image: {
        size: "",
        height: "",
        width: "",
      },
    };
  },
  watch: {
    product() {
      this.tempProduct = JSON.parse(JSON.stringify(this.product)); // 因為單向數據流的關係，所以要用深拷貝另外見一個物件來存資料
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal, {
      keyboard: false,
      backdrop: "static",
    });
  },
  methods: {
   updateProduct() {
      let url = "https://apilan.news-age.tw/getData";
      let http = "post";
      if (!this.isNew) {
        url = `https://apilan.news-age.tw/getData/${this.tempProduct.id}`;
        http = "put";
        console.log('put', url);
        console.log('put的物件' , this.product);
      }

      
     // this.tempProduct.chStatus = 1;
    
      

      console.log('post', this.tempProduct);


      this.$http[http](url,  this.tempProduct )
        .then((response) => {
          console.log('回傳', response.data.data);     
          ElMessage.success(response.data.message);

         
          // this.getProducts(); 這裡沒有getProducts()--外層的方法
          this.$emit("get-data");
          this.modal.hide();
          // this.productModal.hide();
        })
        .catch((err) => {
         
          console.log(err.message);
        });
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    //上傳圖片
    upload(isMain, event) {
      if (isMain == "main") {
        const MAX_WIDTH = 1300;
        const MAX_HEIGHT = 500;
        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        //  if (!file || file.type.indexOf("image/") !== 0) return;
        console.log("f", file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
          let img = new Image();
          img.onload = () => {
            this.image.width = img.width;
            this.image.height = img.height;
            this.imageLoaded = true;
            console.log(this.image);
            if (this.image.width !== MAX_WIDTH) {
              // ("圖片寬度不正確");
              ElMessage.error(
                `上傳圖片寬度錯誤，您上傳的寬度是${this.image.width}`
              );
              this.imageLoaded = false;
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的寬度是${this.image.height}`
              );
              this.imageLoaded = false;
              return;
            }
            console.log(this.imageLoaded);

            if (this.imageLoaded) {
              const formData = new FormData();
              formData.append("imgSingle", file);

              this.$http
                .post("https://api.news-age.tw/imgUpload", formData)
                .then((res) => {
                  this.tempProduct.imageRec = res.data;
                  this.$refs.pathClear.value = "";
                  ElMessage.success(res.data.messgae);
                })
                .catch((err) => {
                  console.dir(err);
                });
            } else {
              return;
            }
          };

          img.src = evt.target.result;
        };
        reader.onerror = (evt) => {
          console.error(evt);
        };
      }
      //1比1
      else if (isMain == "main2") {
        const MAX_WIDTH = 440;
        const MAX_HEIGHT = 440;

        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        //  if (!file || file.type.indexOf("image/") !== 0) return;
        console.log("f", file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
          let img = new Image();
          img.onload = () => {
            this.image.width = img.width;
            this.image.height = img.height;
            this.imageLoaded = true;
            console.log(this.image);
            if (this.image.width !== MAX_WIDTH) {
              // ("圖片寬度不正確");
              ElMessage.error(
                `上傳圖片寬度錯誤，您上傳的寬度是${this.image.width}`
              );
              this.imageLoaded = false;
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的寬度是${this.image.height}`
              );
              this.imageLoaded = false;
              return;
            }

            if (this.imageLoaded) {
              const formData = new FormData();
              formData.append("imgSingle", file);

              this.$http 
                .post("https://api.news-age.tw/imgUpload", formData)
                .then((res) => {
                  console.log(res.data);
                  this.tempProduct.imageSqu = res.data;

                  this.$refs.pathClear.value = "";
                  ElMessage.success('圖片上傳成功');
                })
                .catch((err) => {
                  console.dir(err);
                });
            } else {
              return;
            }
          };

          img.src = evt.target.result;
        };
        reader.onerror = (evt) => {
          console.error(evt);
        };
      }
    },
    //時間處理
    formDate(time) {
      return time.split("T")[0];
    },
  },
};
</script>