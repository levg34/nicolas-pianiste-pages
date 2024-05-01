import { Route, Router } from '@solidjs/router'
import { Component, For, createResource } from 'solid-js'
import Page from './Page'

const pagesFetcher = async () => await fetch('/api/pages').then((res) => res.json())

const NotFound = () => {
    const [pages] = createResource<{ name: string; url: string; _id: string }[]>(pagesFetcher)
    return (
        <div>
            <For each={pages()}>
                {(page) => (
                    <li>
                        <a href={'/'+page.url}>{page.name}</a>
                    </li>
                )}
            </For>
        </div>
    )
}
const App: Component = () => {
    return (
        <Router>
            <Route path="/:pageId" component={Page} />
            <Route path="*" component={NotFound} />
        </Router>
    )
}

export default App
