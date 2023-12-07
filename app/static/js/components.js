/**
 * Crea una celda de una tabla con texto de contenido
 * @param {string} text
 * @returns una celda con texto de contenido
 */
const createCellText = (text) => {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
};

/**
 *
 * @param {HTMLElement} element Elemento que se agrega dentro de la celda
 * @returns retorna la celda con otro elemento como hijo
 */
const createCellContent = (element) => {
  const cell = document.createElement("td");
  cell.appendChild(element);
  return cell;
};

const createInput = (
  type,
  id,
  placeholder,
  listClassName,
  value,
  maxLength,
  checked
) => {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  for (let classList of listClassName) {
    input.classList.add(classList);
  }

  input.maxLength = maxLength;
  if (value) {
    input.value = value;
  }
  if (checked) {
    input.checked = checked;
  }
  return input;
};

/**
 * Crea un botón con una función de evento
 * @param {string} text
 * @param {int} id
 * @param {string} className
 * @param {callback} clickHandler
 * @returns Un botón con un evento para su función
 */
const createButton = (text, id, listClassName, clickHandler) => {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.id = id;
  for (let classList of listClassName) {
    button.classList.add(classList);
  }
  //button.classList.add("btn", "btn-sm", className);
  button.addEventListener("click", clickHandler);
  return button;
};

/**
 * Crea la fila con los elementos de proyecto en la tabla
 * @param {Element} container
 * @param {object} content
 * @param {callback} callbackEdit
 * @param {callback} callbackDelete
 */
const rowProjects = (container, content, callbackEdit, callbackDelete) => {
  const { id, title, description, start_date, end_date, company, is_finish } =
    content;

  const row = document.createElement("tr");
  row.appendChild(createCellText(id));
  row.appendChild(createCellText(title));
  row.appendChild(createCellText(description));
  row.appendChild(createCellText(start_date));
  row.appendChild(createCellText(end_date));
  row.appendChild(createCellText(company));

  const cellIsFinish = createCellText(is_finish ? "✔️" : "❌");

  const divAction = document.createElement("div");
  divAction.classList.add("btn-group");

  const btnEdit = createButton(
    "Editar",
    id,
    ["btn", "btn-sm", "btn-warning"],
    (e) => callbackEdit(e)
  );
  const btnDelete = createButton(
    "Eliminar",
    id,
    ["btn", "btn-sm", "btn-danger"],
    (e) => callbackDelete(e)
  );
  const imgDetails = document.createElement("img");
  imgDetails.src = "/static/img/external-link.svg";
  imgDetails.classList.add("bi", "p-0", "m-0");
  imgDetails.style.height = "25px";
  const btnDetails = document.createElement("a");
  btnDetails.href = `${ROUTE_PROJECT}${id}`;
  btnDetails.classList.add("btn", "btn-sm", "btn-info");
  btnDetails.style.height = "31px";
  btnDetails.appendChild(imgDetails);

  divAction.appendChild(btnEdit);
  divAction.appendChild(btnDelete);
  divAction.appendChild(btnDetails);

  const cellAction = createCellText("");
  cellAction.appendChild(divAction);

  row.appendChild(cellIsFinish);
  row.appendChild(cellAction);

  container.appendChild(row);
};

/**
 * Activa el formulario para agregar o editar los proyectos en la tabla
 * @param {Element} container Elemento html que sera el contenedor de los elementos
 * @param {callback} callbackAccept callback para el botón de aceptar
 * @param {callback} callbackCancel callback para el botón de cancelar
 * @param {object} project objeto si el formulario es para editar
 */
