<template>
  <div id="methods">
    <div class="subtitle">Methods</div>
    <div id="includeOptions">
      <span>
        <a
          :class="[this.$store.getters.selectionByInclude ? 'activeIncludeOption' : '' , 'includeOption']"
          @click="includeAll()"
        >[Include all]</a>
      </span>
      <span>
        <a
          :class="[this.$store.getters.selectionBySelect ? 'activeIncludeOption' : '' , 'includeOption']"
          @click="selectMethods()"
        >[Select]</a>
      </span>
    </div>
    <table class="table">
      <tbody>
        <tr
          v-for="method in this.$store.getters.activeMethods"
          :key="method.rowid"
          style="text-align:center;"
        >
          <td>{{method.testCaseName}}</td>
          <td v-show="$store.getters.selectionBySelect">
            <span
              :class="[method.status == 'include' ? 'selectedOption' : '' , 'option']"
              @click="selectMethod('include', method.testCaseName)"
            >Include</span>
          </td>
          <td v-show="$store.getters.selectionBySelect">
            <span
              :class="[method.status == 'exclude' ? 'selectedOption' : '' , 'option']"
              @click="selectMethod('exclude',method.testCaseName)"
            >Exclude</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { queryAllClasses, queryMethods } from "@/utils/db";
export default {
  data() {
    return {
      include: false,
      select: false,
      methods: []
    };
  },
  mounted() {
    this.$store.dispatch("setActiveTestSuiteClasses", { mode: "clean" });
  },
  methods: {
    includeAll() {
      this.$store.dispatch("setSelection", "includeAll");
      this.$store.dispatch("setSelectionType", "includeAll");

      this.$store.dispatch("setActiveTestSuiteClasses", {
        mode: "auto"
      });

      console.log(
        "TEST SUITE CON INCLUDEALL ",
        this.$store.getters.activeTestSuiteClasses
      );
    },
    selectMethods() {
      this.$store.dispatch("setSelection", "select");
      this.$store.dispatch("setSelectionType", "select");
    },
    selectMethod(estatus, method) {
      this.$store.dispatch("setActiveTestSuiteClasses", {
        mode: "manual",
        method: method,
        status: estatus
      });

      console.log(
        "TEST SUITE CON SELECT ",
        this.$store.getters.activeTestSuiteClasses
      );
    }
  }
};
</script>
<style>
#methods {
  float: left;
  background-color: #e2ecec;
  width: 30%;
  height: -webkit-fill-available;
  overflow-y: auto;
}
#includeOptions {
  margin: 0;
  background-color: darkslategray;
  width: 100%;
  height: auto;
  text-align: center;
}
.includeOption {
  color: white !important;
  cursor: pointer;
  margin: 0;
}
.includeOption:hover {
  color: tomato !important;
}
.activeIncludeOption {
  color: tomato !important;
  font-weight: bold;
}
.option {
  cursor: pointer;
}
.selectedOption {
  font-weight: bold;
}
</style>