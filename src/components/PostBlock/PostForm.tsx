import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UsersSlice";
import CustomButton from "../UI/CustomButton";




const PostForm = () => {

    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('position_id', options.filter(el => el.name === value)[0].id.toString());
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('photo', img!);
        const token = await (await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')).json();
        console.log(token);

        const data = await (await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: 'POST',
            body: formData,
            headers: {
                'Token': token.token,
            }
        })).json()
        if (data.success) {
            fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users')
                .then(response => response.json())
                .then(data => (dispatch(userSlice.actions.usersRewrite(data))))
            setEmail('')
            setName('')
            setPhone('+380')
            setImg('Upload your photo')
            setValue(options[0].name)
        }
    }


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e && e.target && e.target.files && e.target.files[0]) {
            const fileTypeValid =
                e.target.files[0].type.split('/')[1] === "jpeg"
                ||
                e.target.files[0].type.split('/')[1] === "jpg";


            const fileSizeValid = !(e.target.files[0].size > 5_000_000);

            if (fileTypeValid && fileSizeValid) {
                setImg(e!.target!.files ? e.target.files[0] : "Upload your photo")
            } else {
                alert("Your file is too big or type is not 'jpeg/jpg', choose another")
            }
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

    useEffect(() => {
        name.length >= 2 && name.length <= 60 ? setNameValid(true) : setNameValid(false)
    }, [name])
    useEffect(() => {
        const pattern = /^[\+]{0,1}380([0-9]{9})$/
        pattern.test(phone) ? setPhoneValid(true) : setPhoneValid(false)
    }, [phone])
    useEffect(() => {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        setEmailValid(pattern.test(email))
    }, [email])


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
                placeholder="Your name"
                color="secondary"
                helperText={nameValid ? "It`s ok" : "Length of name should be > 2 and < 50!"}
                error={!nameValid || false}
                value={name}
                sx={{ marginTop: "50px" }}
                onInput={e => handleChange(setName, e)}
            />

            <TextField
                fullWidth
                error={!emailValid || false}
                placeholder="Email"
                helperText={emailValid ? "It`s ok" : "Email is not valid"}
                required
                value={email}
                sx={{ marginTop: "50px" }}
                onInput={e => handleChange(setEmail, e)}

            />

            <TextField
                error={!phoneValid || false}
                helperText={phoneValid ? "It`s ok" : "+38 (XXX) XXX - XX - XX"}
                fullWidth
                placeholder="Phone"
                name="phone"
                required
                value={phone}
                sx={{ marginTop: "50px" }}

                onInput={e => handleChange(setPhone, e)}
            />


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
                    }} className="postblock-form-radio-options" key={option.id} value={option.name} control={<Radio color="secondary" />} label={option.name} />)}

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
                        accept="image/jpeg, image/jpg "
                        hidden
                    />
                </Button>
                <div className="postblock-form-btn-label">
                    <span>{typeof img === "string" ? "Upload your photo" : img.name}</span>
                </div>
            </div>
            <CustomButton onClick={handleSubmit} marginTop="50px" disabled={!nameValid || !phoneValid || !emailValid || (typeof img === 'string')}>Sign in</CustomButton>
        </div >
    )
}
export default PostForm