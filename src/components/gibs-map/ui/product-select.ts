import { ICommandBarItemProps } from '@fluentui/react'
import { gibs } from '../gibs'

interface ProductSelect {
  (setProduct: React.Dispatch<React.SetStateAction<string>>): ICommandBarItemProps
}

const productSelect: ProductSelect = setProduct => {
  const items: ICommandBarItemProps[] = []
  gibs.products.multibandImagery.forEach(product => {
    const item: any = {
      key: product.imageLayer,
      text: product.description,
      onClick: () => setProduct(product.imageLayer),
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

export default productSelect
