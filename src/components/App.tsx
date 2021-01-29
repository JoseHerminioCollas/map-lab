import React, { useEffect, useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import GibsSelect from './GibsSelect'
import GibsMap from './GibsMap'
import AppService, { AppServiceInstanceI } from '../app-service'
import gibsProducts from './Gibs'

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
  const initSourceOptions = {
    url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/'
      + 'MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-06-15/'
      + 'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
    attributions:
      ['Global Imagery Browse Services <a href="https://wiki.earthdata.nasa.gov/pages/viewpage.action?pageId=2228230" >(GIBS)</a>'],
  }
  const [gibsProduct, setGibsProduct] = useState<GibsNasa.Product>(intiGibsProduct)
  const [gibsDate, setGibsDate] = useState<string>('1003-09-09')
  const [sourceOptions, setSourceOptions] = useState(initSourceOptions)
  useEffect(() => {
    initSourceOptions.attributions = ['xxxxxxxxxxxxxx']
    setSourceOptions(initSourceOptions)
  }, [gibsProducts, gibsDate])

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <GibsSelect
          selectGibsProduct={(product, date) => {
            setGibsDate(date)
            setGibsProduct(product)
          }}
        />
        {gibsProduct.description}
        {gibsDate}
        <GibsMap
          id={10}
          sourceOptions={sourceOptions}
          // addCenterStatus
          // addCenterEventListener
          // addGibsProductEventListener
          // gibsProduct ::: state
          // gibsDate={gibsDate}
          appService={applicationService}
        />
      </section>
    </>
  )
}

export default App
