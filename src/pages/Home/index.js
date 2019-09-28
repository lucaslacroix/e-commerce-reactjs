import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const amount = useSelector(state =>
        state.cart.reduce((sumAmount, product) => {
            sumAmount[product.id] = product.amount;

            return sumAmount;
        }, {})
    );

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products');

            const data = response.data.map(product => ({
                ...product,
                priceFormated: formatPrice(product.price),
            }));

            setProducts(data);
        }

        loadProducts();
    }, []);

    function handleAddProduct(id) {
        dispatch(CartActions.addToCartRequest(id));
    }

    return (
        <ProductList>
            {products.map(prod => (
                <li key={String(prod.id)}>
                    <img src={prod.image} alt={prod.title} />
                    <strong>{prod.title}</strong>
                    <span>{prod.priceFormated}</span>
                    <button
                        type="button"
                        onClick={() => handleAddProduct(prod.id)}
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
