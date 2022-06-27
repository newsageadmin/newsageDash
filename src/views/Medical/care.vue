<template>
  <div>
     <Loading :active="isLoading"></Loading>
    <div class="text-center mt-3 mb-3"><h2>健康-Care主題精選</h2></div>
    <div class="container-fluid">
  <div class="row justify-content-end">

  <div class="col-md-3">
  <select class="form-select" aria-label="Default select example" v-model="catalog"  @change="getTopList(catalog)">
  
  <option value="medicalB_1">上左</option>
  <option value="medicalB_2">上右</option>
  <option value="medicalB_3">下左</option>
  <option value="medicalB_4">下右</option>
  </select>
    </div>
  
      </div>

 
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
      catalog:'medicalB_1',
      url:'https://apilan.news-age.tw',
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    getTopList( catalog ) {
      this.isLoading = true;
      this.$http(`${this.url}/getData/position/醫療/${this.catalog}`)

    
        .then((res) => {           
             setTimeout(() => {
                 this.isLoading = false;
                },1000)  
          this.products = res.data;
          console.log(this.products);
          this.products.length = 1;
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
