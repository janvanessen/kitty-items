import {Suspense} from "react"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {IDLE} from "../global/constants"
import {
  Tr,
  Td,
  Button,
  Spinner,
  Flex,
  Center,
  Text,
  HStack,
} from "@chakra-ui/react"

import {ItemImage} from "./account-item-cluster.comp"

export function MarketItemCluster({address, id}) {
  const [cu, loggedIn] = useCurrentUser()

  const item = useMarketItem(address, id)

  const BUSY = item.status !== IDLE || item.status !== IDLE

  return (
    <Tr>
      <Td maxW="50px">
        <Flex>
          <Text>#{item.saleItemID}</Text>
        </Flex>
      </Td>
      <Td>({item.saleItemTypeID})</Td>
      <Td>
        <ItemImage type={item.saleItemTypeID} />
      </Td>
      <Td>{item.price || 10}</Td>
      {loggedIn && (
        <>
          {item.saleItemCollection === cu.addr ? (
            <Td isNumeric maxW="none">
              <Button
                colorScheme="orange"
                size="sm"
                disabled={BUSY}
                onClick={item.cancelListing}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />}
                  <Text>Unlist</Text>
                </HStack>
              </Button>
            </Td>
          ) : (
            <Td isNumeric maxW="none">
              <Button
                colorScheme="blue"
                size="sm"
                disabled={BUSY}
                onClick={item.buy}
              >
                <HStack>
                  {BUSY && <Spinner mr="2" size="xs" />}
                  <Text>Buy</Text>
                </HStack>
              </Button>
            </Td>
          )}
        </>
      )}
    </Tr>
  )
}

export default function WrappedMarketItemCluster(props) {
  return (
    <Suspense
      fallback={
        <Tr>
          <Td maxW="50px">
            <Flex>
              <Text>#{props.id}</Text>
              <Center ml="4">
                <Spinner size="xs" />
              </Center>
            </Flex>
          </Td>
          <Td />
          <Td />
        </Tr>
      }
    >
      <MarketItemCluster {...props} />
    </Suspense>
  )
}
