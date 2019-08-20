import React from 'react';
import { format } from '../../util/format';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';
import * as CardActions from '../../store/modules/cart/actions';

function Cart({ cart, removeFromCart, updateAmount, fullPrice }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => decrement(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button>
                    <MdAddCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <MdDelete
                  style={{ cursor: 'pointer' }}
                  size={20}
                  color="#7159c1"
                  onClick={() => removeFromCart(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button>Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{fullPrice}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(cart => ({
    ...cart,
    subtotal: format(cart.price * cart.amount),
  })),
  fullPrice: format(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CardActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
