import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import Home from './views/home/Home';
import FormFabricante from './views/fabricante/FormFabricante';
import ListFabricante from './views/fabricante/ListFabricante';
import FormFornecedor from './views/fornecedor/FormFornecedor';
import ListFornecedor from './views/fornecedor/ListFornecedor';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import FormCategoriaProduto from './views/categoriaproduto/FormCategoriaProduto';
import ListCategoriaProduto from './views/categoriaproduto/ListCategoriaProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                <Route path="form-fabricante" element={ <FormFabricante/> } />
                <Route path="list-fabricante" element={ <ListFabricante/> } />
                <Route path="form-fornecedor" element={ <FormFornecedor/> } />
                <Route path="list-fornecedor" element={ <ListFornecedor/> } />
                <Route path="form-categoriaproduto" element={ <FormCategoriaProduto/> } />
                <Route path="list-categoriaproduto" element={ <ListCategoriaProduto/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
            </Routes>
        </>
    )
}

export default Rotas
