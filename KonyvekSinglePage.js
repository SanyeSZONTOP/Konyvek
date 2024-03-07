import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, CircularProgress } from '@mui/material';

export function KonyvekSinglePage() {
    const { konyvekId } = useParams();
    const [konyv, setKonyv] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        const fetchKonyvData = async () => {
            try {
                const response = await fetch(`https://localhost:7017/Konyv/${konyvekId}`);
                const konyvData = await response.json();
                setKonyv(konyvData);
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        };

        fetchKonyvData();
    }, [konyvekId]);

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !konyv.id ? (
                <CircularProgress />
            ) : (
                <Card>
                    <CardHeader title={`Könyv neve: ${konyv.nev}`} />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Kiadás éve: {konyv.kiadasEve}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Értékelés: {konyv.ertekeles}
                        </Typography>
                        <NavLink to={"/"}>
                            <img src={konyv.kepneve} alt="Könyv képe" style={{ width: '100%', height: 'auto' }} />
                        </NavLink>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
