import Cliente from '../models/cliente.js';
import Profissional from '../models/profissional.js';

export default class ClienteController {
    constructor(caminhoBase = 'cliente/') {
        this.openAdd = (req, res) => res.render(caminhoBase + 'add');

        this.add = async (req, res) => {
            await Cliente.create({
                nome: req.body.nome,
                dataNasc: req.body.dataNasc,
                telefone: req.body.telefone,
                foto: req.file ? req.file.buffer : null
            });
            res.redirect('/cliente/lst');
        };

        this.list = async (req, res) => {
            const resultado = await Cliente.find({});
            res.render(caminhoBase + 'lst', { Clientes: resultado });
        };

        this.find = async (req, res) => {
            const resultado = await Cliente.find({
                nome: { $regex: req.body.filtro || '', $options: 'i' }
            });
            res.render(caminhoBase + 'lst', { Clientes: resultado });
        };

        this.openEdt = async (req, res) => {
            const cliente = await Cliente.findById(req.params.id);
            if (!cliente) return res.status(404).send('Cliente não encontrado.');
            res.render(caminhoBase + 'edt', { Cliente: cliente });
        };

        this.edt = async (req, res) => {
            const dados = {
                nome: req.body.nome,
                dataNasc: req.body.dataNasc,
                telefone: req.body.telefone
            };
            if (req.file) dados.foto = req.file.buffer;
            await Cliente.findByIdAndUpdate(req.params.id, dados, { runValidators: true });
            res.redirect('/cliente/lst');
        };

        this.del = async (req, res) => {
            await Cliente.findByIdAndDelete(req.params.id);
            await Profissional.updateMany({}, { $pull: { clientes: req.params.id } });
            res.redirect('/cliente/lst');
        };
    }
}
