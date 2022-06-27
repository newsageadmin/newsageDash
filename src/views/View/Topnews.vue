<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar" style="margin-right: 5px"></i>
          台中腔
        </el-breadcrumb-item>
        <el-breadcrumb-item>HOTNEWS</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="text-center mt-3 mb-3"><h2>話題-HOTNEWS</h2></div>
    <div class="container-fluid">
      <div class="text-end mt-4">
        <el-button type="primary" @click="openModal('add')">
          建立新的文章
        </el-button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="text-center" width="30">ID</th>
            <th scope="col">標題</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in products" :key="item.id">
            <tr>
              <th scope="row" class="text-center" width="30">{{ item.hot_id }}</th>
              <td>{{item.hot_title}}</td>
              <td></td>
              <td></td>

              <td width="50">
                <el-button plain type="primary" @click="openModal('edit', item)"
                  >編輯</el-button
                >
              </td>
              <td width="50">
                <el-button plain type="danger" @click="delItem(item)">刪除</el-button>
              </td>
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
import ProductModal from "../../components/topModalnews.vue";

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    getTopList() {
      this.isLoading = true;
      this.$http("https://apilan.news-age.tw/hot/話題")
        .then((res) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
          this.products = res.data;
          this.products.length = 8;
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
      const res = confirm("刪除（" + `${this.tempProduct.title}` + "）?");
      if (res) {
        alert("你按了確定按鈕");
        console.log(this.tempProduct);
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
