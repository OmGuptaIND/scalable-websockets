import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import React from "react";
import { Toaster } from "~/components/ui/toaster";
import ConnectionState from "~/components/ConnectionState";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <main className="min-h-screen">
        <Component {...pageProps} />
        <ConnectionState />
        <Toaster key="toaster" />
      </main>
    </React.Fragment>
  );
};

export default api.withTRPC(MyApp);
