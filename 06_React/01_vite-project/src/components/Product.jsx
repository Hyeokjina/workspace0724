import React from 'react'
import styled from 'styled-components'

const Td = styled.td`
    padding: 12px;
    border: 1px solid #d6d6d6;
`

const Product = (props) => {
    
    const product = props.product;
        return (
        <tr>
            <Td>{product.product_name}</Td>
            <Td>{product.price}</Td>
            <Td>{product.color}</Td>
            <Td>{product.color}</Td>
        </tr>
    )
}

export default Product