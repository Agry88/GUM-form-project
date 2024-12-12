import { FormHelperText, Typography } from "@mui/material";
import { Box, Grid } from "@mui/material";
import React from "react";

type Props = {
  title: string
  helperText?: string
  formInputElements: React.ReactNode[]
}

export default function GridFormBlockLayout({ title, helperText, formInputElements }: Props) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: helperText ? 0 : 4 }}>
        {title}
      </Typography>
      {helperText && (
        <FormHelperText sx={{ mb: 4 }}>
          {helperText}
        </FormHelperText>
      )}
      
      <Grid container spacing={2}>
        {formInputElements.map((InputElement, index) => (
          <Grid key={index} item xs={12} sm={6}>
            {InputElement}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}