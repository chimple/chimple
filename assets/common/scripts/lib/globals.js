window.onerror = function (message, file, line, col, error) {
  cc.log("Error occurred: " + file + line + col + error.message);
  cc.log("error" + error);
  return false;
};
