import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../actions/categoryActions";

export default function FormCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        const categoryTitles = fetchedCategories.map(
          (category) => category.title
        );
        setCategories(categoryTitles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoriesChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCategories(event.target.value as string[]);
  };

  if (loading) {
    return <CircularProgress />;
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
          value={selectedCategories}
          onChange={handleCategoriesChange}
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
