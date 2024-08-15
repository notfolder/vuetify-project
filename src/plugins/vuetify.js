/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import colors from 'vuetify/util/colors'
// import { theme } from '../../settings'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: "#4caf50",
          secondary: "#8bc34a",
          accent: "#cddc39",
          error: "#ffeb3b",
          warning: "#ffc107",
          info: "#ff5722",
          success: "#795548",
        },
      },
      dark:{
        // primary: colors.red.darken1,
        // secondary: colors.red.lighten4,
        primary: "#ff0000",
        secondary: colors.green,
      }
    }
  },
})
