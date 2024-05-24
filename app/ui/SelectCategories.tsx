import React, { useEffect, useState } from "react";
import { getCategories, ProductCreate } from "../actions/productActions";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface Props {
  categories: string[];
  onChange: (categories: string[]) => void;
}

export default function SelectCategories(props: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  console.log(categories);

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
          onChange={(event) => props.onChange(event.target.value)}
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
