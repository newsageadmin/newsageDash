<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar" style="margin-right: 5px"></i>
          首頁
        </el-breadcrumb-item>
        <el-breadcrumb-item>廣告版位</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="text-center mt-3 mb-3">
      <h2>
        {{ channelBn }} <span v-if="channelBn == ''">全部</span> - 廣告版位
      </h2>
    </div>
    
    <div class="container-fluid">
      <div class="row justify-content-end">
        <div class="col-auto">
          <select 
            class="form-select"
            aria-label="Default select example"
            v-model="channelBn"
            @change="selectchBn(channelBn)"
          >
            <option value="">選擇頻道</option>
            <option value="新一代觀點">新一代觀點</option>
            <option value="話題">話題</option>
            <option value="台中腔">台中腔</option>
            <option value="教育">教育</option>
            <option value="醫療">健康</option>
          </select>
        </div>
        <div class="col-auto">
          <div class="text-end">
            <el-button type="primary" @click="openModal('add')">
              建立新的文章
            </el-button>
          </div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">普通廣告</th>
            <th scope="col">長型廣告</th>
            <th scope="col">列表手機廣告</th>
            <th scope="col">標題</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in products" :key="item.id">
            <tr>
              <td width="300">
                <img :src="item.imgStr" class="img-fluid" />
              </td>
              <td width="400"><img :src="item.imgLong" class="img-fluid" /></td>
              <td width="300"><img :src="item.imgMobi" class="img-fluid" /></td>

              <td>{{ item.title }}</td>

              <td width="50">
                <el-button plain type="primary" @click="openModal('edit', item)"
                  >編輯</el-button
                >
              </td>
              <td width="50">
                <el-button plain type="danger" @click="delItem(item)"
                  >刪除</el-button
                >
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
import ProductModal from "../components/allbannerModal.vue";

export default {
  data() {

    return {
      isLoading: false,
      products: [],
      channelBn: "",
      url: "https://api.news-age.tw",
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
    
  },
  
  methods: {

    getTopList(ch = "") {

      this.isLoading = true; 

      let url = `${this.url}/ad/${ch}`; 
      this.$http(url)
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
          channelId: [], 
        };
        this.isNew = true;
        this.$refs.productModal.openModal();
      } else if (status === "edit") {
        this.tempProduct = { ...item };

        console.log("原始", this.tempProduct.channelId);

        let strs = new Array(); //定義一陣列
        let strs2 = new Array(); //定義一陣列

        strs = this.tempProduct.channelId.split(","); //字元分割
        strs2 = this.tempProduct.intermediaryId.split(","); //字元分割

        this.tempProduct.channelId = strs;
        this.tempProduct.intermediaryId = strs2;
        
        console.log(this.tempProduct); 
        
        // console.log(this.tempProduct.id);
        // if (!this.isNew) 使用put方法
        this.isNew = false;
        this.$refs.productModal.openModal();
      } 
    },
    delItem(item) {
      this.tempProduct = { ...item };
      let url = `https://apilan.news-age.tw/ad/delete/${this.tempProduct.id}`;
      const res = confirm("刪除（" + `${this.tempProduct.title}` + "）?");
      if (res) {
        this.tempProduct.deleteStatus = 1;
        this.$http.put(url, this.tempProduct).then((res) => {
          console.log("回傳", res.data);
          alert("刪除成功");
          this.getTopList();
        });
      } else {
        alert("你按了取消按鈕");
      }
    },
    selectchBn(ch) {
      this.getTopList(ch);
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
