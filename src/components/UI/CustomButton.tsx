import { Button } from '@mui/material'
import React from 'react'

type Props = {
    marginRight?: string,
    marginTop?: string,
    width?: string,
    onClick?: () => void,
    disabled?: boolean,
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const CustomButton: React.FC<Props> = ({ disabled, onClick, children, marginRight, marginTop, width }: Props) => {
    return (
        <>
            <Button
                disabled={disabled || false}
                onClick={onClick}
                disableElevation
                sx={{
                    marginRight: marginRight || "0",
                    marginTop: marginTop || "0",
                    borderRadius: 80,
                    width: width || 100,
                    height: 34,
                    textTransform: "none",
                    fontFamily: 'Nunito',
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 26,
                    border: 'none',
                    ":hover": {
                        backgroundColor: "primary.light"
                    },
                    ":disabled": {
                        backgroundColor: "#B4B4B4",
                        color: "rgba(255, 255, 255, 0.87)",
                    }
                }}
                variant='contained'
                color="primary">
                {children}
            </Button>
        </>
    )
}

export default CustomButton