<template>
  <div id="testSuiteGenerator">
    <div id="generator">
      <input type="text" class="form-controll" placeholder="Nombre" v-model="testSuiteName" />
      <button class="btn btn-dark" @click="generateXML()">Generar</button>
      <button class="btn btn-dark" @click="executeSuite()">Ejecutar</button>
    </div>
    <div id="testSuite">
      <p>{{testSuite}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testSuiteName: null,
      testSuite: null
    };
  },
  mounted() {},
  methods: {
    executeSuite() {
      this.generateXML();

      const exec = require("child_process").exec;
      exec('Java -jar jarfile.jar -cp "libs/*" org.testng.TestNG suite.xml', (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    },
    generateXML() {
      if (this.testSuiteName) {
        let testSuite = this.$store.getters.activeTestSuiteClasses;

        //<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >

        var XMLWriter = require("xml-writer");
        let xw = new XMLWriter();
        xw.startDocument("1.0", "UTF-8");
        xw.writeDocType("suite", "SYSTEM", "http://testng.org/testng-1.0.dtd");
        xw.startElement("suite")
          .writeAttribute("name", this.testSuiteName)
          .writeAttribute("verbose", "1");
        xw.startElement("test").writeAttribute(
          "name",
          "Test cases from SmartKeywords reporter"
        );
        xw.startElement("classes");

        testSuite.forEach((classObject, i) => {
          xw.startElement("class").writeAttribute("name", classObject.class);
          xw.startElement("methods");
          classObject.methods.forEach((method, j) => {
            xw.startElement(method.status)
              .writeAttribute("name", method.testCaseName)
              .endElement();
          });
          xw.endElement();
          xw.endElement();
        });

        xw.endDocument();
        xw.flush();
        this.testSuite = xw.toString();

        this.downloadXML(
          new Blob([xw.toString()], {
            type: "text/plain"
          }),
          this.testSuiteName + ".xml"
        );
      } else {
        alert("Ingresa un nombre para la suite");
      }
    },
    downloadXML(testSuite, name) {
      //creamos un FileReader para leer el Blob
      var reader = new FileReader();
      //Definimos la función que manejará el archivo
      //una vez haya terminado de leerlo
      reader.onload = function(event) {
        //Usaremos un link para iniciar la descarga
        var save = document.createElement("a");
        save.href = event.target.result;
        save.target = "_blank";
        //Truco: así le damos el nombre al archivo
        save.download = name + ".xml" || "archivo.xml";
        var clicEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true
        });
        //Simulamos un clic del usuario
        //no es necesario agregar el link al DOM.
        save.dispatchEvent(clicEvent);
        //Y liberamos recursos...
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      };
      //Leemos el blob y esperamos a que dispare el evento "load"
      reader.readAsDataURL(testSuite);
    }
  }
};
</script>
<style>
#testSuiteGenerator {
  float: left;
  width: 35%;
  height: -webkit-fill-available;
  background-color: black;
  overflow-y: auto;
}
#generator {
  height: auto;
  display: grid;
  width: 100%;
  background: white;
}
#generator input {
  text-align: center;
}
#generator button {
  cursor: pointer;
}
#testSuite {
  width: 100%;
  color: white;
}
#testSuite p {
  padding: 10px;
  margin-top: 10px;
  font-size: 12px;
}
</style>