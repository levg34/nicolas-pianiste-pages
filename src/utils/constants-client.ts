// if HOME_URL is not defined, default to '/', if ends with '/', remove it
let HOME_URL = import.meta.env.VITE_HOME_URL ?? '/'

if (HOME_URL.endsWith('/')) {
    HOME_URL = HOME_URL.slice(0, -1)
}

const BASE_URL = '/pages'

export { HOME_URL, BASE_URL }
