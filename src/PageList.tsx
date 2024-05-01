import { Button, Card, Col, Container, Row } from 'solid-bootstrap'
import { For, createResource } from 'solid-js'

const pagesFetcher = async () => await fetch('/api/pages?full=true').then((res) => res.json())

export interface PageResponse {
    name: string
    url: string
    pageData: PageData
    _id: string
    bgColor?: string
}

export interface PageData {
    headerImageUrl: string
    data: Datum[]
}

export interface Datum {
    markdown?: string
    legacy_text?: string[]
    image?: string
    video?: Video
}

export interface Video {
    url: string
    thumbUrl: string
}

export default function PageList() {
    const [pages] = createResource<PageResponse[]>(pagesFetcher)

    return (
        <Container>
            <Row>
                <For each={pages()}>
                    {(page) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={page.pageData.headerImageUrl} />
                                <Card.Body>
                                    <Card.Title>{page.name}</Card.Title>
                                    <Card.Text>{page.pageData.data.find((d) => d.markdown)?.markdown}</Card.Text>
                                    <a href={'/' + page.url}>
                                        <Button variant="primary">Visiter</Button>
                                    </a>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </For>
            </Row>
        </Container>
    )
}
