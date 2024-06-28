"use client";
import {
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
} from "@mui/material";
import React, { ChangeEvent, InputHTMLAttributes } from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

interface IForm {
    username: string;
    password: string;
}

const SigninPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [form, setForm] = React.useState<IForm>({
        username: "",
        password: "",
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

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
            <Grid
                item
                sx={{
                    backgroundColor: "white",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                    minHeight: 100,
                    padding: "10px",
                }}
                container
                xs={10}
                sm={6}
                md={4}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <LockPersonIcon
                        sx={{
                            marginBottom: "6px",
                            color: "white",
                            backgroundColor: "#666",
                            fontSize: "27px",
                            padding: "5px",
                            borderRadius: "50%",
                        }}></LockPersonIcon>
                    <p>Sign In</p>
                </Grid>

                <TextField
                    onChange={handleOnFormChange}
                    required
                    sx={{ width: "100%", marginTop: "24px" }}
                    id="username"
                    name="username"
                    label="Username"></TextField>
                <FormControl
                    variant="outlined"
                    sx={{ width: "100%", marginTop: "24px" }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        name="password"
                        onChange={handleOnFormChange}
                        required
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
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
                        }
                        label="Password"
                    />
                </FormControl>
                <Button
                    onClick={() => {
                        console.log(form);
                    }}
                    sx={{ width: "100%", marginTop: "24px" }}
                    variant="contained">
                    SIGN IN
                </Button>

                <Divider
                    sx={{ width: "100%", marginTop: "24px" }}
                    textAlign="center">
                    Or Using
                </Divider>

                <Stack
                    sx={{ width: "100%", marginTop: "24px" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                    direction={"row"}
                    spacing={{ xs: 1, sm: 2 }}>
                    <GoogleIcon
                        sx={{
                            fontSize: "27px",
                            padding: "5px",
                            backgroundColor: "orange",
                            color: "white",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}></GoogleIcon>
                    <GitHubIcon
                        sx={{
                            fontSize: "27px",
                            padding: "5px",
                            backgroundColor: "orange",
                            color: "white",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}></GitHubIcon>
                </Stack>
            </Grid>
        </div>
    );
};

export default SigninPage;
