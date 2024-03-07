import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export function KonyvekDeletePage() {
    const navigate = useNavigate();
    const id = useParams().konyvekId;
    const [konyv, setKonyv] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://localhost:5001/Konyv/${id}`);
                const konyv = await res.json();
                setKonyv(konyv);
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !konyv.id ? (
                <CircularProgress />
            ) : (
                <div>
                    <h2>Könyv törlése</h2>
                    <Card className='p-3'>
                        <CardContent>
                            <Typography variant="h4">{konyv.nev}</Typography>
                            <Typography variant="h5" className='card-title'>{konyv.kiadasEve}</Typography>
                            <Typography variant="h5">{konyv.ertekeles}</Typography>
                            <img src={konyv.kepneve} alt={konyv.nev} />
                        </CardContent>
                        <form onSubmit={async (e) => {
                            try {
                                e.preventDefault();
                                await fetch(`https://localhost:7017/Konyv/${id}`, {
                                    headers: { "Content-Type": "application/json" },
                                    method: "DELETE",
                                });
                                navigate("/");
                            } catch (error) {
                                console.log(error);
                            };
                        }}>
                            <div>
                                <NavLink to={"/"}>
                                    <Button variant="outlined" color="warning" startIcon={<i className="bi bi-backspace"></i>}>
                                        Mégsem
                                    </Button>
                                </NavLink>
                                <Button type="submit" variant="outlined" color="danger" startIcon={<i className="bi bi-trash3"></i>}>
                                    Törlés
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
