import { getImageUrl } from '~/utils/utils'

type Props = {
    url: string
}

export default (props: Props) => (
    <>
        <img style="width: 100%" src={getImageUrl(props.url)} />
    </>
)
