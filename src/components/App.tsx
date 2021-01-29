import React, { useEffect, useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import GibsSelect from './GibsSelect'
import GibsMap from './GibsMap'
import AppService, { AppServiceInstanceI } from '../app-service'
import gibsProducts, { getOLSourceOptions } from './Gibs'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()
const applicationService: AppServiceInstanceI = AppService()

function App() {
  const intiGibsProduct: GibsNasa.Product = gibsProducts.multibandImagery[0]
  const [gibsProduct, setGibsProduct] = useState<GibsNasa.Product>(intiGibsProduct)
  const [gibsDate, setGibsDate] = useState<string>(intiGibsProduct.dateRange[0])
  const [
    sourceOptions,
    setSourceOptions] = useState(getOLSourceOptions(gibsDate, intiGibsProduct.imageLayer))
  useEffect(() => {
    setSourceOptions(getOLSourceOptions(gibsDate, gibsProduct.imageLayer))
  }, [gibsProduct, gibsDate])

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <GibsMap
          id={10}
          sourceOptions={sourceOptions}
          appService={applicationService}
        />
        <GibsSelect
          selectGibsProduct={(product, date) => {
            setGibsDate(date)
            setGibsProduct(product)
          }}
        />
      </section>
    </>
  )
}

export default App
