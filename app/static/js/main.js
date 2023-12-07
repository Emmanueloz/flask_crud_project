const formRowProject = document.getElementById("formRowProject");
const tbody = document.querySelector("#tableProject > tbody");
const tMsg = document.getElementById("msg");
const imgLoad = document.getElementById("img-load");
let listProject = [];

const getInputProject = () => {
  const title = document.getElementById(PROJECT_ATTRIBUTES.TITLE).value;
  const user_id = USER_ID;
  const description = document.getElementById(
    PROJECT_ATTRIBUTES.DESCRIPTION
  ).value;
  const start_date = document.getElementById(
    PROJECT_ATTRIBUTES.START_DATE
  ).value;
  const end_date = document.getElementById(PROJECT_ATTRIBUTES.END_DATE).value;
  const company = document.getElementById(PROJECT_ATTRIBUTES.COMPANY).value;
  const is_finish = document.getElementById(
    PROJECT_ATTRIBUTES.IS_FINISH
  ).checked;
  return {
    title,
    user_id,
    description,
    start_date,
    end_date,
    company,
    is_finish,
  };
};

const acceptProject = (e) => {
  state = TYPE_STATES.INIT;

  const newProject = getInputProject();

  fetch(URL_POST, {
    method: "POST",
    body: JSON.stringify(newProject),
    headers: HEADERS,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        location.replace("/auth/logout");
        return;
      }
      formRowProject.classList.remove("disabled");
      getProjects();
    })
    .catch((e) => console.error(e));
};

const editProject = (e) => {
  const id = e.target.id;
  const editProjectJson = getInputProject();
  fetch(`${URL_PUT}${id}`, {
    method: "PUT",
    body: JSON.stringify(editProjectJson),
    headers: HEADERS,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        location.replace("/auth/logout");
        return;
      }
      getProjects();
    })
    .catch((e) => console.error(e));
};

const formEditProject = (e) => {
  const idProject = e.target.id;
  tbody.innerHTML = "";
  tMsg.innerHTML = "";
  listProject.forEach((item) => {
    if (item.id == idProject) {
      rowFormProject(tbody, editProject, cancelProject, item);
    } else {
      rowProjects(tbody, item, formEditProject, showDeleteProject);
    }
  });
};

const deleteProject = (id) => {
  console.log(id);
  fetch(`${URL_DELETE}${id}`, {
    method: "DELETE",
    headers: HEADERS,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        location.replace("/auth/logout");
        return;
      }
      getProjects();
    })
    .catch((e) => {
      console.error(e);
    });
};

const showDeleteProject = (e) => {
  const id = e.target.id;
  alertConfirm(
    "¿Estas seguro?",
    `Se eliminara el proyecto con ID ${id}`,
    "warning",
    "Aceptar",
    (result) => {
      if (result.isConfirmed) {
        deleteProject(id);
      }
    }
  );
};

const cancelProject = () => {
  state = TYPE_STATES.INIT;
  formRowProject.classList.remove("disabled");
  tbody.innerHTML = "";
  tMsg.innerHTML = "";
  if (listProject.length == 0) {
    console.log("No hay datos");
    tMsg.innerHTML = "No hay datos";
    return;
  }
  listProject.forEach((item) => {
    rowProjects(tbody, item, formEditProject, showDeleteProject);
  });
};

formRowProject.addEventListener("click", () => {
  if (state == TYPE_STATES.INIT) {
    console.log("Agregar form");
    state = TYPE_STATES.ADDING;
    formRowProject.classList.add("disabled");
    tMsg.innerHTML = "";
    rowFormProject(tbody, acceptProject, cancelProject);
  }
});

const getProjects = () => {
  fetch(URL_GET, {
    headers: HEADERS,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        location.replace("/auth/logout");
        return;
      }

      listProject = data;
      tbody.innerHTML = "";
      tMsg.innerHTML = "";
      imgLoad.style.display = "none";
      if (listProject.length == 0) {
        console.log("No hay datos");
        tMsg.innerHTML = "No hay datos";
        return;
      }
      data.forEach((item) => {
        rowProjects(tbody, item, formEditProject, showDeleteProject);
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

getProjects();
