import React, {
  useEffect,
  useRef,
  // useState,
} from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import * as olProj from 'ol/proj'
import { AppServiceInstanceI } from '../../app-service'

const GibsMap: GibsNasa.GibsMap = ({
  id,
  appService,
  sourceOptions,
}: {
  id: number, appService: AppServiceInstanceI, sourceOptions: any
}) => {
  const mapElement: any = useRef()
  const addCenter = (center: any) => {
    appService.addCenterStatus(center, id)
  }
  // const [map, setMap]: any = useState()
  useEffect(() => {
    const OLMap: any = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new XYZ(sourceOptions),
        }),
      ],
      view: new View({
        projection: 'EPSG:3857', // EPSG:3857 EPSG4326_250m EPSG:3857
        // center: [-13614350.227919813, 6040458.372108159],
        center: [0, 0],
        zoom: 6,
      }),
    }).on('pointerdrag', (e: any) => {
      const lL = e.map.getView().getCenter()
      const latLong = olProj.toLonLat(e.map.getView().getCenter())
      console.log('xx', lL)
      // console.log('LL: ', lL)
      // addCenter([latLong[1], latLong[0]])
      // addCenter(lL)
      addCenter([latLong[1], latLong[0]])
      // appService.addCenterStatus(lL, id)
    })
    // get the latest center value and update
    appService.addCenterEventListener(center => {
      if (OLMap) {
        const lLConverted = olProj.fromLonLat([center[1], center[0]])
        console.log('xx', center)
        OLMap.target.getView().setCenter(lLConverted)
      }
    }, id)
    // setMap(OLMap)
  }, [])
  // useEffect(() => {
  //   if (map) {
  //     const source = new XYZ(sourceOptions)
  //     const ls = map.target.getLayers().getArray()
  //     ls[0].setSource(source)
  //   }
  // }, [sourceOptions])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default GibsMap
