import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BASE_URL } from './utils/constants-client'

export default function App() {
    return (
        <Router
            base={BASE_URL}
            root={(props) => (
                <MetaProvider>
                    <Title>Nicolas DROSS - Pianiste</Title>
                    <Suspense>{props.children}</Suspense>
                </MetaProvider>
            )}
        >
            <FileRoutes />
        </Router>
    )
}
