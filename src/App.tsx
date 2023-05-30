import { useState } from "react";
import Modal from "react-modal";
import MyMarkdown from "./MyMarkdown";
import RenderMarkdown from "./RenderMarkdown";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paragraphText, setParagraphText] = useState("Initial paragraph text");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (editedText: string) => {
    setParagraphText(editedText);
    closeModal();
  };

  return (
    <div>
      <h1>App</h1>
      <RenderMarkdown text={paragraphText} lineSpacing={1} />
      <button onClick={openModal}>Edit</button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <MyMarkdown initialText={paragraphText} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default App;
