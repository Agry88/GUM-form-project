import { 
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Container,
  FormHelperText,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GridFormBlockLayout from '../layouts/grid-form-block-layout';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine((date) => new Date(date) <= new Date(), {
    message: 'Date of birth cannot be in the future',
  }),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type IFormData = z.infer<typeof formSchema>;

export const UserRegistrationForm = () => {
  const [open, setOpen] = useState(false);
  const [formJson, setFormJson] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: IFormData) => {
    setFormJson(JSON.stringify(data, null, 2));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ maxWidth:'100%' ,display: 'flex', justifyContent: 'center' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          User Data
        </Typography>

        <Divider sx={{ bgcolor: 'primary.main', borderBottomWidth: 2 }}/>
        <GridFormBlockLayout
          title="Profile Information"
          formInputElements={[
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />,
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />,
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                )}
              />
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>,
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  slotProps={{
                    inputLabel: {
                      shrink: true
                    },
                    htmlInput: {
                      max: new Date().toISOString().split('T')[0]
                    }
                  }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              )}
            />
          ]}
        />
        
        <GridFormBlockLayout
          title="Login Information"
          helperText="Choose one login method to input - either email address or phone number"
          formInputElements={[
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />,
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone Number"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />,
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />,
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          ]}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ 
            mt: 4, 
            mb: 2, 
            bgcolor: 'primary.main',
            color: 'black',
            '&:hover': {
              bgcolor: 'primary.hover'
            }
          }}
        >
          Submit
        </Button>
      </Box>
      
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {formJson}
          </pre>
        </Alert>
      </Snackbar>
    </Container>
  );
}; 