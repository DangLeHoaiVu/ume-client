'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
<<<<<<< HEAD
var antd = require('antd');
=======
var react$1 = require('@headlessui/react');
var react$2 = require('@icon-park/react');
>>>>>>> 66fd52b984802a0ff429e12a54062154ef89da4e

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var DEFAULT_STYLE = `rounded-md border-1 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/99 font-medium text-white`;
var Button = (_a) => {
  var _b = _a, {
    helper,
    children,
    customCSS,
    loadingIconColor = "white",
    isLoading = false,
    isOutlinedButton = false,
    icon,
    type = "submit",
    isDisabled = false
  } = _b, props = __objRest(_b, [
    "helper",
    "children",
    "customCSS",
    "loadingIconColor",
    "isLoading",
    "isOutlinedButton",
    "icon",
    "type",
    "isDisabled"
  ]);
  const btnClass = DEFAULT_STYLE + (isDisabled ? ` ${isOutlinedButton ? "!bg-[#e9eef5] !text-slate-800 opacity-60" : "!bg-slate-300"}` : ` ${isOutlinedButton && "border border-slate-300"}`) + (customCSS ? ` ${customCSS}` : "");
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: btnClass, children: /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      __spreadProps(__spreadValues({}, props), {
        type,
        disabled: isDisabled,
        className: "w-full h-full btn",
        tabIndex: 99,
        style: { borderRadius: 3 },
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-center gap-x-2", children: [
          isLoading && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: `spinner h-5 w-5 animate-spin rounded-full border-[3px] border-r-transparent dark:border-navy-300 dark:border-r-transparent ${loadingIconColor === "white" ? "border-white" : "border-black"}`
            }
          ),
          icon && /* @__PURE__ */ jsxRuntime.jsx("span", { children: icon }),
          children
        ] })
      })
    ) }),
    helper && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "button-helper", children: helper })
  ] });
};
var TextInput = ({
  icon,
  type,
  placeholder,
  name,
  value,
  disabled = false,
  required = false,
  title,
  onChange,
  onClick,
  onBlur,
  state,
  subtitle,
  className,
  error,
  minLength,
  maxLength
}) => {
  const [showPassword, setShowPassword] = react.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntime.jsxs("label", { className: `block ${className}`, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-[16px]", children: [
      title,
      " ",
      required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-ume-error", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "relative mt-1.5 flex items-center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          tabIndex: 99,
          className: `text-base bg-[#FFFFFF] form-input dark:border-navy-450 peer w-full rounded border px-3 py-2 placeholder:text-slate-400/70
            ${disabled ? "cursor-not-allowed bg-slate-100" : ""}
            ${icon ? "pl-9" : ""}
            ${error ? "!border-ume-error !hover:border-ume-error !focus:border-ume-error !focus:outline-ume-error" : "border-slate-300 hover:border-ume-blue focus-visible:border-ume-blue focus:border-ume-blue focus:outline-ume-blue dark:hover:border-navy-400 dark:focus:border-accent"}
            ${type === "password" ? "pr-9" : ""}`,
          type: showPassword ? "text" : type,
          placeholder: placeholder ? placeholder : `Enter your ${title}`,
          name,
          value,
          disabled,
          title,
          onChange,
          onClick,
          onBlur,
          minLength,
          maxLength
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute flex items-center justify-center w-10 h-full pointer-events-none peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent text-slate-400", children: icon })
    ] }),
    subtitle && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-1.5 text-slate-400 text-[.6875rem]", children: subtitle }),
    error && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mt-1.5 inline-block text-ume-error text-[14px]", children: error })
  ] }) });
};
var DrawerSidebar = (_a) => {
  var _b = _a, {
    classNameButton,
    childrenButton,
    titleDrawer,
    classNameDrawer,
    childrenDrawer
  } = _b; __objRest(_b, [
    "classNameButton",
    "childrenButton",
    "titleDrawer",
    "classNameDrawer",
    "childrenDrawer"
  ]);
  const [open, setOpen] = react.useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: `classNameButton`, onClick: showDrawer, children: childrenButton }),
    /* @__PURE__ */ jsxRuntime.jsx(
      antd.Drawer,
      {
        className: `classNameDrawer`,
        title: titleDrawer,
        placement: "right",
        closable: false,
        onClose,
        open,
        children: childrenDrawer
      }
    )
  ] });
};

