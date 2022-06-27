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
                <label for="uploadImg" class="form-label">新增圖片<span class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1">請上傳800x450 (px)</span></label>
                <input
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

              <div class="mb-3">
                <label for="uploadImg" class="form-label">新增圖片<span class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1">請上傳400x400 (px)</span></label>
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
      tempProduct: {
         
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
      let url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product`;
      let http = "post";
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        http = "put";
        console.log(url);
      }
      this.$http[http](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          // this.getProducts(); 這裡沒有getProducts()--外層的方法
          this.$emit("get-data");
          this.modal.hide();
          // this.productModal.hide();
        })
        .catch((err) => {
          alert(err.data.message);
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
      if( isMain == "main" ){
      // console.log(event.target);
      //console.log('e'+ event);
      const file = event.target.files[0];
      // console.log(file);
      const formData = new FormData();
      formData.append("imgSingle", file);
      // console.log(formData);

      this.$http.post(`http://apilan.news-age.tw/imgUpload/`, formData )
        .then((res) => {

            this.tempProduct.imageRec = res.data;
            this.$refs.pathClear.value = "";
            console.log('16比9',res.data);
            ElMessage.success("上傳圖片成功");
        })
        .catch((err) => {
          console.dir(err);
        });
      
      }else if(  isMain == "main2"  ){
        
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("imgSingle", file);

      this.$http.post(`http://apilan.news-age.tw/imgUpload/`, formData )
        .then((res) => {

            this.tempProduct.imageSqu = res.data;
            this.$refs.pathClear.value = "";
            console.log('1比1', res.data);
            ElMessage.success("上傳圖片成功");
        })
        .catch((err) => {
          console.dir(err);
        });
      
      }
    
    },
    //時間處理
    formDate(time){
        return time.split("T")[0]
    }
  },
};
</script>