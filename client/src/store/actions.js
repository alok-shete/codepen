export const updateHtml = (data) => {
  return {
    type: "UPDATEHTML",
    payload: data,
  };
};

export const updateCss = (data) => {
  return {
    type: "UPDATECSS",
    payload: data,
  };
};

export const updateJs = (data) => {
  return {
    type: "UPDATEJS",
    payload: data,
  };
};
