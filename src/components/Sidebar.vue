<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
             {
                icon: "el-icon-lx-voice",
                index: "1",
                title: "新一代觀點",
                subs: [
                    {
                        index: "/Viewad",
                        title: "大版頭",
                    },
                  
                    
                ],
            },
             {
                icon: "el-icon-lx-voice",
                index: "2",
                title: "話題",
                subs: [
                    {
                        index: "/top",
                        title: "大版頭",
                    },
                  
                    {
                        index: "/topB",
                        title: "國際觀點",
                    },
                    {
                        index: "/topimport",
                        title: "編輯評論",
                    }
                   
                ],
            },
            {
                icon: "el-icon-lx-message",
                index: "3",
                title: "台中腔",
                subs: [
                    {
                        index: "/lifead",
                        title: "大版頭",
                    },
                   
                    {
                        index: "/lifea",
                        title: "藝術人文",
                    },
                    {
                        index: "/lifeb",
                        title: "美食特搜",
                    }
                    // {
                    //     index: "/lifetopnews",
                    //     title: "TOP NEWS",
                    // }
                   
                ],
            },
             {
                icon: "el-icon-lx-friend",
                index: "4",
                title: "教育",
                subs: [
                    {
                        index: "/eduad",
                        title: "大版頭",
                    },
                    {
                        index: "/eduimport",
                        title: "專題精選",
                    },
                    {
                        index: "/eduknow",
                        title: "教育新知",
                    }
                  
                   
                ],
            },
             {
                icon: "el-icon-lx-like",
                index: "5",
                title: "健康",
                subs: [
                    {
                        index: "/medicalad",
                        title: "大版頭",
                    },
                    {
                        index: "/medicaltalk",
                        title: "Talk當季健康",
                    },
                    {
                        index: "/medicalcare",
                        title: "Care主題精選",
                    },
                    {
                        index: "/medicalwarm",
                        title: "Warm光點系列",
                    }
                  
                   
                ],
            },{
                icon: "el-icon-lx-calendar",
                index: "6",
                title: "文章列表(全)",
                subs: [
                    {
                        index: "/alllist",
                        title: "發表文章",
                    }
                    
                   
                ],
            },
            {
                icon: "el-icon-lx-calendar",
                index: "7",
                title: "首頁大版頭",
                subs: [
                    {
                        index: "/allAd",
                        title: "新增版頭",
                    }
                    
                   
                ],
            },
             {
                icon: "el-icon-lx-calendar",
                index: "8",
                title: "廣告版位",
                subs: [
                    {
                        index: "/allbanner",
                        title: "新增廣告",
                    }
                    
                   
                ],
            },
            // {
            //     icon: "el-icon-lx-calendar",
            //     index: "10",
            //     title: "其他",
            //     subs: [
            //         {
            //             index: "/form",
            //             title: "基本表单",
            //         },
            //         {
            //             index: "/upload",
            //             title: "文件上传",
            //         },
            //          {
            //             index: "/permission",
            //             title: "權限管理",
            //         },
            //         {
            //             index: "4",
            //             title: "三级菜单",
            //             subs: [
            //                 {
            //                     index: "/editor",
            //                     title: "富文本编辑器",
            //                 },
            //             ],
            //         },
            //     ],
            // },
            // {
            //     icon: "el-icon-lx-emoji",
            //     index: "/icon",
            //     title: "自定义图标",
            // },
            
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
