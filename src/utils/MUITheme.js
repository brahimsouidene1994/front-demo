import { createTheme } from "@mui/material";
const MUITheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontSize: "1.2rem", // Default text size
                    "& .MuiInputBase-input": { fontSize: "1.2rem" }, // Input text size
                    "& .MuiFormHelperText-root": { fontSize: "1rem" }, // Error message size
                    "& .MuiInputLabel-root": { fontSize: "1.2rem" }, // Label text size
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "1.2rem", // Button text size
                },
            },
        },
    },
});

export default MUITheme;