const rowFormProject = (
  container,
  callbackAccept,
  callbackCancel,
  project = null
) => {
  const row = document.createElement("tr");

  const cellID = createCellContent(
    document.createTextNode(project ? project[PROJECT_ATTRIBUTES.ID] : "Nuevo")
  );

  const inputTitle = createInput(
    "text",
    PROJECT_ATTRIBUTES.TITLE,
    "Titulo del proyecto",
    ["form-control"],
    project ? project[PROJECT_ATTRIBUTES.TITLE] : "",
    30
  );
  const cellTitle = createCellContent(inputTitle);

  const inputDescription = createInput(
    "text",
    PROJECT_ATTRIBUTES.DESCRIPTION,
    "Breve descripción del proyecto",
    ["form-control"],
    project ? project[PROJECT_ATTRIBUTES.DESCRIPTION] : "",
    45
  );
  const cellDescription = createCellContent(inputDescription);

  const inputStartDate = createInput(
    "date",
    PROJECT_ATTRIBUTES.START_DATE,
    "",
    ["form-control"],
    project ? project[PROJECT_ATTRIBUTES.START_DATE] : ""
  );
  const cellStartDate = createCellContent(inputStartDate);

  const inputEndDate = createInput(
    "date",
    PROJECT_ATTRIBUTES.END_DATE,
    "",
    ["form-control"],
    project ? project[PROJECT_ATTRIBUTES.END_DATE] : ""
  );
  const cellEndDate = createCellContent(inputEndDate);

  const inputCompany = createInput(
    "text",
    PROJECT_ATTRIBUTES.COMPANY,
    "Empresa responsable",
    ["form-control"],
    project ? project[PROJECT_ATTRIBUTES.COMPANY] : "",
    30
  );
  const cellCompany = createCellContent(inputCompany);

  const inputIsFinish = createInput(
    "checkbox",
    PROJECT_ATTRIBUTES.IS_FINISH,
    "",
    ["form-check-input"],
    null,
    10,
    project ? project[PROJECT_ATTRIBUTES.IS_FINISH] : false
  );

  const cellIsFinish = createCellContent(inputIsFinish);
  cellIsFinish.classList.add("text-center", "align-middle");

  const btnAccept = createButton(
    "Aceptar",
    project ? project[PROJECT_ATTRIBUTES.ID] : "",
    ["btn", "btn-sm", "btn-info"],
    (e) => callbackAccept(e)
  );

  const btnCancel = createButton(
    "Cancelar",
    project ? project[PROJECT_ATTRIBUTES.ID] : "",
    ["btn", "btn-sm", "btn-danger"],
    (e) => callbackCancel(e)
  );

  const divAction = document.createElement("div");
  divAction.classList.add("btn-group");
  divAction.appendChild(btnAccept);
  divAction.appendChild(btnCancel);

  const cellAction = createCellContent(divAction);

  row.appendChild(cellID);
  row.appendChild(cellTitle);
  row.appendChild(cellDescription);
  row.appendChild(cellStartDate);
  row.appendChild(cellEndDate);
  row.appendChild(cellCompany);
  row.appendChild(cellIsFinish);
  row.appendChild(cellAction);

  container.appendChild(row);
};

/**
 * Alerta usando Sweetalert2
 * @param {string} title Titulo para la alerta
 * @param {string} text Breve texto de que es lo que debe afirmar o cancelar
 * @param {string} icon Icono en texto que usa Sweetalert2
 * @param {string} btnConfirm texto que tiene dentro del botón de confirma
 * @param {callback} callbackConfirm callback que se activa cuando el resultado es aceptar
 */
const alertConfirm = (title, text, icon, btnConfirm, callbackConfirm) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: btnConfirm,
  }).then((result) => {
    callbackConfirm(result);
  });
};

const rowLocation = (container, content, callbackEdit, callbackCancel) => {
  const { latitude, longitude, idProject } = content;
  const row = document.createElement("tr");
  const cellLatitude = createCellText(latitude);
  cellLatitude.id = PROJECT_ATTRIBUTES.LATITUDE;
  row.appendChild(cellLatitude);

  const cellLongitude = createCellText(longitude);
  cellLongitude.id = PROJECT_ATTRIBUTES.LONGITUD;
  row.appendChild(cellLongitude);
  if (callbackEdit) {
    const btnEdit = createButton(
      "Aceptar",
      idProject,
      ["btn", "btn-sm", "btn-warning"],
      (e) => callbackEdit(e)
    );
    const btnCancel = createButton(
      "Cancelar",
      0,
      ["btn", "btn-sm", "btn-danger"],
      (e) => callbackCancel(e)
    );
    const divAction = document.createElement("div");
    divAction.classList.add("btn-group");
    divAction.appendChild(btnEdit);
    divAction.appendChild(btnCancel);
    const cellAction = createCellContent(divAction);
    row.appendChild(cellAction);
  } else {
    row.appendChild(createCellText(""));
  }
  container.appendChild(row);
};
