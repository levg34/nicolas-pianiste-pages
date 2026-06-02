import { A, createAsync, query } from '@solidjs/router'
import { Button, Card, Col, Container, Row } from 'solid-bootstrap'
import { For, Suspense } from 'solid-js'
import { BACKEND_URL } from '~/utils/constants-server'
import { getImageUrl } from '~/utils/utils'

interface PageResponse {
    name: string
    url: string
    pageData: PageData
    _id: string
    bgColor?: string
}

interface PageData {
    headerImageUrl: string
    data: Datum[]
}

interface Datum {
    markdown?: string
    legacy_text?: string[]
    image?: string
    video?: Video
}

interface Video {
    url: string
    thumbUrl: string
}

const getPages = query(async () => {
    'use server'

    const proxyUrl = `${BACKEND_URL}/pages?full=true`
    const response = await fetch(proxyUrl)

    if (!response.ok) {
        throw new Error(`Failed to fetch pages from backend: ${response.status}`)
    }

    return response.json() as Promise<PageResponse[]>
}, 'pagesList')

export default function PageList() {
    const pages = createAsync(() => getPages())

    return (
        <Container>
            <Suspense fallback={<div>Chargement des pages...</div>}>
                <Row>
                    <For each={pages()}>
                        {(page) => (
                            <Col md={4} class="mb-4">
                                <Card>
                                    <Card.Img variant="top" src={getImageUrl(page.pageData.headerImageUrl)} />
                                    <Card.Body>
                                        <Card.Title>{page.name}</Card.Title>
                                        <Card.Text>{page.pageData.data.find((d) => d.markdown)?.markdown}</Card.Text>
                                        <A href={'/' + page.url}>
                                            <Button variant="primary">Visiter</Button>
                                        </A>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </For>
                </Row>
            </Suspense>
        </Container>
    )
}
