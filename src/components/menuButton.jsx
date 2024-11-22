import Button from '@mui/material/Button';
import { useState } from 'react';

export default function MenuButton({ text, id, setParentState, selected }) {

    const faceBookBlue = "#1877F2"

    const [color, setColor] = useState(faceBookBlue)

    const handleClick = () => {
        setParentState(id)
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClick}sx={{ width: 300, color: 'white', backgroundColor: selected ? faceBookBlue : "" }}>
                {text}
            </Button>
        </>
    )
}