<template>
  <div id="sidebar">
    <div class="subtitle">Test Cases</div>
    <div
      v-for="testCase in testCases"
      :key="testCase.rowid"
      :class="[$store.getters.activeTestCase == testCase.testCaseName ? 'active' : '' ,'testCase']"
      @click="getExecutions(testCase.testCaseName)"
    >
     <i class="fas fa-play runTest" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
      {{testCase.testCaseName}}
    </div>
  </div>
</template>

<script>
import { queryAllResults, queryExecutions } from "@/utils/db";

export default {
  props: [],
  data() {
    return {
      testCases: [],
      executions: [],
      collapsed: false
    };
  },
  mounted() {
    this.getResults();
  },
  methods: {
    getResults() {
      queryAllResults().then(data => {
        this.testCases = data;
      });
    },
    getExecutions(testCase) {
      queryExecutions(testCase).then(data => {
        this.executions = data;
        this.$store.dispatch("setActiveTestCase", testCase);
        this.$store.dispatch("setActiveExecutions", this.executions);
        this.$store.dispatch("setActiveExecutionDate", null);
      });
    }
  }
};
</script>
<style>
#sidebar {
  float: left;
  background-color: white;
  width: 25%;
  height: -webkit-fill-available;
}
.testCase {
  text-align: center;
  padding: 5px;
  background-color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
}
.testCase:hover {
  background-color: antiquewhite;
}
.active {
  background-color: #f4d09a;
}
.runTest{
  margin-left: 5px;
  float: left;
  color: #d9d9d9;
  transition: all 0.2s;
  display: none;
}
.runTest:hover{
  color: #3BAA36;
  font-size: 14px;
}
.runTest:active{
  color: #25D619;
}
</style>
