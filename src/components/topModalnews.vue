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
          
            <div class="col-sm-12">
                 <div class="form-floating mb-3">
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入ID"
                  v-model="tempProduct.hot_id"
                />
                <label for="title" class="form-label">文章ID(需要和文章對應)</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.hot_title"
                />
                <label for="title" class="form-label">標題1</label>
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
export default {
  props: ["product", "isNew"],
  emits: ["get-data"],
  data() {
    return {
      modal: "",
      tempProduct: {},
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
      console.dir(event);
      const file = event.target.files[0];
      //console.log(file);
      const formData = new FormData();
      formData.append("file-to-upload", file);
      //console.log( formData)
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/admin/upload`,
          formData
        )
        .then((res) => {
          if ( isMain === "main" ) {
            this.tempProduct.imageUrl = res.data.imageUrl;
            this.$refs.pathClear.value = "";
          } else if (
            isMain === "sub" &&
            !Array.isArray(this.tempProduct.imagesUrl)
          ) {
            this.tempProduct.imagesUrl = [];
            console.log("a", res.data.imageUrl);
            this.tempProduct.imagesUrl.push(res.data.imageUrl);
            this.$refs.pathesClear.value = "";
          } else if (
            isMain === "sub" &&
            Array.isArray(this.tempProduct.imagesUrl)
          ) {
            console.log("b", res.data.imageUrl);
            this.tempProduct.imagesUrl.push(res.data.imageUrl);
            this.$refs.pathesClear.value = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>