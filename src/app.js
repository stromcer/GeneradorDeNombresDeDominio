/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here
  let avaiblePronoums = ["ese", "esa", "el", "la", "un", "una"];
  let avaibleAdjetives = [
    "increible",
    "elegante",
    "adorable",
    "impaciente",
    "imparable"
  ];
  let avaibleExtensions = [".com", ".es", ".nz", ".edu", ".mx", ".net"];

  // Mensajes de alerta

  let ALERT_MISSING_CHECKBOX = `
  <div class="alert alert-danger" role="alert">
    POR FAVOR MARQUE AL MENOS UNA CASILLA DE CADA SECCION
  </div>
  `;

  let ALERT_MISSING_NAME = `
  <div class="alert alert-danger" role="alert">
    POR FAVOR INTRODUZCA AL MENOS UN NOMBRE (LOS ESPACIOS SERAN ELIMINADOS AUTOMATICAMENTE).
  </div>
  `;

  // Listener del boton
  let rawForm = document.getElementById("formOptions");
  rawForm.addEventListener("submit", recibirDatosForm);

  function recibirDatosForm(e) {
    e.preventDefault();
    let listaPronombres = readCheckboxValue(avaiblePronoums);
    let listaAdjetivos = readCheckboxValue(avaibleAdjetives);
    let listaNombres = readValueFromId("productNames")
      .replace(/\s/g, "")
      .split(",");
    let listaExtensiones = readCheckboxValue(avaibleExtensions);

    let domainListHtml = generateDomainList({
      pronoums: listaPronombres,
      adjetives: listaAdjetivos,
      names: listaNombres,
      extensions: listaExtensiones
    });

    if (
      listaPronombres.length == 0 ||
      listaAdjetivos.length == 0 ||
      listaExtensiones.length == 0
    ) {
      domainListHtml = ALERT_MISSING_CHECKBOX;
    }
    if (listaNombres[0] == "") {
      domainListHtml = ALERT_MISSING_NAME;
    }
    writeToId("domainBox", domainListHtml);
  }

  let writeToId = (searchedID, strToWrite) => {
    document.getElementById(searchedID).innerHTML = strToWrite;
  };

  let readCheckboxValue = listName => {
    let valueList = [];
    for (let itemName of listName) {
      let item = document.getElementById(itemName);
      if (item.checked) {
        valueList.push(item.value);
      }
    }
    return valueList;
  };

  function generateDomainList(objetoForm) {
    let domainBoxHtml = ``;
    for (let pronombre of objetoForm.pronoums) {
      for (let adjetivo of objetoForm.adjetives) {
        for (let nombre of objetoForm.names) {
          for (let extension of objetoForm.extensions) {
            domainBoxHtml += `
              <p class="my-1 border bg-secondary border-secondary rounded">
                <a
                  class="text-decoration-none text-light"
                  href="http://${pronombre}${adjetivo}${nombre}${extension}"
                  >
                  ${pronombre}${adjetivo}${nombre}${extension}  
                </a>
              </p>        
            `;
            if (tryDomainNameHack(nombre, extension)) {
              let compareExtension = extension.slice(1);
              let hackedName = nombre.slice(
                0,
                nombre.length - compareExtension.length
              );

              domainBoxHtml += `
                <p class="my-1 border bg-secondary border-secondary rounded">
                  <a
                    class="text-decoration-none text-light"
                    href="http://${pronombre}${adjetivo}${hackedName}${extension}"
                    >
                    ${pronombre}${adjetivo}${hackedName}${extension}  
                  </a>
                </p>        
              `;
            }
          }
        }
      }
    }
    return domainBoxHtml;
  }

  function tryDomainNameHack(name, extension) {
    if (
      name.slice(name.length - (extension.length - 1)) == extension.slice(1)
    ) {
      return true;
    }
    return false;
  }

  let readValueFromId = searchedID => document.getElementById(searchedID).value;

  let createCheckForms = (listWanted, wantedID) => {
    let allChecks = "";
    for (let avaibleThing of listWanted) {
      allChecks += `
      <div>
        <input
          class="form-check-input "
          type="checkbox"
          value="${avaibleThing}"
          id="${avaibleThing}"
        />
        <label class="form-check-label" for="${avaibleThing}">
          ${avaibleThing}
        </label>
      </div>
    `;
    }
    writeToId(wantedID, allChecks);
  };

  createCheckForms(avaiblePronoums, "pronoumListForm");
  createCheckForms(avaibleAdjetives, "adjetivesListForm");
  createCheckForms(avaibleExtensions, "extensionListForm");

  /// zona de pruebas

  /// FIN -- zona de pruebas -- FIN
};
