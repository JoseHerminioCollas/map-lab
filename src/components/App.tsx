import React, { useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import GibsSelect from './GibsSelect'
import GibsMap from './GibsMap'
import AppService, { AppServiceInstanceI } from '../app-service'
// import gibsProducts from './Gibs'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()
const applicationService: AppServiceInstanceI = AppService()

function App() {
  const intiGibsProduct: GibsNasa.Product = {
    description: 'Corrected Reflectance (Bands 3-6-7) ',
    imageLayer: 'MODIS_Terra_CorrectedReflectance_Bands367',
    dateRange: ['2003-01-01', 'present'],
    tileMatrixSets: ['EPSG4326_250m'],
    format: 'jpg',
  }
  const [gibsProduct, setGibsProduct] = useState<GibsNasa.Product>(intiGibsProduct)
  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <GibsSelect
          selectGibsProduct={(product: GibsNasa.Product) => setGibsProduct(product)}
        />
        {JSON.stringify(gibsProduct)}
        <GibsMap
          id={10}
          // addCenterStatus
          // addCenterEventListener
          // addGibsProductEventListener
          // gibsProduct ::: state
          appService={applicationService}
        />
      </section>
    </>
  )
}

export default App
