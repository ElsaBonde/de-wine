import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategories } from "../actions/categoryActions";

interface Props {
  categories: string[];
  onChange: (categories: string[]) => void;
}

export default function SelectCategories(props: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitles, setCategoryTitles] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        const categoryTitles = fetchedCategories.map(
          (category) => category.title
        );
        setCategories(categoryTitles);
        setCategoryTitles(categoryTitles); // Sätt categoryTitles-tillståndet här
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


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
          value={props.categories}
          onChange={(event) => props.onChange(event.target.value as string[])}
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
