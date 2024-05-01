import { Route, Router } from '@solidjs/router'
import { Component } from 'solid-js'
import Page from './Page'

const NotFound = () => <div>Nothing to see here</div>
const App: Component = () => {
    return (
        <Router>
            <Route path="/:pageId" component={Page} />
            <Route path="*" component={NotFound} />
        </Router>
    )
}

export default App
