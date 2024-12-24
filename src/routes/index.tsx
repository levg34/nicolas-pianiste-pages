import { clientOnly } from '@solidjs/start'
// import PageList from '~/components/PageList'
const PageList = clientOnly(() => import('../components/PageList'))

const IndexRoute = () => {
    return <PageList />
}

export default IndexRoute
