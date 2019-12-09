<template>
  <div id="classes">
    <div class="subtitle">Classes</div>
    <div
      v-for="className in this.$store.getters.arrayClasses"
      :key="className.rowid"
      :class="[$store.getters.activeClass == className.className ? 'active' : '' ,'testCase']"
      @click="getMethods(className.className)"
    >{{className.className}}</div>
  </div>
</template>
<script>
import { queryAllClasses, queryMethods } from "@/utils/db";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getResults();
    this.$store.dispatch("setActiveMethods", null);
    this.$store.dispatch("setActiveClass", null);
    this.$store.dispatch("setSelection", "none");
  },
  methods: {
    getResults() {
      let classes = [];
      queryAllClasses().then(data => {
        data.forEach((element, index) => {
          element.selectionType = "none";
          queryMethods(element.className).then(response => {
            response.forEach((method, i) => {
              method.status = "none";
            });
            this.$store.dispatch("setClassMethods", {
              className: element.className,
              methods: response
            });
          });
        });
        this.$store.dispatch("setClasses", data);
      });
    },
    getMethods(className) {
      let classes = this.$store.getters.arrayClasses;
      this.$store.dispatch("setActiveMethods", className);
      this.$store.dispatch("setActiveClass", className);

      classes.forEach((element, index) => {
        if (element.className == className) {
          if (element.selectionType == "includeAll") {
            this.$store.dispatch("setSelection", "includeAll");
            console.log("entra aqui - INCLUDE ALL");
          } else if (element.selectionType == "select") {
            this.$store.dispatch("setSelection", "select");
            console.log("entra aqui - SELECT");
          } else {
            this.$store.dispatch("setSelection", "none");
            console.log("entra aqui - NONE");
          }
        }
      });
    }
  }
};
</script>
<style>
#classes {
  float: left;
  background-color: white;
  width: 35%;
  height: -webkit-fill-available;
  overflow-y: auto;
}
</style>