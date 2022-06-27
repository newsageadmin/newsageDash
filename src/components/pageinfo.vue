<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center pagination-lg">
        <li
          class="page-item"
          :class="{ disabled: parseInt(pages.pageNum) === 1 }"
        >
          <a
            class="page-link"
            href="javascript:;"
            @click.prevent="$emit('changepage', parseInt(pages.pageNum) - 1, channel)"
            >&laquo;</a
          >
        </li>
        

        <li
          class="page-item"
          v-for="item in 10"
          :key="item"
          :class="{ active: pages.pageNum == item }"      
          v-show="pages.pageNum<11"
        >
       
          <a
            class="page-link"
            href="javascript:;"
            @click="$emit('changepage', item , channel)"
            >{{  item  }}</a
          >
        </li>

      
        <li
          class="page-item"
          :class="{
            disabled: parseInt(pages.pageNum) === parseInt(pages.totalPage),
          }"
        >
          <a
            class="page-link"
            href="javascript:;"
             @click.prevent="$emit('changepage', parseInt(pages.pageNum) + 1 , channel)"
            >&raquo;
          </a>
        </li>
         <li
           v-show="pages.pageNum > 10"
          class="page-item"
        
        >
          <a
            class="page-link"
            href="javascript:;"
             @click.prevent="$emit('changepage', parseInt(pages.pageNum) - 10 , channel)"
           
            >上10頁
          </a>
        </li>
         <li
          v-show="pages.pageNum <= parseInt(pages.totalPage) - 10"
          class="page-item"
          :class="{
            disabled: parseInt(pages.pageNum) === parseInt(pages.totalPage),
          }"
        >
          <a
            class="page-link"
            href="javascript:;"
            @click.prevent="$emit('changepage', parseInt(pages.pageNum) + 10 , channel)"
            >下10頁
          </a>
        </li>

       

          <li class="page-item" v-show="pages.pageNum != pages.totalPage">
          <a
            class="page-link"
            href="javascript:;"
            @click.prevent="$emit('changepage', parseInt(pages.totalPage) , channel )"
          >
            最終頁
          </a>
        </li>

        <li class="align-self-center ms-3 fs-5">
          目前在{{ channel }}頻道的第{{ pages.pageNum }}頁，共有{{
            pages.totalPage
          }}頁
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>


export default {
 
  props: ["pages", "channel"],
 

 
  
};
</script>