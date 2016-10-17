Array.prototype.indexOfByProp = function(obj, property) {
  let result = -1;
  // console.log(this);
  this.forEach(function(currentObj, index) {
    if (currentObj[property] === obj[property]) {
      result = index;
    }
  });
  return result;
};
