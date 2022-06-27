<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar" style="margin-right: 5px"></i>話題
        </el-breadcrumb-item>
        <el-breadcrumb-item>話題大版頭</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="text-end mt-3 mb-3">
      <el-button type="primary" @click="openModal('add')">新增資料</el-button>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">圖片</th>
                <th scope="col">標題</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in list" :key="item.id">
                <tr>
                  <th scope="row">{{ item.id }}</th>
                   <td width="150">
                    <img :src="item.image" class="img-fluid" />
                  </td>
                  <td>{{ item.title }}</td>
                 
                  <td>
                    <el-button type="primary" @click="openModal('edit', item)"
                      >編輯</el-button
                    >
                  </td>
                  <td>
                    <el-button type="danger" @click="openModal('del', item)"
                      >刪除</el-button
                    >
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <div class="container">
            <div class="form-box">
              <el-form label-width="80px">
                <el-form-item label="標題">
                  <el-input v-model="mainTitle" prop="mainTitle"></el-input>
                </el-form-item>
                <el-form-item label="副標題">
                  <el-input v-model="subTitle"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <div class="mb-3">
                    <label for="formFile" class="form-label"
                      >圖片上傳 (限制500kb以下)</label
                    >
                    <input class="form-control" type="file" id="formFile" />
                  </div> -->
                  <el-upload
                    class="upload-demo"
                    drag
                    action="http://jsonplaceholder.typicode.com/api/posts/"
                    multiple
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      <em>點擊上傳</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        只能上傳jpg/png格式 (16:9)，且不過800kb
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
                <el-form-item label="段落">
                  <el-input v-model="subText"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input v-model="authorName"></el-input>
                </el-form-item>

                <el-form-item label="頻道選擇">
                  <el-select v-model="chId" placeholder="請選擇">
                    <el-option key="1" label="觀點" value="1"></el-option>
                    <el-option key="2" label="話題" value="2"></el-option>
                    <el-option key="3" label="台中腔" value="3"></el-option>
                    <el-option key="4" label="教育" value="4"></el-option>
                    <el-option key="5" label="醫療" value="5"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="日期時間">
                  <el-col>
                    <el-form-item>
                      <el-date-picker
                        type="date"
                        placeholder="選擇日期"
                        v-model="startDate"
                        value-format="YYYY-MM-DD"
                        style="width: 100%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <!-- <el-form-item label="城市級聯" prop="options">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item> -->
                <!-- <el-form-item label="選擇開關" prop="delivery">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item> -->
                <!-- <el-form-item label="多選框" prop="type">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="單選框" prop="resource">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="步步高"></el-radio>
                            <el-radio label="小天才"></el-radio>
                            <el-radio label="imoo"></el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                <el-form-item label="文章內容">
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="mainText"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="send">送出</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 
</template>

 <script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import defaultSrc from "../../assets/img/img.jpg";


export default {
  data() {
    return {
      chId: "",
      mainTitle: "",
      subTitle: "",
      mainText: "",
      subText: "",
      startDate: "",
      authorName: "",
      list: [],
    };
  },
  methods: {
    getadList() {
      this.$http
        .get(`https://api.news-age.tw/Topic/Front`)
        .then((res) => {
          this.list = res.data;
          // console.log(this.list);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    send() {
      const data = {
        chId: this.chId,
        mainTitle: this.mainTitle,
        subTitle: this.subTitle,
        mainText: this.mainText,
        startDate: this.startDate,
        authorName: this.authorName,
      };

      if (this.chId == "" || this.mainTitle == "") {
        ElMessage.error("有欄位未填寫！");
      } else {
        this.$http
          .post("http://apilan.news-age.tw/article/article", data)
          .then((res) => {
            ElMessage.success("提交成功！");
            console.log(res.data.status);
          })
          .catch((er) => {
            alert(er);
          });
      }
    },
   
  },
  mounted() {
    this.getadList();

    
  },
  setup() {
    const imgSrc = ref("");
    const cropImg = ref(defaultSrc);
    const dialogVisible = ref(false);
    const cropper = ref(null);

    const setImage = (e) => {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        dialogVisible.value = true;
        imgSrc.value = event.target.result;
        cropper.value && cropper.value.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    };

    const cropImage = () => {
      cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
    };

    const cancelCrop = () => {
      dialogVisible.value = false;
      cropImg.value = defaultSrc;
    };

    return {
      cropper,
      imgSrc,
      cropImg,
      dialogVisible,
      setImage,
      cropImage,
      cancelCrop,
    };
  },
  components: {
    VueCropper,
  },
};
</script>