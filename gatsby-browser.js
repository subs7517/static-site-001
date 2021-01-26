exports.onRouteUpdate = function (_ref) {
  var location = _ref.location;

  var domElem = document.querySelector("meta[property='og:url']");
  var existingValue = domElem.getAttribute("content");
  var baseProtocol = domElem.getAttribute("data-baseProtocol");
  var baseHost = domElem.getAttribute("data-baseHost");

  if (existingValue && baseProtocol && baseHost) {
    var value = baseProtocol + "//" + baseHost + location.pathname;

    value += location.hash;
    domElem.setAttribute("content", "" + value);
  }
};
