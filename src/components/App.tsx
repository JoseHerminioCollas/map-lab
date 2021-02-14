import React, { useEffect, useState } from 'react'
import { CommandBar, initializeIcons } from '@fluentui/react'
import jss from 'jss'
import preset from 'jss-preset-default'
import style from '../style/main-style'
import GibsMap from './GibsMap'
import InfoModal from './InfoModal'
import AppService, { AppServiceInstanceI } from '../app-service'
import gibsProducts, { getOLSourceOptions } from './Gibs'
import {
  infoCommandItem,
  infoWithAction,
} from '../command-items'
import { CalendarButtonExample } from './DatePicker'
import GibsProductSelect from './GibsProductSelect'

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
  console.log(setGibsProduct)

  return (
    <>
      <section className={sheet.classes.mainContainer}>
        <GibsMap
          id={10}
          sourceOptions={sourceOptions}
          appService={applicationService}
        />
        <div className="control-frame">
          <GibsProductSelect
            products={gibsProducts}
            onProductSelect={product => console.log('product', product)}
          />
          <CalendarButtonExample
            onDateSelect={(date: string) => {
              setGibsDate(date)
            }}
          />
          <InfoModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
          <CommandBar
            items={[infoCommandItem]}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
        </div>
      </section>
    </>
  )
}

export default App
