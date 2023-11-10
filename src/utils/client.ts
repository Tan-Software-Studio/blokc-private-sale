import { createTestClient, http } from "viem";
import { polygonMumbai } from "viem/chains";

export const publicClient = createTestClient({
  chain: polygonMumbai,
  mode: "anvil",
  transport: http(
    "https://polygon-mumbai.g.alchemy.com/v2/EQYzgMIokIxnS3wbHhZUKm0b8KtwbuxZ"
  ),
});

//import { createPublicClient, http } from "viem"
//import { sepolia } from "viem/chains"

//export const publicClient = createPublicClient({
//  chain: sepolia,
//  transport: http(
//    "https://polygon-mumbai.g.alchemy.com/v2/XSb75aw_jshDUV7ASCNM13QXokJ9EYyC",
//  ),
//})
