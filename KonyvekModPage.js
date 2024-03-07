import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function KonyvekModPage() {
    const { konyvekId } = useParams();
    const navigate = useNavigate();

    const [modnev, setModnev] = useState("");
    const [modkiadasEve, setModkiadasEve] = useState("");
    const [modertekeles, setModertekeles] = useState("");
    const [modkepneve, setModkepneve] = useState("");

    useEffect(() => {
        const fetchKonyvData = async () => {
            try {
                const response = await fetch(`https://localhost:5001/Konyv/${konyvekId}`);
                const konyvData = await response.json();
                setModnev(konyvData.nev);
                setModkiadasEve(konyvData.kiadasEve);
                setModertekeles(konyvData.ertekeles);
                setModkepneve(konyvData.kepneve);
            } catch (error) {
                console.log(error);
            }
        };

        fetchKonyvData();
    }, [konyvekId]);

    const handleModNevChange = (e) => {
        setModnev(e.target.value);
    };

    const handleModKiadasEveChange = (e) => {
        setModkiadasEve(e.target.value);
    };

    const handleModErtekelesChange = (e) => {
        setModertekeles(e.target.value);
    };

    const handleModKepneveChange = (e) => {
        setModkepneve(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const konyv = {
            id: konyvekId,
            nev: modnev,
            kiadasEve: modkiadasEve,
            ertekeles: modertekeles,
            kepneve: modkepneve,
        };

        fetch(`https://localhost:7017/Konyv/${konyvekId}`, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(konyv),
        })
            .then(() => {
                navigate("/");
            })
            .catch(console.log);
    };

    return (
        <div className='p-5 content bg-lavender text-center'>
            <h2>Könyv módosítás</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="nev"
                    label="Név"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    autoComplete='nev'
                    value={modnev}
                    onChange={handleModNevChange}
                />
                <TextField
                    id="kiadasEve"
                    label="Kiadás Éve"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    autoComplete='kiadasEve'
                    value={modkiadasEve}
                    onChange={handleModKiadasEveChange}
                />
                <TextField
                    id="ertekeles"
                    label="Értékelés"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    autoComplete='ertekeles'
                    value={modertekeles}
                    onChange={handleModErtekelesChange}
                />
                <TextField
                    id="kepneve"
                    label="Kép neve"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    autoComplete='kepneve'
                    value={modkepneve}
                    onChange={handleModKepneveChange}
                />
                <Button type="submit" variant="contained" color="success">
                    Küldés
                </Button>
            </form>
        </div>
    );
}
