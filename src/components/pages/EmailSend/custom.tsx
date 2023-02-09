const React = window.unlayer.React;

const Viewer = () => {
  console.log("React", React);
  return <div>I am a custom tool.</div>;
};

unlayer.registerTool({
  name: "my_tool",
  label: "My Tool",
  icon: "fa-smile",
  supportedDisplayModes: ["web", "email"],
  options: {},
  values: {},
  renderer: {
    Viewer: Viewer, // our React Viewer
    exporters: {
      web: function (values) {
        return "<div>I am a custom tool.</div>";
      },
      email: function (values) {
        return "<div>I am a custom tool.</div>";
      },
    },
    head: {
      css: function (values) {},
      js: function (values) {},
    },
  },
});

export default Viewer;
