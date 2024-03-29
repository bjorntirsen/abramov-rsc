import escapeHtml from "escape-html";

export default function renderJSXToHTML(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number") {
    return escapeHtml(jsx);
  } else if (jsx == null || typeof jsx === "boolean") {
    return "";
  } else if (Array.isArray(jsx)) {
    return jsx.map((child) => renderJSXToHTML(child)).join("");
  } else if (typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      return renderReactElementToHTML(jsx);
    } else {
      throw new Error("Cannot render an object.");
    }
  } else {
    throw new Error("Not implemented.");
  }
}

function renderReactElementToHTML(jsx) {
  let html = "<" + jsx.type;
  for (const propName in jsx.props) {
    if (jsx.props.hasOwnProperty(propName) && propName !== "children") {
      html += " ";
      html += propName;
      html += "=";
      html += escapeHtml(jsx.props[propName]);
    }
  }
  html += ">";
  html += renderJSXToHTML(jsx.props.children);
  html += "</" + jsx.type + ">";
  return html;
}
