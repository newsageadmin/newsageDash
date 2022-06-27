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
            <span v-if="isNew">新增廣告</span>
            <span v-else style="color: #000">編輯廣告</span>
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
            <div class="col-sm-5">
              <div class="mb-3">
                <label for="uploadImg" class="form-label">
                  新增圖片<span class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1"
                    >請上傳875x1167 (px)</span
                  ></label
                >
                <input
                  accept="image/*"
                  type="file"
                  class="form-control mb-3"
                  id="uploadImg"
                  ref="pathClear"
                  @change="upload('main', $event)"
                />
                <div>
                  <img :src="tempProduct.imgStr" class="img-fluid mb-3" />
                </div>

                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempProduct.imgStr"
                  @click="tempProduct.imgStr = ''"
                >
                  刪除檔案
                </button>
              </div>
              <div class="mb-3">
                <label for="uploadImg2" class="form-label">
                  新增長型廣告圖片<span
                    class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1"
                    >請上傳1296x154 (px)</span
                  ></label
                >
                <input
                  accept="image/*"
                  type="file"
                  class="form-control mb-3"
                  id="uploadImg2"
                  ref="pathClear"
                  @change="upload('main2', $event)"
                />
                <div>
                  <img :src="tempProduct.imgLong" class="img-fluid mb-3" />
                </div>

                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempProduct.imgLong"
                  @click="tempProduct.imgLong = ''"
                >
                  刪除檔案
                </button>
              </div>
              <div class="mb-3">
                <label for="uploadImg3" class="form-label">
                  新增列表手機廣告圖片<span
                    class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1"
                    >請上傳651x285 (px)</span
                  ></label
                >
                <input
                  accept="image/*"
                  type="file"
                  class="form-control mb-3"
                  id="uploadImg3"
                  ref="pathClear"
                  @change="upload('main3', $event)"
                />
                <div>
                  <img :src="tempProduct.imgMobi" class="img-fluid mb-3" />
                </div>

                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempProduct.imgMobi"
                  @click="tempProduct.imgMobi = ''"
                >
                  刪除檔案
                </button>
              </div>

              <div class="mb-3">
                <p>頻道放置</p>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="1"
                    id="n1"
                    v-model="tempProduct.channelId"
                  />
                  <label class="form-check-label" for="n1"> 新一代觀點 </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="2"
                    id="n2"
                    v-model="tempProduct.channelId"
                  />
                  <label class="form-check-label" for="n2"> 話題 </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="3"
                    id="n3"
                    v-model="tempProduct.channelId"
                  />
                  <label class="form-check-label" for="n3"> 台中腔 </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="4"
                    id="n4"
                    v-model="tempProduct.channelId"
                  />
                  <label class="form-check-label" for="n4"> 教育 </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="5"
                    id="n5"
                    v-model="tempProduct.channelId"
                  />
                  <label class="form-check-label" for="n5"> 健康 </label>
                </div>
                  <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="7"
                    id="n7"
                    v-model="tempProduct.channelId"
                  />
                  <label class="form-check-label" for="n7"> 首頁 </label>
                </div>
              </div>
            </div>
            <div class="col-sm-7">
            
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

              <div class="row">
                <div class="mb-3 col-md">
                  <div class="form-floating">
                    <!-- v-model 綁定 tempProduct.category -->
                    <input
                      id="category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入連結"
                      v-model="tempProduct.link"
                    />
                    <label for="category" class="form-label">連結</label>
                  </div>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ElMessage } from "element-plus";

export default {
  props: ["product", "isNew", "img"],
  emits: ["get-data"],
  data() {
    return {
      modal: "",
      bannerNum: [],
      channelId:[],
      tempProduct: {},
      url: "https://api.news-age.tw/",
      editor: ClassicEditor,
      imageLoaded: false,
      image: {
        size: "",
        height: "",
        width: "",
      },
      editorConfig: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "blockquote",
          "imageUpload",
          "link",
          "|",
          "numberedList",
          "bulletedList",
          "|",
          "undo",
          "redo",
        ],
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
      focus: false,
    });
  },
  methods: {
    updateProduct() {
      let url = "https://api.news-age.tw/ad/";
      let http = "post";
      if (!this.isNew) {
        url = `https://api.news-age.tw/ad/${this.tempProduct.id}`;
        http = "put";
        console.log("put", url);
        console.log("put的物件", this.product);
      }
   
     
      console.log("post", this.tempProduct);

      this.$http[http](url, this.tempProduct)
        .then((response) => {
          console.log("回傳", response.data.data);
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
        const MAX_WIDTH =875;
        const MAX_HEIGHT = 1167;

        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        if (!file || file.type.indexOf("image/") !== 0) return;
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
              this.$refs.pathClear.value = "";
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的高度是${this.image.height}`
              );
              this.imageLoaded = false;
              this.$refs.pathClear.value = "";

              return;
            }
            console.log(this.imageLoaded);

            if (this.imageLoaded) {
              const formData = new FormData();
              formData.append("imgSingle", file);

              this.$http
                .post("https://api.news-age.tw/imgUpload", formData)
                .then((res) => {
                  this.tempProduct.imgStr = res.data;
                  console.log("回傳", res.data);
                  this.$refs.pathClear.value = "";

                  ElMessage.success("上傳圖片成功");
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
      } else if (isMain == "main2") {
        const MAX_WIDTH = 1296;
        const MAX_HEIGHT = 154;

        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        if (!file || file.type.indexOf("image/") !== 0) return;
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
              this.$refs.pathClear.value = "";
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的高度是${this.image.height}`
              );
              this.imageLoaded = false;
              this.$refs.pathClear.value = "";

              return;
            }
            console.log(this.imageLoaded);

            if (this.imageLoaded) {
              const formData = new FormData();
              formData.append("imgSingle", file);

              this.$http
                .post("https://api.news-age.tw/imgUpload", formData)
                .then((res) => {
                  this.tempProduct.imgLong = res.data;
                  console.log("回傳", res.data);
                  this.$refs.pathClear.value = "";

                  ElMessage.success("上傳圖片成功");
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
      } else if (isMain == "main3") {
        const MAX_WIDTH = 651;
        const MAX_HEIGHT = 285;

        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        if (!file || file.type.indexOf("image/") !== 0) return;
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
              this.$refs.pathClear.value = "";
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的高度是${this.image.height}`
              );
              this.imageLoaded = false;
              this.$refs.pathClear.value = "";

              return;
            }
            console.log(this.imageLoaded);

            if (this.imageLoaded) {
              const formData = new FormData();
              formData.append("imgSingle", file);

              this.$http
                .post("https://api.news-age.tw/imgUpload", formData)
                .then((res) => {
                  this.tempProduct.imgMobi = res.data;
                  console.log("回傳", res.data);
                  this.$refs.pathClear.value = "";

                  ElMessage.success("上傳圖片成功");
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
  },
};
</script>








