import React, { useEffect, useState } from 'react'
import { Slider, CommandBar, ICommandBarItemProps } from '@fluentui/react'
import gibsProducts from '../Gibs'

interface IProductSelect {
  (setProduct: React.Dispatch<React.SetStateAction<string>>): ICommandBarItemProps
}

const productSelect: IProductSelect = (setProduct: any) => {
  const items: ICommandBarItemProps[] = []
  gibsProducts.multibandImagery.forEach(product => {
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

const GibsSelect: GibsNasa.GibsSelectorComponent = ({
  selectGibsProduct,
}: { selectGibsProduct: GibsNasa.GibsSelectorCallback }) => {
  const [day, setDay] = useState<number>(1)
  const [month, setMonth] = useState<number>(7)
  const [year, setYear] = useState<number>(2005)
  const [product, setProduct] = useState<any>('MODIS_Terra_CorrectedReflectance_TrueColor')
  useEffect(() => {
    const gibsProduct: GibsNasa.Product = {
      description: 'Corrected Reflectance (Bands 3-6-7) ',
      imageLayer: product,
      dateRange: ['2003-01-01', 'present'],
      tileMatrixSets: ['EPSG4326_250m'],
      format: 'jpg',
    }
    const userSelectedDate = new Date(year, (month - 1), day)
    const dateFormatted = `${userSelectedDate
      .getFullYear()}-${String(userSelectedDate
      .getMonth() + 1).padStart(2, '0')}-${String(userSelectedDate
      .getDate()).padStart(2, '0')}`
    selectGibsProduct(gibsProduct, dateFormatted)
  }, [year, month, day, product])

  return (
    <section className="gibs-select">
      <h3>View Gibs</h3>
      <CommandBar
        items={[productSelect(setProduct)]}
      />
      <Slider
        label="Day"
        min={1}
        max={30}
        value={day}
        showValue
        onChange={(dayValue: number) => setDay(dayValue)}
      />
      <Slider
        label="Month"
        min={1}
        max={12}
        value={month}
        showValue
        onChange={(monthValue: number) => setMonth(monthValue)}
      />
      <Slider
        label="Year"
        min={2003}
        max={2020}
        value={year}
        showValue
        onChange={(yearValue: number) => setYear(yearValue)}
      />
    </section>
  )
}
export default GibsSelect
