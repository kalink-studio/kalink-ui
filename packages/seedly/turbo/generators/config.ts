import type { PlopTypes } from '@turbo/gen';

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('ui-component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.css.ts',
        templateFile: 'templates/style.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/index.ts',
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'modify',
        path: 'src/components/index.ts',
        transform: (fileContents, { name }) => {
          const exportStatement = `export { ${plop.getHelper('pascalCase')(name)} } from "./${plop.getHelper('kebabCase')(name)}";`;

          // Split lines, filter empty ones, and insert the new one
          const lines = fileContents
            .split('\n')
            .filter((line) => line.trim().length > 0);

          // Add new export and sort alphabetically
          lines.push(exportStatement);
          lines.sort((a, b) => a.localeCompare(b));

          return lines.join('\n') + '\n'; // Ensure a newline at the end
        },
      },
    ],
  });
}
