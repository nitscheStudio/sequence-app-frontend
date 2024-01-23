import { useState } from "react";
import predefinedTags from "../predefinedArrays/TagData";

type Tag = {
  name: string;
};

type TagManagerProps = {
  predefinedTags: Array<{}>;
  onTagsChange: (tags: Array<{}>) => void;
};

const TagManager = ({ onTagsChange }: TagManagerProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleTagSelect = (tag: Tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    onTagsChange(newTags); // Lift the state up
  };

  return (
    <div>
      {predefinedTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleTagSelect(tag)}
          className={selectedTags.includes(tag) ? "tag-selected" : ""}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TagManager;
