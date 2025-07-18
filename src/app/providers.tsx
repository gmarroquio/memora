"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query";
import type * as React from "react";
import { IntlProvider } from "./intl-provider";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture("$pageview", { $current_url: url });
    }

    return () => {
      if (pathname && posthog) {
        let url = window.origin + pathname;
        if (searchParams.toString()) {
          url = url + "?" + searchParams.toString();
        }

        posthog.capture("$pageleave", { $current_url: url });
      }
    };
  }, [pathname, searchParams, posthog]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider>
        <PostHogProvider>{children}</PostHogProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
}