// src/modal/modal.tsx
var modal_exports = {};
__export(modal_exports, {
  useAlertError: () => useAlertError,
  useEditableForm: () => useEditableForm,
  useLoading: () => useLoading,
  useRiskConfirm: () => useRiskConfirm,
  useSuccess: () => useSuccess
});
var useSuccess = ({ show, onClose, title, message, closeButton }) => {
  const cancelButtonRef = react.useRef(null);
  const handleClose = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(react$1.Transition.Root, { show: show || false, as: react.Fragment, children: /* @__PURE__ */ jsxRuntime.jsxs(
    react$1.Dialog,
    {
      as: "div",
      className: "relative z-50 dialog-container",
      initialFocus: cancelButtonRef,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-full p-4 text-center sm:p-0", children: /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxRuntime.jsxs(react$1.Dialog.Panel, { className: "relative flex flex-col max-w-lg px-4 py-10 text-center transition-opacity duration-300 bg-white rounded-lg w-[32rem] dark:bg-navy-700 sm:px-5", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                react$2.CloseSmall,
                {
                  onClick: handleClose,
                  onKeyDown: (e) => e.key === "Enter" && handleClose(),
                  tabIndex: 1,
                  className: "absolute float-right rounded-full cursor-pointer top-2 right-2 hover:rounded-full hover:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 ",
                  theme: "outline",
                  size: "30",
                  fill: "#000"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "m-auto", children: /* @__PURE__ */ jsxRuntime.jsx(react$2.CheckOne, { theme: "outline", size: "70", fill: "#00B549" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-xl font-bold dark:text-navy-100", children: title }),
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-2 mb-10 text-base", children: message }),
                typeof closeButton === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    onClick: handleClose,
                    customCSS: "btn bg-kmsconnect-primary hover:bg-kmsconnect-primary-focus focus:bg-kmsconnect-primary-focus active:bg-kmsconnect-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 w-auto font-medium text-white",
                    children: closeButton
                  }
                ) : closeButton
              ] })
            ] })
          }
        ) }) })
      ]
    }
  ) }) });
};
var useAlertError = ({ show, onClose, title, message, closeButton, colorIcon = "#FF0000" }) => {
  const cancelButtonRef = react.useRef(null);
  const handleClose = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(react$1.Transition.Root, { show: show || false, as: react.Fragment, children: /* @__PURE__ */ jsxRuntime.jsxs(
    react$1.Dialog,
    {
      as: "div",
      className: "relative z-50 dialog-container",
      initialFocus: cancelButtonRef,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-full p-4 text-center sm:p-0", children: /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxRuntime.jsxs(react$1.Dialog.Panel, { className: "relative flex flex-col max-w-lg px-4 py-10 text-center transition-opacity duration-300 bg-white rounded-lg w-[32rem] dark:bg-navy-700 sm:px-5", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                react$2.CloseSmall,
                {
                  onClick: handleClose,
                  onKeyDown: (e) => e.key === "Enter" && handleClose(),
                  tabIndex: 1,
                  className: "absolute float-right rounded-full cursor-pointer right-2 top-2 hover:rounded-full hover:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 ",
                  theme: "outline",
                  size: "30",
                  fill: "#000"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "m-auto", children: /* @__PURE__ */ jsxRuntime.jsx(react$2.Attention, { theme: "outline", size: "70", fill: colorIcon }) }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-xl font-bold dark:text-navy-100", children: title }),
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-2 mb-10 text-base", children: message }),
                typeof closeButton === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    onClick: handleClose,
                    customCSS: "btn bg-kmsconnect-error hover:bg-kmsconnect-error-focus focus:bg-kmsconnect-error-focus active:bg-kmsconnect-error-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 w-auto font-medium text-white",
                    children: closeButton
                  }
                ) : closeButton
              ] })
            ] })
          }
        ) }) })
      ]
    }
  ) }) });
};
var DEFAULT_PANEL_STYLE = "relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full";
var DEFAULT_TITLE_STYLE = "text-lg font-medium leading-6 text-gray-900";
var useRiskConfirm = ({
  show,
  onClose,
  title,
  message,
  closeButton,
  okButton,
  form,
  closeOnConfirm = true,
  panelCustomCss,
  titleCustomCss
}) => {
  const panelClass = panelCustomCss ? panelCustomCss : DEFAULT_PANEL_STYLE;
  const titleClass = titleCustomCss ? titleCustomCss : DEFAULT_TITLE_STYLE;
  const cancelButtonRef = react.useRef(null);
  const handleClose = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(react$1.Transition.Root, { show: show || false, as: react.Fragment, children: /* @__PURE__ */ jsxRuntime.jsxs(
    react$1.Dialog,
    {
      as: "div",
      className: "relative z-50 dialog-container",
      initialFocus: cancelButtonRef,
      onClose: handleClose,
      onClick: (e) => {
        e.stopPropagation();
        handleClose();
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-full p-4 text-center sm:p-0", children: /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxRuntime.jsxs(react$1.Dialog.Panel, { className: panelClass, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                react$2.CloseSmall,
                {
                  onClick: handleClose,
                  onKeyDown: (e) => e.key === "Enter" && handleClose(),
                  tabIndex: 1,
                  className: "absolute float-right rounded-full cursor-pointer top-1 right-1 hover:rounded-full hover:bg-slate-300/20 active:bg-slate-300/25 ",
                  theme: "outline",
                  size: "30",
                  fill: "#808080"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "justify-center px-10 pt-10 bg-white sm:p-4 sm:pt-10", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-center w-12 h-12 mx-auto rounded-full sm:mr-2 sm:ml-4 sm:h-10 sm:w-10", children: /* @__PURE__ */ jsxRuntime.jsxs("svg", { width: "49", height: "49", viewBox: "0 0 49 49", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "path",
                      {
                        d: "M24.5002 44.9173C30.138 44.9173 35.2422 42.6321 38.9369 38.9374C42.6316 35.2427 44.9168 30.1385 44.9168 24.5006C44.9168 18.8628 42.6316 13.7586 38.9369 10.0639C35.2422 6.3692 30.138 4.08398 24.5002 4.08398C18.8623 4.08398 13.7581 6.3692 10.0634 10.0639C6.36871 13.7586 4.0835 18.8628 4.0835 24.5006C4.0835 30.1385 6.36871 35.2427 10.0634 38.9374C13.7581 42.6321 18.8623 44.9173 24.5002 44.9173Z",
                        stroke: "#FF0000",
                        "stroke-width": "3.8",
                        "stroke-linejoin": "round"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "path",
                      {
                        d: "M24.5 29.222V25.1387C27.8827 25.1387 30.625 22.3964 30.625 19.0137C30.625 15.6309 27.8827 12.8887 24.5 12.8887C21.1173 12.8887 18.375 15.6309 18.375 19.0137",
                        stroke: "#FF0000",
                        "stroke-width": "3.5",
                        "stroke-linecap": "square",
                        "stroke-linejoin": "round"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "path",
                      {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M24.4998 38.4089C25.9093 38.4089 27.0519 37.2662 27.0519 35.8568C27.0519 34.4473 25.9093 33.3047 24.4998 33.3047C23.0904 33.3047 21.9478 34.4473 21.9478 35.8568C21.9478 37.2662 23.0904 38.4089 24.4998 38.4089Z",
                        fill: "#FF0000"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-4 text-center sm:mt-0", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(react$1.Dialog.Title, { as: "h3", className: titleClass, children: title }),
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-1 ", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-base font-normal text-gray-500", children: message }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { children: form ? form : "" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-center flex-1 mt-3 mb-10 sm:px-6", children: [
                typeof closeButton === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    customCSS: "btn mr-2 bg-gray-200 hover:bg-gray-200-focus focus:bg-gray-200-focus active:bg-gray-200-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 w-auto font-medium text-black",
                    onClick: handleClose,
                    children: closeButton
                  }
                ) : closeButton,
                typeof okButton === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    onClick: () => {
                      if (!closeOnConfirm) {
                        return null;
                      }
                      onClose();
                    },
                    children: /* @__PURE__ */ jsxRuntime.jsx(Button, { customCSS: "btn bg-kmsconnect-primary hover:bg-kmsconnect-primary-focus focus:bg-kmsconnect-primary-focus active:bg-kmsconnect-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 w-auto font-medium text-white", children: okButton })
                  }
                ) : /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    onClick: () => {
                      if (!closeOnConfirm) {
                        return null;
                      }
                      onClose();
                    },
                    children: okButton
                  }
                )
              ] })
            ] })
          }
        ) }) })
      ]
    }
  ) }) });
};
var useEditableForm = ({
  show,
  onClose,
  title,
  form,
  onOK,
  closeButtonOnConner,
  backgroundColor
}) => {
  const cancelButtonRef = react.useRef(null);
  const handleClose = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(react$1.Transition.Root, { show: show || false, as: react.Fragment, children: /* @__PURE__ */ jsxRuntime.jsxs(
    react$1.Dialog,
    {
      as: "div",
      className: "relative z-50 dialog-container",
      initialFocus: cancelButtonRef,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-full text-center sm:p-0", children: /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              react$1.Dialog.Panel,
              {
                className: `relative overflow-hidden text-left transition-all transform rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full ${backgroundColor ? `bg-[${backgroundColor}]` : "bg-white"}`,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between pt-6 pb-3 mx-4 rounded-t-lg dark:bg-navy-800 sm:px-5", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "flex items-center text-xl font-medium text-bg-kmsconnect-textGrey dark:text-navy-100", children: title }),
                    closeButtonOnConner ? closeButtonOnConner : /* @__PURE__ */ jsxRuntime.jsx(
                      react$2.CloseSmall,
                      {
                        onClick: handleClose,
                        onKeyDown: (e) => e.key === "Enter" && handleClose(),
                        tabIndex: 1,
                        className: "absolute rounded-full cursor-pointer top-2 right-2 hover:rounded-full hover:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 ",
                        theme: "outline",
                        size: "30",
                        fill: "#000"
                      }
                    )
                  ] }),
                  form
                ]
              }
            )
          }
        ) }) })
      ]
    }
  ) }) });
};
var useLoading = ({ show, onClose, title, message, closeButton }) => {
  const cancelButtonRef = react.useRef(null);
  const handleClose = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(react$1.Transition.Root, { show: show || false, as: react.Fragment, children: /* @__PURE__ */ jsxRuntime.jsxs(
    react$1.Dialog,
    {
      as: "div",
      className: "relative z-50 dialog-container",
      initialFocus: cancelButtonRef,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-full p-4 text-center sm:p-0", children: /* @__PURE__ */ jsxRuntime.jsx(
          react$1.Transition.Child,
          {
            as: react.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxRuntime.jsxs(react$1.Dialog.Panel, { className: "relative flex flex-col max-w-lg px-4 py-10 text-center transition-opacity duration-300 bg-white rounded-lg w-[32rem] dark:bg-navy-700 sm:px-5", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "m-auto", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin", children: /* @__PURE__ */ jsxRuntime.jsx(react$2.LoadingFour, { theme: "outline", size: "70", className: "animate-spin", fill: "#27AAE1" }) }) }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-xl font-bold dark:text-navy-100", children: title }),
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-2 mb-10 text-base", children: message }),
                typeof closeButton === "string" ? /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    onClick: handleClose,
                    customCSS: "btn bg-kmsconnect-grey hover:bg-kmsconnect-grey-focus focus:bg-kmsconnect-grey-focus active:bg-kmsconnect-grey-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 w-auto font-medium text-white",
                    disabled: true,
                    children: closeButton
                  }
                ) : closeButton
              ] })
            ] })
          }
        ) }) })
      ]
    }
  ) }) });
};

exports.Button = Button;
<<<<<<< HEAD
exports.DrawerSidebar = DrawerSidebar;
=======
exports.Modal = modal_exports;
>>>>>>> 66fd52b984802a0ff429e12a54062154ef89da4e
exports.TextInput = TextInput;
