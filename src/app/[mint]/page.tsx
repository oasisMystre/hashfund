import { RouteProps } from "@/types";
import {
  MintInfoGraph,
  Header,
  MyInfo,
  Info,
  HodlList,
  LiquidList,
} from "@/components/mint-info";
import useMint from "@/composables/api/useMint";
import useGraph from "@/composables/api/useGraph";
import useLeaderboard from "@/composables/api/useLeaderboard";
import BalanceProvider from "@/providers/BalanceProvider";

export default async function MintInfoPage({
  params: { mint: qMint },
  searchParams: { timeFrame },
}: RouteProps) {
  const mint = await useMint(qMint);
  const graph = await useGraph(qMint, timeFrame);
  const hodlers = await useLeaderboard(qMint, "volumeIn");
  const liquidators = await useLeaderboard(qMint, "volumeOut");

  return (
    <BalanceProvider mint={mint.id}>
      <main className="flex flex-col space-y-8">
        <Header mint={mint} />
        <MintInfoGraph
          mint={mint}
          graph={graph}
        />
        <MyInfo mint={mint} />

        <div
          className="flex px-4"
          lt-md="flex-col"
          md="space-x-4 px-8"
        >
          <HodlList
            leaderboard={hodlers}
            className="flex-1"
          />
          <LiquidList
            leaderboard={liquidators}
            className="flex-1"
          />
        </div>
        <Info mint={mint} />
      </main>
    </BalanceProvider>
  );
}
