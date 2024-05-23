import { providerMap, signIn } from "@/auth";
import { Box } from "@mui/material";

export default function SignInPage() {
  return (
    <Box
      component="div"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {Object.values(providerMap).map((provider) => (
        <Box
          component="form"
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id);
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </Box>
      ))}
    </Box>
  );
}
