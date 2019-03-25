import React from "react";
import { USERNAME_SEARCH, NAME_SEARCH } from "../constants/api-endpoints";
export function getUrl(value) {
  let url = "";
  let queryValue = "";
  let query = "";
  if (value[0] == "@") {
    url = USERNAME_SEARCH;
    queryValue = encodeURIComponent(value);
    query = "screen_name=" + queryValue;
  } else if (value[0] == "#") {
    url = NAME_SEARCH;
    queryValue = encodeURIComponent(value.slice(1, value.length));
    query = "q=" + queryValue;
  } else {
    url = NAME_SEARCH;
    queryValue = encodeURIComponent(value);
    query = "q=" + queryValue;
  }
  return url + query;
}
