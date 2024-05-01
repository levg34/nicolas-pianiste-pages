import { Button, Card, Container } from 'solid-bootstrap'
import { For, createResource } from 'solid-js'

const pagesFetcher = async () => await fetch('/api/pages').then((res) => res.json())

export default function PageList() {
    const [pages] = createResource<{ name: string; url: string; _id: string }[]>(pagesFetcher)

    return (
        <Container>
            <For each={pages()}>
                {(page) => (
                    <a href={'/' + page.url}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{page.name}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </a>
                )}
            </For>
        </Container>
    )
}
