import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from './views/util/ProtectedRoute';

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
import FormLogin from './views/login/FormLogin';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <FormLogin/>} />
                <Route path="/home" element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
                <Route path="/list-cliente" element={<ProtectedRoute> <ListCliente/> </ProtectedRoute>} />
                <Route path="/form-cliente" element={<ProtectedRoute> <FormCliente/> </ProtectedRoute>} />
                <Route path="/form-entregador" element={<ProtectedRoute> <FormEntregador/> </ProtectedRoute>} />
                <Route path="/list-entregador" element={<ProtectedRoute> <ListEntregador/> </ProtectedRoute>} />
                <Route path="/form-fabricante" element={<ProtectedRoute> <FormFabricante/> </ProtectedRoute>} />
                <Route path="/list-fabricante" element={<ProtectedRoute> <ListFabricante/> </ProtectedRoute>} />
                <Route path="/form-fornecedor" element={<ProtectedRoute> <FormFornecedor/> </ProtectedRoute>} />
                <Route path="/list-fornecedor" element={<ProtectedRoute> <ListFornecedor/> </ProtectedRoute>} />
                <Route path="/form-categoriaproduto" element={<ProtectedRoute> <FormCategoriaProduto/> </ProtectedRoute>} />
                <Route path="/list-categoriaproduto" element={<ProtectedRoute> <ListCategoriaProduto/> </ProtectedRoute>} />
                <Route path="/form-produto" element={<ProtectedRoute> <FormProduto/> </ProtectedRoute>} />
                <Route path="/list-produto" element={<ProtectedRoute> <ListProduto/> </ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default Rotas
