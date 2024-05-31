import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../actions/categoryActions";

interface Props {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export default function SelectCategories(props: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories.map((category) => category.title));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    props.onChange(event.target.value as string[]);
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="categories-label">Categories</InputLabel>
        <Select
          labelId="categories-label"
          id="categories"
          multiple
          fullWidth
          label="Categories"
          value={props.selectedCategories || []}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
