import { Component, For, Show, createResource } from 'solid-js'
import { Breadcrumb, Carousel, Col, Container, Row, Spinner, Stack } from 'solid-bootstrap'
import Element from './elements/Element'
import { prepareForDisplay } from './utils'
import { useParams } from '@solidjs/router'

type Props = {}

export interface PageData {
    headerImageUrl: string
    pageName: string
    data: Datum[]
    bgColor?: string
}

export interface Datum {
    text?: string[]
    image?: string
    video?: Video
}

export interface Video {
    url: string
    thumbUrl: string
}

const getPageData = async (pageId: string): Promise<PageData> => {
    const pageData = await fetch('/api/pages/' + pageId + '/data').then((data) => data.json())
    return pageData
}

const Page: Component<Props> = (props: Props) => {
    const params = useParams()
    const pageId = params.pageId

    const [pageData] = createResource(pageId, getPageData)

    function getFontColor() {
        const bgColor = pageData()?.bgColor
        if (!bgColor) return '#000000'
        var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
        var r = parseInt(color.substring(0, 2), 16) // Red
        var g = parseInt(color.substring(2, 4), 16) // Green
        var b = parseInt(color.substring(4, 6), 16) // Blue
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF'
    }

    const HOME_URL = import.meta.env.VITE_HOME_URL ?? '/'

    return (
        <Stack style="background-color: black">
            <Carousel controls={false} indicators={false}>
                <Carousel.Item>
                    <div
                        class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
                        style={{ height: document.body.clientWidth * (2 / 9) + '' }}
                    >
                        <img src={pageData()?.headerImageUrl} height="100%" width="100%" />
                    </div>
                </Carousel.Item>
            </Carousel>
            <Container
                style={`background-color: ${pageData()?.bgColor ?? 'lightgrey'}; color: ${getFontColor()}`}
                class="mt-3 pt-2"
            >
                <For each={prepareForDisplay(pageData()?.data ?? [])}>
                    {(elements) => (
                        <>
                            <Row>
                                <Col sm>
                                    <Element element={elements[0]} />
                                </Col>
                                <Col sm>
                                    <Show when={elements[1]}>
                                        <Element element={elements[1]} />
                                    </Show>
                                </Col>
                            </Row>
                            <hr />
                        </>
                    )}
                </For>
                <Show when={pageData.loading}>
                    <Spinner animation="border" variant="primary" />
                </Show>
                <Show when={pageData.error}>Error: {pageData.error}</Show>
                <Breadcrumb>
                    <Breadcrumb.Item href={HOME_URL}>Accueil</Breadcrumb.Item>
                    <Breadcrumb.Item active>{pageData()?.pageName}</Breadcrumb.Item>
                </Breadcrumb>
            </Container>
        </Stack>
    )
}

export default Page
