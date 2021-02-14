import React from 'react'
import { CommandBar, ICommandBarItemProps } from '@fluentui/react'

interface IProductSelect {
  (products: GibsNasa.Products, onProductSelect: GibsNasa.OnProductSelect): ICommandBarItemProps
}
const productSelect: IProductSelect = (products, onProductSelect) => {
  const items: ICommandBarItemProps[] = []
  products.multibandImagery.forEach(product => {
    const item = {
      key: product.imageLayer,
      text: product.description,
      onClick: () => onProductSelect(product),
    }
    items.push(item)
  })

  return {
    key: 'gibs-products',
    text: 'Gibs Products',
    iconProps: { iconName: 'ProductList' },
    subMenuProps: {
      items,
    },
  }
}

const GibsProductSelect: GibsNasa.GibsProductSelect = ({ products, onProductSelect }) => (
  <section className="gibs-product-select">
    <CommandBar
      items={[productSelect(products, onProductSelect)]}
    />
  </section>
)

export default GibsProductSelect
