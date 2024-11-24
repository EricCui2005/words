import Button from '@mui/material/Button';

export default function MenuButton({ text, id, setParentState, selected }) {

    const faceBookBlue = "#1877F2"

    const handleClick = () => {
        setParentState(id)
    }

    // menu button
    return (
        <>
            <Button variant="outlined" onClick={handleClick}sx={{ width: 300, color: 'white', backgroundColor: selected ? faceBookBlue : "" }}>
                {text}
            </Button>
        </>
    )
}