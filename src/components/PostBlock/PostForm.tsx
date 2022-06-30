import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar, TextField } from "@mui/material"
import React, { useEffect, useState } from "react";
import { validateEmail, validateName, validatePhone } from "../../func/validator";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UsersSlice";
import CustomButton from "../UI/CustomButton";
import PostNotification from "./PostNotification";




const PostForm = ({ userRef }: { userRef: React.RefObject<HTMLInputElement> }) => {

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);



    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('position_id', options.filter(el => el.name === value)[0].id.toString());
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('photo', img!);


        const token = await (await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')).json();
        try {
            const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
                method: 'POST',
                body: formData,
                headers: {
                    'Token': token.token,
                }
            })

            const data = await response.json()

            if (data.success) {
                await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
                    .then(response => response.json())
                    .then(data => {
                        userRef.current?.scrollIntoView()
                        setOpen(true)
                        return (dispatch(userSlice.actions.usersRewrite(data)))
                    })
                    .catch(err => console.log(err))
                setEmail('')
                setName('')
                setPhone('+380')
                setImg('Upload your photo')
                setValue(options[0].name)

            }
        } catch (err) {
            console.log(err);
        }

    }


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e && e.target && e.target.files && e.target.files[0]) {
            const last = e.target.files[0].name.split('.')
            let img = new Image()
            img.src = window.URL.createObjectURL(e.target.files[0])
            const fileSquareValid = img.onload = () => {
                return img.naturalHeight >= 70 && img.naturalWidth >= 70
            }


            const fileTypeValid = last[last.length - 1] === "jpeg" || last[last.length - 1] === "jpg"

            const fileSizeValid = !(e.target.files[0].size > 5_000_000);
            if (!fileSquareValid) {
                alert('Size of picture is too small')
                setImgValid(false)
                return
            }
            if (!fileTypeValid) {
                alert('Type is not valid ')
                setImgValid(false)
                return
            }
            if (!fileSizeValid) {
                alert('Size of file is too big ')
                setImgValid(false)

                return
            }
            setImg(e!.target!.files ? e.target.files[0] : "Upload your photo")
        }
    }

    const [options, setOptions] = useState<{ id: number, name: string }[]>([])

    const [value, setValue] = useState("");

    const [name, setName] = useState('')
    const [nameValid, setNameValid] = useState<boolean | null>(null)

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState<boolean | null>(null)

    const [phone, setPhone] = useState('+380')
    const [phoneValid, setPhoneValid] = useState<boolean | null>(null)


    const [img, setImg] = useState<File | string>("Upload your photo")
    const [imgValid, setImgValid] = useState<boolean | null>(null)


    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, event: (React.FormEvent<HTMLDivElement>)) => {
        setter((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(response => response.json())
            .then(data => {
                setOptions(data.positions)
                setValue(data.positions[0].name)
            })
    }, [])


    return (
        <div className="postblock-form" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}>
            <TextField
                required
                fullWidth
                label={"Name"}
                helperText={nameValid === null || nameValid ? "It`s ok" : "Length of name should be > 2 and < 60!"}
                error={nameValid === null ? false : !nameValid}
                value={name}
                sx={{ marginTop: "50px" }}
                onInput={e => {
                    handleChange(setName, e)
                    setNameValid(validateName((e.target as HTMLInputElement).value))
                }}
            />

            <TextField
                fullWidth
                required
                error={emailValid === null ? false : !emailValid}
                label={"Email"}
                helperText={emailValid === null || emailValid ? "It`s ok" : "Email is not valid"}
                value={email}
                sx={{ marginTop: "50px" }}
                onInput={e => {
                    handleChange(setEmail, e)
                    setEmailValid(validateEmail((e.target as HTMLInputElement).value))
                }}
            />

            <TextField
                required
                fullWidth
                error={phoneValid === null ? false : !phoneValid}
                helperText={phoneValid === null || phoneValid ? "It`s ok" : "+38 (XXX) XXX - XX - XX"}
                label={"Phone"}
                name="phone"
                sx={{ marginTop: "50px" }}
                value={phone}
                onInput={e => {
                    handleChange(setPhone, e)
                    setPhoneValid(validatePhone((e.target as HTMLInputElement).value))
                }} />


            <FormControl className="postblock-form-radio" sx={{
                marginTop: "25px",
            }}>
                <FormLabel id="demo-controlled-radio-buttons-group"
                    sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: "26px",
                        color: "black",
                    }}
                    color="secondary"
                >Select your position</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={e => handleChange(setValue, e)}>

                    {options.map(option => <FormControlLabel sx={{
                        display: "flex",
                    }} className="postblock-form-radio-options" key={option.id} value={option.name} control={<Radio sx={{
                        color: "#D0CFCF",
                        '&.Mui-checked': {
                            color: "secondary.main",
                        },
                    }} />} label={option.name} />)}

                </RadioGroup>
            </FormControl >
            <div className="postblock-form-btn" >
                <Button
                    disableElevation
                    sx={{
                        width: "83px",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        padding: "14px 15px",
                        borderColor: imgValid == null || imgValid ? "black" : "red"
                    }}
                    variant="outlined"
                    component="label"
                    color="inherit"
                >
                    Upload
                    <input
                        required
                        type="file"
                        onChange={handleFile}
                        accept="image/jpeg, image/jpg"
                    />
                </Button>

                <div className="postblock-form-btn-label" style={{ borderColor: imgValid == null || imgValid ? "black" : "red" }}
                >
                    <span>{typeof img === "string" ? "Upload your photo" : img.name}</span>
                </div>
            </div>
            <label style={{ color: imgValid == null || imgValid ? "black" : "red" }} htmlFor="file-btn">{imgValid == null || imgValid ? "It`s okey" : "File is not valid!"}</label>
            <CustomButton onClick={handleSubmit} marginTop="50px" disabled={!nameValid || !phoneValid || !emailValid || (typeof img === 'string')}>Sign in</CustomButton>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="User have been saved"
                action={<PostNotification setOpen={setOpen} />}
            />
        </div >
    )
}
export default PostForm