import { Box, Container, Divider, Typography } from "@mui/material"

type Props = {
  title: string
  isDivider?: boolean
  formElement: React.ReactNode
  actionElement: React.ReactNode
  submitHandler: (data: React.FormEvent<HTMLFormElement>) => void
}

export default function VerticalFormLayout({ title, isDivider, formElement, actionElement, submitHandler }: Props) {
  return (
    <Container sx={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box component="form" onSubmit={submitHandler} sx={{ mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>
        {isDivider && <Divider sx={{ bgcolor: 'primary.main', borderBottomWidth: 2 }}/>}
        {formElement}
        {actionElement}
      </Box>
    </Container>
  )
}