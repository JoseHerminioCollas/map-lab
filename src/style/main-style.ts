const style: any = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    background: 'gray',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& .info': {
      position: 'absolute',
    },
    '& header': {
      display: 'flex',
      justifyContent: 'center',
      background: 'white',
    },
    '& header h1': {
      color: 'gray',
      margin: '6px 12px',
    },
    '& header > div': {
      flexGrow: 1,
    },
    '& .map-frame': {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    '& .openlayer': {
      position: 'absolute',
      width: '100%',
      height: '90%',

    },
    '& .gibs-select': {
      position: 'absolute',
      top: 0,
      overflow: 'auto',
      background: '#fff',
      width: '100%',
      height: '10%',
      display: 'flex',
      justifyContent: 'space-around',
      alignContent: 'center',
      flexWrap: 'wrap',
      color: 'gray',
    },
    '& .ms-Slider': {
      minWidth: '250px',
      maxWidth: '600px',
    },
    '& .leaflet-map': {
      width: '100%',
      height: '100%',
    },
    '& .google-map': {
      width: '100%',
      height: '100%',
    },
    '& .bing-map': {
      width: '100%',
    },
    '& .control-frame': {
      position: 'absolute',
      bottom: 0,
      overflow: 'auto',
      background: '#fff',
      width: '100%',
      height: '10%',
      display: 'flex',
      justifyContent: 'space-around',
      alignContent: 'center',
      flexWrap: 'wrap',
      color: 'gray',
    },
  },
}
export default style
