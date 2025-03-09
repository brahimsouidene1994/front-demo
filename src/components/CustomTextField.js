import { TextField } from "@mui/material";
import React from "react";
export default function CustomTextField({ label, name, type, formik, multiline, rows }) {
    return (
        <TextField
            id={name}
            name={name}
            label={label}
            type={type}
            onChange={formik.handleChange}
            value={formik.values[name]}
            fullWidth
            required
            multiline={multiline}
            rows={rows}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}