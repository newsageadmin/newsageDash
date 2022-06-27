<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="container-fluid">
      <div class="row justify-content-end mt-4">
        <div class="col-md-auto align-self-center">
          <div>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="channel"
              @change="getArticles((pageNum = 1), channel)"
            >
              <option value="">全部顯示</option>
              <option value="新一代觀點">觀點</option>
              <option value="話題">話題</option>
              <option value="台中腔">台中腔</option>
              <option value="教育">教育</option>
              <option value="醫療">健康</option>
            </select>
          </div>
        </div>
        <div class="col-md-auto">
          <div class="text-end">
            <el-button type="primary" @click="openModal('add', article)"
              >建立文章</el-button
            >
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table mt-4">
          <thead>
            <tr>
              <th style="width: 4%">ID</th>
              <th style="width: 4%">頻道</th>
              <th style="width: 100px">建立時間</th>
              <th style="width: 15%">圖片</th>
              <th style="width: 300px">標題</th>
              <th>描述</th>

              <th class="text-end">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.articleId">
              <td>{{ article.articleId }}</td>
              <td>{{ article.channelName }}</td>
              <td>{{ getDate(article.startDate) }}</td>
              <td>
                <a
                  title="點擊查看內文"
                  href="javascrtip:;"
                  @click.prevent="link(article.channelName, article.articleId)"
                  target="_blank"
                  ><img :src="article.imgSqu" class="img-fluid"
                /></a>
              </td>
              <td>{{ article.mainTitle }}</td>

              <td>{{ article.subText }}</td>

              <!-- <td>
              <span v-if="article.isPublic">已上架</span>
              <span v-else>未上架</span>
            </td> -->
              <td class="text-end">
                <div class="btn-group">
                  <el-button
                    type="primary"
                    plain
                    @click="getArticle(article)"
                    class="ms-1"
                    >編輯</el-button
                  >

                  <el-button
                    type="danger"
                    plain
                    @click="openModal('delete', article)"
                    >刪除</el-button
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    
    <pageInfo
      @changepage="getArticles"
      :pages="pagination"
      :channel="channel"
      class="mt-5 mb-5"
    ></pageInfo>

    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :status="status"
      @update-article="getArticles"
    ></ArticleModal>  

    <!-- <DelArticleModal
      ref="delArticleModal"
      :delArticle="tempArticle"
      @update-article="getArticles"
    ></DelArticleModal> -->
  </div>
</template>

<script>
import ArticleModal from "../components/articleModal.vue";
import DelModal from "../components/delArticleModal.vue";
import pageInfo from "../components/pageinfo.vue";
import { ElMessage } from "element-plus";
import moment from "moment";

moment().format();

export default {
  data() {
    return {
      articles: {},
      article: {},
      tempArticle: {},
      status: "",
      channel: "",
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    ArticleModal,
    DelModal,   
    pageInfo,

  },
  methods: {
    // 取得文章資料
    getArticles(pageNum = 1, channel = "") {
      this.isLoading = true;

      const url = `https://api.news-age.tw/articleData/?pageNum=${pageNum}&pageSize=10&channel=${channel}`;

      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.result;
          this.pagination = res.data.pagination;
          // console.log(this.articles);
          // console.log(this.pagination);
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDate(time) {
      //時間處理

      //  const date = moment(time);
      //  date.tz('Asia/Taipai').format('ha z');
      const date = moment(time).format("YYYY-MM-DD");
      return date;
    },
    //編輯文章打api
    getArticle(article) {
      this.isLoading = true;
      //console.log("文章", article);
      const { articleId, channelName } = article;
      //console.log(article);
      const url = `https://api.news-age.tw/articleData/${channelName}/${articleId}`;
      this.$http
        .get(url)
        .then((res) => {
          // 編輯文章 api 才有 content 欄位的資料，需要去接 api 回傳的內容而不是 v-for 的 article 資料

          this.article = { ...res.data[0] };
          //  console.log("obj", this.article);
          this.openModal("edit", this.article);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    openModal(status, item) {
      // 打開 modal 並判斷執行動作
      this.status = status;
      if (status === "add") {
        this.tempArticle = {
          startDate: new Date().getTime() / 1000,
          mainTitle: "",
          channelId: "",
        };
        console.log("add", this.tempArticle);
        this.$refs.articleModal.openArticleModal(); // 開啟新增、編輯文章 modal
      } else if (status === "edit") {
        this.tempArticle = JSON.parse(JSON.stringify(item));
        console.log("編輯", this.tempArticle);

        if (this.tempArticle.chLocation == null) {
          this.tempArticle.chLocation = "0";
        }

        this.$refs.articleModal.openArticleModal(); // 開啟新增、編輯文章 modal
      } else if (status === "delete") {
        this.tempArticle = JSON.parse(JSON.stringify(item));

        //   https://api.news-age.tw/articleData/delete/:myid

        let url = `https://api.news-age.tw/articleData/delete/${this.tempArticle.articleId}`;

        const res = confirm("下架（" + `${this.tempArticle.mainTitle}` + "）?");
        if (res) {
          this.$http.put(url, this.tempArticle).then((res) => {
            console.log("回傳", res.data);
            ElMessage.success("刪除文章成功");
            this.getArticles();
          });
        } else {
          alert("你按了取消按鈕");
        }
      }
    },
    link(type, num) {
      if (type == "話題") {
        window.open(`https://www.news-age.tw/Topic/inside.html?id=${num}`);
      }
      if (type == "醫療") {
        window.open(`https://www.news-age.tw/medical/inside.html?id=${num}`);
      }
      if (type == "新一代觀點") {
        window.open(`https://www.news-age.tw/View/inside.html?id=${num}`);
      }
      if (type == "台中腔") {
        window.open(`https://www.news-age.tw/life/inside.html?id=${num}`);
      }
      if (type == "教育") {
        window.open(`https://www.news-age.tw/Educate/inside.html?id=${num}`);
      }
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
