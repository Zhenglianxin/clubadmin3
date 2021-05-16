<template>
  <div id="cardManage">
    <div class="select_header">
      <div @click="sellcard">
        <span>售卡设置</span>
        <img src="https://popbadminton.oss-cn-shanghai.aliyuncs.com/micro_pop/113/right.png" alt="" />
      </div>
      <div @click="originalMembers" :style="isrecharge == 0 && isyear == 0 ? 'opacity:0.5' : ''">
        <span>原成员数据录入</span>
        <img src="https://popbadminton.oss-cn-shanghai.aliyuncs.com/micro_pop/113/right.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style lang="scss" scoped>
#cardManage {
  width: 100vw;
  background-color: #fff;
  .select_header {
    height: 16vw;
    width: 100%;
    padding: 0 5.3vw;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #efecf0;
    div {
      width: 43.3vw;
      height: 10.7vw;
      background: rgba(255, 255, 255, 1);
      border-radius: 2.7vw;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4.3vw;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(0, 150, 120, 1);
      position: relative;
      img {
        height: 3.5vw;
      }
    }
  }
}
</style>
