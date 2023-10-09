import {
  Card,
  Stack,
  Heading,
  CardBody,
  Divider,
  CardFooter,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { truncateStr } from "../utils/truncateStr"
import { useEffect, useState } from "react"

type NftBoxProps = { tokenURI: string }

const NftBox: React.FC<NftBoxProps> = ({ tokenURI }) => {
  const [imageURI, setImageURI] = useState<string>("")
  const [tokenName, setTokenName] = useState<string>("")
  const [tokenDescription, setTokenDescription] = useState<string>("")

  const updateURI = async (tokenURI: string) => {
    // using the image tag from the tokenURI, get the image
    if (tokenURI) {
      // IPFS Gateway: A server that will return IPFS files from a "normal" URL
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
      console.log(requestURL)
      const tokenURIResponse = await (await fetch(requestURL)).json()
      const imageURI = tokenURIResponse.image
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
      setImageURI(imageURIURL)
      setTokenName(tokenURIResponse.name)
      setTokenDescription(tokenURIResponse.description)
    }
  }

  useEffect(() => {
    updateURI(tokenURI)
  }, [tokenURI])

  return (
    <Flex align="center" justify="center" my="30">
      <Card width="350px" justify="center" align="center">
        <CardBody>
          <Image src={imageURI} />
          <Stack mt="6" spacing="3">
            <Heading>{tokenName}</Heading>
            <Text fontSize="md" mt="15">
              {tokenDescription}
            </Text>
            <Text fontSize="md" color="blue.300">
              所有者（Owner）: あなた（You）
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  )
}
export default NftBox
