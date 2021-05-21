<template>
  <div id="soldCardSetting">{{ title }}asdf</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "soldCardSetting",
  data() {
    return {
      title: "售卡设置",
      clubId: "",
      yearCards: [],
      vipCards: [],
    };
  },
  created() {
    this.clubId = this.$route.query.clubId || this.$route.params.clubId || "1154";
  },
  methods: {
    fetchData() {
      
    }
  }
});
</script>
<style lang="scss" scoped>
#soldCardSetting {
  margin: 0;
}
</style>
