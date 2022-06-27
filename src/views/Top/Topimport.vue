<template>
  <div>
     <Loading :active="isLoading"></Loading>
    <div class="text-center mt-3 mb-3"><h2>話題-話題評論版</h2></div>
    <div class="container-fluid">
      <!-- <div class="text-end mt-4">
        <el-button type="primary" @click="openModal('add')">
          建立新的文章
        </el-button>
      </div> -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="text-center">ID</th>
            <th scope="col">圖片</th>
            <th scope="col">標題</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in products" :key="item.id">
            <tr>
              <th scope="row" class="text-center">{{ item.id }}</th>
              <td width="300">
                <img :src="item.imageRec" class="img-fluid" />
              </td>
              <td>{{ item.title }}</td>

              <!-- <td width="50">
                <el-button plain type="primary" @click="openModal('edit', item)"
                  >編輯</el-button
                >
              </td>
              <td width="50">
                <el-button plain type="danger" @click="delItem(item)">刪除</el-button>
              </td> -->
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <product-modal
      ref="productModal"
      :product="tempProduct"
      :is-new="isNew"
      @get-data="getTopList"
    ></product-modal>
  </div>
</template>

<script>
import ProductModal from "../../components/topModalA.vue";

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      url:'https://apilan.news-age.tw/getData',
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    getTopList() {
      this.isLoading = true;
      this.$http(`${this.url}/position/話題/topicC`)
        .then((res) => {           
             setTimeout(() => {
                 this.isLoading = false;
                },1000)  
          this.products = res.data;
          this.products.length = 4;
          console.log(this.products);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    openModal(status, item) {
      if (status === "add") {
        this.tempProduct = {};
        this.isNew = true;
        this.$refs.productModal.openModal();
      } else if (status === "edit") {
        this.tempProduct = { ...item };
        // console.log(this.tempProduct.id);
        // if (!this.isNew) 使用put方法
        this.isNew = false;
        this.$refs.productModal.openModal();
      
      } 
    },
    delItem(item) {
      this.tempProduct = { ...item };
      const res = confirm( '刪除（' +  `${this.tempProduct.title}` + '）?' );
      if (res) {
        alert("你按了確定按鈕");
        console.log( this.tempProduct );
      } else {
        alert("你按了取消按鈕");
      }
    },
  },
  components: {
    ProductModal,
  },
  mounted() {
    this.getTopList();
  },
};
</script>
