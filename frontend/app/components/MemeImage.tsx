import { Text, Image } from "@chakra-ui/react";

export type MemeImageType = {
    src: string,
    alt: string,
    gifURL: string,
    description: string
}

interface MemeImageProps {
    memeImageData: MemeImageType
}

const MemeImage = ({ memeImageData }: MemeImageProps) => {
    return (
        <>
            <Image src={memeImageData.src} alt={memeImageData.alt} />
            <Text>
            <a 
                href={memeImageData.gifURL} 
                title={memeImageData.description}>
            </a>
            </Text>
        </>
    )
}

export default MemeImage
