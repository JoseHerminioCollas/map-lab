import React, { useEffect, useState } from 'react'
import { Slider } from '@fluentui/react'
import gibsProducts from '../Gibs'

const GibsSelect: GibsNasa.GibsSelectorComponent = ({
  selectGibsProduct,
}: {selectGibsProduct: GibsNasa.GibsSelectorCallback}) => {
  const [day, setDay] = useState<number>(10)
  const [month, setMonth] = useState<number>(7)
  const [year, setYear] = useState<number>(2005)
  const [date, setDate] = useState('2003-08-10')
  const gibsProduct: GibsNasa.Product = {
    description: 'Corrected Reflectance (Bands 3-6-7) ',
    imageLayer: 'MODIS_Terra_CorrectedReflectance_Bands367',
    dateRange: ['2003-01-01', 'present'],
    tileMatrixSets: ['EPSG4326_250m'],
    format: 'jpg',
  }
  useEffect(() => {
    const userSelectedDate = new Date(year, month, day)
    setDate(
      `${userSelectedDate
        .getFullYear()}-${String(userSelectedDate
        .getMonth()).padStart(2, '0')}-${String(userSelectedDate
        .getDate()).padStart(2, '0')}`,
    )
    gibsProduct.description = 'xxxx'
    selectGibsProduct(gibsProduct)
  }, [year, month, day])
  console.log(gibsProducts, selectGibsProduct)

  return (
    <>
      {date}
      <>
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
      </>
    </>
  )
}
export default GibsSelect
