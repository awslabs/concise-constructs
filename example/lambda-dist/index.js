var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};

// example/lambda/index.ts
__export(exports, {
  helloConciseConstructsHandler: () => handler
});

// example/lambda/hello-concise-constructs.ts
var aws_sdk = __toModule(require("aws-sdk"));
var handler = async (event) => {
  console.log("lambda start...");
  console.log(process.env.SOME_ENV_VAR);
  console.log("request:", JSON.stringify(event, void 0, 2));
  console.log("We don't end up bundling the `aws-sdk`, few!", aws_sdk.default);
  return {
    statusCode: 200,
    headers: {"Content-Type": "text/plain"},
    body: `Hello concise constructs! The current path is '${event.path}'
`
  };
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbGFtYmRhL2luZGV4LnRzIiwgIi4uL2xhbWJkYS9oZWxsby1jb25jaXNlLWNvbnN0cnVjdHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCB7aGFuZGxlciBhcyBoZWxsb0NvbmNpc2VDb25zdHJ1Y3RzSGFuZGxlcn0gZnJvbSBcIi4vaGVsbG8tY29uY2lzZS1jb25zdHJ1Y3RzXCI7XG4iLCAiaW1wb3J0IHtIYW5kbGVyfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IGF3cyBmcm9tIFwiYXdzLXNka1wiO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogSGFuZGxlciA9IGFzeW5jIChldmVudCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImxhbWJkYSBzdGFydC4uLlwiKTtcbiAgY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuU09NRV9FTlZfVkFSKTtcbiAgY29uc29sZS5sb2coXCJyZXF1ZXN0OlwiLCBKU09OLnN0cmluZ2lmeShldmVudCwgdW5kZWZpbmVkLCAyKSk7XG4gIGNvbnNvbGUubG9nKFwiV2UgZG9uJ3QgZW5kIHVwIGJ1bmRsaW5nIHRoZSBgYXdzLXNka2AsIGZldyFcIiwgYXdzKTtcblxuICByZXR1cm4ge1xuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3BsYWluXCJ9LFxuICAgIGJvZHk6IGBIZWxsbyBjb25jaXNlIGNvbnN0cnVjdHMhIFRoZSBjdXJyZW50IHBhdGggaXMgJyR7ZXZlbnQucGF0aH0nXFxuYCxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBOzs7QUNDQSxJQUFBLFVBQWdCO0FBRVQsY0FBeUI7QUFDOUIsVUFBUSxJQUFJO0FBQ1osVUFBUSxJQUFJLFFBQVEsSUFBSTtBQUN4QixVQUFRLElBQUksWUFBWSxLQUFLLFVBQVUsT0FBTyxRQUFXO0FBQ3pELFVBQVEsSUFBSSxnREFBZ0Q7QUFFNUQsU0FBTztBQUFBLElBQ0wsWUFBWTtBQUFBLElBQ1osU0FBUyxDQUFDLGdCQUFnQjtBQUFBLElBQzFCLE1BQU0sa0RBQWtELE1BQU07QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
