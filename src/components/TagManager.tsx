import { useEffect, useState } from "react";
import { TagType } from "../types/sample";
import Tag from "./Tag";
import http from "../utils/http";

type TagManagerProps = {
  onTagsChange: (tags: TagType[]) => void;
  selectedTags: TagType[];
};

const TagManager: React.FC<TagManagerProps> = ({
  selectedTags,
  onTagsChange,
}) => {
  const [predefinedTags, setPredefinedTags] = useState<TagType[]>([]);
  const MAX_SELECTION = 3;

  const getTags = async () => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.get("/samples/tags");
      const predefinedTags = response.data;
      setPredefinedTags(predefinedTags);

      // console.log("predefined tags:", predefinedTags);
    } catch (error) {
      console.error("An error occured during fetching tags:", error);
    }
  };

  const handleTagSelect = (selectedTag: TagType) => {
    // If the tag is already selected, remove it
    if (selectedTags.some((tag) => tag.id === selectedTag.id)) {
      const newTags = selectedTags.filter((tag) => tag.id !== selectedTag.id);
      onTagsChange(newTags);
    }
    // If it's not selected, and the limit hasn't been reached, add the tag
    else if (selectedTags.length < MAX_SELECTION) {
      const newTags = [...selectedTags, selectedTag];
      onTagsChange(newTags);
    } else {
      // preliminary solution: show alert
      alert(`You can select a maximum of ${MAX_SELECTION} tags.`);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  // console.log("selected Tags:", selectedTags);

  return (
    <>
      <h2>Tags:</h2>
      <div className="tags-container">
        {predefinedTags.map((tag) => (
          <Tag
            key={tag.id}
            tag={tag}
            selectedTags={selectedTags}
            onSelect={handleTagSelect}
          />
        ))}
      </div>
    </>
  );
};

export default TagManager;
