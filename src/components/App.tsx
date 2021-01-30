import React, { useEffect, useState } from 'react'
import { CommandBar, initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import GibsSelect from './GibsSelect'
import GibsMap from './GibsMap'
import InfoModal from './InfoModal'
import AppService, { AppServiceInstanceI } from '../app-service'
import gibsProducts, { getOLSourceOptions } from './Gibs'
import {
  infoCommandItem,
  infoWithAction,
} from '../command-items'

initializeIcons()
jss.setup(preset())
const sheet = jss.createStyleSheet(style)
sheet.attach()
const applicationService: AppServiceInstanceI = AppService()

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  infoWithAction(infoCommandItem, setIsModalOpen)
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
        <div className="control-frame">
          xxxx
          <CommandBar
            items={[infoCommandItem]}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
          <InfoModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>
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
