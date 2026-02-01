import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { NeonDbError } from "@neondatabase/serverless";
import { DrizzleQueryError } from "drizzle-orm";

export const actionClient = createSafeActionClient({
  defineMetadataSchema: () => {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError: (e, utils) => {
    // console.log(e.constructor.name);
    const { clientInput, metadata } = utils;

    console.dir(e);
    console.log(e.constructor.name);

    if (e instanceof DrizzleQueryError && e.cause instanceof NeonDbError) {
      console.log(
        "DrizzleQueryError with NeonDbError cause is here ..........",
      );
      const { code, detail } = e.cause;
      if (code === "23505") {
        // duplicate unique entry error
        return `Unique entry required. ${detail}`;
      }
    } else if (e instanceof NeonDbError) {
      // This case might not be reached if Drizzle always wraps Neon errors,
      // but it's good practice to keep it for robustness.
      console.log("NeonDbError is here ..........");
      const { code, detail } = e;
      if (code === "23505") {
        // duplicate unique entry error
        return `Unique entry required. ${detail}`;
      }
    }

    Sentry.captureException(e, (scope) => {
      scope.clear();
      scope.setContext("serverError", { message: e.message });
      scope.setContext("metadata", { actionName: metadata.actionName });
      scope.setContext("clientInput", { clientInput });
      return scope;
    });

    if (e instanceof DrizzleQueryError) {
      // Fallback for DrizzleQueryError that doesn't wrap a NeonDbError
      // or for codes other than '23505'
      console.log("DrizzleQueryError without handled Neon error cause.");
      return "Database Error: Your data could not be saved. Our team has been notified.";
    }

    return e.message || DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
