<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-warn"></i> 權限測試
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>管理員權限頁面</h1>
            <p>只有用 admin 賬號登錄的才擁有管理員權限，才能進到這個頁面，其他賬號想進來都會跳到403頁面，重新用管理員賬號登錄才有權限。</p>
            <p>
                想嘗試一下，請
                <router-link to="/login" class="logout">退出登錄</router-link>，隨便輸入個賬號名，再進來試試看。
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "permission"
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 30px 0;
}
p {
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout {
    color: #409eff;
}
</style>