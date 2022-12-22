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
  plop.setGenerator("crud", {
    description: "Create a crud",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "what the name of crud?",
      },
      {
        type: "input",
        name: "label",
        message: "what the label of crud?",
      },
    ],
    actions: [...entities, ...features, ...pages, ...screens],
  });
};
const entities = [
  {
    type: "add",
    path: "../src/entidades/{{camelCase name}}/{{camelCase name}}.ui.tsx",
    templateFile: "templates/crud/entidades/domain.ui.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/entidades/{{camelCase name}}/{{camelCase name}}.model.ts",
    templateFile: "templates/crud/entidades/domain.model.ts.hbs",
  },
  {
    type: "add",
    path: "../src/entidades/{{camelCase name}}/{{camelCase name}}.lib.ts",
    templateFile: "templates/crud/entidades/domain.lib.ts.hbs",
  },
  {
    type: "add",
    path: "../src/entidades/{{camelCase name}}/{{camelCase name}}.api.ts",
    templateFile: "templates/crud/entidades/domain.api.ts.hbs",
  },
  {
    type: "add",
    path: "../src/entidades/{{camelCase name}}/index.ts",
    templateFile: "templates/crud/entidades/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/entidades/{{camelCase name}}/details/index.ts",
    templateFile: "templates/crud/entidades/details/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/entidades/{{camelCase name}}/details/{{pascalCase name}}Details.tsx",
    templateFile: "templates/crud/entidades/details/DomainDetails.tsx.hbs",
  },
];
const features = [
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/create/create{{pascalCase name}}.hook.ts",
    templateFile: "templates/crud/features/create/createDomain.hook.ts.hbs",
  },
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/edit/edit{{pascalCase name}}.hook.ts",
    templateFile: "templates/crud/features/edit/editDomain.hook.ts.hbs",
  },
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/create/create{{pascalCase name}}.lib.ts",
    templateFile: "templates/crud/features/create/createDomain.lib.ts.hbs",
  },
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/edit/edit{{pascalCase name}}.lib.ts",
    templateFile: "templates/crud/features/edit/editDomain.lib.ts.hbs",
  },
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/edit/Edit{{pascalCase name}}Form.tsx",
    templateFile: "templates/crud/features/edit/EditDomainForm.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/create/Create{{pascalCase name}}Form.tsx",
    templateFile: "templates/crud/features/create/CreateDomainForm.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/create/index.ts",
    templateFile: "templates/crud/features/create/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/features/{{camelCase name}}/edit/index.ts",
    templateFile: "templates/crud/features/edit/index.ts.hbs",
  },
];
const pages = [
  {
    type: "add",
    path: "../src/pages/{{camelCase name}}s/create.tsx",
    templateFile: "templates/crud/pages/create.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/pages/{{camelCase name}}s/list.tsx",
    templateFile: "templates/crud/pages/list.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/pages/{{camelCase name}}s/[page].tsx",
    templateFile: "templates/crud/pages/[page].tsx.hbs",
  },
  {
    type: "add",
    path: "../src/pages/{{camelCase name}}s/details/[id].tsx",
    templateFile: "templates/crud/pages/details/[id].tsx.hbs",
  },
  {
    type: "add",
    path: "../src/pages/{{camelCase name}}s/edit/[id].tsx",
    templateFile: "templates/crud/pages/edit/[id].tsx.hbs",
  },
];
const screens = [
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/edit/{{pascalCase name}}EditPage.tsx",
    templateFile: "templates/crud/screens/edit/DomainEditPage.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/create/{{pascalCase name}}CreatePage.tsx",
    templateFile: "templates/crud/screens/create/DomainCreatePage.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/create/index.ts",
    templateFile: "templates/crud/screens/create/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/edit/index.ts",
    templateFile: "templates/crud/screens/edit/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/details/{{pascalCase name}}DetailsPage.tsx",
    templateFile: "templates/crud/screens/details/DomainDetailsPage.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/details/index.ts",
    templateFile: "templates/crud/screens/details/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/list/grid/index.ts",
    templateFile: "templates/crud/screens/list/grid/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/list/table/index.ts",
    templateFile: "templates/crud/screens/list/table/index.ts.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/list/grid/{{pascalCase name}}ListGridPage.tsx",
    templateFile: "templates/crud/screens/list/grid/DomainListGridPage.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/list/table/{{pascalCase name}}ListTablePage.tsx",
    templateFile: "templates/crud/screens/list/table/DomainListTablePage.tsx.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/list/{{camelCase name}}InfiniteList.hook.ts",
    templateFile: "templates/crud/screens/list/domainInfiniteList.hook.ts.hbs",
  },
  {
    type: "add",
    path: "../src/screens/{{camelCase name}}/list/{{camelCase name}}List.hook.ts",
    templateFile: "templates/crud/screens/list/domainList.hook.ts.hbs",
  },
];
