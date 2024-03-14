import { Button } from "@mui/material";
import { useState } from "react";

interface TagProps {
  tagData: { id: number; tag: string };
  selectTag: (tag: { id: number; tag: string }) => void;
}

const Tag = ({ tagData, selectTag }: TagProps) => {
  const [butChecked, setButChecked] = useState(false);

  return (
    <Button
      variant="outlined"
      color={butChecked ? "success" : "info"}
      onClick={() => {
        selectTag(tagData);
        setButChecked(!butChecked);
      }}
    >
      {tagData.tag}
    </Button>
  );
};

export default Tag;
