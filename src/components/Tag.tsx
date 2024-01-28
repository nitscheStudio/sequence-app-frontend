import { useEffect } from "react";
import { TagType } from "../types/sample";
import { IoMdClose } from "react-icons/io";

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
      {isSelected && <IoMdClose className="delete-tag-icon" />}
    </button>
  );
};

export default Tag;
