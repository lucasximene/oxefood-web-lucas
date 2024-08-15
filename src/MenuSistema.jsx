import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { logout } from './views/util/AuthenticationService';


export default function MenuSistema (props) {

   return(
       <>
           <Menu inverted>
              
               <Menu.Item
                   name='home'
                   active={props.tela === 'Home'}
                   as={Link}
                   to='/home'
               />

               <Menu.Item
                   name='cliente'
                   active={props.tela === 'Cliente'}
                   as={Link}
                   to='/list-cliente'
               />
               <Menu.Item
                   name='produto'
                   active={props.tela === 'Produto'}
                   as={Link}
                   to='/list-produto'
               />

               <Menu.Item
                   name='entregador'
                   active={props.tela === 'Entregador'}
                   as={Link}
                   to='/list-entregador'
               />

                <Menu.Item
                   name='fornecedor'
                   active={props.tela === 'Fornecedor'}
                   as={Link}
                   to='/list-fornecedor'
               />

                <Menu.Item
                   name='fabricante'
                   active={props.tela === 'Fabricante'}
                   as={Link}
                   to='/list-fabricante'
               />

                <Menu.Item
                   name='categoriaproduto'
                   active={props.tela === 'Categoria Produto'}
                   as={Link}
                   to='/list-categoriaproduto'
               />

                <Menu.Item
                    className='navbar__item--mobile'
                    onClick={logout}
                    content='Sair'
                    as={Link}
                    to='/'
                />


           </Menu>
           
       </>
   )
}
