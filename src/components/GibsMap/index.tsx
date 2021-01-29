import React, { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import * as olProj from 'ol/proj'
import { AppServiceInstanceI } from '../../app-service'

const GibsMap: GibsNasa.GibsMap = ({ id, appService, gibsDate }: {
  id: number, appService: AppServiceInstanceI, gibsDate: string
}) => {
  const mapElement: any = useRef()
  const addCenter = (center: any) => {
    appService.addCenterStatus(center, id)
  }
  const [map, setMap]: any = useState()

  useEffect(() => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    })
    const source = new XYZ({
      url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/'
        + 'MODIS_Terra_CorrectedReflectance_TrueColor/default/2013-06-15/'
        + 'GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
      attributions:
        ['Global Imagery Browse Services <a href="https://wiki.earthdata.nasa.gov/pages/viewpage.action?pageId=2228230" >(GIBS)</a>'],
    })
    const OLMap: any = new Map({
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
    }).on('pointerdrag', (e: any) => {
      const latLong = olProj.toLonLat(e.map.getView().getCenter())
      addCenter([latLong[1], latLong[0]])
    })
    appService.addCenterEventListener(center => {
      if (map) {
        const lLConverted = olProj.fromLonLat([center[1], center[0]])
        OLMap.target.getView().setCenter(lLConverted)
      }
    }, id)
    setMap(OLMap)
  }, [])
  useEffect(() => {
    // update map with new date
    console.log(gibsDate, map)
    const source = new XYZ({
      url: `https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/
${gibsDate}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
      attributions:
        ['Global Imagery Browse Services <a href="https://wiki.earthdata.nasa.gov/pages/viewpage.action?pageId=2228230" >(GIBS)</a>'],
    })

    if (map) {
      const ls = map.target.getLayers().getArray()
      ls[0].setSource(source)
      console.log(ls, source)
    }
  }, [gibsDate])

  return (
    <div ref={mapElement} className="openlayer" />
  )
}

export default GibsMap
