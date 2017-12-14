window.__getPrototypeChain = function (obj) {
  let chain = [obj];

  let prototype = obj;
  while (prototype = Object.getPrototypeOf(prototype)) {
    chain.push(prototype);
  }
  return chain;
};