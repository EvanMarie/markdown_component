import React, { useState } from "react";
import MyModal from "./MyModal";
import MyMarkdown from "./MyMarkdown";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedText, setEditedText] = useState("");

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveText = (text: string) => {
    setEditedText(text);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>App</h1>
      {editedText ? (
        <div>
          <MyMarkdown initialText={editedText} onSave={handleSaveText} />
        </div>
      ) : (
        <textarea
          placeholder="Enter your Markdown text..."
          rows={10}
          cols={30}
          readOnly
        />
      )}

      <button onClick={handleEditButtonClick}>Edit</button>

      {isModalOpen && (
        <MyModal isOpen={isModalOpen} onRequestClose={handleModalClose}>
          <MyMarkdown initialText={editedText} onSave={handleSaveText} />
        </MyModal>
      )}
    </div>
  );
};

export default App;
