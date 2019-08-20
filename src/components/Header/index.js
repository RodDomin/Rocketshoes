import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { Container, Cart } from './styles';
import Logo from '../../assets/images/logo.svg';

function Header(props) {
  console.log(props.cartSize);

  return (
    <Container>
      <Link to="/">
        <img src={Logo} alt="RocketLogo" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{props.cartSize} itens</span>
        </div>
        <MdShoppingBasket color="#FFF" size={36} />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cart: state.cart,
  cartSize: state.cart.length,
}))(Header);
