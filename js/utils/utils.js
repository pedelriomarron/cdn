/*!
 *
 * Utilidades de Pedro del Río v20.1.27
 *
 */

/**
 *
 * Devuelve un numero aleatorio en el rango de dos valores
 *
 * @param   {number} min - Numero minimo del rango, este incluido
 * @param   {number} max - Numero maximo del rango, este incluido
 * @return  {number} Numero aleatorio
 *
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * Borra todos los hijos de un elemento del DOM
 *
 * @param   {ElementDOM} node - Elemento a borrar los nodos hijos
 *
 */
function removeAllChilds(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

/**
 *
 * Crear cookie
 *
 * @param {String} clave - Clave de la cookie
 * @param {String} value - Valor de la cookie
 * @param {number} time - Duracion de la cookie en milisecond
 *
 */
function createCookie(clave, value, time = 2000000) {
  //Limpiar Caracteres de ;
  value = value.replace(/;/g, "");
  let fecha = new Date();
  fecha.setTime(fecha.getTime() + time);
  document.cookie = clave + "=" + value + ";expires=" + fecha.toGMTString();
}

/**
 *
 * Borrar cookie
 *
 * @param {String} clave - Cookie a borrar
 *
 */
function removeCookie(clave) {
  document.cookie = clave + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

/**
 *
 * Get todas las cookie
 *
 * @return  {Object} Todas las cookies
 *
 */
function getCookies() {
  let objCookies = {};
  //Crea un array divivido por el ; (cada elemento)
  let strCookie = document.cookie.split("; ");
  //Mapeamos el array de elementos
  strCookie.map(letra => {
    //Dividimos el string por el =
    let cur = letra.split("=");
    //Una parte para el index otra para el resultado
    objCookies[cur[0]] = cur[1];
  });
  return objCookies;
}

/**
 *
 * Get cookie
 *
 * @param   {String} clave - Clave de la cookie a coger
 * @return  {String}  Valor de la cookie
 *
 */
function getCookie(clave) {
  let cookies = getCookies();
  let valor = cookies[clave];
  if (valor != undefined) return valor;
  else return false;
}

/**
 *
 * Create and get Element con atributos
 *
 * @param   {String} element - Elemento del DOM.
 * @param   {Object} attrs - Atributos del elemento: id, class, name.
 * @return  {ElementDOM} Elemento del dom
 *
 */
function createElement(element, attrs = {}) {
  let el = document.createElement(element);
  for (let attr in attrs) el.setAttribute(attr, attrs[attr]);
  return el;
}

/**
 *
 * Parsea acentos y ñ, convierte a minusculas
 *
 * @param   {string} str - Cadena a parsear.
 * @return  {string} Cadena parseada
 *
 */
function parsear(str) {
  //Creamos las reglas
  var map = {
    "-": " ",
    "-": "_",
    a: "á|à|ã|â|À|Á|Ã|Â",
    e: "é|è|ê|É|È|Ê",
    i: "í|ì|î|Í|Ì|Î",
    o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
    u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
    c: "ç|Ç",
    n: "ñ|Ñ"
  };
  // convertimos a minuscula
  str = str.toLowerCase();

  for (var pattern in map) {
    str = str.replace(new RegExp(map[pattern], "g"), pattern);
  }

  return str.trim();
}

/**
 *
 * Hacer una peticion por fetch
 *
 * @param   {string} url - URL a la que se le hace la peticion.
 * @param   {string} method - Metodo usado para la peticion.
 * @param   {Object} items - Los datos que se pasaran en la peticion.

 * @return  {Promise} Devuelve la promesa de fetch
 *
 */
function myfecth(url, method, items = {}) {
  let form_data = new FormData();
  for (var key in items) form_data.append(key, items[key]);

  return new Promise(async function (resolve, reject) {
    let response = await fetch(url, {
      method,
      body: form_data
    });
    if (response.ok) {
      resolve(response.text());
    }
    reject("Error en la llamada Ajax");
  });
}

/**
 *
 * Devuelve un objeto XMLHttp
 *
 * @return  {XMLHttpRequest} Objeto HTTP
 *
 */
function crearXML() {
  let objeto;
  if (window.XMLHttpRequest) {
    objeto = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      objeto = new ActiveXObject("MSXML2.XMLHTTP");
    } catch (e) {
      objeto = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return objeto;
}

/**
 *
 * Hacer una peticion por xmlhttp
 *
 * @param   {string} url - URL a la que se le hace la peticion.
 * @param   {string} method - Metodo usado para la peticion.
 * @param   {string} params - Los datos que se pasaran en la peticion.

 * @return  {Promise} Devuelve la promesa de xml
 *
 */
function myXMLHttpRequest(url, method, params = {}) {
  return new Promise(function (resolve, reject) {
    let http = crearXML();
    params = new URLSearchParams(params).toString();
    http.open(method, url, true);
    if (method.toUpperCase() == "POST") {
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
    }
    http.onreadystatechange = function () {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        //alert(http.responseText);
        resolve(http.responseText);
      }
    };
    http.send(params);
  });
}