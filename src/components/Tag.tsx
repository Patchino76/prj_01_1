import { Button } from "@mui/material";
import { useState } from "react";

interface TagProps {
  tagName: string;
  selectTag: (tag: string) => void;
}

const Tag = ({ tagName, selectTag }: TagProps) => {
  const [butChecked, setButChecked] = useState(false);
  return (
    <Button
      variant="outlined"
      color={butChecked ? "success" : "info"}
      onClick={() => {
        selectTag(tagName);
        setButChecked(!butChecked);
      }}
    >
      {tagName}
    </Button>
  );
};

export default Tag;
