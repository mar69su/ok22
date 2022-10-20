import Image from 'react-bootstrap/Image'
import commuterFerry from '../images/ms_viken_1990.jpg'

const FrontPage = () => {

    return (
        <div>
            <Image src={commuterFerry} fluid rounded alt="Picture of Commuter Ferry Viken in 1990" />
        </div>
    )
}

export default FrontPage