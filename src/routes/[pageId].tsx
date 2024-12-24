import { clientOnly } from '@solidjs/start'
// import Page from '~/components/Page'
const Page = clientOnly(() => import('../components/Page'))

const PageRoute = () => {
    return <Page />
}

export default PageRoute
