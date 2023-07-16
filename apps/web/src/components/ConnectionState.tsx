import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { cn } from "~/utils";
import useNezuko from "~/hooks/useNezuko";
import type { SocketConnectionState } from "nezuko/dist/SocketConnection";
import mainLogger from "~/utils/Logger";

interface Props {
  className?: string;
}

const logger = mainLogger.createSubLogger("ConnectionState.ts");

const ConnectionState: React.FC<Props> = ({ className }) => {
  const { nezuko } = useNezuko();
  const { toast } = useToast();

  const [connectionState, setConnectionState] = useState<
    SocketConnectionState | "UNINITIALIZED"
  >(nezuko.connectionState as SocketConnectionState | "UNINITIALIZED");

  useEffect(() => {
    const handleConnectionStateChange = (data: {
      ws: WebSocket;
      state: SocketConnectionState;
    }) => {
      logger.info("Connection state changed", data.state);
      logger.info({ ws: data.ws });
      toast({
        title: "Connection state changed",
      });
      setConnectionState(data.state);
    };

    nezuko.on("connectionStateChange", handleConnectionStateChange);
  }, [nezuko, toast]);

  return (
    <div className={cn("absolute right-2 top-2", className)}>
      <p className="select-none rounded-lg border-[1px] p-2 text-xs capitalize text-primary-yellow">
        {connectionState}
      </p>
    </div>
  );
};

export default ConnectionState;
