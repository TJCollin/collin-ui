import "../src/styles/index.scss";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'primary',
    values: [
      {
        name: 'primary',
        value: 'e4ebf5',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
}

export const decorators = [
  (Story, Context) => (
    <div style={{ padding: "20px 40px" }}>
      <h3 style={{ marginBottom: "20px" }}>{Context.name}</h3>
      <Story />
    </div>
  ),
];