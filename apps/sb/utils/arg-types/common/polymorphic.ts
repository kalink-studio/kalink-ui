export const polymorphic = {
  use: {
    control: false,
    description:
      'The component used to render the root node of the component. Either a string to use an `JSX.IntrinsicElements` or a component reference to use a `React.ComponentType`',
    defaultValue: '',
    table: {
      category: 'Intrinsic props',
      type: {
        summary: 'ElementType',
      },
    },
  },
};
