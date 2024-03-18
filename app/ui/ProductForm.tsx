import { Product } from "@/data";
import { useForm } from "react-hook-form";

interface Props {
  product?: Product;
}

export default function ProductForm(props: Props) {
  const isEdit = Boolean(props.product);

  const form = useForm<Product>({
    defaultValues: props.product || { id: Date.now().toString() },
  });

  const save = () => {
    if (isEdit) {
      // Save Edit
    } else {
      // Add product
    }
  }


  return (
    <form onSubmit={form.handleSubmit(save)}>
      <input type="text" />
      
    </form>
  )
}


