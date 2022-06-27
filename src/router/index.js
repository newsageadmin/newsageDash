import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系統首頁'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            },
            {
                path: "/top",
                name: "話題-大版頭",
                meta: {
                    title: '話題-大版頭',
                   
                },
                component: () => import("../views/Top/top.vue")
            },
            {
                path: "/Viewad",
                name: "觀點-大版頭",
                meta: {
                    title: '觀點-大版頭',
                   
                },
                component: () => import("../views/View/top.vue")
            },
           
            {
                path: "/topB",
                name: "大版頭B",
                meta: {
                    title: '大版頭B',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Top/TopB.vue")
            },
            {
                path: "/topimport",
                name: "專題精選",
                meta: {
                    title: '話題-專題精選',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Top/Topimport.vue")
            },
            {
                path: "/topnews",
                name: "TOP NEWS",
                meta: {
                    title: '話題-TOP NEWS',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Top/Topnews.vue")
            }
            ,
            {
                path: "/lifead",
                name: "大版頭",
                meta: {
                    title: '台中腔-大版頭',
                  
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Life/top.vue")
            },
            {
                path: "/lifeimport",
                name: "台中腔-專題精選",
                meta: {
                    title: '台中腔-專題精選',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Life/Topimport.vue")
            },
            {
                path: "/lifea",
                name: "台中腔-藝術人文",
                meta: {
                    title: '台中腔-藝術人文',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Life/TopA.vue")
            },
            {
                path: "/lifeb",
                name: "台中腔-美食特搜",
                meta: {
                    title: '台中腔-美食特搜',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Life/TopB.vue")
            },{
                path: "/lifetopnews",
                name: "台中腔-TOPNEWS",
                meta: {
                    title: '台中腔-TOPNEWS',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Life/Topnews.vue")
            },{
                path: "/eduad",
                name: "教育-大版頭",
                meta: {
                    title: '教育-大版頭',
                  
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Edu/top.vue")
            },{
                path: "/eduimport",
                name: "教育-專題精選",
                meta: {
                    title: '教育-專題精選',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Edu/Topimport.vue")
            },{
                path: "/eduknow",
                name: "教育新知",
                meta: {
                    title: '教育新知',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Edu/know.vue")
            },{
                path: "/edutopnews",
                name: "教育-TOPNEWS",
                meta: {
                    title: '教育-TOPNEWS',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Edu/Topnews.vue")
            },{
                path: "/medicalad",
                name: "醫療-大版頭",
                meta: {
                    title: '醫療-大版頭',
                  
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Medical/top.vue")
            },{
                path: "/medicaltalk",
                name: "醫療-talk當季健康",
                meta: {
                    title: '醫療-talk當季健康',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Medical/talk.vue")
            },{
                path: "/medicalcare",
                name: "醫療-care主題精選",
                meta: {
                    title: '醫療-care主題精選',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Medical/care.vue")
            },{
                path: "/medicalwarm",
                name: "醫療-warm光點系列",
                meta: {
                    title: '醫療-warm光點系列',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Medical/warm.vue")
            },{
                path: "/medicaltopnews",
                name: "醫療-TOPNEWS",
                meta: {
                    title: '醫療-TOPNEWS',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/Medical/Topnews.vue")
            },{
                path: "/alllist",
                name: "文章列表",
                meta: {
                    title: '文章列表',
                    permission: false
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/allList.vue")
            },{
                path: "/allAd",
                name: "首頁大版頭",
                meta: {
                    title: '首頁大版頭',
                   
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/allAD.vue")
            },{
                path: "/allBanner",
                name: "廣告版位",
                meta: {
                    title: '首頁廣告版位',
                   
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/allBanner.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '圖表'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表單'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab標簽'
                },
                component: () => import( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓勵作者'
                },
                component: () => import( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '權限管理',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '國際化語言'
                },
                component: () => import( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上傳插件'
                },
                component: () => import( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定義圖標'
                },
                component: () => import( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到頁面'
                },
                component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '沒有權限'
                },
                component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '個人中心'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本編輯器'
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
            },
            // 以下新增

        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登錄'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 新一代後台管理系統`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理員權限則可進入，這里只是簡單的模擬管理員權限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;