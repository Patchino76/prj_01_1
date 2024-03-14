import { Button } from "@mui/material";

interface TagProps {
  tagName: string;
}

const TagLabel = ({ tagName }: TagProps) => {
  return (
    <Button variant="outlined" color="success">
      {tagName}
    </Button>
  );
};

export default TagLabel;
