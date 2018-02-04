const path = require('path'); // necesitamos path para configurar nuestras rutas de archivos
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // esto es un plugin para extraer css y crear un archivo ya lo veremos más adelante por ahora tendremos que instalarlo con npm i –D extract-text-webpack-plugin


// Creamos como un tipo json para exportarlo donde está toda nuestra configuración.
module.exports = {
  entry: path.resolve(__dirname, 'src/js/index.js'), // Este es nuestro archivo de entrada donde va estar todo nuestro código de nuestra app, tener en cuenta que se pueden tener varios entry.
  output: {
    path: path.resolve(__dirname, 'dist'), // El output es donde queremos que nuestro código se generado y listo para ser usado ya pasando plugins como el que vimos anteriormente al igual que todos los loaders que necesitemos para nuestro desarrollo.
    filename: 'bundle.js'
  },
  module: { // acá comienzas todos nuestros loaders como el de babel que nos permite usar es2015 react y todo lo último de javascript y webpack lo transforma en código que el navegador pueda entender, todos estos loader tienen presets y esos presets hay que instalarlos ya veremos cómo instalarlos.
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      { // Loader para archivos con extensión .css
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.(sass|scss)$/, // Lo mismo pero para sass
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      }
    ]
  },
  plugins: [ // este el plugin para extra el css de nuestro bundle.js que es el archivos final que genera webpack y nos crear un nuevo archivo con todo nuestro css.
    new ExtractTextPlugin('css/styles.css') //name permite uusar el nombre original del entrypoint
  ]
}
