import React from "react";
import { Stack, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder, type }) => {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            
        </Stack>
    );
};
export default Input;
