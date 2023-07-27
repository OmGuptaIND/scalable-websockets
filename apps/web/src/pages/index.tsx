import { useRouter } from "next/router";
import FullPageLayout from "~/components/common/FullPageLayout";
import { Button } from "~/components/ui/button";
import mainLogger from "~/utils/Logger";
const logger = mainLogger.createSubLogger("pages/index.tsx");

export default function Home() {
  logger.info("Rendering Home");

  const router = useRouter();

  return (
    <FullPageLayout className="h-full min-h-screen">
      <div className="grid h-screen place-content-center">
        <p className="mb-2 text-center font-mono text-xs text-zinc-400">
          You Know what to do.
        </p>

        <div className="grid place-content-center gap-3">
          <Button
            onClick={() => router.push("/socket")}
            variant="default"
            className="w-96 py-5 font-mono text-lg"
          >
            GOTO SOCKET PAGE
          </Button>

          <Button
            onClick={() => router.push("grpc")}
            variant="default"
            className="w-96 py-5 font-mono text-lg"
          >
            GOTO gRPC PAGE
          </Button>
        </div>
      </div>
    </FullPageLayout>
  );
}
