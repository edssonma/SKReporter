<template>
  <div id="results">
    <div id="activeTestCase">
      <i class="fas fa-history"></i>
      {{this.$store.getters.activeTestCase}} - {{this.$store.getters.activeExecutionDate}}
    </div>
    <div id="filters">
      <select class="form-control selectBox" v-model="status" @change="filter()">
        <option value="all">All</option>
        <option value="successful">Succesful</option>
        <option value="failed">Failed</option>
      </select>
    </div>
    <div id="tableContainer" class="table-responsive">
      <table class="table table-striped">
        <thead>
          <th>Descripción</th>
          <th>Clase</th>
          <th>Resultado</th>
          <th>Tiempo</th>
        </thead>
        <tbody class="tbody">
          <tr v-for="execution in this.$store.getters.activeExecutionInfo" :key="execution.rowid">
            <td>{{execution.description}}</td>
            <td>{{execution.className}}</td>
            <td>
              <span v-if="execution.lastResults == 1">
                <i class="fas fa-check" style="color:green;"></i>
              </span>
              <span v-else>
                <i class="fas fa-times" style="color:red;"></i>
              </span>
            </td>
            <td>{{execution.eleapsedTime}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { queryExecutionInfo } from "@/utils/db";
export default {
  props: [],
  data() {
    return {
      status: "all"
    };
  },
  mounted() {},
  methods: {
    filter() {
      let executions = null;
      let date = this.$store.getters.activeExecutionDate
        .replace(/-/g, "r")
        .replace(/\//g, "r");
      let testCase = this.$store.getters.activeTestCase;

      queryExecutionInfo(testCase, date).then(data => {
        switch (this.status) {
          case "all":
            executions = data;
            break;
          case "successful":
            executions = data.filter(execution => execution.lastResults == 1);
            break;
          case "failed":
            executions = data.filter(execution => execution.lastResults == 0);
            break;
        }
        console.log("executions", executions);
        this.$store.dispatch("setActiveExecutionInfo", executions);
      });
    }
  }
};
</script>
<style>
#results {
  float: left;
  width: 60%;
  overflow-y: auto;
  background-color: #ffeee3;
  height: -webkit-fill-available;
}
#activeTestCase {
  text-align: center;
  padding: 5px;
  display: none;
  background-color: #d9d9d9;
  color: black;
  position: sticky;
  top: 0;
}
#tableContainer {
  display: none;
  max-height: 100%;
  overflow-y: auto;
}
table {
  font-size: 12px;
}
#filters {
  display: none;
  height: auto;
  background-color: white;
  position: sticky;
  top: 34px;
}
select {
  padding: 0;
  font-size: 12px;
  height: 30px;
}
</style>