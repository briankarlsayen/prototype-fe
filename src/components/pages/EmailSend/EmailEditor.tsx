import EmailEditor from "react-email-editor";
// import template from "./design001.json";

const Editor = ({ emailEditorRef, setSaved }: any) => {
  const onLoad = () => {
    const template = localStorage.getItem("design");
    if (template && emailEditorRef.current)
      emailEditorRef.current.editor.loadDesign(JSON.parse(template));
    emailEditorRef.current?.editor.addEventListener(
      "design:updated",
      function () {
        setSaved(false);
      }
    );
  };

  const onReady = () => {
    console.log("onReady");
  };

  return (
    <div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
  );
};

export default Editor;
