const PROJECT_ATTRIBUTES = {
  ID: "id",
  TITLE: "title",
  DESCRIPTION: "description",
  START_DATE: "start_date",
  END_DATE: "end_date",
  COMPANY: "company",
  IS_FINISH: "is_finish",
  LATITUDE: "latitude",
  LONGITUD: "longitude",
};

const TYPE_STATES = {
  ADDING: "adding",
  INIT: "init",
};

let state = TYPE_STATES.INIT;
let X_ACCESS_TOKENS = localStorage.getItem("x-access-tokens");
let USER_ID = localStorage.getItem("user_id");

const HEADERS = {
  "Content-Type": "application/json",
  "x-access-tokens": X_ACCESS_TOKENS,
  "user-id": USER_ID,
};
