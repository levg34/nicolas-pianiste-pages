import { Route, Router } from '@solidjs/router'
import { Component } from 'solid-js'
import Page from './Page'
import PageList from './PageList'

const App: Component = () => {
    return (
        <Router>
            <Route path="/:pageId" component={Page} />
            <Route path="*" component={PageList} />
        </Router>
    )
}

export default App
