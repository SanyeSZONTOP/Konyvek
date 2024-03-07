import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function KonyvekCreatePage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://localhost:7017/Konyv", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                nev: e.target.elements.nev.value,
                kiadasEve: e.target.elements.kiadasEve.value,
                ertekeles: e.target.elements.ertekeles.value,
                kepneve: e.target.elements.kepneve.value,
            }),
        })
            .then(() => {
                alert("Sikeres létrehozás");
                navigate("/");
            })
            .catch(console.log);
    };

    return (
        <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 5 }}>
            <CardContent>
                <h2>Új Könyv</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="nev"
                        name="nev"
                        label="Név"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        autoComplete='nev'
                    />
                    <TextField
                        id="kiadasEve"
                        name="kiadasEve"
                        label="Kiadás Éve"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        autoComplete='kiadasEve'
                    />
                    <TextField
                        id="ertekeles"
                        name="ertekeles"
                        label="Értékelés"
                        variant="outlined"
                        type="number"
                        fullWidth
                        margin="normal"
                        autoComplete='ertekeles'
                    />
                    <TextField
                        id="kepneve"
                        name="kepneve"
                        label="Kép neve"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        autoComplete='kepneve'
                    />
                    <Button type="submit" variant="contained" color="success">
                        Küldés
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
