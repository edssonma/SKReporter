<template>
  <div id="executions">
    <div class="subtitle">Execution date</div>
    <div
      v-for="execution in this.$store.getters.activeExecutions"
      :key="execution.rowid"
      :class="[$store.getters.activeExecutionDate == execution.executionDate ? 'active' : '','execution']"
      @click="getExecutionsResults(execution.executionDate)"
    ><i class="far fa-calendar-alt"></i> {{parseDate(execution.executionDate)}}</div>
  </div>
</template>
<script>
var moment = require("moment");
import { queryExecutionInfo } from "@/utils/db";

export default {
  props: [],
  data() {
    return {
      collapsed: false
    };
  },
  mounted() {},
  methods: {
    getExecutionsResults(executionDate) {
      let date = executionDate.replace(/-/g, "r").replace(/\//g, "r");

      let testCase = this.$store.getters.activeTestCase;
      queryExecutionInfo(testCase, date).then(data => {
        this.$store.dispatch("setActiveExecutionInfo", data);
        this.$store.dispatch(
          "setActiveExecutionDate",
          executionDate.replace(/-/g, "/")
        );
        $("#tableContainer").css("display", "block");
        $("#activeTestCase").css("display", "block");
        $("#filters").css("display", "block");
      });
    },
    parseDate(value) {
      let date = value
        .replace(/-/g, ".")
        .replace(/\//g, ".")
        .split(".");
      let year = date[2];
      let month = date[1];
      let day = date[0];
      let mydate = null;

      if (month > 12) mydate = new Date(year, day - 1, month);
      else mydate = new Date(year, month - 1, day);

      return mydate.toDateString();
    }
  },
  computed: {
    activeExecutions() {
      this.$store.getters.activeExecutions;
    }
  }
};
</script>
<style>
#executions {
  float: left;
  background-color: #fbf8ea;
  width: 15%;
  height: -webkit-fill-available;
}
.execution {
  text-align: center;
  padding: 5px;
  background-color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
}
.execution:hover {
  background-color: antiquewhite;
}
.active {
  background-color: #f4d09a;
}
</style>