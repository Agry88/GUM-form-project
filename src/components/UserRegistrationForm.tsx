import { 
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import GridFormBlockLayout from '../layouts/grid-form-block-layout';
import VerticalFormLayout from '../layouts/vertical-form-layout';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine((date) => new Date(date) <= new Date(), {
    message: 'Date of birth cannot be in the future',
  }),
  email: z.string().email('Invalid email format').optional(),
  phoneNumber: z.string().optional().refine((phoneNumber) => phoneNumber?.startsWith('+852'), {
    message: 'Phone number must start with +852',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  return data.email || data.phoneNumber;
}, {
  message: "Either email or phone number must be provided",
  path: ["email", "phoneNumber"]
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
    <VerticalFormLayout
      title="User Data"
      isDivider={true}
      formElement={
        <>
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
                      <MenuItem value="M">Male</MenuItem>
                      <MenuItem value="F">Female</MenuItem>
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
        </>
      }
      actionElement={
        <>
          <Box>
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
        </>
      }
      submitHandler={handleSubmit(onSubmit)}
    />
  );
}; 