import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '@googlemaps/loader'
import config from '../config'

let map
let listener
const GMap = ({
  control,
  statusDispatch,
  mainClassName,
  controlId,
  appService,
}) => {
  const idName = 'google-map'
  const resetZoomLevel = control.zoom
  useEffect(() => {
    const loader = new Loader({
      apiKey: config.gMapAPIKey,
      version: 'weekly',
      libraries: [],
    })
    const mapOptions = {
      center: {
        lat: control.center[0],
        lng: control.center[1],
      },
      zoom: resetZoomLevel,
      disableDefaultUI: true,
      zoomControl: false,
      zoomControlOptions: {
        position: null,
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    }
    loader
      .load()
      .then(() => {
        // eslint-disable-next-line
        mapOptions.zoomControlOptions.position = window.google.maps.ControlPosition.TOP_RIGHT
        // eslint-disable-next-line
        map = new window.google.maps.Map(document.getElementById(idName), mapOptions)
        const userCenterChanged = () => {
          const centerArr = Object
            .entries(map.getCenter())
            .map(e => e[1]())
          statusDispatch({ type: 'center', center: centerArr, callerId: controlId })
        }
        map.addListener('mousedown', () => {
          listener = map.addListener('center_changed', userCenterChanged)
        })
        map.addListener('mouseup', () => {
          // eslint-disable-next-line
          window.google.maps.event.removeListener(listener);
        })
      })
      .catch(e => {
        throw new Error(`Library Not Loaded ${e}`)
      })
  }, [])
  useEffect(() => {
    appService.addMessageEventListener(message => {
      if (map) {
        // eslint-disable-next-line no-console
        console.log('GMap')
        const arr = JSON.parse(message)
        const arg = { lat: arr[0], lng: arr[1] }
        map.setCenter(arg)
      }
    }, 100)
  }, [])
  useEffect(() => {
    if (map) {
      // map.setCenter({ lat: control.center[0], lng: control.center[1] })
    }
  }, [control.center])
  useEffect(() => {
    if (map) {
      map.setZoom(control.zoom)
    }
  }, [control.zoom])

  return (
    <div
      id={idName}
      className={mainClassName}
      data-component-name="gmap"
    >
      GMap
    </div>
  )
}

/* eslint-disable react/forbid-prop-types */
GMap.propTypes = {
  controlId: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  statusDispatch: PropTypes.func.isRequired,
  mainClassName: PropTypes.string.isRequired,
  appService: PropTypes.object.isRequired,
}

export default GMap
