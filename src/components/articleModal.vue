<template>
  <div
    class="modal fade"
    id="articleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="articleModal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header btn-info">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="status === 'add'" class="text-dark">新增貼文</span>
            <span v-else class="text-dark">編輯貼文</span>
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
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempArticle.mainTitle"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">頻道</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="tempArticle.channelId"
                >
                  <option value="0">選擇頻道</option>
                  <option value="1">觀點</option>
                  <option value="2">話題</option>
                  <option value="3">台中腔</option>
                  <option value="4">教育</option>
                  <option value="5">健康</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">頻道首頁位置</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="place"
                >
                  <option value="0">請選擇</option>

                  <option value="viewA" v-show="tempArticle.channelId == 1">
                    最新觀點
                  </option>
                  <option value="viewB" v-show="tempArticle.channelId == 1">
                    人物專訪
                  </option>
                  <option value="viewC" v-show="tempArticle.channelId == 1">
                    編輯觀點
                  </option>

                  <option value="topicA" v-show="tempArticle.channelId == 2">
                    最新話題
                  </option>
                  <option value="topicB" v-show="tempArticle.channelId == 2">
                    國際話題
                  </option>
                  <option value="topicC" v-show="tempArticle.channelId == 2">
                    話題評論
                  </option>
                  <option value="lifeA" v-show="tempArticle.channelId == 3">
                    最新熱門
                  </option>
                  <option value="lifeB" v-show="tempArticle.channelId == 3">
                    藝術人文
                  </option>
                  <option value="lifeC" v-show="tempArticle.channelId == 3">
                    美食特搜
                  </option>

                  <option value="eduA" v-show="tempArticle.channelId == 4">
                    最新熱門
                  </option>
                  <option value="eduB" v-show="tempArticle.channelId == 4">
                    專題精選
                  </option>
                  <option value="eduC" v-show="tempArticle.channelId == 4">
                    教育新知
                  </option>

                  <option value="medicalA" v-show="tempArticle.channelId == 5">
                    Talk當季健康
                  </option>
                  <option
                    value="medicalB_1"
                    v-show="tempArticle.channelId == 5"
                  >
                    Care主題精選左上
                  </option>
                  <option
                    value="medicalB_2"
                    v-show="tempArticle.channelId == 5"
                  >
                    Care主題精選右上
                  </option>
                  <option
                    value="medicalB_3"
                    v-show="tempArticle.channelId == 5"
                  >
                    Care主題精選左下
                  </option>
                  <option
                    value="medicalB_4"
                    v-show="tempArticle.channelId == 5"
                  >
                    Care主題精選右下
                  </option>
                  <option value="medicalC" v-show="tempArticle.channelId == 5">
                    Warm光點系列
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="Upimage4" class="form-label text-danger">
                  <span class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1"
                    >正方形圖片格式(如440x440)</span
                  >
                </label>
                <input
                  type="file"
                  class="form-control mb-1"
                  id="Upimage4"
                  ref="pathClear"
                  @change="upload('main2', $event)"
                />

                <img :src="tempArticle.imgSqu" class="img-fluid mt-1 mb-1" />

                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempArticle.imgSqu"
                  @click="tempArticle.imgSqu = ''"
                >
                  刪除檔案
                </button>
              </div>

              <div class="mb-3" v-show="tempArticle.imgSqu">
                <label for="Upimage2" class="form-label">
                  <span class="btn-danger ms-2 pt-1 pb-1 pe-1 ps-1"
                    >長方形圖片格式(如1280x720)</span
                  >
                </label>
                <input
                  type="file"
                  class="form-control mb-1"
                  id="Upimage2"
                  ref="pathClear"
                  @change="upload('main', $event)"
                />

                <img :src="tempArticle.imgRec" class="img-fluid mt-1 mb-1" />

                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempArticle.imgRec"
                  @click="tempArticle.imgRec = ''"
                >
                  刪除檔案
                </button>
              </div>

              <div class="mb-3">
                <label for="Upimage3" class="form-label text-danger">
                  <span class="btn-primary ms-2 pt-1 pb-1 pe-1 ps-1"
                    >頻道首頁圖片格式(如1300x500)</span
                  >
                </label>
                <input
                  type="file"
                  class="form-control mb-1"
                  id="Upimage3"
                  ref="pathClear"
                  @change="upload('main3', $event)"
                />

                <img :src="tempArticle.chFront" class="img-fluid mt-1 mb-1" />

                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempArticle.chFront"
                  @click="tempArticle.chFront = ''"
                >
                  刪除檔案
                </button>
                <div class="form-check mt-3" v-show="tempArticle.chFront">
                  <input
                    :checked="tempArticle.chFront == ''"
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.chStatus"
                    id="chStatus"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="chStatus">
                    是否公開
                  </label>
                </div>
              </div>

              <div class="mb-3">

                <label for="Upimage4" class="form-label text-danger">
                  <span class="btn-success ms-2 pt-1 pb-1 pe-1 ps-1"
                    >首頁大版頭圖片格式(如1300x700)</span
                  >
                </label>

                <input
                  type="file"
                  class="form-control mb-1"
                  id="Upimage4"
                  ref="pathClear"
                  @change="upload('main4', $event)"
                />

                <img :src="tempArticle.homeFront" class="img-fluid mt-1 mb-1" />

                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-if="tempArticle.homeFront"
                  @click="tempArticle.homeFront = ''"
                >刪除檔案
                </button>
                
                <div class="form-check mt-3" v-show="tempArticle.homeFront">
                  <input
                    :checked="tempArticle.homeStatus"
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.homeStatus"
                    id="homeStatus"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="homeStatus">
                    是否公開
                  </label>
                </div>
                
              </div>

              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="tempArticle.authorName"
                  placeholder="請輸入作者"
                />
              </div>
              <div class="mb-3">
                <label for="createAt">文章建立日期</label>
                <input
                  type="date"
                  class="form-control"
                  id="createAt"
                  v-model="createAt"
                  :max="today"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempArticle.subText"
                  placeholder="請輸入文章描述"
                  rows="4"
                ></textarea>
              </div>

              <div class="mb-3">
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.mainText"
                ></ckeditor>
              </div>
              <!-- <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.isPublic"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div> -->
            </div>
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
          <button type="button" class="btn btn-info" @click="updateArticle">
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

