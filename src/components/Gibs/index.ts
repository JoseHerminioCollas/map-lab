// Information about Gibs Nasa can be found here:
// https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+Available+Imagery+Products#expand-CorrectedReflectance17Products

const gibsProducts: GibsNasa.Products = {
  multibandImagery: [{
    description: 'Corrected Reflectance (True Color)',
    imageLayer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    dateRange: ['2003-01-01', 'present'],
    tileMatrixSets: ['EPSG4326_250m'],
    format: 'jpg',
  },
  {
    description: 'Corrected Reflectance ',
    imageLayer: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
    dateRange: ['2020-04-25', 'present'],
    tileMatrixSets: ['EPSG4326_250m'],
    format: 'jpg',
  },
  {
    description: 'Corrected Reflectance (Bands 3-6-7) ',
    imageLayer: 'MODIS_Terra_CorrectedReflectance_Bands367',
    dateRange: ['2003-01-01', 'present'],
    tileMatrixSets: ['EPSG4326_250m'],
    format: 'jpg',
  }, {
    description: 'Corrected Reflectance (Bands 7-2-1) ',
    imageLayer: 'MODIS_Aqua_CorrectedReflectance_Bands721',
    dateRange: ['2003-01-01', 'present'],
    tileMatrixSets: ['EPSG4326_250m'],
    format: 'jpg',
  },
  {
    description: 'Corrected Reflectance (Bands 7-2-1) ',
    imageLayer: 'MODIS_Terra_CorrectedReflectance_Bands367',
    dateRange: ['2003-01-01', 'present'],
    tileMatrixSets: ['EPSG4326_250m'],
    format: 'jpg',
  },
  ],
}
const getOLSourceOptions = (date: string, gibsProduct: string) => {
  const sO = {
    url: `
https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg3857/best/
${gibsProduct}/default/
${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
    attributions:
      ['Global Imagery Browse Services <a href="https://wiki.earthdata.nasa.gov/pages/viewpage.action?pageId=2228230" >(GIBS)</a>'],
  }
  return sO
}
export { getOLSourceOptions }
export default gibsProducts
