import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

export function KonyvekListPage() {
    const [konyv, setKonyv] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("https://localhost:7017/Konyv")
            .then((res) => res.json())
            .then((konyvek) => setKonyv(konyvek))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    return (
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isFetchPending ? (
                <CircularProgress />
            ) : (
                <div>
                    <h2>Könyvek</h2>
                    <Grid container spacing={2} justifyContent="center">
                        {konyv.map((konyv) => (
                            <Grid item key={konyv.id} style={{ width: "200px" }}>
                                <Card className='m-1 p-2'>
                                    <Typography variant="subtitle2" color="textSecondary">Könyv neve: {konyv.nev}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">Kiadás éve: {konyv.kiadasEve}</Typography>
                                    <Typography variant="body1">Könyv értékelése: {konyv.ertekeles}</Typography>
                                    <NavLink to={"/konyvek/" + konyv.id}>
                                        <div>
                                            <img src={konyv.kepneve} style={{ width: "100%", height: "auto" }} alt="Kép" />
                                        </div>
                                    </NavLink>
                                    <NavLink to={"/mod-konyvek/" + konyv.id}>
                                        <Button variant="outlined" startIcon={<i className="bi bi-pencil-square"></i>}>
                                            Módosítás
                                        </Button>
                                    </NavLink>
                                    <NavLink to={"/del-konyvek/" + konyv.id} className={"text-danger"}>
                                        <Button variant="outlined" startIcon={<i className="bi bi-trash3"></i>}>
                                            Törlés
                                        </Button>
                                    </NavLink>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}
