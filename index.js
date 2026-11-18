import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js';
import ClienteRoutes from './routes/ClienteRoutes.js';
import ProfissionalRoutes from './routes/ProfissionalRoutes.js';

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));
app.set('views', join(__dirname, 'views'));

app.use(ClienteRoutes);
app.use(ProfissionalRoutes);
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
