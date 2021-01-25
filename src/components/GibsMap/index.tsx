import React, { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import * as olProj from 'ol/proj'
import { AppServiceInstanceI } from '../../app-service'

interface IMapWrapper {
  (props: any): any
}

const GibsMap: IMapWrapper = ({ id, appService }: {
  id: number, appService: AppServiceInstanceI
}) => {
  const mapElement: any = useRef()
  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    })
    const source = new XYZ({
      url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/'
        + 'MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-06-15/'
        + 'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
    })
    // eslint-disable-next-line
    const map: any = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source,
        }),
        initalFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [-13614350.227919813, 6040458.372108159],
        zoom: 9,
      }),
      controls: [],
    })
    appService.addCenterEventListener(center => {
      if (map) {
        const lLConverted = olProj.fromLonLat([center[1], center[0]])
        map.getView().setCenter(lLConverted)
      }
    }, id)
  }, [])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default GibsMap