import "@ckeditor/ckeditor5-build-classic/build/translations/zh";
import { ElMessage } from "element-plus";
import MyUploadAdapter from "../methods/uploadimg.js";

import moment from "moment";

moment().format();

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    status: {
      type: String,
      default: "",
    },
    // currentPage: {
    //   // currentPage = pagination.current_page 把當前頁面帶進來
    //   type: Number,
    //   default: 1,
    // },
  },
  data() {
    return {
      tempArticle: {
        channelId: 0,
        chLocation: "",
      },
      place: "0",
      articleModal: "",
      createAt: 0,
      isLoading: false,
      imageLoaded: false,
      apiimageUrl: "",
      today: "",
      image: {
        size: "",
        height: "",
        width: "",
      },
      // CKEditor 文字編輯器
      editor: ClassicEditor,
      editorConfig: {
        language: "zh",
        toolbar: [
          "heading",
          "bold",
          "underline",
          "fontSize",
          "fontColor",
          "FontBackgroundColor",
          "italic",
          "insertTable",
          "blockquote",
          "|",
          "uploadImage",
          "numberedList",
          "bulletedList",
          "HtmlEmbed",
          "|",
          "undo",
          "redo",
        ],
        extraPlugins: [MyCustomUploadAdapterPlugin],
      },
    };
  },
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
      };

      // 時間戳轉換 yyyy-mm-dd

      if (this.status === "edit") {
        this.createAt = moment(this.tempArticle.startDate).format("YYYY-MM-DD");

        this.tempArticle.startDate = Math.floor(new Date(this.createAt) / 1000);

        //   console.log("編輯文章的時間", this.createAt);
      } else if (this.status === "add") {
        this.tempArticle.channelId = 0;
        const dateAndTime = new Date(this.tempArticle.startDate * 1000)
          .toISOString()
          .split("T");
        [this.createAt] = dateAndTime;

        console.log("新增文章的時間", this.createAt);
      }

      //處理指定頻道
      this.place = this.tempArticle.chLocation;
    },
    createAt() {
      //轉成10碼
      // 將時間格式從 YYYY-MM-DD 轉換成 Unix 格式
      // Math.floor() 取小於數值的最大整數
      this.tempArticle.startDate = Math.floor(new Date(this.createAt) / 1000);
      //   console.log("轉10碼", this.tempArticle.startDate);
    },
  },
  methods: {
    updateArticle() {
      console.log(this.tempArticle);
      if (this.tempArticle.mainTitle == "" || this.tempArticle.chId == 0) {
        ElMessage.error("有欄位未填寫，請檢查");
        return;
      }

      // 狀態判斷新增或修改(新增=新資料，修改=舊資料)
      let url = `https://api.news-age.tw/articleData`;
      let httpMethod = "post";
      let status = "新增";
      if (this.status !== "add") {
        const { articleId } = this.article; // 解構式取出 id
        url = `https://api.news-age.tw/articleData/${articleId}`;
        httpMethod = "put";
        status = "更新";

        this.tempArticle.chLocation = this.place;

        
      
       


      }

      if (this.tempArticle.chStatus === undefined) {
        this.tempArticle.chStatus = 0;
      }
      if (this.tempArticle.homeStatus === undefined) {
        this.tempArticle.homeStatus = 0;
      }

      this.tempArticle.chLocation = this.place;

      console.log("post的物件", this.tempArticle);

      this.$http[httpMethod](url, this.tempArticle)
        .then((res) => {
          console.dir(res.data);

          ElMessage.success(`${res.data.message}`);
          //傳送初始化頁碼+頻道名稱
          this.$emit("update-article", 1, this.tempArticle.channelName);
          this.closeArticleModal();
        })
        .catch((err) => {
          ElMessage.error(`${err}`);
        });
    },
    openArticleModal() {
      // 開啟新增、編輯文章 modal
      this.articleModal.show();
    },
    closeArticleModal() {
      // 關閉新增、編輯文章 modal
      this.articleModal.hide();
    },
    //上傳圖片
    upload(isMain, event) {
      if (isMain == "main2") {
        //1比1
        const MAX_WIDTH = 440;
        const MAX_HEIGHT = 440;

        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        if (!file || file.type.indexOf("image/") !== 0) {
          ElMessage.error("檔案傳送錯誤!");
        }
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
              this.$refs.pathClear.value = "";
              ElMessage.error(
                `上傳圖片寬度錯誤，您上傳的寬度是${this.image.width}`
              );

              this.imageLoaded = false;
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的高度是${this.image.height}`
              );
              this.$refs.pathClear.value = "";
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
                  this.tempArticle.imgSqu = res.data;
                  console.log("回傳", res.data);

                  this.$refs.pathClear.value = "";
                  ElMessage.success("上傳圖片成功");
                })
                .catch((err) => {
                  ElMessage.error("檔案傳送錯誤");
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
      } else if (isMain == "main") {
        const MAX_WIDTH = 1280;
        const MAX_HEIGHT = 720;

        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        //  if (!file || file.type.indexOf("image/") !== 0) return;

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
              this.$refs.pathClear.value = "";
              this.imageLoaded = false;
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的高度是${this.image.height}`
              );
              this.$refs.pathClear.value = "";
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
                  this.tempArticle.imgRec = res.data;
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
        const MAX_WIDTH = 1300;
        const MAX_HEIGHT = 500;
        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        //  if (!file || file.type.indexOf("image/") !== 0) return;

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
              this.$refs.pathClear.value = "";
              this.imageLoaded = false;
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的高度是${this.image.height}`
              );
              this.$refs.pathClear.value = "";
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
                  this.tempArticle.chFront = res.data;

                  console.log(res.data);

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
      } else if (isMain == "main4") {
        const MAX_WIDTH = 1300;
        const MAX_HEIGHT = 700;
        // 圖片上傳
        // console.dir(event);
        // this.imageLoaded = false;
        const file = event.target.files[0];
        //  if (!file || file.type.indexOf("image/") !== 0) return;

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
              this.$refs.pathClear.value = "";
              this.imageLoaded = false;
              return;
            }
            if (this.image.height !== MAX_HEIGHT) {
              ElMessage.error(
                `上傳圖片高度錯誤，您上傳的高度是${this.image.height}`
              );
              this.$refs.pathClear.value = "";
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
                  this.tempArticle.homeFront = res.data;

                  console.log(res.data);

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
    //抓當日時間
    getdata() {
      const date_now = new Date();
      //年
      const year = date_now.getFullYear();
      //月
      const month =
        date_now.getMonth() + 1 < 10
          ? "0" + (date_now.getMonth() + 1)
          : date_now.getMonth() + 1;
      //日
      const date =
        date_now.getDate() < 10 ? "0" + date_now.getDate() : date_now.getDate();

      const today = `${year}-${month}-${date}`;
      this.today = today;
    },
  },
  mounted() {
    this.articleModal = new Modal(this.$refs.articleModal, {
      keyboard: false,
      backdrop: "static",
      focus: false,
    });
    this.getdata();
  },
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 200px;
}
.ck-editor__editable {
  min-height: 400px;
}
/* 主要是 link 功能與 Modal 的 focus 有衝突 */
:root {
  --ck-z-default: 100;
  --ck-z-modal: calc(var(--ck-z-default) + 999);
}
</style>