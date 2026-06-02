import { Component, For, Show, Suspense } from 'solid-js'
import { Breadcrumb, Carousel, Col, Container, Row, Spinner, Stack } from 'solid-bootstrap'
import Element from './elements/Element'
import { getImageUrl, prepareForDisplay } from '../utils/utils'
import { useParams, createAsync, query } from '@solidjs/router'
import { BACKEND_URL } from '~/utils/constants-server'
import { HOME_URL } from '~/utils/constants-client'

type Props = {}

interface PageData {
    headerImageUrl: string
    pageName: string
    data: Datum[]
    bgColor?: string
}

interface Datum {
    text?: string[]
    image?: string
    video?: Video
}

interface Video {
    url: string
    thumbUrl: string
}

const fetchPageData = query(async (pageId: string) => {
    'use server'
    if (!pageId) return null

    const proxyUrl = `${BACKEND_URL}/pages/${pageId}/data`
    const response = await fetch(proxyUrl)

    if (!response.ok) {
        throw new Error(`Failed to fetch page data from backend: ${response.status}`)
    }

    return response.json() as Promise<PageData>
}, 'pageDetails')

const Page: Component<Props> = (props: Props) => {
    const params = useParams()

    const pageData = createAsync(() => fetchPageData(params.pageId!))

    function getFontColor() {
        const bgColor = pageData()?.bgColor
        if (!bgColor) return '#000000'
        var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
        var r = parseInt(color.substring(0, 2), 16)
        var g = parseInt(color.substring(2, 4), 16)
        var b = parseInt(color.substring(4, 6), 16)
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF'
    }

    return (
        <Stack style="background-color: black">
            <Suspense
                fallback={
                    <Container class="text-center mt-5 pt-5">
                        <Spinner animation="border" variant="primary" />
                    </Container>
                }
            >
                <Carousel controls={false} indicators={false}>
                    <Carousel.Item>
                        <div class="d-block w-100 bg-secondary">
                            <img
                                src={
                                    pageData()?.headerImageUrl ? getImageUrl(pageData()?.headerImageUrl as string) : ''
                                }
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
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

                    <Breadcrumb>
                        <Breadcrumb.Item href={HOME_URL}>Accueil</Breadcrumb.Item>
                        <Breadcrumb.Item active>{pageData()?.pageName}</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </Suspense>
        </Stack>
    )
}

export default Page
