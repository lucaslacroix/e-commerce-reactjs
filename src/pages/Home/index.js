import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
    state = {
        products: [],
    };

    async componentDidMount() {
        const response = await api.get('/products');

        const data = response.data.map(product => ({
            ...product,
            priceFormated: formatPrice(product.price),
        }));

        this.setState({ products: data });
    }

    handleAddProduct = id => {
        const { addToCartRequest } = this.props;

        addToCartRequest(id);
    };

    render() {
        const { products } = this.state;
        const { amount } = this.props;

        return (
            <ProductList>
                {products.map(prod => (
                    <li key={String(prod.id)}>
                        <img src={prod.image} alt={prod.title} />
                        <strong>{prod.title}</strong>
                        <span>{prod.priceFormated}</span>
                        <button
                            type="button"
                            onClick={() => this.handleAddProduct(prod.id)}
                        >
                            <div>
                                <MdAddShoppingCart size={16} color="#fff" />
                                {amount[prod.id] || 0}
                            </div>
                            <span>ADICIONAR AO CARRINHO</span>
                        </button>
                    </li>
                ))}
            </ProductList>
        );
    }
}

const mapStateToProps = state => ({
    amount: state.cart.reduce((amount, product) => {
        amount[product.id] = product.amount;

        return amount;
    }, {}),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
