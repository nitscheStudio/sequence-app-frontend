import { useEffect } from "react";
import { TagType } from "../types/sample";

type TagProps = {
  tag: TagType;
  selectedTags: TagType[];
  onSelect: (tag: TagType) => void;
};

const Tag = ({ tag, selectedTags, onSelect }: TagProps) => {
  let isSelected = selectedTags.some(
    (selectedTag) => selectedTag.id === tag.id
  );

  return (
    <button
      key={tag.id}
      onClick={() => onSelect(tag)}
      className={`tag-button ${isSelected ? "tag-selected" : ""}`}
    >
      {tag.name}
    </button>
  );
};

export default Tag;
