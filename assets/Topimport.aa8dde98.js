var t=Object.defineProperty,e=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,l=(e,o,s)=>o in e?t(e,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[o]=s,i=(t,i)=>{for(var r in i||(i={}))o.call(i,r)&&l(t,r,i[r]);if(e)for(var r of e(i))s.call(i,r)&&l(t,r,i[r]);return t};import{_ as r}from"./topModalA.7c6f3320.js";import{r as c,o as a,c as d,f as n,F as p,i as u,t as h}from"./vendor.0c547ad4.js";import"./modal.cf52bcef.js";const m={data:()=>({isLoading:!1,products:[],url:"https://apilan.news-age.tw/getData",tempProduct:{imagesUrl:[]},isNew:!1}),methods:{getTopList(){this.isLoading=!0,this.$http(`${this.url}/position/話題/topicC`).then((t=>{setTimeout((()=>{this.isLoading=!1}),1e3),this.products=t.data,this.products.length=4,console.log(this.products)})).catch((t=>{console.log(t)}))},openModal(t,e){"add"===t?(this.tempProduct={},this.isNew=!0,this.$refs.productModal.openModal()):"edit"===t&&(this.tempProduct=i({},e),this.isNew=!1,this.$refs.productModal.openModal())},delItem(t){this.tempProduct=i({},t);confirm(`刪除（${this.tempProduct.title}）?`)?(alert("你按了確定按鈕"),console.log(this.tempProduct)):alert("你按了取消按鈕")}},components:{ProductModal:r},mounted(){this.getTopList()}},f=n("div",{class:"text-center mt-3 mb-3"},[n("h2",null,"話題-話題評論版")],-1),g={class:"container-fluid"},b={class:"table"},w=n("thead",null,[n("tr",null,[n("th",{scope:"col",class:"text-center"},"ID"),n("th",{scope:"col"},"圖片"),n("th",{scope:"col"},"標題"),n("th",{scope:"col"}),n("th",{scope:"col"})])],-1),P={scope:"row",class:"text-center"},v={width:"300"};m.render=function(t,e,o,s,l,i){const r=c("Loading"),m=c("product-modal");return a(),d("div",null,[n(r,{active:l.isLoading},null,8,["active"]),f,n("div",g,[n("table",b,[w,n("tbody",null,[(a(!0),d(p,null,u(l.products,(t=>(a(),d("tr",{key:t.id},[n("th",P,h(t.id),1),n("td",v,[n("img",{src:t.imageRec,class:"img-fluid"},null,8,["src"])]),n("td",null,h(t.title),1)])))),128))])])]),n(m,{ref:"productModal",product:l.tempProduct,"is-new":l.isNew,onGetData:i.getTopList},null,8,["product","is-new","onGetData"])])};export default m;
