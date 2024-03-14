import { Button } from "@mui/material";

interface TagProps {
  tag: string;
}

const TagLabel = ({ tag }: TagProps) => {
  return (
    <Button variant="outlined" color="success">
      {tag}
    </Button>
  );
};

export default TagLabel;
