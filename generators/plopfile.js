/* eslint-disable quotes */
module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "type",
        message: "put the ui file in atoms, molecules, organisms or templates?",
      },
      {
        type: "input",
        name: "name",
        message: "what the name of component?",
      },
    ],
    actions: [
      // {
      //   type: "add",
      //   path: "../src/shared/ui/{{camelCase type}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
      //   templateFile: "templates/Component/Component.test.tsx.hbs",
      // },
      {
        type: "add",
        path: "../src/shared/ui/{{camelCase type}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/shared/ui/{{camelCase type}}/{{pascalCase name}}/index.ts",
        templateFile: "templates/Component/index.ts.hbs",
      },
      {
        type: "modify",
        path: "../src/shared/ui/{{camelCase type}}/index.ts",
        pattern: /(\/\/ IMPORT MODULE FILES)/g,
        template: '$1\nexport * from "./{{pascalCase name}}";',
      },
    ],
  });
};
