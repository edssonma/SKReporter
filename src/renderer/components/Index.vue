<template>
  <div class id="wrapper">
    <div id="appHeader">
      <span class="title">SmartKeywords-Reporter</span>
      <span id="mainOptions">
        <a v-if="!testSuiteGenerator" @click="openTestSuiteGenerator()">Generar test-suite</a>
        <a v-else @click="returnToMainPage()">Cancelar</a>
      </span>
    </div>
    <div id="page1">
      <sidebar-menu></sidebar-menu>
      <executions></executions>
      <executions-info></executions-info>
    </div>
    <div id="page2">
      <sidebar-classes></sidebar-classes>
      <methods></methods>
      <test-suite-generator></test-suite-generator>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "./SidebarMenu";
import Executions from "./Executions";
import ExecutionsInfo from "./ExecutionInfo";
import SidebarClasses from "./SidebarClasses";
import TestSuiteGenerator from "./TestSuiteGenerator";

import Methods from "./Methods";

window.$ = window.jQuery = require("jquery");
export default {
  components: {
    SidebarMenu,
    Executions,
    ExecutionsInfo,
    SidebarClasses,
    Methods,
    TestSuiteGenerator
  },
  data() {
    return {
      testSuiteGenerator: false
    };
  },
  mounted() {
    this.$store.dispatch("setActiveExecutionDate", null);
    this.$store.dispatch("setActiveTestCase", null);
  },
  methods: {
    openTestSuiteGenerator() {
      this.testSuiteGenerator = true;
      $("#page1").css("display", "none");
      $("#page2").css("display", "block");
    },
    returnToMainPage() {
      this.testSuiteGenerator = false;
      $("#page1").css("display", "block");
      $("#page2").css("display", "none");
    }
  }
};
</script>
<style>
body {
  font-family: sans-serif;
}
#wrapper {
  overflow: hidden;
  background-color: #d5d5d5;
  height: -webkit-fill-available;
}
#appHeader {
  height: auto;
  background-color: tomato;
  padding-left: 5px;
}
.title {
  font-weight: bold;
  color: white;
}
.subtitle {
  padding: 5px;
  background-color: #d9d9d9;
  text-align: center;
  position: sticky;
  top: 0;
}
#mainOptions {
  float: right;
  margin-right: 5px;
}
#mainOptions a {
  color: white;
  cursor: pointer;
}
#mainOptions a:hover {
  color: black;
}
#page2 {
  background-color: #fbf8ea;
  height: -webkit-fill-available;
}
</style>