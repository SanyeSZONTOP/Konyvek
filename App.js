import React from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { KonyvekListPage } from './KonyvekListPage';
import { KonyvekSinglePage } from './KonyvekSinglePage';
import { KonyvekCreatePage } from './KonyvekCreatePage';
import { KonyvekModPage } from './KonyvekModPage';
import { KonyvekDeletePage } from './KonyvekDeletePage';

function App() {
    return (
        <Router>
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Könyvek
                        </Typography>
                        <Button component={NavLink} to="/" color="inherit" sx={{ marginRight: 2 }}>
                            Könyvek
                        </Button>
                        <Button component={NavLink} to="/uj-konyvek" color="inherit">
                            Új Könyvek
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container mt={3}>
                <Routes>
                    <Route path="/" element={<KonyvekListPage />} />
                    <Route path="/konyvek/:konyvekId" element={<KonyvekSinglePage />} />
                    <Route path="uj-konyvek" element={<KonyvekCreatePage />} />
                    <Route path="mod-konyvek/:konyvekId" element={<KonyvekModPage />} />
                    <Route path="del-konyvek/:konyvekId" element={<KonyvekDeletePage />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
