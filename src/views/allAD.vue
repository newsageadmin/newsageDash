<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar" style="margin-right: 5px"></i>
          首頁
        </el-breadcrumb-item>
        <el-breadcrumb-item>大版頭</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="text-center mt-3 mb-3"><h2>首頁-大版頭</h2></div>
    <div class="container-fluid">
      <div class="text-end mt-4">
        <el-button type="primary" @click="openModal('add')">
          建立新的文章
        </el-button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="text-center">ID</th>
            <th scope="col">頻道</th>
            <th scope="col">圖片</th>
            <th scope="col">標題</th>
            <th scope="col">簡短敘述文</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in products" :key="item.id">
            <tr>
              <th scope="row" class="text-center">{{ item.id }}</th>
              <td>{{ item.channel }}</td>
              <td width="300">
                <img :src="item.homeFront" class="img-fluid" />
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.subtext }}</td>

              <td width="50">
                <el-button  plain type="primary" @click="openModal('edit', item)"
                  >編輯</el-button
                >
              </td>
              <td width="50">
                <el-button  plain type="danger" @click="delItem(item)">刪除</el-button>
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
import ProductModal from "../components/alladModal.vue";

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      url: "https://api.news-age.tw",
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    getTopList() {
      this.isLoading = true;
      this.$http(`${this.url}/homeBn/`)
        .then((res) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
          this.products = res.data;
      
          console.log(this.products);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    openModal(status, item) {
      if (status === "add") {
        this.tempProduct = {
          chId:7,
          homeStatus:1,
          channel: "首頁",
        };
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
      let url = `https://api.news-age.tw/chBn/delete/${this.tempProduct.id}`;
      const res = confirm("刪除（" + `${this.tempProduct.title}` + "）?");
       if (res) {
        this.tempProduct.deleteStatus = 1;
        this.$http.put(url, this.tempProduct).then((res) => {
          console.log("回傳", res.data);
          alert('刪除文章成功');
          this.getTopList();
        });
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
