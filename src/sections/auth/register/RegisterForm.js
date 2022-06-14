import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import {useDispatch} from "react-redux";
import Iconify from '../../../components/Iconify';
import {SignUp} from "../../../services/AuthService";
// ----------------------------------------------------------------------

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email('Email invalide').required('Email requis'),
        password: Yup.string().required('Mot de passe requis'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            formik.isSubmitting = true;
            SignUp({formik, navigate, dispatch});
            formik.isSubmitting = false;
        },
    });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Adresse mail"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Mot de passe"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        S'inscire
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
