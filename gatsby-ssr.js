import { createElement } from "react";
import { parse } from "url";
import { siteMetadata } from "./gatsby-config";

export function onRenderBody(_ref) {
  var setHeadComponents = _ref.setHeadComponents,
    _ref$pathname = _ref.pathname,
    pathname = _ref$pathname === void 0 ? "/" : _ref$pathname;

  var pluginOptions = siteMetadata;

  if (pluginOptions && pluginOptions.siteURL) {
    var siteURL = pluginOptions.siteURL.replace(/\/$/, "");

    var parsed = parse("" + siteURL + pathname);

    var pageUrl = parsed.href;

    setHeadComponents([
      createElement("meta", {
        property: "og:url",
        content: pageUrl,
        "data-baseprotocol": parsed.protocol,
        "data-basehost": parsed.host,
      }),
    ]);
  }
}
