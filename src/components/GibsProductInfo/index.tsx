import React from 'react'
import './index.css'

const GibsProductInfo: GibsNasa.GibsProductInfo = ({ product, date }) => (
  <section className="gibs-product-info">
    <h5>
      {product.description}
    </h5>
    <ul>
      <li>
        <span>
          Date
        </span>
        {date}
      </li>
      <li>
        <span>
          Date Range
        </span>
        {product.dateRange}
      </li>
    </ul>
  </section>
)

export default GibsProductInfo
