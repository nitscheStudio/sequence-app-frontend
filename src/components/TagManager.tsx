import { useState } from "react";
import { Tag } from "../types/sample";

type TagManagerProps = {
  predefinedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  selectedTags: Tag[];
};

const TagManager: React.FC<TagManagerProps> = ({
  predefinedTags,
  selectedTags,
  onTagsChange,
}) => {


  const MAX_SELECTION = 3;

  const handleTagSelect = (tag: Tag) => {
    // If the tag is already selected, remove it
    if (selectedTags.includes(tag)) {
      const newTags = selectedTags.filter((t) => t !== tag);
      onTagsChange(newTags);
    }
    // If it's not selected, and the limit hasn't been reached, add the tag
    else if (selectedTags.length < MAX_SELECTION) {
      const newTags = [...selectedTags, tag];
      onTagsChange(newTags);
    } else {
      // preliminary solution: show alert
      alert(`You can select a maximum of ${MAX_SELECTION} tags.`);
    }
  };

  return (
    <div className="tags-container">
      {predefinedTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleTagSelect(tag)}
          className={`tag-button ${
            selectedTags.includes(tag) ? "tag-selected" : ""
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TagManager;
