'use client';

import React, { ChangeEvent } from 'react';
import {
    Alert,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Stack,
    TextField,
} from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface IForm {
    username: string;
    password: string;
}

interface IFormError {
    username: boolean;
    password: boolean;
}

const AuthSignIn = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const router = useRouter();

    const [isFormError, setIsFormError] = React.useState<IFormError>({
        username: false,
        password: false,
    });
    const [messageError, setMessageError] = React.useState<IForm>({
        username: '',
        password: '',
    });

    const [form, setForm] = React.useState<IForm>({
        username: '',
        password: '',
    });

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleOnFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onSubmit = async () => {
        setIsFormError({ username: false, password: false });
        setMessageError({ username: '', password: '' });
        if (!form.username) {
            setIsFormError({ ...isFormError, username: true });
            setMessageError({
                ...messageError,
                username: 'Please fill the username',
            });
            return;
        }
        if (!form.password) {
            setIsFormError({ ...isFormError, password: true });
            setMessageError({
                ...messageError,
                password: 'Please fill the password',
            });
            return;
        }

        console.log(form);
        const res = await signIn('credentials', {
            username: form.username,
            password: form.password,
            redirect: false,
        });
        if (res && res.error) {
            setOpen(true);
        }
        if (res && !res.error) {
            router.push('/');
        }
        setForm({ username: '', password: '' });
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2000}
                onClose={() => {
                    setOpen(false);
                }}>
                <Alert
                    onClose={() => {
                        setOpen(false);
                    }}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
            <Grid
                container
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}>
                <Grid
                    item
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
                        minHeight: 100,
                        padding: '10px',
                    }}
                    xs={10}
                    sm={6}
                    md={4}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <LockPersonIcon
                            sx={{
                                marginBottom: '6px',
                                color: 'white',
                                backgroundColor: '#666',
                                fontSize: '27px',
                                padding: '5px',
                                borderRadius: '50%',
                            }}></LockPersonIcon>
                        <p>Sign In</p>
                    </Grid>

                    <TextField
                        helperText={isFormError ? messageError.username : ''}
                        value={form.username}
                        error={isFormError.username}
                        onChange={handleOnFormChange}
                        required
                        sx={{ width: '100%', marginTop: '24px' }}
                        id="username"
                        name="username"
                        label="Username"></TextField>
                    <TextField
                        value={form.password}
                        helperText={isFormError ? messageError.password : ''}
                        error={isFormError.password}
                        fullWidth
                        sx={{ marginTop: '24px' }}
                        name="password"
                        onChange={handleOnFormChange}
                        required
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        label="Password"
                    />
                    <Button
                        onClick={onSubmit}
                        sx={{ width: '100%', marginTop: '24px' }}
                        variant="contained">
                        SIGN IN
                    </Button>

                    <Divider
                        sx={{ width: '100%', marginTop: '24px' }}
                        textAlign="center">
                        Or Using
                    </Divider>

                    <Stack
                        sx={{ width: '100%', marginTop: '24px' }}
                        alignItems={'center'}
                        justifyContent={'center'}
                        direction={'row'}
                        spacing={{ xs: 1, sm: 2 }}>
                        <GoogleIcon
                            sx={{
                                fontSize: '27px',
                                padding: '5px',
                                backgroundColor: 'orange',
                                color: 'white',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                signIn('google');
                            }}></GoogleIcon>
                        <GitHubIcon
                            sx={{
                                fontSize: '27px',
                                padding: '5px',
                                backgroundColor: 'orange',
                                color: 'white',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                signIn('github');
                            }}></GitHubIcon>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default AuthSignIn;
